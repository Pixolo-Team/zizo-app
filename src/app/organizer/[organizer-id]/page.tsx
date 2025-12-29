"use client";

// REACT //
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// COMPONENTS //
import Image from "next/image";
import SocialIcon from "@/components/organizers/SocialIcon";
import StatCard from "@/components/organizers/StatCard";
import TestimonialCard from "@/components/organizers/TestimonialCard";
import { Button } from "@/components/ui/button";
import Motion from "@/components/animations/Motion";

// OTHERS //
import { fadeIn, shrinkIn } from "@/lib/animations";
import LocationPin from "../../../../public/icons/neevo-icons/LocationPin";
import FacebookLogo2 from "../../../../public/icons/neevo-icons/FacebookLogo2";
import InstagramLogo from "../../../../public/icons/neevo-icons/InstagramLogo";
import YoutubeLogo from "../../../../public/icons/neevo-icons/YoutubeLogo";

export default function OrganizerProfile() {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects

  return (
    <section className="relative min-h-screen bg-n-100 ">
      {/* Back Button */}
      <Button
        aria-label="Go back"
        className="fixed top-4 left-4 z-50 rounded-full bg-n-100 hover:bg-n-200"
        variant="secondary"
        size="icon"
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} />
      </Button>

      {/* Organization Cover Image */}
      <div className="sticky top-0 h-56 w-full">
        <Motion variants={fadeIn} as="div" delay={0.1}>
          <Image
            src="/images/organizer-cover.jpg"
            alt="Organizer Cover Image"
            fill
            className="object-cover"
            priority
          />
        </Motion>
      </div>

      {/* Content Card */}
      <Motion as="div" variants={shrinkIn} delay={0.2}>
        <div className="relative -mt-5 rounded-t-3xl bg-n-50 container mx-auto px-4 pb-6 text-n-900 flex flex-col gap-6">
          {/* Organizer Avatar */}
          <div className="size-24 absolute -top-12 overflow-hidden rounded-full border border-n-50">
            <Image
              src="/images/organizer-profile.jpg"
              alt="Organizer Avatar"
              width={80}
              height={80}
              className="w-full h-full object-cover "
            />
          </div>

          {/* Name & Location */}
          <div className="flex flex-col gap-4 pt-14">
            <div className="flex flex-col">
              <p className="text-xl font-medium text-n-950">
                Skorost United Football Club
              </p>

              <div className="flex items-center gap-1">
                {/* Location Icon */}
                <LocationPin
                  className="size-3"
                  primaryColor="var(--color-n-400)"
                />
                <p className="text-sm font-normal text-n-700">
                  Andheri, Mumbai
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 px-3">
              <StatCard title="Tournaments Organized" number="23" />
              <StatCard title="Teams Hosted" number="40" />
            </div>
          </div>

          {/* Testimonials */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg text-n-950">Testimonials</p>
              <Button
                className="text-sm text-green-500"
                variant={"ghost"}
                size={"sm"}
              >
                See all
              </Button>
            </div>

            {/* Testimonial */}
            <TestimonialCard
              name="George Haakip"
              organization="Skorost United FC"
              testimonial="A formal written description or statement about the abilities, character and qualities of a person, often given by a previous employer; a formal written statement about the quality of a product, service, etc."
              avatarUrl="/images/organizer-cover.jpg"
            />
          </div>

          {/* Photos */}
          <div className="flex flex-col gap-3">
            <p className="font-medium text-lg text-n-950 leading-none">
              Photos From Organizer
            </p>

            {/* All photos from organizer */}
            <div className="flex gap-2.5 overflow-x-auto scrollbar-hide ">
              {[
                "/images/organizer-cover.jpg",
                "/images/organizer-cover.jpg",
              ].map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`Match Photo ${index + 1}`}
                  width={300}
                  height={200}
                  className="rounded-3xl w-56 h-36 object-cover"
                />
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col justify-center gap-1.5">
            <p className="font-medium text-lg text-n-700">Follow us on</p>

            <div className="grid grid-cols-3 gap-4">
              <SocialIcon icon={<FacebookLogo2 />} href="/" />
              <SocialIcon icon={<InstagramLogo />} href="/" />
              <SocialIcon icon={<YoutubeLogo />} href="/" />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col items-center gap-1.5">
            {/* Footer brand icon */}
            <Image
              src="/brand-logo/icon-gray.svg"
              alt="Zizo Brand Logo"
              height={24}
              width={24}
            />

            {/* Footer text */}
            <p className="font-medium text-sm text-n-400 leading-none">
              Powered by Zizo
            </p>
          </div>
        </div>
      </Motion>
    </section>
  );
}
