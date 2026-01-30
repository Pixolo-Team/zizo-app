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
import SuggestedTournaments from "@/components/tournaments/SuggestedTournaments";
import Header from "@/components/icons/neevo-icons/Header";
import OrganizerHeader from "@/components/organizers/OrganizerHeader";
import OrganizerDetails from "@/components/organizers/OrganizerDetails";
import OrganizerSocialLink from "@/components/organizers/OrganizerSocialLink";

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
    const { data, error } = await getOrganizerDetailsRequest(organizerId);

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
    <div className="flex gap-15 px-5 lg:pt-10 ">
      <div className="flex-1 flex justify-center">
        {/* Header shows when content card hits top */}
        {/* <header
        className={`fixed lg:hidden left-0 right-0 top-0 z-40 rounded-b-lg shadow-[0_2px_2px_rgba(0,0,0,0.10)]
 bg-n-50 backdrop-blur transition-all duration-150 ${
   showHeader
     ? "translate-y-0 opacity-100"
     : "-translate-y-3 opacity-0 pointer-events-none"
 }`}
      >
        <div className="container mx-auto flex py-3.5 h-14.5 items-center justify-center px-5">
          <p className="text-base font-normal leading-none text-n-950 text-center ">
            Zizo
          </p>
        </div>
      </header> */}

        {/* Content Card */}
        <div className="h-full pb-20 pt-3 xl:max-w-190 flex-1 mx-auto relative z-4 flex flex-col gap-4 overflow-hidden">
          <Motion as="div" variants={shrinkIn} delay={0.2}>
            <div
              ref={contentCardRef}
              className="relative  rounded-t-3xl mx-auto pb-6 text-n-900 flex flex-col gap-6"
            >
              {organizerItemDetails && (
                <OrganizerHeader
                  posterUrl={organizerItemDetails?.organizer.logo_url ?? ""}
                  name={organizerItemDetails?.organizer.name}
                  location={organizerItemDetails?.organizer.city ?? ""}
                />
              )}
              {/* Stats */}
              <OrganizerDetails tournamentsOrganized="20" teamsHosted="100" />
              {/* Testimonials */}
              {organizerItemDetails?.organizer_testimonials &&
                organizerItemDetails?.organizer_testimonials.length > 0 && (
                  <div className="flex flex-col bg-n-50 gap-4 rounded-2xl border border-n-200 px-6 py-6 lg:rounded-3xl lg:p-7 lg:gap-6">
                    <p className="font-medium text-base lg:text-2xl text-n-500">
                      Testimonials
                    </p>

                    <TestimonialSlider
                      testimonials={
                        organizerItemDetails?.organizer_testimonials?.length
                          ? organizerItemDetails.organizer_testimonials
                          : []
                      }
                    />
                  </div>
                )}
              {/* Photos */}
              {organizerItemDetails?.organizer_media &&
                organizerItemDetails?.organizer_media.length > 0 && (
                  <div className="flex flex-col gap-3 p-5 rounded-2xl border border-n-200 bg-n-50 lg:p-7 lg:rounded-3xl">
                    <p className="font-medium text-base text-n-500 lg:text-2xl leading-none">
                      Photos From Organizer
                    </p>

                    <div className="flex gap-2.5 lg:gap-3 overflow-x-auto scrollbar-hide">
                      {/* Mapping media items */}
                      {organizerItemDetails?.organizer_media.map(
                        (mediaItem, index) => (
                          <Image
                            key={index}
                            src={mediaItem.image_url}
                            alt={`Media Post ${index + 1}`}
                            width={300}
                            height={200}
                            className="rounded-3xl w-57 h-37 lg:w-70 lg:h-49 object-cover"
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
              {/* Social Links */}
              {organizerItemDetails?.organizer.social_platforms && (
                <OrganizerSocialLink
                  socialPlatforms={
                    organizerItemDetails?.organizer.social_platforms
                  }
                />
              )}
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
        </div>
      </div>
      {/* SuggestedTournaments */}
      <div className="hidden xl:block xl:w-95">
        <SuggestedTournaments />
      </div>
    </div>
  );
}
