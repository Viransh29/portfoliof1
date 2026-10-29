import { useState } from "react";
import { motion } from "framer-motion";
import {
  Radio,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  Headphones,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";

/* ─── Contact Channel Frequencies ────────────────────── */
const CHANNELS = [
  {
    freq: "CH 01",
    label: "GitHub Paddock",
    handle: "@Viransh29",
    href: "https://github.com/Viransh29",
    icon: FaGithub,
    accent: "#FFFFFF",
    band: "Code Repositories",
    status: "CONNECTED",
  },
  {
    freq: "CH 02",
    label: "LinkedIn Network",
    handle: "linkedin.com/in/viranshthakore",
    href: "https://www.linkedin.com/in/viranshthakore/",
    icon: FaLinkedin,
    accent: "#38BDF8",
    band: "Professional Network",
    status: "STANDBY",
  },
  {
    freq: "CH 03",
    label: "Direct Email Link",
    handle: "viransh.work415@gmail.com",
    href: "mailto:viransh.work415@gmail.com",
    icon: Mail,
    accent: "#E10600",
    band: "Direct Priority",
    status: "ACTIVE",
  },
];

/* ─── F1 Tyre Compound Strategy Options ──────────────── */
const TYRE_COMPOUNDS = [
  {
    id: "soft",
    code: "S",
    compound: "Soft Compound",
    title: "Say Hello",
    color: "#E10600",
    placeholder: "SAY HELLO // ENTER YOUR MESSAGE OR TECH INQUIRY...",
  },
  {
    id: "medium",
    code: "M",
    compound: "Medium Compound",
    title: "Project",
    color: "#FFD449",
    placeholder: "PROJECT BUILD // SCOPE, DELIVERABLES, AND TIMELINE...",
  },
  {
    id: "hard",
    code: "H",
    compound: "Hard Compound",
    title: "Full-Time",
    color: "#FFFFFF",
    placeholder: "FULL-TIME // POSITION OVERVIEW AND REQUIREMENTS...",
  },
  {
    id: "inter",
    code: "I",
    compound: "Intermediate",
    title: "Internship",
    color: "#10B981",
    placeholder: "INTERNSHIP // ROLE DETAILS, TEAM DYNAMICS, AND TIMEFRAME...",
  },
];

/* ─── Radio Channel Card ─────────────────────────────── */
function ChannelCard({ channel, index }) {
  const Icon = channel.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={channel.href}
      target={channel.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      initial={{ opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center justify-between rounded-xl border border-white/10 bg-[#08090e] p-4 sm:p-5 transition-all duration-300 hover:border-white/20 hover:bg-[#0c0f16]"
      style={{
        boxShadow: isHovered ? `0 8px 24px -6px ${channel.accent}20` : "none",
        borderColor: isHovered ? `${channel.accent}40` : "rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Left colored frequency strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-300"
        style={{
          backgroundColor: channel.accent,
          width: isHovered ? "4px" : "3px",
        }}
      />

      <div className="flex items-center gap-4 pl-2">
        {/* Channel Icon Housing */}
        <div
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 transition-all duration-300 group-hover:scale-105"
          style={{
            backgroundColor: `${channel.accent}12`,
            borderColor: isHovered ? `${channel.accent}40` : "rgba(255, 255, 255, 0.1)",
          }}
        >
          <Icon size={20} style={{ color: channel.accent }} />
        </div>

        {/* Channel Information */}
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="font-mono text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: `${channel.accent}15`,
                color: channel.accent,
              }}
            >
              {channel.freq}
            </span>
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
              {channel.band}
            </span>
          </div>

          <h4 className="text-sm font-bold text-white group-hover:text-white transition-colors">
            {channel.label}
          </h4>
          <p className="font-mono text-xs text-white/50 group-hover:text-white/80 transition-colors">
            {channel.handle}
          </p>
        </div>
      </div>

      {/* Signal Bars & Status */}
      <div className="text-right shrink-0">
        <div className="flex items-center justify-end gap-1 mb-1">
          {[1, 2, 3, 4].map((bar) => (
            <span
              key={bar}
              className="h-3 w-1 rounded-xs transition-all duration-300"
              style={{
                backgroundColor: isHovered ? channel.accent : "rgba(255, 255, 255, 0.2)",
                opacity: bar <= 3 ? 1 : isHovered ? 1 : 0.4,
              }}
            />
          ))}
        </div>
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/40">
          {channel.status}
        </span>
      </div>
    </motion.a>
  );
}

/* ─── Contact Form with Tyre Compound Selector ───────── */
function ContactForm() {
  const [selectedCompound, setSelectedCompound] = useState(TYRE_COMPOUNDS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS keys are configured in .env
    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        "EmailJS credentials missing. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file."
      );
      // Simulate dispatch in development so UI flow is interactive
      setTimeout(() => {
        setLoading(false);
        setSent(true);
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setSent(false), 5000);
      }, 1000);
      return;
    }

    try {
      const templateParams = {
        from_name: name,
        reply_to: email,
        inquiry_strategy: `${selectedCompound.code} - ${selectedCompound.title} (${selectedCompound.compound})`,
        message: message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("EmailJS Transmission Error:", err);
      setErrorMsg("Transmission failed. Please check credentials or try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-[#090b10] px-4 py-3 font-mono text-xs uppercase tracking-wider text-white outline-none transition-all duration-200 focus:border-[#E10600] focus:bg-[#0c0f16] focus:ring-1 focus:ring-[#E10600] placeholder:font-mono placeholder:text-[11px] placeholder:uppercase placeholder:tracking-[0.14em] placeholder:text-white/35";

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl border border-white/10 bg-[#08090e] p-6 sm:p-7 overflow-hidden shadow-2xl"
    >
      {/* Top Header Racing Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#E10600] via-[#FF4438] to-[#E10600]" />

      {/* Form Header */}
      <div className="flex items-center justify-between border-b border-white/8 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#E10600]/15 text-[#E10600]">
            <Radio size={14} className="animate-pulse" />
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#E10600]">
              Pit Stop Terminal
            </p>
            <h4 className="text-sm font-black uppercase tracking-wider text-white">
              Radio Transmission
            </h4>
          </div>
        </div>

        {/* Updated Channel Link */}
        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>PIT-TO-CAR // CHANNEL 29</span>
        </div>
      </div>

      {/* ── F1 Tyre Compound Selector ── */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <label className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
            Select Strategy / Compound
          </label>
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">
            Inquiry Type
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {TYRE_COMPOUNDS.map((tyre) => {
            const isSelected = selectedCompound.id === tyre.id;

            return (
              <button
                key={tyre.id}
                type="button"
                onClick={() => setSelectedCompound(tyre)}
                className={`group flex flex-col items-center justify-center rounded-xl border p-3 sm:p-3.5 text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-white/35 bg-white/[0.07] shadow-lg"
                    : "border-white/10 bg-black/40 hover:border-white/20 hover:bg-white/3"
                }`}
                style={{
                  borderColor: isSelected ? tyre.color : undefined,
                  boxShadow: isSelected ? `0 0 18px -2px ${tyre.color}55` : "none",
                }}
              >
                {/* Bold F1 Pirelli Tyre Wheel */}
                <div
                  className="relative flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: "radial-linear(circle at 38% 32%, #2d323e 0%, #0d0f14 75%)",
                    border: "2px solid #050608",
                    boxShadow: isSelected
                      ? `0 0 0 2px ${tyre.color}, 0 0 16px ${tyre.color}90, inset 0 2px 4px rgba(255,255,255,0.25)`
                      : `0 0 0 1.5px rgba(255,255,255,0.18), inset 0 1px 3px rgba(0,0,0,0.85)`,
                  }}
                >
                  {/* Sidewall Colored Racing Band */}
                  <div
                    className="absolute inset-0.75 rounded-full border-[3px] transition-all duration-300"
                    style={{
                      borderColor: tyre.color,
                      boxShadow: isSelected ? `0 0 10px ${tyre.color}` : `0 0 4px ${tyre.color}40`,
                    }}
                  />

                  {/* Wheel Center Hub Disc */}
                  <div className="absolute inset-2 rounded-full bg-[#080a0e] border border-white/15" />

                  {/* High-Impact Bold F1 Racing Letter */}
                  <span
                    className="relative z-10 font-mono text-base sm:text-lg font-black italic tracking-tighter"
                    style={{
                      color: "#FFFFFF",
                      textShadow: `0 0 10px ${tyre.color}, 0 0 2px #000`,
                      WebkitTextStroke: "0.5px rgba(255,255,255,0.8)",
                    }}
                  >
                    {tyre.code}
                  </span>
                </div>

                {/* Text Labels Stacked (Full Width, No Truncation) */}
                <div className="w-full mt-2.5">
                  {/* General Purpose as Main Title */}
                  <span
                    className="block font-sans text-xs sm:text-[13px] font-black uppercase tracking-wider text-white leading-tight"
                  >
                    {tyre.title}
                  </span>
                  {/* Tyre Compound Name as Subtitle below */}
                  <span
                    className="block font-mono text-[9px] uppercase tracking-widest mt-1 font-bold"
                    style={{ color: isSelected ? tyre.color : "rgba(255, 255, 255, 0.45)" }}
                  >
                    {tyre.compound}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clean Input Fields with F1 Monospace Placeholders */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1.5">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="YOUR NAME"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR@EMAIL.COM"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1.5">
            Message
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={selectedCompound.placeholder}
            className={`${inputClass} resize-none leading-relaxed`}
          />
        </div>
      </div>

      {/* Error Notice */}
      {errorMsg && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-mono text-red-400">
          <AlertCircle size={14} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit Button with Pit Stop phrasing */}
      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        className={`mt-5 w-full py-3.5 font-mono text-xs font-black uppercase tracking-[0.25em] rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_24px_rgba(225,6,0,0.3)] hover:shadow-[0_0_32px_rgba(225,6,0,0.45)] ${
          loading
            ? "bg-[#9b0400] text-white/80 cursor-not-allowed"
            : "bg-[#E10600] hover:bg-[#c70500] text-white"
        }`}
      >
        {loading ? (
          <>
            <Loader2 size={15} className="animate-spin text-white" />
            <span>Transmitting to Pit Stop...</span>
          </>
        ) : sent ? (
          <>
            <CheckCircle2 size={15} className="text-white" />
            <span>✓ Received at Pit Stop // Loud & Clear!</span>
          </>
        ) : (
          <>
            <Send size={14} className="text-white" />
            <span>Send to Pit Stop</span>
          </>
        )}
      </motion.button>
    </motion.form>
  );
}

/* ─── Contact Section (Pit Stop) ─────────────────────── */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 bg-[#050505] overflow-hidden border-t border-white/8"
    >
      {/* Top Red Racing Strip */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#E10600] to-transparent" />

      {/* Subtle carbon grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-linear(#fff 1px, transparent 1px), linear-linear(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient Red Glow */}
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#E10600]/5 blur-3xl pointer-events-none" />

      {/* Large Watermark in background */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[9rem] lg:text-[14rem] font-black text-white/1.5 select-none pointer-events-none uppercase tracking-widest leading-none font-mono">
        PIT&nbsp;STOP
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
              Paddock Comms // Open Channel
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
                Pit Stop
              </h2>
              <div className="mt-3.5 h-0.5 w-20 bg-[#E10600]" />
            </div>

            <p className="max-w-md text-xs uppercase tracking-[0.2em] text-white/50 leading-relaxed font-mono">
              Direct telemetry link for software engineering roles, full-stack builds, and collaborative discussions.
            </p>
          </div>
        </motion.div>

        {/* ── Two-Column Pit Wall Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ── Left Column: Frequency Channels (5 cols) ── */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/8 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Headphones size={15} className="text-[#E10600]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
                  Active Radio Channels
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
            </div>

            {/* Channels List */}
            <div className="space-y-3">
              {CHANNELS.map((ch, i) => (
                <ChannelCard key={ch.label} channel={ch} index={i} />
              ))}
            </div>

            {/* Team Radio Availability Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-6 flex items-center justify-between rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Radio size={16} className="animate-pulse" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                    Radio Check: Loud & Clear
                  </p>
                  <p className="text-xs font-semibold text-white/90">
                    Open to Internships & Full-Time Roles
                  </p>
                </div>
              </div>

              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            </motion.div>
          </div>

          {/* ── Right Column: Telemetry Terminal (7 cols) ── */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

      </div>
    </section>
  );
}
