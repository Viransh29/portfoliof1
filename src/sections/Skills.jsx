import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiPython,
  SiGit,
  SiHtml5,
  SiDjango,
} from "react-icons/si";
import { CheckCircle2, Cpu, Gauge, Layers, Wrench } from "lucide-react";

/* ─── Technical Specifications Data ──────────────────── */
const ASSEMBLIES = [
  {
    id: "aero",
    assemblyCode: "AERODYNAMICS",
    assemblyName: "Frontend Architecture",
    description: "Responsive UI architecture, low-latency component rendering, modern CSS styling systems, and interactive client logic.",
    color: "#61DAFB",
    icon: Layers,
    components: [
      {
        id: "react",
        code: "SPEC.01",
        name: "React.js",
        role: "Component-Driven UI Engine",
        color: "#61DAFB",
        icon: SiReact,
        architecture: "Virtual DOM · Hooks · State Hierarchy",
        deployment: "Client-Side SPA",
        status: "ACTIVE",
      },
      {
        id: "tailwind",
        code: "SPEC.02",
        name: "Tailwind CSS",
        role: "Utility-First Styling & Design System",
        color: "#06B6D4",
        icon: SiTailwindcss,
        architecture: "JIT Compiler · Design Tokens · Fluid Grid",
        deployment: "Zero-Runtime CSS",
        status: "ACTIVE",
      },
      {
        id: "javascript",
        code: "SPEC.03",
        name: "JavaScript (ES6+)",
        role: "Modern Client & Scripting Logic",
        color: "#F7DF1E",
        icon: SiJavascript,
        architecture: "Asynchronous · Closures · Event Delegation",
        deployment: "V8 Engine Target",
        status: "ACTIVE",
      },
      {
        id: "html5",
        code: "SPEC.04",
        name: "HTML5 & CSS3",
        role: "Semantic Web Structure & Layouts",
        color: "#E34F26",
        icon: SiHtml5,
        architecture: "Semantic DOM · CSS Grid · Flexbox",
        deployment: "Native Browser",
        status: "ACTIVE",
      },
    ],
  },
  {
    id: "powertrain",
    assemblyCode: "SERVER",
    assemblyName: "Backend Architecture",
    description: "Asynchronous server runtimes, RESTful API gateways, routing middleware, and backend data processing services.",
    color: "#5FA04E",
    icon: Cpu,
    components: [
      {
        id: "nodejs",
        code: "SPEC.05",
        name: "Node.js",
        role: "Event-Driven Server Runtime",
        color: "#5FA04E",
        icon: SiNodedotjs,
        architecture: "V8 Engine · Non-blocking I/O · Async Pipelines",
        deployment: "Server Runtime",
        status: "ACTIVE",
      },
      {
        id: "express",
        code: "SPEC.06",
        name: "Express.js",
        role: "RESTful API & Middleware Routing",
        color: "#FFFFFF",
        icon: SiExpress,
        architecture: "Middleware Pipelines · Routing · CORS Policies",
        deployment: "REST Gateway",
        status: "ACTIVE",
      },
      {
        id: "python",
        code: "SPEC.07",
        name: "Python",
        role: "Computational & Backend Logic",
        color: "#3776AB",
        icon: SiPython,
        architecture: "OOP · Data Structures · Automation",
        deployment: "Service Core",
        status: "ACTIVE",
      },
      {
        id: "django",
        code: "SPEC.08",
        name: "Django",
        role: "Full-Stack Web & ORM Framework",
        color: "#2BA977",
        icon: SiDjango,
        architecture: "ORM Models · CSRF Mitigation · Auth Controller",
        deployment: "Batteries-Included",
        status: "ACTIVE",
      },
    ],
  },
  {
    id: "data",
    assemblyCode: "DATA & OPERATIONS",
    assemblyName: "Database & Version Control",
    description: "Fault-tolerant document storage and distributed version control systems built for continuous deployment.",
    color: "#F05032",
    icon: Wrench,
    components: [
      {
        id: "mongodb",
        code: "SPEC.09",
        name: "MongoDB",
        role: "NoSQL Document Database",
        color: "#47A248",
        icon: SiMongodb,
        architecture: "Dynamic BSON · Aggregations · Index Caching",
        deployment: "Distributed Store",
        status: "ACTIVE",
      },
      {
        id: "git",
        code: "SPEC.10",
        name: "Git & GitHub",
        role: "Distributed Version Control & Deployment",
        color: "#F05032",
        icon: SiGit,
        architecture: "Branching Strategies · PR Review · Merge Control",
        deployment: "Version Control",
        status: "ACTIVE",
      },
    ],
  },
];

