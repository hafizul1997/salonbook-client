
import {
  CalendarDays,
  Clock,
} from "lucide-react";

const appointments = [
  {
    id: "SB-1001",
    service: "Signature Haircut",
    date: "November 22, 2026",
    time: "10:00 AM",
    price: 45,
    status: "Confirmed",
  },
  {
    id: "SB-1002",
    service: "Luxury Facial",
    date: "November 24, 2026",
    time: "02:00 PM",
    price: 65,
    status: "Pending",
  },
  {
    id: "SB-1003",
    service: "Hair Coloring",
    date: "November 15, 2026",
    time: "11:30 AM",
    price: 90,
    status: "Completed",
  },
];

export default function AppointmentsPage() {
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
          View all your salon appointments.
        </p>
      </div>

      <div className="grid gap-5">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="rounded-2xl border border-[#EDE5DF] bg-white p-6"
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row">
              <div>
                <p className="text-xs text-gray-400">
                  Booking ID: {appointment.id}
                </p>

                <h2 className="mt-2 text-xl font-bold text-[#29201F]">
                  {appointment.service}
                </h2>

                <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {appointment.date}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {appointment.time}
                  </span>
                </div>
              </div>

              <div className="sm:text-right">
                <p className="text-xl font-bold text-[#81434F]">
                  ${appointment.price}
                </p>

                <p className="mt-2 text-sm font-semibold text-gray-600">
                  {appointment.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
