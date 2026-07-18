import React from 'react';
import { motion } from 'motion/react';
import { 
  School, 
  GraduationCap, 
  BookOpenCheck, 
  Store, 
  Building2, 
  Briefcase, 
  Package, 
  Sparkles, 
  FileSpreadsheet, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface BulkOrdersProps {
  onQuoteClick: (categoryName?: string) => void;
}

export default function BulkOrders({ onQuoteClick }: BulkOrdersProps) {
  const customerTypes = [
    {
      name: 'Schools',
      description: 'Custom exam answer sheets, pre-packed student kits, & school books.',
      icon: School
    },
    {
      name: 'Colleges',
      description: 'High-grade academic registers, college diaries, & bulk exam notebooks.',
      icon: GraduationCap
    },
    {
      name: 'Coaching Centers',
      description: 'Printed test sheets, branded study bags, whiteboard markers, & notes.',
      icon: BookOpenCheck
    },
    {
      name: 'Retail Shops',
      description: 'Direct supply of top-moving brands with maximum profit margins.',
      icon: Store
    },
    {
      name: 'Offices',
      description: 'Premium print paper, customized files, card holders, & office utilities.',
      icon: Building2
    },
    {
      name: 'Corporate Buyers',
      description: 'Luxury corporate gifting boxes, leather diaries, & fine writing pens.',
      icon: Briefcase
    }
  ];

  return (
    <section id="bulk" className="relative py-24 bg-[#FAF8F2] overflow-hidden border-t border-[#D4AF37]/25">
      
      {/* Immersive background glowing highlights */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-[#D4AF37]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Section Title Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2">
            <span className="w-6 h-[1px] bg-[#D4AF37]" />
            <span className="font-display text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
              B2B Logistical Pipeline
            </span>
            <span className="w-6 h-[1px] bg-[#D4AF37]" />
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#111111]">
            Wholesale <span className="text-gold-gradient">& Bulk Logistics</span>
          </h2>
          <p className="font-sans text-xs text-[#111111]/50 max-w-lg mx-auto uppercase tracking-wider font-semibold">
            Serving major organizations since 1979 with direct brand partnerships
          </p>
        </div>

        {/* ONE COMPLETE INTEGRAL CARD - MUST REMAIN INTACT & RESIZE RESPONSIVELY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-white border-2 border-[#D4AF37]/35 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_15px_45px_rgba(170,124,17,0.06)] overflow-hidden paper-curl-right group"
        >
          {/* Subtle notebook-ruled design element overlays */}
          <div className="absolute top-0 bottom-0 left-6 md:left-10 w-[1.5px] bg-red-100 pointer-events-none" />
          <div className="absolute inset-0 bg-notebook-ruled opacity-[0.15] pointer-events-none" />
          
          {/* Ambient golden top gradient */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37] to-[#D4AF37]/30" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-8 pl-4 md:pl-8">
            
            {/* 1. PREMIUM VECTOR ILLUSTRATION (Retina-ready, sharp, elegant) */}
            <div className="relative w-48 h-32 flex items-center justify-center select-none">
              
              {/* Spinning background soft luxury mandala / glow */}
              <div className="absolute inset-0 bg-[#FAF8F2] rounded-full border border-[#D4AF37]/20 scale-75 animate-pulse opacity-80" />
              
              {/* Decorative elements of stationery & bulk cargo boxes in vector form */}
              <svg className="w-full h-full text-[#D4AF37]" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Gold glowing shadow ellipse */}
                <ellipse cx="100" cy="98" rx="70" ry="12" fill="#D4AF37" fillOpacity="0.08" />
                
                {/* Cargo/Bulk Box */}
                <g className="animate-bounce" style={{ animationDuration: '4s' }}>
                  <path d="M70 70L100 55L130 70L100 85L70 70Z" fill="#FFFDF8" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M70 70V95L100 110V85L70 70Z" fill="#FAF8F2" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M130 70V95L100 110V85L130 70Z" fill="#F4ECE0" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round" />
                  {/* Inside details */}
                  <line x1="85" y1="77" x2="85" y2="92" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="115" y1="77" x2="115" y2="92" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                </g>

                {/* Stacks of Premium Ledgers/Notebooks beside the box */}
                <g className="animate-pulse" style={{ animationDuration: '3s' }}>
                  {/* Ledger 1 */}
                  <path d="M45 80H62V88H45V80Z" fill="#D4AF37" fillOpacity="0.2" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" />
                  <line x1="45" y1="84" x2="55" y2="84" stroke="#D4AF37" strokeWidth="1" />
                  {/* Ledger 2 */}
                  <path d="M42 86H60V94H42V86Z" fill="#FAF8F2" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" />
                  <line x1="42" y1="90" x2="52" y2="90" stroke="#D4AF37" strokeWidth="1" />
                </g>

                {/* Premium Writing Pen / Fountain Pen drawing gold line */}
                <g className="animate-pulse" style={{ animationDuration: '6s' }}>
                  <line x1="145" y1="45" x2="115" y2="75" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M115 75L112 80L118 77L115 75Z" fill="#111" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round" />
                </g>

                {/* Little Floating Magic Sparkles */}
                <circle cx="150" cy="30" r="1.5" fill="#D4AF37" className="animate-ping" />
                <path d="M150 25L152 28L155 29L152 30L150 33L148 30L145 29L148 28L150 25Z" fill="#D4AF37" />
                <path d="M50 35L51.5 38L54.5 39L51.5 40L50 43L48.5 40L45.5 39L48.5 38L50 35Z" fill="#D4AF37" fillOpacity="0.6" />
                
                {/* Logistical Delivery Waves */}
                <path d="M135 85C142 85 145 88 152 88" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
                <path d="M138 92C145 92 148 95 155 95" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
              </svg>

              {/* Float badge indicator */}
              <div className="absolute -top-1 right-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center space-x-1 animate-pulse">
                <Sparkles size={8} />
                <span>DIRECT WHOLESALE SUPPLY</span>
              </div>
            </div>

            {/* 2. CARD TITLE */}
            <div className="space-y-2 max-w-2xl">
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-[#111111] tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                Authorized Bulk Logistics & Wholesale Distribution
              </h3>
              
              {/* 3. CARD DESCRIPTION */}
              <p className="font-sans text-xs md:text-sm text-[#111111]/75 leading-relaxed">
                Shri Jain Stationery Mart delivers high-performance logistics for academic sectors, corporations, and retail channels. We supply 100% genuine inventory directly from top brands including <strong className="text-[#111111] font-semibold">DOMS, Classmate, Camlin, Faber-Castell, and Fevicol</strong>. Our bulk service is backed by customized catalog matching, factory-direct wholesale pricing, and swift pan-India dispatch.
              </p>
            </div>

            {/* Verification highlights row */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] md:text-xs font-bold text-[#111111]/60 uppercase tracking-wider border-y border-[#D4AF37]/15 py-3.5 w-full max-w-xl">
              <span className="flex items-center space-x-1">
                <ShieldCheck size={14} className="text-[#D4AF37]" />
                <span>Tax-Invoiced Supply</span>
              </span>
              <span className="h-4 w-[1px] bg-[#D4AF37]/35 hidden sm:inline" />
              <span className="flex items-center space-x-1">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>100% Manufacturer Direct</span>
              </span>
              <span className="h-4 w-[1px] bg-[#D4AF37]/35 hidden sm:inline" />
              <span className="flex items-center space-x-1">
                <Package size={14} className="text-[#D4AF37]" />
                <span>Custom Packing & Kitting</span>
              </span>
            </div>

            {/* 4. SUPPORTED CUSTOMER TYPES (Beautifully arranged pills with custom icons) */}
            <div className="space-y-3 w-full">
              <p className="text-[10px] font-display font-black text-[#D4AF37] uppercase tracking-[0.25em]">
                Supported Procurement Sectors
              </p>
              
              {/* Responsive layout: 2-col on mobile, 3-col on tablets/desktops */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl mx-auto">
                {customerTypes.map((type, idx) => {
                  const IconComp = type.icon;
                  return (
                    <motion.div
                      key={type.name}
                      whileHover={{ scale: 1.03, y: -2 }}
                      onClick={() => onQuoteClick(`${type.name} Wholesale`)}
                      className="flex flex-col items-center md:items-start p-4 rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37] bg-[#FAF8F2]/50 hover:bg-white transition-all text-center md:text-left cursor-pointer shadow-sm group/pill relative overflow-hidden"
                    >
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 opacity-0 group-hover/pill:opacity-100 transition-opacity" />
                      <div className="flex items-center space-x-2.5 mb-1">
                        <div className="w-7 h-7 rounded-lg bg-white border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#D4AF37] group-hover/pill:bg-[#D4AF37] group-hover/pill:text-white transition-all shadow-sm">
                          <IconComp size={14} />
                        </div>
                        <h4 className="font-display font-bold text-xs md:text-sm text-[#111111] group-hover/pill:text-[#D4AF37] transition-colors">
                          {type.name}
                        </h4>
                      </div>
                      <p className="font-sans text-[11px] text-[#111111]/60 leading-tight hidden sm:block">
                        {type.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 5. QUICK QUOTE BUTTON (High prominence CTA) */}
            <div className="pt-2">
              <button
                onClick={() => onQuoteClick('Wholesale Bulk Supply')}
                className="gold-gradient-btn hover:gold-gradient-btn-hover text-black px-10 py-4.5 rounded-xl font-display font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center space-x-3 shadow-[0_8px_20px_rgba(212,175,55,0.15)] border-2 border-[#D4AF37]/50 hover:scale-105"
              >
                <FileSpreadsheet size={16} />
                <span>Get Wholesale Quote</span>
              </button>
              
              <p className="font-sans text-[10px] text-[#111111]/40 mt-3 font-semibold uppercase tracking-wider">
                Immediate Assessment • Manoj Jain & Team Desk Allocation
              </p>
            </div>

          </div>

          {/* Luxury Corner Ornaments for the complete notebook-ruled card feeling */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#D4AF37]/20 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#D4AF37]/20 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#D4AF37]/20 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#D4AF37]/20 pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
