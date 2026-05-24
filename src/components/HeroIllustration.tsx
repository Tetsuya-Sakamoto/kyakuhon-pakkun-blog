export default function HeroIllustration() {
  return (
    <div className="hidden md:flex items-center justify-center" style={{ width: 320, flexShrink: 0 }}>
      <svg width="300" height="240" viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* 背景ドキュメント（一番奥）*/}
        <rect x="60" y="40" width="150" height="185" rx="10" fill="#E3F2FD" stroke="#BBDEFB" strokeWidth="1.5"/>
        <rect x="78" y="68" width="115" height="6" rx="3" fill="#BBDEFB"/>
        <rect x="78" y="83" width="95" height="6" rx="3" fill="#BBDEFB"/>
        <rect x="78" y="98" width="105" height="6" rx="3" fill="#BBDEFB"/>

        {/* 中間ドキュメント（グリッド表）*/}
        <rect x="80" y="20" width="155" height="185" rx="10" fill="#F0F7FF" stroke="#90CAF9" strokeWidth="1.5"/>
        {/* グリッドヘッダー */}
        <rect x="80" y="20" width="155" height="32" rx="10" fill="#90CAF9"/>
        <rect x="80" y="40" width="155" height="12" fill="#90CAF9"/>
        {/* ヘッダーテキスト */}
        <rect x="95" y="30" width="40" height="5" rx="2.5" fill="#1565C0"/>
        <rect x="145" y="30" width="30" height="5" rx="2.5" fill="#1565C0"/>
        <rect x="185" y="30" width="35" height="5" rx="2.5" fill="#1565C0"/>
        {/* グリッド縦線 */}
        <line x1="140" y1="52" x2="140" y2="190" stroke="#DBEAFE" strokeWidth="1"/>
        <line x1="180" y1="52" x2="180" y2="190" stroke="#DBEAFE" strokeWidth="1"/>
        {/* グリッド横線 */}
        <line x1="80" y1="70" x2="235" y2="70" stroke="#DBEAFE" strokeWidth="1"/>
        <line x1="80" y1="90" x2="235" y2="90" stroke="#DBEAFE" strokeWidth="1"/>
        <line x1="80" y1="110" x2="235" y2="110" stroke="#DBEAFE" strokeWidth="1"/>
        <line x1="80" y1="130" x2="235" y2="130" stroke="#DBEAFE" strokeWidth="1"/>
        <line x1="80" y1="150" x2="235" y2="150" stroke="#DBEAFE" strokeWidth="1"/>
        {/* セルテキスト */}
        <rect x="88" y="58" width="38" height="5" rx="2.5" fill="#93C5FD"/>
        <rect x="88" y="78" width="32" height="5" rx="2.5" fill="#93C5FD"/>
        <rect x="88" y="98" width="40" height="5" rx="2.5" fill="#93C5FD"/>
        <rect x="88" y="118" width="28" height="5" rx="2.5" fill="#93C5FD"/>
        <rect x="88" y="138" width="36" height="5" rx="2.5" fill="#93C5FD"/>
        <rect x="148" y="58" width="22" height="5" rx="2.5" fill="#BFDBFE"/>
        <rect x="148" y="78" width="18" height="5" rx="2.5" fill="#BFDBFE"/>
        <rect x="148" y="98" width="24" height="5" rx="2.5" fill="#BFDBFE"/>
        <rect x="148" y="118" width="20" height="5" rx="2.5" fill="#BFDBFE"/>

        {/* 前面：クラッパーボード */}
        <g transform="translate(155, 120) rotate(-10)">
          <rect x="0" y="18" width="100" height="72" rx="8" fill="#1E88E5"/>
          <rect x="0" y="18" width="100" height="72" rx="8" stroke="#1565C0" strokeWidth="1.5"/>
          {/* ボードのストライプ */}
          <rect x="0" y="0" width="100" height="22" rx="6" fill="#111827"/>
          <rect x="0" y="12" width="100" height="10" fill="#111827"/>
          {/* ストライプ模様 */}
          <rect x="8" y="2" width="12" height="18" rx="2" fill="#FFFFFF"/>
          <rect x="28" y="2" width="12" height="18" rx="2" fill="#2196F3"/>
          <rect x="48" y="2" width="12" height="18" rx="2" fill="#FFFFFF"/>
          <rect x="68" y="2" width="12" height="18" rx="2" fill="#2196F3"/>
          <rect x="88" y="2" width="8" height="18" rx="2" fill="#FFFFFF"/>
          {/* テキスト行 */}
          <rect x="12" y="30" width="50" height="5" rx="2.5" fill="#FFFFFF" opacity="0.6"/>
          <rect x="12" y="42" width="38" height="5" rx="2.5" fill="#FFFFFF" opacity="0.4"/>
          <rect x="12" y="54" width="44" height="5" rx="2.5" fill="#FFFFFF" opacity="0.4"/>
        </g>

        {/* チェックマーク（右上）*/}
        <circle cx="242" cy="38" r="18" fill="#2196F3"/>
        <path d="M234 38 L239 44 L250 32" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
