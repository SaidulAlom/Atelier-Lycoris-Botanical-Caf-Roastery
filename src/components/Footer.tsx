"use client";

import React, { useState } from "react";
import { ArrowUp, Instagram, Music, Mail, Check } from "lucide-react";
import { CAFE_INFO } from "../data/cafe-data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0705] text-[#F5F0E8] border-t border-[#261710] py-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2B1D16]">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border border-[#A85C43]/70 bg-[#1F1713] flex items-center justify-center text-[#A85C43]">
                <span className="font-serif text-sm font-semibold italic">L</span>
              </div>
              <span className="font-serif text-xl tracking-[0.2em] uppercase text-[#F5F0E8]">
                Atelier Lycoris
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#B8AEA1] font-light max-w-sm leading-relaxed">
              A boutique specialty coffee sanctuary bridging single-origin micro-lot roasting with Japanese architectural stillness.
            </p>
            <div className="pt-2 flex items-center space-x-4 text-xs font-mono text-[#B8AEA1]/70">
              <a
                href="#visit"
                className="hover:text-[#A85C43] transition-colors flex items-center gap-1.5"
              >
                <Instagram className="w-4 h-4" />
                <span>{CAFE_INFO.instagram}</span>
              </a>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Music className="w-4 h-4" />
                <span>Analog Vinyl Sound</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3 text-xs font-mono">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A85C43] block mb-2">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-[#B8AEA1]">
              <li>
                <a href="#specimen-hero" className="hover:text-[#F5F0E8] transition-colors">
                  01. The Coffee Experience
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#F5F0E8] transition-colors">
                  02. Coffee & Bakery Menu
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#F5F0E8] transition-colors">
                  03. Terroir Philosophy
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#F5F0E8] transition-colors">
                  04. Visual Gallery
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#F5F0E8] transition-colors">
                  05. Hours & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Micro-Lot Dispatch */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#A85C43] block mb-2">
              MICRO-LOT DISPATCH
            </span>
            <p className="text-xs text-[#B8AEA1] font-light leading-relaxed">
              Receive quiet monthly notices regarding rare auction harvests, seasonal pastry collaborations, and tasting seat openings.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#1F1713] border border-[#A85C43]/40 rounded text-xs text-[#F5F0E8]">
                <Check className="w-4 h-4 text-[#A85C43]" />
                <span>You are subscribed to the harvest dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 text-xs pt-1">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#140E0A] border border-[#2D1E16] rounded px-3 py-2.5 text-[#F5F0E8] focus:border-[#A85C43] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#A85C43] hover:bg-[#8F4E38] text-white uppercase tracking-wider text-[11px] font-medium rounded transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright and top scroll */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#B8AEA1]/50 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Atelier Lycoris. All Rights Reserved.</span>
            <span>•</span>
            <span>Single-Origin Convection Roastery</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#F5F0E8] transition-colors"
            aria-label="Scroll to top of page"
          >
            <span>TOP OF SANCTUARY</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
