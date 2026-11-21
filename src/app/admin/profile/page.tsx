
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  Save,
  Loader2,
  ShieldCheck,
  Upload,
  ImageIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { apiRequest } from "@/lib/api";

type ProfileResponse = {
  success: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    image?: string;
    phone?: string;
    role?: string;
  };
};

export default function AdminProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load complete profile from MongoDB.
  useEffect(() => {
    if (!session?.user) return;

    let cancelled = false;

    async function loadProfile() {
      try {
        const response = await apiRequest<ProfileResponse>(
          "/users/me",
          { auth: true }
        );

        if (cancelled) return;

        setName(response.data.name || "");
        setEmail(response.data.email || "");
        setImage(response.data.image || "");
        setPhone(response.data.phone || "");
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to load profile."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingProfile(false);
        }
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [session?.user]);

  // Upload profile image to ImgBB.
  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPG, PNG or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
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
        data: {
          url: string;
          displayUrl?: string;
        };
      }>("/uploads/image", {
        method: "POST",
        body: formData,
        auth: true,
      });

      setImage(result.data.url);
      toast.success("Profile image uploaded successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Image upload failed."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  // Save profile changes.
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (uploading) {
      toast.error("Please wait until image upload finishes.");
      return;
    }

    setSaving(true);

    try {
      const response = await apiRequest<ProfileResponse>(
        "/users/me/profile",
        {
          method: "PATCH",
          auth: true,
          body: JSON.stringify({
            name: name.trim(),
            image: image.trim(),
            phone: phone.trim(),
          }),
        }
      );

      setName(response.data.name || "");
      setEmail(response.data.email || email);
      setImage(response.data.image || "");
      setPhone(response.data.phone || "");

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  }

  if (isPending || loadingProfile) {
    return (
      <div className="flex min-h-96 items-center justify-center gap-3 text-[#81434F]">
        <Loader2 size={25} className="animate-spin" />
        Loading profile...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="rounded-2xl border border-[#EDE5DF] bg-white p-8 text-center">
        <p className="text-gray-600">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Admin Dashboard / Profile
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#29201F]">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View and update your administrator information.
        </p>
      </div>

      <div className="max-w-3xl rounded-2xl border border-[#EDE5DF] bg-white p-6 sm:p-8">
        <div className="mb-8 flex flex-col items-center gap-4 border-b border-[#EDE5DF] pb-7 sm:flex-row">
          <div className="relative h-24 w-24 shrink-0">
            {image ? (
              <Image
                src={image}
                alt="Admin profile"
                fill
                unoptimized
                sizes="96px"
                className="rounded-full border-4 border-[#FCF5F2] object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-[#FCF5F2] bg-[#FCF5F2] text-[#81434F]">
                <UserRound size={42} />
              </div>
            )}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-[#29201F]">
              {name || "Administrator"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {email}
            </p>

            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              <ShieldCheck size={14} />
              Administrator
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Profile Picture
            </label>

            {image ? (
              <div className="mb-3 flex items-center gap-3">
                <Image
                  src={image}
                  alt="Selected profile preview"
                  width={112}
                  height={112}
                  unoptimized
                  className="h-28 w-28 rounded-xl border border-[#EDE5DF] object-cover"
                />

                <button
                  type="button"
                  disabled={uploading || saving}
                  onClick={() => setImage("")}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
                >
                  <X size={16} />
                  Remove image
                </button>
              </div>
            ) : (
              <div className="mb-3 flex h-28 w-28 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-400">
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
              className="inline-flex items-center gap-2 rounded-xl border border-[#81434F] px-4 py-3 text-sm font-semibold text-[#81434F] transition hover:bg-[#81434F]/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Upload size={17} />
              )}

              {uploading ? "Uploading..." : "Upload Image to ImgBB"}
            </button>

            <p className="mt-2 text-xs text-gray-400">
              JPG, PNG or WebP. Maximum file size: 5MB.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Full Name
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-[#EDE5DF] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#81434F]"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                value={email}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-[#EDE5DF] bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-500 outline-none"
              />
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Email address cannot be changed here.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Phone Number
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Enter your phone number"
                className="w-full rounded-xl border border-[#EDE5DF] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#81434F]"
              />
            </div>
          </div>

          <div className="border-t border-[#EDE5DF] pt-6">
            <button
              type="submit"
              disabled={saving || uploading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#81434F] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#693541] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Save size={17} />
              )}

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
