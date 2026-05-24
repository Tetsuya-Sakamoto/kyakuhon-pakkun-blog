import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const SITE_URL = "https://service.kyakuhon-pakkun.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { frontmatter } = post;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}/` },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `${SITE_URL}/blog/${slug}/`,
      siteName: "脚本パックン",
      type: "article",
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt,
    author: { "@type": "Organization", name: "脚本パックン", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "脚本パックン",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    url: `${SITE_URL}/blog/${slug}/`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}/` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "脚本パックン", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "ブログ", item: `${SITE_URL}/blog/` },
      { "@type": "ListItem", position: 3, name: frontmatter.title, item: `${SITE_URL}/blog/${slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-5 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-10" style={{ color: "#444" }}>
          <Link href="/blog" style={{ color: "#555" }} className="hover:text-white transition-colors">
            Blog
          </Link>
          <span>/</span>
          <Link
            href={`/blog/category/${encodeURIComponent(frontmatter.category)}`}
            style={{ color: "#555" }}
            className="hover:text-white transition-colors"
          >
            {frontmatter.category}
          </Link>
        </nav>

        {/* Article header */}
        <header className="mb-12 pb-10 border-b" style={{ borderColor: "#1E1E1E" }}>
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-xs font-black px-2.5 py-1 rounded tracking-wider uppercase"
              style={{ background: "#FFD60A", color: "#0A0A0A" }}
            >
              {frontmatter.category}
            </span>
          </div>
          <h1
            className="font-black leading-tight mb-6"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#F2F2F2" }}
          >
            {frontmatter.title}
          </h1>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#666" }}>
            {frontmatter.description}
          </p>
          <div className="flex items-center gap-6 text-xs" style={{ color: "#444" }}>
            <span>
              公開:{" "}
              <time dateTime={frontmatter.publishedAt} style={{ color: "#666" }}>
                {frontmatter.publishedAt}
              </time>
            </span>
            {frontmatter.updatedAt !== frontmatter.publishedAt && (
              <span>
                更新:{" "}
                <time dateTime={frontmatter.updatedAt} style={{ color: "#666" }}>
                  {frontmatter.updatedAt}
                </time>
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded"
                style={{ background: "#1C1C1C", color: "#555", border: "1px solid #2A2A2A" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article content */}
        <div className="prose max-w-none">
          <MDXRemote source={content} />
        </div>

        {/* CTA */}
        <div
          className="mt-14 p-8 rounded-xl text-center"
          style={{ background: "#141414", border: "1px solid #222" }}
        >
          <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: "#FFD60A" }}>
            脚本パックン
          </p>
          <p className="font-bold text-lg mb-4" style={{ color: "#F2F2F2" }}>
            映像制作の進行管理を、もっとスマートに。
          </p>
          <Link
            href="https://service.kyakuhon-pakkun.com"
            className="inline-block font-black text-sm px-6 py-3 rounded transition-opacity hover:opacity-80"
            style={{ background: "#FFD60A", color: "#0A0A0A" }}
          >
            無料で使ってみる →
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-10 pt-8 border-t" style={{ borderColor: "#1E1E1E" }}>
          <Link
            href="/blog"
            className="text-sm font-bold transition-colors hover:opacity-70"
            style={{ color: "#FFD60A" }}
          >
            ← ブログ一覧へ
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
