import type { Metadata } from "next";
import { getAllPosts, CATEGORIES } from "@/lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const SITE_URL = "https://service.kyakuhon-pakkun.com";

export const metadata: Metadata = {
  title: "脚本パックン ブログ | 映像制作のお役立ち情報",
  description:
    "映像制作の現場で役立つ情報を発信。香盤表・PPM資料・進行管理ツールの使い方から業界知識まで。",
  alternates: {
    canonical: `${SITE_URL}/blog/`,
  },
  openGraph: {
    title: "脚本パックン ブログ",
    description:
      "映像制作の現場で役立つ情報を発信。香盤表・PPM資料・進行管理ツールの使い方から業界知識まで。",
    url: `${SITE_URL}/blog/`,
    siteName: "脚本パックン",
    type: "website",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "脚本パックン ブログ",
  url: `${SITE_URL}/blog/`,
  description:
    "映像制作の現場で役立つ情報を発信。香盤表・PPM資料・進行管理ツールの使い方から業界知識まで。",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "脚本パックン",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "ブログ",
      item: `${SITE_URL}/blog/`,
    },
  ],
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">ブログ</h1>
          <p className="text-[#666666]">
            映像制作の現場で役立つ情報をお届けします。
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/blog"
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#2196f3] text-white"
          >
            すべて
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${encodeURIComponent(cat)}`}
              className="px-4 py-1.5 rounded-full text-sm font-medium border border-[#e5e7eb] text-[#666666] hover:border-[#2196f3] hover:text-[#2196f3] transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-[#666666] text-center py-16">
            記事はまだありません。
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
