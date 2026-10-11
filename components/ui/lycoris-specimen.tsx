"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Coffee, Sparkles, ChevronRight, Droplets, Flame, Wind, Eye } from "lucide-react";

export interface LycorisSpecimenProps {
  name?: string;
  studio?: string;
  year?: string | number;
  description?: string;
  tagline?: string;
  multilingual?: {
    kanji?: string;
    phonetic?: string;
    meaning?: string;
  };
  ligatureWord?: string;
  links?: Array<{ label: string; href: string }>;
  fontFamily?: string;
  fontHref?: string;
  ink?: string;
  bone?: string;
  crimson?: string;
  sceneScroll?: number;
  height?: string;
  className?: string;
  showHeader?: boolean;
  onSceneChange?: (sceneIndex: number) => void;
}

// ---------------------------------------------------------------------------
// Six Photorealistic Luxury Coffee Scenes
// Curated high-resolution professional studio photography
// ---------------------------------------------------------------------------
interface CoffeeSceneData {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  details: { label: string; value: string }[];
  accentColor: string;
}

const COFFEE_SCENES: CoffeeSceneData[] = [
  {
    id: 1,
    title: "The Signature Cup",
    subtitle: "Ceramic Reverence & Golden Crema",
    badge: "01 • THE SIGNATURE CUP",
    description:
      "A handcrafted charcoal-glazed stoneware cup cradles freshly extracted single-origin espresso. A dense, shimmering hazelnut crema swirls with natural tiger-stripe striations, while ethereal steam rises into warm directional studio light.",
    imageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Luxury ceramic cup filled with fresh espresso, thick golden crema, and gentle steam",
    details: [
      { label: "VESSEL", value: "Charcoal Glazed Kasama Ceramic" },
      { label: "CREMA", value: "Micro-Emulsified Lipids & Golden Foam" },
      { label: "TERROIR", value: "Ethiopia Guji Highland 2,150m" },
    ],
    accentColor: "#C87D55",
  },
  {
    id: 2,
    title: "Coffee in Detail",
    subtitle: "Oily Sheen & Roasted Perfection",
    badge: "02 • COFFEE IN DETAIL",
    description:
      "Macro-level inspection reveals the delicate fissures and silky surface oils of convection-roasted Arabica beans. Scattered across dark hand-hewn slate, each roasted bean holds a spectrum of floral jasmine, dried fig, and raw cacao.",
    imageUrl:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Extreme macro photography of whole roasted coffee beans with natural oil gloss and texture",
    details: [
      { label: "DENSITY", value: "Strictly High Grown (SHG)" },
      { label: "ROAST PROFILE", value: "Light-Medium Flameless Convection" },
      { label: "SURFACE", value: "Natural Cacao Luster & Fissures" },
    ],
    accentColor: "#A85C43",
  },
  {
    id: 3,
    title: "The Pour",
    subtitle: "Velvet Microfoam & Fluid Geometry",
    badge: "03 • THE POUR",
    description:
      "A frozen instant of liquid artistry: silky steamed oat velvet descends into dense espresso, billowing upward into intricate recursive rosetta petals. Fluid dynamics captured in crisp focus with natural specular milk gleams.",
    imageUrl:
      "https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Cinematic close-up of velvety steamed milk pouring into rich espresso creating latte art",
    details: [
      { label: "TEMPERATURE", value: "62.5°C Micro-Textured Milk" },
      { label: "TEXTURE", value: "Silky Wet-Paint Microfoam" },
      { label: "FLOW RATE", value: "Gentle Controlled Center Pour" },
    ],
    accentColor: "#D49B6A",
  },
  {
    id: 4,
    title: "The Craft",
    subtitle: "Precision Extraction & Machine Architecture",
    badge: "04 • THE CRAFT",
    description:
      "Gleaming stainless steel portafilter heads, brass distribution tools, and freshly compressed coffee pucks. At 9 bars of hydraulic pressure and 93.5°C water temperature, extraction attains molecular balance.",
    imageUrl:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Barista preparing espresso extraction on custom commercial multi-boiler espresso machine",
    details: [
      { label: "PRESSURE", value: "9.0 Bar Saturated Group" },
      { label: "WATER TEMP", value: "93.5°C PID Regulated" },
      { label: "RATIO", value: "1:2 (18.5g In • 37g Out in 27s)" },
    ],
    accentColor: "#B8865C",
  },
  {
    id: 5,
    title: "The Experience",
    subtitle: "Morning Viennoiserie & Warm Solitude",
    badge: "05 • THE EXPERIENCE",
    description:
      "The finished cup rests alongside a freshly baked, flaky cardamom cruffin on aged natural walnut. Soft morning light streams through glass screens, illuminating gentle steam and inviting quiet reflection.",
    imageUrl:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Flat white coffee cup and fresh golden pastry on dark wood table in peaceful cafe setting",
    details: [
      { label: "PAIRING", value: "Cardamom & Pistachio Cruffin" },
      { label: "ATMOSPHERE", value: "Acoustic Cedar Wood & Low Sun" },
      { label: "TEMPO", value: "Unhurried Morning Sanctuary" },
    ],
    accentColor: "#C87D55",
  },
  {
    id: 6,
    title: "The Brand Finale",
    subtitle: "Atelier Lycoris Roastery Heritage",
    badge: "06 • THE BRAND FINALE",
    description:
      "From high-altitude Andean slopes and Ethiopian agroforests to our custom roastery in Minato-ku. Every bean is roasted with intention, honoring the sacred ritual of specialty coffee.",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Warm minimalist artisan coffee studio counter with fresh roasts and ceramic cups",
    details: [
      { label: "ROASTERY", value: "Tokyo • Kyoto • New York" },
      { label: "DIRECT TRADE", value: "100% Farm-Gate Pricing" },
      { label: "TASTING BAR", value: "Walk-ins & Omakase Seating" },
    ],
    accentColor: "#A85C43",
  },
];

