import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Book, PenTool, Pencil, Palette, Compass, Paperclip } from 'lucide-react';

interface HeroProps {
  onExploreProducts: () => void;
  onContactClick: () => void;
  isReady?: boolean;
}

export default function Hero({ onExploreProducts, onContactClick, isReady }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);

  const [typedText, setTypedText] = useState("");
  const [typingFinished, setTypingFinished] = useState(false);
  const [showStamp, setShowStamp] = useState(false);
  const [startFadeIn, setStartFadeIn] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; scale: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synthesize a high-end rubber stamp impact sound using Web Audio API
  const playStampSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Low-frequency hollow rubber impact thump
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.18);
      
      gain.gain.setValueAtTime(0.45, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);

      // Medium-high crispy paper friction snap
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = "triangle";
      snapOsc.frequency.setValueAtTime(650, ctx.currentTime);
      snapOsc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

      snapGain.gain.setValueAtTime(0.12, ctx.currentTime);
      snapGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start();
      snapOsc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn("Web Audio stamp sound bypass:", e);
    }
  };

  const fullText = "Shri Jain Stationery Mart";

  useEffect(() => {
    // If isReady is explicitly false, wait. If isReady is undefined or true, proceed.
    if (isReady === false) return;

    let index = 0;
    setTypedText("");
    setTypingFinished(false);
    setShowStamp(false);
    setStartFadeIn(false);

    const interval = setInterval(() => {
      setTypedText(fullText.substring(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setTypingFinished(true);

        // Step 7: Red stamp pops onto the Hero section
        const stampTimer = setTimeout(() => {
          setShowStamp(true);
          playStampSound();

          // Generate 12 premium distressed ink splatters on impact
          const splatters = Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / 12 + (Math.random() * 0.4 - 0.2);
            const distance = 42 + Math.random() * 28;
            return {
              id: i,
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: 0.4 + Math.random() * 0.6
            };
          });
          setParticles(splatters);

          // Step 9, 10, 11: Staggered fade in of all other descriptive blocks
          const fadeTimer = setTimeout(() => {
            setStartFadeIn(true);
          }, 600);

          return () => clearTimeout(fadeTimer);
        }, 350);

        return () => clearTimeout(stampTimer);
      }
    }, 85); // Natural typing speed (70–100 ms per character)

    return () => clearInterval(interval);
  }, [isReady]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden bg-[#FAF8F2] bg-grid-paper"
    >
      {/* Soft natural sunlight overlay cast from the top-right */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FFFDF8]/30 to-[#D4AF37]/5 pointer-events-none z-10" />

      {/* Scattered subtle desk elements in the background to feel like a premium desk */}
      <div className="absolute top-12 left-12 opacity-30 select-none hidden md:block">
        <div className="flex gap-2">
          <div className="w-1.5 h-12 bg-amber-800 rounded-full rotate-12" />
          <div className="w-1.5 h-10 bg-yellow-600 rounded-full rotate-45" />
        </div>
      </div>

      {/* Central responsive container with fade, scale, and upward motion scroll triggers */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto w-full px-8 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10"
      >
        
        {/* Left Column: Authentic Brand Identity & Message */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
          
          {/* Authentic Heritage Tag (EST. 1979 fades in after typing finishes) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={startFadeIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-[#FAF8F2] border border-[#D4AF37]/45 px-4 py-1.5 rounded-full w-fit shadow-[0_2px_10px_rgba(212,175,55,0.05)]"
          >
            <Sparkles size={13} className="text-[#D4AF37]" />
            <span className="font-display text-[11px] font-bold tracking-[0.25em] text-[#111111]">
              EST. 1979 • TRUSTED FOR 45+ YEARS
            </span>
          </motion.div>

          {/* Dynamic Handwriting Animation Core */}
          <div className="space-y-3 relative">
            <span className="font-display font-medium text-[#111111]/50 text-sm tracking-[0.35em] uppercase block">
              Welcome to
            </span>
            
            {/* The Handwriting Title Canvas */}
            <div className="relative inline-block py-2">
              <h1 className="font-handwritten text-4xl sm:text-5xl md:text-6xl text-[#111111] tracking-wide text-left inline-flex items-center select-none">
                <span>{typedText}</span>
                <motion.span 
                  animate={{ opacity: typingFinished ? [0.4, 0.1, 0.4] : [1, 0, 1] }} 
                  transition={{ repeat: Infinity, duration: typingFinished ? 1.5 : 0.8 }}
                  className="inline-block text-[#D4AF37] ml-0.5 select-none font-sans font-light"
                >
                  |
                </motion.span>
              </h1>

              {/* Elegant Gold Underline drawn after writing finishes */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: typingFinished ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full bg-gradient-to-r from-[#D4AF37] via-[#F2D472] to-[#B8860B] origin-left"
                />
              </div>

              {/* Premium Circular Verification Stamp */}
              {showStamp && (
                <motion.div
                  initial={{ scale: 2.2, opacity: 0, rotate: -35 }}
                  animate={{ scale: 1, opacity: 1, rotate: [15, -3] }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 120, 
                    damping: 10,
                    delay: 0.1
                  }}
                  className="absolute -top-12 -right-4 sm:-right-12 md:-right-20 lg:-right-24 z-20 pointer-events-none select-none drop-shadow-[0_4px_10px_rgba(210,43,43,0.15)]"
                >
                  <div className="relative">
                    {/* Ink explosion particles container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {particles.map((p) => (
                        <motion.div
                          key={p.id}
                          initial={{ x: 0, y: 0, opacity: 1, scale: p.scale }}
                          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="absolute w-1.5 h-1.5 rounded-full bg-[#D22B2B] pointer-events-none"
                        />
                      ))}
                    </div>

                    <svg viewBox="0 0 200 200" className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 text-[#D22B2B] select-none fill-none">
                      <defs>
                        <path id="stampCircleOuter" d="M 100, 100 m -68, 0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0" />
                        <path id="stampCircleBottom" d="M 100, 100 m -55, 0 a 55,55 0 1,0 110,0 a 55,55 0 1,0 -110,0" />
                        <filter id="inkDistress">
                          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                      </defs>
                      
                      <g filter="url(#inkDistress)" className="stroke-[#D22B2B] fill-[#D22B2B]">
                        {/* Circular stamp borders */}
                        <circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        <circle cx="100" cy="100" r="76" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="100" cy="100" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        
                        {/* Outer top text */}
                        <text className="font-display font-black tracking-[0.2em] text-[10.5px] uppercase fill-current">
                          <textPath href="#stampCircleOuter" startOffset="50%" textAnchor="middle">
                            SHRI JAIN STATIONERY MART • ★ •
                          </textPath>
                        </text>
                        
                        {/* Bottom text */}
                        <text className="font-display font-extrabold tracking-[0.15em] text-[8.5px] uppercase fill-current">
                          <textPath href="#stampCircleBottom" startOffset="50%" textAnchor="middle">
                            EST. 1979 • KOTA • RAJASTHAN
                          </textPath>
                        </text>
                        
                        {/* Center SJSM Text */}
                        <text x="100" y="94" textAnchor="middle" className="font-display font-black text-2xl tracking-wider fill-current">SJSM</text>
                        
                        {/* Checked and verified banner */}
                        <text x="100" y="116" textAnchor="middle" className="font-display font-bold text-[8.5px] tracking-[0.18em] fill-current">✔ VERIFIED</text>
                        
                        {/* Star accents in empty spaces */}
                        <circle cx="48" cy="100" r="1.5" fill="currentColor" stroke="none" />
                        <circle cx="152" cy="100" r="1.5" fill="currentColor" stroke="none" />
                      </g>
                    </svg>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Trusted Wholesale Subtitle (Fades in at step 10) */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={startFadeIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif italic font-bold text-3xl sm:text-4xl md:text-5xl text-[#D4AF37] leading-tight"
            >
              Trusted Wholesale Stationery Since 1979
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={startFadeIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-[#111111]/75 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            Supplying Quality Stationery for Schools, Retailers, Offices & Businesses. We craft decades of trust, heritage, and genuine wholesale support into seamless partnership ecosystems.
          </motion.p>

          {/* Premium Stationery Styled Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={startFadeIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={onExploreProducts}
              className="group relative px-8 py-4 rounded-lg gold-gradient-btn hover:gold-gradient-btn-hover font-display font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_6px_20px_rgba(212,175,55,0.2)] flex items-center space-x-2 border border-[#D4AF37]/30"
            >
              <span>Explore Collections</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 text-[#111111]" />
            </button>

            <button
              onClick={onContactClick}
              className="px-8 py-4 rounded-lg bg-[#FAF8F2] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#111111] hover:bg-[#FFFDF8] font-display font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center space-x-2 shadow-sm"
            >
              <span>Contact Desk</span>
            </button>
          </motion.div>

          {/* Heritage Stats Badges framed as luxury gold tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={startFadeIn ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="pt-8 grid grid-cols-3 gap-6 border-t border-[#D4AF37]/20 max-w-md"
          >
            <div>
              <p className="font-display text-2xl text-[#D4AF37] font-bold">1979</p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#111111]/60 font-semibold">Established</p>
            </div>
            <div>
              <p className="font-display text-2xl text-[#D4AF37] font-bold">5000+</p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#111111]/60 font-semibold">Retail Partners</p>
            </div>
            <div>
              <p className="font-display text-2xl text-[#D4AF37] font-bold">100%</p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#111111]/60 font-semibold">Genuine Brands</p>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Premium stationery elements arranged beautifully */}
        <div className="lg:col-span-5 relative flex justify-center items-center h-[450px] lg:h-[550px] w-full">
          
          {/* Subtle Ambient circular desk compass/light background */}
          <div 
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
            className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full border border-[#D4AF37]/15 bg-[#FFFDF8]/40 shadow-sm flex items-center justify-center animate-[spin_60s_linear_infinite]" 
          />
          <div 
            style={{ transform: `translateY(${scrollY * 0.08}px)` }}
            className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full border border-[#D4AF37]/10 pointer-events-none" 
          />

          {/* Premium Desk Stationery 3D Layout */}
          <div 
            style={{ transform: `translateY(${scrollY * -0.06}px)` }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
          >
            
            {/* 1. Hardcover Leather Diary / Notebook (Left Side) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -25, x: -70, y: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: -12, x: -50, y: -10 }}
              whileHover={{ scale: 1.05, rotate: -5, y: -20 }}
              transition={{ type: "spring", stiffness: 60, damping: 14 }}
              className="absolute w-[180px] h-[240px] md:w-[210px] md:h-[270px] rounded-xl bg-[#FAF8F2] border-2 border-[#D4AF37]/35 shadow-[8px_15px_30px_rgba(139,94,26,0.08)] p-6 cursor-pointer select-none overflow-hidden flex flex-col justify-between"
            >
              {/* Paper Rulings */}
              <div className="absolute inset-0 bg-notebook-ruled opacity-60 z-0 px-6 py-8" />
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-red-200" /> {/* Notebook Red Margin Line */}

              <div className="relative z-10 flex justify-between items-start">
                <Book className="text-[#D4AF37]" size={20} />
                <span className="text-[8px] font-mono tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">ARCHIVAL</span>
              </div>
              <div className="relative z-10 my-auto text-center">
                <p className="font-display font-bold text-[#111111] text-base tracking-widest">EST. 1979</p>
                <p className="text-[9px] font-sans text-[#111111]/40 uppercase tracking-widest mt-1">Shri Jain Mart</p>
              </div>
              <div className="relative z-10 flex justify-between items-end border-t border-[#D4AF37]/10 pt-3">
                <div>
                  <p className="text-[11px] font-bold text-[#111111]">Ledger Journal</p>
                  <p className="text-[8px] text-[#111111]/50">Genuine Thread Bound</p>
                </div>
                <div className="w-5 h-5 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-white">
                  <span className="text-[8px] text-[#D4AF37] font-bold">★</span>
                </div>
              </div>
            </motion.div>

            {/* 2. Premium 18K Gold Fountain Pen crossing the notebook */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 20, x: 80, y: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 35, x: 50, y: 15 }}
              whileHover={{ scale: 1.12, rotate: 25, y: -5 }}
              transition={{ type: "spring", stiffness: 60, damping: 12 }}
              className="absolute w-[45px] h-[220px] md:w-[50px] md:h-[260px] rounded-full bg-gradient-to-b from-[#111111] via-amber-950 to-[#2A2A2A] border border-[#D4AF37]/45 shadow-[12px_18px_30px_rgba(139,94,26,0.12)] px-2 py-4 cursor-pointer flex flex-col items-center justify-between group"
            >
              {/* Luxury Gold Clip & Band */}
              <div className="absolute left-1/2 -translate-x-1/2 top-6 w-1 h-14 bg-[#D4AF37] rounded-full" />
              <div className="absolute left-0 right-0 top-24 h-[2px] bg-[#D4AF37]" />

              <div className="relative z-10 w-full flex justify-center">
                <PenTool className="text-[#D4AF37] rotate-45 transform" size={16} />
              </div>
              <div className="relative z-10 text-[6px] text-[#D4AF37]/80 uppercase tracking-widest font-mono select-none">
                18K NIB
              </div>
              <div className="relative z-10 w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-sm">
                <span className="text-[7px] font-bold text-black">SJ</span>
              </div>
            </motion.div>

            {/* 3. Authentic Wood Pencil with graphite tip floating on top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -40, y: -100 }}
              animate={{ opacity: 1, scale: 1, rotate: -6, y: -120, x: 10 }}
              whileHover={{ scale: 1.08, rotate: 0, y: -135 }}
              transition={{ type: "spring", stiffness: 75, damping: 15 }}
              className="absolute w-[220px] h-[34px] md:w-[260px] md:h-[38px] rounded-md bg-[#F4EDE2] border border-[#D4AF37]/30 shadow-[0_10px_20px_rgba(139,94,26,0.06)] px-4 flex items-center justify-between cursor-pointer group"
            >
              {/* Wooden Pencil Sharp Tip */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-full bg-gradient-to-r from-amber-200 to-amber-700 clip-pencil-tip rounded-l-md opacity-90" />
              
              <div className="relative z-10 flex items-center space-x-2 pl-4">
                <Pencil className="text-[#D4AF37]" size={12} />
                <span className="text-[9px] font-mono tracking-wider text-[#111111]/70">Nataraj Platinum • Bonded Lead</span>
              </div>
              <span className="relative z-10 text-[7px] font-mono text-[#D4AF37] px-2 py-0.5 bg-[#FAF8F2] rounded border border-[#D4AF37]/20 uppercase">
                HB Super
              </span>
            </motion.div>

            {/* 4. Elegant Geometry Brass Compass & Palette (Bottom Center) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 20, y: 130 }}
              animate={{ opacity: 1, scale: 1, rotate: 8, y: 120, x: -10 }}
              whileHover={{ scale: 1.05, rotate: 2, y: 105 }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
              className="absolute w-[170px] h-[100px] md:w-[200px] md:h-[110px] rounded-2xl bg-[#FFFDF8] border border-[#D4AF37]/35 shadow-[0_12px_24px_rgba(139,94,26,0.08)] p-3 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[#D4AF37]/10">
                <Compass className="text-[#D4AF37]" size={14} />
                <span className="text-[7px] font-mono text-[#111111]/50 tracking-widest uppercase">Precision Math</span>
              </div>

              {/* Little copper nodes */}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#D4AF37] border border-[#FAF8F2] shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-amber-600 border border-[#FAF8F2] shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-[#111111] border border-[#FAF8F2] shadow-sm" />
                <span className="text-[8px] text-[#111111]/40 font-mono">Chrome Finish</span>
              </div>

              <div className="flex justify-between items-center text-[8px] text-[#111111]/60 font-sans">
                <span>Set Square & scale</span>
                <span className="text-[#D4AF37] font-bold">1979 ORIGIN</span>
              </div>
            </motion.div>

          </div>
        </div>

      </motion.div>
    </section>
  );
}
