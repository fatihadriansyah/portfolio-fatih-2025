'use client';

import { useState } from 'react'; // Tambah useState
import Link from 'next/link';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Menu, X } from 'lucide-react'; // Import Icon Menu
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence

// IMPORT SEMUA KOMPONEN
import FluidBlob from "@/components/FluidBlob";
import AboutMe from "@/components/AboutMe";           
import SkillsGrid from "@/components/SkillsGrid";     
import Experience from "@/components/Experience";     
import SoftwareSkills from "@/components/SoftwareSkills"; 
import CreativeShowcase from "@/components/CreativeShowcase"; 
import ContactFooter from "@/components/ContactFooter"; 
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";

export default function Home() {
  // STATE UNTUK MENU MOBILE
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <ReactLenis root>
      <main className="flex min-h-screen flex-col bg-black text-white cursor-none selection:bg-purple-500 selection:text-white">
        
        {/* === GLOBAL EFFECTS === */}
        <CustomCursor />
        <NoiseOverlay />

        {/* === 1. HERO SECTION === */}
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          
          {/* NAVBAR */}
          <nav className="absolute top-0 w-full p-6 md:p-8 flex justify-between items-center z-50">
            {/* LOGO */}
            <h1 className="text-2xl font-bold tracking-tighter mix-blend-difference pointer-events-auto z-50">FATIH.</h1>
            
            {/* MENU DESKTOP (Hanya muncul di Layar Besar) */}
            <ul className="hidden md:flex gap-8 text-sm text-gray-400 font-medium items-center mix-blend-difference pointer-events-auto">
              <li className="hover:text-white transition-colors cursor-pointer"><Link href="#about">About</Link></li>
              <li className="hover:text-white transition-colors cursor-pointer"><Link href="/gallery">Gallery</Link></li>
              <li className="hover:text-white transition-colors cursor-pointer"><Link href="/novel">Anthology</Link></li>
              <li className="hover:text-white transition-colors cursor-pointer"><Link href="#contact">Contact</Link></li>
            </ul>

            {/* TOMBOL HAMBURGER (Hanya muncul di HP) */}
            <button 
              onClick={toggleMenu}
              className="md:hidden text-white pointer-events-auto z-50 mix-blend-difference"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* === MOBILE MENU OVERLAY (Layar Penuh saat dibuka) === */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 md:hidden"
              >
                {/* Background Blob Samar di Menu */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <FluidBlob />
                </div>

                {/* Link Menu Mobile (Font Besar) */}
                <MobileLink href="#about" onClick={toggleMenu}>About</MobileLink>
                <MobileLink href="/gallery" onClick={toggleMenu}>Gallery</MobileLink>
                <MobileLink href="/novel" onClick={toggleMenu}>Anthology</MobileLink>
                <MobileLink href="#contact" onClick={toggleMenu}>Contact</MobileLink>

                <div className="absolute bottom-10 text-xs text-zinc-600 tracking-widest uppercase">
                    Fatih Adriansyah © 2025
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HERO TEXT */}
          <div className="relative z-10 text-center mix-blend-difference px-4 flex flex-col items-center pointer-events-none">
            <p className="text-xl mb-6 font-light tracking-[0.3em] text-gray-300 uppercase animate-pulse">
              Visual & Code
            </p>
            <h1 className="text-6xl md:text-9xl font-bold leading-none tracking-tight text-white mb-2">
              Fatih<br />Adriansyah
            </h1>
          </div>

          {/* 3D BLOB (Background) */}
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
             <FluidBlob />
          </div>

          <div className="absolute bottom-10 animate-bounce text-xs tracking-widest text-gray-500 z-20 mix-blend-difference pointer-events-none">
            SCROLL TO EXPLORE
          </div>
        </div>

        {/* === SECTIONS LAINNYA === */}
        <div id="about" className="scroll-mt-20"> 
          <AboutMe />
        </div>
        <SkillsGrid />
        <Experience />
        <SoftwareSkills />
        <CreativeShowcase />
        <div id="contact">
          <ContactFooter /> 
        </div>

      </main>
    </ReactLenis>
  );
}

// Komponen Kecil untuk Link Mobile biar rapi
function MobileLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="text-4xl font-bold text-white hover:text-purple-500 transition-colors tracking-tighter z-50"
    >
      {children}
    </Link>
  )
}