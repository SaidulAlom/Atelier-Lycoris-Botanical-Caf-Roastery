"use client";

import React, { useMemo } from "react";
import { MapPin, Clock, Phone, Mail, Navigation, ExternalLink, Calendar } from "lucide-react";
import { CAFE_INFO } from "../data/cafe-data";

interface VisitSectionProps {
  onOpenReservation: () => void;
}

export default function VisitSection({ onOpenReservation }: VisitSectionProps) {
  // Compute open status based on local time
  const currentStatus = useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentDec = hours + minutes / 60;

    const isWeekend = day === 0 || day === 6;
    const openTime = isWeekend ? 8.5 : 7.5; // 8:30 or 7:30
    const closeTime = isWeekend ? 19.5 : 18.5; // 19:30 or 18:30

    const isOpen = currentDec >= openTime && currentDec < closeTime;
    return {
      isOpen,
      text: isOpen ? "Brewing Now • Doors Open" : "Closed for the Evening • Reopening at 07:30",
    };
  }, []);

  return (
    <section id="visit" className="relative py-28 px-6 sm:px-12 bg-[#0E0907] text-[#F5F0E8] border-t border-[#261710]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#3A261D]/70 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-[#A85C43] mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>SANCTUARY LOCATION • 所在地</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F5F0E8]">
              Visit & Connect
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                currentStatus.isOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-600"
              }`}
            />
            <span className="text-xs font-mono text-[#B8AEA1]">
              {currentStatus.text}
            </span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#140E0A] p-8 rounded-xl border border-[#2D1E16] space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A85C43] block mb-1">
                  MAIN ATELIER
                </span>
                <p className="font-serif text-xl text-[#F5F0E8]">
                  {CAFE_INFO.address}
                </p>
                <p className="text-xs text-[#B8AEA1] font-light mt-1">
                  Near Omotesando Station (Exit B1), walking through Kotto-dori.
                </p>
              </div>

              <div className="pt-4 border-t border-[#2B1D16] space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A85C43] block">
                  ROASTING & BREWING HOURS
                </span>
                {CAFE_INFO.hours.map((schedule) => (
                  <div key={schedule.days} className="flex justify-between text-xs font-mono">
                    <span className="text-[#B8AEA1]">{schedule.days}</span>
                    <span className="text-[#F5F0E8] font-medium">{schedule.roastery}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#2B1D16] space-y-2 text-xs font-mono text-[#B8AEA1]">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#A85C43]" />
                  <span>{CAFE_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#A85C43]" />
                  <span>{CAFE_INFO.email}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenReservation}
                  className="w-full py-3.5 bg-[#A85C43] hover:bg-[#8F4E38] text-white uppercase text-xs tracking-[0.2em] font-medium rounded transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table or Tasting</span>
                </button>
              </div>
            </div>
          </div>

          {/* Architectural Map & Directions Visual Card */}
          <div className="lg:col-span-7">
            <div className="h-full min-h-[340px] rounded-xl overflow-hidden bg-[#17100B] border border-[#2D1E16] relative flex flex-col justify-between p-8">
              {/* Artistic architectural map styling */}
              <div className="absolute inset-0 opacity-15 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F5F0E8" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#A85C43] block mb-1">
                    TRANSIT & ACCESS
                  </span>
                  <h3 className="text-2xl font-serif text-[#F5F0E8]">
                    Finding the Sanctuary
                  </h3>
                </div>
                <span className="p-3 bg-[#1F1713] rounded-full border border-[#3A261D] text-[#A85C43]">
                  <Navigation className="w-5 h-5" />
                </span>
              </div>

              <div className="relative z-10 my-8 space-y-4 text-xs font-mono text-[#B8AEA1] bg-[#120D0A]/85 p-6 rounded-lg border border-[#2B1D16] backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <span className="text-[#A85C43] font-bold">01.</span>
                  <div>
                    <span className="text-[#F5F0E8] font-medium block">Tokyo Metro Ginza & Hanzomon Lines</span>
                    <span className="text-[11px] text-[#B8AEA1]/70">Exit B1 onto Aoyama-dori, turn right onto Kotto-dori (4 min walk).</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#A85C43] font-bold">02.</span>
                  <div>
                    <span className="text-[#F5F0E8] font-medium block">Courtyard Courtesies</span>
                    <span className="text-[11px] text-[#B8AEA1]/70">Bicycle racks available in the inner botanical courtyard. Pet friendly patio.</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[#2D1E16] text-xs font-mono">
                <span className="text-[#B8AEA1]/60">35°39'52"N 139°42'48"E</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#A85C43] hover:text-[#F5F0E8] transition-colors"
                >
                  <span>Open in Navigation Map</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
