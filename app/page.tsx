'use client';

import Link from 'next/link';
import { ReactLenis } from '@studio-freight/react-lenis';

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
  return (
    <ReactLenis root>
      <main className="flex min-h-screen flex-col bg-black text-white cursor-none selection:bg-purple-500 selection:text-white">
        
        {/* === GLOBAL EFFECTS === */}
        <CustomCursor />
        <NoiseOverlay />

        {/* === 1. HERO SECTION === */}
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          
          {/* NAVBAR (UPDATED LINKS) */}
          <nav className="absolute top-0 w-full p-8 flex justify-between items-center z-20">
            <h1 className="text-2xl font-bold tracking-tighter mix-blend-difference">FATIH.</h1>
            <ul className="flex gap-8 text-sm text-gray-400 font-medium items-center mix-blend-difference">
              
              {/* LINK KE ABOUT (Scroll ke ID #about) */}
              <li className="hover:text-white transition-colors cursor-pointer">
                <Link href="#about">About</Link>
              </li>
              
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors cursor-pointer">
                  Gallery
                </Link>
              </li>

              <li>
                <Link href="/novel" className="hover:text-white transition-colors cursor-pointer">
                  Anthology
                </Link>
              </li>
              
              {/* LINK KE CONTACT (Scroll ke ID #contact) */}
              <li className="hover:text-white transition-colors cursor-pointer">
                <Link href="#contact">Contact</Link>
              </li>
            </ul>
          </nav>

          {/* HERO TEXT */}
          <div className="relative z-10 text-center mix-blend-difference px-4 flex flex-col items-center pointer-events-none">
            <p className="text-xl mb-6 font-light tracking-[0.3em] text-gray-300 uppercase animate-pulse">
              Visual & Code
            </p>
            <h1 className="text-6xl md:text-9xl font-bold leading-none tracking-tight text-white mb-2">
              Fatih<br />Adriansyah
            </h1>
          </div>

          {/* 3D BLOB (STATIC) */}
          <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
             <FluidBlob />
          </div>

          <div className="absolute bottom-10 animate-bounce text-xs tracking-widest text-gray-500 z-20 mix-blend-difference">
            SCROLL TO EXPLORE
          </div>
        </div>

        {/* === 2. ABOUT ME (DIBUNGKUS ID="about") === */}
        <div id="about" className="scroll-mt-20"> 
          {/* scroll-mt-20 memberi jarak sedikit di atas agar tidak terlalu mepet saat discroll */}
          <AboutMe />
        </div>

        {/* === 3. EXPERTISE (SKILLS) === */}
        <SkillsGrid />

        {/* === 4. EXPERIENCE (TIMELINE) === */}
        <Experience />

        {/* === 5. TECH STACK (SOFTWARE) === */}
        <SoftwareSkills />

        {/* === 6. SHOWCASE (GALLERY/VIDEO/DESIGN) === */}
        <CreativeShowcase />

        {/* === 7. FOOTER (DIBUNGKUS ID="contact") === */}
        <div id="contact">
          <ContactFooter /> 
        </div>

      </main>
    </ReactLenis>
  );
}