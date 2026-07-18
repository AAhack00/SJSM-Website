import React, { MouseEvent } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { ShieldCheck, Tag, Handshake, Layers } from 'lucide-react';
import { Feature } from '../types';

interface FeatureCardProps {
  key?: string;
  feature: Feature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  // Mouse hover coordinate tracking for dynamic mouse tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for high-end organic motion
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  // Map coordinate offset to 3D rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'genuine':
        return <ShieldCheck className="text-[#D4AF37] w-7 h-7 group-hover:scale-110 transition-transform duration-300" />;
      case 'pricing':
        return <Tag className="text-[#D4AF37] w-7 h-7 group-hover:scale-110 transition-transform duration-300" />;
      case 'trusted':
        return <Handshake className="text-[#D4AF37] w-7 h-7 group-hover:scale-110 transition-transform duration-300" />;
      case 'range':
        return <Layers className="text-[#D4AF37] w-7 h-7 group-hover:scale-110 transition-transform duration-300" />;
      default:
        return <ShieldCheck className="text-[#D4AF37] w-7 h-7" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -95, y: -20 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ 
        type: 'spring',
        stiffness: 85,
        damping: 14,
        delay: index * 0.12 
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        originY: 0, // unfold like a notebook page hanging from the top binding
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group rounded-xl bg-white border-2 border-[#D4AF37]/20 p-8 shadow-[0_5px_15px_rgba(170,124,17,0.03)] hover:shadow-[0_20px_45px_rgba(170,124,17,0.12)] overflow-hidden cursor-pointer transition-all duration-300 paper-curl-right"
    >
      {/* Notebook ruling inside card background to look like stationery paper */}
      <div className="absolute inset-0 bg-notebook-ruled opacity-20 pointer-events-none" />

      {/* Internal golden spotlight glow following hover */}
      <div className="absolute -left-16 -top-16 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/15 transition-all duration-500 pointer-events-none" />

      {/* Animated icon holder with independent floating and 3D offset */}
      <motion.div 
        style={{ transform: 'translateZ(30px)' }}
        animate={{ 
          y: [0, -6, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 4.5, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: index * 0.25
        }}
        className="w-14 h-14 rounded-xl bg-[#FAF8F2] border-2 border-[#D4AF37]/35 flex items-center justify-center mb-6 shadow-sm group-hover:border-[#D4AF37] transition-colors"
      >
        {renderIcon(feature.iconName)}
      </motion.div>

      {/* Structured Copy */}
      <div className="space-y-3" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="font-display font-bold text-lg text-[#111111] group-hover:text-[#D4AF37] transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="font-sans text-xs text-[#111111]/75 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Interactive premium corner stamp */}
      <div className="absolute right-4 bottom-4 opacity-20 group-hover:opacity-60 transition-opacity duration-300">
        <span className="font-display text-[9px] tracking-widest font-black text-[#D4AF37]">SJ™</span>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const features: Feature[] = [
    {
      id: '1',
      title: 'Genuine Products',
      description: 'We source directly from premium global brands, guaranteeing 100% authentic stationery materials with official quality compliance.',
      iconName: 'genuine',
    },
    {
      id: '2',
      title: 'Wholesale Pricing',
      description: 'Maximize profit margins with competitive, high-volume bulk discounts. We pass factory savings directly to schools and businesses.',
      iconName: 'pricing',
    },
    {
      id: '3',
      title: 'Trusted Supplier',
      description: 'Serving corporate sectors, distributors, and educational giants since 1979 with precise timeline compliance and absolute reliability.',
      iconName: 'trusted',
    },
    {
      id: '4',
      title: 'Wide Product Range',
      description: 'One-stop procurement for thousands of items across leading labels: notebooks, fine pens, art sets, mathematical kits, and custom return gifts.',
      iconName: 'range',
    },
  ];

  return (
    <section className="relative py-24 bg-[#FFFDF8] border-t border-[#D4AF37]/20 overflow-hidden">
      
      {/* Background spotlights */}
      <div className="absolute left-1/4 top-1/4 w-[450px] h-[450px] bg-[#D4AF37]/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-10 bottom-10 w-[500px] h-[500px] bg-[#FAF8F2] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
            <span className="font-display text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
              Operational Advantages
            </span>
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
          </div>

          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-[#111111]">
            Why Partner <span className="text-gold-gradient">With Us</span>
          </h2>

          <p className="font-sans font-medium text-[#111111]/70 text-sm md:text-base leading-relaxed">
            Delivering the perfect combination of corporate precision, premium quality controls, and unmatched commercial value. Hover over each card to experience active dynamic 3D response.
          </p>
        </div>

        {/* Features 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1000px]">
          {features.map((feature, idx) => (
            <FeatureCard key={feature.id} feature={feature} index={idx} />
          ))}
        </div>

        {/* Corporate Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 p-8 rounded-xl bg-white border-2 border-[#D4AF37]/25 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 text-center md:text-left shadow-sm"
        >
          <div className="space-y-2">
            <p className="font-display text-lg font-bold text-[#111111] tracking-wide">Ready to elevate your wholesale supply?</p>
            <p className="font-sans text-xs text-[#111111]/60">Establish a robust wholesale supply chain today with custom priority dispatch.</p>
          </div>
          <a
            href="https://wa.me/919414231059?text=Hello%20Shri%20Jain%20Stationery%20Mart,%20I'm%20interested%20in%20becoming%20a%20partner."
            target="_blank"
            rel="noreferrer"
            className="gold-gradient-btn hover:gold-gradient-btn-hover text-black px-8 py-3.5 rounded-lg font-display font-bold text-xs tracking-wider uppercase transition-all shrink-0 border border-[#D4AF37]/35 shadow-md"
          >
            Become A Partner
          </a>
        </motion.div>

      </div>
    </section>
  );
}
