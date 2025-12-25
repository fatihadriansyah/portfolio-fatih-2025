'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ReactLenis } from '@studio-freight/react-lenis';
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";

// --- PENTING: PENGATURAN FOTO ---
// Saya membagi foto Fatih-sama ke dalam 4 Kolom secara acak.
// TUGAS FATIH-SAMA: Pindahkan nama file di bawah ini sesuai keinginan.
// Tips: Campur foto Portrait dan Landscape di setiap kolom agar terlihat estetik (Zig-zag).

const column1 = [
  "/gallery/DSC09730.jpg", // Portrait (Upacara Bendera)
  "/gallery/DSC03001.jpg", 
  "/gallery/DSC06204_1.jpg",
  "/gallery/DSC02251.jpg", // Landscape (Traffic Light)
  "/gallery/DSC09645.jpg",
];

const column2 = [
  "/gallery/IMG_20251126_144725.jpg", // Portrait (Lampu Merah/Jingga)
  "/gallery/DSC03289_1.jpg",
  "/gallery/DSC06086.jpg", 
  "/gallery/DSC00410.jpg", // Landscape (Mobil BYD)
  "/gallery/DSC03698.jpg",
];

const column3 = [
  "/gallery/IMG_20250831_231920.jpg", // Portrait (Orang bawa bendera)
  "/gallery/DSC03020.jpg",
  "/gallery/DSC06237.jpg",
  "/gallery/DSC00543.jpg", // Landscape (Spiderman)
  "/gallery/DSC03663.jpg",
];

const column4 = [
  "/gallery/DSC04595_1.jpg", // Portrait
  "/gallery/DSC06254.jpg",
  "/gallery/DSC09979.jpg", // Landscape (Mobil Putih)
  "/gallery/DSC09730.jpg", // Duplicate untuk efek panjang
  "/gallery/DSC02251.jpg",
];

export default function GalleryPage() {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  // LOGIC PARALLAX EXTREME
  // Semakin besar angka minus, semakin cepat gerakannya.
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 0]);      // Normal
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -1000]);  // Cepat
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -500]);   // Sedang
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -1500]);  // Sangat Cepat (Super Velocity)

  return (
    <ReactLenis root>
      <main className="bg-[#050505] min-h-screen cursor-none text-white overflow-x-hidden selection:bg-purple-500 selection:text-white">
        
        <CustomCursor />
        <NoiseOverlay />

        {/* HEADER FIXED */}
        <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-start mix-blend-difference pointer-events-none">
          <Link href="/" className="pointer-events-auto flex items-center gap-3 hover:opacity-70 transition-opacity group">
            <div className="p-2 border border-white/20 rounded-full bg-black/20 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all">
               <ArrowLeft size={20} />
            </div>
            <span className="font-bold tracking-[0.2em] uppercase text-sm">Home</span>
          </Link>
          
          <div className="text-right hidden md:block">
            <h1 className="text-4xl font-bold tracking-tighter leading-none">ARCHIVE</h1>
            <p className="text-xs tracking-[0.5em] text-gray-400 mt-2">2024 — 2025</p>
          </div>
        </nav>

        {/* CONTAINER UTAMA */}
        {/* Kita hapus h-[350vh] dan biarkan konten yang menentukan tinggi, ditambah padding bawah yang besar */}
        <div ref={container} className="relative w-full min-h-screen bg-[#050505] pt-[15vh] pb-[20vh]">
          
          <div className="max-w-[1920px] mx-auto px-4 md:px-8 flex gap-4 md:gap-8 items-start">
            
            {/* COLUMN 1 (Normal Speed) */}
            <Column images={[...column1, ...column1]} y={y1} />
            
            {/* COLUMN 2 (Fast Speed) - Turunkan posisi awal agar tidak rata (mt-20) */}
            <Column images={[...column2, ...column2]} y={y2} className="mt-20 md:mt-40" />
            
            {/* COLUMN 3 (Medium Speed) */}
            <Column images={[...column3, ...column3]} y={y3} className="hidden md:flex mt-0 md:mt-10" />

            {/* COLUMN 4 (Super Fast) - Hidden di mobile/tablet */}
            <Column images={[...column4, ...column4]} y={y4} className="hidden lg:flex mt-60" />

          </div>

        </div>

        {/* FOOTER MESSAGE - Benar-benar di paling bawah */}
        <div className="relative z-10 w-full h-[40vh] flex flex-col items-center justify-center bg-gradient-to-t from-black to-transparent pointer-events-none">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             transition={{ duration: 1 }}
             className="text-center"
           >
             <p className="text-zinc-700 text-xs tracking-[1em] uppercase mb-4">The End</p>
             <h2 className="text-5xl md:text-8xl font-bold text-zinc-900 tracking-tighter uppercase">Fatih<br/>Gallery.</h2>
           </motion.div>
        </div>

      </main>
    </ReactLenis>
  );
}

// COMPONENT PHOTO ITEM
// Menggunakan <img /> biasa agar aspect ratio terjaga (Portrait tetap Portrait)
const Column = ({ images, y, className }: { images: string[], y: any, className?: string }) => {
  return (
    <motion.div 
      style={{ y }} 
      className={`relative w-full flex flex-col gap-6 md:gap-12 min-w-[45%] md:min-w-[30%] lg:min-w-[23%] ${className}`}
    >
      {images.map((src, i) => (
        <div key={i} className="group relative w-full mb-4">
          
          {/* FOTO */}
          <motion.div
             whileHover={{ scale: 0.95 }}
             transition={{ duration: 0.4, ease: "circOut" }}
             className="relative overflow-hidden rounded-sm"
          >
            {/* Class 'w-full h-auto' akan menjaga rasio asli foto (Portrait/Landscape aman) */}
            <img 
              src={src} 
              alt="Gallery Shot" 
              loading="lazy"
              className="w-full h-auto object-cover grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-700 ease-in-out"
            />
          </motion.div>

          {/* TEKS HOVER (Optional) */}
          <div className="absolute -bottom-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-[10px] tracking-widest text-gray-500 uppercase">
              IMG_0{i + 1}
            </span>
          </div>

        </div>
      ))}
    </motion.div>
  )
}