
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AuthRedirectPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/sign-in");
      return;
    }

    if (session.user.role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/dashboard");
    }
  }, [session, isPending, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Checking your account...</p>
    </div>
  );
}
