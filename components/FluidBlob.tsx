'use client';

import Spline from '@splinetool/react-spline';

export default function FluidBlob() {
  return (
    // LAYER 1: KUNCI UTAMA
    // 'pointer-events-none' membuat mouse/jari menembus area ini.
    <div className="w-full h-full pointer-events-none select-none relative">
      
      {/* LAYER 2: MODEL 3D (Link Baru yang Stabil) */}
      <Spline 
        // Ini link model Blob/Abstrak baru yang stabil dan ringan.
        // Karena model lama rusak, kita pakai yang ini sebagai pengganti terbaik.
        scene="https://prod.spline.design/kZDDjO5HuC9gjJnn/scene.splinecode"
      />
      
      {/* LAYER 3: PERISAI GAIB (Extra Protection) */}
      {/* Div kosong ini menutupi seluruh layar di atas Spline.
          Gunanya memastikan TIDAK ADA satu pun sentuhan yang lolos ke model 3D. */}
      <div 
         className="absolute inset-0 z-50 bg-transparent" 
         style={{ pointerEvents: 'auto', touchAction: 'none' }}
      ></div>

    </div>
  );
}