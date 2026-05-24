import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e5e7eb] mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <Link
              href="https://service.kyakuhon-pakkun.com"
              className="font-bold text-[#1a1a1a] hover:text-[#2196f3]"
            >
              脚本パックン
            </Link>
            <p className="text-sm text-[#666666] mt-1">
              映像制作の進行管理を、もっとスマートに。
            </p>
          </div>
          <div className="text-sm text-[#666666]">
            <Link
              href="https://service.kyakuhon-pakkun.com"
              className="hover:text-[#2196f3]"
            >
              サービスサイト
            </Link>
            <span className="mx-2">·</span>
            <Link href="/blog" className="hover:text-[#2196f3]">
              ブログトップ
            </Link>
          </div>
        </div>
        <p className="text-xs text-[#666666] mt-6">
          © {new Date().getFullYear()} 脚本パックン. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
