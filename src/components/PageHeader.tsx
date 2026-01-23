"use client";
// COMPONENTS //
import BrandLogo from "@/components/brand-logo/BrandLogo";
import Link from "next/link";
import { Button } from "./ui/button";
import LineArrowRight1 from "./icons/neevo-icons/LineArrowRight1";
import { useRouter } from "next/navigation";

// Interface props
interface PageHeaderProps {
  children?: React.ReactNode;
  showZizoLogo?: boolean;
  showBackButton?: boolean;
  text?: string;
}

// Page Header Component
export default function PageHeader({
  children,
  showZizoLogo = true,
  showBackButton = false,
  text,
}: PageHeaderProps) {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects

  return (
    <div className="flex justify-between items-center">
      {showZizoLogo && (
        <Link href="/football-tournaments" className="cursor-pointer">
          <BrandLogo
            variant="text-logo"
            size={80}
            className=" block dark-mode-hidden lg:w-30"
          />
          <BrandLogo
            variant="text-logo-white"
            size={80}
            className="hidden dark-mode-block lg:w-30"
          />
        </Link>
      )}

      {showBackButton && (
        <Button
          aria-label="Go back"
          className={`rounded-full bg-n-100 hover:bg-n-200 border border-n-300`}
          variant="secondary"
          size="icon-sm"
          onClick={() => router.back()}
        >
          <LineArrowRight1
            primaryColor="var(--color-n-800)"
            className="rotate-180"
          />
        </Button>
      )}

      {/* Title */}
      {text && <p className="text-n-950">{text}</p>}

      {/* Right Content */}
      <div>{children}</div>
    </div>
  );
}
