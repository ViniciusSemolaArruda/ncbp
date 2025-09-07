// app/admin/login/page.tsx
export const dynamic = "force-dynamic"; // evita SSG/cachê se preferir

import LoginForm from "./LoginForm";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const unauthorized =
    typeof searchParams.unauthorized === "string" &&
    searchParams.unauthorized === "1";

  return <LoginForm unauthorized={unauthorized} />;
}
