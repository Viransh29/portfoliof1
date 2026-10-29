import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, svg } from "animejs";
import { ArrowUpRight, Gauge } from "lucide-react";
import spaSvg from "../assets/spa-track.svg?raw";

gsap.registerPlugin(ScrollTrigger);

function getSvgPath(id) {
  const pattern = new RegExp(
    `<path\\b(?=[^>]*\\bid=["']${id}["'])[^>]*\\bd=["']([^"']+)["'][^>]*>`,
    "s"
  );

  return spaSvg.match(pattern)?.[1] ?? "";
}

const TRACKS = [
  { id: "sector-1", name: "Sector 1", color: "#F4442E", d: getSvgPath("sector-1") },
  { id: "sector-2", name: "Sector 2", color: "#54C6EB", d: getSvgPath("sector-3") },
  { id: "sector-3", name: "Sector 3", color: "#FFD449", d: getSvgPath("sector-2") },
];

const STATIONS = [
  {
    id: "about",
    label: "ABOUT",
    sectorId: "sector-1",
    progress: 0.12,
    color: "#F4442E",
    width: 76,
  },
  {
    id: "skills",
    label: "SKILLS",
    sectorId: "sector-2",
    progress: 0.38,
    color: "#54C6EB",
    width: 72,
  },
  {
    id: "projects",
    label: "PROJECTS",
    sectorId: "sector-2",
    progress: 0.62,
    color: "#54C6EB",
    width: 96,
  },
  {
    id: "contact",
    label: "CONTACT",
    sectorId: "sector-3",
    progress: 0.88,
    color: "#FFD449",
    width: 90,
  },
];

const SECTORS_INFO = [
  {
    id: "sector-1",
    sectorNum: "01",
    name: "Sector 1",
    color: "#F4442E",
    stationId: "about",
    stationLabel: "ABOUT",
    title: "Driver Profile & Foundations",
    description:
      "Full-stack developer profile, computer science foundations, engineering mindset, and personal background.",
    actionText: "Explore Profile",
  },
  {
    id: "sector-2",
    sectorNum: "02",
    name: "Sector 2",
    color: "#54C6EB",
    stationId: "skills",
    secondaryStationId: "projects",
    stationLabel: "SKILLS & PROJECTS",
    title: "Technical Arsenal & Shipped Builds",
    description:
      "Core full-stack technologies (React, Node.js, MongoDB, Python) paired with production-ready builds and web applications.",
    actionText: "View Skills",
    secondaryActionText: "View Projects",
  },
  {
    id: "sector-3",
    sectorNum: "03",
    name: "Sector 3",
    color: "#FFD449",
    stationId: "contact",
    stationLabel: "CONTACT",
    title: "Pit Stop Communications",
    description:
      "Direct line for opportunities, collaborations, and open team radio channels across GitHub, LinkedIn, and Email.",
    actionText: "Contact Me",
  },
];

function getPoint(path, distance) {
  return path.getPointAtLength(
    Math.max(0, Math.min(distance, path.getTotalLength()))
  );
}

function getAngle(from, to) {
  return Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);
}

function TrackArrow({ glowRef }) {
  return (
    <g>
      <circle
        ref={glowRef}
        r="8"
        fill="#54C6EB"
        opacity="0.4"
      />
      <path
        d="M 12 0 L -7 -6 L -3 0 L -7 6 Z"
        fill="#FFFFFF"
        stroke="#54C6EB"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </g>
  );
}

