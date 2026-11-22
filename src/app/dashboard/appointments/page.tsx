
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  LoaderCircle,
  XCircle,
  RefreshCw,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

interface Service {
  _id: string;
  serviceName: string;
  category?: string;
  image?: string;
}

interface Appointment {
  _id: string;
  serviceId: Service | string | null;
  appointmentDate: string;
  timeSlot: string;
  servicePrice: number;
  paymentStatus: "paid" | "unpaid";
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

interface AppointmentsResponse {
  success: boolean;
  message: string;
  total: number;
  data: Appointment[];
}

interface CheckoutResponse {
  success: boolean;
  message: string;
  data: {
    checkoutUrl: string | null;
    sessionId: string;
  };
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const loadAppointments = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");

      const response = await apiRequest<AppointmentsResponse>(
        "/appointments/my",
        { auth: true }
      );

      setAppointments(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load appointments";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchAppointments = async () => {
      try {
        const response = await apiRequest<AppointmentsResponse>(
          "/appointments/my",
          { auth: true }
        );

        if (!isMounted) return;

        setAppointments(
          Array.isArray(response.data) ? response.data : []
        );
        setError("");
      } catch (err: unknown) {
        if (!isMounted) return;

        const message =
          err instanceof Error
            ? err.message
            : "Failed to load appointments";

        setError(message);
        toast.error(message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchAppointments();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCancel = async (): Promise<void> => {
    if (!selectedAppointment) return;

    try {
      setCancellingId(selectedAppointment._id);

      await apiRequest(
        `/appointments/${selectedAppointment._id}/cancel`,
        {
          method: "PATCH",
          auth: true,
        }
      );

      toast.success("Appointment cancelled successfully");

      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment._id === selectedAppointment._id
            ? { ...appointment, status: "cancelled" }
            : appointment
        )
      );

      setSelectedAppointment(null);
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to cancel appointment"
      );
    } finally {
      setCancellingId(null);
    }
  };

  const handlePayment = async (
    appointmentId: string
  ): Promise<void> => {
    try {
      setPayingId(appointmentId);

      const response = await apiRequest<CheckoutResponse>(
        "/payments/create-checkout-session",
        {
          method: "POST",
          auth: true,
          body: JSON.stringify({ appointmentId }),
        }
      );

      const checkoutUrl = response.data?.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error("Stripe checkout URL was not returned");
      }

      // Redirect customer to Stripe Checkout.
      window.location.assign(checkoutUrl);
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Unable to start payment"
      );

      setPayingId(null);
    }
  };

  const getServiceName = (
    serviceId: Service | string | null | undefined
  ): string => {
    if (!serviceId) {
      return "Unavailable Service";
    }

    if (typeof serviceId === "string") {
      return "Salon Service";
    }

    return serviceId.serviceName || "Unavailable Service";
  };

  const formatDate = (date: string): string => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number): string => {
    const safePrice = Number(price);

    return Number.isFinite(safePrice)
      ? safePrice.toFixed(2)
      : "0.00";
  };

  const getStatusStyle = (status: Appointment["status"]): string => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Customer Dashboard / Appointments
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#29201F]">
          My Appointments
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View and manage all your salon appointments.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#EDE5DF] bg-white py-16">
          <LoaderCircle
            className="animate-spin text-[#81434F]"
            size={32}
          />
          <p className="mt-3 text-sm text-gray-500">
            Loading your appointments...
          </p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
          <p className="text-red-600">{error}</p>

          <button
            onClick={() => void loadAppointments()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#81434F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#693540]"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      ) : appointments.length === 0 ? (
        <div className="rounded-2xl border border-[#EDE5DF] bg-white px-6 py-16 text-center">
          <CalendarDays
            size={42}
            className="mx-auto text-[#81434F]"
          />

          <h2 className="mt-4 text-xl font-bold text-[#29201F]">
            No Appointments Yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            You have not booked any salon appointments yet.
          </p>

          <Link
            href="/services"
            className="mt-6 inline-block rounded-lg bg-[#81434F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#693540]"
          >
            Explore Services
          </Link>
        </div>
      ) : (
        <div className="grid gap-5">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="rounded-2xl border border-[#EDE5DF] bg-white p-6"
            >
              <div className="flex flex-col justify-between gap-5 sm:flex-row">
                <div className="min-w-0">
                  <p className="break-all text-xs text-gray-400">
                    Booking ID: {appointment._id}
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-[#29201F]">
                    {getServiceName(appointment.serviceId)}
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {formatDate(appointment.appointmentDate)}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock size={16} />
                      {appointment.timeSlot || "Time unavailable"}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-2 text-gray-500">
                      <CreditCard size={16} />
                      Payment:
                      <span
                        className={
                          appointment.paymentStatus === "paid"
                            ? "font-semibold text-green-700"
                            : "font-semibold text-yellow-700"
                        }
                      >
                        {appointment.paymentStatus === "paid"
                          ? "Paid"
                          : "Unpaid"}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="sm:text-right">
                    <p className="text-xl font-bold text-[#81434F]">
                      ${formatPrice(appointment.servicePrice)}
                    </p>

                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {appointment.status === "confirmed" &&
                      appointment.paymentStatus === "unpaid" && (
                        <button
                          onClick={() =>
                            void handlePayment(appointment._id)
                          }
                          disabled={payingId !== null}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#81434F] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#693540] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {payingId === appointment._id ? (
                            <LoaderCircle
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <CreditCard size={16} />
                          )}
                          {payingId === appointment._id
                            ? "Redirecting..."
                            : "Pay Now"}
                        </button>
                      )}

                    {appointment.status === "pending" && (
                      <button
                        onClick={() =>
                          setSelectedAppointment(appointment)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <XCircle size={16} />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="text-red-600" size={24} />
              </div>

              <h2 className="text-xl font-bold text-[#29201F]">
                Cancel Appointment?
              </h2>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Are you sure you want to cancel your appointment for{" "}
              <strong>
                {getServiceName(selectedAppointment.serviceId)}
              </strong>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedAppointment(null)}
                disabled={cancellingId !== null}
                className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Keep Appointment
              </button>

              <button
                onClick={() => void handleCancel()}
                disabled={cancellingId !== null}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {cancellingId ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : (
                  <XCircle size={16} />
                )}
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
