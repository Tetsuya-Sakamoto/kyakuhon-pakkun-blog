import Link from "next/link";

const WM = "'M PLUS Rounded 1c', sans-serif";

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ borderTop: "1px solid #E5E7EB", background: "#F8F8F4" }}>
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <Link href="https://service.kyakuhon-pakkun.com" className="inline-block mb-2" style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: WM, fontWeight: 900, fontSize: "1.1rem", color: "#2196F3" }}>
                脚本パックン
              </span>
            </Link>
            <p style={{ fontSize: "0.75rem", lineHeight: 1.7, color: "#9CA3AF", maxWidth: "240px" }}>
              映像制作の香盤表・PPM資料・進行管理を<br />ひとつのツールでまとめて。
            </p>
          </div>
          <div className="flex flex-col gap-2" style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
            <Link href="/" className="hover:text-blue-500 transition-colors" style={{ textDecoration: "none" }}>ブログトップ</Link>
            <Link href="https://service.kyakuhon-pakkun.com" className="hover:text-blue-500 transition-colors" style={{ textDecoration: "none" }}>サービスサイト</Link>
          </div>
        </div>
        <div className="pt-6 border-t flex items-center justify-between" style={{ borderColor: "#F3F4F6" }}>
          <p style={{ fontSize: "0.7rem", color: "#D1D5DB" }}>
            © {new Date().getFullYear()} 脚本パックン
          </p>
          <Link
            href="https://kyakuhon-pakkun.com"
            className="transition-all hover:opacity-85"
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 800,
              padding: "8px 18px",
              borderRadius: "9999px",
              background: "#2196F3",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            無料で使う →
          </Link>
        </div>
      </div>
    </footer>
  );
}
