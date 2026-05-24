import Link from "next/link";
import { CATEGORIES } from "@/lib/posts";

export default function Header() {
  return (
    <header style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}>
      <style>{`
        .nav-link { color: #6B7280; transition: color 0.15s; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
        .nav-link:hover { color: #2196F3; }
      `}</style>
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/blog" className="flex items-center gap-2">
          <span className="text-sm font-bold" style={{ color: "#9CA3AF" }}>脚本パックン</span>
          <span style={{ color: "#D1D5DB" }}>/</span>
          <span className="font-black text-lg" style={{ color: "#2196F3" }}>Blog</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-5">
          {CATEGORIES.map((cat) => (
            <Link key={cat} href={`/blog/category/${encodeURIComponent(cat)}`} className="nav-link">
              {cat}
            </Link>
          ))}
          <Link
            href="https://service.kyakuhon-pakkun.com"
            className="text-xs font-black px-4 py-2 rounded-full transition-all hover:opacity-90"
            style={{ background: "#2196F3", color: "#fff" }}
          >
            ツールを使う →
          </Link>
        </nav>
      </div>
    </header>
  );
}
