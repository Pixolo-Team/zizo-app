// REACT //
import { ReactNode } from "react";

// COMPONENTS //
import Link from "next/link";

interface SocialIconProps {
  icon: ReactNode;
  href: string;
}

/** SocialIcon Component */
export default function SocialIcon({ icon, href }: SocialIconProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center px-8 py-5 border rounded-xl overflow-hidden bg-n-100 border-n-200"
      aria-label="Social Icon"
    >
      {icon}
    </Link>
  );
}
