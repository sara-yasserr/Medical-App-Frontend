import Image from "next/image";

const Hero = () => {
  return (
    <div className="py-10 flex flex-col gap-10">
      <h1 className="flex flex-col gap-0 text-4xl font-bold">
        <span className="text-primary-blue ">Your Health Matters.</span>
        <span className="text-primary-grey">
          Compassionate medical care for the whole family.
        </span>
      </h1>

      <div
        // style={{
        //   height: "calc(100svh - 80px)",
        // }}
        className="relative h-[350px] md:h-[600px]"
      >
        <Image
          alt="doctor-image"
          src={"/hero.jpg"}
          fill
          priority
          className="object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Hero;
