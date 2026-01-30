"use client";

// REACT //
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// COMPONENTS //
import Motion from "@/components/animations/Motion";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

// OTHERS //
import { shrinkIn } from "@/lib/animations";
import { Bookmark } from "lucide-react";

export default function FootballTournamentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const getSavedCount = () => {
      try {
        const saved = localStorage.getItem("saved_tournaments");
        const parsed = saved ? JSON.parse(saved) : [];
        setSavedCount(Array.isArray(parsed) ? parsed.length : 0);
      } catch {
        setSavedCount(0);
      }
    };

    // run on mount
    getSavedCount();

    // other tabs
    window.addEventListener("storage", getSavedCount);

    //  same tab 
    window.addEventListener("saved-tournaments-updated", getSavedCount);

    return () => {
      window.removeEventListener("storage", getSavedCount);
      window.removeEventListener("saved-tournaments-updated", getSavedCount);
    };
  }, []);

  return (
    <div className="relative">
      <div className="px-5 pt-6 pb-3 lg:hidden">
        <Motion as="div" variants={shrinkIn} delay={0.1}>
          <PageHeader>
            <Button
              aria-label="Saved tournaments"
              className="flex justify-center items-center rounded-[60px] bg-n-900 py-5 px-6 self-center"
              variant="secondary"
              size="sm"
              onClick={() => router.push("/saved-tournaments")}
            >
              <Bookmark className="text-n-50" />
              <p className="text-sm leading-tight text-n-50 font-medium">
                Saved 
              </p>
              <p className="text-sm leading-tight font-normal text-n-700">({savedCount})</p>
            </Button>
          </PageHeader>
        </Motion>
      </div>

      {children}
    </div>
  );
}
