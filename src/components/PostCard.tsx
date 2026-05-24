"use client";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { useState } from "react";

type Props = {
  post: PostMeta;
  featured?: boolean;
};

export default function PostCard({ post, featured = false }: Props) {
  const { slug, frontmatter } = post;
  const [hovered, setHovered] = useState(false);

  if (featured) {
    return (
      <Link href={`/blog/${slug}`}>
        <article
          className="p-8 rounded-xl transition-all cursor-pointer"
          style={{
            background: hovered ? "#1C1C1C" : "#141414",
            border: `1px solid ${hovered ? "#FFD60A" : "#222"}`,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-black px-2.5 py-1 rounded tracking-wider uppercase"
              style={{ background: "#FFD60A", color: "#0A0A0A" }}
            >
              {frontmatter.category}
            </span>
            <span className="text-xs" style={{ color: "#444" }}>
              FEATURED
            </span>
          </div>
          <h2
            className="font-black leading-tight mb-3 transition-colors"
            style={{
              fontSize: "1.6rem",
              color: hovered ? "#FFD60A" : "#F2F2F2",
            }}
          >
            {frontmatter.title}
          </h2>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "#777" }}>
            {frontmatter.description}
          </p>
          <div className="flex items-center justify-between">
            <time className="text-xs" style={{ color: "#444" }}>
              {frontmatter.publishedAt}
            </time>
            <span
              className="text-sm font-bold transition-colors"
              style={{ color: hovered ? "#FFD60A" : "#555" }}
            >
              読む →
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${slug}`}>
      <article
        className="p-6 rounded-xl transition-all cursor-pointer h-full flex flex-col"
        style={{
          background: hovered ? "#1C1C1C" : "#141414",
          border: `1px solid ${hovered ? "#FFD60A" : "#222"}`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-black px-2 py-0.5 rounded tracking-wider uppercase"
            style={{ background: "#1E1E1E", color: "#FFD60A", border: "1px solid #333" }}
          >
            {frontmatter.category}
          </span>
          <time className="text-xs" style={{ color: "#444" }}>
            {frontmatter.publishedAt}
          </time>
        </div>
        <h2
          className="font-bold leading-snug mb-3 flex-1 transition-colors"
          style={{
            fontSize: "1.05rem",
            color: hovered ? "#FFD60A" : "#F2F2F2",
          }}
        >
          {frontmatter.title}
        </h2>
        <div className="flex items-center justify-end mt-2">
          <span
            className="text-xs font-bold transition-colors"
            style={{ color: hovered ? "#FFD60A" : "#444" }}
          >
            →
          </span>
        </div>
      </article>
    </Link>
  );
}
