// COMPONENTS //
import BrandLogo from "@/components/brand-logo/BrandLogo";
import Link from "next/link";

// Interface props
interface PageHeaderProps {
  children?: React.ReactNode;
}

// Page Header Component
export default function PageHeader({ children }: PageHeaderProps) {
  // Define Navigation

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects

  return (
    <div className="flex justify-between items-start">
      {/* Brand Logo component */}
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

      {/* Right Content */}
      <div>{children}</div>
    </div>
  );
}
