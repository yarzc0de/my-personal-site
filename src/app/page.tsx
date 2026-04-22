"use client";

import { site, links, projects, now } from "@/lib/data";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";

/* ─── Custom Cursor ─── */
function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    setMounted(true);

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role=button]")) setHovering(true);
    };
    const out = () => setHovering(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-3 w-3 rounded-full"
        style={{ backgroundColor: hovering ? "var(--color-rust)" : "var(--color-text-primary)" }}
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0 }}
      />
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-10 w-10 rounded-full border-2"
        style={{ borderColor: hovering ? "var(--color-rust)" : "var(--color-text-muted)" }}
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: hovering ? 1.5 : 1,
          opacity: hovering ? 0.8 : 0.4,
        }}
        transition={{ duration: 0 }}
      />
    </>
  );
}

/* ─── Easter Egg: type "hello" ─── */
function EasterEgg() {
  const [triggered, setTriggered] = useState(false);
  const [message, setMessage] = useState("");
  const buffer = useRef("");

  const messages = [
    "hey there! 👋",
    "you found me! 🎉",
    "nice keyboard skills 🤓",
    "welcome to the playground ✨",
    "you're curious, i like that 🔍",
  ];

  const handleKey = useCallback((e: KeyboardEvent) => {
    buffer.current += e.key.toLowerCase();
    if (buffer.current.length > 10) buffer.current = buffer.current.slice(-10);
    if (buffer.current.includes("hello")) {
      buffer.current = "";
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setTriggered(true);
      document.body.classList.add("easter-flash");
      setTimeout(() => {
        setTriggered(false);
        document.body.classList.remove("easter-flash");
      }, 3000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!triggered) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-8 left-1/2 z-[10001] -translate-x-1/2 rounded-full border-2 border-rust bg-bg-elevated px-6 py-3 font-display text-sm font-bold text-rust shadow-lg sm:text-base"
    >
      {message}
    </motion.div>
  );
}

/* ─── Now Section ─── */
function Now() {
  return (
    <section className="border-y-2 border-border px-5 py-10 sm:px-8 sm:py-14 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <span className="mb-6 block font-display text-[0.65rem] font-bold uppercase tracking-[0.3em] text-text-muted">
            Right Now
          </span>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {now.map((item) => (
              <span
                key={item.text}
                className="inline-flex items-center gap-2 rounded-full border-2 border-border px-4 py-2 font-display text-xs font-bold tracking-wide text-text-secondary transition-colors hover:border-rust hover:text-rust sm:text-sm"
              >
                <span>{item.emoji}</span>
                {item.text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Color assignments for project cards ─── */
const cardColors = [
  {
    bg: "var(--color-rust-light)",
    accent: "var(--color-rust)",
    tag: "bg-rust/10 text-rust",
  },
  {
    bg: "var(--color-sage-light)",
    accent: "var(--color-sage)",
    tag: "bg-sage/10 text-sage",
  },
  {
    bg: "var(--color-slate-light)",
    accent: "var(--color-slate)",
    tag: "bg-slate/10 text-slate",
  },
  {
    bg: "var(--color-ochre-light)",
    accent: "var(--color-ochre)",
    tag: "bg-ochre/10 text-ochre",
  },
];

const cardRotations = ["-2deg", "1.5deg", "-1deg", "2.5deg"];

/* ─── Arrow SVG ─── */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 13L13 1M13 1H3M13 1V11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Project Card ─── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef(null);
  const color = cardColors[index % cardColors.length];
  const rotation = cardRotations[index % cardRotations.length];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 1, 0.5, 1],
      }}
      className="group relative"
    >
      <div
        className="relative overflow-hidden rounded-sm p-6 sm:p-8 transition-transform duration-500"
        style={{
          backgroundColor: color.bg,
          transform: `rotate(${rotation})`,
        }}
      >
        {/* Number stamp */}
        <span
          className="absolute top-3 right-4 font-display text-[5rem] font-bold leading-none opacity-[0.07] select-none"
          style={{ color: color.accent }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="relative">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl">
              {project.title}
            </h3>
            <div className="flex shrink-0 gap-2">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 font-display text-xs font-bold uppercase tracking-wider transition-colors duration-300"
                  style={{
                    backgroundColor: color.accent,
                    color: color.bg,
                  }}
                  aria-label={`Visit ${project.title}`}
                >
                  Visit <ArrowIcon className="h-3 w-3" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border-2 px-3 py-1 font-display text-xs font-bold uppercase tracking-wider transition-colors duration-300"
                  style={{
                    borderColor: color.accent,
                    color: color.accent,
                  }}
                  aria-label={`${project.title} on GitHub`}
                >
                  Code
                </a>
              )}
            </div>
          </div>

          <p className="mb-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={`rounded-full px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-widest ${color.tag}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Marquee Strip ─── */
function MarqueeStrip() {
  const words = [
    "DIGITAL PLAYGROUND",
    "✦",
    "FULLSTACK",
    "✦",
    "TANGERANG",
    "✦",
    "EXPERIMENTS",
    "✦",
    "MAKE THINGS",
    "✦",
    "BREAK THINGS",
    "✦",
    "DIGITAL PLAYGROUND",
    "✦",
    "FULLSTACK",
    "✦",
    "TANGERANG",
    "✦",
    "EXPERIMENTS",
    "✦",
    "MAKE THINGS",
    "✦",
    "BREAK THINGS",
    "✦",
  ];

  return (
    <div className="overflow-hidden border-y-2 border-border py-3 sm:py-4">
      <div className="animate-marquee flex whitespace-nowrap">
        {words.map((word, i) => (
          <span
            key={i}
            className="mx-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-text-muted sm:mx-5 sm:text-sm"
          >
            {word}
          </span>
        ))}
        {words.map((word, i) => (
          <span
            key={`dup-${i}`}
            className="mx-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-text-muted sm:mx-5 sm:text-sm"
            aria-hidden
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Landing Section ─── */
function Landing() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="landing"
      id="landing"
      className="relative min-h-[100svh] overflow-hidden px-5 pb-12 pt-16 sm:px-8 sm:pt-24 lg:px-16"
    >
      {/* Decorative shapes */}
      <div
        className="pointer-events-none absolute top-12 right-8 h-32 w-32 rounded-full sm:h-48 sm:w-48 lg:right-24 lg:top-20 lg:h-64 lg:w-64"
        style={{ backgroundColor: "var(--color-rust-light)" }}
      />
      <div
        className="pointer-events-none absolute bottom-24 left-4 h-20 w-20 sm:h-28 sm:w-28 lg:left-16 lg:h-40 lg:w-40"
        style={{ backgroundColor: "var(--color-sage-light)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/3 h-16 w-16 rotate-45 sm:h-24 sm:w-24"
        style={{ backgroundColor: "var(--color-ochre-light)" }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-5xl"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mb-8 sm:mb-12"
        >
          <span className="inline-block rounded-full border-2 border-border px-4 py-1.5 font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] text-text-muted">
            {site.location} — {site.role}
          </span>
        </motion.div>

        {/* Name — oversized, staggered */}
        <div className="mt-12 mb-6 sm:mt-20 sm:mb-10">
          {site.name.split(" ").map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15 + i * 0.15,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="overflow-hidden"
            >
              <h1
                className="font-hero font-bold leading-[1.1] tracking-tighter"
                style={{
                  fontSize: "clamp(4rem, 15vw, 12rem)",
                }}
              >
                {word}
              </h1>
            </motion.div>
          ))}
        </div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.55,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="max-w-lg"
        >
          <p
            className="text-xl leading-relaxed text-text-secondary italic sm:text-2xl lg:text-3xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            &ldquo;{site.bio}&rdquo;
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 sm:mt-24"
        >
          <span className="font-display text-[0.6rem] font-bold uppercase tracking-[0.3em] text-text-muted">
            Scroll to explore ↓
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Works Section ─── */
function Works() {

  return (
    <section id="works" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-16">
      {/* Section header */}
      <div className="mx-auto mb-12 max-w-5xl sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}>
          <span className="mb-3 block font-display text-[0.65rem] font-bold uppercase tracking-[0.3em] text-text-muted">
            Selected Works
          </span>
          <h2
            className="font-display font-bold leading-[0.9] tracking-tighter"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Things I&apos;ve
            <br />
            <span style={{ color: "var(--color-sage)" }}>built</span>
          </h2>
        </motion.div>
      </div>

      {/* Project grid — asymmetric 2-col on desktop */}
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:gap-12">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={i % 2 === 1 ? "md:mt-16" : ""}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Links Section ─── */
function Links() {

  return (
    <section
      id="links"
      className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mb-10 sm:mb-14"
        >
          <span className="mb-3 block font-display text-[0.65rem] font-bold uppercase tracking-[0.3em] text-text-muted">
            Find Me
          </span>
          <h2
            className="font-display font-bold leading-[0.9] tracking-tighter"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Say <span style={{ color: "var(--color-slate)" }}>hello</span>
          </h2>
        </motion.div>

        {/* Links as a stacked list */}
        <div className="space-y-0 border-t-2 border-border">
          {links.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b-2 border-border py-5 transition-colors duration-300 hover:bg-bg-surface sm:py-6"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-xs font-bold text-text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
                    {link.label}
                  </span>
                </div>
                <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon className="h-4 w-4 text-text-muted transition-colors duration-300 group-hover:text-rust sm:h-5 sm:w-5" />
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t-2 border-border px-5 py-8 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
          &copy; 2025 {site.name}
        </p>
        <p className="text-sm text-text-muted italic">
          Handcrafted in {site.location}
        </p>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <CustomCursor />
      <EasterEgg />
      <main>
        <Landing />
        <MarqueeStrip />
        <Now />
        <Works />
        <Links />
      </main>
      <Footer />
    </>
  );
}
