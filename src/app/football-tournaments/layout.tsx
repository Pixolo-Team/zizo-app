"use client";

// COMPONENTS //
import BrandLogo from "@/components/brand-logo/BrandLogo";
import Motion from "@/components/animations/Motion";
import PageHeader from "@/components/PageHeader";

// NAVIGATION //
import { usePathname } from "next/navigation";

// OTHERS //
import { fadeIn, shrinkIn } from "@/lib/animations";

export default function FootballTournamentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="relative bg-n-100 min-h-screen overflow-x-hidden">
      {/* Backdrop Image */}
      <Motion as="div" variants={fadeIn} delay={0.1}>
        <div className="fixed -top-[80px] -right-[140px] opacity-20 ">
          <BrandLogo variant="color-icon" size={380} />
        </div>
      </Motion>
      <div className="container mx-auto px-6 pt-7 pb-5">
        <Motion as="div" variants={shrinkIn} delay={0.1}>
          {/* PageHeader component */}
          <PageHeader title="Find local football tournaments near you." />
        </Motion>
      </div>
      {children}
    </div>
  );
}
