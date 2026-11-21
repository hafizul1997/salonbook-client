
"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  Loader2,
  Upload,
  X,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

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
  message: string;
  total: number;
  data: Service[];
};

type ServiceForm = {
  serviceName: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  status: "active" | "inactive";
};

const emptyForm: ServiceForm = {
  serviceName: "",
  category: "",
  description: "",
  price: "",
  duration: "",
  image: "",
  status: "active",
};

export default function ManageServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadServices = useCallback(async () => {
    try {
      const result = await apiRequest<ServicesResponse>(
        "/services/admin/all",
        { auth: true }
      );

      setServices(result.data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load services"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Run the initial request asynchronously to avoid
  // a synchronous state update inside useEffect.
  useEffect(() => {
    void Promise.resolve().then(loadServices);
  }, [loadServices]);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(service: Service) {
    setEditingId(service._id);
    setForm({
      serviceName: service.serviceName,
      category: service.category,
      description: service.description,
      price: String(service.price),
      duration: String(service.duration),
      image: service.image,
      status: service.status,
    });
    setShowForm(true);
  }

  function closeForm() {
    if (saving || uploading) return;
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function updateField<K extends keyof ServiceForm>(
    field: K,
    value: ServiceForm[K]
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPG, PNG or WebP image");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const result = await apiRequest<{
        success: boolean;
        message: string;
        data: { url: string; displayUrl?: string };
      }>("/uploads/image", {
        method: "POST",
        body: formData,
        auth: true,
      });

      updateField("image", result.data.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Image upload failed"
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.serviceName.trim() ||
      !form.category.trim() ||
      !form.description.trim() ||
      !form.image.trim() ||
      !form.price ||
      !form.duration
    ) {
      toast.error("Please complete all required fields");
      return;
    }

    const price = Number(form.price);
    const duration = Number(form.duration);

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Enter a valid positive price");
      return;
    }

    if (!Number.isInteger(duration) || duration < 1) {
      toast.error("Duration must be a positive whole number");
      return;
    }

    const payload = {
      serviceName: form.serviceName.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      price,
      duration,
      image: form.image.trim(),
      status: form.status,
    };

    setSaving(true);

    try {
      if (editingId) {
        await apiRequest(`/services/${editingId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
          auth: true,
        });

        toast.success("Service updated successfully");
      } else {
        await apiRequest("/services", {
          method: "POST",
          body: JSON.stringify(payload),
          auth: true,
        });

        toast.success("Service created successfully");
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      await loadServices();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to save service"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);

    try {
      await apiRequest(`/services/${id}`, {
        method: "DELETE",
        auth: true,
      });

      setServices((previous) =>
        previous.filter((service) => service._id !== id)
      );

      toast.success("Service deleted successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete service"
      );
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  }

  const activeCount = services.filter(
    (service) => service.status === "active"
  ).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm text-gray-500">Admin / Services</p>
          <h1 className="text-2xl font-bold text-[#29201F] md:text-3xl">
            Manage Services
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage salon services, images and pricing.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#81434F] px-5 py-3 text-sm font-semibold text-white hover:bg-[#693541]"
        >
          <Plus size={18} />
          Add New Service
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-5">
          <p className="text-sm text-gray-500">Total Services</p>
          <h2 className="mt-2 text-2xl font-bold text-[#29201F]">
            {services.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-5">
          <p className="text-sm text-gray-500">Active Services</p>
          <h2 className="mt-2 text-2xl font-bold text-green-600">
            {activeCount}
          </h2>
        </div>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-[#EDE5DF] bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#29201F]">
              {editingId ? "Edit Service" : "Add New Service"}
            </h2>

            <button
              type="button"
              onClick={closeForm}
              disabled={saving || uploading}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-gray-700">
                Service Name *
                <input
                  required
                  value={form.serviceName}
                  onChange={(e) =>
                    updateField("serviceName", e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#81434F]"
                  placeholder="Premium Haircut"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-gray-700">
                Category *
                <input
                  required
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#81434F]"
                  placeholder="Hair Care"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-gray-700">
                Price (USD) *
                <input
                  required
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#81434F]"
                  placeholder="50"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-gray-700">
                Duration (minutes) *
                <input
                  required
                  type="number"
                  min="1"
                  step="1"
                  value={form.duration}
                  onChange={(e) => updateField("duration", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#81434F]"
                  placeholder="45"
                />
              </label>
            </div>

            <label className="block space-y-2 text-sm font-medium text-gray-700">
              Description *
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#81434F]"
                placeholder="Describe this salon service..."
              />
            </label>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">
                Service Image *
              </p>

              {form.image ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Image
  src={form.image}
  alt="Service preview"
  width={192}
  height={128}
  unoptimized
  className="h-32 w-48 rounded-xl border border-gray-200 object-cover"
/>
                  <button
                    type="button"
                    onClick={() => updateField("image", "")}
                    className="text-sm font-semibold text-red-600 hover:underline"
                  >
                    Remove image
                  </button>
                </div>
              ) : (
                <div className="flex h-32 w-48 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-400">
                  <ImageIcon size={32} />
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />

              <button
                type="button"
                disabled={uploading || saving}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl border border-[#81434F] px-4 py-3 text-sm font-semibold text-[#81434F] hover:bg-[#81434F]/5 disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Upload size={17} />
                )}
                {uploading ? "Uploading..." : "Upload Image to ImgBB"}
              </button>

              <p className="text-xs text-gray-500">
                JPG, PNG or WebP. Maximum file size: 5MB.
              </p>
            </div>

            <label className="block space-y-2 text-sm font-medium text-gray-700">
              Status
              <select
                value={form.status}
                onChange={(e) =>
                  updateField(
                    "status",
                    e.target.value as "active" | "inactive"
                  )
                }
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#81434F] md:max-w-xs"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={saving || uploading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#81434F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#693541] disabled:opacity-50"
              >
                {saving && <Loader2 size={17} className="animate-spin" />}
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Service"
                    : "Create Service"}
              </button>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving || uploading}
                className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-[#EDE5DF] bg-white">
        <div className="border-b border-[#EDE5DF] p-5">
          <h2 className="font-bold text-[#29201F]">All Services</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 p-12 text-[#81434F]">
            <Loader2 className="animate-spin" size={20} />
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No services found. Add your first service.
          </div>
        ) : (
          <div className="divide-y divide-[#EDE5DF]">
            {services.map((service) => (
              <div
                key={service._id}
                className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center"
              >
                <div className="flex min-w-0 items-center gap-4">
                  {service.image ? (
                  <Image
  src={service.image}
  alt={service.serviceName}
  width={80}
  height={80}
  unoptimized
  className="h-20 w-20 shrink-0 rounded-xl object-cover"
/>
                  ) : (
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                      <ImageIcon className="text-gray-400" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="font-bold text-[#29201F]">
                      {service.serviceName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {service.category}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {service.duration} min
                      </span>
                      <span>${service.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      service.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {service.status}
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEditForm(service)}
                      className="rounded-lg border border-[#EDE5DF] p-2 text-[#81434F] hover:bg-[#81434F]/5"
                      title="Edit service"
                      aria-label={`Edit ${service.serviceName}`}
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(service._id)}
                      disabled={deletingId === service._id}
                      className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                      title="Delete service"
                      aria-label={`Delete ${service.serviceName}`}
                    >
                      {deletingId === service._id ? (
                        <Loader2 size={17} className="animate-spin" />
                      ) : (
                        <Trash2 size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {confirmDeleteId === service._id && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                      <h3 className="text-lg font-bold text-[#29201F]">
                        Delete this service?
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Are you sure you want to delete{" "}
                        <strong>{service.serviceName}</strong>? This action
                        cannot be undone.
                      </p>

                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          disabled={deletingId === service._id}
                          className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(service._id)}
                          disabled={deletingId === service._id}
                          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                        >
                          {deletingId === service._id && (
                            <Loader2 size={15} className="animate-spin" />
                          )}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
