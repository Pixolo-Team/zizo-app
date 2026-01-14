// COMPONENTS //
import BrandLogo from "@/components/brand-logo/BrandLogo";
import Link from "next/link";

// Interface props
interface SideMenuProps {
  menuItems: {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

// Side Menu Component
export default function SideMenu({ menuItems }: SideMenuProps) {
  // Define Navigation

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects

  return (
    <div className="flex-col gap-9 hidden lg:flex">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-4 cursor-pointer"
        >
          <div className="size-5 text-n-900">{item.icon}</div>
          <p className="text-lg text-n-900">{item.label}</p>
        </Link>
      ))}
    </div>
  );
}
