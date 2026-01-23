"use client";
import FacebookLogo2 from "@/components/icons/neevo-icons/FacebookLogo2";
import InstagramLogo from "@/components/icons/neevo-icons/InstagramLogo";
import YoutubeLogo from "@/components/icons/neevo-icons/YoutubeLogo";
import SocialIcon from "@/components/organizers/SocialIcon";

// TODO: Remove this when we have real data
const socialLinks = {
  facebook: "https://facebook.com/skorostunited",
  instagram: "https://instagram.com/skorostunited",
  youtube: "https://youtube.com/@skorostunited",
};

// TODO: Remove this when we have real data
const organizerSocialIcons = [
  {
    key: "facebook",
    icon: <FacebookLogo2 primaryColor="var(--color-n-700)" />,
    href: socialLinks.facebook,
  },
  {
    key: "instagram",
    icon: <InstagramLogo primaryColor="var(--color-n-700)" />,
    href: socialLinks.instagram,
  },
  {
    key: "youtube",
    icon: <YoutubeLogo primaryColor="var(--color-n-700)" />,
    href: socialLinks.youtube,
  },
];

export default function OrganizerDetails() {
  return (
    <div className="flex flex-col rounded-2xl border border-n-200 bg-n-50 p-5 gap-3 lg:rounded-3xl lg:p-7 lg:gap-3">
      <p className="text-base leading-none tracking-normal font-medium text-n-500 lg:text-2xl ">
        Follow us on
      </p>
      {/* Social Links */}
      <div className="grid grid-cols-3 gap-4 lg:gap-2.5 w-full">
        {organizerSocialIcons
          .filter((socialItem) => socialItem.href)
          .map((socialItem) => (
            <SocialIcon
              key={socialItem.key}
              icon={socialItem.icon}
              href={socialItem.href!}
              ariaLabel={socialItem.key}
            />
          ))}
      </div>
    </div>
  );
}
