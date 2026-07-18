import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews: Testimonial[] = [
    {
      id: '1',
      name: 'Dr. Rakesh Verma',
      role: 'Principal',
      company: "St. Xavier's Academy",
      quote: "Shri Jain Stationery Mart has been our exclusive academic supplies partner for over a decade. Their customized exam answer sheets, student notebooks, and brand assortments are pristine. The packaging is robust, and the wholesale pricing remains unbeatable.",
      rating: 5,
    },
    {
      id: '2',
      name: 'Sunita Mehra',
      role: 'Operations Director',
      company: 'TechCorp Solutions Ltd.',
      quote: "Absolute compliance with our administrative procurement guidelines. Our monthly desk supplies, files, and executive calendars are dispatched on time. Sourcing genuine brands like Casio and Kangaro at such margins has greatly optimized our budgets.",
      rating: 5,
    },
    {
      id: '3',
      name: 'Piyush Lodha',
      role: 'Managing Director',
      company: 'Lodha Retail Distributors',
      quote: "Unbelievable supply catalog! I stock my retail chain from Shri Jain. Manoj Jain organizes bulk dispatching with factory-level discounts for hot-selling DOMS, Camlin, and Classmate lines. Our margins have spiked significantly.",
      rating: 5,
    },
    {
      id: '4',
      name: 'Archana Sharma',
      role: 'Executive Principal',
      company: 'Apex Coaching Group',
      quote: "Our quarterly orders for custom-printed registers, marker pens, and student study pouches are always fulfilled with perfect accuracy. Having a single verified, trustworthy point of contact saves us immense administration time.",
      rating: 5,
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-24 bg-[#FFFDF8] border-t border-[#D4AF37]/20 overflow-hidden">
      
      {/* Background radial gradient spotlights */}
      <div className="absolute inset-0 bg-radial from-[#D4AF37]/4 via-transparent to-transparent pointer-events-none" />
      <div className="absolute left-1/3 bottom-1/4 w-[400px] h-[400px] bg-[#D4AF37]/3 rounded-full blur-[90px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: '-40px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl mx-auto px-8 relative z-10"
      >
        
        {/* Header Block */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
            <span className="font-display text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
              Distinguished Client Reviews
            </span>
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
          </div>

          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-[#111111]">
            Trusted by <span className="text-gold-gradient">Industry Leaders</span>
          </h2>

          <p className="font-sans font-medium text-[#111111]/70 text-sm max-w-xl mx-auto">
            Read testimonials from our wholesale clients, including prominent school principals, corporate buyers, and distributors.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 md:p-12 border-2 border-[#D4AF37]/25 shadow-[0_10px_35px_rgba(170,124,17,0.04)] relative overflow-hidden paper-curl-left"
            >
              {/* Paper line decorations */}
              <div className="absolute top-0 bottom-0 left-6 w-[1px] bg-red-200 pointer-events-none" />
              <div className="absolute inset-0 bg-notebook-ruled opacity-20 pointer-events-none" />

              {/* Premium Quote watermark */}
              <div className="absolute right-8 top-8 opacity-10 text-[#D4AF37] pointer-events-none">
                <Quote size={80} />
              </div>

              <div className="space-y-6 md:space-y-8 relative z-10 pl-6 md:pl-8">
                
                {/* Gold Star ratings */}
                <div className="flex items-center space-x-1">
                  {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                    <Star key={i} size={15} className="text-[#D4AF37] fill-current" />
                  ))}
                </div>

                {/* Testimonial Quote body */}
                <p className="font-serif italic text-base md:text-lg text-[#111111]/90 leading-relaxed pl-4 border-l-2 border-[#D4AF37]/50">
                  "{reviews[activeIndex].quote}"
                </p>

                {/* Author profile */}
                <div className="flex items-center space-x-4">
                  {/* Avatar styled in Gold and Warm White */}
                  <div className="w-11 h-11 rounded-full border border-[#D4AF37]/35 bg-[#FAF8F2] flex items-center justify-center font-display font-bold text-[#D4AF37] text-xs shadow-sm shrink-0">
                    {reviews[activeIndex].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[#111111] text-sm md:text-base">
                      {reviews[activeIndex].name}
                    </h4>
                    <p className="font-sans text-[10px] text-[#111111]/60 uppercase tracking-widest mt-0.5">
                      {reviews[activeIndex].role} — <span className="text-[#D4AF37] font-bold">{reviews[activeIndex].company}</span>
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Buttons */}
          <div className="flex justify-between items-center mt-8 px-4">
            {/* Index Counter indicator */}
            <div className="flex items-center space-x-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-[#111111]/15 hover:bg-[#111111]/30'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-lg border border-[#D4AF37]/25 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white flex items-center justify-center text-[#111111] transition-all duration-300 bg-white shadow-sm cursor-pointer"
                aria-label="Previous Review"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-lg border border-[#D4AF37]/25 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white flex items-center justify-center text-[#111111] transition-all duration-300 bg-white shadow-sm cursor-pointer"
                aria-label="Next Review"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
