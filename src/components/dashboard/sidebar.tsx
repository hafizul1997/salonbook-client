
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  History,
  UserRound,
  ArrowLeft,
  Scissors,
} from "lucide-react";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Appointments",
    href: "/dashboard/appointments",
    icon: CalendarDays,
  },
  {
    name: "Booking History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    name: "My Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-full flex-col border-r border-[#EDE5DF] bg-white px-5 py-7 md:w-64">
      <Link href="/" className="mb-10 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#81434F] text-white">
          <Scissors size={21} />
        </div>

        <span className="text-xl font-bold text-[#29201F]">
          Salon<span className="text-[#81434F]">Book</span>
        </span>
      </Link>

      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Menu
      </p>

      <nav className="flex flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-[#81434F] text-white"
                  : "text-gray-600 hover:bg-[#FCF5F2] hover:text-[#81434F]"
              }`}
            >
              <Icon size={19} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-[#EDE5DF] pt-5">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-[#FCF5F2] hover:text-[#81434F]"
        >
          <ArrowLeft size={19} />
          Back to Home
        </Link>
      </div>
    </aside>
  );
}
