import HeroSection from "@/components/sections/HeroSection";
import MusicSection from "@/components/sections/MusicSection";
import AllSongsSection from "@/components/sections/AllSongsSection";
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
        <AllSongsSection />
        <AboutSection />
      </main>
      <Footer />
      <MiniPlayer />
    </>
  );
}
