import { Suspense } from "react";
import ServiceDetailsClient from "./service-details-client";

type ServiceDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function ServiceDetailsFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FCFAF7]">
      <p className="text-sm text-[#81434F]">
        Loading service details...
      </p>
    </div>
  );
}

export default function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  return (
    <Suspense fallback={<ServiceDetailsFallback />}>
      <ServiceDetails params={params} />
    </Suspense>
  );
}

async function ServiceDetails({
  params,
}: ServiceDetailsPageProps) {
  const { id } = await params;

  return <ServiceDetailsClient serviceId={id} />;
}