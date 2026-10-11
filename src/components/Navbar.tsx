"use client";

import React, { useState, useEffect } from "react";
import { Coffee, Menu as MenuIcon, X, Calendar, Sparkles, MapPin } from "lucide-react";

interface NavbarProps {
  onOpenReservation: () => void;
  orderCount?: number;
  onOpenOrderTray?: () => void;
}

export default function Navbar({ onOpenReservation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "The Experience", href: "#specimen-hero" },
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#story" },
    { label: "Atmosphere", href: "#gallery" },
    { label: "Visit & Hours", href: "#visit" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#140E0A]/95 backdrop-blur-md border-b border-[#3A261D]/60 py-3 sm:py-3.5 shadow-xl"
            : "bg-[#0E0907]/90 backdrop-blur-md border-b border-[#3A261D]/40 py-3.5 sm:py-4 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Logo / Brandmark */}
          <a
            href="#specimen-hero"
            className="flex items-center space-x-3 group text-[#F5F0E8] transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-[#A85C43]/60 bg-[#241812] flex items-center justify-center text-[#A85C43] group-hover:border-[#A85C43] transition-all">
              <span className="font-serif text-sm font-semibold italic">L</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.2em] text-sm uppercase font-medium text-[#F5F0E8] group-hover:text-[#A85C43] transition-colors">
                Atelier Lycoris
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#B8AEA1]/60 font-mono">
                Specialty Roastery
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] text-[#B8AEA1]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#F5F0E8] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#A85C43] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Reserve Table & Mobile Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onOpenReservation}
              className="flex items-center space-x-2 px-4 py-2 text-xs uppercase tracking-[0.18em] font-medium rounded-sm border border-[#A85C43] text-[#F5F0E8] bg-[#A85C43]/20 hover:bg-[#A85C43] transition-all"
              aria-label="Book a table or tasting"
            >
              <Calendar className="w-3.5 h-3.5 text-[#A85C43] group-hover:text-white" />
              <span className="hidden sm:inline">Reserve Table</span>
              <span className="sm:hidden">Book</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#B8AEA1] hover:text-[#F5F0E8] rounded border border-[#3A261D] bg-[#1F1713]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 lg:hidden flex flex-col justify-between bg-[#120D0A]/98 backdrop-blur-xl px-8 pt-28 pb-12 animate-in fade-in duration-200"
        >
          <div className="flex flex-col space-y-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#A85C43] mb-2">
              Navigation • 喫茶探索
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="font-serif text-2xl text-[#F5F0E8] hover:text-[#A85C43] transition-colors py-1 flex items-center justify-between border-b border-[#3A261D]/50"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#B8AEA1]/40">→</span>
              </a>
            ))}
          </div>

          <div className="pt-8 border-t border-[#3A261D] flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3.5 text-center bg-[#A85C43] text-white uppercase text-xs tracking-[0.2em] font-medium rounded-sm"
            >
              Reserve Omakase Tasting Table
            </button>
            <div className="flex items-center justify-between text-[11px] text-[#B8AEA1]/70 font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A85C43]" /> Tokyo / New York
              </span>
              <span>Open 07:30 - 19:30</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
