import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col  gap-3  pt-16 lg:pt-0 items-center justify-center h-screen">
      {/* Empty State Image */}
      <div className="hidden dark-mode-block">
        <Image
          src="/images/no-tournament-dark.png"
          alt="No tournaments (light)"
          width={1200}
          height={120}
          priority
          className="w-full h-[173px] object-cover invert-[1] lg:h-[280px] xl:h-[350px]"
        />
      </div>

      <div className=" block dark-mode-hidden">
        <Image
          src="/images/no-tournament-light.png"
          alt="No tournaments (dark)"
          width={1200}
          height={120}
          priority
          className="w-full h-[173px] object-cover lg:h-[280px] xl:h-[350px]"
        />
      </div>

      <div className="flex flex-col gap-2 items-center">
        {/* Empty State Title */}
        <p className="text-center text-n-900 font-medium text-xl lg:text-2xl xl:text-3xl">
          No tournaments on the field
        </p>

        {/* Empty State Subtitle */}
        <p className="text-center text-n-600 font-normal leading-[137%] text-sm w-[78%] lg:text-lg xl:text-xl ">
          Try changing your filters or search a different area
        </p>
      </div>
    </div>
  );
}
