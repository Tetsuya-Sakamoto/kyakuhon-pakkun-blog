import type { Metadata } from "next";
import { getAllPosts, CATEGORIES } from "@/lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import Link from "next/link";

const SITE_URL = "https://service.kyakuhon-pakkun.com";

export const metadata: Metadata = {
  title: "脚本パックン ブログ | 映像制作のお役立ち情報",
  description: "映像制作の現場で役立つ情報を発信。香盤表・PPM資料・進行管理ツールの使い方から業界知識まで。",
  alternates: { canonical: `${SITE_URL}/blog/` },
  openGraph: {
    title: "脚本パックン ブログ",
    description: "映像制作の現場で役立つ情報を発信。香盤表・PPM資料・進行管理ツールの使い方から業界知識まで。",
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
  description: "映像制作の現場で役立つ情報を発信。",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "脚本パックン", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "ブログ", item: `${SITE_URL}/blog/` },
  ],
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-5">

        {/* Hero */}
        <section className="py-16 border-b" style={{ borderColor: "#1E2D45" }}>
          <p className="text-xs font-black tracking-widest uppercase mb-4" style={{ color: "#2196F3" }}>
            映像制作の知識が、ここにある
          </p>
          <h1 className="font-black leading-none mb-6" style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", color: "#EDF2FF" }}>
            現場で使える<br />
            <span style={{ color: "#2196F3" }}>知識と実践</span>を届ける。
          </h1>
          <p className="max-w-xl text-sm leading-relaxed" style={{ color: "#4A6080" }}>
            香盤表・PPM資料・進行管理——映像制作の現場が抱える課題に、
            プロが実際に使う知識でアプローチします。
          </p>
        </section>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 py-6 border-b" style={{ borderColor: "#1E2D45" }}>
          <Link
            href="/blog"
            className="px-4 py-1.5 rounded text-xs font-black uppercase tracking-wider"
            style={{ background: "#2196F3", color: "#fff" }}
          >
            ALL
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${encodeURIComponent(cat)}`}
              className="px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all hover:border-[#2196F3] hover:text-[#42A5F5]"
              style={{ background: "#0C1422", color: "#4A6080", border: "1px solid #1E2D45" }}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Featured */}
        {featured && (
          <section className="py-10 border-b" style={{ borderColor: "#1E2D45" }}>
            <PostCard post={featured} featured />
          </section>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <section className="py-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {posts.length === 0 && (
          <p className="text-center py-24 text-sm" style={{ color: "#2D4060" }}>
            記事はまだありません。
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}
