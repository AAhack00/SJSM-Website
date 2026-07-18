import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface BrandItem {
  id: string;
  name: string;
  logoUrl: string;
  brandColor: string;
}

export default function BrandsShowcase() {
  const [imgError, setImgError] = React.useState<Record<string, boolean>>({});

  const row1: BrandItem[] = [
    { id: 'doms', name: 'Doms', logoUrl: '/brands/doms.png', brandColor: '#1E3A8A' },
    { id: 'classmate', name: 'Classmate', logoUrl: '/brands/classmate.jpg', brandColor: '#DB2777' },
    { id: 'kokuyocamlin', name: 'Kokuyo Camlin', logoUrl: '/brands/kokuyocamlin.jpg', brandColor: '#D97706' },
    { id: 'camlin', name: 'Camlin', logoUrl: '/brands/camlin.webp', brandColor: '#D97706' },
    { id: 'cello', name: 'Cello', logoUrl: '/brands/cello.jpg', brandColor: '#DC2626' },
    { id: 'luxor', name: 'Luxor', logoUrl: '/brands/luxor.png', brandColor: '#BE123C' }
  ];

  const row2: BrandItem[] = [
    { id: 'parker', name: 'Parker', logoUrl: '/brands/parker.png', brandColor: '#111111' },
    { id: 'pilot', name: 'Pilot', logoUrl: '/brands/pilot.png', brandColor: '#1E3A8A' },
    { id: 'addgel', name: 'Addgel', logoUrl: '/brands/addgel.png', brandColor: '#0D9488' },
    { id: 'natraj', name: 'Natraj', logoUrl: '/brands/nataraj.jpg', brandColor: '#DC2626' },
    { id: 'flair', name: 'Flair', logoUrl: '/brands/flair.jpg', brandColor: '#E11D48' },
    { id: 'linc', name: 'Linc', logoUrl: '/brands/linc.jpg', brandColor: '#0284C7' }
  ];

  const row3: BrandItem[] = [
    { id: 'apsara', name: 'Apsara', logoUrl: '/brands/apsara.jpg', brandColor: '#0E7490' },
    { id: 'kangaroo', name: 'Kangaroo', logoUrl: '/brands/kangaro.jpg', brandColor: '#4338CA' },
    { id: 'deli', name: 'Deli', logoUrl: '/brands/deli.jpg', brandColor: '#DC2626' },
    { id: 'oddy', name: 'Oddy', logoUrl: '/brands/oddy.png', brandColor: '#CA8A04' },
    { id: 'kores', name: 'Kores', logoUrl: '/brands/kores.webp', brandColor: '#DC2626' },
    { id: 'casio', name: 'Casio', logoUrl: '/brands/casio.png', brandColor: '#111111' }
  ];

  const row4: BrandItem[] = [
    { id: 'pidilite', name: 'Pidilite', logoUrl: '/brands/pidilite.jpg', brandColor: '#EA580C' },
    { id: 'montex', name: 'Montex', logoUrl: '/brands/montex.jpg', brandColor: '#111111' },
    { id: 'pierrecardin', name: 'Pierre Cardin', logoUrl: '/brands/pierrecardin.png', brandColor: '#111111' },
    { id: 'century', name: 'Century', logoUrl: '/brands/century.jpg', brandColor: '#2563EB' },
    { id: 'rorito', name: 'Rorito', logoUrl: '/brands/rorito.jpg', brandColor: '#2563EB' }
  ];

  // Helper to quadruple lists for a seamless infinite scroll loop
  const makeInfinite = (items: BrandItem[]) => {
    return [...items, ...items, ...items, ...items, ...items, ...items];
  };

  return (
    <section id="brands" className="relative py-20 bg-[#FFFDF8] border-y border-[#D4AF37]/25 overflow-hidden">
      
      {/* CSS Styles for four independent pipelines, alternating directions */}
      <style>{`
        @keyframes marquee-ltr {
          0% { transform: translate3d(-33.3333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes marquee-rtl {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.3333%, 0, 0); }
        }
        
        .animate-pipeline-ltr {
          animation: marquee-ltr 28s linear infinite;
        }
        .animate-pipeline-rtl {
          animation: marquee-rtl 28s linear infinite;
        }
        
        /* Pause on individual row hover */
        .row-container:hover .animate-pipeline-ltr,
        .row-container:hover .animate-pipeline-rtl {
          animation-play-state: paused;
        }

        /* 3D tilt perspective container with metallic gold borders */
        .brand-logo-card {
          perspective: 1000px;
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 4px 10px rgba(139, 94, 26, 0.03);
        }
        
        /* Interactive 3D tilt with premium gold glow on hover */
        .brand-logo-card:hover {
          transform: translateY(-8px) scale(1.1) rotateX(4deg) rotateY(-4deg);
          box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4), 0 0 15px rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.85);
        }

        /* Ambient gold shimmer sweep */
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .shimmer-sweep {
          animation: shimmerSweep 4s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative ambient background overlays */}
      <div className="absolute inset-0 bg-radial from-[#D4AF37]/4 via-transparent to-transparent pointer-events-none" />

      {/* Header Block */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <div className="h-[1px] w-6 bg-[#D4AF37]/50" />
            <span className="font-display text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
              Official Distribution Channels
            </span>
            <div className="h-[1px] w-6 bg-[#D4AF37]/50" />
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#111111]">
            Official <span className="text-gold-gradient">Partner Brands</span>
          </h2>
        </div>
        <p className="font-sans text-[11px] font-bold text-[#111111]/40 uppercase tracking-[0.2em] mt-4 md:mt-0 flex items-center space-x-1.5">
          <ShieldCheck size={14} className="text-[#D4AF37]" />
          <span>Direct Authorization & Original Stock</span>
        </p>
      </div>

      {/* MULTI-LAYER LOGO PIPELINE STAGE */}
      <div className="space-y-6 relative z-10">
        
        {/* Row 1: Move Left → Right */}
        <div className="row-container relative w-full overflow-hidden py-1">
          {/* Subtle fading edge highlights */}
          <div className="absolute top-0 bottom-0 left-0 w-20 md:w-48 bg-gradient-to-r from-[#FFFDF8] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 md:w-48 bg-gradient-to-l from-[#FFFDF8] to-transparent z-20 pointer-events-none" />

          <div className="flex w-max">
            <div className="animate-pipeline-ltr flex items-center space-x-6 pr-6">
              {makeInfinite(row1).map((brand, idx) => (
                <div
                  key={`${brand.id}-r1-${idx}`}
                  className="brand-logo-card relative inline-flex items-center justify-center w-[140px] md:w-[170px] h-20 px-5 rounded-2xl bg-white shadow-sm overflow-hidden cursor-pointer shrink-0"
                >
                  <div className="shimmer-sweep absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/8 to-transparent -translate-x-full pointer-events-none" />
                  {!imgError[brand.id] ? (
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      onError={() => setImgError(prev => ({ ...prev, [brand.id]: true }))}
                      className="max-h-10 max-w-full object-contain filter transition-all duration-300 pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center px-2 select-none">
                      <span 
                        className="font-display font-black text-xs md:text-sm tracking-widest uppercase" 
                        style={{ color: brand.brandColor || '#D4AF37' }}
                      >
                        {brand.name}
                      </span>
                      <span className="text-[7px] font-sans font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                        Official Stock
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Move Right → Left */}
        <div className="row-container relative w-full overflow-hidden py-1">
          <div className="absolute top-0 bottom-0 left-0 w-20 md:w-48 bg-gradient-to-r from-[#FFFDF8] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 md:w-48 bg-gradient-to-l from-[#FFFDF8] to-transparent z-20 pointer-events-none" />

          <div className="flex w-max">
            <div className="animate-pipeline-rtl flex items-center space-x-6 pr-6">
              {makeInfinite(row2).map((brand, idx) => (
                <div
                  key={`${brand.id}-r2-${idx}`}
                  className="brand-logo-card relative inline-flex items-center justify-center w-[140px] md:w-[170px] h-20 px-5 rounded-2xl bg-white shadow-sm overflow-hidden cursor-pointer shrink-0"
                >
                  <div className="shimmer-sweep absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/8 to-transparent -translate-x-full pointer-events-none" />
                  {!imgError[brand.id] ? (
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      onError={() => setImgError(prev => ({ ...prev, [brand.id]: true }))}
                      className="max-h-10 max-w-full object-contain filter transition-all duration-300 pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center px-2 select-none">
                      <span 
                        className="font-display font-black text-xs md:text-sm tracking-widest uppercase" 
                        style={{ color: brand.brandColor || '#D4AF37' }}
                      >
                        {brand.name}
                      </span>
                      <span className="text-[7px] font-sans font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                        Official Stock
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Move Left → Right */}
        <div className="row-container relative w-full overflow-hidden py-1">
          <div className="absolute top-0 bottom-0 left-0 w-20 md:w-48 bg-gradient-to-r from-[#FFFDF8] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 md:w-48 bg-gradient-to-l from-[#FFFDF8] to-transparent z-20 pointer-events-none" />

          <div className="flex w-max">
            <div className="animate-pipeline-ltr flex items-center space-x-6 pr-6" style={{ animationDuration: '32s' }}>
              {makeInfinite(row3).map((brand, idx) => (
                <div
                  key={`${brand.id}-r3-${idx}`}
                  className="brand-logo-card relative inline-flex items-center justify-center w-[140px] md:w-[170px] h-20 px-5 rounded-2xl bg-white shadow-sm overflow-hidden cursor-pointer shrink-0"
                >
                  <div className="shimmer-sweep absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/8 to-transparent -translate-x-full pointer-events-none" />
                  {!imgError[brand.id] ? (
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      onError={() => setImgError(prev => ({ ...prev, [brand.id]: true }))}
                      className="max-h-10 max-w-full object-contain filter transition-all duration-300 pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center px-2 select-none">
                      <span 
                        className="font-display font-black text-xs md:text-sm tracking-widest uppercase" 
                        style={{ color: brand.brandColor || '#D4AF37' }}
                      >
                        {brand.name}
                      </span>
                      <span className="text-[7px] font-sans font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                        Official Stock
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4: Move Right → Left */}
        <div className="row-container relative w-full overflow-hidden py-1">
          <div className="absolute top-0 bottom-0 left-0 w-20 md:w-48 bg-gradient-to-r from-[#FFFDF8] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 md:w-48 bg-gradient-to-l from-[#FFFDF8] to-transparent z-20 pointer-events-none" />

          <div className="flex w-max">
            <div className="animate-pipeline-rtl flex items-center space-x-6 pr-6" style={{ animationDuration: '30s' }}>
              {makeInfinite(row4).map((brand, idx) => (
                <div
                  key={`${brand.id}-r4-${idx}`}
                  className="brand-logo-card relative inline-flex items-center justify-center w-[140px] md:w-[170px] h-20 px-5 rounded-2xl bg-white shadow-sm overflow-hidden cursor-pointer shrink-0"
                >
                  <div className="shimmer-sweep absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/8 to-transparent -translate-x-full pointer-events-none" />
                  {!imgError[brand.id] ? (
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      onError={() => setImgError(prev => ({ ...prev, [brand.id]: true }))}
                      className="max-h-10 max-w-full object-contain filter transition-all duration-300 pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center px-2 select-none">
                      <span 
                        className="font-display font-black text-xs md:text-sm tracking-widest uppercase" 
                        style={{ color: brand.brandColor || '#D4AF37' }}
                      >
                        {brand.name}
                      </span>
                      <span className="text-[7px] font-sans font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                        Official Stock
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
