import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory, CATEGORIES } from "@/lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const SITE_URL = "https://service.kyakuhon-pakkun.com";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: encodeURIComponent(cat),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: encodedCategory } = await params;
  const category = decodeURIComponent(encodedCategory);

  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    return {};
  }

  return {
    title: `${category} | 脚本パックン ブログ`,
    description: `映像制作に関する「${category}」カテゴリの記事一覧です。`,
    alternates: {
      canonical: `${SITE_URL}/blog/category/${encodedCategory}/`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: encodedCategory } = await params;
  const category = decodeURIComponent(encodedCategory);

  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    notFound();
  }

  const posts = getPostsByCategory(category);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#666666] mb-6">
          <Link href="/blog" className="hover:text-[#2196f3]">
            ブログ
          </Link>
          <span className="mx-2">/</span>
          <span>{category}</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">
            {category}
          </h1>
          <p className="text-[#666666]">
            「{category}」カテゴリの記事一覧（{posts.length}件）
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/blog"
            className="px-4 py-1.5 rounded-full text-sm font-medium border border-[#e5e7eb] text-[#666666] hover:border-[#2196f3] hover:text-[#2196f3] transition-colors"
          >
            すべて
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${encodeURIComponent(cat)}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                cat === category
                  ? "bg-[#2196f3] text-white"
                  : "border border-[#e5e7eb] text-[#666666] hover:border-[#2196f3] hover:text-[#2196f3]"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-[#666666] text-center py-16">
            このカテゴリにはまだ記事がありません。
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
