"use client";

import { site, links, projects, now } from "@/lib/data";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Now", href: "#now" },
  { label: "Skills", href: "#skills" },
  { label: "Works", href: "#works" },
  { label: "Links", href: "#links" },
];

const SKILLS = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma",
  "FastAPI", "Python", "Go", "SQLite", "PostgreSQL",
  "Playwright", "WebSocket", "Node.js",
];

const ACCENT_LIGHT_COLORS = [
  "var(--color-terracotta-light)",
  "var(--color-sage-light)",
  "var(--color-rose-light)",
  "var(--color-gold-light)",
];

const TILT_CLASSES = [
  "scrapbook-tilt-1",
  "scrapbook-tilt-2",
  "scrapbook-tilt-3",
  "scrapbook-tilt-4",
];

const MARQUEE_WORDS = [
  "DIGITAL PLAYGROUND",
  "FULLSTACK",
  "EXPERIMENTS",
  "MAKE THINGS",
  "BREAK THINGS",
];

const EASTER_MESSAGES = [
  "HELLO THERE, FRIEND",
  "YOU FOUND THE SECRET",
  "NICE KEYBOARD SKILLS",
  "WELCOME TO THE STUDIO",
  "HANDCRAFTED WITH LOVE",
];

function YarzLogo({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Yarz logo"
      role="img"
    >
      <path
        d="M32 3L57.7 17.5V46.5L32 61L6.3 46.5V17.5L32 3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="bevel"
        opacity="0.35"
      />
      <line
        x1="15" y1="16"
        x2="32" y2="32"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="square"
      />
      <line
        x1="49" y1="16"
        x2="32" y2="32"
        stroke="var(--color-terracotta)"
        strokeWidth="2.4"
        strokeLinecap="square"
      />
      <line
        x1="32" y1="32"
        x2="32" y2="52"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="square"
      />
      <rect
        x="29.5" y="29.5"
        width="5" height="5"
        transform="rotate(45 32 32)"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

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
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: hovering ? "var(--color-terracotta)" : "var(--color-text-primary)" }}
        animate={{ x: pos.x - 5, y: pos.y - 5, scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-10 w-10 rounded-full border"
        style={{ borderColor: hovering ? "var(--color-terracotta)" : "var(--color-border)" }}
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: hovering ? 1.5 : 1,
          opacity: hovering ? 0.9 : 0.4,
        }}
        transition={{ duration: 0 }}
      />
    </>
  );
}

