'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Logic Mouse Position (Inline)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Plain Text untuk Layer Background (Gelap)
  const bioText = "A proactive and creative Informatics Engineering student at Jakarta Global University with a strong foundation in photography, graphic design, and event management. Proven ability to lead teams and manage projects from concept to execution through extensive experience in university committees and as a volunteer for national-scale events. Eager to apply technical knowledge and creative skills in a challenging internship or project-based role that bridges technology and creative media";

  return (
    <section className="w-full bg-black py-32 px-4 md:px-8 relative overflow-hidden">
        
        <div className="max-w-4xl mx-auto relative">
            
            {/* LABEL */}
            <div className="mb-10 flex items-center gap-4">
                <span className="h-px w-10 bg-purple-500"></span>
                <h2 className="text-purple-500 font-mono text-sm tracking-widest uppercase">About Me</h2>
            </div>

            {/* CONTAINER UTAMA */}
            <div 
                ref={containerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                className="relative cursor-default"
            >
                
                {/* LAYER 1: TEKS GELAP (Background) */}
                <p className="text-2xl md:text-4xl font-bold leading-tight text-zinc-800 select-none text-justify">
                    {bioText}
                </p>

                {/* LAYER 2: TEKS TERANG (Foreground - Masked) */}
                <motion.div 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    animate={{
                        WebkitMaskPosition: `${mousePos.x - 200}px ${mousePos.y - 200}px`,
                        WebkitMaskSize: "400px 400px",
                    }as any}
                    transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
                    style={{
                        maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
                        WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)",
                        WebkitMaskRepeat: "no-repeat",
                    }}
                >
                    <p className="text-2xl md:text-4xl font-bold leading-tight text-white text-justify">
                        A <span className="text-purple-400">proactive and creative</span> Informatics Engineering student at Jakarta Global University with a strong foundation in <span className="text-purple-400">photography</span>, <span className="text-purple-400">graphic design</span>, and <span className="text-purple-400">event management</span>. Proven ability to lead teams and manage projects from concept to execution through extensive experience in university committees and as a volunteer for national-scale events. Eager to apply technical knowledge and creative skills in a challenging internship or project-based role that bridges technology and creative media
                    </p>
                </motion.div>

                {/* HIDDEN MESSAGE */}
                <motion.div 
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isHovered ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -bottom-10 left-0 text-zinc-600 text-xs tracking-widest uppercase mt-8"
                >
                    ( Hover to illuminate )
                </motion.div>

            </div>

            {/* STATS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-white/10 pt-10">
                <StatItem label="Years Exp." value="01+" />
                <StatItem label="Volunteers" value="10+" />
                <StatItem label="Photos Taken" value="10k+" />
                <StatItem label="Matcha/Day" value="∞" />
            </div>

        </div>
    </section>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
    return (
        <div>
            <h4 className="text-3xl font-bold text-white mb-1">{value}</h4>
            <p className="text-zinc-500 text-xs uppercase tracking-wider">{label}</p>
        </div>
    )
}