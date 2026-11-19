
import { CreditCard, CalendarDays, CheckCircle2, Clock } from "lucide-react";

const transactions = [
  {
    id: "TXN-1001",
    customer: "John Doe",
    service: "Signature Haircut",
    date: "November 18, 2026",
    amount: 45,
    method: "Card",
    status: "Paid",
  },
  {
    id: "TXN-1002",
    customer: "Sarah Smith",
    service: "Luxury Facial",
    date: "November 19, 2026",
    amount: 65,
    method: "Card",
    status: "Pending",
  },
  {
    id: "TXN-1003",
    customer: "Michael Brown",
    service: "Hair Coloring",
    date: "November 15, 2026",
    amount: 90,
    method: "Card",
    status: "Paid",
  },
  {
    id: "TXN-1004",
    customer: "Emma Wilson",
    service: "Nail Care",
    date: "November 16, 2026",
    amount: 35,
    method: "Card",
    status: "Refunded",
  },
];

export default function ManageTransactionsPage() {
  const totalRevenue = transactions
    .filter((transaction) => transaction.status === "Paid")
    .reduce((total, transaction) => total + transaction.amount, 0);

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
          Monitor customer payments and transaction history.
        </p>
      </div>

      <div className="mb-6 grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-6">
          <CreditCard className="text-[#81434F]" size={25} />
          <p className="mt-4 text-sm text-gray-500">Total Transactions</p>
          <h2 className="mt-1 text-2xl font-bold text-[#29201F]">
            {transactions.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-6">
          <CheckCircle2 className="text-green-600" size={25} />
          <p className="mt-4 text-sm text-gray-500">Total Paid Revenue</p>
          <h2 className="mt-1 text-2xl font-bold text-[#29201F]">
            ${totalRevenue}
          </h2>
        </div>
      </div>

      <div className="grid gap-5">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="rounded-2xl border border-[#EDE5DF] bg-white p-6"
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row">
              <div>
                <p className="text-xs text-gray-400">
                  {transaction.id}
                </p>
                <h2 className="mt-2 text-lg font-bold text-[#29201F]">
                  {transaction.customer}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {transaction.service}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {transaction.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <CreditCard size={16} />
                    {transaction.method}
                  </span>
                </div>
              </div>

              <div className="sm:text-right">
                <p className="text-2xl font-bold text-[#81434F]">
                  ${transaction.amount}
                </p>
                <p
                  className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                    transaction.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : transaction.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {transaction.status === "Pending" && <Clock size={13} />}
                  {transaction.status === "Paid" && <CheckCircle2 size={13} />}
                  {transaction.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
