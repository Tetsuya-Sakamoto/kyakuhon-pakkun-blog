"use client";
import { useState } from "react";

const PRIM = "#2196F3";
const INK = "#0F172A";
const SUB = "#374151";
const MUTED = "#6B7280";
const FAINT = "#9CA3AF";
const LINE = "#E5E7EB";
const HD = "'Noto Sans JP', sans-serif";
const WM = "'M PLUS Rounded 1c', sans-serif";
const MN = "'JetBrains Mono', ui-monospace, monospace";

const links = [
  { label: "プラン一覧",   sub: "PRICING", href: "https://service.kyakuhon-pakkun.com/pricing" },
  { label: "ブログ",       sub: "BLOG",    href: "https://service.kyakuhon-pakkun.com/blog" },
  { label: "お問い合わせ", sub: "CONTACT", href: "https://service.kyakuhon-pakkun.com/contact" },
  { label: "よくある質問", sub: "FAQ",     href: "https://service.kyakuhon-pakkun.com/faq" },
  { label: "会社概要",     sub: "ABOUT",   href: "https://service.kyakuhon-pakkun.com/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ background: "#fff", borderBottom: `1px solid ${LINE}`, position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <a href="https://service.kyakuhon-pakkun.com" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontFamily: WM, fontWeight: 900, fontSize: 26, letterSpacing: "-0.02em", color: PRIM, lineHeight: 1, fontFeatureSettings: '"palt"', whiteSpace: "nowrap" }}>
            脚本パックン
          </span>
          <span className="blog-hide-sm" style={{ fontSize: 11, color: MUTED, fontWeight: 600, borderLeft: `1px solid ${LINE}`, paddingLeft: 10, fontFamily: HD, whiteSpace: "nowrap" }}>
            香盤AI生成ツール
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="blog-header-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              style={{ display: "flex", alignItems: "baseline", gap: 6, textDecoration: "none", color: INK, fontFamily: HD, fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}
            >
              <span style={{ fontSize: 10, color: FAINT, fontWeight: 700, fontFamily: MN }}>0{i + 1}</span>
              <span>{l.label}</span>
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="blog-header-cta" style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
          <a href="https://kyakuhon-pakkun.com" style={{ color: SUB, textDecoration: "none", fontSize: 13, fontFamily: HD, fontWeight: 600, whiteSpace: "nowrap" }}>
            ログイン
          </a>
          <a
            href="https://kyakuhon-pakkun.com"
            style={{ background: PRIM, color: "#fff", padding: "12px 22px", borderRadius: 999, fontWeight: 700, fontFamily: HD, fontSize: 14, display: "inline-flex", alignItems: "center", textDecoration: "none", boxShadow: `0 6px 20px -6px ${PRIM}88`, whiteSpace: "nowrap" }}
          >
            30日間無料で試す
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="blog-header-burger"
          style={{ display: "none", background: "transparent", border: "none", padding: 8, cursor: "pointer" }}
          aria-label="メニュー"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2">
            <path d={open ? "M6 6L18 18M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: `1px solid ${LINE}`, padding: "16px 0", background: "#fff" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 22px", display: "flex", flexDirection: "column", gap: 14 }}>
            {links.map((l, i) => (
              <a key={l.href} href={l.href} style={{ display: "flex", alignItems: "baseline", gap: 8, color: INK, textDecoration: "none", fontFamily: HD, fontWeight: 700, fontSize: 18 }}>
                <span style={{ fontSize: 11, color: FAINT, fontFamily: MN }}>0{i + 1}</span>
                <span>{l.label}</span>
                <span style={{ fontSize: 10, color: FAINT, marginLeft: 4 }}>{l.sub}</span>
              </a>
            ))}
            <a href="https://kyakuhon-pakkun.com" style={{ color: SUB, textDecoration: "none", fontFamily: HD, fontWeight: 600, marginTop: 8 }}>
              ログイン
            </a>
            <a
              href="https://kyakuhon-pakkun.com"
              style={{ background: PRIM, color: "#fff", padding: "12px 22px", borderRadius: 999, fontWeight: 700, fontFamily: HD, fontSize: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: `0 6px 20px -6px ${PRIM}88` }}
            >
              30日間無料で試す
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
