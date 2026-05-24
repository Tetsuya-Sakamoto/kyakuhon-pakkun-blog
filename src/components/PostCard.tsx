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
            background: hovered ? "#0F1829" : "#0C1422",
            border: `1px solid ${hovered ? "#2196F3" : "#1E2D45"}`,
            boxShadow: hovered ? "0 0 0 1px #2196F3, 0 8px 32px rgba(33,150,243,0.12)" : "none",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-xs font-black px-2.5 py-1 rounded tracking-wider uppercase"
              style={{ background: "#2196F3", color: "#fff" }}
            >
              {frontmatter.category}
            </span>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#1E2D45" }}>
              Latest
            </span>
          </div>
          <h2
            className="font-black leading-tight mb-3 transition-colors"
            style={{
              fontSize: "1.6rem",
              color: hovered ? "#42A5F5" : "#EDF2FF",
            }}
          >
            {frontmatter.title}
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B80A0" }}>
            {frontmatter.description}
          </p>
          <div className="flex items-center justify-between">
            <time className="text-xs" style={{ color: "#2D4060" }}>
              {frontmatter.publishedAt}
            </time>
            <span
              className="text-sm font-bold transition-colors"
              style={{ color: hovered ? "#42A5F5" : "#2D4060" }}
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
          background: hovered ? "#0F1829" : "#0C1422",
          border: `1px solid ${hovered ? "#2196F3" : "#1E2D45"}`,
          boxShadow: hovered ? "0 0 0 1px #2196F3, 0 4px 20px rgba(33,150,243,0.1)" : "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-black px-2 py-0.5 rounded tracking-wider uppercase"
            style={{ background: "#0F1829", color: "#2196F3", border: "1px solid #1E2D45" }}
          >
            {frontmatter.category}
          </span>
          <time className="text-xs" style={{ color: "#2D4060" }}>
            {frontmatter.publishedAt}
          </time>
        </div>
        <h2
          className="font-bold leading-snug mb-3 flex-1 transition-colors"
          style={{
            fontSize: "1.05rem",
            color: hovered ? "#42A5F5" : "#EDF2FF",
          }}
        >
          {frontmatter.title}
        </h2>
        <div className="flex items-center justify-end mt-2">
          <span
            className="text-xs font-bold transition-colors"
            style={{ color: hovered ? "#2196F3" : "#2D4060" }}
          >
            →
          </span>
        </div>
      </article>
    </Link>
  );
}
