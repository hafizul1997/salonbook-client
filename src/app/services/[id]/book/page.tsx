
import { Suspense } from "react";
import BookingClient from "./booking-client";

type BookingPageProps = {
  params: Promise<{ id: string }>;
};

function BookingFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FCFAF7]">
      <p className="text-sm text-[#81434F]">
        Loading booking page...
      </p>
    </main>
  );
}

export default function BookingPage({
  params,
}: BookingPageProps) {
  return (
    <Suspense fallback={<BookingFallback />}>
      <BookingContent params={params} />
    </Suspense>
  );
}

async function BookingContent({
  params,
}: BookingPageProps) {
  const { id } = await params;

  return <BookingClient serviceId={id} />;
}
