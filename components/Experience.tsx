'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Heart, ChevronDown, ChevronUp, Calendar, MapPin } from 'lucide-react';

// --- DATA ORGANISASI (Timeline Vertikal) ---
const organizations = [
  {
    role: "Head of Dept. Photography",
    org: "Multimedia JGU",
    period: "Oct 2025 - Present",
    desc: "Leading department projects, developing weekly educational workshops on photography techniques, and managing member development."
  },
  {
    role: "Staff of Media & Information",
    org: "HIMATIF JGU",
    period: "Oct 2024 - Present",
    desc: "Managing external image & documenting organizational events for publication material."
  },
  {
    role: "Staff of Photography",
    org: "Multimedia JGU",
    period: "Oct 2024 - Oct 2025",
    desc: "Assisted in documentation of key university events and exhibitions."
  }
];

// --- DATA VOLUNTEER (Grid dengan Load More) ---
// Data diambil dan disesuaikan dari file index.html lama Fatih-sama
const volunteers = [
  {
    role: "Crowd Control Division",
    event: "Animeverse Festival 2025",
    date: "7 Dec 2025",
    desc: "Managed ticketing queue and crowd flow, ensuring efficient access control for thousands of visitors."
  },
  {
    role: "Documentation Team",
    event: "Conferences on Indonesia Foreign Policy",
    date: "29 Nov 2025",
    desc: "Captured exclusive moments in the VIP Lounge, documenting high-profile figures including Ministers."
  },
  {
    role: "Documentation Team",
    event: "ADGI Design Week 2025",
    date: "19 & 23 Nov 2025",
    desc: "Documented the visual journey of the event, covering both opening and closing ceremonies."
  },
  // --- ITEM DI BAWAH INI AKAN DISEMBUNYIKAN AWALNYA ---
  {
    role: "Ticketing Staff",
    event: "Comic Frontier 21",
    date: "15 - 16 Nov 2025",
    desc: "Managed visitor flow at the ticketing area and assisted with ticket redemption."
  },
  {
    role: "Documentation Team",
    event: "Connect 4 Change Summit 2025",
    date: "21 Oct 2025",
    desc: "Served as dedicated photographer for the Impact Room, capturing audience engagement."
  },
  {
    role: "Documentation Team",
    event: "Temu Pendidik Nusantara 12",
    date: "11 - 12 Oct 2025",
    desc: "Documented activities at the RSG Stage, capturing interactions of speakers and volunteers."
  },
  {
    role: "Documentation Team",
    event: "ASEAN for the People",
    date: "4 - 5 Oct 2025",
    desc: "Captured moments across multiple venues and photographed prominent figures."
  },
  {
    role: "Security & Guard",
    event: "Chibicon Jakarta 2025",
    date: "2 - 3 Aug 2025",
    desc: "Stationed at entrance gate to manage security checks and ticket verification."
  },
  {
    role: "Documentation Team",
    event: "Otakuwave Vol.2",
    date: "27 Jul 2025",
    desc: "Official photographer for the main stage."
  },
  {
    role: "Documentation Team",
    event: "Indonesia Net Zero Summit",
    date: "26 Jul 2025",
    desc: "Official photographer for the main ballroom, capturing international speakers."
  },
    {
    role: "Ticketing Staff",
    event: "Comic Frontier XX",
    date: "24 - 25 May 2025",
    desc: "Managed visitor flow at the ticketing area and assisted with ticket redemption."
  },
  {
    role: "Liaison Officer",
    event: "COSUFESTO 2023",
    date: "2023",
    desc: "Managed Guest Star schedules and needs, ensuring security in the VIP room."
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'org' | 'vol'>('org');
  const [showAllVolunteers, setShowAllVolunteers] = useState(false);

  // Filter volunteer: Tampilkan 3 jika showAllVolunteers false, tampilkan semua jika true
  const visibleVolunteers = showAllVolunteers ? volunteers : volunteers.slice(0, 3);

  return (
    <section className="bg-black text-white py-32 relative z-10 overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HEADER & TABS */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
              Journey <span className="text-zinc-600">&</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
                Milestones.
              </span>
            </h2>
          </div>

          {/* INTERACTIVE TAB SWITCHER */}
          <div className="bg-zinc-900/50 p-1 rounded-full border border-white/10 backdrop-blur-md flex">
            <button
              onClick={() => setActiveTab('org')}
              className={`relative px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${activeTab === 'org' ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              {activeTab === 'org' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="flex items-center gap-2"><Briefcase size={16}/> Organization</span>
            </button>

            <button
              onClick={() => setActiveTab('vol')}
              className={`relative px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${activeTab === 'vol' ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              {activeTab === 'vol' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="flex items-center gap-2"><Heart size={16}/> Volunteer</span>
            </button>
          </div>
        </div>


        {/* CONTENT AREA */}
        <div className="min-h-[500px]"> {/* Min-height agar tidak layout shift drastis */}
          <AnimatePresence mode="wait">
            
            {/* === TAB 1: ORGANIZATION (Timeline) === */}
            {activeTab === 'org' ? (
              <motion.div
                key="org"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="relative border-l border-zinc-800 ml-4 md:ml-0 space-y-16 py-8"
              >
                {organizations.map((item, index) => (
                  <div key={index} className="relative pl-12 md:pl-24 group">
                    {/* Dot Indikator */}
                    <div className="absolute left-[-5px] top-2 w-3 h-3 bg-zinc-600 rounded-full group-hover:bg-purple-500 group-hover:scale-150 transition-all duration-300 ring-4 ring-black" />
                    
                    <div className="flex flex-col md:flex-row gap-2 md:items-baseline justify-between mb-2">
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {item.role}
                      </h3>
                      <span className="font-mono text-sm text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">{item.period}</span>
                    </div>
                    
                    <p className="text-xl text-zinc-400 font-medium mb-4">{item.org}</p>
                    <p className="text-zinc-500 leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            ) : (
              
            /* === TAB 2: VOLUNTEER (Grid + Load More) === */
              <motion.div
                key="vol"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {visibleVolunteers.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }} // Stagger animation
                        className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/60 hover:border-purple-500/30 transition-all duration-300 group"
                      >
                         <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-zinc-800/50 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                                <Heart size={20} />
                            </div>
                            <span className="text-xs font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded bg-black">
                                {item.date}
                            </span>
                         </div>
                         
                         <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors">
                            {item.role}
                         </h3>
                         <p className="text-sm font-medium text-zinc-400 mb-4 flex items-center gap-2">
                            <MapPin size={12}/> {item.event}
                         </p>
                         <div className="h-px w-full bg-white/5 mb-4"/>
                         <p className="text-sm text-zinc-500 leading-relaxed">
                            {item.desc}
                         </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* LOAD MORE BUTTON */}
                <div className="mt-12 flex justify-center">
                   <button 
                     onClick={() => setShowAllVolunteers(!showAllVolunteers)}
                     className="group flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-zinc-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
                   >
                      {showAllVolunteers ? (
                        <>Show Less <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform"/></>
                      ) : (
                        <>View All Experience <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform"/></>
                      )}
                   </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}