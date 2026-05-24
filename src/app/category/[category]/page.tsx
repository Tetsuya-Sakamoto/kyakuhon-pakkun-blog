import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory, CATEGORIES } from "@/lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const SITE_URL = "https://service.kyakuhon-pakkun.com";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: encodeURIComponent(cat) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: enc } = await params;
  const category = decodeURIComponent(enc);
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) return {};
  return {
    title: `${category} | 脚本パックン ブログ`,
    description: `映像制作に関する「${category}」カテゴリの記事一覧です。`,
    alternates: { canonical: `${SITE_URL}/blog/category/${enc}/` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: enc } = await params;
  const category = decodeURIComponent(enc);
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) notFound();

  const posts = getPostsByCategory(category);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-5">

        {/* Hero */}
        <section className="py-14 border-b" style={{ borderColor: "#1E2D45" }}>
          <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: "#2D4060" }}>
            <Link href="/blog" className="transition-colors hover:text-blue-400" style={{ color: "#4A6080" }}>
              Blog
            </Link>
            <span>/</span>
            <span style={{ color: "#EDF2FF" }}>{category}</span>
          </nav>
          <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: "#2196F3" }}>
            Category
          </p>
          <h1 className="font-black leading-none mb-2" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#EDF2FF" }}>
            {category}
          </h1>
          <p className="text-sm mt-3" style={{ color: "#4A6080" }}>
            {posts.length}件の記事
          </p>
        </section>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 py-6 border-b" style={{ borderColor: "#1E2D45" }}>
          <Link
            href="/blog"
            className="px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider"
            style={{ background: "#0C1422", color: "#4A6080", border: "1px solid #1E2D45" }}
          >
            ALL
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${encodeURIComponent(cat)}`}
              className="px-4 py-1.5 rounded text-xs font-black uppercase tracking-wider transition-all"
              style={
                cat === category
                  ? { background: "#2196F3", color: "#fff" }
                  : { background: "#0C1422", color: "#4A6080", border: "1px solid #1E2D45" }
              }
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <section className="py-10">
          {posts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center py-24 text-sm" style={{ color: "#2D4060" }}>
              このカテゴリにはまだ記事がありません。
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
