import HeroSection from "@/components/sections/HeroSection";
import MusicSection from "@/components/sections/MusicSection";
import LoreSection from "@/components/sections/LoreSection";
import AboutSection from "@/components/sections/AboutSection";
import CTASection from "@/components/sections/CTASection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MiniPlayer from "@/components/audio/MiniPlayer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MusicSection />
        <LoreSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
      <MiniPlayer />
    </>
  );
}
