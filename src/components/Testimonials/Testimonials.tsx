import TestimonialChunk from "@/components/Testimonials/TestimonialChunk";

const Testimonials = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-center flex flex-col gap-1">
        <h3 className="font-bold text-2xl text-primary-blue">
          What patients say
        </h3>
        <p className=" font-medium text-xl text-primary-grey">
          Real stories from our clinic
        </p>
      </div>
      <div className="flex md:flex-row flex-col items-center justify-center gap-10">
        {Array.from({ length: 5 }, (e, index) => (
          <TestimonialChunk key={index} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
