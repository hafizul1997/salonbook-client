
import Link from "next/link";
import {
  Users,
  Scissors,
  CalendarDays,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const stats = [
  { title: "Total Customers", value: "120", icon: Users },
  { title: "Total Services", value: "18", icon: Scissors },
  { title: "Appointments", value: "56", icon: CalendarDays },
  { title: "Total Revenue", value: "$2,450", icon: CreditCard },
];

const quickLinks = [
  { name: "Manage Services", href: "/admin/services" },
  { name: "Manage Appointments", href: "/admin/appointments" },
  { name: "Manage Customers", href: "/admin/customers" },
  { name: "View Transactions", href: "/admin/transactions" },
];

export default function AdminPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-sm text-gray-500">
          Administration Panel
        </p>

        <h1 className="text-2xl font-bold text-[#29201F] md:text-3xl">
          Admin Overview
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your salon booking platform.
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

              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="mt-2 text-2xl font-bold text-[#29201F]">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-[#EDE5DF] bg-white p-6">
        <h2 className="mb-5 text-lg font-bold text-[#29201F]">
          Quick Management
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between rounded-xl border border-[#EDE5DF] p-4 text-sm font-medium text-gray-700 transition hover:border-[#81434F] hover:text-[#81434F]"
            >
              {link.name}
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
