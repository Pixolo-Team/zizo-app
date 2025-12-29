// COMPONENTS //
import BrandLogo from "@/components/brand-logo/BrandLogo";

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
  );
}
