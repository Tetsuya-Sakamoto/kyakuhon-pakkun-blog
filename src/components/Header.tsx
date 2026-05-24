import Link from "next/link";
import { CATEGORIES } from "@/lib/posts";

export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid #1E1E1E", background: "#0A0A0A" }}>
      <style>{`
        .nav-link { color: #555; transition: color 0.15s; }
        .nav-link:hover { color: #FFD60A; }
      `}</style>
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/blog" className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#555" }}>
            脚本パックン
          </span>
          <span style={{ color: "#333" }}>/</span>
          <span className="font-black text-base tracking-tight" style={{ color: "#FFD60A" }}>
            Blog
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${encodeURIComponent(cat)}`}
              className="nav-link text-xs font-medium tracking-wider uppercase"
            >
              {cat}
            </Link>
          ))}
          <Link
            href="https://service.kyakuhon-pakkun.com"
            className="text-xs font-black px-3 py-1.5 rounded transition-opacity hover:opacity-80"
            style={{ background: "#FFD60A", color: "#0A0A0A" }}
          >
            ツールを使う →
          </Link>
        </nav>
      </div>
    </header>
  );
}
