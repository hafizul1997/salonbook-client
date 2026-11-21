
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Scissors,
  CalendarDays,
  CreditCard,
  ArrowRight,
  Loader2,
  RefreshCw,
  LogOut,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

type User = {
  _id: string;
  role: string;
};

type Service = {
  _id: string;
  status: string;
};

type Appointment = {
  _id: string;
  status: string;
};

type Transaction = {
  _id: string;
  amount: number;
  currency: string;
  status: string;
};

type ApiResponse<T> = {
  success: boolean;
  total: number;
  data: T[];
};

type DashboardStats = {
  customers: number;
  services: number;
  appointments: number;
  revenue: number;
  pendingAppointments: number;
  confirmedAppointments: number;
};

const quickLinks = [
  {
    name: "Manage Services",
    description: "Add, edit and manage salon services",
    href: "/admin/services",
    icon: Scissors,
  },
  {
    name: "Manage Appointments",
    description: "Review and manage bookings",
    href: "/admin/appointments",
    icon: CalendarDays,
  },
  {
    name: "Manage Customers",
    description: "View and manage customer accounts",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "View Transactions",
    description: "Review customer payments",
    href: "/admin/transactions",
    icon: CreditCard,
  },
];

const initialStats: DashboardStats = {
  customers: 0,
  services: 0,
  appointments: 0,
  revenue: 0,
  pendingAppointments: 0,
  confirmedAppointments: 0,
};

export default function AdminPage() {
  const router = useRouter();

  const [stats, setStats] = useState(initialStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setError("");

      const [usersResponse, servicesResponse, appointmentsResponse, transactionsResponse] =
        await Promise.all([
          apiRequest<ApiResponse<User>>("/users", { auth: true }),
          apiRequest<ApiResponse<Service>>("/services/admin/all", {
            auth: true,
          }),
          apiRequest<ApiResponse<Appointment>>(
            "/appointments/admin/all",
            { auth: true }
          ),
          apiRequest<ApiResponse<Transaction>>("/transactions", {
            auth: true,
          }),
        ]);

      const customers = usersResponse.data.filter(
        (user) => user.role === "customer"
      ).length;

      const appointments = appointmentsResponse.data;

      const pendingAppointments = appointments.filter(
        (appointment) => appointment.status === "pending"
      ).length;

      const confirmedAppointments = appointments.filter(
        (appointment) => appointment.status === "confirmed"
      ).length;

      const paidTransactions = transactionsResponse.data.filter(
        (transaction) => transaction.status === "paid"
      );

      const revenue = paidTransactions.reduce(
        (total, transaction) => total + Number(transaction.amount || 0),
        0
      );

      setStats({
        customers,
        services: servicesResponse.total,
        appointments: appointmentsResponse.total,
        revenue,
        pendingAppointments,
        confirmedAppointments,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load dashboard information.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadDashboard);
  }, [loadDashboard]);

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Failed to sign out. Please try again.");
        return;
      }

      toast.success("Signed out successfully.");
      router.replace("/sign-in");
    } catch {
      toast.error("Something went wrong while signing out.");
    }
  };

  const statCards = [
    {
      title: "Total Customers",
      value: stats.customers,
      icon: Users,
    },
    {
      title: "Total Services",
      value: stats.services,
      icon: Scissors,
    },
    {
      title: "Total Appointments",
      value: stats.appointments,
      icon: CalendarDays,
    },
    {
      title: "Total Revenue",
      value: `$${stats.revenue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: CreditCard,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center gap-3 text-[#81434F]">
        <Loader2 className="animate-spin" size={25} />
        <span className="text-sm font-medium">
          Loading dashboard information...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
        <h2 className="text-lg font-bold text-gray-800">
          Unable to Load Dashboard
        </h2>

        <p className="mt-2 text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => {
            setLoading(true);
            void loadDashboard();
          }}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#81434F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#693541]"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
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

        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 rounded-full border border-[#EDE5DF] bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-red-300 hover:text-red-600"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
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

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Pending Appointments
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#29201F]">
                {stats.pendingAppointments}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Confirmed Appointments
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#29201F]">
                {stats.confirmedAppointments}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-[#EDE5DF] bg-white p-6">
        <h2 className="mb-5 text-lg font-bold text-[#29201F]">
          Quick Management
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {quickLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between gap-4 rounded-xl border border-[#EDE5DF] p-4 text-sm text-gray-700 transition hover:border-[#81434F] hover:text-[#81434F]"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className="shrink-0" />

                  <div>
                    <p className="font-semibold">{link.name}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {link.description}
                    </p>
                  </div>
                </div>

                <ArrowRight size={17} className="shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
