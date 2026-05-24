type Heading = { text: string; id: string };

type Props = { headings: Heading[] };

export default function TableOfContents({ headings }: Props) {
  if (headings.length < 2) return null;

  return (
    <nav
      className="mb-8 rounded-xl p-5"
      style={{ background: "#F0F7FF", border: "1.5px solid #BFDBFE" }}
      aria-label="目次"
    >
      <p
        className="font-black mb-3"
        style={{ fontSize: "0.7rem", color: "#2196F3", letterSpacing: "0.12em", textTransform: "uppercase" }}
      >
        目次
      </p>
      <ol className="space-y-1.5" style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {headings.map((h, i) => (
          <li key={h.id} className="flex items-baseline gap-2">
            <span
              className="font-black shrink-0"
              style={{ fontSize: "0.65rem", color: "#93C5FD", minWidth: "1.2rem" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${h.id}`}
              className="text-sm leading-snug transition-colors hover:underline"
              style={{ color: "#1E40AF", textDecorationColor: "#BFDBFE" }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
