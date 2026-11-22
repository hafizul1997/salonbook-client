
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

type ApiResponse = {
  success: boolean;
  message: string;
};

export default function AdminPasswordPage() {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword.length < 8 || newPassword.length > 128) {
      toast.error("Password must be between 8 and 128 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await apiRequest<ApiResponse>(
        "/users/admin/set-password",
        {
          method: "POST",
          auth: true,
          body: JSON.stringify({ newPassword }),
        }
      );

      toast.success(response.message || "Admin password set successfully.");
      setNewPassword("");
      setConfirmPassword("");

      router.push("/admin");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to set password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#81434F] hover:text-[#693541]"
      >
        <ArrowLeft size={17} />
        Back to Dashboard
      </Link>

      <div className="rounded-2xl border border-[#EDE5DF] bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FCF1F0] text-[#81434F]">
          <LockKeyhole size={27} />
        </div>

        <h1 className="text-2xl font-bold text-[#29201F]">
          Admin Password Settings
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Create a password for your existing Google Admin account.
          You will be able to sign in using either Google or email and password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              New Password
            </label>

            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={8}
                maxLength={128}
                autoComplete="new-password"
                required
                placeholder="Enter your new password"
                className="w-full rounded-xl border border-[#EDE5DF] px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#81434F] focus:ring-2 focus:ring-[#81434F]/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#81434F]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              maxLength={128}
              autoComplete="new-password"
              required
              placeholder="Enter your password again"
              className="w-full rounded-xl border border-[#EDE5DF] px-4 py-3 text-sm outline-none transition focus:border-[#81434F] focus:ring-2 focus:ring-[#81434F]/10"
            />
          </div>

          <p className="text-xs text-gray-500">
            Use at least 8 characters. Keep your password private.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#81434F] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#693541] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving Password...
              </>
            ) : (
              <>
                <LockKeyhole size={18} />
                Save Admin Password
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
