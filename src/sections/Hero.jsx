function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[70px_70px] pointer-events-none" />

      {/* Red glow */}
      <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="max-w-4xl">

          {/* Live status badge */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
              Available for opportunities
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
            Build.
            <br />
            <span className="text-white/30">TEST.</span>
            <br />
            <span className="text-red-500">Accelerate.</span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
            I&apos;m Viransh — a Computer Science student and aspiring
            Full Stack Web Developer building modern web applications
            with React, Node.js, MongoDB and more.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-red-600 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-500 hover:shadow-[0_0_24px_rgba(225,6,0,0.5)] active:scale-95"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/20 bg-white/3 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:border-white/50 hover:bg-white/8 hover:text-white active:scale-95"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex pointer-events-none opacity-60">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/30">
          Scroll to race
        </span>
        <div className="h-10 w-px bg-linear-to-b from-red-500 to-transparent" />
      </div>
    </section>
  );
}

export default Hero;
