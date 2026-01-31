"use client";

import React from "react";
import Motion from "@/components/animations/Motion";
import PageHeader from "@/components/PageHeader";
import { shrinkIn } from "@/lib/animations";

export default function OrganizersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Check check es ling
  return (
    <div className="relative">
      {/* PageHeader */}
      <div className="px-5 pt-6 pb-3 lg:hidden">
        <Motion as="div" variants={shrinkIn} delay={0.1}>
          {/* PageHeader component */}
          <PageHeader showBackButton showZizoLogo={false} text="Organizers" />
        </Motion>
      </div>
      {children}
    </div>
  );
}
