import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface FloatingObject {
  id: number;
  type: 'pen' | 'pencil' | 'clip' | 'book' | 'compass' | 'star';
  x: number; // percentage
  y: number; // percentage
  size: number; // pixels
  blur: number; // blur intensity
  duration: number; // animation duration
  delay: number; // animation delay
  opacity: number;
  rotation: number;
  speedMultiplier: number;
}

interface GoldDustItem {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  duration: string;
  delay: string;
}

export default function Background3D() {
  const [objects, setObjects] = useState<FloatingObject[]>([]);
  const [goldDust, setGoldDust] = useState<GoldDustItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse positions for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for ultra-smooth 3D parallax drift
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  // Top-level parallax layers for different depths
  const depthX1 = useTransform(springX, (val) => val * 0.4);
  const depthY1 = useTransform(springY, (val) => val * 0.4);

  const depthX2 = useTransform(springX, (val) => val * 0.8);
  const depthY2 = useTransform(springY, (val) => val * 0.8);

  const depthX3 = useTransform(springX, (val) => val * 1.3);
  const depthY3 = useTransform(springY, (val) => val * 1.3);

  const getParallaxX = (multiplier: number) => {
    if (multiplier < 0.8) return depthX1;
    if (multiplier < 1.3) return depthX2;
    return depthX3;
  };

  const getParallaxY = (multiplier: number) => {
    if (multiplier < 0.8) return depthY1;
    if (multiplier < 1.3) return depthY2;
    return depthY3;
  };

  useEffect(() => {
    // Generate distinct background elements with varying sizes, depths, and animation cycles
    const items: FloatingObject[] = [
      { id: 1, type: 'pen', x: 8, y: 15, size: 42, blur: 0.5, duration: 22, delay: 0, opacity: 0.15, rotation: 15, speedMultiplier: 1.2 },
      { id: 2, type: 'pencil', x: 84, y: 18, size: 36, blur: 1, duration: 18, delay: 2, opacity: 0.12, rotation: -30, speedMultiplier: 0.8 },
      { id: 3, type: 'clip', x: 78, y: 72, size: 26, blur: 0, duration: 15, delay: 1, opacity: 0.22, rotation: 45, speedMultiplier: 1.5 },
      { id: 4, type: 'book', x: 6, y: 78, size: 50, blur: 1.5, duration: 25, delay: 3, opacity: 0.10, rotation: -12, speedMultiplier: 0.6 },
      { id: 5, type: 'compass', x: 42, y: 85, size: 38, blur: 0.5, duration: 20, delay: 4, opacity: 0.14, rotation: 60, speedMultiplier: 1.0 },
      { id: 6, type: 'star', x: 22, y: 48, size: 15, blur: 0, duration: 12, delay: 5, opacity: 0.25, rotation: 0, speedMultiplier: 1.8 },
      { id: 7, type: 'clip', x: 48, y: 22, size: 22, blur: 0, duration: 14, delay: 1.5, opacity: 0.18, rotation: -45, speedMultiplier: 1.4 },
      { id: 8, type: 'pen', x: 92, y: 50, size: 38, blur: 1.2, duration: 24, delay: 0.5, opacity: 0.11, rotation: 75, speedMultiplier: 0.9 },
    ];
    setObjects(items);

    // Stably generate gold dust stars once to avoid Math.random on render
    const dustItems: GoldDustItem[] = Array.from({ length: 12 }, (_, i) => {
      const size = Math.random() * 3 + 1.5;
      return {
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        width: size,
        height: size,
        duration: `${Math.random() * 6 + 5}s`,
        delay: `${Math.random() * 4}s`,
      };
    });
    setGoldDust(dustItems);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const normX = (e.clientX / width) - 0.5;
      const normY = (e.clientY / height) - 0.5;
      
      mouseX.set(normX * 35); // Gentle parallax horizontal shift
      mouseY.set(normY * 35); // Gentle parallax vertical shift
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const renderIcon = (type: FloatingObject['type']) => {
    switch (type) {
      case 'pen':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[#D4AF37]">
            <path d="m14.5 12.5-8 8H3.5v-3l8-8M12.5 4.5l7 7M16.5 2.5l5 5-2.5 2.5-5-5-2.5 2.5" />
          </svg>
        );
      case 'pencil':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[#D4AF37] opacity-80">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        );
      case 'clip':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[#D4AF37] opacity-90">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        );
      case 'book':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[#D4AF37]">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
            <path d="M6 6h10M6 10h10" />
          </svg>
        );
      case 'compass':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[#D4AF37]">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        );
      case 'star':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-[#D4AF37]">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Warm soft study desk lamp glow that tracks the pointer */}
      <motion.div 
        style={{
          x: springX,
          y: springY,
        }}
        className="absolute left-1/3 top-1/4 w-[75vw] h-[75vw] max-w-[700px] max-h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-[rgba(212,175,55,0.05)] via-[rgba(212,175,55,0.015)] to-transparent blur-3xl"
      />

      <div className="absolute right-10 top-1/3 w-[500px] h-[500px] rounded-full bg-radial from-[rgba(212,175,55,0.03)] to-transparent blur-3xl" />
      <div className="absolute left-10 bottom-1/4 w-[400px] h-[400px] rounded-full bg-radial from-[rgba(212,175,55,0.02)] to-transparent blur-3xl" />

      {/* Grid pattern backdrop for technical blueprint accuracy */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212,175,55,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212,175,55,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Floating interactive depth objects */}
      {objects.map((obj) => (
        <motion.div
          key={obj.id}
          style={{
            left: `${obj.x}%`,
            top: `${obj.y}%`,
            width: obj.size,
            height: obj.size,
            filter: `blur(${obj.blur}px)`,
            opacity: obj.opacity,
            x: getParallaxX(obj.speedMultiplier),
            y: getParallaxY(obj.speedMultiplier),
          }}
          className="absolute"
        >
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [obj.rotation, obj.rotation + 8, obj.rotation - 8, obj.rotation],
            }}
            transition={{
              duration: obj.duration,
              repeat: Infinity,
              delay: obj.delay,
              ease: "easeInOut"
            }}
            className="w-full h-full"
          >
            {renderIcon(obj.type)}
          </motion.div>
        </motion.div>
      ))}

      {/* Floating background gold dust */}
      <div className="absolute inset-0">
        {goldDust.map((dust) => (
          <div
            key={dust.id}
            className="absolute rounded-full bg-[#D4AF37] opacity-15 animate-ping"
            style={{
              left: `${dust.left}%`,
              top: `${dust.top}%`,
              width: `${dust.width}px`,
              height: `${dust.height}px`,
              animationDuration: dust.duration,
              animationDelay: dust.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
