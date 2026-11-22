
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

    // Admin must always go to the admin dashboard.
    if (session.user.role === "admin") {
      router.replace("/admin");
      return;
    }

    // Restore the requested page after customer login.
    const params = new URLSearchParams(window.location.search);
    const requestedPath = params.get("returnTo");

    const safeReturnTo =
      requestedPath &&
      requestedPath.startsWith("/") &&
      !requestedPath.startsWith("//")
        ? requestedPath
        : "/dashboard";

    router.replace(safeReturnTo);
  }, [session, isPending, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">
        Checking your account...
      </p>
    </div>
  );
}
