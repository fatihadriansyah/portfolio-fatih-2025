'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// IMPORT KOMPONEN (FluidBlob diganti Dither)
import Dither from "@/components/Dither"; // Pastikan file Dither.tsx sudah dibuat!
import AboutMe from "@/components/AboutMe";           
import SkillsGrid from "@/components/SkillsGrid";     
import Experience from "@/components/Experience";     
import SoftwareSkills from "@/components/SoftwareSkills"; 
import CreativeShowcase from "@/components/CreativeShowcase"; 
import ContactFooter from "@/components/ContactFooter"; 
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <ReactLenis root>
      <main className="flex min-h-screen flex-col bg-black text-white cursor-none selection:bg-purple-500 selection:text-white">
        
        <CustomCursor />
        <NoiseOverlay />

        {/* === 1. HERO SECTION === */}
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          
          {/* NAVBAR */}
          <nav className="absolute top-0 w-full p-6 md:p-8 flex justify-between items-center z-50">
            <h1 className="text-2xl font-bold tracking-tighter mix-blend-difference pointer-events-auto z-50">FATIH.</h1>
            <ul className="hidden md:flex gap-8 text-sm text-gray-400 font-medium items-center mix-blend-difference pointer-events-auto">
              <li className="hover:text-white transition-colors cursor-pointer"><Link href="#about">About</Link></li>
              <li className="hover:text-white transition-colors cursor-pointer"><Link href="/gallery">Gallery</Link></li>
              <li className="hover:text-white transition-colors cursor-pointer"><Link href="/novel">Anthology</Link></li>
              <li className="hover:text-white transition-colors cursor-pointer"><Link href="#contact">Contact</Link></li>
            </ul>
            <button onClick={toggleMenu} className="md:hidden text-white pointer-events-auto z-50 mix-blend-difference">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 md:hidden"
              >
                <MobileLink href="#about" onClick={toggleMenu}>About</MobileLink>
                <MobileLink href="/gallery" onClick={toggleMenu}>Gallery</MobileLink>
                <MobileLink href="/novel" onClick={toggleMenu}>Anthology</MobileLink>
                <MobileLink href="#contact" onClick={toggleMenu}>Contact</MobileLink>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HERO TEXT */}
          <div className="relative z-10 text-center mix-blend-difference px-4 flex flex-col items-center pointer-events-none select-none">
            <p className="text-xl mb-6 font-light tracking-[0.3em] text-gray-300 uppercase animate-pulse">
              Portfolio
            </p>
            <h1 className="text-6xl md:text-9xl font-bold leading-none tracking-tight text-white mb-2">
              Fatih Adriansyah
            </h1>
          </div>

          {/* === BACKGROUND BARU: DITHER (Pengganti Spline) === */}
          <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
             {/* waveColor: Format [R, G, B] dalam skala 0.0 - 1.0 
                Ungu Keren = [0.6, 0.2, 0.8] 
                disableAnimation={false} -> Biar gerak
             */}
             <Dither 
                waveColor={[0.6, 0.2, 0.8]} 
                disableAnimation={false}
                waveAmplitude={0.3}
                waveFrequency={3}
                waveSpeed={0.05}
             />
             <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
          </div>

          <div className="absolute bottom-10 animate-bounce text-xs tracking-widest text-gray-500 z-20 mix-blend-difference pointer-events-none">
            SCROLL TO EXPLORE
          </div>
        </div>

        {/* SECTIONS LAINNYA */}
        <div id="about" className="scroll-mt-20"><AboutMe /></div>
        <SkillsGrid />
        <Experience />
        <SoftwareSkills />
        <CreativeShowcase />
        <div id="contact"><ContactFooter /></div>

      </main>
    </ReactLenis>
  );
}

function MobileLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="text-4xl font-bold text-white hover:text-purple-500 transition-colors tracking-tighter z-50">
      {children}
    </Link>
  )
}

// Force update vercel