"use client";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { useState } from "react";

type Props = { post: PostMeta; featured?: boolean };

export default function PostCard({ post, featured = false }: Props) {
  const { slug, frontmatter } = post;
  const [hovered, setHovered] = useState(false);

  if (featured) {
    return (
      <Link href={`/blog/${slug}`}>
        <article
          className="rounded-2xl p-8 transition-all cursor-pointer"
          style={{
            background: "#FFFFFF",
            border: `2px solid ${hovered ? "#2196F3" : "#E2E8F0"}`,
            boxShadow: hovered
              ? "0 8px 28px rgba(33,150,243,0.13)"
              : "0 1px 4px rgba(0,0,0,0.05)",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* カテゴリバッジのみ */}
          <div className="mb-5">
            <span
              className="text-xs font-black px-3 py-1 rounded-full tracking-wider uppercase"
              style={{ background: "#2196F3", color: "#fff" }}
            >
              {frontmatter.category}
            </span>
          </div>

          <h2
            className="font-black leading-snug mb-3 transition-colors"
            style={{ fontSize: "1.65rem", color: hovered ? "#2196F3" : "#111827", lineHeight: 1.3 }}
          >
            {frontmatter.title}
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280", maxWidth: "640px" }}>
            {frontmatter.description}
          </p>
          <div className="flex items-center justify-between">
            <time className="text-xs" style={{ color: "#9CA3AF" }}>{frontmatter.publishedAt}</time>
            <span
              className="text-sm font-bold transition-colors"
              style={{ color: hovered ? "#2196F3" : "#9CA3AF" }}
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
        className="rounded-xl p-5 transition-all cursor-pointer h-full flex flex-col"
        style={{
          background: "#FFFFFF",
          border: `1.5px solid ${hovered ? "#2196F3" : "#E2E8F0"}`,
          boxShadow: hovered
            ? "0 4px 18px rgba(33,150,243,0.11)"
            : "0 1px 3px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-black px-2.5 py-0.5 rounded-full"
            style={{ background: "#E3F2FD", color: "#1565C0" }}
          >
            {frontmatter.category}
          </span>
          <time className="text-xs" style={{ color: "#9CA3AF" }}>{frontmatter.publishedAt}</time>
        </div>

        <h2
          className="font-bold leading-snug flex-1 transition-colors"
          style={{ fontSize: "0.975rem", color: hovered ? "#2196F3" : "#111827", lineHeight: 1.5 }}
        >
          {frontmatter.title}
        </h2>

        <p
          className="text-xs leading-relaxed mt-2"
          style={{
            color: "#9CA3AF",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {frontmatter.description}
        </p>

        <div className="flex justify-end mt-3">
          <span className="text-xs font-bold" style={{ color: hovered ? "#2196F3" : "#D1D5DB" }}>
            →
          </span>
        </div>
      </article>
    </Link>
  );
}
