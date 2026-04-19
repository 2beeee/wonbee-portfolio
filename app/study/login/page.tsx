import Link from "next/link";
import { LoginForm } from "@/components/study/auth/login-form";

export const metadata = { title: "Study Hub · Sign In" };

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string; signup?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-md flex-col justify-center px-4 py-12">
      <div className="space-y-1 pb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">STUDY HUB / ACCESS</p>
        <h1 className="font-mono text-2xl tracking-wide text-warm-white">Sign In</h1>
        <p className="text-sm text-text-secondary">허용된 이메일만 접근할 수 있어요.</p>
      </div>
      {params.signup === "ok" && (
        <div className="mb-4 rounded-lg border border-lox/40 bg-lox/10 px-4 py-3 text-xs text-lox">
          회원가입 완료. 이메일로 전송된 링크로 인증한 뒤 로그인하세요.
        </div>
      )}
      <LoginForm next={params.next ?? "/study"} />
      <p className="mt-6 text-xs text-text-muted">
        계정이 없나요?{" "}
        <Link href="/study/signup" className="text-combustion hover:underline">
          가입하기
        </Link>
      </p>
    </div>
  );
}