// ---------------------------------------------------------------------------
// Realistic Canvas Steam Physics Simulation
// Gentle, organic rising vapor wisps with turbulent noise
// ---------------------------------------------------------------------------
interface SteamParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxLife: number;
  life: number;
  wobbleSpeed: number;
  wobbleAmp: number;
}

interface SteamCanvasProps {
  active: boolean;
  sceneIndex: number;
  isReducedMotion: boolean;
}

function SteamCanvas({ active, sceneIndex, isReducedMotion }: SteamCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isReducedMotion || !active) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let animId: number;
    let particles: SteamParticle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const createParticle = (): SteamParticle => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      // Scene 1 (index 0): center cup. Scene 5 (index 4): table cup
      const cupXOffset = sceneIndex === 4 ? 0.48 : 0.5;
      const cupYOffset = sceneIndex === 4 ? 0.62 : 0.65;

      const originX = w * cupXOffset + (Math.random() - 0.5) * 50;
      const originY = h * cupYOffset + (Math.random() - 0.5) * 25;

      return {
        x: originX,
        y: originY,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.55 - Math.random() * 0.75, // gentle upward drift
        size: 16 + Math.random() * 22,
        alpha: 0,
        maxLife: 130 + Math.random() * 70,
        life: 0,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAmp: 0.7 + Math.random() * 1.1,
      };
    };

    // Populate initial batch
    for (let i = 0; i < 24; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife;
      p.y -= Math.random() * 100;
      particles.push(p);
    }

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Add new particle occasionally
      if (particles.length < 32 && Math.random() < 0.22) {
        particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Physics: rising with subtle horizontal curl
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.life * p.wobbleSpeed) * p.wobbleAmp * 0.3;
        p.size += 0.22; // expands as it rises

        // Alpha envelope: smooth ease-in, gentle ease-out
        const progress = p.life / p.maxLife;
        let a = 0;
        if (progress < 0.2) {
          a = (progress / 0.2) * 0.13; // soft maximum opacity
        } else {
          a = (1 - (progress - 0.2) / 0.8) * 0.13;
        }

        // Draw soft radial vapor puff
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `rgba(245, 240, 232, ${a})`);
        grad.addColorStop(0.5, `rgba(230, 220, 205, ${a * 0.5})`);
        grad.addColorStop(1, "rgba(230, 220, 205, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      if (canvas) {
        const cCtx = canvas.getContext("2d");
        if (cCtx) cCtx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [active, sceneIndex, isReducedMotion]);

  if (isReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// ---------------------------------------------------------------------------
// Main Photorealistic Coffee Experience Component
// ---------------------------------------------------------------------------
export default function LycorisSpecimen({
  name = "ATELIER LYCORIS",
  studio = "Specialty Coffee Roastery & Botanical Bar",
  year = "EST. 2026",
  description = "A sacred dialogue between wild single-origin coffee and artisanal slow extraction. Handcrafted in harmony with architectural stillness.",
  tagline = "Photorealistic Roastery & Artisanal Coffee Solitude",
  multilingual = {
    kanji: "珈琲工芸",
    phonetic: "Kōhī Kōgei / Artisanal Roastery",
    meaning: "Precision Roasted Micro-Lots • Golden Crema & Ceramic Reverence",
  },
  ligatureWord = "Affogato",
  links = [
    { label: "Explore Roasts", href: "#menu" },
    { label: "Our Story", href: "#story" },
    { label: "Book Table", href: "#visit" },
  ],
  ink = "#120D0A",
  bone = "#F5F0E8",
  crimson = "#A85C43",
  height = "600vh",
  className = "",
  showHeader = false,
  onSceneChange,
}: LycorisSpecimenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Detect reduced-motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track scroll through the sticky container
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollProgress(progress);

      const sceneIndex = Math.min(
        COFFEE_SCENES.length - 1,
        Math.floor(progress * COFFEE_SCENES.length)
      );

      if (sceneIndex !== activeScene) {
        setActiveScene(sceneIndex);
        onSceneChange?.(sceneIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeScene, onSceneChange]);

  // Mouse parallax interaction
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReducedMotion) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: clientX / innerWidth,
        y: clientY / innerHeight,
      });
    },
    [isReducedMotion]
  );

  const scrollToScene = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;
      const totalScrollable = container.offsetHeight - window.innerHeight;
      const targetScroll = (index / (COFFEE_SCENES.length - 1)) * totalScrollable;
      const containerTop = container.offsetTop;
      window.scrollTo({
        top: containerTop + targetScroll,
        behavior: isReducedMotion ? "auto" : "smooth",
      });
    },
    [isReducedMotion]
  );

  const currentScene = COFFEE_SCENES[activeScene];

  return (
    <div
      ref={containerRef}
      style={{ height }}
      onMouseMove={handleMouseMove}
      className={`relative w-full ${className}`}
      id="specimen-hero"
    >
      {/* Pinned Cinematic Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0D0806] flex flex-col justify-between select-none">
        {/* Layer 1: Background Images with Photographic Cross-Fade and Micro-Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {COFFEE_SCENES.map((scene, idx) => {
            const isActive = idx === activeScene;
            const isNeighbor = Math.abs(idx - activeScene) <= 1;
            if (!isNeighbor) return null;

            // Subtle parallax shift based on mouse position
            const parallaxX = isReducedMotion ? 0 : (mousePos.x - 0.5) * -16;
            const parallaxY = isReducedMotion ? 0 : (mousePos.y - 0.5) * -14;

            return (
              <div
                key={scene.id}
                className={`absolute inset-0 transition-all duration-1000 ease-out ${
                  isActive
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0 pointer-events-none"
                }`}
                style={{
                  transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
                }}
              >
                <img
                  src={scene.imageUrl}
                  alt={scene.imageAlt}
                  className="w-full h-full object-cover filter contrast-[1.08] brightness-85"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>
            );
          })}

          {/* Cinematic Studio Lighting Vignette & Contrast Layer */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Deep dark perimeter vignette */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#0D0806]/50 to-[#0A0604]/90" />
            {/* Soft dark gradient overlays for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0806] via-transparent to-[#0D0806]/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0806]/80 via-transparent to-[#0D0806]/80" />

            {/* Interactive soft directional studio warmth following cursor */}
            {!isReducedMotion && (
              <div
                className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 transition-transform duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(200, 125, 85, 0.4) 0%, rgba(168, 92, 67, 0.1) 50%, transparent 70%)",
                  left: `${mousePos.x * 100}%`,
                  top: `${mousePos.y * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </div>

          {/* Gentle Rising Steam Effect ONLY on Scene 1 (The Signature Cup) and Scene 5 (The Experience) */}
          <div
            className={`transition-opacity duration-700 ease-out pointer-events-none ${
              activeScene === 0 || activeScene === 4 ? "opacity-100" : "opacity-0"
            }`}
          >
            <SteamCanvas
              active={activeScene === 0 || activeScene === 4}
              sceneIndex={activeScene}
              isReducedMotion={isReducedMotion}
            />
          </div>
        </div>

        {/* Optional Top Header (only when showHeader is explicitly enabled, e.g. standalone demo) */}
        {showHeader && (
          <header className="relative z-30 flex items-center justify-between px-6 sm:px-12 pt-20 sm:pt-24 text-xs tracking-[0.22em] uppercase text-[#B8AEA1]/80">
            <div className="flex items-center space-x-3">
              <span
                className="w-2.5 h-2.5 rounded-full shadow-sm"
                style={{ backgroundColor: currentScene.accentColor }}
              />
              <span className="font-serif font-medium text-[#F5F0E8] tracking-widest text-sm">
                {name}
              </span>
              <span className="hidden sm:inline text-[#B8AEA1]/40">•</span>
              <span className="hidden sm:inline text-[#B8AEA1]/60 text-[11px] font-mono">
                {studio}
              </span>
            </div>

            <div className="flex items-center space-x-6 text-[11px]">
              <span className="hidden md:inline font-mono text-[#B8AEA1]/50">{year}</span>
              <div className="flex items-center space-x-2 bg-[#17100B]/80 px-3.5 py-1.5 rounded-full border border-[#3A261D]/70 backdrop-blur-md">
                <span className="font-mono text-[#A85C43]">SCENE</span>
                <span className="font-mono text-[#F5F0E8] font-medium">
                  0{activeScene + 1}
                </span>
                <span className="text-[#B8AEA1]/40">/</span>
                <span className="font-mono text-[#B8AEA1]/60">06</span>
              </div>
            </div>
          </header>
        )}

        {/* Dynamic Center/Overlay Scene Narratives across the 6 Photorealistic Scenes */}
        <main className="relative z-30 flex-1 flex items-center justify-center px-6 sm:px-12 pointer-events-none pt-20 sm:pt-24 pb-12 sm:pb-16">
          {/* Scene 1: The Signature Cup (Hero) */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center text-center px-6 transition-all duration-700 ease-out ${
              activeScene === 0
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="max-w-3xl flex flex-col items-center">
              {multilingual?.kanji && (
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs sm:text-sm tracking-[0.35em] font-serif text-[#C87D55]">
                    {multilingual.kanji}
                  </span>
                  <span className="text-[#B8AEA1]/40">•</span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B8AEA1]/70">
                    SINGLE-ORIGIN SANCTUARY
                  </span>
                </div>
              )}
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-light tracking-tight text-[#F5F0E8] leading-[1.05] drop-shadow-2xl">
                {name}
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-[#F5F0E8]/90 max-w-xl font-light tracking-wide leading-relaxed drop-shadow-md">
                {tagline}
              </p>

              {/* Real specs badge */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#B8AEA1] bg-[#140E0A]/80 px-5 py-2.5 rounded-full border border-[#3A261D]/80 backdrop-blur-md">
                <span className="flex items-center gap-1.5 text-[#F5F0E8]">
                  <Coffee className="w-3.5 h-3.5 text-[#C87D55]" />
                  <span>Fresh Espresso Extraction</span>
                </span>
                <span className="text-[#3A261D]">•</span>
                <span>Golden Swirling Crema</span>
                <span className="text-[#3A261D]">•</span>
                <span>Natural Rising Steam</span>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className={`px-6 py-3 text-xs uppercase tracking-[0.22em] transition-all duration-300 rounded-sm border ${
                      idx === 0
                        ? "bg-[#A85C43] text-[#F5F0E8] border-[#A85C43] hover:bg-[#8F4E38] shadow-lg"
                        : "bg-[#140E0A]/80 text-[#F5F0E8] border-[#3A261D] hover:border-[#A85C43] hover:bg-[#1F1713] backdrop-blur-md"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Scene 2: Coffee in Detail (Macro Texture & Roasted Beans) */}
          <div
            className={`absolute inset-0 flex flex-col justify-end md:justify-center items-start px-6 sm:px-16 pb-16 md:pb-0 transition-all duration-700 ease-out ${
              activeScene === 1
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-6 pointer-events-none"
            }`}
          >
            <div className="max-w-md bg-[#140E0A]/90 p-6 sm:p-8 rounded-xl border border-[#3A261D] backdrop-blur-md shadow-2xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C87D55] block mb-2">
                {currentScene.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] mb-3">
                {currentScene.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#B8AEA1] leading-relaxed font-light mb-6">
                {currentScene.description}
              </p>
              <div className="grid grid-cols-1 gap-2.5 pt-4 border-t border-[#3A261D]/60 text-xs font-mono">
                {currentScene.details.map((d, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[#B8AEA1]/60 text-[10px]">{d.label}</span>
                    <span className="text-[#F5F0E8] font-medium">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scene 3: The Pour (Fluid Dynamics & Latte Art) */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-end px-6 sm:px-16 transition-all duration-700 ease-out ${
              activeScene === 2
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 translate-x-8 pointer-events-none"
            }`}
          >
            <div className="max-w-lg w-full bg-[#140E0A]/90 p-6 sm:p-8 rounded-xl border border-[#3A261D] backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#3A261D]">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C87D55]">
                  {currentScene.badge}
                </span>
                <span className="text-[11px] font-mono text-[#B8AEA1]/60">MICROFOAM CRAFT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] mt-3 mb-2">
                {currentScene.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#B8AEA1] leading-relaxed font-light mb-6">
                {currentScene.description}
              </p>

              <div className="space-y-2 bg-[#0D0806]/80 p-4 rounded-lg border border-[#2D1E16] mb-6">
                {currentScene.details.map((d, i) => (
                  <div key={i} className="flex justify-between text-xs font-mono">
                    <span className="text-[#B8AEA1]/70">{d.label}</span>
                    <span className="text-[#F5F0E8] font-medium">{d.value}</span>
                  </div>
                ))}
              </div>

              <a
                href="#menu"
                className="block text-center py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F0E8] bg-[#241812] hover:bg-[#3A261D] border border-[#3A261D] rounded transition-all"
              >
                View Signatures & Pour-Overs →
              </a>
            </div>
          </div>

          {/* Scene 4: The Craft (Precision Machine Extraction) */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-16 transition-all duration-700 ease-out ${
              activeScene === 3
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-6 pointer-events-none"
            }`}
          >
            <div className="max-w-md bg-[#140E0A]/90 p-6 sm:p-8 rounded-xl border border-[#3A261D] backdrop-blur-md shadow-2xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C87D55] block mb-2">
                {currentScene.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] mb-3">
                {currentScene.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#B8AEA1] font-light leading-relaxed mb-6">
                {currentScene.description}
              </p>

              <div className="grid grid-cols-1 gap-2.5 pt-4 border-t border-[#3A261D] text-xs font-mono">
                {currentScene.details.map((d, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[#B8AEA1]/60 text-[10px]">{d.label}</span>
                    <span className="text-[#F5F0E8] font-medium">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scene 5: The Experience (Coffee & Pastry in Daylight) */}
          <div
            className={`absolute inset-0 flex flex-col justify-end items-center pb-20 px-6 text-center transition-all duration-700 ease-out ${
              activeScene === 4
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="max-w-xl bg-[#140E0A]/90 p-6 sm:p-8 rounded-xl border border-[#3A261D] backdrop-blur-md shadow-2xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#C87D55] block mb-2">
                {currentScene.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] mb-3">
                {currentScene.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#B8AEA1] font-light leading-relaxed mb-6">
                {currentScene.description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#gallery"
                  className="px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-[#F5F0E8] border border-[#3A261D] hover:border-[#A85C43] bg-[#1F1713] transition-colors rounded-sm"
                >
                  Atmosphere Gallery
                </a>
                <a
                  href="#visit"
                  className="px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white bg-[#A85C43] hover:bg-[#8F4E38] transition-colors rounded-sm"
                >
                  Reserve Table & Pastry
                </a>
              </div>
            </div>
          </div>

          {/* Scene 6: The Brand Finale */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center text-center px-6 transition-all duration-700 ease-out ${
              activeScene === 5
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="max-w-lg bg-[#140E0A]/92 p-8 sm:p-10 rounded-2xl border border-[#3A261D] backdrop-blur-md shadow-2xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C87D55] block mb-2">
                {currentScene.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#F5F0E8] mb-3">
                {name}
              </h2>
              <p className="text-xs sm:text-sm text-[#B8AEA1] font-light leading-relaxed mb-6">
                {currentScene.description}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono py-4 border-y border-[#3A261D] mb-6">
                <div>
                  <span className="text-[#B8AEA1]/60 block text-[10px]">ROASTING SANCTUARY</span>
                  <span className="text-[#F5F0E8] font-medium text-xs">Aoyama • Tokyo</span>
                </div>
                <div>
                  <span className="text-[#B8AEA1]/60 block text-[10px]">OPEN DAILY</span>
                  <span className="text-[#F5F0E8] font-medium text-xs">07:30 — 19:30</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="#menu"
                  className="px-6 py-3 bg-[#A85C43] hover:bg-[#8F4E38] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-sm shadow-lg"
                >
                  Explore Complete Menu
                </a>
                <a
                  href="#visit"
                  className="px-6 py-3 bg-[#1F1713] hover:bg-[#2A1E18] text-[#F5F0E8] border border-[#3A261D] text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-sm"
                >
                  Book Tasting Table
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Bar: Interactive Scene Navigator & Scroll Scrub Bar */}
        <footer className="relative z-30 px-6 sm:px-12 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8AEA1]/70">
          {/* Scene Selection Tabs */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 bg-[#140E0A]/85 px-3 sm:px-4 py-2 rounded-full border border-[#3A261D] backdrop-blur-md overflow-x-auto max-w-full">
            {COFFEE_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => scrollToScene(idx)}
                className={`flex items-center space-x-1.5 transition-all text-[11px] py-1 px-2.5 rounded-full whitespace-nowrap ${
                  activeScene === idx
                    ? "text-[#F5F0E8] bg-[#A85C43]/25 font-medium border border-[#A85C43]/50"
                    : "text-[#B8AEA1]/50 hover:text-[#F5F0E8]"
                }`}
                aria-label={`Jump to ${scene.title}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    activeScene === idx ? "bg-[#C87D55] scale-125" : "bg-[#B8AEA1]/30"
                  }`}
                />
                <span className="hidden md:inline font-mono">0{idx + 1}</span>
                <span className="hidden lg:inline">{scene.title}</span>
              </button>
            ))}
          </div>

          {/* Real-time Scroll Scrub Progress */}
          <div className="flex items-center space-x-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8AEA1]/60">
              SCRUB ARCHIVE (0{activeScene + 1}/06)
            </span>
            <div className="w-24 sm:w-36 h-1 bg-[#1F1713] rounded-full overflow-hidden border border-[#3A261D]">
              <div
                className="h-full bg-gradient-to-r from-[#A85C43] to-[#C87D55] transition-all duration-150 ease-out"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
