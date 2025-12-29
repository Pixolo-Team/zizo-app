// REACT //
import React from "react";

// NEXTJS //
import Image from "next/image";

// Interface for the BrandLogo component */
interface BrandLogoProps {
  variant?: Variant;
  size?: number;
}

// Type for the variant prop
type Variant =
  | "color"
  | "white"
  | "color-icon"
  | "white-icon"
  | "text-logo"
  | "text-logo-white";

/** Brand Logo Component */
const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "color",
  size = 120,
}) => {
  // The path to the SVG logo image
  const imagePath = `/brand-logo/${variant}.svg`;

  return <Image src={imagePath} alt="Brand Logo" width={size} height={size} />;
};

export default BrandLogo;
