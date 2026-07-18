import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pencil, Sparkles, BookOpen } from 'lucide-react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [percent, setPercent] = useState(0);
  const [stage, setStage] = useState<'loading' | 'notebook' | 'finished'>('loading');

  // Stage 1: Percentage increment loop
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setStage('notebook');
        }, 600); // Wait briefly at 100%
      }
      setPercent(current);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Stage 2: Notebook Opening timeout
  useEffect(() => {
    if (stage === 'notebook') {
      const timer = setTimeout(() => {
        setStage('finished');
        setTimeout(() => {
          onComplete();
        }, 800); // Allow fadeout animation to complete
      }, 4200); // Read time for notebook pages
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'finished' && (
        <motion.div
          key="opening-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[120] bg-[#FAF8F2] bg-grid-paper flex items-center justify-center overflow-hidden"
        >
          {/* Subtle paper dust floating effect */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#D4AF37]/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 4 + 2}s`,
                }}
              />
            ))}
          </div>

          <div className="max-w-2xl w-full px-8 relative z-10 text-center flex flex-col items-center">
            
            {/* STAGE 1: LOADING PROGRESS CANVAS */}
            {stage === 'loading' && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full flex flex-col items-center space-y-10"
              >
                {/* Heritage Logo Block */}
                <div className="space-y-3">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border-2 border-[#D4AF37]/30 shadow-md"
                  >
                    <span className="font-display font-black text-[#D4AF37] text-2xl tracking-tighter">SJ</span>
                  </motion.div>
                  <h1 className="font-display font-black text-2xl md:text-3xl tracking-widest text-[#111111] uppercase">
                    SHRI JAIN
                  </h1>
                  <p className="font-sans text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase font-bold">
                    Stationery Mart • EST. 1979
                  </p>
                </div>

                {/* Drawn Pencil Loading Bar */}
                <div className="w-full max-w-md relative pt-6">
                  {/* Pencil Pointer drawing the line */}
                  <motion.div
                    style={{ left: `${percent}%` }}
                    className="absolute top-0 -ml-3 z-20 text-[#D4AF37]"
                  >
                    <motion.div
                      animate={{ rotate: [30, 45, 30] }}
                      transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                      className="origin-bottom-left"
                    >
                      <Pencil size={24} className="transform -scale-x-100" />
                    </motion.div>
                  </motion.div>

                  {/* Under loading track */}
                  <div className="h-1 bg-[#111111]/10 rounded-full w-full overflow-hidden relative">
                    {/* Golden progress fill */}
                    <div 
                      className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F2D472] to-[#B8860B] rounded-full transition-all duration-100"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {/* Percentage state text */}
                  <div className="flex justify-between items-center mt-3 font-mono text-[10px] text-[#111111]/50 tracking-wider">
                    <span>ARCHIVAL DESK INIT</span>
                    <span className="font-bold text-[#D4AF37] text-xs">{percent}%</span>
                  </div>
                </div>

                {/* Soft ambient note */}
                <div className="flex items-center space-x-1.5 text-[9px] font-display font-bold tracking-widest text-[#111111]/40 uppercase">
                  <Sparkles size={11} className="text-[#D4AF37]" />
                  <span>Preparing Premium Catalog Ledger</span>
                </div>
              </motion.div>
            )}

            {/* STAGE 2: NOTEBOOK PAGE OPENING REVEAL */}
            {stage === 'notebook' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 40 }}
                className="w-full flex flex-col items-center"
              >
                {/* 3D Notebook Open Canvas representation */}
                <div className="perspective-1000 w-full max-w-xl aspect-[16/10] bg-white rounded-2xl border-4 border-[#D4AF37]/35 shadow-[0_25px_60px_rgba(139,94,26,0.15)] relative overflow-hidden flex">
                  
                  {/* Center spinal stitching binding */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] bg-amber-950/20 z-30" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/40 z-30" />

                  {/* Left notebook line margin */}
                  <div className="absolute top-0 bottom-0 left-6 w-[1px] bg-red-200 pointer-events-none" />
                  <div className="absolute inset-0 bg-notebook-ruled opacity-[0.15] pointer-events-none" />

                  {/* Left Page (Page 1): Revealing Logo */}
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="w-1/2 h-full flex flex-col justify-center items-center border-r border-[#D4AF37]/10 p-6 space-y-3"
                  >
                    <div className="w-12 h-12 rounded-xl border border-[#D4AF37]/45 flex items-center justify-center bg-[#FAF8F2] shadow-sm">
                      <BookOpen size={18} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="font-display font-black text-xs md:text-sm tracking-[0.25em] text-[#111111]">
                      SHRI JAIN
                    </h3>
                    <p className="font-sans text-[8px] tracking-widest text-[#D4AF37] uppercase font-bold">
                      AUTHENTIC SINCE 1979
                    </p>
                  </motion.div>

                  {/* Right Page (Page 2): Revealing Heritage Text */}
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="w-1/2 h-full flex flex-col justify-center items-center p-6 space-y-4"
                  >
                    <div className="text-center space-y-1.5">
                      <h2 className="font-handwritten text-xl md:text-2xl text-[#111111] leading-none">
                        Shri Jain Stationery Mart
                      </h2>
                      <div className="h-[1px] w-12 bg-[#D4AF37]/60 mx-auto" />
                      <p className="font-serif italic text-[10px] md:text-xs text-[#D4AF37] font-semibold">
                        Trusted Wholesale Stationery Since 1979
                      </p>
                    </div>

                    <p className="font-sans text-[8px] md:text-[9px] text-[#111111]/60 leading-relaxed max-w-[150px] mx-auto">
                      Delivering genuine school supplies, paper brands, and administrative office products with pristine logistics.
                    </p>
                  </motion.div>

                  {/* Page curl effect overlays */}
                  <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />

                </div>

                {/* Subtle transition visual note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="mt-8 flex items-center space-x-1.5 text-[9px] font-display font-bold tracking-[0.3em] text-[#D4AF37] uppercase"
                >
                  <span>Journal Opening...</span>
                </motion.div>

              </motion.div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
