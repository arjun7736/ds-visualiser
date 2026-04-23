import FooterSection from "./components/FooterSection";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PerformanceSection from "./components/PerformanceSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PerformanceSection />
        <FooterSection/>
      </main>
    </>
  );
}
