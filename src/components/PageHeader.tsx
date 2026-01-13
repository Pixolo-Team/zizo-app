// COMPONENTS //
import BrandLogo from "@/components/brand-logo/BrandLogo";
import Link from "next/link";

// Interface props
interface PageHeaderProps {
  title?: string;
  children?: React.ReactNode;
}

// Page Header Component
export default function PageHeader({ title, children }: PageHeaderProps) {
  // Define Navigation

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects

  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-2.5">
        {/* Brand Logo component */}
        <Link href="/football-tournaments" className="cursor-pointer">
          <BrandLogo
            variant="text-logo"
            size={80}
            className=" block dark-mode-hidden"
          />
          <BrandLogo
            variant="text-logo-white"
            size={80}
            className="hidden dark-mode-block"
          />
        </Link>
        {/* Header Text */}
        {title && (
          <p className="text-base text-n-950 font-medium font-gtwalsheim w-3/5 leading-none">
            {title}
          </p>
        )}
      </div>

      {/* Right Content */}
      <div>{children}</div>
    </div>
  );
}
