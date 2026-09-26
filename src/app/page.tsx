import HeroSection from "@/components/sections/HeroSection";
import MusicSection from "@/components/sections/MusicSection";
import AboutSection from "@/components/sections/AboutSection";
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
        <AboutSection />
      </main>
      <Footer />
      <MiniPlayer />
    </>
  );
}
