import ScrollAnimation from "./_components/ScrollAnimation";
import HeroSection from "./_components/HeroSection";

export default function Home() {
  return (
    <main className="relative w-full h-[8000px] bg-black">
      <ScrollAnimation />
      <HeroSection />
    </main>
  );
}