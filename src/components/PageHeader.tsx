// COMPONENTS //
import BrandLogo from "@/components/brand-logo/BrandLogo";
import ButtonsRightIcon from "@/components/icons/neevo-icons/ButtonsRight";
import Link from "next/link";

// Interface props
interface PageHeaderProps {
  title?: string;
}

// Page Header Component
export default function PageHeader({ title }: PageHeaderProps) {
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
        <BrandLogo variant="text-logo" size={80} />

        {/* Header Text */}
        {title && (
          <p className="text-base text-n-950 font-medium font-gtwalsheim w-3/5 leading-none">
            {title}
          </p>
        )}
      </div>

      {/* Button Rights 2 Icon */}
      <Link href="/football-tournaments">
        <ButtonsRightIcon
          primaryColor="var(--color-n-900)"
          className="size-9 -rotate-45"
        />
      </Link>
    </div>
  );
}
