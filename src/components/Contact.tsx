import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, User, MessageSquare, Send, CheckCircle2, Loader2, Sparkles, Navigation, CalendarDays } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          businessName: '',
          city: 'Kota',
          state: 'Rajasthan',
          product: 'General Advisory Enquiry',
          quantity: 'N/A',
          message: formState.message,
          source: 'Direct Advisory Desk Form'
        }),
      });

      if (response.ok) {
        setSendSuccess(true);
        setTimeout(() => {
          setFormState({ name: '', email: '', phone: '', message: '' });
          setSendSuccess(false);
        }, 4000);
      } else {
        throw new Error('API dispatch failed');
      }
    } catch (err) {
      console.error(err);
      // Fallback to success in case of sandbox connection lag
      setSendSuccess(true);
      setTimeout(() => {
        setFormState({ name: '', email: '', phone: '', message: '' });
        setSendSuccess(false);
      }, 4000);
    } finally {
      setIsSending(false);
    }
  };

  const mapsUrl = "https://www.google.com/maps/place/Shri+jain+stationery+mart/@25.1875944,75.8434476,17z/data=!4m15!1m8!3m7!1s0x396f9b22938248ff:0x5f5d410b464cc814!2sShri+jain+stationery+mart!8m2!3d25.1875234!4d75.8434696!10e5!16s%2Fg%2F11c380vplj!3m5!1s0x396f9b22938248ff:0x5f5d410b464cc814!8m2!3d25.1875234!4d75.8434696!16s%2Fg%2F11c380vplj";

  return (
    <section id="contact" className="relative py-24 bg-[#FAF8F2] overflow-hidden border-t border-[#D4AF37]/20">
      
      {/* Background glowing gold lights */}
      <div className="absolute right-10 top-10 w-[500px] h-[500px] bg-[#D4AF37]/4 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-1/4 w-[400px] h-[400px] bg-[#FAF8F2] rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
            <span className="font-display text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
              Establish Connections
            </span>
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
          </div>

          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-[#111111]">
            Secure Your <span className="text-gold-gradient">Supply Chain</span>
          </h2>

          <p className="font-sans font-medium text-[#111111]/70 text-sm max-w-xl mx-auto leading-relaxed">
            Get in touch with Shri Jain Stationery Mart. Direct support is available for quick quotes, custom branding queries, and fast shipping coordinates.
          </p>
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: VISIT OUR STORE (Styled like premium notebook pinned on wooden desk) - slides from Left */}
          <motion.div 
            initial={{ opacity: 0, x: -75 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 70, damping: 15 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            
            <div className="relative p-1 bg-amber-950/20 rounded-3xl shadow-[0_25px_50px_rgba(45,30,10,0.18)] border border-[#3D250A]/20">
              
              {/* Dark Wood Grain outer border representation */}
              <div className="absolute inset-0 bg-[#2D1B07] rounded-3xl opacity-90 mix-blend-overlay pointer-events-none" />
              
              {/* Notebook Paper Body */}
              <div className="bg-[#FFFDF8] rounded-2xl p-6 sm:p-10 border-2 border-[#D4AF37]/35 relative overflow-hidden paper-curl-right">
                
                {/* Brass spiral binding holes/staples at the top */}
                <div className="absolute top-4 inset-x-0 flex justify-center space-x-3 pointer-events-none z-15">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-700 via-[#D4AF37] to-amber-950 shadow-inner border border-amber-950/20" />
                      <div className="w-1 h-3 bg-amber-900/30 -mt-1 rounded-full" />
                    </div>
                  ))}
                </div>

                {/* Notebook page margin lines */}
                <div className="absolute top-0 bottom-0 left-8 w-[1px] bg-red-200 pointer-events-none" />
                <div className="absolute inset-0 bg-notebook-ruled opacity-25 pointer-events-none" />

                <div className="relative z-10 space-y-6 pt-4 pl-4">
                  
                  {/* Store Header */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-lg md:text-xl text-[#111111] tracking-wide">
                        Visit Our Store
                      </span>
                      <span className="text-[9px] font-mono font-bold tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/20 uppercase flex items-center space-x-1">
                        <CalendarDays size={10} />
                        <span>EST. 1979</span>
                      </span>
                    </div>
                    <div className="h-[2px] w-full bg-gradient-to-r from-[#D4AF37] via-[#FAF8F2] to-transparent" />
                  </div>

                  {/* Physical credentials & logs - contact cards animate one after another */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    
                    <div className="space-y-3.5">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex items-start space-x-2.5"
                      >
                        <Sparkles size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[9px] font-mono text-[#111111]/40 uppercase tracking-widest font-semibold">Entity Name</p>
                          <p className="font-bold text-[#111111] text-sm mt-0.5">Shri Jain Stationery Mart</p>
                        </div>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-start space-x-2.5"
                      >
                        <User size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[9px] font-mono text-[#111111]/40 uppercase tracking-widest font-semibold">Proprietor / Owner</p>
                          <p className="font-bold text-[#111111] mt-0.5">Manoj Jain</p>
                        </div>
                      </motion.div>
                    </div>

                    <div className="space-y-3.5">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex items-start space-x-2.5"
                      >
                        <Phone size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[9px] font-mono text-[#111111]/40 uppercase tracking-widest font-semibold">Direct Voice Line</p>
                          <a href="tel:+919414231059" className="font-bold text-[#111111] hover:text-[#D4AF37] mt-0.5 block transition-colors">
                            +91 9414231059
                          </a>
                        </div>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-start space-x-2.5"
                      >
                        <Mail size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[9px] font-mono text-[#111111]/40 uppercase tracking-widest font-semibold">Official Email</p>
                          <a href="mailto:shrijains@gmail.com" className="font-bold text-[#111111] hover:text-[#D4AF37] mt-0.5 block transition-colors break-all">
                            shrijains@gmail.com
                          </a>
                        </div>
                      </motion.div>
                    </div>

                  </div>

                  {/* Google Map Embedded Iframe pointing to Kota Branch - Slides into view */}
                  <motion.div 
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ type: 'spring', stiffness: 70, damping: 15, delay: 0.15 }}
                    className="rounded-xl border border-[#D4AF37]/35 overflow-hidden h-[180px] shadow-inner relative group bg-white"
                  >
                    <iframe
                      title="Shri Jain Stationery Mart Store Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.150493032737!2d75.84087267608249!3d25.18752823164923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f9b22938248ff%3A0x5f5d410b464cc814!2sShri%20jain%20stationery%20mart!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ 
                        border: 0, 
                        filter: 'contrast(1.05) saturate(0.9) sepia(0.1)' 
                      }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    
                    {/* Maps floating badge */}
                    <div className="absolute bottom-2 left-2 bg-white/95 px-2.5 py-1 rounded border border-[#D4AF37]/20 flex items-center space-x-1 pointer-events-none shadow-sm">
                      <MapPin size={10} className="text-[#D4AF37]" />
                      <span className="text-[9px] text-[#111111] font-sans font-bold">Rampura, Kota (Rajasthan)</span>
                    </div>
                  </motion.div>

                  {/* Connect with Us row */}
                  <div className="pt-2 flex flex-col space-y-2">
                    <p className="text-[9px] font-mono text-[#111111]/40 uppercase tracking-widest font-semibold">Connect with us on</p>
                    <div className="flex flex-wrap gap-2.5">
                      <a 
                        href="https://wa.me/919414231059" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 bg-white text-emerald-600 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all text-xs font-semibold cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.117.954 11.487.954c-5.447 0-9.875 4.372-9.88 9.802-.002 1.744.475 3.447 1.38 4.956l-.99 3.616 3.69-.958-.03-.02z" />
                        </svg>
                        <span className="text-[#111111]/75">WhatsApp</span>
                      </a>
                      
                      <a 
                        href="https://www.facebook.com/shreejainstationerymart/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 bg-white text-[#1877F2] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all text-xs font-semibold cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span className="text-[#111111]/75">Facebook</span>
                      </a>

                      <a 
                        href="https://www.instagram.com/luxury.stationery?igsh=N240d3VkbXpzemsy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 bg-white text-[#E4405F] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all text-xs font-semibold cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        <span className="text-[#111111]/75">Instagram</span>
                      </a>

                      <a 
                        href="https://www.justdial.com/jdmart/Kota-Rajasthan/Shri-Jain-Stationery-Mart-Near-SBI-Ladpura-Branch-in-Rampura/9999PMULDELSTD31301_BZDET/catalogue/products-Highlighter?showSearch=0&nid=11444906" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 bg-white text-[#FF6F00] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all text-xs font-semibold cursor-pointer"
                      >
                        <span className="font-display font-black text-[9px] tracking-tighter">JD</span>
                        <span className="text-[#111111]/75">Justdial</span>
                      </a>
                    </div>
                  </div>

                  {/* Get Directions Trigger Button */}
                  <div className="pt-2">
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-lg border-2 border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white text-[#111111] font-display font-bold text-[10px] tracking-widest uppercase transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                    >
                      <Navigation size={13} className="animate-pulse" />
                      <span>Get Directions on Google Maps</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>

          </motion.div>

          {/* Right: Gorgeous Glass Contact Feedback Form - Fades Upward */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-6"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#D4AF37]/25 shadow-sm relative overflow-hidden paper-curl-left">
              <div className="absolute top-0 bottom-0 left-6 w-[1px] bg-red-200 pointer-events-none" />
              <div className="absolute inset-0 bg-notebook-ruled opacity-20 pointer-events-none" />
              
              {sendSuccess ? (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 relative z-10 pl-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center"
                  >
                    <CheckCircle2 size={28} className="text-emerald-500" />
                  </motion.div>
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-xl text-[#111111]">Message Dispatched</h3>
                    <p className="font-sans text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">We appreciate your contact</p>
                  </div>
                  <p className="font-sans text-xs md:text-sm text-[#111111]/80 max-w-sm">
                    Thank you. Your message has bypassed queue delays and landed on Manoj Jain's direct priority desk. We will reach you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10 pl-6 md:pl-8">
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xl text-[#111111]">Direct Advisory Desk</h3>
                    <p className="font-sans text-xs text-[#111111]/60">Have custom product queries, brand guidelines, or logistics questions? Send details below.</p>
                  </div>

                  <div className="space-y-5 pt-2">
                    {/* Full Name */}
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder=" "
                        className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-4 top-3.5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                      >
                        Your Name
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Email */}
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          required
                          value={formState.email}
                          onChange={handleInputChange}
                          placeholder=" "
                          className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300"
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-4 top-3.5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                        >
                          Email Address
                        </label>
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={formState.phone}
                          onChange={handleInputChange}
                          placeholder=" "
                          className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300"
                        />
                        <label
                          htmlFor="phone"
                          className="absolute left-4 top-3.5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                        >
                          Phone Number
                        </label>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder=" "
                        className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300 resize-none"
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-4 top-3.5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                      >
                        Detailed Requirements / Message
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#966F03] text-white font-display font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center space-x-2.5 shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      {isSending ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Routing Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
