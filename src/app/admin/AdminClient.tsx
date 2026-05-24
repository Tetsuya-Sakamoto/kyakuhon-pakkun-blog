"use client";

import { useState, useCallback } from "react";
import { CATEGORIES, type Category } from "@/lib/constants";

export default function AdminClient() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("ハウツー");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const generateSlug = useCallback((t: string) => {
    return t
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
      .slice(0, 60) || "new-post";
  }, []);

  const generateMdx = useCallback(() => {
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const tagsYaml =
      tagList.length > 0
        ? `[${tagList.map((t) => `"${t}"`).join(", ")}]`
        : "[]";

    return `---
title: "${title}"
description: "${description}"
category: "${category}"
tags: ${tagsYaml}
publishedAt: "${today}"
updatedAt: "${today}"
author: "脚本パックン編集部"
---

${body}`;
  }, [title, description, category, tags, body, today]);

  const handleCopy = async () => {
    const mdx = generateMdx();
    await navigator.clipboard.writeText(mdx);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const slug = generateSlug(title);
  const mdx = generateMdx();

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <header className="bg-white border-b border-[#e5e7eb] px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#1a1a1a]">
            記事投稿エディタ
          </h1>
          <a
            href="/blog"
            className="text-sm text-[#2196f3] hover:text-[#1976d2]"
          >
            ブログ一覧へ
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="space-y-4">
            <div className="bg-white border border-[#e5e7eb] rounded-lg p-6">
              <h2 className="font-semibold text-[#1a1a1a] mb-4">記事情報</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                    タイトル <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2196f3]"
                    placeholder="記事タイトルを入力"
                  />
                  {title && (
                    <p className="text-xs text-[#666666] mt-1">
                      ファイル名: {slug}.mdx
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                    説明文（120文字以内）<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2196f3] resize-none"
                    placeholder="meta descriptionに使う説明文"
                    maxLength={120}
                  />
                  <p className="text-xs text-[#666666] mt-1">
                    {description.length}/120文字
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                    カテゴリ
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2196f3] bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a] mb-1">
                    タグ（カンマ区切り）
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2196f3]"
                    placeholder="香盤表, PPM, 映像制作"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-lg p-6">
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                本文（Markdown）
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={20}
                className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-[#2196f3] resize-y"
                placeholder="## 見出し&#10;&#10;本文をMarkdown形式で入力してください..."
              />
            </div>

            <button
              onClick={handleCopy}
              className="w-full bg-[#2196f3] text-white rounded px-4 py-3 font-medium hover:bg-[#1976d2] transition-colors"
            >
              {copied ? "コピーしました！" : "MDXをコピー"}
            </button>

            <p className="text-xs text-[#666666] text-center">
              コピー後、Claude Codeに貼り付けて{" "}
              <code className="bg-[#f9fafb] px-1 rounded">
                content/posts/{slug}.mdx
              </code>{" "}
              として保存してください。
            </p>
          </div>

          {/* Preview */}
          <div className="bg-white border border-[#e5e7eb] rounded-lg p-6">
            <h2 className="font-semibold text-[#1a1a1a] mb-4">MDXプレビュー</h2>
            <pre className="text-xs font-mono text-[#1a1a1a] whitespace-pre-wrap bg-[#f9fafb] rounded p-4 overflow-auto max-h-[800px]">
              {mdx}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
