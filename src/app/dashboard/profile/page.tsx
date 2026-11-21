
"use client";

import {
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
console.log("SESSION USER:", session?.user);
console.log("SESSION ROLE:", session?.user?.role);
  if (isPending) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading your profile...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="py-12 text-center text-gray-500">
        Please sign in to view your profile.
      </div>
    );
  }

  const user = session.user;

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-sm text-gray-500">
          Customer Dashboard / Profile
        </p>

        <h1 className="text-2xl font-bold text-[#29201F] md:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View and manage your personal information.
        </p>
      </div>

      <div className="max-w-3xl overflow-hidden rounded-2xl border border-[#EDE5DF] bg-white">
        <div className="bg-[#81434F] px-6 py-8 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <UserRound size={32} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {user.name || "SalonBook Customer"}
              </h2>
              <p className="mt-1 text-sm text-white/80">
                SalonBook Customer
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="mb-5 font-bold text-[#29201F]">
            Personal Information
          </h3>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <UserRound size={17} />
                Full Name
              </div>
              <p className="font-semibold text-[#29201F]">
                {user.name || "Not available"}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <Mail size={17} />
                Email Address
              </div>
              <p className="font-semibold text-[#29201F]">
                {user.email}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <Phone size={17} />
                Phone Number
              </div>
              <p className="font-semibold text-[#29201F]">
                Not added yet
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={17} />
                Member Since
              </div>
              <p className="font-semibold text-[#29201F]">
                {memberSince}
              </p>
            </div>
          </div>

          <div className="my-7 border-t border-[#EDE5DF]" />

          <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4">
            <ShieldCheck className="shrink-0 text-green-600" size={22} />
            <div>
              <p className="text-sm font-semibold text-green-800">
                Account Information
              </p>
              <p className="mt-1 text-xs text-green-700">
                Your account details are loaded from your authenticated account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
