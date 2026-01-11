export interface Service {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  icon: string;
}

export interface SessionOption {
  duration: number; // in minutes
  price: number; // in rupees
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  service: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  sessionDuration: number;
  sessionPrice: number;
  paymentScreenshot: string | null;
  paymentVerified: boolean;
  bookingDate: string | null;
  createdAt: string;
  status: 'pending_payment' | 'payment_uploaded' | 'payment_verified' | 'scheduled' | 'completed' | 'cancelled';
}

export interface CalendarSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}
