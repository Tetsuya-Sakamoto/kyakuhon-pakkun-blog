import Link from "next/link";

const WM = "'M PLUS Rounded 1c', sans-serif";

export default function Header() {
  return (
    <header style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E7EB" }}>
      <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: WM,
              fontWeight: 900,
              fontSize: "1rem",
              color: "#0F172A",
              letterSpacing: "-0.01em",
            }}
          >
            脚本パックン
          </span>
          <span style={{ color: "#D1D5DB", fontSize: "0.9rem" }}>/</span>
          <span
            style={{
              fontFamily: WM,
              fontWeight: 900,
              fontSize: "1rem",
              color: "#2196F3",
            }}
          >
            Blog
          </span>
        </Link>

        {/* CTA */}
        <Link
          href="https://kyakuhon-pakkun.com"
          className="transition-all hover:opacity-85"
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontFeatureSettings: '"palt"',
            fontSize: "0.75rem",
            fontWeight: 800,
            padding: "8px 18px",
            borderRadius: "9999px",
            background: "#2196F3",
            color: "#fff",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          ツールを使う →
        </Link>
      </div>
    </header>
  );
}
