import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "脚本パックン ブログ | 映像制作のお役立ち情報",
    template: "%s | 脚本パックン ブログ",
  },
  description:
    "映像制作の現場で役立つ情報を発信。香盤表・PPM資料・進行管理ツールの使い方から業界知識まで。",
  metadataBase: new URL("https://service.kyakuhon-pakkun.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-[#1a1a1a]">
        {children}
      </body>
    </html>
  );
}
