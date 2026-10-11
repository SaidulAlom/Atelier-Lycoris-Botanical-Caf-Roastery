"use client";

import React from "react";
import { Sparkles, Leaf, Flame, ShieldCheck, HeartHandshake } from "lucide-react";

export default function StorySection() {
  const pillars = [
    {
      icon: Leaf,
      title: "Botanical Terroir",
      description:
        "We source solely from shade-grown, biodiverse agroforest micro-lots where coffee cherries ripen slowly under canopy trees, yielding complex floral aromatics.",
    },
    {
      icon: Flame,
      title: "Convection Micro-Roasting",
      description:
        "Using our flameless convection roaster, we preserve delicate organic acids and natural honeys without scorched bitterness or smokiness.",
    },
    {
      icon: HeartHandshake,
      title: "Kasama Ceramic Ware",
      description:
        "Every vessel in Atelier Lycoris is hand-turned by master potters using iron-rich Japanese clay that retains thermal equilibrium throughout each sip.",
    },
  ];

  return (
    <section id="story" className="relative py-28 px-6 sm:px-12 bg-[#0F0A08] text-[#F5F0E8] border-t border-[#261710]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Heading Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#A85C43] block mb-3">
              CHAPTER 01 • OUR PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F5F0E8] leading-[1.15] mb-6">
              Between the Bloom and the Ember.
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#B8AEA1] font-light leading-relaxed">
              <p>
                Founded upon the reverence for Japanese specialty coffee craftsmanship and high-altitude Arabica terroirs, Atelier Lycoris was conceived as a sanctuary for deliberate contemplation.
              </p>
              <p>
                Between the raw green bean, the convection ember, and the golden swirling crema, our coffee house invites you to pause. Here, water temperature is calibrated to the tenth of a degree, beans are rested in seasoned cedar bins, and slow-drip extraction occurs drop by drop over eighteen silent hours.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#3A261D]/60 flex items-center space-x-6">
              <div>
                <span className="text-2xl font-serif text-[#F5F0E8]">100%</span>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#B8AEA1]/60">Direct Trade</span>
              </div>
              <div className="w-[1px] h-8 bg-[#3A261D]" />
              <div>
                <span className="text-2xl font-serif text-[#F5F0E8]">88+</span>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#B8AEA1]/60">SCA Cup Standard</span>
              </div>
              <div className="w-[1px] h-8 bg-[#3A261D]" />
              <div>
                <span className="text-2xl font-serif text-[#F5F0E8]">0g</span>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#B8AEA1]/60">Emissions Roast</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#3A261D] shadow-2xl bg-[#17100B]">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
                alt="Artisanal pour over coffee counter in natural morning light"
                className="w-full h-80 sm:h-[26rem] object-cover filter contrast-[1.05] brightness-90 transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-lg bg-[#140E0A]/90 backdrop-blur-md border border-[#3A261D]/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A85C43]">
                    THE ROASTERY SANCTUARY
                  </span>
                  <div className="font-serif text-lg text-[#F5F0E8] mt-0.5">
                    Slow Extraction & Hand-Thrown Kasama Stoneware
                  </div>
                </div>
                <span className="text-xs font-mono text-[#B8AEA1]/70 px-3 py-1.5 rounded bg-[#1F1713] border border-[#2D1E16]">
                  MINATO-KU, TOKYO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 rounded-lg bg-[#140E0A] border border-[#2B1C15] hover:border-[#A85C43]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#A85C43]/15 text-[#A85C43] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#F5F0E8] mb-2">{pillar.title}</h3>
                <p className="text-xs text-[#B8AEA1] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
