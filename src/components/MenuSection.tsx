"use client";

import React, { useState, useMemo } from "react";
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from "../data/cafe-data";
import { Sparkles, Compass, Flame, Info, Check, Plus, Coffee } from "lucide-react";

interface MenuSectionProps {
  onSelectItem?: (item: MenuItem) => void;
}

export default function MenuSection({ onSelectItem }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dietaryFilter, setDietaryFilter] = useState<string | null>(null);
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const categoryMatch =
        selectedCategory === "all" || item.category === selectedCategory;
      const dietaryMatch =
        !dietaryFilter || (item.dietary && item.dietary.includes(dietaryFilter as any));
      return categoryMatch && dietaryMatch;
    });
  }, [selectedCategory, dietaryFilter]);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="menu" className="relative py-28 px-6 sm:px-12 bg-[#120D0A] text-[#F5F0E8] overflow-hidden">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#A85C43]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#879078]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[#3A261D]/70 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-[#A85C43] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#A85C43]" />
              <span>THE FORMULARY • お品書き</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-tight text-[#F5F0E8]">
              Curated Roasts & Pastries
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#B8AEA1] max-w-md font-light leading-relaxed">
            Every bean is roast-profiled on our convection Loring S15 to unlock botanical terroir, served alongside viennoiserie laminated daily in our morning bakehouse.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pb-4">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all rounded-sm border ${
                selectedCategory === cat.id
                  ? "bg-[#A85C43] text-[#F5F0E8] border-[#A85C43] shadow-md font-medium"
                  : "bg-[#1B1410] text-[#B8AEA1] border-[#3A261D] hover:border-[#A85C43]/60 hover:text-[#F5F0E8]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dietary Tag Toggles */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#B8AEA1]/80">
          <span className="text-[10px] uppercase tracking-wider text-[#B8AEA1]/50 mr-1">
            FILTER:
          </span>
          {[
            { id: null, label: "All Formulations" },
            { id: "signature", label: "★ Botanical Signatures" },
            { id: "single-origin", label: "Single-Origin" },
            { id: "vegan", label: "Plant-Based / Vegan" },
            { id: "gluten-free", label: "Gluten-Free" },
          ].map((tag) => (
            <button
              key={tag.label}
              onClick={() => setDietaryFilter(tag.id)}
              className={`px-3 py-1 rounded-full transition-colors border ${
                dietaryFilter === tag.id
                  ? "border-[#A85C43] bg-[#A85C43]/20 text-[#F5F0E8]"
                  : "border-[#2A1E18] bg-[#17100B] hover:border-[#3A261D] text-[#B8AEA1]/70"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const isSaved = savedItems.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveModalItem(item);
                  onSelectItem?.(item);
                }}
                className="group relative bg-[#17100B]/80 hover:bg-[#1C140F] border border-[#3A261D]/70 hover:border-[#A85C43]/70 p-6 rounded-lg transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <div>
                  {/* Top row: tags and price */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.popular && (
                        <span className="text-[10px] uppercase tracking-wider font-mono text-[#A85C43] bg-[#A85C43]/15 px-2 py-0.5 rounded-sm border border-[#A85C43]/30">
                          Signature
                        </span>
                      )}
                      {item.origin && (
                        <span className="text-[10px] font-mono text-[#879078] bg-[#879078]/10 px-2 py-0.5 rounded-sm">
                          {item.origin.split(",")[0]}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-base font-medium text-[#F5F0E8] group-hover:text-[#A85C43] transition-colors">
                      {item.price}
                    </span>
                  </div>

                  {/* Title & Japanese subtitle */}
                  <div className="mb-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#F5F0E8] group-hover:text-[#F5F0E8] transition-colors">
                      {item.name}
                    </h3>
                    {item.japaneseName && (
                      <span className="text-xs font-serif text-[#A85C43]/80 tracking-widest block mt-0.5">
                        {item.japaneseName}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#B8AEA1] font-light leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div>
                  {/* Tasting Notes Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#3A261D]/50 mb-4">
                    {item.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="text-[10px] font-mono text-[#B8AEA1]/80 bg-[#120D0A] px-2 py-0.5 rounded border border-[#2A1E18]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between text-xs pt-1 font-mono text-[#B8AEA1]/60">
                    <span className="flex items-center gap-1 text-[11px] group-hover:text-[#A85C43] transition-colors">
                      <Info className="w-3.5 h-3.5" /> Details & Origins
                    </span>
                    <button
                      onClick={(e) => toggleSave(item.id, e)}
                      className={`p-1.5 rounded transition-colors ${
                        isSaved
                          ? "text-[#A85C43] bg-[#A85C43]/20"
                          : "text-[#B8AEA1]/40 hover:text-[#F5F0E8]"
                      }`}
                      aria-label="Save to tasting wishlist"
                    >
                      {isSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tasting Notes Modal / Dialog */}
        {activeModalItem && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveModalItem(null)}
          >
            <div
              className="bg-[#17100B] border border-[#3A261D] max-w-lg w-full p-8 rounded-xl shadow-2xl relative text-[#F5F0E8]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A85C43]">
                    ORIGIN ARCHIVE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F0E8] mt-1">
                    {activeModalItem.name}
                  </h3>
                  {activeModalItem.japaneseName && (
                    <span className="text-xs font-serif text-[#A85C43] tracking-widest block">
                      {activeModalItem.japaneseName}
                    </span>
                  )}
                </div>
                <span className="font-mono text-xl text-[#F5F0E8] bg-[#241812] px-3 py-1 rounded border border-[#3A261D]">
                  {activeModalItem.price}
                </span>
              </div>

              <p className="text-sm text-[#B8AEA1] font-light leading-relaxed mb-6">
                {activeModalItem.description}
              </p>

              {/* Technical Specifications */}
              <div className="bg-[#120D0A] p-4 rounded-lg border border-[#2A1E18] space-y-2.5 text-xs font-mono mb-6">
                {activeModalItem.origin && (
                  <div className="flex justify-between">
                    <span className="text-[#B8AEA1]/60">Terroir Origin:</span>
                    <span className="text-[#F5F0E8]">{activeModalItem.origin}</span>
                  </div>
                )}
                {activeModalItem.elevation && (
                  <div className="flex justify-between">
                    <span className="text-[#B8AEA1]/60">Farm Elevation:</span>
                    <span className="text-[#F5F0E8]">{activeModalItem.elevation}</span>
                  </div>
                )}
                {activeModalItem.process && (
                  <div className="flex justify-between">
                    <span className="text-[#B8AEA1]/60">Milling & Process:</span>
                    <span className="text-[#F5F0E8]">{activeModalItem.process}</span>
                  </div>
                )}
              </div>

              {/* Sensory Notes */}
              <div className="mb-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#B8AEA1]/70 block mb-2">
                  Cupping Tasting Notes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeModalItem.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1 bg-[#241812] border border-[#3A261D] rounded-full text-xs font-mono text-[#A85C43]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    toggleSave(activeModalItem.id, { stopPropagation: () => {} } as any);
                    setActiveModalItem(null);
                  }}
                  className="flex-1 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#A85C43] hover:bg-[#8F4E38] text-white rounded transition-colors text-center"
                >
                  {savedItems.includes(activeModalItem.id)
                    ? "Saved to Wishlist ✓"
                    : "Add to Tasting Wishlist"}
                </button>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-5 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#241812] hover:bg-[#2F2018] border border-[#3A261D] text-[#B8AEA1] rounded transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
