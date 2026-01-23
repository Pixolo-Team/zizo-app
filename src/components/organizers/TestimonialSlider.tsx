"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import TestimonialCard from "@/components/organizers/TestimonialCard";

type Props = {
  testimonials: any[];
};

export default function TestimonialSlider({ testimonials = [] }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const slides = useMemo(() => testimonials ?? [], [testimonials]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  if (!testimonials.length) return null;

  return (
    <div className="w-full">
      {/* Slider */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonialItem, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%] pr-3" // 100% width per slide
            >
              <TestimonialCard
                testimonialItem={testimonialItem}
                avatarUrl="/images/organizer-cover.jpg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom buttons */}
      <div className="flex items-center gap-0.5 pr-4 text-right mt-4 justify-end">
        {slides.map((_, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`h-1.5 w-0.5 lg:h-2.5 lg:w-1 rounded-sm transition-all duration-200 ${
                isActive ? "bg-n-950 scale-125" : "bg-n-500 scale-100"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
