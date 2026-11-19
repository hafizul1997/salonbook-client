
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  Star,
} from "lucide-react";
import { services } from "@/data/services";

export default function ManageServicesPage() {
  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm text-gray-500">
            Admin / Services
          </p>

          <h1 className="text-2xl font-bold text-[#29201F] md:text-3xl">
            Manage Services
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage all salon services and their pricing.
          </p>
        </div>

        <button
          type="button"
          disabled
          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#81434F] px-5 py-3 text-sm font-semibold text-white opacity-60"
        >
          <Plus size={18} />
          Add New Service (Coming Soon)
        </button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-5">
          <p className="text-sm text-gray-500">Total Services</p>
          <h2 className="mt-2 text-2xl font-bold text-[#29201F]">
            {services.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-5">
          <p className="text-sm text-gray-500">Active Services</p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {services.length}
          </h2>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#EDE5DF] bg-white">
        <div className="border-b border-[#EDE5DF] p-5">
          <h2 className="font-bold text-[#29201F]">
            All Services
          </h2>
        </div>

        <div className="divide-y divide-[#EDE5DF]">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center"
            >
              <div className="min-w-0">
                <h3 className="font-bold text-[#29201F]">
                  {service.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {service.category}
                </p>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {service.duration}
                  </span>

                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-500" />
                    {service.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 md:justify-end">
                <div className="text-right">
                  <p className="font-bold text-[#81434F]">
                    ${service.price}
                  </p>

                  <span className="mt-1 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    Active
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled
                    aria-label="Edit service"
                    title="Edit coming soon"
                    className="cursor-not-allowed rounded-lg border border-[#EDE5DF] p-2 text-gray-400"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    disabled
                    aria-label="Delete service"
                    title="Delete coming soon"
                    className="cursor-not-allowed rounded-lg border border-[#EDE5DF] p-2 text-gray-400"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/services"
        className="mt-6 inline-block text-sm font-semibold text-[#81434F] hover:underline"
      >
        View Public Services Page →
      </Link>
    </div>
  );
}
