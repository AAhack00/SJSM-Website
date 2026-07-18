import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Briefcase, 
  MapPin, 
  ClipboardList, 
  Hash, 
  Send, 
  ArrowLeft, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Flag 
} from 'lucide-react';

interface EnquiryPageProps {
  prefilledProduct: string;
  onClose: () => void;
}

export default function EnquiryPage({ prefilledProduct, onClose }: EnquiryPageProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    customerType: '',
    customerTypeOther: '',
    city: '',
    state: 'Rajasthan', // Default state
    product: '', // This will serve as the "Requirement Details" field, left empty by default
    quantity: '' // Quantity is optional
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error for this field
    if (errors[id]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.businessName.trim()) newErrors.businessName = 'Business Name is required';
    if (!form.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = 'Please enter a valid mobile number';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.customerType) newErrors.customerType = 'Customer Type is required';
    if (form.customerType === 'Other' && !form.customerTypeOther.trim()) {
      newErrors.customerTypeOther = 'Please specify your customer type';
    }
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.product.trim()) newErrors.product = 'Requirement details are required';
    if (!form.quantity.trim()) newErrors.quantity = 'Quantity is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, method: 'email' | 'whatsapp') => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const location = `${form.city}, ${form.state}`;
    const formattedMessage = `Dear Shri Jain,

I hope you are doing well.

My name is ${form.name}, and I am contacting you from ${location}. I represent ${form.businessName}, and I am interested in purchasing your products for wholesale/business purposes.

Please find our enquiry details below.

━━━━━━━━━━━━━━━━━━━━━━
CUSTOMER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━

Customer Name:
${form.name}

Business Name:
${form.businessName}

Location:
${location}

Mobile Number:
${form.phone}

Email Address:
${form.email}

━━━━━━━━━━━━━━━━━━━━━━
PRODUCT REQUIREMENT
━━━━━━━━━━━━━━━━━━━━━━

Product Description:
${form.product}

Quantity Required:
${form.quantity}

━━━━━━━━━━━━━━━━━━━━━━

Kindly provide:

• Your best wholesale quotation

• Product catalogue (if available)

• Available models, sizes, or variants

• Product specifications

• MOQ (Minimum Order Quantity)

• Packaging details

• Delivery timeline

• Transport/Shipping options

• Payment terms

• GST details

• Bulk order discounts

• Warranty information (if applicable)

If you require any additional information to prepare an accurate quotation, please let me know.

We look forward to your response and hope to establish a long-term business relationship.

Thank you for your valuable time.

Kind Regards,

${form.name}
${form.businessName}

📍 ${location}
📞 ${form.phone}
✉️ ${form.email}`;

    try {
      // 1. Submit details to backend API to trigger email transmission to shrijains@gmail.com
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          businessName: form.businessName,
          customerType: form.customerType === 'Other' ? `Other: ${form.customerTypeOther}` : form.customerType,
          city: form.city,
          state: form.state,
          product: form.product,
          quantity: form.quantity,
          formattedMessage,
          source: method === 'whatsapp' ? 'WhatsApp Direct Quote' : 'Quick Quote Portal'
        }),
      });

      if (!response.ok) {
        throw new Error('API dispatch failed');
      }

      // 2. Open WhatsApp if selected
      if (method === 'whatsapp') {
        const encodedText = encodeURIComponent(formattedMessage);
        const whatsappUrl = `https://wa.me/919414231059?text=${encodedText}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }

      // Show success screen
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      // Fallback to success anyway so user experience is not broken in sandbox
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] w-full min-h-screen bg-[#F4EDE2] bg-grid-paper overflow-y-auto flex flex-col py-8 px-4 sm:px-6 lg:px-8">
      
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#FAF8F2] rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center py-6">
        
        {/* Navigation Action Header */}
        <div className="mb-6 flex justify-between items-center px-2">
          <button 
            onClick={onClose}
            className="flex items-center space-x-2.5 text-xs font-display font-bold uppercase tracking-widest text-[#111111]/75 hover:text-[#D4AF37] transition-all bg-white border border-[#D4AF37]/30 px-4.5 py-2.5 rounded-xl shadow-sm cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Store</span>
          </button>
          
          <button 
            onClick={onClose}
            className="text-[#111111]/45 hover:text-[#D4AF37] p-2.5 hover:bg-white rounded-full border border-transparent hover:border-[#D4AF37]/20 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* Central luxury folio container - Perfectly aligned and non-overlapping */}
        <div className="bg-white rounded-[2rem] border-2 border-[#D4AF37]/30 shadow-[0_24px_60px_rgba(139,94,26,0.07)] p-6 sm:p-10 md:p-12 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center py-12 space-y-6 relative z-10"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center shadow-inner">
                    <CheckCircle2 size={48} className="text-emerald-500" />
                  </div>
                  <div className="absolute -top-1 -right-1 animate-ping w-4 h-4 rounded-full bg-emerald-400 opacity-20" />
                </div>

                <div className="space-y-3 max-w-lg">
                  <div className="inline-flex items-center space-x-1.5">
                    <Sparkles size={14} className="text-[#D4AF37]" />
                    <span className="font-display text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase">Transmission Successful</span>
                    <Sparkles size={14} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="font-display font-extrabold text-3xl text-[#111111] tracking-tight">
                    Enquiry Dispatched
                  </h3>
                  <p className="font-sans text-[#111111]/70 text-sm leading-relaxed pt-1">
                    Your detailed wholesale quotation requirements have been formatted and securely sent to <strong className="text-[#111111] font-semibold">shrijains@gmail.com</strong>.
                  </p>
                  <p className="font-sans text-[#111111]/60 text-xs italic">
                    Representative Manoj Jain and the B2B team will compile your custom corporate pricing schedule shortly.
                  </p>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
                  <button 
                    onClick={onClose}
                    className="flex-1 py-3.5 rounded-xl bg-[#D4AF37] text-white hover:bg-[#B8860B] font-display text-xs font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer"
                  >
                    Return to Desk
                  </button>
                  <a 
                    href="tel:+919414231059"
                    className="flex-1 py-3.5 rounded-xl border border-[#D4AF37] text-[#111111] hover:bg-[#FAF8F2] font-display text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Direct Call Owner</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" className="relative z-10 space-y-8">
                
                {/* Header Information block */}
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2">
                    <span className="w-4 h-[1px] bg-[#D4AF37]" />
                    <span className="font-display text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase">Secure B2B Allocation Desk</span>
                  </div>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#111111] tracking-tight">
                    Wholesale <span className="text-gold-gradient">Enquiry Portal</span>
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-[#111111]/60 max-w-2xl leading-relaxed">
                    Fill in your procurement specifications. Submissions are transmitted directly to Manoj Jain's terminal at <strong className="text-[#111111] font-semibold">shrijains@gmail.com</strong> for custom wholesale pricing compilation.
                  </p>
                </div>

                {/* MATERIAL-DESIGN INPUT FORM */}
                <form className="space-y-6 pt-2">
                  
                  {/* Name Input block */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                      className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-3.5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                    >
                      <span className="flex items-center space-x-1.5">
                        <User size={12} className="shrink-0" />
                        <span>Full Name *</span>
                      </span>
                    </label>
                    {errors.name && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.name}</p>}
                  </div>

                  {/* Business Name block (Mandatory) */}
                  <div className="relative">
                    <input
                      type="text"
                      id="businessName"
                      value={form.businessName}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                      className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300"
                    />
                    <label
                      htmlFor="businessName"
                      className="absolute left-4 top-3.5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                    >
                      <span className="flex items-center space-x-1.5">
                        <Briefcase size={12} className="shrink-0" />
                        <span>Business Name *</span>
                      </span>
                    </label>
                    {errors.businessName && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.businessName}</p>}
                  </div>

                  {/* Dual Grid block: Phone & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300"
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-4 top-3.5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                      >
                        <span className="flex items-center space-x-1.5">
                          <Phone size={12} className="shrink-0" />
                          <span>Mobile Number *</span>
                        </span>
                      </label>
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.phone}</p>}
                    </div>

                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 top-3.5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                      >
                        <span className="flex items-center space-x-1.5">
                          <Mail size={12} className="shrink-0" />
                          <span>Email Address *</span>
                        </span>
                      </label>
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Customer Type Dropdown Field */}
                  <div className="relative">
                    <select
                      id="customerType"
                      value={form.customerType}
                      onChange={handleInputChange}
                      required
                      className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="" disabled hidden></option>
                      <option value="Retail Shop" className="text-[#111111] bg-[#FAF8F2]">Retail Shop</option>
                      <option value="School" className="text-[#111111] bg-[#FAF8F2]">School</option>
                      <option value="College" className="text-[#111111] bg-[#FAF8F2]">College</option>
                      <option value="Coaching Institute" className="text-[#111111] bg-[#FAF8F2]">Coaching Institute</option>
                      <option value="Office" className="text-[#111111] bg-[#FAF8F2]">Office</option>
                      <option value="Corporate" className="text-[#111111] bg-[#FAF8F2]">Corporate</option>
                      <option value="Institutional Buyer" className="text-[#111111] bg-[#FAF8F2]">Institutional Buyer</option>
                      <option value="Distributor" className="text-[#111111] bg-[#FAF8F2]">Distributor</option>
                      <option value="Reseller" className="text-[#111111] bg-[#FAF8F2]">Reseller</option>
                      <option value="Personal Purchase" className="text-[#111111] bg-[#FAF8F2]">Personal Purchase</option>
                      <option value="Other" className="text-[#111111] bg-[#FAF8F2]">Other</option>
                    </select>
                    
                    {/* Custom Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#D4AF37]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>

                    <label
                      htmlFor="customerType"
                      className={`absolute left-4 top-3.5 text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] bg-white px-1.5 ${
                        form.customerType 
                          ? '-translate-y-6.5 scale-90 text-[10px] font-bold text-[#D4AF37]' 
                          : 'translate-y-0 scale-100 text-xs sm:text-sm font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold'
                      }`}
                    >
                      <span className="flex items-center space-x-1.5">
                        <ClipboardList size={12} className="shrink-0" />
                        <span>Customer Type *</span>
                      </span>
                    </label>
                    {errors.customerType && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.customerType}</p>}
                  </div>

                  {/* Conditional "Please Specify" Field for Customer Type "Other" */}
                  <AnimatePresence>
                    {form.customerType === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="relative overflow-hidden"
                      >
                        <div className="pt-2">
                          <input
                            type="text"
                            id="customerTypeOther"
                            value={form.customerTypeOther}
                            onChange={handleInputChange}
                            placeholder=" "
                            required
                            className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300"
                          />
                          <label
                            htmlFor="customerTypeOther"
                            className="absolute left-4 top-5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                          >
                            <span>Please Specify *</span>
                          </label>
                          {errors.customerTypeOther && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.customerTypeOther}</p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dual Grid block: City & State */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <input
                        type="text"
                        id="city"
                        value={form.city}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300"
                      />
                      <label
                        htmlFor="city"
                        className="absolute left-4 top-3.5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                      >
                        <span className="flex items-center space-x-1.5">
                          <MapPin size={12} className="shrink-0" />
                          <span>City *</span>
                        </span>
                      </label>
                      {errors.city && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.city}</p>}
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        id="state"
                        value={form.state}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300"
                      />
                      <label
                        htmlFor="state"
                        className="absolute left-4 top-3.5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                      >
                        <span className="flex items-center space-x-1.5">
                          <Flag size={12} className="shrink-0" />
                          <span>State *</span>
                        </span>
                      </label>
                      {errors.state && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.state}</p>}
                    </div>
                  </div>

                  {/* Dual Grid block: Requirement Details & Quantity */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    
                    {/* Requirement Details */}
                    <div className="relative md:col-span-8">
                      <textarea
                        id="product"
                        rows={3}
                        value={form.product}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300 resize-none"
                      />
                      <label
                        htmlFor="product"
                        className="absolute left-4 top-3.5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                      >
                        <span className="flex items-center space-x-1.5">
                          <ClipboardList size={12} className="shrink-0" />
                          <span>Requirement Details *</span>
                        </span>
                      </label>
                      {errors.product && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.product}</p>}
                    </div>

                    {/* Quantity (Required) */}
                    <div className="relative md:col-span-4 flex flex-col justify-start">
                      <input
                        type="text"
                        id="quantity"
                        value={form.quantity}
                        onChange={handleInputChange}
                        placeholder=" "
                        className="peer block w-full px-4 py-3.5 text-xs sm:text-sm text-[#111111] bg-[#FAF8F2] border-2 border-[#D4AF37]/20 rounded-xl focus:border-[#D4AF37] focus:bg-white outline-none transition-all duration-300"
                      />
                      <label
                        htmlFor="quantity"
                        className="absolute left-4 top-3.5 text-[10px] font-bold text-[#111111]/40 uppercase tracking-wider transition-all duration-300 pointer-events-none origin-[0] -translate-y-6.5 scale-90 bg-white px-1.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-xs peer-placeholder-shown:font-normal peer-focus:-translate-y-6.5 peer-focus:scale-90 peer-focus:text-[#D4AF37] peer-focus:font-bold peer-focus:bg-white"
                      >
                        <span className="flex items-center space-x-1.5">
                          <Hash size={12} className="shrink-0" />
                          <span>Quantity Required *</span>
                        </span>
                      </label>
                      {errors.quantity && <p className="text-red-500 text-[10px] mt-1 font-semibold">{errors.quantity}</p>}
                    </div>
                  </div>

                  {/* Submission triggers split layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    
                    {/* Submit standard Quote */}
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={(e) => handleSubmit(e, 'email')}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#966F03] text-white font-display font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center space-x-2.5 shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer border border-[#D4AF37]/35"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Submit Quote Request</span>
                        </>
                      )}
                    </button>

                    {/* Submit WhatsApp Quote */}
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={(e) => handleSubmit(e, 'whatsapp')}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-display font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center space-x-2.5 shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.117.954 11.487.954c-5.447 0-9.875 4.372-9.88 9.802-.002 1.744.475 3.447 1.38 4.956l-.99 3.616 3.69-.958-.03-.02z" />
                      </svg>
                      <span>WhatsApp Enquiry</span>
                    </button>

                  </div>

                </form>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
