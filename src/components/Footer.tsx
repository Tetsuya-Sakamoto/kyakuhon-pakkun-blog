const PRIM = "#2196F3";
const SUB = "#374151";
const MUTED = "#6B7280";
const FAINT = "#9CA3AF";
const LINE = "#E5E7EB";
const HD = "'Noto Sans JP', sans-serif";
const WM = "'M PLUS Rounded 1c', sans-serif";

const links = [
  { l: "利用規約",             h: "https://service.kyakuhon-pakkun.com/terms" },
  { l: "プライバシーポリシー",  h: "https://service.kyakuhon-pakkun.com/privacy" },
  { l: "特定商取引法に基づく表記", h: "https://service.kyakuhon-pakkun.com/tokushoho" },
  { l: "お問い合わせ",          h: "https://service.kyakuhon-pakkun.com/contact" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#F8F8F4", color: SUB, padding: "60px 0 40px", borderTop: `1px solid ${LINE}` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}>
        <div className="blog-footer-grid" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, flexWrap: "wrap" }}>
          <div>
            <a href="https://service.kyakuhon-pakkun.com" style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: WM, fontWeight: 900, fontSize: 26, letterSpacing: "-0.02em", color: PRIM, lineHeight: 1, fontFeatureSettings: '"palt"', display: "inline-block" }}>
                脚本パックン
              </span>
            </a>
            <div style={{ fontFamily: HD, fontSize: 12, color: MUTED, marginTop: 8 }}>香盤AI生成ツール</div>
          </div>
          <div style={{ display: "flex", gap: 32, fontSize: 13, fontFamily: HD, flexWrap: "wrap" }}>
            {links.map(({ l, h }) => (
              <a key={l} href={h} style={{ color: SUB, textDecoration: "none", fontWeight: 500 }}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${LINE}`, marginTop: 40, paddingTop: 20, fontSize: 11, color: FAINT, fontFamily: HD }}>
          <span style={{ whiteSpace: "nowrap" }}>© 2026 脚本パックン</span>
        </div>
      </div>
    </footer>
  );
}
