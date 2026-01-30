// REACT //
import { ReactNode } from "react";

// COMPONENTS //
import Link from "next/link";
import FacebookLogo2 from "@/components/icons/neevo-icons/FacebookLogo2";
import InstagramLogo from "@/components/icons/neevo-icons/InstagramLogo";
import YoutubeLogo from "@/components/icons/neevo-icons/YoutubeLogo";

// ICONS //

interface SocialIconProps {
  platformName: string;
  href: string;
  ariaLabel: string;
}

// Returns the corresponding social media icon component based on the platform name received from API.
const getSocialIcon = (platformName: string): ReactNode | null => {
  switch (platformName.toLowerCase()) {
    case "instagram":
      return <InstagramLogo />;
    case "facebook":
      return <FacebookLogo2 />;
    case "youtube":
      return <YoutubeLogo />;
    default:
      return null;
  }
};

/** SocialIcon Component */
export default function SocialIcon({
  platformName,
  href,
  ariaLabel,
}: SocialIconProps) {
  const icon = getSocialIcon(platformName);
  if (!icon) return null;
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center px-8 py-5 border-[0.7px] rounded-xl overflow-hidden bg-n-100 border-n-200"
      aria-label={ariaLabel}
    >
      {icon}
    </Link>
  );
}
