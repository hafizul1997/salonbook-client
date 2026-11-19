
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Wallet,
} from "lucide-react";

const stats = [
  {
    title: "Total Appointments",
    value: "12",
    icon: CalendarDays,
  },
  {
    title: "Upcoming",
    value: "03",
    icon: Clock,
  },
  {
    title: "Completed",
    value: "09",
    icon: CheckCircle2,
  },
  {
    title: "Total Spent",
    value: "$450",
    icon: Wallet,
  },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-sm text-gray-500">
          Customer Dashboard
        </p>

        <h1 className="text-2xl font-bold text-[#29201F] md:text-3xl">
          Welcome Back!
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your appointments and account information.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-[#EDE5DF] bg-white p-6"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FCF1F0] text-[#81434F]">
                <Icon size={22} />
              </div>

              <p className="text-sm text-gray-500">
                {stat.title}
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#29201F]">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-[#EDE5DF] bg-white p-6">
        <h2 className="text-lg font-bold text-[#29201F]">
          Recent Activity
        </h2>

        <p className="mt-3 text-sm text-gray-500">
          Your recent appointments will appear here.
        </p>
      </div>
    </div>
  );
}
