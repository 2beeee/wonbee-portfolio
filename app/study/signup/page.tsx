import Link from "next/link";
import { SignupForm } from "@/components/study/auth/signup-form";

export const metadata = { title: "Study Hub · Sign Up" };

export default function SignupPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-md flex-col justify-center px-4 py-12">
      <div className="space-y-1 pb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">STUDY HUB / CREATE</p>
        <h1 className="font-mono text-2xl tracking-wide text-warm-white">Sign Up</h1>
        <p className="text-sm text-text-secondary">사전에 허용된 이메일만 가입할 수 있습니다.</p>
      </div>
      <SignupForm />
      <p className="mt-6 text-xs text-text-muted">
        이미 계정이 있나요?{" "}
        <Link href="/study/login" className="text-combustion hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}
