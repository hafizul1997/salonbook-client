
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  status: "active" | "inactive";
};

type ServicesResponse = {
  success: boolean;
  total: number;
  data: Service[];
};

type BookingClientProps = {
  serviceId: string;
};

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

function getLocalDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatTime(time: string) {
  const [hourString, minute] = time.split(":");
  const hour = Number(hourString);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute} ${suffix}`;
}

export default function BookingClient({
  serviceId,
}: BookingClientProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [appointmentDate, setAppointmentDate] = useState(
    getLocalDateString
  );
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const today = getLocalDateString();

  // Redirect unauthenticated users to sign in.
  useEffect(() => {
    if (isPending) return;

    const bookingUrl = `/services/${serviceId}/book`;

    if (!session?.user) {
      router.replace(
        `/sign-in?returnTo=${encodeURIComponent(bookingUrl)}`
      );
      return;
    }

    if (session.user.role === "admin") {
      router.replace("/admin");
    }
  }, [isPending, session, router, serviceId]);

  // Load the selected active service.
  useEffect(() => {
    let isMounted = true;

    async function loadService() {
      try {
        setIsLoading(true);
        setError("");

        const response = (await apiRequest(
          "/services"
        )) as ServicesResponse;

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid services response.");
        }

        const foundService = response.data.find(
          (item) =>
            item._id === serviceId && item.status === "active"
        );

        if (!foundService) {
          throw new Error("This service is unavailable.");
        }

        if (isMounted) {
          setService(foundService);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load service details."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadService();

    return () => {
      isMounted = false;
    };
  }, [serviceId]);

  async function handleBooking() {
    setError("");

    if (!session?.user) {
      router.replace(
        `/sign-in?returnTo=${encodeURIComponent(
          `/services/${serviceId}/book`
        )}`
      );
      return;
    }

    if (session.user.role === "admin") {
      setError("Admin accounts cannot create customer appointments.");
      return;
    }

    if (!appointmentDate) {
      setError("Please select an appointment date.");
      return;
    }

    if (!timeSlot) {
      setError("Please select an appointment time.");
      return;
    }

    // Combine the selected date and time into a local datetime.
    const selectedDateTime = new Date(
      `${appointmentDate}T${timeSlot}:00`
    );

    if (Number.isNaN(selectedDateTime.getTime())) {
      setError("Please select a valid appointment date and time.");
      return;
    }

    if (selectedDateTime.getTime() <= Date.now()) {
      setError("Please select a future appointment time.");
      return;
    }

    try {
      setIsSubmitting(true);

      await apiRequest("/appointments", {
        method: "POST",
        auth: true,
        body: JSON.stringify({
          serviceId,
          appointmentDate: selectedDateTime.toISOString(),
          timeSlot,
          message: message.trim(),
        }),
      });

      router.push("/dashboard/appointments");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your appointment. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isPending || isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FCFAF7]">
        <div className="flex items-center gap-3 text-sm text-[#81434F]">
          <Loader2 size={19} className="animate-spin" />
          Loading booking page...
        </div>
      </main>
    );
  }

  if (!session?.user || session.user.role === "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FCFAF7]">
        <p className="text-sm text-[#81434F]">
          Redirecting...
        </p>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FCFAF7] px-5 text-center">
        <h1 className="text-2xl font-semibold text-[#29201F]">
          Service Unavailable
        </h1>

        <p className="mt-3 text-sm text-[#786e68]">
          {error || "This service could not be found."}
        </p>

        <Link
          href="/services"
          className="mt-6 rounded-full bg-[#81434F] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to Services
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFAF7] px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/services/${serviceId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#81434F] hover:gap-3"
        >
          <ArrowLeft size={17} />
          Back to Service
        </Link>

        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9D5964]">
            Reserve Your Visit
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#29201F] sm:text-4xl">
            Book Appointment
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#786e68]">
            Choose your preferred date and time to book your salon
            appointment.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Selected Service */}
          <section className="h-fit overflow-hidden rounded-2xl border border-[#eee6df] bg-white">
            <div
              className="h-56 bg-cover bg-center"
              style={{
                backgroundImage: `url("${service.image}")`,
              }}
              role="img"
              aria-label={service.serviceName}
            />

            <div className="p-6">
              <p className="text-xs font-semibold text-[#9D5964]">
                {service.category}
              </p>

              <h2 className="mt-2 text-xl font-semibold text-[#29201F]">
                {service.serviceName}
              </h2>

              <div className="mt-5 flex items-center justify-between text-sm text-[#786e68]">
                <span className="flex items-center gap-2">
                  <Clock3 size={16} />
                  {service.duration} minutes
                </span>

                <span className="text-xl font-bold text-[#81434F]">
                  ${service.price}
                </span>
              </div>

              <div className="mt-5 flex items-start gap-2 border-t border-[#eee6df] pt-5 text-xs leading-6 text-[#786e68]">
                <CheckCircle2
                  size={16}
                  className="mt-1 shrink-0 text-[#81434F]"
                />
                Your appointment will be created as pending.
                Payment is not collected at this step.
              </div>
            </div>
          </section>

          {/* Booking Form */}
          <section className="rounded-2xl border border-[#eee6df] bg-white p-6 sm:p-8">
            <div>
              <label
                htmlFor="appointmentDate"
                className="flex items-center gap-2 text-sm font-semibold text-[#29201F]"
              >
                <CalendarDays size={17} className="text-[#81434F]" />
                Appointment Date
              </label>

              <input
                id="appointmentDate"
                type="date"
                min={today}
                value={appointmentDate}
                onChange={(event) => {
                  setAppointmentDate(event.target.value);
                  setError("");
                }}
                className="mt-3 w-full rounded-xl border border-[#e9ded7] bg-[#FCFAF7] px-4 py-3 text-sm outline-none focus:border-[#81434F]"
              />
            </div>

            <div className="mt-7">
              <label
                htmlFor="timeSlot"
                className="flex items-center gap-2 text-sm font-semibold text-[#29201F]"
              >
                <Clock3 size={17} className="text-[#81434F]" />
                Preferred Time
              </label>

              <select
                id="timeSlot"
                value={timeSlot}
                onChange={(event) => {
                  setTimeSlot(event.target.value);
                  setError("");
                }}
                className="mt-3 w-full rounded-xl border border-[#e9ded7] bg-[#FCFAF7] px-4 py-3 text-sm outline-none focus:border-[#81434F]"
              >
                <option value="">Select a time slot</option>

                {TIME_SLOTS.map((time) => (
                  <option key={time} value={time}>
                    {formatTime(time)}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs text-[#897f79]">
                The selected slot will be checked by the server for
                availability.
              </p>
            </div>

            <div className="mt-7">
              <label
                htmlFor="message"
                className="text-sm font-semibold text-[#29201F]"
              >
                Additional Message
                <span className="ml-2 font-normal text-[#897f79]">
                  (Optional)
                </span>
              </label>

              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Any special requests or instructions..."
                className="mt-3 w-full resize-y rounded-xl border border-[#e9ded7] bg-[#FCFAF7] px-4 py-3 text-sm outline-none focus:border-[#81434F]"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleBooking}
              disabled={isSubmitting}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#81434F] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#6e3742] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Confirming Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>

            <p className="mt-4 text-center text-xs leading-6 text-[#897f79]">
              You can review your appointment from your Customer Dashboard.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
