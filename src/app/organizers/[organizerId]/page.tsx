"use client";

// REACT //
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// TYPES //
import { OrganizerDetailsData } from "@/types/tournament";

// COMPONENTS //
import Image from "next/image";
import SocialIcon from "@/components/organizers/SocialIcon";
import StatCard from "@/components/organizers/StatCard";
import TestimonialCard from "@/components/organizers/TestimonialCard";
import { Button } from "@/components/ui/button";
import Motion from "@/components/animations/Motion";
import LocationPin from "@/components/icons/neevo-icons/LocationPin";
import FacebookLogo2 from "@/components/icons/neevo-icons/FacebookLogo2";
import InstagramLogo from "@/components/icons/neevo-icons/InstagramLogo";
import YoutubeLogo from "@/components/icons/neevo-icons/YoutubeLogo";
import LineArrowRight1 from "@/components/icons/neevo-icons/LineArrowRight1";

// SERVICES //
import { getOrganizerDetailsRequest } from "@/services/queries/tournaments.query";

// OTHERS //
import { useScroll, useMotionValueEvent } from "framer-motion";
import { fadeIn, shrinkIn } from "@/lib/animations";
import TestimonialSlider from "@/components/organizers/TestimonialSlider";

// TODO: Remove this when we have real data
const socialLinks = {
  facebook: "https://facebook.com/skorostunited",
  instagram: "https://instagram.com/skorostunited",
  youtube: "https://youtube.com/@skorostunited",
};

// TODO: Remove this when we have real data
const organizerSocialIcons = [
  {
    key: "facebook",
    icon: <FacebookLogo2 primaryColor="var(--color-n-700)" />,
    href: socialLinks.facebook,
  },
  {
    key: "instagram",
    icon: <InstagramLogo primaryColor="var(--color-n-700)" />,
    href: socialLinks.instagram,
  },
  {
    key: "youtube",
    icon: <YoutubeLogo primaryColor="var(--color-n-700)" />,
    href: socialLinks.youtube,
  },
];

