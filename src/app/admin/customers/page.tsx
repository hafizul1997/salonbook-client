
import { Mail, Phone, CalendarDays, Users } from "lucide-react";

const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    appointments: 12,
    joined: "October 12, 2026",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+1 345 678 901",
    appointments: 8,
    joined: "October 18, 2026",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 456 789 012",
    appointments: 5,
    joined: "November 02, 2026",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@example.com",
    phone: "+1 567 890 123",
    appointments: 3,
    joined: "November 10, 2026",
  },
];

export default function ManageCustomersPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Admin Dashboard / Customers
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[#29201F]">
          Manage Customers
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          View and manage registered salon customers.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-[#EDE5DF] bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCF5F2] text-[#81434F]">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Customers</p>
            <h2 className="text-2xl font-bold text-[#29201F]">
              {customers.length}
            </h2>
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="rounded-2xl border border-[#EDE5DF] bg-white p-6"
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row">
              <div>
                <h2 className="text-lg font-bold text-[#29201F]">
                  {customer.name}
                </h2>

                <div className="mt-3 space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <Mail size={16} />
                    {customer.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={16} />
                    {customer.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    Joined: {customer.joined}
                  </p>
                </div>
              </div>

              <div className="sm:text-right">
                <p className="text-sm text-gray-500">
                  Total Appointments
                </p>
                <p className="mt-1 text-2xl font-bold text-[#81434F]">
                  {customer.appointments}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
