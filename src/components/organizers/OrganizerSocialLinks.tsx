"use client";
// COMPONENTS //
import SocialIcon from "@/components/organizers/SocialIcon";

type SocialPlatform = {
  url: string;
  platform_name: string;
};

export default function OrganizerSocialLinks({
  socialPlatforms,
}: {
  socialPlatforms: SocialPlatform[];
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-n-200 bg-n-50 p-5 gap-3 lg:rounded-3xl lg:p-7 lg:gap-3">
      <p className="text-base leading-none tracking-normal font-medium text-n-500 lg:text-2xl ">
        Follow us on
      </p>
      {/* Social Links */}
      <div className="grid grid-cols-3 gap-4 lg:gap-2.5 w-full">
        {socialPlatforms.map((socialPlatformItem, socialPlatformIndex) => {
          return (
            <SocialIcon
              key={`social-media-${socialPlatformIndex + 1}`}
              platformName={socialPlatformItem.platform_name}
              href={socialPlatformItem.url}
              ariaLabel={socialPlatformItem.platform_name}
            />
          );
        })}
      </div>
    </div>
  );
}
