import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import F1CarSVG from "./F1CarSVG.jsx";

const CARS = [
  {
    team: "Red Bull Racing",
    color: "#061D42",
    secondary: "#FF1E1D",
    accent: "#FCD800",
  },
  {
    team: "Scuderia Ferrari",
    color: "#A6051A",
    secondary: "#000000",
    accent: "#FFEB00",
  },
  {
    team: "McLaren",
    color: "#FF8000",
    secondary: "#000000",
    accent: "#47C7FC",
  },
  {
    team: "Mercedes",
    color: "#C0C0C0",
    secondary: "#00A19C",
    accent: "#000000",
  },
  {
    team: "Aston Martin",
    color: "#006F62",
    secondary: "#CEDC00",
    accent: "#000000",
  },
];

const CAR_HEIGHT = 96;

export default function RacingScrollbar() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001,
  });

  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    return smoothProgress.on("change", (progress) => {
      const num = Number(progress);
      if (Number.isNaN(num)) return;
      const clamped = Math.max(0, Math.min(1, num));
      const index = Math.min(
        Math.max(0, Math.floor(clamped * CARS.length)),
        CARS.length - 1
      );

      setCurrentCarIndex(index);
    });
  }, [smoothProgress]);

  const travelDistance = Math.max(0, viewportHeight - CAR_HEIGHT);

  const carY = useTransform(
    smoothProgress,
    [0, 1],
    [0, travelDistance],
    { clamp: true }
  );

  const currentCar = CARS[currentCarIndex] ?? CARS[0];

  return (
    <aside
      className="pointer-events-none fixed inset-y-0 right-3 z-50 w-12 sm:right-5"
      aria-label={`Scroll indicator. ${currentCar.team}`}
    >
      {/* Single thin grey line */}
      <div
        className="absolute inset-y-0 left-1/2 w-0.75 -translate-x-1/2"
        style={{
          backgroundColor: "rgba(120, 120, 120, 0.28)",
        }}
      />

      {/* F1 car follows page scroll */}
      <motion.div
        style={{ y: carY }}
        className="group absolute left-1/2 top-0 z-10 h-24 w-12 -translate-x-1/2"
      >
        <motion.div
          key={currentCar.team}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="h-full w-full drop-shadow-[0_0_5px_rgba(225,6,0,0.25)]"
        >
          <F1CarSVG
            color={currentCar.color}
            secondary={currentCar.secondary}
            accent={currentCar.accent}
          />
        </motion.div>

        {/* Team label on hover */}
        <div className="absolute right-full top-1/2 mr-3 -translate-y-1/2 rounded-sm border-l-2 border-red-600 bg-black/90 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="whitespace-nowrap font-bold">
            {currentCar.team}
          </span>
        </div>
      </motion.div>
    </aside>
  );
}
