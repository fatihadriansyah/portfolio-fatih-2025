'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: "Mini Lightroom Pro",
    category: "Python Development",
    year: "2025",
    description: "Aplikasi pemrosesan citra digital dengan algoritma kustom."
  },
  {
    title: "UKM Multimedia",
    category: "Photography Dept",
    year: "2024",
    description: "Memimpin departemen fotografi dan manajemen pameran visual."
  },
  {
    title: "Network Sim",
    category: "Cisco Packet Tracer",
    year: "2024",
    description: "Simulasi topologi jaringan Ring dan manajemen IP Address."
  },
  {
    title: "Mochi Cleanique",
    category: "Social Media Specialist",
    year: "2025",
    description: "Content creation dan strategi media sosial untuk brand."
  }
];

export default function ProjectList() {
  return (
    <section className="w-full px-8 py-32 bg-black z-20 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Judul Section */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-20 text-white border-b border-gray-800 pb-8"
        >
          Selected Works <span className="text-sm font-normal text-gray-500">(04)</span>
        </motion.h2>

        {/* List Project */}
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative border-t border-gray-800 py-12 hover:bg-zinc-900/30 transition-colors duration-500 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row justify-between items-baseline md:items-center">
                <h3 className="text-3xl md:text-5xl font-bold text-gray-400 group-hover:text-white group-hover:translate-x-4 transition-all duration-300">
                  {project.title}
                </h3>
                <div className="flex gap-4 md:gap-12 text-sm md:text-base text-gray-600 group-hover:text-gray-400 transition-colors mt-4 md:mt-0">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>
              <p className="mt-4 text-gray-500 max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}