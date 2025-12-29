// REACT //
import { ReactNode } from "react";

// COMPONENTS //
import Link from "next/link";

interface SocialIconProps {
  icon: ReactNode;
  href: string;
}

// SocialIcon Component
export default function SocialIcon({ icon, href }: SocialIconProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center px-8 py-5 border rounded-xl bg-n-100 border-n-200"
    >
      {icon}
    </Link>
  );
}
