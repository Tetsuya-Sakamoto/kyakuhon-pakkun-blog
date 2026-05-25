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
    description: "映像制作の現場で役立つ情報を発信。",
    url: `${SITE_URL}/blog/`,
    siteName: "脚本パックン",
    type: "website",
  },
};

const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: "脚本パックン ブログ", url: `${SITE_URL}/blog/` };
const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
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

        {/* ── Hero ── */}
        <section className="pt-12 pb-10 border-b" style={{ borderColor: "#E5E7EB" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#2196F3", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14, fontFamily: "'Noto Sans JP', sans-serif" }}>
            BLOG
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, color: "#0F172A", lineHeight: 1.3, letterSpacing: "-0.015em", marginBottom: 20, fontFeatureSettings: '"palt"' }}>
            脚本パックン<span style={{ color: "#2196F3" }}>ブログ</span>
          </h1>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.8 }}>
            {"香盤表・PPM資料・進行管理——映像制作の現場の課題に、プロが実際に使う知識でアプローチします。"}
          </p>
        </section>

        {/* ── Category filter ── */}
        <div className="flex flex-wrap gap-2 py-4 border-b" style={{ borderColor: "#E2E8F0" }}>
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider"
            style={{ background: "#2196F3", color: "#fff" }}
          >
            ALL
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/category/${encodeURIComponent(cat)}`}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:border-blue-400 hover:text-blue-500"
              style={{ background: "#FFFFFF", color: "#6B7280", border: "1.5px solid #E2E8F0" }}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* ── Featured ── */}
        {featured && (
          <section className="pt-7 pb-7 border-b" style={{ borderColor: "#E2E8F0" }}>
            <PostCard post={featured} featured />
          </section>
        )}

        {/* ── Grid ── */}
        {rest.length > 0 && (
          <section className="pt-7 pb-14">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {posts.length === 0 && (
          <p className="text-center py-20 text-sm" style={{ color: "#9CA3AF" }}>
            記事はまだありません。
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}
