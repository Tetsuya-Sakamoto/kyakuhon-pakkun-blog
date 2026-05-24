import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ borderTop: "1px solid #E2E8F0", background: "#FFFFFF" }}>
      <div className="max-w-5xl mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <Link href="https://service.kyakuhon-pakkun.com" className="inline-block mb-2">
              <span className="font-black text-lg" style={{ color: "#2196F3" }}>脚本パックン</span>
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF", maxWidth: "240px" }}>
              映像制作の香盤表・PPM資料・進行管理を<br />ひとつのツールでまとめて。
            </p>
          </div>
          <div className="flex flex-col gap-2 text-xs" style={{ color: "#9CA3AF" }}>
            <Link href="/blog" className="hover:text-blue-500 transition-colors">ブログトップ</Link>
            <Link href="https://service.kyakuhon-pakkun.com" className="hover:text-blue-500 transition-colors">サービスサイト</Link>
          </div>
        </div>
        <div className="pt-6 border-t flex items-center justify-between" style={{ borderColor: "#F3F4F6" }}>
          <p className="text-xs" style={{ color: "#D1D5DB" }}>
            © {new Date().getFullYear()} 脚本パックン
          </p>
          <Link
            href="https://service.kyakuhon-pakkun.com"
            className="text-xs font-black px-4 py-2 rounded-full transition-all hover:opacity-85"
            style={{ background: "#2196F3", color: "#fff" }}
          >
            無料で使う →
          </Link>
        </div>
      </div>
    </footer>
  );
}
