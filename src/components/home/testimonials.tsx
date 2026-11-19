
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sophia Williams",
    role: "Regular Customer",
    review:
      "I had an amazing experience! The service was professional, and booking my appointment was incredibly easy.",
    rating: 5,
    initials: "SW",
  },
  {
    id: 2,
    name: "Olivia Martin",
    role: "Happy Customer",
    review:
      "The salon experience was wonderful. The staff were friendly, and I absolutely loved the results.",
    rating: 5,
    initials: "OM",
  },
  {
    id: 3,
    name: "Emma Johnson",
    role: "Regular Customer",
    review:
      "A beautiful experience from start to finish. I really appreciate how convenient the online booking process is.",
    rating: 5,
    initials: "EJ",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#FCFAF7] px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADING */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.25em] text-[#9D5964] uppercase">
            Customer Stories
          </p>

          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            What Our Clients Say
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#786e68]">
            Discover what our customers think about their
            SalonBook experience.
          </p>
        </div>

        {/* REVIEW CARDS */}
        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-2xl border border-[#eee6df] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* QUOTE ICON */}
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-[#f7eeeb] p-3 text-[#81434F]">
                  <Quote size={23} />
                </div>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: testimonial.rating },
                    (_, index) => (
                      <Star
                        key={index}
                        size={15}
                        className="fill-[#D8A34C] text-[#D8A34C]"
                      />
                    ),
                  )}
                </div>
              </div>

              {/* REVIEW */}
              <p className="mt-7 min-h-28 text-sm leading-7 text-[#786e68]">
                &quot;{testimonial.review}&quot;
              </p>

              {/* CUSTOMER INFORMATION */}
              <div className="mt-7 flex items-center gap-4 border-t border-[#eee6df] pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7eeeb] font-bold text-[#81434F]">
                  {testimonial.initials}
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    {testimonial.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#897f79]">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
