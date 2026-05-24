import Link from "next/link";
import { CATEGORIES } from "@/lib/posts";

export default function Header() {
  return (
    <header className="border-b border-[#e5e7eb] bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="https://service.kyakuhon-pakkun.com"
            className="text-[#1a1a1a] hover:text-[#2196f3] font-bold text-sm"
          >
            脚本パックン
          </Link>
          <span className="text-[#666666]">/</span>
          <Link
            href="/blog"
            className="text-[#2196f3] font-bold text-lg hover:text-[#1976d2]"
          >
            ブログ
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${encodeURIComponent(cat)}`}
              className="text-sm text-[#666666] hover:text-[#2196f3] transition-colors"
            >
              {cat}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
