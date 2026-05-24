export const CATEGORIES = ["使い方", "業界知識", "事例", "ツール比較"] as const;
export type Category = (typeof CATEGORIES)[number];
