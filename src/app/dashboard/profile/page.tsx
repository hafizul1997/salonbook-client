
import {
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

const profile = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 234 567 8900",
  memberSince: "November 2026",
};

export default function ProfilePage() {
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
                {profile.name}
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
                {profile.name}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <Mail size={17} />
                Email Address
              </div>
              <p className="font-semibold text-[#29201F]">
                {profile.email}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <Phone size={17} />
                Phone Number
              </div>
              <p className="font-semibold text-[#29201F]">
                {profile.phone}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={17} />
                Member Since
              </div>
              <p className="font-semibold text-[#29201F]">
                {profile.memberSince}
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
                Your account details are displayed here.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-xl bg-[#81434F] px-5 py-3 text-sm font-semibold text-white opacity-60 sm:w-auto"
          >
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
