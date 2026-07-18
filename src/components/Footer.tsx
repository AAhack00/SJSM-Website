import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onNavClick: (sectionId: string) => void;
  onQuoteClick: () => void;
}

export default function Footer({ onNavClick, onQuoteClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const categories = [
    'School Stationery',
    'Pens & Pencils',
    'Notebooks & Journals',
    'Art & Craft Supplies',
    'Geometry Boxes',
    'Office Supplies',
  ];

  const quickLinks = [
    { name: 'Home Workspace', id: 'home' },
    { name: 'Wholesale Catalog', id: 'categories' },
    { name: 'Partner Brands', id: 'brands' },
    { name: 'Our Brand Story', id: 'about' },
    { name: 'Establish Connection', id: 'contact' },
  ];

  return (
    <footer className="bg-[#FFFDF8] text-[#111111] pt-20 pb-8 relative overflow-hidden">
      
      {/* Self-drawing Gold Divider Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37] to-[#D4AF37]/10 origin-center z-20"
      />
      
      {/* Background paper grid lines */}
      <div className="absolute inset-0 bg-notebook-ruled opacity-25 pointer-events-none" />
      <div className="absolute left-1/3 bottom-0 w-[400px] h-[300px] bg-[#D4AF37]/4 rounded-full blur-[100px] pointer-events-none" />

      {/* Smooth slide-up footer content */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-20px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-8 md:px-16 relative z-10"
      >
        
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#D4AF37]/20">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex flex-col">
              <span className="font-display font-black text-xl md:text-2xl text-gold-gradient tracking-widest uppercase">
                SHRI JAIN
              </span>
              <span className="text-[10px] md:text-[11px] tracking-[0.3em] text-[#111111]/50 font-sans uppercase">
                Stationery Mart
              </span>
            </div>
            
            <p className="font-sans text-xs text-[#111111]/75 leading-relaxed max-w-sm">
              Impeccable wholesale stationery supplies and corporate logistics. Empowering educational schools, retail stores, and administrative hubs across India since 1979.
            </p>

            {/* Micro aesthetic tag */}
            <div className="flex items-center space-x-2 text-[10px] text-[#D4AF37] font-display font-bold tracking-widest uppercase pt-2">
              <Sparkles size={11} className="text-[#D4AF37]" />
              <span>Rajasthan's Premium Entity</span>
            </div>

            {/* Social Icons with premium animations */}
            <div className="flex items-center space-x-3.5 pt-4">
              <a 
                href="https://www.facebook.com/shreejainstationerymart/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#D4AF37]/30 bg-white flex items-center justify-center text-[#1877F2] transition-all duration-300 hover:scale-120 hover:border-[#D4AF37] hover:shadow-[0_0_12px_rgba(24,119,242,0.3)] cursor-pointer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/luxury.stationery?igsh=N240d3VkbXpzemsy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#D4AF37]/30 bg-white flex items-center justify-center text-[#E4405F] transition-all duration-300 hover:scale-120 hover:border-[#D4AF37] hover:shadow-[0_0_12px_rgba(228,64,95,0.3)] cursor-pointer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://www.justdial.com/jdmart/Kota-Rajasthan/Shri-Jain-Stationery-Mart-Near-SBI-Ladpura-Branch-in-Rampura/9999PMULDELSTD31301_BZDET/catalogue/products-Highlighter?showSearch=0&nid=11444906" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#D4AF37]/30 bg-white flex items-center justify-center text-[#FF6F00] transition-all duration-300 hover:scale-120 hover:border-[#D4AF37] hover:shadow-[0_0_12px_rgba(255,111,0,0.3)] cursor-pointer"
                aria-label="Justdial"
              >
                <span className="font-display font-black text-[9px] tracking-tighter">JD</span>
              </a>
              <a 
                href="https://wa.me/919414231059" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#D4AF37]/30 bg-white flex items-center justify-center text-emerald-500 transition-all duration-300 hover:scale-120 hover:border-[#D4AF37] hover:shadow-[0_0_12px_rgba(16,185,129,0.3)] cursor-pointer"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.117.954 11.487.954c-5.447 0-9.875 4.372-9.88 9.802-.002 1.744.475 3.447 1.38 4.956l-.99 3.616 3.69-.958-.03-.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-[#D4AF37]">Index Directories</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavClick(link.id)}
                    className="text-[#111111]/70 hover:text-[#D4AF37] text-xs font-sans transition-colors text-left font-semibold cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-[#D4AF37]">Product Ranges</h4>
            <ul className="space-y-2.5">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavClick('categories')}
                    className="text-[#111111]/70 hover:text-[#D4AF37] text-xs font-sans transition-colors text-left font-semibold cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-[#D4AF37]">Direct Channels</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start space-x-3 text-xs">
                <Phone size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] font-mono text-[#111111]/40 uppercase tracking-widest">Phone Call</p>
                  <a href="tel:+919414231059" className="text-[#111111]/80 hover:text-[#D4AF37] transition-colors font-bold">
                    +91 9414231059
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-xs">
                <Mail size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] font-mono text-[#111111]/40 uppercase tracking-widest">Email Inbox</p>
                  <a href="mailto:shrijains@gmail.com" className="text-[#111111]/80 hover:text-[#D4AF37] transition-colors font-bold">
                    shrijains@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-xs">
                <MapPin size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] font-mono text-[#111111]/40 uppercase tracking-widest">Main Headquarters</p>
                  <span className="text-[#111111]/70">
                    Arya Samaj Road, Rampura,<br />
                    Kota, Rajasthan
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Base bottom details */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-4 md:space-y-0 text-[11px] text-[#111111]/50">
          
          <p className="font-sans">
            &copy; {currentYear} <strong>Shri Jain Stationery Mart</strong>. All Rights Reserved.
          </p>

          <p className="font-sans uppercase tracking-[0.15em] text-[9px] flex items-center space-x-1 justify-center font-bold">
            <span>Corporate Trust Verified</span>
            <span className="w-1 h-1 bg-[#D4AF37] rounded-full" />
            <span className="text-[#D4AF37]">Manoj Jain</span>
          </p>

          <div className="flex space-x-4">
            <button onClick={onQuoteClick} className="hover:text-[#D4AF37] transition-all uppercase tracking-wider font-bold cursor-pointer">Request Quote</button>
            <span>•</span>
            <a href="tel:+919414231059" className="hover:text-[#D4AF37] transition-all uppercase tracking-wider font-bold">Call Directly</a>
          </div>

        </div>

      </motion.div>
    </footer>
  );
}
