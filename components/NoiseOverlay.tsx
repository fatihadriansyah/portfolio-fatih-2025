export default function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[50] h-full w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-100 contrast-150 grayscale"></div>
    </div>
  );
}