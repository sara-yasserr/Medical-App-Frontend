import { ServiceChunkProps } from "@/types/services-types";
import Image from "next/image";

const ServiceChunck = ({
  title = "Personalized care.",
  desc = "Every patient receives tailored treatment and focused attention from our dedicated doctors.",
  src = "/service1.avif",
  index = 0,
}: ServiceChunkProps) => {
  const indexOdd = index % 2 !== 0;
  return (
    <div
      className={`flex flex-col ${
        indexOdd ? "md:flex-row-reverse" : "md:flex-row"
      }  justify-center gap-5 items-center `}
    >
      <div
        className={`${
          indexOdd ? " md:items-end  md:!text-end !text-center" : ""
        } flex flex-col   gap-2 md:text-start text-center`}
      >
        <h3 className="font-bold text-2xl text-primary-blue">{title}</h3>
        <p className="md:w-1/2 w-full font-medium text-primary-grey">{desc}</p>
      </div>
      <div className="relative h-[300px] w-[300px] md:w-[500px]  rounded-2xl ">
        <Image
          className="rounded-2xl object-cover right"
          fill
          alt={title}
          src={src}
        />
      </div>
    </div>
  );
};

export default ServiceChunck;
