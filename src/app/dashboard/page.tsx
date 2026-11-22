
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Wallet,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

type Appointment = {
  _id: string;
  serviceId:
    | {
        _id: string;
        serviceName: string;
      }
    | string;
  appointmentDate: string;
  timeSlot: string;
  servicePrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "unpaid" | "paid";
  createdAt: string;
};

type AppointmentResponse = {
  success: boolean;
  total: number;
  data: Appointment[];
};

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const { data: session } = authClient.useSession();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [todayStart, setTodayStart] = useState<number | null>(null);

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiRequest<AppointmentResponse>(
        "/appointments/my",
        { auth: true }
      );

      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      setTodayStart(currentDate.getTime());
      setAppointments(response.data || []);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to load your appointments";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const request = Promise.resolve().then(() => {
      void loadAppointments();
    });

    return () => {
      void request;
    };
  }, [loadAppointments]);

  const stats = useMemo(() => {
    const upcoming = appointments.filter((appointment) => {
      if (todayStart === null) return false;

      const date = new Date(appointment.appointmentDate);
      date.setHours(0, 0, 0, 0);

      return (
        date.getTime() >= todayStart &&
        ["pending", "confirmed"].includes(appointment.status)
      );
    });

    const completed = appointments.filter(
      (appointment) => appointment.status === "completed"
    );

    const totalSpent = appointments
      .filter((appointment) => appointment.paymentStatus === "paid")
      .reduce(
        (total, appointment) =>
          total + Number(appointment.servicePrice || 0),
        0
      );

    return [
      {
        title: "Total Appointments",
        value: appointments.length.toString(),
        icon: CalendarDays,
      },
      {
        title: "Upcoming",
        value: upcoming.length.toString(),
        icon: Clock,
      },
      {
        title: "Completed",
        value: completed.length.toString(),
        icon: CheckCircle2,
      },
      {
        title: "Total Spent",
        value: `$${totalSpent.toFixed(2)}`,
        icon: Wallet,
      },
    ];
  }, [appointments, todayStart]);

  const recentAppointments = useMemo(
    () =>
      [...appointments]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
        .slice(0, 5),
    [appointments]
  );

  const customerName = session?.user?.name?.trim() || "Customer";

  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-sm text-gray-500">
          Customer Dashboard
        </p>

        <h1 className="text-2xl font-bold text-[#29201F] md:text-3xl">
          Welcome Back, {customerName}!
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your appointments and account information.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#EDE5DF] bg-white py-16 text-gray-500">
          <Loader2 size={20} className="animate-spin" />
          Loading your dashboard...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
          <p className="text-sm text-red-600">{error}</p>

          <button
            onClick={() => void loadAppointments()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#81434F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#693541]"
          >
            <RefreshCw size={15} />
            Try Again
          </button>
        </div>
      ) : (
        <>
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

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#EDE5DF] bg-white">
            <div className="border-b border-[#EDE5DF] p-6">
              <h2 className="text-lg font-bold text-[#29201F]">
                Recent Activity
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your latest appointment bookings.
              </p>
            </div>

            {recentAppointments.length === 0 ? (
              <p className="p-8 text-center text-sm text-gray-500">
                You have no appointments yet.
              </p>
            ) : (
              <div className="divide-y divide-[#EDE5DF]">
                {recentAppointments.map((appointment) => {
                  const service =
                    typeof appointment.serviceId === "object"
                      ? appointment.serviceId
                      : null;

                  return (
                    <div
                      key={appointment._id}
                      className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                    >
                      <div>
                        <h3 className="font-semibold text-[#29201F]">
                          {service?.serviceName || "Service unavailable"}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {formatDate(appointment.appointmentDate)} ·{" "}
                          {appointment.timeSlot}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-semibold text-[#29201F]">
                          ${Number(appointment.servicePrice || 0).toFixed(2)}
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-700">
                          {appointment.status}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            appointment.paymentStatus === "paid"
                              ? "bg-green-50 text-green-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {appointment.paymentStatus}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
