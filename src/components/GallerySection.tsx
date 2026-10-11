"use client";

import React, { useState } from "react";
import { ZoomIn, X, Camera, Eye } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  alt: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Morning Pour-Over Bloom",
    subtitle: "Ethiopian Guji at 93°C",
    category: "Extraction",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    alt: "Hand pour over coffee brewing with rich crema and dark espresso steam",
    caption: "The thirty-second bloom phase releases trapped carbon dioxide, unlocking sweet jasmine and bergamot floral aromatics.",
  },
  {
    id: "g2",
    title: "Oiled Cedar & Architectural Botanicals",
    subtitle: "Sanctuary Seating",
    category: "Space",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    alt: "Minimalist Japanese cafe interior with natural warm wood and gentle soft daylight",
    caption: "Sunlight cascades through floor-to-ceiling glass screens across our central communal cedar counter.",
  },
  {
    id: "g3",
    title: "Morning Viennoiserie Bake",
    subtitle: "Cardamom & Sicilian Pistachio",
    category: "Bakehouse",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80",
    alt: "Golden artisan croissants and cruffins freshly baked in morning oven",
    caption: "72-hour cold-fermented laminated dough baked daily at dawn with cultured French butter and organic cardamom.",
  },
  {
    id: "g4",
    title: "Dutch Kyoto Cold Tower",
    subtitle: "18-Hour Single Drop Extraction",
    category: "Alchemy",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1200&q=80",
    alt: "Clear glass cold brew extraction with clean ice sphere and afternoon light",
    caption: "One drop per second through hand-blown borosilicate spirals produces a dense, liqueur-like body without oxidation.",
  },
  {
    id: "g5",
    title: "Synesso MVP Custom Bar",
    subtitle: "Precision Multi-Boiler Extraction",
    category: "Craft",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    alt: "Barista preparing espresso at custom steam wand counter",
    caption: "Independent temperature regulation on each group head calibrated specifically for individual micro-lots.",
  },
  {
    id: "g6",
    title: "Kasama Charcoal Ceramics",
    subtitle: "Hand-Turned Vessel Specimen",
    category: "Artisans",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
    alt: "Minimalist ceramic coffee cup on dark wood table",
    caption: "Unglazed textured lips designed to emphasize the olfactory aroma bouquet before the liquid touches the palate.",
  },
];

export default function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="relative py-28 px-6 sm:px-12 bg-[#120D0A] text-[#F5F0E8]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#3A261D]/70 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-[#A85C43] mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>VISUAL SPECIMENS • 空間景観</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#F5F0E8]">
              The Café Experience
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#B8AEA1] max-w-md font-light leading-relaxed">
            A visual documentation of morning rituals, micro-lot roasting, and the quiet harmony between architectural timber and steam.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-xl overflow-hidden bg-[#17100B] border border-[#3A261D] cursor-pointer aspect-4/3 shadow-xl transition-all duration-300 hover:border-[#A85C43]/70 hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover filter contrast-[1.05] brightness-90 transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A]/95 via-[#120D0A]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag and Zoom Icon */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5F0E8] bg-[#140E0A]/80 backdrop-blur-md px-2.5 py-1 rounded-sm border border-[#3A261D]/60">
                  {item.category}
                </span>
                <span className="w-8 h-8 rounded-full bg-[#140E0A]/80 backdrop-blur-md flex items-center justify-center text-[#B8AEA1] group-hover:text-[#A85C43] transition-colors border border-[#3A261D]/60">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Card Label */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg sm:text-xl text-[#F5F0E8] group-hover:text-[#A85C43] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[#B8AEA1]/70 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="max-w-4xl w-full bg-[#17100B] border border-[#3A261D] rounded-2xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-[#B8AEA1] hover:text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-72 sm:h-96 md:h-full relative overflow-hidden bg-black">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-between text-[#F5F0E8]">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A85C43] block mb-2">
                      {selectedItem.category} • ARCHIVE SPECIMEN
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] mb-1">
                      {selectedItem.title}
                    </h3>
                    <p className="text-xs font-mono text-[#B8AEA1]/60 mb-6">
                      {selectedItem.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-[#B8AEA1] font-light leading-relaxed">
                      {selectedItem.caption}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#3A261D]/70 flex items-center justify-between text-xs font-mono text-[#B8AEA1]/60">
                    <span>ATELIER LYCORIS</span>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-4 py-2 bg-[#241812] hover:bg-[#3A261D] text-[#F5F0E8] rounded transition-colors"
                    >
                      Return to Gallery
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
