
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AuthRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      try {
        const result = await authClient.getSession();

        if (cancelled) return;

        const session = result.data;

        if (!session?.user) {
          router.replace("/sign-in");
          return;
        }

        if (session.user.role === "admin") {
          router.replace("/admin");
          return;
        }

        const params = new URLSearchParams(
          window.location.search
        );

        const requestedPath = params.get("returnTo");

        const safeReturnTo =
          requestedPath &&
          requestedPath.startsWith("/") &&
          !requestedPath.startsWith("//")
            ? requestedPath
            : "/dashboard";

        router.replace(safeReturnTo);
      } catch (error) {
        console.error("Session verification failed:", error);

        if (!cancelled) {
          router.replace("/sign-in");
        }
      }
    };

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">
        Checking your account...
      </p>
    </div>
  );
}
