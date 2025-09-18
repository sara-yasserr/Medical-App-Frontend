import ServiceChunck from "@/components/Services/ServiceChunck";

const servicesData = [
  {
    title: "Personalized care.",
    desc: "Every patient receives tailored treatment and focused attention from our dedicated doctors.",
    src: "/service1.avif",
  },

  {
    title: "Modern facilities.",
    desc: "Our clinic is equipped with advanced technology to ensure accurate diagnosis and comfort.",
    src: "/service2.avif",
  },

  {
    title: "Friendly team.",
    desc: "Experienced professionals provide support and care throughout every step of your visit.",
    src: "/service3.avif",
  },
];

const Services = () => {
  return (
    <div className="flex flex-col gap-20">
      {servicesData.map(({ title, desc, src }, index) => (
        <ServiceChunck
          key={index}
          index={index}
          title={title}
          desc={desc}
          src={src}
        />
      ))}
    </div>
  );
};

export default Services;
