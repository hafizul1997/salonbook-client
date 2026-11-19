
import {
  CalendarDays,
  Clock,
  Search,
} from "lucide-react";

const appointments = [
  {
    id: "SB-1001",
    customer: "John Doe",
    email: "john@example.com",
    service: "Signature Haircut",
    date: "November 22, 2026",
    time: "10:00 AM",
    price: 45,
    status: "Confirmed",
    payment: "Paid",
  },
  {
    id: "SB-1002",
    customer: "Sarah Smith",
    email: "sarah@example.com",
    service: "Luxury Facial",
    date: "November 24, 2026",
    time: "02:00 PM",
    price: 65,
    status: "Pending",
    payment: "Unpaid",
  },
  {
    id: "SB-1003",
    customer: "Michael Brown",
    email: "michael@example.com",
    service: "Hair Coloring",
    date: "November 15, 2026",
    time: "11:30 AM",
    price: 90,
    status: "Completed",
    payment: "Paid",
  },
  {
    id: "SB-1004",
    customer: "Emma Wilson",
    email: "emma@example.com",
    service: "Spa & Massage",
    date: "November 10, 2026",
    time: "03:00 PM",
    price: 75,
    status: "Cancelled",
    payment: "Refunded",
  },
];

function statusStyle(status: string) {
  switch (status) {
    case "Confirmed":
      return "bg-blue-50 text-blue-700";
    case "Pending":
      return "bg-yellow-50 text-yellow-700";
    case "Completed":
      return "bg-green-50 text-green-700";
    case "Cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function ManageAppointmentsPage() {
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
            {appointments.filter((item) => item.status === "Pending").length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-5">
          <p className="text-sm text-gray-500">Completed</p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {appointments.filter((item) => item.status === "Completed").length}
          </h2>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#EDE5DF] bg-white">
        <div className="border-b border-[#EDE5DF] p-5">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-[#81434F]" />
            <h2 className="font-bold text-[#29201F]">
              All Appointments
            </h2>
          </div>
        </div>

        <div className="divide-y divide-[#EDE5DF]">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-5">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <p className="text-xs text-gray-400">
                    {appointment.id}
                  </p>

                  <h3 className="mt-1 font-bold text-[#29201F]">
                    {appointment.customer}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {appointment.email}
                  </p>

                  <p className="mt-2 text-sm font-medium text-[#81434F]">
                    {appointment.service}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      {appointment.date}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {appointment.time}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  <div className="mr-2">
                    <p className="font-bold text-[#29201F]">
                      ${appointment.price}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Payment: {appointment.payment}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
