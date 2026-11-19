
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Star,
  CheckCircle2,
} from "lucide-react";

import { services } from "@/data/services";

type ServiceDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

// Generate static pages for available services
export function generateStaticParams() {
  return services.map((service) => ({
    id: String(service.id),
  }));
}

// Main page with Suspense boundary
export default function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FCFAF7]">
          <p className="text-sm text-[#81434F]">
            Loading service details...
          </p>
        </div>
      }
    >
      <ServiceDetails params={params} />
    </Suspense>
  );
}

// Async component reads URL params inside Suspense
async function ServiceDetails({
  params,
}: ServiceDetailsPageProps) {
  const { id } = await params;

  const service = services.find(
    (item) => item.id === Number(id)
  );

  if (!service) {
    notFound();
  }

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
        {/* SERVICE IMAGE */}
        <div
          className="min-h-87.5 rounded-3xl bg-cover bg-center shadow-lg sm:min-h-125"
          style={{
            backgroundImage: `url("${service.image}")`,
          }}
          role="img"
          aria-label={service.name}
        />

        {/* SERVICE INFORMATION */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9D5964]">
            {service.category}
          </p>

          <h1 className="mt-4 text-4xl font-semibold text-[#29201F] sm:text-5xl">
            {service.name}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <span className="flex items-center gap-2 text-sm text-[#786e68]">
              <Star
                size={17}
                className="fill-[#D8A34C] text-[#D8A34C]"
              />
              {service.rating.toFixed(1)} Rating
            </span>

            <span className="flex items-center gap-2 text-sm text-[#786e68]">
              <Clock3 size={17} />
              {service.duration}
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

          <Link
            href="/sign-in"
            className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-[#81434F] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#693541]"
          >
            Book Appointment
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
