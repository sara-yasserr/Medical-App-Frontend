"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterChoice() {
  const router = useRouter();

  const options = [
    {
      title: "Register as Doctor",
      description: "Create an account as a medical doctor",
      image: "/doctor-icon.png", 
      link: "/register/doctor",
    },
    {
      title: "Register as Patient",
      description: "Create an account as a patient",
      image: "/patient-icon.png", 
      link: "/register/patient",
    },
  ];

  return (
    <div className="h-svh flex items-center justify-center">
      <div className="rounded-lg shadow-2xl p-7 flex flex-col items-center gap-7">
        {/* Logo + Title */}
        <div className="flex items-center justify-center gap-2">
          <div className="relative size-10">
            <Image fill alt="logo" src={"/medical-logo.jpg"} />
          </div>
          <h2 className="font-bold text-lg">Choose Registration Type</h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {options.map(({ title, description, image, link }, index) => (
            <div
              key={index}
              onClick={() => router.push(link)}
              className="cursor-pointer rounded-lg border border-[#DDD] shadow-md p-5 flex flex-col items-center gap-3 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="relative w-16 h-16">
                <Image fill alt={title} src={image} className="object-contain" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-gray-600 text-center">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
