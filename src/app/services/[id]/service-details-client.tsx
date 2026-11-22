
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { services as demoServices } from "@/data/services";

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  duration: number | string;
  image: string;
  isDemo: boolean;
};

type ServicesResponse = {
  success: boolean;
  message: string;
  total: number;
  data: {
    _id: string;
    serviceName: string;
    category: string;
    description: string;
    price: number;
    duration: number;
    image: string;
    status: "active" | "inactive";
  }[];
};

type ServiceDetailsClientProps = {
  serviceId: string;
};

export default function ServiceDetailsClient({
  serviceId,
}: ServiceDetailsClientProps) {
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    let isMounted = true;

    async function loadService() {
      try {
        setIsLoading(true);
        setError("");

        const response = (await apiRequest(
          "/services"
        )) as ServicesResponse;

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid services response.");
        }

        const foundService = response.data.find(
          (item) =>
            item._id === serviceId && item.status === "active"
        );

        if (foundService) {
          if (isMounted) {
            setService({
              ...foundService,
              isDemo: false,
            });
          }
          return;
        }

        // If this is an old demo service ID, load it from local demo data.
        const demoService = demoServices.find(
          (item) => String(item.id) === serviceId
        );

        if (demoService) {
          if (isMounted) {
            setService({
              _id: String(demoService.id),
              serviceName: demoService.name,
              category: demoService.category,
              description: demoService.description,
              price: demoService.price,
              duration: demoService.duration,
              image: demoService.image,
              isDemo: true,
            });
          }
          return;
        }

        if (isMounted) {
          setService(null);
          setError("Service not found or currently unavailable.");
        }
      } catch (err) {
        console.error("Failed to load service:", err);

        // Preserve demo detail pages even if the API is unavailable.
        const demoService = demoServices.find(
          (item) => String(item.id) === serviceId
        );

        if (isMounted && demoService) {
          setService({
            _id: String(demoService.id),
            serviceName: demoService.name,
            category: demoService.category,
            description: demoService.description,
            price: demoService.price,
            duration: demoService.duration,
            image: demoService.image,
            isDemo: true,
          });
        } else if (isMounted) {
          setService(null);
          setError("Unable to load service details. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadService();

    return () => {
      isMounted = false;
    };
  }, [serviceId]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FCFAF7]">
        <p className="text-sm text-[#81434F]">
          Loading service details...
        </p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FCFAF7] px-5 text-center">
        <h1 className="text-2xl font-semibold text-[#29201F]">
          Service Not Found
        </h1>

        <p className="mt-3 text-sm text-[#786e68]">
          {error || "This service is not available."}
        </p>

        <Link
          href="/services"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#81434F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6e3742]"
        >
          <ArrowLeft size={17} />
          Back to Services
        </Link>
      </main>
    );
  }

  const isAdmin = session?.user?.role === "admin";

  const bookingUrl = `/services/${service._id}/book`;

  const signInUrl = `/sign-in?returnTo=${encodeURIComponent(
    bookingUrl
  )}`;

  return (
    <main className="min-h-screen bg-[#FCFAF7]">
      <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#81434F] hover:gap-3"
        >
          <ArrowLeft size={17} />
          Back to Services
        </Link>
      </div>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div
          className="min-h-87.5 rounded-3xl bg-cover bg-center shadow-lg sm:min-h-125"
          style={{
            backgroundImage: `url("${service.image}")`,
          }}
          role="img"
          aria-label={service.serviceName}
        />

        <div className="flex flex-col justify-center">
          {service.isDemo && (
            <span className="w-fit rounded-full bg-[#f7eeeb] px-4 py-2 text-xs font-semibold text-[#81434F]">
              Sample Service
            </span>
          )}

          <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-[#9D5964]">
            {service.category}
          </p>

          <h1 className="mt-4 text-4xl font-semibold text-[#29201F] sm:text-5xl">
            {service.serviceName}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <span className="flex items-center gap-2 text-sm text-[#786e68]">
              <Clock3 size={17} />
              {service.duration}
              {typeof service.duration === "number" ? " minutes" : ""}
            </span>
          </div>

          <div className="mt-8 border-y border-[#eee6df] py-7">
            <p className="text-sm text-[#897f79]">
              Service Price
            </p>

            <p className="mt-2 text-4xl font-bold text-[#81434F]">
              ${service.price}
            </p>
          </div>

          <h2 className="mt-8 text-xl font-semibold">
            About This Service
          </h2>

          <p className="mt-4 text-sm leading-8 text-[#786e68]">
            {service.description}
          </p>

          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-3 text-sm text-[#786e68]">
              <CheckCircle2 size={18} className="text-[#81434F]" />
              Professional service
            </div>

            <div className="flex items-center gap-3 text-sm text-[#786e68]">
              <CheckCircle2 size={18} className="text-[#81434F]" />
              Experienced beauty specialists
            </div>

            <div className="flex items-center gap-3 text-sm text-[#786e68]">
              <CheckCircle2 size={18} className="text-[#81434F]" />
              Easy appointment booking
            </div>
          </div>

          {service.isDemo ? (
            <p className="mt-8 rounded-xl bg-[#f7eeeb] p-4 text-sm leading-6 text-[#81434F]">
              This is a sample service. Please select an active service
              from the Services page to make a real appointment.
            </p>
          ) : isAdmin ? (
            <p className="mt-8 rounded-xl bg-[#f7eeeb] p-4 text-sm text-[#81434F]">
              Admin accounts cannot book customer appointments.
            </p>
          ) : isPending ? (
            <p className="mt-8 text-sm text-[#81434F]">
              Checking your account...
            </p>
          ) : session?.user ? (
            <Link
              href={bookingUrl}
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#81434F] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#6e3742]"
            >
              Book Appointment
              <ArrowRight size={18} />
            </Link>
          ) : (
            <Link
              href={signInUrl}
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#81434F] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#6e3742]"
            >
              Sign In to Book
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