/** Organizer Profile Page */
export default function OrganizerProfile() {
  // Define Navigation
  const router = useRouter();
  const { organizerId } = useParams();

  // Define Context

  // Define States
  const [showHeader, setShowHeader] = useState<boolean>(false);
  const [organizerItemDetails, setOrganizerItemDetails] =
    useState<OrganizerDetailsData | null>(null);

  // Define Refs
  const contentCardRef = useRef<HTMLDivElement | null>(null);

  // Helper Functions
  /** We track the scroll progress of the content card to know when it reaches the top of the viewport to show and hide the header */
  const { scrollYProgress } = useScroll({
    target: contentCardRef,
    offset: ["start start", "end start"],
  });

  /** Show the floating header only after the content card crosses the top edge of the viewport */
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // When content reaches the top, progress > 0
    setShowHeader(latest > 0);
  });

  const getOrganizerDetails = async (organizerId: string) => {
    const { data, error } = await getOrganizerDetailsRequest(
      "9638deb6-2eaa-403c-a649-8d6415123c20"
    );

    if (error) {
      return error;
    }

    setOrganizerItemDetails(data);
  };

  // UseEffects
  useEffect(() => {
    getOrganizerDetails(String(organizerId));
  }, [organizerId]);

  return (
    <section className="relative min-h-screen bg-n-100">
      {/* Header shows when content card hits top */}
      <header
        className={`fixed left-0 right-0 top-0 z-40 rounded-b-lg shadow-[0_2px_2px_rgba(0,0,0,0.10)]
 bg-n-50 backdrop-blur transition-all duration-150 ${
   showHeader
     ? "translate-y-0 opacity-100"
     : "-translate-y-3 opacity-0 pointer-events-none"
 }`}
      >
        <div className="container mx-auto flex py-3.5 h-[58px] items-center justify-center px-5">
          <p className="text-base font-normal leading-none text-n-950 text-center ">
            Zizo
          </p>
        </div>
      </header>

      {/* Back Button (always visible, above everything) */}
      <Button
        aria-label="Go back"
        className={`fixed top-3.5 left-5 z-50 rounded-full bg-n-100 hover:bg-n-200 ${showHeader ? "border border-n-300 " : ""}`}
        variant="secondary"
        size="icon-sm"
        onClick={() => router.back()}
      >
        <LineArrowRight1
          primaryColor="var(--color-n-800)"
          className="rotate-180"
        />
      </Button>

      {/* Organization Cover Image */}
      {/* IMPORTANT: parent of fill Image MUST be relative */}
      <div className="sticky top-0 h-56 w-full overflow-hidden">
        <Motion variants={fadeIn} as="div" delay={0.1}>
          <Image
            src={"/images/organizer-cover.jpg"}
            alt="Organizer Cover Image"
            fill
            className="object-cover"
            priority
          />
        </Motion>
      </div>

      {/* Content Card */}
      <Motion as="div" variants={shrinkIn} delay={0.2}>
        <div
          ref={contentCardRef}
          className="relative -mt-5 rounded-t-3xl bg-n-50 container mx-auto px-5 pb-6 text-n-900 flex flex-col gap-6"
        >
          {/* Organizer Avatar */}
          <div className="size-24 absolute -top-12 overflow-hidden rounded-full border border-n-50">
            <Image
              src={"/images/organizer-profile.jpg"}
              alt="Organizer Avatar"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name & Location */}
          <div className="flex flex-col gap-4 pt-14">
            <div className="flex flex-col">
              <p className="text-xl font-medium text-n-950">
                {organizerItemDetails?.organizer.name}
              </p>

              <div className="flex items-center gap-1">
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
            <div className="flex gap-4 px-2">
              <StatCard title="Tournaments Organized" number="23" />
              <StatCard title="Teams Hosted" number="40" />
            </div>
          </div>

          {/* Testimonials */}
          <div className="flex flex-col gap-4 rounded-2xl border border-n-200 px-5 py-6 lg:rounded-3xl lg:p-7 lg:gap-6">
            <p className="font-medium text-base lg:text-2xl text-n-500">
              Testimonials
            </p>

            <TestimonialSlider
              testimonials={
                organizerItemDetails?.organizer_testimonials?.length
                  ? organizerItemDetails.organizer_testimonials
                  : [
                      {
                        author_name: "John Doe",
                        author_role: "Coach at Skorost United",
                        quote:
                          "Organizing tournaments with this platform has been a game-changer for us. The seamless experience and excellent support made everything so much easier.",
                      },
                      {
                        author_name: "Sarah Smith",
                        author_role: "Manager",
                        quote:
                          "Super smooth experience. Great UI, great support, and everything worked perfectly.",
                      },
                    ]
              }
            />
          </div>

          {/* Photos */}
          <div className="flex flex-col gap-3">
            <p className="font-medium text-lg text-n-950 leading-none">
              Photos From Organizer
            </p>

            <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
              {[
                "/images/organizer-cover.jpg",
                "/images/organizer-cover.jpg",
              ].map((mediaItem, index) => (
                <Image
                  key={index}
                  src={mediaItem}
                  alt={`Media Post ${index + 1}`}
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
              {organizerSocialIcons
                .filter((socialItem) => socialItem.href)
                .map((socialItem) => (
                  <SocialIcon
                    key={socialItem.key}
                    icon={socialItem.icon}
                    href={socialItem.href!}
                    ariaLabel={socialItem.key}
                  />
                ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-col items-center gap-1.5">
            <Image
              src="/brand-logo/icon-gray.svg"
              alt="Zizo Brand Logo"
              height={24}
              width={24}
            />
            <p className="font-medium text-sm text-n-400 leading-none">
              Powered by Zizo
            </p>
          </div>
        </div>
      </Motion>
    </section>
  );
}
