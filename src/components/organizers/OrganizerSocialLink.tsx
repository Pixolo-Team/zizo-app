"use client";
import FacebookLogo2 from "@/components/icons/neevo-icons/FacebookLogo2";
import InstagramLogo from "@/components/icons/neevo-icons/InstagramLogo";
import YoutubeLogo from "@/components/icons/neevo-icons/YoutubeLogo";
import SocialIcon from "@/components/organizers/SocialIcon";

type SocialPlatform = {
  url: string;
  platform_name: string;
};

export default function OrganizerDetails({
  socialPlatforms,
}: {
  socialPlatforms: SocialPlatform[];
}) {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <InstagramLogo />;
      case "facebook":
        return <FacebookLogo2 />;
      case "youtube":
        return <YoutubeLogo />;
      default:
        return null; // website or unknown platform
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-n-200 bg-n-50 p-5 gap-3 lg:rounded-3xl lg:p-7 lg:gap-3">
      <p className="text-base leading-none tracking-normal font-medium text-n-500 lg:text-2xl ">
        Follow us on
      </p>
      {/* Social Links */}
      <div className="grid grid-cols-3 gap-4 lg:gap-2.5 w-full">
        {socialPlatforms.map((socialPlatformItem, index) => {
          const icon = getIcon(socialPlatformItem.platform_name);
          if (!icon) return null;

          return (
            <SocialIcon
              key={index}
              icon={icon}
              href={socialPlatformItem.url}
              ariaLabel={socialPlatformItem.platform_name}
            />
          );
        })}
      </div>
    </div>
  );
}
