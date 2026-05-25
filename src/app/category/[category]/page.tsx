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
        <section className="py-14 border-b" style={{ borderColor: "#E2E8F0" }}>
          <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: "#9CA3AF" }}>
            <Link href="/" className="hover:text-blue-500 transition-colors">Blog</Link>
            <span>/</span>
            <span style={{ color: "#111827" }}>{category}</span>
          </nav>
          <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: "#2196F3" }}>Category</p>
          <h1 className="font-black leading-none" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#111827" }}>
            {category}
          </h1>
          <p className="text-sm mt-3" style={{ color: "#9CA3AF" }}>{posts.length}件の記事</p>
        </section>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 py-5 border-b" style={{ borderColor: "#E2E8F0" }}>
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ background: "#FFFFFF", color: "#6B7280", border: "1.5px solid #E2E8F0" }}
          >
            ALL
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat)}`}
              className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all"
              style={
                cat === category
                  ? { background: "#2196F3", color: "#fff" }
                  : { background: "#FFFFFF", color: "#6B7280", border: "1.5px solid #E2E8F0" }
              }
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <section className="py-8 pb-16">
          {posts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center py-24 text-sm" style={{ color: "#9CA3AF" }}>
              このカテゴリにはまだ記事がありません。
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
