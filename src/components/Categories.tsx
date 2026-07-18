import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  GraduationCap, 
  PenTool, 
  BookOpen, 
  Paintbrush, 
  Palette, 
  Compass, 
  Briefcase, 
  Gift, 
  ChevronRight, 
  Search,
  ShoppingCart
} from 'lucide-react';
import { Category } from '../types';

interface CategoriesProps {
  onQuoteClick: (categoryName: string) => void;
}

interface CategoryCardProps {
  key?: React.Key;
  cat: Category;
  idx: number;
  isSelected: boolean;
  onToggle: () => void;
  getIcon: (iconName: string) => React.ReactNode;
}

function CategoryCard({ cat, idx, isSelected, onToggle, getIcon }: CategoryCardProps) {
  // 3D Mouse Tilt Tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ 
        type: 'spring',
        stiffness: 140,
        damping: 18,
        delay: idx * 0.05 
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onToggle}
      className={`relative group rounded-xl p-6 flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-300 shadow-[0_5px_15px_rgba(170,124,17,0.03)] hover:shadow-[0_20px_40px_rgba(170,124,17,0.12)] paper-curl-right bg-white ${
        isSelected ? 'border-2 border-[#D4AF37] ring-1 ring-[#D4AF37]/30' : 'border-2 border-[#D4AF37]/20 hover:border-[#D4AF37]/60'
      }`}
    >
      {/* Notebook ruling inside card background to look like stationery paper */}
      <div className="absolute inset-0 bg-notebook-ruled opacity-25 pointer-events-none" />
      
      {/* Accent shadow decoration */}
      <div className="absolute -right-12 -top-12 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl group-hover:bg-[#D4AF37]/25 transition-all duration-500 pointer-events-none" />

      <div className="space-y-4 relative z-10" style={{ transform: 'translateZ(20px)' }}>
        
        {/* Float Icon Holder */}
        <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] border-2 border-[#D4AF37]/35 flex items-center justify-center shadow-sm transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          <div className="flex items-center space-x-1">
            <span className="text-lg" role="img" aria-label={cat.title}>{cat.emoji}</span>
            <span className="hidden group-hover:inline">{getIcon(cat.icon)}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-display font-bold text-base text-[#111111] group-hover:text-[#D4AF37] transition-colors flex items-center space-x-2">
            <span>{cat.emoji}</span>
            <span>{cat.title}</span>
          </h3>
          <p className="font-sans text-xs text-[#111111]/75 leading-relaxed line-clamp-2">
            {cat.description}
          </p>
        </div>

        {/* Sub-item highlight bullet points */}
        <div className="space-y-1.5 pt-2 border-t border-[#D4AF37]/10" style={{ transform: 'translateZ(10px)' }}>
          <p className="text-[9px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase">Stock Range Highlight:</p>
          <ul className="space-y-1">
            {cat.items.slice(0, 2).map((item, i) => (
              <li key={i} className="text-[11px] text-[#111111]/80 font-sans flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Stamp */}
      <div className="absolute right-3 bottom-3 opacity-15 group-hover:opacity-40 transition-opacity duration-300 text-[8px] font-mono tracking-widest text-[#D4AF37] font-black pointer-events-none">
        GENUINE
      </div>
    </motion.div>
  );
}

export default function Categories({ onQuoteClick }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  const categories: Category[] = [
    {
      id: 'school',
      title: 'School Stationery',
      emoji: '🎒',
      icon: 'school',
      description: 'Premium notebooks, school bags, registers, mathematical kits, and high-performance study utilities.',
      items: ['DOMS & Classmate Notebooks', 'Ergonomic Premium Backpacks', 'Fine Writing Instrument Sets', 'Wholesale Exam Pad Bundles']
    },
    {
      id: 'pens',
      title: 'Pens & Pencils',
      emoji: '✏️',
      icon: 'pens',
      description: 'Luxurious fountain pens, fine metal rollerballs, executive gel pens, and professional graphite sketching pencils.',
      items: ['Parker & Uniball Writing Kits', 'Pentonic Gel Pen Wholesale Packs', 'Apsara & Nataraj Classic Pencils', 'Luxurious Sign Pen Collections']
    },
    {
      id: 'notebooks',
      title: 'Notebooks',
      emoji: '📒',
      icon: 'notebooks',
      description: 'Premium bond-paper journals, executive spiral-bound diaries, registers, and elegant accounts ledger logs.',
      items: ['Classmate Premium Notebooks', 'PU Leather Executive Diaries', 'Duplicate Bill Books & Vouchers', 'Drawing Sketchbooks (120+ GSM)']
    },
    {
      id: 'art',
      title: 'Art & Craft',
      emoji: '🎨',
      icon: 'art',
      description: 'Exquisite canvases, crafting kits, modeling clay, fine-point utility scissors, and professional adhesives.',
      items: ['Pidilite Fevicol Wholesale Bulks', 'Camel Canvas Boards', 'Maped Craft Scissors', 'Origami & Premium Crepe Papers']
    },
    {
      id: 'colors',
      title: 'Colors & Paints',
      emoji: '🖍️',
      icon: 'colors',
      description: 'Professional-grade acrylics, rich watercolors, deep-pigmented oil pastels, and premium sketching markers.',
      items: ['Camel Artist Acrylic Paints', 'Faber-Castell Connector Pens', 'DOMS Bi-Color Wax Crayons', 'Pentonic Marker Assortments']
    },
    {
      id: 'geometry',
      title: 'Geometry Boxes',
      emoji: '📐',
      icon: 'geometry',
      description: 'High-precision engineering compasses, clear non-shattering math scales, dividers, and pro drafting sets.',
      items: ['Kangaro & Maped Geometry Sets', 'Flexible Transparent Rulers', 'Camlin Engineering Instruments', 'Premium Compass & Dividers']
    },
    {
      id: 'office',
      title: 'Office Supplies',
      emoji: '🖇️',
      icon: 'office',
      description: 'Commercial staplers, heavy-duty punching units, document filers, executive organizers, and calculators.',
      items: ['Kangaro Staplers & Staples', 'Omega File & Folder Organizers', 'Casio Commercial Calculators', 'Oddy Post-it Notes & Flags']
    },
    {
      id: 'gifts',
      title: 'Return Gifts',
      emoji: '🎁',
      icon: 'gifts',
      description: 'Elegant executive gift sets, customized childrens art combo buckets, and personalized corporate luxury kits.',
      items: ['Executive Pen & Diary Gift Sets', 'Childrens Art & Paint Hamper Boxes', 'Custom Stationery Utility Trays', 'Luxurious Desktop Organizer Cabinets']
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'school': return <GraduationCap size={24} className="text-[#D4AF37]" />;
      case 'pens': return <PenTool size={24} className="text-[#D4AF37]" />;
      case 'notebooks': return <BookOpen size={24} className="text-[#D4AF37]" />;
      case 'art': return <Paintbrush size={24} className="text-[#D4AF37]" />;
      case 'colors': return <Palette size={24} className="text-[#D4AF37]" />;
      case 'geometry': return <Compass size={24} className="text-[#D4AF37]" />;
      case 'office': return <Briefcase size={24} className="text-[#D4AF37]" />;
      case 'gifts': return <Gift size={24} className="text-[#D4AF37]" />;
      default: return <PenTool size={24} className="text-[#D4AF37]" />;
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.title.toLowerCase().includes(filterQuery.toLowerCase()) || 
    cat.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
    cat.items.some(item => item.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <section id="categories" className="relative py-24 bg-[#FAF8F2] bg-notebook-ruled">
      
      {/* Delicate visual background dividers */}
      <div className="absolute right-10 top-1/4 w-[400px] h-[400px] bg-[#D4AF37]/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-10 bottom-1/4 w-[350px] h-[350px] bg-[#D4AF37]/2 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 md:px-16 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
            <span className="font-display text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase">
              Curated Wholesale Catalog
            </span>
            <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
          </div>
          
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-[#111111]">
            Our Wholesale <span className="text-gold-gradient">Categories</span>
          </h2>
          
          <p className="font-sans font-medium text-[#111111]/70 text-sm md:text-base leading-relaxed">
            Explore our massive wholesale supplies. We maintain extensive direct inventories from leading global manufacturers to ensure unbeatable wholesale pricing.
          </p>

          {/* Catalog Filter Box */}
          <div className="pt-6 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search categories, items or brands..."
                className="w-full bg-white border-2 border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-full py-3 pl-12 pr-12 text-sm font-sans text-[#111111] placeholder-[#111111]/40 transition-all outline-none shadow-sm"
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
              {filterQuery && (
                <button 
                  onClick={() => setFilterQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:text-[#111111] text-xs font-bold tracking-widest"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories Grid - Textured cards with subtle lift and gold trim */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((cat, idx) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              idx={idx}
              isSelected={selectedCategory === cat.id}
              onToggle={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              getIcon={getIcon}
            />
          ))}
        </div>

        {/* Detailed Catalog Modal Overlay */}
        {selectedCategory && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="mt-12 p-8 rounded-2xl bg-white border-2 border-[#D4AF37]/35 shadow-[0_15px_40px_rgba(170,124,17,0.1)] relative overflow-hidden"
          >
            {/* Paper Margin Red line */}
            <div className="absolute top-0 bottom-0 left-8 w-[1.5px] bg-red-200" />
            <div className="absolute inset-0 bg-notebook-ruled opacity-20 pointer-events-none" />

            <div className="absolute right-6 top-6">
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-[#111111]/70 hover:text-[#D4AF37] font-display text-xs font-bold px-4 py-2 rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all bg-white shadow-sm"
              >
                CLOSE DESK DETAIL
              </button>
            </div>

            {(() => {
              const cat = categories.find(c => c.id === selectedCategory);
              if (!cat) return null;
              return (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 pl-4 md:pl-8">
                  <div className="md:col-span-4 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#FAF8F2] border-2 border-[#D4AF37]/35 flex items-center justify-center shadow-sm">
                      <span className="text-3xl">{cat.emoji}</span>
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-[#111111]">
                      {cat.title}
                    </h3>
                    <p className="font-sans text-sm text-[#111111]/80 leading-relaxed">
                      {cat.description}
                    </p>
                    <button
                      onClick={() => onQuoteClick(cat.title)}
                      className="gold-gradient-btn hover:gold-gradient-btn-hover text-black px-6 py-3 rounded-lg font-display font-bold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 shadow-md border border-[#D4AF37]/30"
                    >
                      <ShoppingCart size={13} />
                      <span>Order Wholesale Bulk</span>
                    </button>
                  </div>

                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cat.items.map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08, type: 'spring', stiffness: 100 }}
                        whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 20px rgba(170,124,17,0.08)' }}
                        className="bg-[#FAF8F2]/60 border-2 border-[#D4AF37]/20 rounded-xl p-4 flex items-start space-x-3 hover:border-[#D4AF37] hover:bg-white transition-all shadow-sm"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[11px] font-mono text-[#D4AF37] font-bold shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-sans font-bold text-[#111111] text-sm">{item}</p>
                          <p className="text-[9px] text-[#D4AF37] uppercase font-mono tracking-wider mt-0.5 font-semibold">Wholesale Box Packs</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* Empty Search State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16 bg-white border-2 border-dashed border-[#D4AF37]/30 rounded-xl mt-6">
            <p className="font-display text-lg text-[#111111]/60">No wholesale category matches your desk search query.</p>
            <button 
              onClick={() => setFilterQuery('')}
              className="mt-3 text-[#D4AF37] hover:text-[#111111] font-display font-bold text-xs tracking-wider uppercase transition-colors"
            >
              Reset Search Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
