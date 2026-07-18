import { useState, useEffect } from 'react';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandsShowcase from './components/BrandsShowcase';
import Categories from './components/Categories';
import WhyChooseUs from './components/WhyChooseUs';
import BulkOrders from './components/BulkOrders';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OpeningAnimation from './components/OpeningAnimation';
import EnquiryPage from './components/EnquiryPage';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState('');
  const [animationCompleted, setAnimationCompleted] = useState(false);

  // Lock body scroll when enquiry page is open
  useEffect(() => {
    if (isQuoteModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isQuoteModalOpen]);

  const handleAnimationComplete = () => {
    setAnimationCompleted(true);
  };

  // Handle smooth scroll navigation targets
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset slightly to account for the floating navigation bar
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Trigger wholesale quote request modal with preselected category
  const handleRequestQuote = (categoryName?: string) => {
    if (categoryName) {
      setPreselectedCategory(categoryName);
    } else {
      setPreselectedCategory('');
    }
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="relative min-h-screen text-[#111111] font-sans selection:bg-[#D4AF37]/30 selection:text-[#111111]">
      
      {/* 1. CINEMATIC OPENING ANIMATION (Plays on every reload/refresh) */}
      {!animationCompleted && (
        <OpeningAnimation onComplete={handleAnimationComplete} />
      )}

      {/* Main Website - Always in DOM to preserve scroll position */}
      <div className="relative w-full">
        {/* 3. IMMERSIVE Parallax 3D Background & Floating Stationery Elements */}
        <Background3D />

        {/* 4. FLOATING TRANSLUCENT GLASS NAVIGATION BAR (Hidden during Enquiry to keep user focused) */}
        {!isQuoteModalOpen && (
          <Navbar 
            onNavClick={handleScrollToSection} 
            onQuoteClick={() => handleRequestQuote()} 
          />
        )}

        {/* 6. MAIN APPLICATION SECTIONS FLOW */}
        <main className="relative z-10 w-full overflow-hidden">
          
          {/* Full-Screen Hero & Handwriting Signature Flow */}
          <Hero 
            onExploreProducts={() => handleScrollToSection('categories')} 
            onContactClick={() => handleScrollToSection('contact')} 
            isReady={animationCompleted}
          />

          {/* Seamless Infinite Brand Pipeline */}
          <BrandsShowcase />

          {/* Premium Notebook Styled Category Catalogs */}
          <Categories onQuoteClick={handleRequestQuote} />

          {/* Distinctive Features List */}
          <WhyChooseUs />

          {/* 5. SINGLE-CARD PREMIUM WHOLESALE ORDERS SECTION */}
          <BulkOrders 
            onQuoteClick={handleRequestQuote} 
          />

          {/* Est 1980 Heritage Narrative & Owner मनोज जैन profile details */}
          <About />

          {/* Genuine Client Testimonials */}
          <Testimonials />

          {/* Store Visit Section (Leather/Notebook pinboard, Google Map iframe, advisory desk form) */}
          <Contact />

        </main>

        {/* 7. PRESTIGE CLOSED CLOSURE FOOTER */}
        <Footer 
          onNavClick={handleScrollToSection} 
          onQuoteClick={() => handleRequestQuote()} 
        />
      </div>

      {/* 2. FULL-SCREEN ENQUIRY PAGE (Sits on top with high z-index, handles back/close smoothly) */}
      {isQuoteModalOpen && (
        <EnquiryPage 
          prefilledProduct={preselectedCategory} 
          onClose={() => setIsQuoteModalOpen(false)} 
        />
      )}

    </div>
  );
}
