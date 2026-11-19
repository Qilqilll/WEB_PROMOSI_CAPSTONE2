"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Fitur", href: "#fitur" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Cara Pakai", href: "#cara-pakai" },
  { label: "Paket Harga", href: "#paket-harga" },
  { label: "Testimoni", href: "#testimoni" },
];

interface NavbarProps {
  onOpenPricing?: () => void;
}

export default function Navbar({ onOpenPricing }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaClick = () => {
    setMobileOpen(false);
    const el = document.getElementById("paket-harga");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (onOpenPricing) {
      onOpenPricing();
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#2A4D24]/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-[#2A4D24] border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo Brand with New User Image */}
            <a
              href="#beranda"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#beranda");
              }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border-2 border-white/40 shadow-sm shrink-0 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/logo-tanipintar.jpg"
                  alt="TaniPintar Logo"
                  width={38}
                  height={38}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-white font-bold text-lg leading-tight tracking-tight group-hover:text-[#E8A317] transition-colors"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  TaniPintar Bot
                </span>
                <span className="text-white/60 text-[10px] hidden sm:block">
                  Asisten Cerdas Pertanian di WhatsApp
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                const isPricing = link.href === "#paket-harga";
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 relative ${
                      isActive
                        ? "text-white bg-white/15"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    } ${isPricing ? "text-[#E8A317] font-bold" : ""}`}
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    {link.label}
                    {isPricing && (
                      <span className="ml-1 px-1.5 py-0.2 bg-[#E8A317] text-[#1A2416] text-[9px] font-extrabold rounded-full">
                        PROMO
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Desktop CTA: Paid Access to WhatsApp */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                onClick={handleCtaClick}
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md hover:scale-105 transition-all duration-200 flex items-center gap-2 border border-white/20"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Pilih Paket & Akses WA</span>
                <span className="bg-[#1A2416]/20 text-[10px] px-1.5 py-0.5 rounded-md font-semibold">
                  Mulai Rp 49rb
                </span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#2A4D24] border-t border-white/10 px-4 py-6 space-y-3 shadow-2xl animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                <span>{link.label}</span>
                {link.href === "#paket-harga" && (
                  <span className="bg-[#E8A317] text-[#1A2416] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Mulai Rp 49rb
                  </span>
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-white/10">
              <Button
                onClick={handleCtaClick}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-3.5 rounded-xl text-sm shadow-md flex items-center justify-center gap-2"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                <span>Dapatkan Akses Bot WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
