'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useState } from 'react';

// DATA SOFTWARE (Clean: Tanpa Ikon)
const softwares = [
  { name: "Adobe Lightroom", percent: 98 },
  { name: "Adobe Photoshop", percent: 90 },
  { name: "Figma", percent: 92 },
  { name: "CapCut", percent: 95 },
  { name: "Affinity Designer", percent: 85 },
  { name: "Canva", percent: 96 },
];

export default function SoftwareSkills() {
  return (
    // PERBAIKAN: Padding container utama disesuaikan agar konsisten
    <section className="w-full bg-black text-white relative z-10 py-32">
      
      {/* PERBAIKAN: Ubah max-w-5xl menjadi max-w-7xl agar rata kiri dengan section lain */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-purple-500/20 pb-8 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
              Technical Stack.
            </h2>
            <p className="text-zinc-500 max-w-md font-light">
              The precision tools I use to craft digital experiences.
            </p>
          </div>
          <div className="hidden md:block text-purple-500/50 font-mono text-xs tracking-widest uppercase animate-pulse mb-2">
            // Proficiency Level
          </div>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {softwares.map((tech, index) => (
            <SpotlightCard key={index} tech={tech} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

// === KOMPONEN KARTU (CLEAN VERSION) ===
function SpotlightCard({ tech, index }: { tech: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [count, setCount] = useState(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className="group relative border border-white/5 bg-zinc-900/40 rounded-xl overflow-hidden px-8 py-10"
      onViewportEnter={() => {
        let start = 0;
        const end = tech.percent;
        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start >= end) clearInterval(timer);
        }, 2000 / end);
      }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.15), 
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative flex flex-col h-full justify-between gap-6 z-10">
        <div>
           <h3 className="text-2xl font-bold text-zinc-400 group-hover:text-white transition-colors duration-500 tracking-tight">
            {tech.name}
          </h3>
        </div>

        <div className="w-full">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs text-zinc-600 font-mono tracking-widest uppercase group-hover:text-purple-400 transition-colors">Mastery</span>
            <span className="text-3xl font-bold text-white tabular-nums">{count}%</span>
          </div>
          
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${tech.percent}%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-full bg-white group-hover:bg-purple-500 shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-500"
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
}