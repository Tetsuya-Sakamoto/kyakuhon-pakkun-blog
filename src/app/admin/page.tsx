import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export const metadata = {
  title: "記事投稿 | 脚本パックン ブログ管理",
  robots: { index: false, follow: false },
};

async function checkAuth(formData: FormData) {
  "use server";
  const password = formData.get("password") as string;
  const adminPassword = process.env.BLOG_ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("BLOG_ADMIN_PASSWORD is not set");
  }

  if (password !== adminPassword) {
    redirect("/blog/admin?error=1");
  }
  redirect("/blog/admin?auth=1");
}

type Props = {
  searchParams: Promise<{ auth?: string; error?: string }>;
};

export default async function AdminPage({ searchParams }: Props) {
  const sp = await searchParams;
  const isAuth = sp.auth === "1";
  const hasError = sp.error === "1";

  // In production, auth is session-based via URL param (simple approach)
  // For a more secure solution, use iron-session or similar
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="bg-white border border-[#e5e7eb] rounded-lg p-8 w-full max-w-sm shadow-sm">
          <h1 className="text-xl font-bold text-[#1a1a1a] mb-6 text-center">
            管理者ログイン
          </h1>
          <form action={checkAuth} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#1a1a1a] mb-1"
              >
                パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full border border-[#e5e7eb] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2196f3]"
                placeholder="管理者パスワード"
              />
            </div>
            {hasError && (
              <p className="text-red-500 text-sm">パスワードが違います。</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#2196f3] text-white rounded px-4 py-2 text-sm font-medium hover:bg-[#1976d2] transition-colors"
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminClient />;
}
