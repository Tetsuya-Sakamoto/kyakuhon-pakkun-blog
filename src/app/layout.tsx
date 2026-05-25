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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;800;900&family=M+PLUS+Rounded+1c:wght@500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{
          background: "#FAFAF7",
          color: "#0F172A",
          fontFamily: "'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
          fontFeatureSettings: '"palt"',
          WebkitFontSmoothing: "antialiased",
          wordBreak: "keep-all",
          lineBreak: "strict",
          overflowWrap: "break-word",
        } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
