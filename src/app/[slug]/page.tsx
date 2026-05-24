import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const SITE_URL = "https://service.kyakuhon-pakkun.com";
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { frontmatter: f } = post;
  return {
    title: f.title,
    description: f.description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}/` },
    openGraph: {
      title: f.title, description: f.description,
      url: `${SITE_URL}/blog/${slug}/`, siteName: "脚本パックン", type: "article",
      publishedTime: f.publishedAt, modifiedTime: f.updatedAt,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const { frontmatter: f, content } = post;

  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: f.title, description: f.description,
    datePublished: f.publishedAt, dateModified: f.updatedAt,
    author: { "@type": "Organization", name: "脚本パックン", url: SITE_URL },
    publisher: { "@type": "Organization", name: "脚本パックン", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
    url: `${SITE_URL}/blog/${slug}/`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}/` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "脚本パックン", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "ブログ", item: `${SITE_URL}/blog/` },
      { "@type": "ListItem", position: 3, name: f.title, item: `${SITE_URL}/blog/${slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6" style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>
          <Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link>
          <span style={{ color: "#D1D5DB" }}>/</span>
          <Link
            href={`/blog/category/${encodeURIComponent(f.category)}`}
            className="hover:text-blue-500 transition-colors"
          >
            {f.category}
          </Link>
        </nav>

        {/* Article header */}
        <header className="mb-8 pb-6 border-b" style={{ borderColor: "#E2E8F0" }}>
          <span
            className="inline-block text-xs font-black px-3 py-1 rounded-full mb-4"
            style={{ background: "#2196F3", color: "#fff", letterSpacing: "0.05em" }}
          >
            {f.category}
          </span>
          <h1
            className="font-black leading-tight mb-4"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", color: "#111827", lineHeight: 1.3 }}
          >
            {f.title}
          </h1>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B7280" }}>
            {f.description}
          </p>
          <div className="flex items-center gap-4" style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>
            <span>公開: <time dateTime={f.publishedAt}>{f.publishedAt}</time></span>
            {f.updatedAt !== f.publishedAt && (
              <span>更新: <time dateTime={f.updatedAt}>{f.updatedAt}</time></span>
            )}
          </div>
          {f.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {f.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-0.5"
                  style={{ fontSize: "0.68rem", background: "#F3F4F6", color: "#9CA3AF" }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose max-w-none">
          <MDXRemote source={content} />
        </div>

        {/* CTA */}
        <div
          className="mt-12 p-8 rounded-2xl text-center"
          style={{
            background: "linear-gradient(145deg, #EBF5FF 0%, #DBEAFE 100%)",
            border: "1.5px solid #BFDBFE",
          }}
        >
          <p
            className="font-black mb-1 tracking-widest uppercase"
            style={{ fontSize: "0.65rem", color: "#2196F3", letterSpacing: "0.15em" }}
          >
            脚本パックン
          </p>
          <p className="font-bold text-lg mb-5" style={{ color: "#111827" }}>
            映像制作の進行管理を、もっとスマートに。
          </p>
          <Link
            href="https://service.kyakuhon-pakkun.com"
            className="inline-block font-black text-sm px-7 py-3 rounded-full transition-all hover:opacity-85"
            style={{ background: "#2196F3", color: "#fff", boxShadow: "0 4px 14px rgba(33,150,243,0.3)" }}
          >
            無料で使ってみる →
          </Link>
        </div>

        {/* Back */}
        <div className="mt-8 pt-7 border-t" style={{ borderColor: "#E2E8F0" }}>
          <Link
            href="/blog"
            className="text-sm font-bold hover:opacity-70 transition-opacity"
            style={{ color: "#2196F3" }}
          >
            ← ブログ一覧へ
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
