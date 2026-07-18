export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
  emoji?: string;
}

export interface Brand {
  name: string;
  logoText: string;
  color?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface BulkSector {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface QuoteFormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  sector: string;
  requirements: string;
}
