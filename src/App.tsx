import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });
    (window as any).__lenis = lenis;
    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] font-sans text-[#F5F5F7]">
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[90] opacity-[0.04]" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;