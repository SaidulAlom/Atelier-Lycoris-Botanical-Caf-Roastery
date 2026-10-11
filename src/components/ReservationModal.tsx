"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, Users, Coffee, CheckCircle2 } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "10:30",
    experience: "espresso-tasting",
    specialRequests: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#17100B] border border-[#3A261D] max-w-lg w-full p-6 sm:p-8 rounded-2xl shadow-2xl relative text-[#F5F0E8] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#B8AEA1] hover:text-[#F5F0E8] p-1.5 rounded-full hover:bg-[#241812] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#A85C43]/20 text-[#A85C43] rounded-full flex items-center justify-center mx-auto border border-[#A85C43]/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-[#F5F0E8]">
              Reservation Requested
            </h3>
            <p className="text-xs sm:text-sm text-[#B8AEA1] font-light max-w-xs mx-auto leading-relaxed">
              Thank you, <span className="text-[#F5F0E8]">{formData.name}</span>. A reservation confirmation has been queued for {formData.date || "your selected date"} at {formData.time} for {formData.guests} guests.
            </p>
            <div className="pt-4 border-t border-[#3A261D]/60">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#A85C43] text-white rounded hover:bg-[#8F4E38] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A85C43] block mb-1">
                OMAKASE BAR & TABLE RESERVATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8]">
                Book Your Experience
              </h3>
              <p className="text-xs text-[#B8AEA1] font-light mt-1">
                Walk-ins are always welcomed at our brew bar. Table bookings are recommended for signature multi-course coffee tastings.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#B8AEA1]/80 mb-1">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g. Elena Vance"
                    className="w-full bg-[#120D0A] border border-[#3A261D] rounded px-3 py-2 text-[#F5F0E8] focus:border-[#A85C43] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#B8AEA1]/80 mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@example.com"
                    className="w-full bg-[#120D0A] border border-[#3A261D] rounded px-3 py-2 text-[#F5F0E8] focus:border-[#A85C43] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#B8AEA1]/80 mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#A85C43]" /> GUESTS
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-[#120D0A] border border-[#3A261D] rounded px-3 py-2 text-[#F5F0E8] focus:border-[#A85C43] focus:outline-none"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5+">5+ (Group)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#B8AEA1]/80 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#A85C43]" /> DATE
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#120D0A] border border-[#3A261D] rounded px-2 py-2 text-[#F5F0E8] focus:border-[#A85C43] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#B8AEA1]/80 mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#A85C43]" /> TIME
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#120D0A] border border-[#3A261D] rounded px-2 py-2 text-[#F5F0E8] focus:border-[#A85C43] focus:outline-none"
                  >
                    <option value="08:30">08:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="13:30">01:30 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:30">04:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#B8AEA1]/80 mb-1 flex items-center gap-1">
                  <Coffee className="w-3 h-3 text-[#A85C43]" /> TASTING EXPERIENCE
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full bg-[#120D0A] border border-[#3A261D] rounded px-3 py-2 text-[#F5F0E8] focus:border-[#A85C43] focus:outline-none"
                >
                  <option value="espresso-tasting">
                    Botanical Micro-Lot Flight (3 Single Origins) — $28
                  </option>
                  <option value="kyoto-tea-omakase">
                    Kyoto Cold-Drip & Ceremonial Matcha Pairing — $34
                  </option>
                  <option value="regular-table">
                    Standard Café Table & Morning Bakery
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#B8AEA1]/80 mb-1">
                  DIETARY RESTRICTIONS / NOTES (OPTIONAL)
                </label>
                <textarea
                  rows={2}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="E.g. Oat milk preference, celebrating anniversary..."
                  className="w-full bg-[#120D0A] border border-[#3A261D] rounded px-3 py-2 text-[#F5F0E8] focus:border-[#A85C43] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#A85C43] hover:bg-[#8F4E38] text-white uppercase tracking-[0.2em] font-medium text-xs rounded transition-colors shadow-lg"
                >
                  Confirm Tasting Reservation
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
