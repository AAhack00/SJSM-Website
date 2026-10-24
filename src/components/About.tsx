import { motion } from 'motion/react';
import { Check, ShieldCheck, Award, Heart, RefreshCw } from 'lucide-react';

export default function About() {
  const highlights = [
    { title: 'Quality Excellence', desc: 'Every notebook, pencil, and geometry box complies with strict factory checks to meet authentic manufacturer standards.' },
    { title: 'Trust & Reliability', desc: 'More than four decades of continuous fulfillment, securing authentic stock distribution directly from major brands.' },
    { title: 'Competitive Wholesale Pricing', desc: 'Direct sourcing models with authorized brand conglomerates let us bypass middleman markups for optimal margins.' },
    { title: 'Long-Term Relationships', desc: 'We act as a direct procurement extension, building trust-based contracts with retailers and business partners.' }
  ];

  const clients = [
    'Retail Stores',
    'Schools & Colleges',
    'Coaching Centers',
    'Offices & Corporate Buyers'
  ];

  return (
    <section id="about" className="relative py-24 bg-[#FFFDF8] overflow-hidden border-t border-[#D4AF37]/25">
      
      {/* Background paper texture fading in on scroll */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.22 }}
        viewport={{ once: false }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 bg-notebook-ruled pointer-events-none" 
      />

      {/* Background ambient lighting */}
      <div className="absolute right-1/4 top-1/3 w-[450px] h-[450px] bg-[#D4AF37]/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-[350px] h-[350px] bg-[#FAF8F2] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Premium layered image layout styled like a paper block - slides from Left */}
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 70, damping: 15 }}
            className="lg:col-span-5 relative h-[450px] md:h-[550px] w-full flex items-center justify-center"
          >
            
            {/* Background floating paper sheet acting as shadow backdrop */}
            <div className="absolute inset-4 rounded-3xl border-2 border-[#D4AF37]/25 bg-white translate-x-3 translate-y-3 z-0 shadow-lg paper-curl-right" />

            {/* Core Image container styled like a premium directory binder */}
            <div className="absolute inset-4 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/35 shadow-[0_12px_35px_rgba(170,124,17,0.06)] z-10 group bg-white">
              <img
                src="https://drive.google.com/file/d/1Y0Q115Xn7XoCFosiCVFuzBYqDRkpOqQN/view?usp=drivesdk"
                alt="Executive study desk with stationery, pens, paper clips and premium diary"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF8] via-transparent to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
              
              {/* Overlapping small leather capsule for trust */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 border-2 border-[#D4AF37]/35 shadow-md flex items-center space-x-3 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-white font-display font-black text-xs shrink-0 shadow-md">
                  1979
                </div>
                <div>
                  
                  <p className="font-sans text-[15px] text-[#111111] uppercase tracking-widest font-bold"> Shri Jain Stationery Mart</p>
                    <p className="text-xs text-[#111111]/70 mt-1">
  Premium Wholesale Stationery Supplier
</p>
                </div>
              </div>
            </div>

            {/* Floating gold micro-badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-2 top-8 z-20 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-lg shadow-md border border-[#FAF8F2]/30 flex items-center space-x-1.5"
            >
              <span className="text-[10px] font-display font-bold text-white uppercase tracking-wider">★ Heritage Since 1979</span>
            </motion.div>
          </motion.div>

          {/* Right Block: Content, legacy details, checklist - slides from Right */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 70, damping: 15 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center space-x-2">
              <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
              <span className="font-display text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
                Our Brand Story
              </span>
              <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-[#111111]">
              Four Decades of <br />
              <span className="text-gold-gradient">Wholesale Trust</span>
            </h2>

            <div className="space-y-4 font-sans text-sm md:text-base text-[#111111]/80 leading-relaxed">
              <p>
                Established in <strong>1979</strong>, <strong>Shri Jain Stationery Mart</strong> has built more than four decades of excellence as Rajasthan's premier wholesale and distribution gateway for top-tier corporate, administrative, and academic stationery.
              </p>
              <p>
                 We act as a highly dependable directly-sourcing pipeline, linking major global production lines with local retail networks and elite organizations.
              </p>
            </div>

            {/* Serving List Badges */}
            <div className="pt-3">
              <p className="text-xs font-display font-bold tracking-widest text-[#D4AF37] uppercase mb-3">Sectors We Actively Serve:</p>
              <div className="flex flex-wrap gap-2">
                {clients.map((client, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-1.5 rounded-md bg-white border border-[#D4AF37]/25 font-display font-bold text-[10px] tracking-wider uppercase text-[#111111] shadow-sm hover:border-[#D4AF37] transition-colors"
                  >
                    💼 {client}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Values / Highlights */}
            <div className="space-y-4 pt-6 border-t border-[#D4AF37]/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ 
                      y: -5,
                      scale: 1.02,
                      borderColor: 'rgba(212, 175, 55, 0.8)',
                      boxShadow: '0 12px 24px -6px rgba(170, 124, 17, 0.12)'
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-[#D4AF37]/15 shadow-[0_2px_10px_rgba(170,124,17,0.02)] transition-colors duration-300 hover:bg-[#FAF8F2]/40 group/value cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded-full border border-[#D4AF37]/45 flex items-center justify-center shrink-0 mt-0.5 bg-[#FAF8F2] group-hover/value:bg-[#D4AF37] group-hover/value:text-white transition-all">
                      <Check size={10} className="text-[#D4AF37] group-hover/value:text-white transition-all" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#111111] group-hover/value:text-[#D4AF37] transition-colors">{h.title}</h4>
                      <p className="font-sans text-[11px] text-[#111111]/60 mt-0.5 leading-snug">{h.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Direct contact info */}
            <div className="pt-4 flex items-center space-x-4">
              <div className="h-10 w-[1.5px] bg-[#D4AF37]/35" />
              <div>
                <p className="text-[9px] font-mono tracking-widest text-[#111111]/40 uppercase">DIRECT ORDER ASSISTANT</p>
                <a href="tel:+919414231059" className="font-display text-lg font-bold text-[#D4AF37] hover:text-[#111111] transition-all">
                  +91 9414231059
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      </div>

    </section>
  );
}
