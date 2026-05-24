import Link from "next/link";
import { CATEGORIES } from "@/lib/posts";

export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid #1E2D45", background: "#080E1A" }}>
      <style>{`
        .nav-link { color: #4A6080; transition: color 0.15s; }
        .nav-link:hover { color: #42A5F5; }
      `}</style>
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/blog" className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#4A6080" }}>
            脚本パックン
          </span>
          <span style={{ color: "#1E2D45" }}>/</span>
          <span className="font-black text-base tracking-tight" style={{ color: "#2196F3" }}>
            Blog
          </span>
        </Link>

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
            style={{ background: "#2196F3", color: "#fff" }}
          >
            ツールを使う →
          </Link>
        </nav>
      </div>
    </header>
  );
}
