export const CATEGORIES = ["ハウツー", "基礎知識", "導入事例", "ツール比較"] as const;
export type Category = (typeof CATEGORIES)[number];
