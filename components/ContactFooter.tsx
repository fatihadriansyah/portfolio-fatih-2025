'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

export default function ContactFooter() {
  const [time, setTime] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Logic untuk Jam Jakarta
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Jakarta', 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Logic untuk Copy Email
  const handleCopy = () => {
    // Pastikan email ini sesuai keinginan Fatih-sama
    navigator.clipboard.writeText('muhammadfatih1629@gmail.com'); 
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full bg-zinc-950 text-white py-32 px-4 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center z-10 relative">
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-purple-400 font-medium tracking-widest mb-8 uppercase"
        >
          What's Next?
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-12"
        >
          Let's work <br /> together.
        </motion.h2>

        {/* MAGNETIC BUTTON AREA */}
        <MagneticButton onClick={handleCopy} copied={copied} />

        {/* Footer Info */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-32 border-t border-zinc-800 pt-8 text-zinc-500 text-sm">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-4 md:mb-0">
            <span>© 2025 Fatih Portfolio</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
              Jakarta, IDN — {time}
            </span>
          </div>
          
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/muhammad-fatih-adriansyah-720095342/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/fatih.adriansyah/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>

      </div>
    </section>
  );
}

// Komponen Kecil: Tombol Magnetis (FIXED RESPONSIVE)
function MagneticButton({ onClick, copied }: { onClick: () => void, copied: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    // Pengecekan null safety
    if (!ref.current) return;
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };
    
    x.set(distance.x * 0.35);
    y.set(distance.y * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: mouseX, y: mouseY }}
      // PERBAIKAN DI SINI:
      // text-sm md:text-xl -> Font kecil di HP, Besar di PC
      // px-6 py-4 md:px-10 md:py-6 -> Padding kecil di HP, Besar di PC
      // max-w-[90vw] -> Menjamin tombol tidak akan pernah lebih lebar dari layar HP (aman 90%)
      className="relative group flex items-center justify-center gap-2 md:gap-4 bg-white text-black px-6 py-4 md:px-10 md:py-6 rounded-full text-xs sm:text-sm md:text-xl font-bold hover:scale-105 transition-transform duration-300 max-w-[90vw]"
    >
      <span className="relative z-10 flex items-center gap-2 md:gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
        {copied ? (
          <>Email Copied! <Check size={18} className="md:w-5 md:h-5" /></>
        ) : (
          <>muhammadfatih1629@gmail.com <Copy size={18} className="md:w-5 md:h-5" /></>
        )}
      </span>
      {/* Circle Fill Effect on Hover */}
      <div className="absolute inset-0 bg-purple-500 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 z-0 opacity-20" />
    </motion.button>
  );
}