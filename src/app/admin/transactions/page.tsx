
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  CalendarDays,
  CheckCircle2,
  Clock,
  Search,
  Loader2,
  RefreshCw,
  XCircle,
  Receipt,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

type Service = {
  serviceName?: string;
  category?: string;
  price?: number;
};

type Appointment = {
  _id: string;
  serviceId?: Service | null;
  appointmentDate?: string;
};

type Transaction = {
  _id: string;
  appointmentId?: Appointment | null;
  customerId: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  status: "paid" | "failed";
  createdAt: string;
};

type TransactionsResponse = {
  success: boolean;
  total: number;
  data: Transaction[];
};

export default function ManageTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTransactions = useCallback(async () => {
    try {
      setError("");

      const response = await apiRequest<TransactionsResponse>(
        "/transactions",
        { auth: true }
      );

      setTransactions(response.data || []);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load transactions.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadTransactions);
  }, [loadTransactions]);

  const paidTransactions = transactions.filter(
    (transaction) => transaction.status === "paid"
  );

  const failedTransactions = transactions.filter(
    (transaction) => transaction.status === "failed"
  );

  // Keep different currencies separate.
  const revenueByCurrency = useMemo(() => {
    const totals = new Map<string, number>();

    paidTransactions.forEach((transaction) => {
      const currency = (transaction.currency || "usd").toLowerCase();

      totals.set(
        currency,
        (totals.get(currency) || 0) + transaction.amount
      );
    });

    return Array.from(totals.entries());
  }, [paidTransactions]);

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const serviceName =
        transaction.appointmentId?.serviceId?.serviceName || "";

      const matchesSearch =
        !query ||
        serviceName.toLowerCase().includes(query) ||
        transaction.customerId.toLowerCase().includes(query) ||
        transaction.stripeSessionId.toLowerCase().includes(query) ||
        transaction._id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        transaction.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [transactions, search, statusFilter]);

  const formatMoney = (amount: number, currency: string) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
      }).format(amount);
    } catch {
      return `${amount.toFixed(2)} ${currency.toUpperCase()}`;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center gap-3 text-[#81434F]">
        <Loader2 size={25} className="animate-spin" />
        <span className="text-sm font-medium">
          Loading transactions...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
        <h2 className="text-lg font-bold text-gray-800">
          Unable to Load Transactions
        </h2>

        <p className="mt-2 text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => {
            setLoading(true);
            void loadTransactions();
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
          Admin Dashboard / Transactions
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#29201F]">
          Manage Transactions
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Monitor real customer payments and Stripe transaction history.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-6">
          <CreditCard className="text-[#81434F]" size={25} />

          <p className="mt-4 text-sm text-gray-500">
            Total Transactions
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#29201F]">
            {transactions.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-6">
          <CheckCircle2 className="text-green-600" size={25} />

          <p className="mt-4 text-sm text-gray-500">
            Paid Transactions
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#29201F]">
            {paidTransactions.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-6">
          <XCircle className="text-red-500" size={25} />

          <p className="mt-4 text-sm text-gray-500">
            Failed Transactions
          </p>

          <h2 className="mt-1 text-2xl font-bold text-[#29201F]">
            {failedTransactions.length}
          </h2>
        </div>
      </div>

      {/* Revenue */}
      <div className="mb-6 rounded-2xl border border-[#EDE5DF] bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FCF5F2] text-[#81434F]">
            <Receipt size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total Paid Revenue
            </p>
            <h2 className="text-lg font-bold text-[#29201F]">
              Revenue by currency
            </h2>
          </div>
        </div>

        {revenueByCurrency.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-4">
            {revenueByCurrency.map(([currency, amount]) => (
              <div
                key={currency}
                className="rounded-xl bg-[#FCF5F2] px-5 py-3"
              >
                <p className="text-xs uppercase text-gray-500">
                  {currency}
                </p>
                <p className="mt-1 text-xl font-bold text-[#81434F]">
                  {formatMoney(amount, currency)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-5 text-sm text-gray-500">
            No paid transactions yet.
          </p>
        )}
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search service, customer ID or transaction..."
            className="w-full rounded-xl border border-[#EDE5DF] bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#81434F]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-[#EDE5DF] bg-white px-4 py-3 text-sm outline-none focus:border-[#81434F]"
        >
          <option value="all">All Transactions</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Transaction List */}
      <div className="grid gap-5">
        {filteredTransactions.map((transaction) => {
          const serviceName =
            transaction.appointmentId?.serviceId?.serviceName ||
            "Service information unavailable";

          const currency = transaction.currency || "usd";

          return (
            <div
              key={transaction._id}
              className="rounded-2xl border border-[#EDE5DF] bg-white p-6"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row">
                <div className="min-w-0">
                  <p className="break-all text-xs text-gray-400">
                    Transaction ID: {transaction._id}
                  </p>

                  <h2 className="mt-2 text-lg font-bold text-[#29201F]">
                    {serviceName}
                  </h2>

                  <div className="mt-3 space-y-2 text-sm text-gray-500">
                    <p className="break-all">
                      Customer ID: {transaction.customerId}
                    </p>

                    <p className="break-all">
                      Stripe Session: {transaction.stripeSessionId}
                    </p>

                    <p className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {new Date(transaction.createdAt).toLocaleString()}
                    </p>

                    {transaction.appointmentId?.appointmentDate && (
                      <p>
                        Appointment Date:{" "}
                        {new Date(
                          transaction.appointmentId.appointmentDate
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 lg:text-right">
                  <p className="text-2xl font-bold text-[#81434F]">
                    {formatMoney(transaction.amount, currency)}
                  </p>

                  <p
                    className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                      transaction.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.status === "paid" ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <Clock size={13} />
                    )}

                    {transaction.status.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {filteredTransactions.length === 0 && (
          <div className="rounded-2xl border border-[#EDE5DF] bg-white p-10 text-center">
            <CreditCard
              size={32}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-3 font-semibold text-[#29201F]">
              No Transactions Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {search || statusFilter !== "all"
                ? "Try changing your search or filter."
                : "No transactions have been recorded yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
