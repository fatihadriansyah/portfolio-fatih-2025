'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Layers, Image as ImageIcon, Smartphone } from 'lucide-react';

// === LIST VIDEO (11 ITEM) ===
const videos = [
  "/vid/1031.mp4",
  "/vid/1031_1.mp4",
  "/vid/1105_1.mp4",
  "/vid/Bag Spa.mp4", 
  "/vid/Retouch.mp4",
  "/vid/Repair Vetter.mp4",
  "/vid/1031.mp4",
  "/vid/1031_1.mp4",
  "/vid/1105_1.mp4",
  "/vid/Bag Spa.mp4",
  "/vid/Retouch.mp4",
];

// === LIST DESIGN (9 ITEM) ===
const designs = [
  "/des/GYJ Birthday.png",
  "/des/Isa Almasih.png", 
  "/des/Lebaran 2025.png",
  "/des/Nyepi.png",
  "/des/Paskah.png",
  "/des/GYJ Birthday.png", 
  "/des/Isa Almasih.png",
  "/des/Lebaran 2025.png",
  "/des/Nyepi.png",
];

export default function CreativeShowcase() {
  return (
    <section className="w-full bg-black text-white relative z-10">
      
      {/* PHOTOGRAPHY */}
      <PhotographySection />

      {/* VIDEO REEL (Auto-Measure Scroll) */}
      <HorizontalScrollSection 
        title="Video Editing" 
        subtitle="Vertical Short Form Content" 
        icon={<Smartphone size={24} color="#a855f7" />} 
        type="video"
      >
        {videos.map((src, i) => (
          <VideoCard key={i} src={src} />
        ))}
      </HorizontalScrollSection>

      {/* DESIGN (Auto-Measure Scroll) */}
      <HorizontalScrollSection 
        title="Graphic Designs" 
        subtitle="Flyers, Posters & Social Media" 
        icon={<Layers size={24} color="#3b82f6" />} 
        type="design"
      >
        {designs.map((src, i) => (
          <DesignCard key={i} src={src} index={i} />
        ))}
      </HorizontalScrollSection>

    </section>
  );
}

// === COMPONENT PHOTOGRAPHY (TETAP SAMA) ===
function PhotographySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/5 group">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <div className="absolute inset-0 bg-[url('/gallery/DSC03001.jpg')] bg-cover bg-center opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-[1.5s] ease-in-out grayscale group-hover:grayscale-0" />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />
      <div className="absolute inset-0 bg-black/30 z-0" />

      <div className="relative z-20 text-center p-8 mt-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center justify-center gap-3 mb-6 text-zinc-400 uppercase tracking-[0.3em] text-xs font-mono">
            <ImageIcon size={16} /> Photography Archive
          </div>
          <h2 className="text-5xl md:text-8xl font-bold mb-10 tracking-tighter drop-shadow-2xl">
            Frozen<br/>Moments.
          </h2>
          <Link href="/gallery">
            <button className="group relative px-10 py-4 bg-white text-black rounded-full font-bold tracking-widest overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <span className="relative z-10 flex items-center gap-2">VIEW FULL GALLERY <ArrowRight size={18} /></span>
              <div className="absolute inset-0 bg-purple-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">VIEW FULL GALLERY <ArrowRight size={18} /></span>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

// === SMART HORIZONTAL SCROLL (AUTO MEASURE) ===
function HorizontalScrollSection({ children, title, subtitle, icon, type }: any) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Logic: Ukur panjang konten vs lebar layar
  useEffect(() => {
    if (contentRef.current && targetRef.current) {
      const calculateScroll = () => {
        const contentWidth = contentRef.current?.scrollWidth || 0;
        const viewportWidth = window.innerWidth;
        // Jarak yang harus digeser = Panjang Konten - Lebar Layar + Padding Kanan (biar gak mepet)
        const totalDistance = contentWidth - viewportWidth + 100; 
        setScrollRange(totalDistance > 0 ? totalDistance : 0);
      };

      // Hitung saat pertama kali load
      calculateScroll();

      // Hitung ulang kalau layar di-resize
      window.addEventListener('resize', calculateScroll);
      return () => window.removeEventListener('resize', calculateScroll);
    }
  }, [children]); // Recalculate kalau isi children berubah

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform dari 0px ke -[scrollRange]px (Pixel Akurat)
  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollRange}px`]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-start justify-center flex-col overflow-hidden bg-black">
        
        {/* JUDUL */}
        <div className="w-full px-6 md:px-20 mb-8 md:mb-0 pt-20 md:pt-0 relative z-20 mix-blend-difference">
          <div className="flex items-center gap-4 border-l-4 pl-6 py-2" style={{ borderColor: type === 'video' ? '#a855f7' : '#3b82f6' }}>
            {icon}
            <div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-none">{title}</h3>
              <p className="text-xs md:text-sm text-zinc-400 tracking-widest mt-2 font-light">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* CONTAINER KONTEN (REF DITAMBAHKAN DISINI) */}
        <div className="w-full flex items-center mt-8 md:mt-12 px-6 md:px-20">
           {/* 'contentRef' akan mengukur panjang asli dari div ini */}
           <motion.div ref={contentRef} style={{ x }} className="flex gap-6 md:gap-10 items-center w-max">
             {children}
           </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 right-10 flex items-center gap-4 animate-pulse z-20 mix-blend-difference">
           <span className="text-xs tracking-widest text-zinc-500 uppercase">Scroll Down to Play</span>
           <div className="w-px h-12 bg-zinc-700" />
        </div>

      </div>
    </section>
  );
}

// === VIDEO CARD ===
function VideoCard({ src }: { src: string }) {
  return (
    <div className="relative h-[45vh] md:h-[60vh] aspect-[9/16] shrink-0 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 group shadow-2xl">
       <video 
         src={src}
         autoPlay 
         loop 
         muted 
         playsInline
         className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100"
       />
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 border border-white/20 shadow-lg">
            <Play fill="white" className="w-6 h-6 text-white ml-1" />
          </div>
       </div>
       <div className="absolute top-4 right-4 flex gap-2">
         <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] tracking-widest uppercase border border-white/10 text-white">
            Reels
         </div>
       </div>
    </div>
  );
}

// === DESIGN CARD ===
function DesignCard({ src, index }: { src: string, index: number }) {
  return (
    <div 
      className="relative h-[40vh] md:h-[55vh] shrink-0 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 group shadow-2xl"
      style={{ aspectRatio: '4/5' }}
    >
       <img 
         src={src} 
         alt="Design Work"
         className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
       />
       <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
       <span className="absolute -bottom-6 -right-2 text-[100px] font-bold text-white/5 leading-none select-none -z-10 group-hover:text-white/10 transition-colors font-mono">
          0{index + 1}
       </span>
    </div>
  );
}