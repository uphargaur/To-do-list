import { createClient } from '@supabase/supabase-js';
import { Booking } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database tables:
// - bookings: stores all booking information
// - testimonials: stores client testimonials (optional, can be managed via admin)

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, 'id' | 'createdAt'>;
        Update: Partial<Omit<Booking, 'id' | 'createdAt'>>;
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          text: string;
          rating: number;
          service: string;
          approved: boolean;
          created_at: string;
        };
        Insert: {
          name: string;
          text: string;
          rating: number;
          service: string;
          approved?: boolean;
        };
        Update: Partial<{
          name: string;
          text: string;
          rating: number;
          service: string;
          approved: boolean;
        }>;
      };
    };
  };
}

// Booking functions
export const createBooking = async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateBooking = async (id: string, updates: Partial<Booking>) => {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) throw error;
  return data;
};

export const uploadPaymentScreenshot = async (file: File, bookingId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${bookingId}-${Date.now()}.${fileExt}`;
  const filePath = `payment-screenshots/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('bookings')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('bookings')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
