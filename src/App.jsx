import React, { useCallback, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import CircuitTrack from "./components/CircuitTrack";
import RacingScrollbar from "./components/RacingScrollbar";
import StartingLights from "./components/StartingLights";

/* ─── Global Error Boundary to Prevent Blank Screen Crashes ─── */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] p-6 text-center text-white font-mono">
          <p className="text-sm font-bold uppercase tracking-widest text-[#E10600] mb-2">
            PIT STOP TELEMETRY ERROR
          </p>
          <p className="text-xs text-white/50 mb-6">
            A transient render issue occurred. Click below to recover.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg border border-[#E10600] bg-[#E10600]/15 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#E10600]"
          >
            Re-enter Circuit
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setShowPortfolio(true);
  }, []);

  // When portfolio is revealed, recalculate GSAP scroll positions for accurate full-page height
  useEffect(() => {
    if (!showPortfolio) return;

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [showPortfolio]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#050505] text-white">
        {/* Full-screen starting lights intro */}
        {!showPortfolio && (
          <StartingLights onComplete={handleIntroComplete} />
        )}

        {showPortfolio && <RacingScrollbar />}

        <div
          className={`portfolio-home ${
            showPortfolio ? "portfolio-home-visible" : ""
          }`}
          aria-hidden={!showPortfolio}
        >
          <Navbar />

          <main>
            <Hero />
            <CircuitTrack />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>

          {/* Footer */}
          <footer className="border-t border-white/6 py-8 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/25 font-medium">
              Built with ❤️ &nbsp;·&nbsp; VIRANSH &nbsp;·&nbsp; 2026
            </p>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
