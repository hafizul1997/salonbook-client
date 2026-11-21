
"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Mail,
  Phone,
  CalendarDays,
  Users,
  Search,
  Loader2,
  RefreshCw,
  ShieldCheck,
  ShieldBan,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

type Customer = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: string;
  isBlocked?: boolean;
  createdAt?: string;
  appointmentCount?: number;
};

type Appointment = {
  _id: string;
  customerId: string;
};

type UsersResponse = {
  success: boolean;
  total: number;
  data: Customer[];
};

type AppointmentsResponse = {
  success: boolean;
  total: number;
  data: Appointment[];
};

export default function ManageCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadCustomers = useCallback(async () => {
    try {
      setError("");

      const [usersResponse, appointmentsResponse] = await Promise.all([
        apiRequest<UsersResponse>("/users", { auth: true }),
        apiRequest<AppointmentsResponse>("/appointments/admin/all", {
          auth: true,
        }),
      ]);

      const appointmentsByCustomer = new Map<string, number>();

      appointmentsResponse.data.forEach((appointment) => {
        const customerId = String(appointment.customerId);

        appointmentsByCustomer.set(
          customerId,
          (appointmentsByCustomer.get(customerId) || 0) + 1
        );
      });

      const customerList = usersResponse.data
        .filter((user) => user.role === "customer")
        .map((user) => ({
          ...user,
          appointmentCount:
            appointmentsByCustomer.get(user._id) || 0,
        }));

      setCustomers(customerList);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load customers.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadCustomers);
  }, [loadCustomers]);

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return customers;

    return customers.filter(
      (customer) =>
        customer.name?.toLowerCase().includes(query) ||
        customer.email?.toLowerCase().includes(query)
    );
  }, [customers, search]);

  const handleBlockStatus = async (customer: Customer) => {
    const nextStatus = !customer.isBlocked;

    setUpdatingId(customer._id);

    try {
      await apiRequest(`/users/${customer._id}/block`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify({
          isBlocked: nextStatus,
        }),
      });

      setCustomers((current) =>
        current.map((item) =>
          item._id === customer._id
            ? { ...item, isBlocked: nextStatus }
            : item
        )
      );

      toast.success(
        nextStatus
          ? "Customer blocked successfully."
          : "Customer unblocked successfully."
      );
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to update customer status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center gap-3 text-[#81434F]">
        <Loader2 size={25} className="animate-spin" />
        <span className="text-sm font-medium">
          Loading customers...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
        <h2 className="text-lg font-bold text-gray-800">
          Unable to Load Customers
        </h2>
        <p className="mt-2 text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => {
            setLoading(true);
            void loadCustomers();
          }}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#81434F] px-6 py-3 text-sm font-semibold text-white"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

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

      <div className="mb-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customers by name or email..."
            className="w-full rounded-xl border border-[#EDE5DF] bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#81434F]"
          />
        </div>
      </div>

      <div className="grid gap-5">
        {filteredCustomers.map((customer) => (
          <div
            key={customer._id}
            className="rounded-2xl border border-[#EDE5DF] bg-white p-6"
          >
            <div className="flex flex-col justify-between gap-5 lg:flex-row">
              <div className="flex gap-4">
                {customer.image ? (
                  <Image
                    src={customer.image}
                    alt={customer.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FCF1F0] text-lg font-bold text-[#81434F]">
                    {customer.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>
                )}

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
                      {customer.phone || "Phone not added"}
                    </p>

                    <p className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      Joined:{" "}
                      {customer.createdAt
                        ? new Date(customer.createdAt).toLocaleDateString()
                        : "Not available"}
                    </p>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        customer.isBlocked
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {customer.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 lg:flex-col lg:items-end lg:justify-center">
                <div className="lg:text-right">
                  <p className="text-sm text-gray-500">
                    Total Appointments
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#81434F]">
                    {customer.appointmentCount}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={updatingId === customer._id}
                  onClick={() => void handleBlockStatus(customer)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                    customer.isBlocked
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {updatingId === customer._id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : customer.isBlocked ? (
                    <ShieldCheck size={16} />
                  ) : (
                    <ShieldBan size={16} />
                  )}

                  {customer.isBlocked ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="rounded-2xl border border-[#EDE5DF] bg-white p-10 text-center">
            <Users size={32} className="mx-auto text-gray-400" />

            <h2 className="mt-3 font-semibold text-[#29201F]">
              No Customers Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {search
                ? "Try a different search term."
                : "No registered customers are available yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