export default function CircuitTrack() {
  const sectionRef = useRef(null);
  const arrowRef = useRef(null);
  const glowRef = useRef(null);
  const stationRefs = useRef({});

  const sector1Ref = useRef(null);
  const sector2Ref = useRef(null);
  const sector3Ref = useRef(null);

  const [hoveredStation, setHoveredStation] = useState(null);
  const [hoveredSector, setHoveredSector] = useState(null);

  const getRoutePositionRef = useRef(null);
  const playheadRef = useRef({ progress: 0 });
  const scrollTweenRef = useRef(null);

  const pathRefs = {
    "sector-1": sector1Ref,
    "sector-2": sector2Ref,
    "sector-3": sector3Ref,
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const arrow = arrowRef.current;
    const glow = glowRef.current;

    if (!section || !arrow || !glow) return;

    ScrollTrigger.getAll()
      .filter((st) => st.vars?.trigger === section)
      .forEach((st) => st.kill());

    const segments = TRACKS.map((track) => {
      const path = pathRefs[track.id].current;
      if (!path) return null;
      const length = path.getTotalLength();
      return {
        path,
        length,
        start: getPoint(path, 0),
        end: getPoint(path, length),
      };
    });

    if (segments.some((segment) => !segment || !segment.length)) {
      console.error("Unable to measure circuit paths.");
      return;
    }

    const route = [];
    let totalLength = 0;

    segments.forEach((segment, index) => {
      route.push({
        type: "path",
        segment,
        startDistance: totalLength,
        length: segment.length,
      });

      totalLength += segment.length;

      const next = segments[index + 1];
      if (next) {
        const gapLength = Math.hypot(
          next.start.x - segment.end.x,
          next.start.y - segment.end.y
        );

        if (gapLength > 0.01) {
          route.push({
            type: "gap",
            from: segment.end,
            to: next.start,
            startDistance: totalLength,
            length: gapLength,
          });

          totalLength += gapLength;
        }
      }
    });

    function getRoutePosition(progress) {
      if (!route || route.length === 0 || !totalLength) {
        return { x: 0, y: 0, angle: 0 };
      }
      const safeProgress = Number.isFinite(progress) ? Math.max(0, Math.min(progress, 1)) : 0;
      const distance = safeProgress * totalLength;
      const item =
        route.find(
          (part) => distance <= part.startDistance + part.length
        ) ?? route[route.length - 1];

      if (!item) return { x: 0, y: 0, angle: 0 };

      const localDistance = Math.max(
        0,
        Math.min(distance - item.startDistance, item.length)
      );

      if (item.type === "gap") {
        const t = item.length ? localDistance / item.length : 0;
        return {
          x: item.from.x + (item.to.x - item.from.x) * t,
          y: item.from.y + (item.to.y - item.from.y) * t,
          angle: getAngle(item.from, item.to),
        };
      }

      const path = item.segment.path;
      const length = item.segment.length;
      const point = getPoint(path, localDistance);
      const before = getPoint(path, Math.max(0, localDistance - 1));
      const after = getPoint(path, Math.min(length, localDistance + 1));

      return {
        x: point?.x ?? 0,
        y: point?.y ?? 0,
        angle: getAngle(before, after) || 0,
      };
    }

    getRoutePositionRef.current = getRoutePosition;

    // Position the stations
    STATIONS.forEach((station) => {
      const marker = stationRefs.current[station.id];
      if (!marker) return;
      const point = getRoutePosition(station.progress);
      marker.setAttribute("transform", `translate(${point.x} ${point.y})`);
    });

    const drawAnimations = [];
    let glowAnimation;
    let refreshFrame;

    const context = gsap.context(() => {
      // Draw circuit lines
      segments.forEach((segment, index) => {
        const [drawable] = svg.createDrawable(segment.path);
        const drawing = animate(drawable, {
          draw: ["0 0", "0 1"],
          duration: 1600,
          delay: index * 250,
          ease: "inOutQuad",
        });
        drawAnimations.push(drawing);
      });

      // Arrow glow pulse — clearly visible and smooth
      glowAnimation = animate(glow, {
        opacity: [0.3, 0.6],
        duration: 1100,
        ease: "inOutSine",
        alternate: true,
        loop: true,
      });

      function updateArrow() {
        if (!arrow || !getRoutePositionRef.current) return;
        const point = getRoutePositionRef.current(playheadRef.current.progress);
        if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return;
        arrow.setAttribute(
          "transform",
          `translate(${point.x} ${point.y}) rotate(${point.angle || 0})`
        );
      }

      updateArrow();

      // Scrub car along circuit as user scrolls through this section
      scrollTweenRef.current = gsap.to(playheadRef.current, {
        progress: 1,
        ease: "none",
        onUpdate: updateArrow,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      refreshFrame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (refreshFrame) cancelAnimationFrame(refreshFrame);
      window.removeEventListener("resize", handleResize);
      glowAnimation?.pause();
      drawAnimations.forEach((animation) => animation.pause());
      context.revert();
    };
  }, []);

  function navigateToSection(id) {
    const target = document.getElementById(id);
    if (!target) {
      console.warn(`Portfolio section #${id} was not found.`);
      return;
    }
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleStationHover(station) {
    setHoveredStation(station.id);
    setHoveredSector(station.sectorId);

    if (arrowRef.current && getRoutePositionRef.current) {
      gsap.to(playheadRef.current, {
        progress: station.progress,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => {
          const point = getRoutePositionRef.current(playheadRef.current.progress);
          arrowRef.current.setAttribute(
            "transform",
            `translate(${point.x} ${point.y}) rotate(${point.angle})`
          );
        },
      });
    }
  }

  function handleStationLeave() {
    setHoveredStation(null);
    setHoveredSector(null);
  }

  function handleSectorHover(sector) {
    setHoveredSector(sector.id);
    const primaryStation = STATIONS.find((s) => s.id === sector.stationId);
    if (primaryStation) {
      setHoveredStation(primaryStation.id);
      if (arrowRef.current && getRoutePositionRef.current) {
        gsap.to(playheadRef.current, {
          progress: primaryStation.progress,
          duration: 0.5,
          ease: "power2.out",
          onUpdate: () => {
            const point = getRoutePositionRef.current(playheadRef.current.progress);
            arrowRef.current.setAttribute(
              "transform",
              `translate(${point.x} ${point.y}) rotate(${point.angle})`
            );
          },
        });
      }
    }
  }

  function handleSectorLeave() {
    setHoveredSector(null);
    setHoveredStation(null);
  }

  if (TRACKS.some((track) => !track.d)) {
    return (
      <section className="bg-black p-6 text-white">
        Unable to load circuit paths. Check the sector IDs in spa-track.svg.
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="circuit"
      className="relative py-20 lg:py-28 bg-[#050608] border-t border-white/8 overflow-hidden"
    >
      {/* Background glow & subtle race grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,6,0,0.04),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[50px_50px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#E10600] animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E10600]">
              Grand Prix Telemetry & Navigation
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
                Circuit <span className="text-white/35">Layout</span>
              </h2>
              <div className="mt-3 h-0.5 w-20 bg-[#E10600]" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/45 max-w-md">
              Navigate stations to inspect telemetry 
              · Click to teleport across the paddock
            </p>
          </div>
        </div>

        {/* ── Side-by-side Dual Card Layout (as per user diagram) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ════════ LEFT CARD: COMPACT INTERACTIVE CIRCUIT ════════ */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#090b0f] p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] relative overflow-hidden group">
            {/* Top accent line matching sector colors: Sector 1 Red -> Sector 2 Blue -> Sector 3 Yellow */}
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#F4442E] via-[#54C6EB] to-[#FFD449]" />

            {/* Circuit Card Header */}
            <div className="flex items-center justify-between border-b border-white/8 pb-4 mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                  Track Layout
                </p>
                <h3 className="text-lg font-black uppercase tracking-wide text-white flex items-center gap-2 mt-0.5">
                  Spa-Francorchamps
                  <span className="text-[10px] font-semibold text-[#54C6EB] border border-[#54C6EB]/30 bg-[#54C6EB]/10 px-2 py-0.5 rounded-full">
                    guide
                  </span>
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-white/70">7.004 KM</span>
                <p className="text-[9px] uppercase tracking-widest text-white/35">19 Turns</p>
              </div>
            </div>

            {/* Circuit SVG Area */}
            <div className="relative flex items-center justify-center py-4 my-auto min-h-80 sm:min-h-90">
              <div className="pointer-events-none absolute inset-2 rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)]" />

              <svg
                viewBox="0 0 550 443.7"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 block h-auto w-full max-h-95 overflow-visible select-none"
                role="group"
                aria-label="Interactive portfolio circuit track"
              >
                <defs>
                  {/* Smooth, luminous aura filter */}
                  <filter
                    id="circuit-soft-glow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                    colorInterpolationFilters="sRGB"
                  >
                    <feGaussianBlur stdDeviation="3.2" />
                  </filter>
                </defs>

                {/* Circuit Track Glow Underneath — Balanced clearly visible neon aura */}
                {TRACKS.map((track) => {
                  const isHighlighted = hoveredSector === track.id;
                  return (
                    <path
                      key={`glow-${track.id}`}
                      d={track.d}
                      fill="none"
                      stroke={track.color}
                      strokeWidth={isHighlighted ? "10" : "8"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity={isHighlighted ? 0.48 : 0.32}
                      filter="url(#circuit-soft-glow)"
                      className="transition-all duration-300 pointer-events-none"
                    />
                  );
                })}

                {/* Main Sector Paths */}
                {TRACKS.map((track) => {
                  const isHighlighted = hoveredSector === track.id;
                  return (
                    <path
                      key={track.id}
                      ref={pathRefs[track.id]}
                      d={track.d}
                      fill="none"
                      stroke={track.color}
                      strokeWidth={isHighlighted ? "4.2" : "3.5"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-200 cursor-pointer"
                      onClick={() => {
                        const info = SECTORS_INFO.find((s) => s.id === track.id);
                        if (info) navigateToSection(info.stationId);
                      }}
                      onMouseEnter={() => setHoveredSector(track.id)}
                      onMouseLeave={() => setHoveredSector(null)}
                    />
                  );
                })}

                {/* Interactive Navigation Stations */}
                {STATIONS.map((station) => {
                  const isDirectHover = hoveredStation === station.id;
                  const isSectorActive = hoveredSector === station.sectorId;

                  return (
                    <g
                      key={station.id}
                      ref={(node) => {
                        stationRefs.current[station.id] = node;
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Navigate to ${station.label}`}
                      onClick={() => navigateToSection(station.id)}
                      onMouseEnter={() => handleStationHover(station)}
                      onMouseLeave={handleStationLeave}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          navigateToSection(station.id);
                        }
                      }}
                      className="cursor-pointer outline-none select-none transition-transform duration-200"
                    >
                      {/* Invisible hit targets covering BOTH the circle point and the entire text box */}
                      <circle r="22" fill="transparent" pointerEvents="all" />
                      <rect
                        x="10"
                        y="-16"
                        width={station.width + 16}
                        height="32"
                        rx="8"
                        fill="transparent"
                        pointerEvents="all"
                      />

                      {/* Station Glow Circle */}
                      <circle
                        r={isDirectHover ? "16" : isSectorActive ? "14" : "12"}
                        fill={station.color}
                        opacity={isDirectHover ? "0.32" : isSectorActive ? "0.22" : "0.14"}
                        pointerEvents="none"
                        className="transition-all duration-200"
                      />

                      {/* Outer Ring */}
                      <circle
                        r={isDirectHover ? "8" : "7"}
                        fill="#090b0f"
                        stroke={station.color}
                        strokeWidth={isDirectHover ? "2.6" : "2.2"}
                        pointerEvents="none"
                        className="transition-all duration-200"
                      />

                      {/* Center Core Dot */}
                      <circle
                        r={isDirectHover ? "3.2" : "2.8"}
                        fill={station.color}
                        pointerEvents="none"
                      />

                      {/* Station Label Badge */}
                      <g
                        transform={isDirectHover ? "scale(1.22) translate(3, -3)" : isSectorActive ? "scale(1.08) translate(1.5, -1.5)" : "scale(1)"}
                        style={{
                          transformOrigin: "0 0",
                          transition: "transform 0.2s ease-out",
                        }}
                        pointerEvents="auto"
                      >
                        <rect
                          x="13"
                          y="-13"
                          width={isDirectHover ? station.width + 10 : station.width}
                          height="26"
                          rx="6"
                          fill={isDirectHover ? "#141720" : "#11141a"}
                          stroke={station.color}
                          strokeOpacity={isDirectHover ? "0.95" : "0.75"}
                          strokeWidth={isDirectHover ? "1.6" : "1"}
                          className="transition-all duration-200"
                          pointerEvents="auto"
                        />
                        <circle
                          cx="22"
                          cy="0"
                          r="3"
                          fill={station.color}
                          pointerEvents="none"
                        />
                        <text
                          x="30"
                          y="4"
                          fill="#ffffff"
                          fontSize="9.5"
                          fontWeight="800"
                          letterSpacing="0.65"
                          className="transition-all duration-200"
                          pointerEvents="none"
                        >
                          {station.label}
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* Animated racing arrow */}
                <g ref={arrowRef} pointerEvents="none">
                  <TrackArrow glowRef={glowRef} />
                </g>
              </svg>
            </div>

            {/* Circuit Card Footer / Mini Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4 mt-4">
              <div className="flex items-center gap-4">
                {TRACKS.map((track) => {
                  const isHovered = hoveredSector === track.id;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => {
                        const info = SECTORS_INFO.find((s) => s.id === track.id);
                        if (info) navigateToSection(info.stationId);
                      }}
                      onMouseEnter={() => setHoveredSector(track.id)}
                      onMouseLeave={() => setHoveredSector(null)}
                      className="flex items-center gap-1.5 group/sector cursor-pointer"
                    >
                      <span
                        className="h-2 w-3.5 rounded-full transition-transform group-hover/sector:scale-125"
                        style={{
                          backgroundColor: track.color,
                          boxShadow: isHovered ? `0 0 8px ${track.color}` : "none",
                        }}
                      />
                      <span
                        className="text-[10px] uppercase font-bold tracking-wider transition-colors"
                        style={{
                          color: isHovered ? track.color : "rgba(255, 255, 255, 0.5)",
                        }}
                      >
                        {track.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium">
                Click Station to Teleport
              </span>
            </div>
          </div>

          {/* ════════ RIGHT CARD: SECTOR-WISE F1 RELEVANT INFO ════════ */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#090b0f] p-5 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] relative overflow-hidden">
            {/* Top Accent Line matching sector order: Sector 1 Red -> Sector 2 Blue -> Sector 3 Yellow */}
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#F4442E] via-[#54C6EB] to-[#FFD449]" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/8 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <Gauge size={16} className="text-[#E10600]" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                    Telemetry Analysis
                  </p>
                  <h3 className="text-lg font-black uppercase tracking-wide text-white">
                    Sector Breakdown
                  </h3>
                </div>
              </div>
            </div>

            {/* 3 Sector Info Cards */}
            <div className="space-y-3.5 my-auto">
              {SECTORS_INFO.map((sector) => {
                const isHovered = hoveredSector === sector.id;
                return (
                  <div
                    key={sector.id}
                    onMouseEnter={() => handleSectorHover(sector)}
                    onMouseLeave={handleSectorLeave}
                    className={`group relative rounded-xl border p-4 transition-all duration-300 ${
                      isHovered
                        ? "bg-[#13161f] translate-x-1"
                        : "bg-[#0b0e14] border-white/8 hover:border-white/20 hover:bg-[#10131a]"
                    }`}
                    style={{
                      borderColor: isHovered ? sector.color : undefined,
                      boxShadow: isHovered ? `0 0 16px ${sector.color}25` : undefined,
                    }}
                  >
                    {/* Colored left indicator line */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl transition-all duration-300"
                      style={{
                        backgroundColor: sector.color,
                        boxShadow: isHovered ? `0 0 8px ${sector.color}80` : "none",
                      }}
                    />

                    {/* Sector Card Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-xs font-black uppercase tracking-widest px-2.5 py-0.5 rounded font-mono"
                        style={{
                          backgroundColor: `${sector.color}20`,
                          color: sector.color,
                          border: `1px solid ${sector.color}40`,
                        }}
                      >
                        SECTOR {sector.sectorNum}
                      </span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: sector.color }}
                      >
                        [{sector.stationLabel}]
                      </span>
                    </div>

                    {/* Sector Title */}
                    <h4 className="text-sm font-black uppercase tracking-wide text-white mb-1.5">
                      {sector.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-white/60 leading-relaxed mb-3">
                      {sector.description}
                    </p>

                    {/* Action buttons to jump to section */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => navigateToSection(sector.stationId)}
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all duration-200 cursor-pointer"
                        style={{
                          backgroundColor: `${sector.color}18`,
                          color: sector.color,
                          border: `1px solid ${sector.color}45`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = sector.color;
                          e.currentTarget.style.color = "#000000";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `${sector.color}18`;
                          e.currentTarget.style.color = sector.color;
                        }}
                      >
                        <span>{sector.actionText}</span>
                        <ArrowUpRight size={12} />
                      </button>

                      {sector.secondaryStationId && sector.secondaryActionText && (
                        <button
                          type="button"
                          onClick={() => navigateToSection(sector.secondaryStationId)}
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all duration-200 cursor-pointer"
                          style={{
                            backgroundColor: `${sector.color}18`,
                            color: sector.color,
                            border: `1px solid ${sector.color}45`,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = sector.color;
                            e.currentTarget.style.color = "#000000";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = `${sector.color}18`;
                            e.currentTarget.style.color = sector.color;
                          }}
                        >
                          <span>{sector.secondaryActionText}</span>
                          <ArrowUpRight size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Card Footer / Track Status */}
            <div className="flex items-center justify-between border-t border-white/8 pt-4 mt-4 text-[10px] uppercase font-mono tracking-wider text-white/40">
              <span>3 Sectors · 4 Stations</span>
              <span className="text-emerald-400 font-bold"> 
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                TRACK: GREEN FLAG</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
