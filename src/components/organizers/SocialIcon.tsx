// REACT //
import { ReactNode } from "react";

// COMPONENTS //
import Link from "next/link";

interface SocialIconProps {
  icon: ReactNode;
  href: string;
  ariaLabel: string;
}

/** SocialIcon Component */
export default function SocialIcon({ icon, href, ariaLabel }: SocialIconProps) {
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
