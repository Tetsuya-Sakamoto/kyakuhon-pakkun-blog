"use client";
import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";
import { useState } from "react";

type Props = { post: PostMeta; featured?: boolean };

/** カテゴリ別グラデーション（画像なし時のプレースホルダー） */
const categoryGradient: Record<string, { bg: string; icon: string }> = {
  ハウツー:   { bg: "linear-gradient(135deg, #1E88E5 0%, #42A5F5 100%)", icon: "📋" },
  基礎知識:   { bg: "linear-gradient(135deg, #5C6BC0 0%, #7986CB 100%)", icon: "📖" },
  導入事例:   { bg: "linear-gradient(135deg, #00897B 0%, #26A69A 100%)", icon: "✅" },
  ツール比較: { bg: "linear-gradient(135deg, #F57C00 0%, #FFA726 100%)", icon: "⚖️" },
};

function CoverPlaceholder({ category }: { category: string }) {
  const style = categoryGradient[category] ?? { bg: "linear-gradient(135deg, #2196F3, #42A5F5)", icon: "📄" };
  return (
    <div
      className="w-full flex items-center justify-center select-none"
      style={{ background: style.bg, aspectRatio: "16/9" }}
    >
      <span style={{ fontSize: "2.5rem", opacity: 0.55 }}>{style.icon}</span>
    </div>
  );
}

export default function PostCard({ post, featured = false }: Props) {
  const { slug, frontmatter: f } = post;
  const [hovered, setHovered] = useState(false);

  if (featured) {
    return (
      <Link href={`/blog/${slug}`}>
        <article
          className="rounded-2xl overflow-hidden transition-all cursor-pointer"
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
          {/* カバー画像エリア */}
          <div className="w-full overflow-hidden" style={{ aspectRatio: "16/9", maxHeight: 320 }}>
            {f.coverImage ? (
              <Image
                src={f.coverImage}
                alt={f.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
              />
            ) : (
              <CoverPlaceholder category={f.category} />
            )}
          </div>

          {/* テキスト */}
          <div className="p-7">
            <div className="mb-4">
              <span
                className="text-xs font-black px-3 py-1 rounded-full"
                style={{ background: "#2196F3", color: "#fff" }}
              >
                {f.category}
              </span>
            </div>
            <h2
              className="font-black leading-snug mb-3 transition-colors"
              style={{ fontSize: "1.4rem", color: hovered ? "#2196F3" : "#111827", lineHeight: 1.35 }}
            >
              {f.title}
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B7280" }}>
              {f.description}
            </p>
            <div className="flex items-center justify-between">
              <time className="text-xs" style={{ color: "#9CA3AF" }}>{f.publishedAt}</time>
              <span
                className="text-sm font-bold transition-colors"
                style={{ color: hovered ? "#2196F3" : "#9CA3AF" }}
              >
                読む →
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${slug}`}>
      <article
        className="rounded-xl overflow-hidden transition-all cursor-pointer h-full flex flex-col"
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
        {/* カバー画像エリア */}
        <div className="w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {f.coverImage ? (
            <Image
              src={f.coverImage}
              alt={f.title}
              width={600}
              height={338}
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
            />
          ) : (
            <CoverPlaceholder category={f.category} />
          )}
        </div>

        {/* テキスト */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2.5">
            <span
              className="text-xs font-black px-2.5 py-0.5 rounded-full"
              style={{ background: "#E3F2FD", color: "#1565C0" }}
            >
              {f.category}
            </span>
            <time className="text-xs" style={{ color: "#9CA3AF" }}>{f.publishedAt}</time>
          </div>
          <h2
            className="font-bold leading-snug flex-1 transition-colors"
            style={{ fontSize: "0.95rem", color: hovered ? "#2196F3" : "#111827", lineHeight: 1.5 }}
          >
            {f.title}
          </h2>
          <div className="flex justify-end mt-3">
            <span className="text-xs font-bold" style={{ color: hovered ? "#2196F3" : "#D1D5DB" }}>
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