function EasterEgg() {
  const [triggered, setTriggered] = useState(false);
  const [message, setMessage] = useState("");
  const buffer = useRef("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleKey = useCallback((e: KeyboardEvent) => {
    buffer.current += e.key.toLowerCase();
    if (buffer.current.length > 10) buffer.current = buffer.current.slice(-10);
    if (buffer.current.includes("hello")) {
      buffer.current = "";
      setMessage(EASTER_MESSAGES[Math.floor(Math.random() * EASTER_MESSAGES.length)]);
      setTriggered(true);
      wrapperRef.current?.classList.add("easter-flash");
      setTimeout(() => {
        setTriggered(false);
        wrapperRef.current?.classList.remove("easter-flash");
      }, 3000);
    }
  }, []);

  useEffect(() => {
    wrapperRef.current = document.querySelector("[data-page-wrapper]");
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
      className="fixed bottom-8 left-1/2 z-[10001] -translate-x-1/2 rounded-sm px-6 py-3 font-display text-sm font-bold shadow-lg sketch-border sm:text-base"
      style={{
        backgroundColor: "var(--color-bg-elevated)",
        color: "var(--color-terracotta)",
      }}
    >
      {message}
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}

const TYPED_QUOTES = [
  site.bio,
  "Code is poetry, bugs are typos.",
  "Building things that make me smile.",
  "Fueled by coffee and curiosity.",
];

function TypedBio() {
  const [displayText, setDisplayText] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentQuote = TYPED_QUOTES[quoteIndex];

    if (!isDeleting && displayText === currentQuote) {
      const pause = setTimeout(() => setIsDeleting(true), 3000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setQuoteIndex((prev) => (prev + 1) % TYPED_QUOTES.length);
      return;
    }

    const speed = isDeleting ? 25 : 45;
    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentQuote.slice(0, displayText.length - 1)
          : currentQuote.slice(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, quoteIndex, mounted]);

  if (!mounted) {
    return (
      <span>
        &ldquo;{site.bio}&rdquo;
      </span>
    );
  }

  return (
    <span>
      &ldquo;{displayText}&rdquo;
      <span className="typed-cursor">|</span>
    </span>
  );
}

function SectionDivider({ color = "var(--color-border)" }: { color?: string }) {
  return (
    <div className="section-divider" aria-hidden="true">
      <div className="section-divider__line" style={{ borderColor: color }} />
      <div className="section-divider__ornament" style={{ backgroundColor: color }} />
      <div className="section-divider__line" style={{ borderColor: color }} />
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className="back-to-top"
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-label="Back to top"
    >
      ↑
    </motion.button>
  );
}

function OrganicNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => {
      const id = item.href.slice(1);
      return { id, el: document.getElementById(id) };
    }).filter((s) => s.el);

    const handleScroll = () => {
      const y = window.scrollY;
      const offset = window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.offsetTop - offset <= y) {
          setActive(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="organic-nav">
      <div className="organic-nav__inner">
        <a href="#home" className="organic-nav__logo" aria-label="Home">
          <YarzLogo size={28} />
        </a>
        <div className="organic-nav__links">
          {NAV_ITEMS.map((item) => {
            const id = item.href.slice(1);
            return (
              <a
                key={id}
                href={item.href}
                className={`organic-nav__link ${active === id ? "organic-nav__link--active" : ""}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 80]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const blobY1 = useTransform(scrollY, [0, 800], [0, -60]);
  const blobY2 = useTransform(scrollY, [0, 800], [0, -30]);
  const blobY3 = useTransform(scrollY, [0, 800], [0, -45]);
  const words = site.name.split("");

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 sm:px-8 lg:px-16"
    >
      <motion.div
        className="pointer-events-none absolute rounded-full sm:h-48 sm:w-48 lg:h-64 lg:w-64 h-32 w-32"
        style={{ backgroundColor: "var(--color-terracotta-light)", top: "12%", right: "5%", y: blobY1 }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute rounded-full sm:h-28 sm:w-28 h-20 w-20"
        style={{ backgroundColor: "var(--color-sage-light)", bottom: "18%", left: "4%", y: blobY2 }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute rotate-45 sm:h-24 sm:w-24 h-16 w-16"
        style={{ backgroundColor: "var(--color-gold-light)", top: "50%", left: "33%", y: blobY3 }}
        aria-hidden="true"
      />

      <motion.div style={{ y, opacity }} className="relative z-[2] mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mb-8 sm:mb-12"
        >
          <span
            className="inline-block rounded-full px-4 py-1.5 font-display text-[0.65rem] font-bold uppercase tracking-[0.25em] sketch-border"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {site.role}
          </span>
        </motion.div>

        <div className="flex flex-wrap">
          {words.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block font-bold leading-[0.9] tracking-tighter"
              style={{
                fontFamily: "var(--font-hero)",
                fontSize: "clamp(4rem, 15vw, 12rem)",
                color: "var(--color-text-primary)",
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="mt-8 max-w-lg"
        >
          <p
            className="text-xl leading-relaxed italic sm:text-2xl lg:text-3xl"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            <TypedBio />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 sm:mt-24"
        >
          <span
            className="font-display text-[0.6rem] font-bold uppercase tracking-[0.3em]"
            style={{ color: "var(--color-text-muted)" }}
          >
            Scroll to explore &darr;
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MarqueeStrip() {
  const content = MARQUEE_WORDS.map((word, i) => (
    <span key={i} className="flex items-center">
      <span className="marquee-strip__word">{word}</span>
      <span className="marquee-strip__diamond">✦</span>
    </span>
  ));

  return (
    <div className="marquee-strip">
      <div className="marquee-strip__inner animate-marquee">
        {content}
        {content}
      </div>
    </div>
  );
}

function NowSection() {
  return (
    <section id="now" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mb-10 sm:mb-14"
        >
          <span
            className="mb-2 block font-display text-[0.6rem] font-bold uppercase tracking-[0.3em]"
            style={{ color: "var(--color-text-muted)" }}
          >
            what I&apos;m up to
          </span>
          <h2
            className="font-bold leading-[0.9] tracking-tighter"
            style={{
              fontFamily: "var(--font-hero)",
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            Right Now
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-4">
          {now.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`sketch-border rounded-full px-5 py-2.5 transition-colors duration-300 hover:border-[var(--color-terracotta)] ${TILT_CLASSES[i % TILT_CLASSES.length]}`}
            >
              <span className="mr-2 text-lg">{item.emoji}</span>
              <span
                className="font-display text-sm font-bold tracking-wide"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span
            className="mb-2 block font-display text-[0.6rem] font-bold uppercase tracking-[0.3em]"
            style={{ color: "var(--color-text-muted)" }}
          >
            toolkit
          </span>
          <h2
            className="font-bold leading-[0.9] tracking-tighter"
            style={{
              fontFamily: "var(--font-hero)",
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            Tech Arsenal
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {SKILLS.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 30, scale: 0.7, rotate: (i % 2 === 0 ? -8 : 8) }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: (i % 2 === 0 ? -1 : 1) * (1 + (i % 3)) }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="sticky-note rounded-sm font-display text-[0.7rem] font-bold tracking-wide"
              style={{
                backgroundColor: ACCENT_LIGHT_COLORS[i % ACCENT_LIGHT_COLORS.length],
                color: "var(--color-text-primary)",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxTilt = 6;
    const x = ((e.clientY - centerY) / (rect.height / 2)) * -maxTilt;
    const y = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt;
    setTilt({ x, y });
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        perspective: "800px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="tilt-card__inner"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovering ? "transform 0.1s ease-out" : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {children}
        <div
          className="pointer-events-none absolute inset-0 rounded-[4px] opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, oklch(0.55 0.18 35 / 0.12), transparent 60%)`,
            opacity: isHovering ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}

function WorksSection() {
  const accentBgs = [
    "var(--color-terracotta-light)",
    "var(--color-sage-light)",
    "var(--color-rose-light)",
    "var(--color-gold-light)",
  ];

  return (
    <section id="works" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span
            className="mb-2 block font-display text-[0.6rem] font-bold uppercase tracking-[0.3em]"
            style={{ color: "var(--color-text-muted)" }}
          >
            portfolio
          </span>
          <h2
            className="font-bold leading-[0.9] tracking-tighter"
            style={{
              fontFamily: "var(--font-hero)",
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            Things I&apos;ve{" "}
            <span style={{ color: "var(--color-terracotta)" }}>built</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
            <TiltCard>
            <article
              className={`project-card tape-decoration ${TILT_CLASSES[i % TILT_CLASSES.length]}`}
              style={{ backgroundColor: accentBgs[i % accentBgs.length] }}
            >
              <span className="project-card__number">{String(i + 1).padStart(2, "0")}</span>

              <div className="relative z-[1]">
                <h3
                  className="mb-3 text-lg font-bold tracking-tight sm:text-xl"
                  style={{
                    fontFamily: "var(--font-hero)",
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  className="mb-5 text-sm leading-relaxed sm:text-base"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {project.description}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm px-2 py-0.5 font-display text-[0.6rem] font-bold tracking-wide"
                      style={{
                        backgroundColor: "oklch(0.22 0.03 50 / 0.08)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-sm px-4 py-1.5 font-display text-[0.6rem] font-bold uppercase tracking-wider transition-opacity duration-300 hover:opacity-80"
                      style={{
                        backgroundColor: "var(--color-terracotta)",
                        color: "var(--color-bg-elevated)",
                      }}
                      aria-label={`Visit ${project.title}`}
                    >
                      Visit
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-sm px-4 py-1.5 font-display text-[0.6rem] font-bold uppercase tracking-wider transition-all duration-300 sketch-border"
                      style={{ color: "var(--color-text-secondary)" }}
                      aria-label={`${project.title} source code`}
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </article>
            </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const LINK_CARDS = [
  { icon: GitHubIcon, bg: "var(--color-sage-light)", accent: "var(--color-sage)", tilt: "scrapbook-tilt-2" },
  { icon: XIcon, bg: "var(--color-rose-light)", accent: "var(--color-rose)", tilt: "scrapbook-tilt-3" },
  { icon: MailIcon, bg: "var(--color-gold-light)", accent: "var(--color-gold)", tilt: "scrapbook-tilt-1" },
];

function LinksSection() {
  return (
    <section id="links" className="relative px-5 py-16 sm:px-8 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span
            className="mb-2 block font-display text-[0.6rem] font-bold uppercase tracking-[0.3em]"
            style={{ color: "var(--color-text-muted)" }}
          >
            connect
          </span>
          <h2
            className="font-bold leading-[0.9] tracking-tighter"
            style={{
              fontFamily: "var(--font-hero)",
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            Say{" "}
            <span style={{ color: "var(--color-sage)" }}>hello</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
          {links.map((link, i) => {
            const card = LINK_CARDS[i % LINK_CARDS.length];
            return (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`link-card tape-decoration group ${card.tilt}`}
                style={{ backgroundColor: card.bg }}
              >
                <card.icon className="link-card__icon" />
                <span
                  className="link-card__label"
                  style={{ fontFamily: "var(--font-hero)" }}
                >
                  {link.label}
                </span>
                <span className="link-card__arrow" style={{ color: card.accent }}>
                  →
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const iconMap = [GitHubIcon, XIcon, MailIcon];
  const accentColors = [
    { bg: "var(--color-sage-light)", border: "var(--color-sage)", hover: "var(--color-sage)" },
    { bg: "var(--color-rose-light)", border: "var(--color-rose)", hover: "var(--color-rose)" },
    { bg: "var(--color-gold-light)", border: "var(--color-gold)", hover: "var(--color-gold)" },
  ];

  return (
    <footer className="organic-footer relative z-[2]">
      <div className="organic-footer__torn-edge" aria-hidden="true" />

      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24 lg:px-16">
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-6 flex items-center gap-3"
            aria-hidden="true"
          >
            <span
              className="block h-px w-10 sm:w-16"
              style={{ background: "var(--color-border)", opacity: 0.5 }}
            />
            <span
              className="block h-2 w-2 rotate-45"
              style={{ background: "var(--color-terracotta)", opacity: 0.5 }}
            />
            <span
              className="block h-px w-10 sm:w-16"
              style={{ background: "var(--color-border)", opacity: 0.5 }}
            />
          </div>

          <YarzLogo
            className="organic-footer__logo"
            size={56}
          />

          <span
            className="mt-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              color: "var(--color-text-secondary)",
              fontStyle: "italic",
            }}
          >
            {site.role}
          </span>
        </div>

        <div
          className="mx-auto my-8 sm:my-10 flex items-center gap-4"
          style={{ maxWidth: "20rem" }}
          aria-hidden="true"
        >
          <span className="block h-0 flex-1" style={{ borderTop: "1.5px dashed var(--color-border)", opacity: 0.4 }} />
          <span className="block h-1.5 w-1.5 rotate-45" style={{ background: "var(--color-gold)", opacity: 0.45 }} />
          <span className="block h-0 flex-1" style={{ borderTop: "1.5px dashed var(--color-border)", opacity: 0.4 }} />
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-5">
          {links.map((link, i) => {
            const Icon = iconMap[i];
            const colors = accentColors[i];
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="organic-footer__social-link"
                style={{
                  "--social-bg": colors.bg,
                  "--social-border": colors.border,
                  "--social-hover": colors.hover,
                } as React.CSSProperties}
              >
                <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
              </a>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-14 flex flex-col items-center gap-3 text-center">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "var(--color-text-muted)",
              opacity: 0.55,
            }}
          >
            &copy; {new Date().getFullYear()} — Handcrafted with care
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <motion.div
      data-page-wrapper
      className="paper-grain min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      style={{
        backgroundColor: "var(--color-bg-base)",
        color: "var(--color-text-primary)",
      }}
    >
      <ScrollProgress />
      <OrganicNav />
      <CustomCursor />
      <EasterEgg />
      <BackToTop />
      <main className="relative z-[2]">
        <Hero />
        <MarqueeStrip />
        <SectionDivider color="var(--color-terracotta)" />
        <NowSection />
        <SectionDivider color="var(--color-sage)" />
        <SkillsSection />
        <SectionDivider color="var(--color-rose)" />
        <WorksSection />
        <SectionDivider color="var(--color-gold)" />
        <LinksSection />
      </main>
      <Footer />
    </motion.div>
  );
}
