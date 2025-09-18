import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col gap-32">
      <Hero />
      <Services />
      <Testimonials />
    </div>
  );
}
