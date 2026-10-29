import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Cpu, Globe, Coins, Layers } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJsonwebtokens,
  SiTailwindcss,
  SiPython,
  SiDjango,
  SiJavascript,
  SiSqlite,
  SiHtml5,
  SiCss,
  SiChartdotjs,
} from "react-icons/si";

/* ─── Tech Stack Icon & Color Lookup ─────────────────── */
const TECH_META = {
  "React.js": { icon: SiReact, color: "#61DAFB" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  "Express.js": { icon: SiExpress, color: "#FFFFFF" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "JWT": { icon: SiJsonwebtokens, color: "#E0234E" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Chart.js": { icon: SiChartdotjs, color: "#FF6384" },
  "Python": { icon: SiPython, color: "#3776AB" },
  "Django": { icon: SiDjango, color: "#2BA977" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "SQLite": { icon: SiSqlite, color: "#003B57" },
  "HTML5": { icon: SiHtml5, color: "#E34F26" },
  "CSS3": { icon: SiCss, color: "#1572B6" },
  "ExchangeRate API": { icon: Coins, color: "#FBBF24" },
  "REST API": { icon: Globe, color: "#38BDF8" },
};

/* ─── Project data ───────────────────────────────────── */
const projects = [
  {
    id: "P01",
    num: "01",
    chassis: "MERN // FULL-STACK",
    name: "Personal Expense Tracker",
    description:
      "Modern full-stack personal finance application built with the MERN stack. Features secure JWT authentication, real-time income and expense tracking, budget categorization, and interactive data visualization charts.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Chart.js", "JWT", "Tailwind CSS"],
    accent: "#E10600",
    codeUrl: "https://github.com/Viransh29/expense-tracker",
    liveUrl: "https://expense-tracker-xi-smoky.vercel.app/",
  },
  {
    id: "P02",
    num: "02",
    chassis: "PYTHON // CLOUD STORAGE",
    name: "Cloud Drive",
    description:
      "Secure cloud file management and sharing platform inspired by Google Drive. Allows users to upload, organize into folders, preview media, and safely share files with granular access permissions.",
    stack: ["Python", "Django", "JavaScript", "SQLite", "HTML5", "CSS3"],
    accent: "#3b82f6",
    codeUrl: "https://github.com/Viransh29/Cloud-Drive",
    liveUrl: "https://cloud-drive-p7gb.onrender.com",
  },
  {
    id: "P03",
    num: "03",
    chassis: "JAVASCRIPT // FOREX API",
    name: "Currency Converter",
    description:
      "Dynamic foreign exchange conversion platform delivering real-time currency rates. Features multi-currency calculations, live API rate synchronization, fast bidirectional swapping, and an intuitive responsive calculator.",
    stack: ["JavaScript", "ExchangeRate API", "REST API", "HTML5", "CSS3", "Tailwind CSS"],
    accent: "#f59e0b",
    codeUrl: "https://github.com/Viransh29/currency-converter",
    liveUrl: "https://currency-converter-iota-tawny.vercel.app/",
  },
];

/* ─── Project card ───────────────────────────────────── */
function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#08090e] overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
      style={{
        boxShadow: isHovered
          ? `0 16px 36px -12px ${project.accent}30`
          : "none",
        borderColor: isHovered ? `${project.accent}45` : "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Top Racing Accent Line */}
      <div
        className="h-1 w-full transition-all duration-300"
        style={{
          backgroundColor: project.accent,
          opacity: isHovered ? 1 : 0.75,
        }}
      />

      {/* Subtle Racing Number Watermark in Background */}
      <div className="absolute right-4 top-12 pointer-events-none select-none z-0">
        <span className="font-mono text-8xl font-black italic tracking-tighter text-white/[0.035] group-hover:text-white/[0.07] transition-colors duration-300">
          {project.num}
        </span>
      </div>

      {/* Card Content Container */}
      <div className="relative z-10 p-6 sm:p-7 flex flex-col flex-1 justify-between">
        <div>
          {/* Card Meta Header: Position & Chassis Code */}
          <div className="flex items-center justify-between mb-5 border-b border-white/6 pb-3">
            <span
              className="rounded px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest text-white shadow-xs"
              style={{ backgroundColor: project.accent }}
            >
              {project.id}
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/40">
              {project.chassis}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-white transition-colors">
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed mb-6 font-sans">
            {project.description}
          </p>

          {/* Tech Stack Pills with Icons */}
          <div className="mb-8">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Cpu size={12} style={{ color: project.accent }} />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/40">
                Technology Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => {
                const meta = TECH_META[tech];
                const Icon = meta?.icon;

                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md border border-white/10 bg-black/50 text-white/70 transition-all duration-200 group-hover:border-white/20 group-hover:text-white"
                  >
                    {Icon && (
                      <Icon
                        size={12}
                        style={{ color: meta.color }}
                        className="shrink-0"
                      />
                    )}
                    <span>{tech}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/6">
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200"
            style={{
              borderColor: isHovered ? project.accent : "rgba(255, 255, 255, 0.15)",
              color: isHovered ? "#fff" : "rgba(255, 255, 255, 0.8)",
              backgroundColor: isHovered ? `${project.accent}20` : "rgba(255, 255, 255, 0.02)",
            }}
          >
            <FaGithub size={14} style={{ color: project.accent }} />
            <span>View Code</span>
          </a>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/4 py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider text-white/70 hover:border-white/25 hover:bg-white/8 hover:text-white transition-all duration-200"
          >
            <ExternalLink size={13} className="text-white/50" />
            <span>Live</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Projects Section ───────────────────────────────── */
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden border-t border-white/8"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#E10600] to-transparent" />

      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Watermark in background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10rem] lg:text-[15rem] font-black text-white/1.5 select-none pointer-events-none uppercase tracking-widest leading-none font-mono">
        BUILDS
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* ── Section header ── */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#E10600] animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E10600]">
              Constructor Standings // Engineering Builds
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
                Projects
              </h2>
              <div className="mt-3.5 h-0.5 w-20 bg-[#E10600]" />
            </div>

            <p className="max-w-md text-xs uppercase tracking-[0.2em] text-white/50 leading-relaxed font-mono">
              Race-proven full-stack architectures built for reliability, scale, and performance.
            </p>
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* ── View all projects on GitHub ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="https://github.com/Viransh29"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3.5 rounded-xl border border-white/15 bg-[#08090e] px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.25em] text-white/80 transition-all duration-300 hover:border-[#E10600] hover:bg-[#E10600]/10 hover:text-white hover:shadow-[0_0_28px_rgba(225,6,0,0.25)]"
          >
            <FaGithub size={17} className="text-[#E10600]" />
            <span>Explore All Projects on GitHub</span>
            <ArrowRight
              size={15}
              className="text-[#E10600] transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </a>
        </motion.div>

      </div>
    </section>
  );
}