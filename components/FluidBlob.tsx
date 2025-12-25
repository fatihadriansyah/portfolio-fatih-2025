'use client'; 

import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, OrbitControls } from '@react-three/drei';

const Blob = () => {
  return (
    <Sphere args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#4C1D95"       // Saya gelapkan sedikit ungunya agar teks lebih terbaca
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.1}
      />
    </Sphere>
  );
};

export default function FluidBlob() {
  return (
    // PERBAIKAN DI SINI: Ubah h-[500px] menjadi h-full
    <div className="h-full w-full relative flex items-center justify-center">
      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <Blob />
        {/* Zoom dimatikan agar user tidak sengaja nge-zoom saat scroll */}
        <OrbitControls enableZoom={false} enablePan={false} /> 
      </Canvas>
    </div>
  );
}