/* ─── Stepped Status Indicator ───────────────────────── */
function PowerMeter({ color, isHovered }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4].map((step) => (
        <span
          key={step}
          className="h-1.5 w-3.5 rounded-xs transition-all duration-300"
          style={{
            backgroundColor: isHovered ? color : "rgba(255, 255, 255, 0.12)",
            boxShadow: isHovered ? `0 0 6px ${color}` : "none",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Technical Component Card ───────────────────────── */
function ComponentCard({ comp }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = comp.icon;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-[#07090e] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#0c0f17]"
      style={{
        boxShadow: isHovered ? `0 12px 28px -8px ${comp.color}20` : "none",
        borderColor: isHovered ? `${comp.color}45` : undefined,
      }}
    >
      {/* Top Accent Line */}
      <div
        className="absolute left-0 top-0 h-1 w-12 rounded-tl-xl transition-all duration-300"
        style={{
          backgroundColor: comp.color,
          width: isHovered ? "100%" : "48px",
          opacity: isHovered ? 1 : 0.6,
        }}
      />

      <div>
        {/* Card Header: Icon & Component Tag */}
        <div className="flex items-center justify-between mb-4 pt-1">
          {/* Tech Logo */}
          <div
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/2 transition-all duration-300 group-hover:scale-105"
            style={{
              backgroundColor: isHovered ? `${comp.color}15` : "rgba(255, 255, 255, 0.02)",
              borderColor: isHovered ? `${comp.color}40` : "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Icon
              size={24}
              style={{
                color: comp.color,
                filter: isHovered ? `drop-shadow(0 0 6px ${comp.color}80)` : "none",
              }}
              className="transition-all duration-300"
            />
          </div>

          {/* Component Code & Deployment */}
          <div className="text-right">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-white/40">
              {comp.code}
            </span>
            <div className="mt-1 flex items-center justify-end gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: comp.color }}
              />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/50">
                {comp.deployment}
              </span>
            </div>
          </div>
        </div>

        {/* Tech Component Name */}
        <h4 className="text-base font-black uppercase tracking-wide text-white group-hover:text-white transition-colors">
          {comp.name}
        </h4>

        {/* Technical Role */}
        <p className="mt-1 text-xs font-semibold text-white/60 leading-relaxed">
          {comp.role}
        </p>

        {/* Architectural Specification */}
        <div className="mt-3 rounded border border-white/5 bg-black/40 px-3 py-2">
          <p className="font-mono text-[10px] uppercase tracking-wider text-white/45">
            {comp.architecture}
          </p>
        </div>
      </div>

      {/* Footer: Status + Meter */}
      <div className="mt-4 pt-3 border-t border-white/6 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/40">
        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <CheckCircle2 size={12} />
          {comp.status}
        </span>
        <PowerMeter color={comp.color} isHovered={isHovered} />
      </div>
    </div>
  );
}

export default function Skills() {
  const [selectedAssembly, setSelectedAssembly] = useState("all");

  const displayedAssemblies =
    selectedAssembly === "all"
      ? ASSEMBLIES
      : ASSEMBLIES.filter((a) => a.id === selectedAssembly);

  return (
    <section
      id="skills"
      className="relative py-24 lg:py-32 bg-[#06070a] overflow-hidden border-t border-white/8"
    >
      {/* Background subtle atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,6,0,0.035),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#E10600] animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E10600]">
            Core Technologies
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
                Technical Specs
              </h2>
              <div className="mt-3.5 h-0.5 w-20 bg-[#E10600]" />
            </div>

            <p className="max-w-md text-xs uppercase tracking-[0.2em] text-white/50 leading-relaxed">
              Full-stack technical details organized across aerodynamics (frontend), server runtime (backend), and data operations.
            </p>
          </div>
        </div>

        {/* Specification Summary Strip */}
        <div className="mb-10 grid grid-cols-2 lg:grid-cols-4 gap-3 rounded-xl border border-white/10 bg-[#090b10] p-4 text-[10px] font-mono uppercase tracking-wider text-white/50">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#61DAFB]" />
            <span>AERODYNAMICS: <strong className="text-white">REACT & TAILWIND</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#5FA04E]" />
            <span>SERVER: <strong className="text-white">NODE & EXPRESS</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#F05032]" />
            <span>DATA: <strong className="text-white">MONGODB & GIT</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYSTEMS: <strong className="text-emerald-400">10 / 10 OPTIMAL</strong></span>
          </div>
        </div>

        {/* Assembly Filter Tabs */}
        <div className="mb-10 flex flex-wrap gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setSelectedAssembly("all")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              selectedAssembly === "all"
                ? "border-[#E10600] bg-[#E10600]/15 text-white shadow-[0_0_16px_rgba(225,6,0,0.25)]"
                : "border-white/10 bg-[#0a0d14] text-white/50 hover:border-white/25 hover:text-white"
            }`}
          >
            <Gauge size={14} className={selectedAssembly === "all" ? "text-[#E10600]" : "text-white/40"} />
            <span>All Specs (10)</span>
          </button>

          {ASSEMBLIES.map((assembly) => {
            const isActive = selectedAssembly === assembly.id;
            const AsmIcon = assembly.icon;

            return (
              <button
                key={assembly.id}
                type="button"
                onClick={() => setSelectedAssembly(assembly.id)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-[#E10600] bg-[#E10600]/15 text-white shadow-[0_0_16px_rgba(225,6,0,0.25)]"
                    : "border-white/10 bg-[#0a0d14] text-white/50 hover:border-white/25 hover:text-white"
                }`}
              >
                <AsmIcon
                  size={14}
                  className={isActive ? "text-[#E10600]" : "text-white/40"}
                />
                <span>{assembly.assemblyCode.split(" ")[0]} ({assembly.components.length})</span>
              </button>
            );
          })}
        </div>

        {/* ── Engineering Assemblies Stacks ── */}
        <div className="space-y-10">
          {displayedAssemblies.map((assembly) => {
            const AsmIcon = assembly.icon;

            return (
              <div
                key={assembly.id}
                className="rounded-2xl border border-white/10 bg-[#090b10] p-6 lg:p-7 relative overflow-hidden"
              >
                {/* Colored Header Accent */}
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: assembly.color }}
                />

                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/8 pb-4 mb-6 gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10"
                      style={{
                        backgroundColor: `${assembly.color}15`,
                        borderColor: `${assembly.color}35`,
                      }}
                    >
                      <AsmIcon size={18} style={{ color: assembly.color }} />
                    </div>

                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: assembly.color }}>
                        {assembly.assemblyCode}
                      </p>
                      <h3 className="text-lg font-black uppercase tracking-wide text-white">
                        {assembly.assemblyName}
                      </h3>
                    </div>
                  </div>

                  <p className="max-w-md text-xs text-white/40 leading-relaxed font-mono">
                    {assembly.description}
                  </p>
                </div>

                {/* Components Grid */}
                <div
                  className={`grid gap-4 ${
                    assembly.components.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                  }`}
                >
                  {assembly.components.map((comp) => (
                    <ComponentCard
                      key={comp.id}
                      comp={comp}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Footer */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/8 bg-[#090b10] px-6 py-4 text-xs font-mono uppercase tracking-wider text-white/40">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FULL-STACK ARCHITECTURE: ALL SYSTEMS VERIFIED & PRODUCTION READY</span>
          </div>
          <span className="text-white/60">REACT · NODE · MONGODB · PYTHON · TAILWIND</span>
        </div>

      </div>
    </section>
  );
}
