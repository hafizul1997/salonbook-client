
import Link from "next/link";
import {
  History,
  CalendarDays,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const bookingHistory = [
  {
    id: "SB-1003",
    service: "Hair Coloring",
    date: "November 15, 2026",
    time: "11:30 AM",
    price: 90,
    status: "Completed",
    payment: "Paid",
  },
  {
    id: "SB-1004",
    service: "Spa & Massage",
    date: "November 10, 2026",
    time: "03:00 PM",
    price: 75,
    status: "Completed",
    payment: "Paid",
  },
  {
    id: "SB-1005",
    service: "Nail Care",
    date: "November 05, 2026",
    time: "01:00 PM",
    price: 35,
    status: "Cancelled",
    payment: "Refunded",
  },
];

export default function BookingHistoryPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-sm text-gray-500">
          Customer Dashboard / Booking History
        </p>

        <h1 className="text-2xl font-bold text-[#29201F] md:text-3xl">
          Booking History
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Review your previous salon appointments.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Completed Bookings
              </p>
              <h2 className="text-2xl font-bold text-[#29201F]">
                2
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <XCircle size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Cancelled Bookings
              </p>
              <h2 className="text-2xl font-bold text-[#29201F]">
                1
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#EDE5DF] bg-white">
        <div className="border-b border-[#EDE5DF] p-5">
          <div className="flex items-center gap-2">
            <History size={20} className="text-[#81434F]" />
            <h2 className="font-bold text-[#29201F]">
              Previous Bookings
            </h2>
          </div>
        </div>

        <div className="divide-y divide-[#EDE5DF]">
          {bookingHistory.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center"
            >
              <div>
                <p className="text-xs text-gray-400">
                  Booking ID: {booking.id}
                </p>

                <h3 className="mt-1 font-bold text-[#29201F]">
                  {booking.service}
                </h3>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    {booking.date}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock size={15} />
                    {booking.time}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end">
                <div>
                  <p className="font-bold text-[#81434F]">
                    ${booking.price}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {booking.payment}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    booking.status === "Completed"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/services"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#81434F] hover:underline"
      >
        Explore More Services
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
