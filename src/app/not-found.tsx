import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col  gap-3  pt-16 lg:pt-0 items-center justify-center h-screen">
      {/* Empty State Image */}
      <div className="hidden dark-mode-block">
        <Image
          src="/images/under-construction-light.png"
          alt="No tournaments (light)"
          width={1200}
          height={120}
          priority
          className="w-full h-[173px] object-cover lg:h-[280px] xl:h-[350px]"
        />
      </div>

      <div className=" block dark-mode-hidden">
        <Image
          src="/images/under-construction.png"
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
          Oops, you are here too soon!
        </p>

        {/* Empty State Subtitle */}
        <p className="text-center text-n-600 font-normal leading-[137%] text-sm w-[78%] lg:text-lg xl:text-xl ">
          We are still preparing the playing field, come back later to see this
          page.
        </p>
      </div>
    </div>
  );
}
