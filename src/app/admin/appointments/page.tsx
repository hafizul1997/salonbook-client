
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Search,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

type Appointment = {
  _id: string;
  customerId: string;
  serviceId:
    | {
        _id: string;
        serviceName: string;
        category: string;
        image: string;
      }
    | string;
  appointmentDate: string;
  timeSlot: string;
  servicePrice: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "unpaid" | "paid";
  message?: string;
  createdAt: string;
};

type AppointmentResponse = {
  success: boolean;
  total: number;
  data: Appointment[];
};

function statusStyle(status: string) {
  switch (status) {
    case "confirmed":
      return "bg-blue-50 text-blue-700";
    case "pending":
      return "bg-yellow-50 text-yellow-700";
    case "cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ManageAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadAppointments = useCallback(async () => {
    try {
      const response = await apiRequest<AppointmentResponse>(
        "/appointments/admin/all",
        { auth: true }
      );

      setAppointments(response.data || []);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load appointments"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadAppointments);
  }, [loadAppointments]);

  const handleAction = async (
    id: string,
    action: "confirm" | "cancel"
  ) => {
    const message =
      action === "confirm"
        ? "Are you sure you want to confirm this appointment?"
        : "Are you sure you want to cancel this appointment?";

    if (!window.confirm(message)) return;

    setProcessingId(id);

    try {
      await apiRequest(
        `/appointments/admin/${id}/${action}`,
        {
          method: "PATCH",
          auth: true,
        }
      );

      toast.success(
        action === "confirm"
          ? "Appointment confirmed successfully"
          : "Appointment cancelled successfully"
      );

      await loadAppointments();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Appointment update failed"
      );
    } finally {
      setProcessingId(null);
    }
  };

  const filteredAppointments = useMemo(() => {
    const term = search.toLowerCase().trim();

    if (!term) return appointments;

    return appointments.filter((appointment) => {
      const service =
        typeof appointment.serviceId === "object"
          ? appointment.serviceId?.serviceName
          : "";

      return (
        service?.toLowerCase().includes(term) ||
        appointment._id.toLowerCase().includes(term) ||
        appointment.status.toLowerCase().includes(term) ||
        appointment.paymentStatus.toLowerCase().includes(term)
      );
    });
  }, [appointments, search]);

  const pendingCount = appointments.filter(
    (item) => item.status === "pending"
  ).length;

  const confirmedCount = appointments.filter(
    (item) => item.status === "confirmed"
  ).length;

  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-sm text-gray-500">
          Admin / Appointments
        </p>

        <h1 className="text-2xl font-bold text-[#29201F] md:text-3xl">
          Manage Appointments
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View and monitor all customer bookings.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-5">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <h2 className="mt-2 text-2xl font-bold text-[#29201F]">
            {appointments.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-5">
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="mt-2 text-2xl font-bold text-yellow-600">
            {pendingCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-5">
          <p className="text-sm text-gray-500">Confirmed</p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {confirmedCount}
          </h2>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#EDE5DF] bg-white">
        <div className="flex flex-col gap-4 border-b border-[#EDE5DF] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-[#81434F]" />
            <h2 className="font-bold text-[#29201F]">
              All Appointments
            </h2>
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search appointments..."
              className="w-full rounded-xl border border-[#EDE5DF] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#81434F]"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-gray-500">
            <Loader2 size={20} className="animate-spin" />
            Loading appointments...
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-500">
            No appointments found.
          </div>
        ) : (
          <div className="divide-y divide-[#EDE5DF]">
            {filteredAppointments.map((appointment) => {
              const service =
                typeof appointment.serviceId === "object"
                  ? appointment.serviceId
                  : null;

              return (
                <div key={appointment._id} className="p-5">
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                      <p className="text-xs text-gray-400">
                        #{appointment._id.slice(-8).toUpperCase()}
                      </p>

                      <h3 className="mt-1 font-bold text-[#29201F]">
                        {service?.serviceName || "Service unavailable"}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Category: {service?.category || "N/A"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={14} />
                          {formatDate(appointment.appointmentDate)}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {appointment.timeSlot}
                        </span>
                      </div>

                      {appointment.message && (
                        <p className="mt-3 text-sm text-gray-500">
                          Message: {appointment.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                      <div className="mr-2">
                        <p className="font-bold text-[#29201F]">
                          ${appointment.servicePrice}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Payment: {appointment.paymentStatus}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>

                      {appointment.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleAction(appointment._id, "confirm")
                            }
                            disabled={processingId === appointment._id}
                            className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                          >
                            <CheckCircle size={14} />
                            Confirm
                          </button>

                          <button
                            onClick={() =>
                              handleAction(appointment._id, "cancel")
                            }
                            disabled={processingId === appointment._id}
                            className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                          >
                            <XCircle size={14} />
                            Cancel
                          </button>
                        </>
                      )}

                      {appointment.status === "confirmed" && (
                        <button
                          onClick={() =>
                            handleAction(appointment._id, "cancel")
                          }
                          disabled={processingId === appointment._id}
                          className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                        >
                          <XCircle size={14} />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
