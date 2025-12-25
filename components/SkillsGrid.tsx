'use client';

import { motion } from 'framer-motion';
import { Camera, PenTool, Clapperboard, MonitorPlay, Aperture, Layers } from 'lucide-react';

const skills = [
  {
    title: "Photography",
    role: "Head of Dept.",
    description: "Deep passion for capturing moments using Sony A6000",
    icon: <Camera size={32} />,
    span: "col-span-1 md:col-span-2",
    bg: "bg-purple-900/20",
    border: "group-hover:border-purple-500/50"
  },
  {
    title: "Graphic Design",
    role: "Visual Communicator",
    description: "Crafting some design using Figma, Affinity by Canva, and Photoshop.",
    icon: <PenTool size={32} />,
    span: "col-span-1",
    bg: "bg-pink-900/20",
    border: "group-hover:border-pink-500/50"
  },
  {
    title: "Video Editing",
    role: "Content Creator",
    description: "Editing short-form videos using Capcut for social media.",
    icon: <Clapperboard size={32} />,
    span: "col-span-1",
    bg: "bg-blue-900/20",
    border: "group-hover:border-blue-500/50"
  },
  {
    title: "Event Management",
    role: "Volunteer/Leader",
    description: "Experienced in organizing and managing events from planning to execution.",
    icon: <Aperture size={32} />,
    span: "col-span-1 md:col-span-2",
    bg: "bg-emerald-900/20",
    border: "group-hover:border-emerald-500/50"
  }
];

export default function SkillsGrid() {
  return (
    <section className="w-full px-4 md:px-8 py-32 bg-black text-white relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
          >
            Skill <span className="text-gray-600">Set.</span>
          </motion.h2>
          <div className="h-1 w-20 bg-white rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`${skill.span} group relative p-8 rounded-3xl border border-zinc-800 ${skill.border} transition-all duration-500 overflow-hidden bg-zinc-900/40 hover:bg-zinc-900/80`}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${skill.bg} blur-2xl`} />
              
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-zinc-800/50 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                    {skill.icon}
                  </div>
                  <span className="text-xs font-mono text-gray-500 border border-gray-700 px-2 py-1 rounded-full uppercase">
                    {skill.role}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold mb-3 mt-8 tracking-tight">{skill.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                    {skill.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}