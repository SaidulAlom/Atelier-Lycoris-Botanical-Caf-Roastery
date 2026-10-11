"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LycorisSpecimen from "@/components/ui/lycoris-specimen";
import MenuSection from "./components/MenuSection";
import StorySection from "./components/StorySection";
import GallerySection from "./components/GallerySection";
import VisitSection from "./components/VisitSection";
import Footer from "./components/Footer";
import ReservationModal from "./components/ReservationModal";
import { MenuItem } from "./data/cafe-data";

export default function App() {
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  return (
    <div className="min-h-screen bg-[#120D0A] text-[#F5F0E8] font-sans selection:bg-[#A85C43] selection:text-white">
      {/* Top Fixed Navigation */}
      <Navbar
        onOpenReservation={() => setReservationModalOpen(true)}
      />

      {/* 
        Photorealistic Luxury Coffee Experience
        Redesigned across 6 cinematic scenes:
        Scene 1: The Signature Cup (Ceramic cup, rich crema, natural steam)
        Scene 2: Coffee in Detail (Macro beans, oily sheen, surface texture)
        Scene 3: The Pour (Velvety microfoam pouring, fluid dynamics)
        Scene 4: The Craft (Precision espresso portafilter, 9 bar extraction)
        Scene 5: The Experience (Coffee paired with fresh pastry in daylight)
        Scene 6: The Brand Finale (Roastery heritage & tasting booking)
      */}
      <LycorisSpecimen
        name="ATELIER LYCORIS"
        studio="Specialty Roastery & Tasting Sanctuary"
        year="EST. 2026"
        tagline="A sanctuary of single-origin coffee, rich swirling crema, and unhurried artisanal craft."
        description="A sacred dialogue between highland volcanic terroir, precision roasting, and handcrafted Kasama ceramics."
        multilingual={{
          kanji: "珈琲工芸",
          phonetic: "Kōhī Kōgei / Artisanal Roastery",
          meaning: "Precision Roasted Micro-Lots • Golden Crema & Ceramic Reverence",
        }}
        ligatureWord="Affogato"
        crimson="#C87D55"
        ink="#0D0806"
        bone="#F5F0E8"
        height="600vh"
        links={[
          { label: "View Coffee Menu", href: "#menu" },
          { label: "Our Story", href: "#story" },
          { label: "Reserve Table", href: "#visit" },
        ]}
      />

      {/* Menu Section with Filterable Categories and Origin Archive Modal */}
      <MenuSection onSelectItem={(item) => setSelectedMenuItem(item)} />

      {/* Editorial Story & Philosophy Section */}
      <StorySection />

      {/* Visual Photography & Atmospheric Gallery */}
      <GallerySection />

      {/* Visit Us, Live Roastery Status & Directions */}
      <VisitSection onOpenReservation={() => setReservationModalOpen(true)} />

      {/* Refined Brand Footer */}
      <Footer />

      {/* Table & Omakase Coffee Tasting Reservation Modal */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
      />
    </div>
  );
}
