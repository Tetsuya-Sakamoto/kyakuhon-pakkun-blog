import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

type Props = {
  post: PostMeta;
};

export default function PostCard({ post }: Props) {
  const { slug, frontmatter } = post;
  return (
    <article className="border border-[#e5e7eb] rounded-lg p-6 hover:border-[#2196f3] hover:shadow-sm transition-all bg-white">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium px-2 py-1 rounded bg-[#e3f2fd] text-[#2196f3]">
          {frontmatter.category}
        </span>
        <time className="text-xs text-[#666666]">{frontmatter.publishedAt}</time>
      </div>
      <h2 className="text-lg font-bold text-[#1a1a1a] mb-2 hover:text-[#2196f3]">
        <Link href={`/blog/${slug}`}>{frontmatter.title}</Link>
      </h2>
      <p className="text-sm text-[#666666] line-clamp-2 leading-relaxed">
        {frontmatter.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {frontmatter.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-[#666666] bg-[#f9fafb] px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
