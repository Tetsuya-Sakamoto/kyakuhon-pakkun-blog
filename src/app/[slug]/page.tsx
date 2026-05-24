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
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}/`,
    },
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
    author: {
      "@type": "Organization",
      name: "脚本パックン",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "脚本パックン",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    url: `${SITE_URL}/blog/${slug}/`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}/`,
    },
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
      {
        "@type": "ListItem",
        position: 3,
        name: frontmatter.title,
        item: `${SITE_URL}/blog/${slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#666666] mb-6">
          <Link href="/blog" className="hover:text-[#2196f3]">
            ブログ
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/blog/category/${encodeURIComponent(frontmatter.category)}`}
            className="hover:text-[#2196f3]"
          >
            {frontmatter.category}
          </Link>
        </nav>

        {/* Article header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium px-2 py-1 rounded bg-[#e3f2fd] text-[#2196f3]">
              {frontmatter.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] leading-snug mb-4">
            {frontmatter.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#666666]">
            <span>
              公開日:{" "}
              <time dateTime={frontmatter.publishedAt}>
                {frontmatter.publishedAt}
              </time>
            </span>
            {frontmatter.updatedAt !== frontmatter.publishedAt && (
              <span>
                更新日:{" "}
                <time dateTime={frontmatter.updatedAt}>
                  {frontmatter.updatedAt}
                </time>
              </span>
            )}
            <span>{frontmatter.author}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#666666] bg-[#f9fafb] px-2 py-1 rounded border border-[#e5e7eb]"
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

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-[#e5e7eb]">
          <Link
            href="/blog"
            className="text-[#2196f3] hover:text-[#1976d2] font-medium"
          >
            ← ブログ一覧へ戻る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
