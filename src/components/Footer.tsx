import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ borderTop: "1px solid #1E2D45", background: "#080E1A" }}>
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <Link href="https://service.kyakuhon-pakkun.com" className="flex items-center gap-2 mb-2">
              <span className="font-black text-base" style={{ color: "#2196F3" }}>
                脚本パックン
              </span>
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: "#2D4060", maxWidth: "260px" }}>
              映像制作の香盤表・PPM資料・進行管理を<br />
              ひとつのツールでまとめて。
            </p>
          </div>
          <div className="flex gap-8 text-xs" style={{ color: "#2D4060" }}>
            <div className="flex flex-col gap-2">
              <Link href="/blog" className="hover:text-blue-400 transition-colors">ブログトップ</Link>
              <Link href="https://service.kyakuhon-pakkun.com" className="hover:text-blue-400 transition-colors">サービスサイト</Link>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t flex items-center justify-between" style={{ borderColor: "#1A2535" }}>
          <p className="text-xs" style={{ color: "#1E2D45" }}>
            © {new Date().getFullYear()} 脚本パックン
          </p>
          <Link
            href="https://service.kyakuhon-pakkun.com"
            className="text-xs font-black px-4 py-2 rounded transition-opacity hover:opacity-80"
            style={{ background: "#2196F3", color: "#fff" }}
          >
            無料で使う →
          </Link>
        </div>
      </div>
    </footer>
  );
}
