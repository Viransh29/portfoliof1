import { motion } from "framer-motion";
import {
  Code2,
  GraduationCap,
  Terminal,
  Radio,
  Cpu,
  Layers,
} from "lucide-react";

/* ─── Animation Presets ───────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

/* ─── Minimal Telemetry Pill ─────────────────────────── */
function TelemetryItem({ label, value, detail, icon: Icon, accent = "#E10600" }) {
  return (
    <div className="group rounded-xl border border-white/10 bg-[#090b10] p-3.5 transition-all duration-300 hover:border-white/20 hover:bg-[#0c0f16]">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/40">
          {label}
        </span>
        <div
          className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10"
          style={{ backgroundColor: `${accent}15` }}
        >
          <Icon size={13} style={{ color: accent }} />
        </div>
      </div>
      <p className="text-sm font-black uppercase tracking-wide text-white">
        {value}
      </p>
      <p className="mt-0.5 font-mono text-[10px] text-white/50 truncate">
        {detail}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden border-t border-white/8"
    >
      {/* Top Red Racing Strip */}
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* ── Section Header ── */}
        <motion.div
          className="mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#E10600] animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E10600]">
            Driver Profile 
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
                About Me
              </h2>
              <div className="mt-3.5 h-0.5 w-20 bg-[#E10600]" />
            </div>

            <p className="max-w-md text-xs uppercase tracking-[0.2em] text-white/50 leading-relaxed font-mono">
              Driver brief, education pathway, and technical telemetry profile.
            </p>
          </div>
        </motion.div>

        {/* ── Main Two-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ── Left Column: Bio & Education (7 cols) ── */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Driver Dossier Card */}
            <motion.div
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-[#08090e] p-7 lg:p-8 overflow-hidden"
            >
              {/* Corner Chamfer Accent */}
              <div className="absolute left-0 top-0 h-1 w-20 bg-[#E10600]" />
              
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">
                  Driver Briefing
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white leading-tight">
                Engineering fast, responsive software with the precision of motorsport.
              </h3>

              <div className="mt-5 space-y-4 text-sm sm:text-base text-white/70 leading-relaxed font-sans">
                <p>
                  I&apos;m <strong className="text-white font-bold">Viransh</strong>, a full-stack developer dedicated to building reliable web applications and clean digital experiences. Approaching software with a performance-first mindset, I focus on responsive interfaces, scalable APIs, and clean codebases.
                </p>
                <p className="text-white/60">
                  My core stack includes the modern JavaScript ecosystem (MongoDB, Express, React, Node.js) along with Python and cloud services. From crafting component architectures to designing RESTful backends, I enjoy taking projects from idea to deployment.
                </p>
              </div>              
            </motion.div>

            {/* Education Card */}
            <motion.div
              variants={fadeUp}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-[#08090e] p-6 sm:p-7 overflow-hidden group hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between border-b border-white/8 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#E10600]/10 text-[#E10600]">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#E10600]">
                      Academics
                    </p>
                    <h4 className="text-base font-bold uppercase tracking-wide text-white">
                      Education & Foundations
                    </h4>
                  </div>
                </div>

                <span className="font-mono text-xs font-black text-white/30 uppercase tracking-widest">
                  Class of 2027
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-black uppercase tracking-wide text-white">
                    B.Tech in Computer Science & Engineering
                  </p>
                  <p className="mt-1 font-mono text-xs font-semibold text-white/60">
                    Uka Tarsadia University · Computer Science & Engineering
                  </p>
                  <p className="mt-2 text-xs text-white/45 max-w-md leading-relaxed">
                    Coursework focused on Data Structures, Algorithms, Database Management Systems, Networks, and Software Engineering.
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    IN PROGRESS
                  </div>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/30">
                    UNDERGRADUATE
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ── Right Column: F1 Driver Superlicence (5 cols) ── */}
          <motion.div
            variants={fadeUp}
            custom={0.25}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group lg:col-span-5 relative rounded-2xl border border-white/10 bg-[#08090e] overflow-hidden"
          >
            {/* Subtle 29 Watermark in Card Body Corner */}
            <div className="absolute -right-3 -bottom-6 pointer-events-none select-none opacity-[0.035] group-hover:opacity-[0.06] transition-opacity duration-300">
              <span className="font-black italic text-[9rem] tracking-tighter text-white font-mono">
                29
              </span>
            </div>

            {/* ── Card Racing Header ── */}
            <div className="relative bg-[#E10600] px-6 py-5 flex items-center justify-between overflow-hidden">
              {/* Slanted Racing Number 29 in Header */}
              <div className="absolute right-3 -bottom-5 text-8xl font-black italic tracking-tighter text-black/20 select-none pointer-events-none font-mono">
                29
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/85 font-bold block">
                  Profile Card
                </span>
                <h3 className="text-2xl font-black uppercase tracking-widest text-white mt-0.5">
                  Viransh
                </h3>
              </div>

              <div className="text-right z-10">
                <span className="inline-block rounded-md bg-black/25 backdrop-blur-xs px-2.5 py-1 font-mono text-sm font-black tracking-widest text-white border border-white/10">
                  VIR · 29
                </span>
              </div>
            </div>

            {/* ── Superlicence Body ── */}
            <div className="relative z-10 p-5 sm:p-6 space-y-5">
              
              {/* Telemetry 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <TelemetryItem
                  label="Role"
                  value="Full-Stack Developer"
                  detail="Web Applications"
                  icon={Code2}
                  accent="#61DAFB"
                />
                <TelemetryItem
                  label="Power Unit"
                  value="MERN Stack"
                  detail="Modern Runtimes"
                  icon={Cpu}
                  accent="#5FA04E"
                />
                <TelemetryItem
                  label="Chassis"
                  value="REST API"
                  detail="Scalable Services"
                  icon={Layers}
                  accent="#FFD449"
                />
                <TelemetryItem
                  label="Telemetry & Race Control"
                  value="Git & Github"
                  detail="Version Control & Deployment"
                  icon={Terminal}
                  accent="#F05032"
                />
              </div>

              {/* ── Creative & Minimal Performance Attributes (Sector Telemetry Splits) ── */}
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/8 pb-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                    Performance Attributes
                  </span>
                  <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                    Telemetry Splits
                  </span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {/* Sector 1: Red */}
                  <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E10600]" />
                      <span className="text-white/50 text-[11px] uppercase tracking-wider">
                        Frontend 
                      </span>
                    </div>
                    <span className="font-bold text-white text-[11px]">
                      React · Tailwind · Components
                    </span>
                  </div>

                  {/* Sector 2: Blue */}
                  <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#54C6EB]" />
                      <span className="text-white/50 text-[11px] uppercase tracking-wider">
                      Server Engine
                      </span>
                    </div>
                    <span className="font-bold text-white text-[11px]">
                      Node · Express · Python APIs
                    </span>
                  </div>

                  {/* Sector 3: Yellow */}
                  <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FFD449]" />
                      <span className="text-white/50 text-[11px] uppercase tracking-wider">
                      Data Store
                      </span>
                    </div>
                    <span className="font-bold text-white text-[11px]">
                      MongoDB · SQLite · MySQL · Git Version Control
                    </span>
                  </div>

                  {/* Race Strategy */}
                  <div className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-white/50 text-[11px] uppercase tracking-wider">
                        Pace & Quality
                      </span>
                    </div>
                    <span className="font-bold text-emerald-400 text-[11px]">
                      Modular · Performance-First
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Open Channel */}
              <div className="rounded-xl border border-white/10 bg-black/40 p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                    <Radio size={14} className="animate-pulse" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                      Radio Check: Active
                    </p>
                    <p className="text-xs text-white/70">
                      Open to Opportunities & Internships
                    </p>
                  </div>
                </div>

                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
