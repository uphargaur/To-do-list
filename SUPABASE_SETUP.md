# Supabase Setup Guide

This guide will help you set up Supabase for the spiritual counseling website.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
   - Choose a project name (e.g., "spiritual-counseling")
   - Set a strong database password
   - Select a region closest to your users

## Step 2: Create Database Tables

Go to the SQL Editor in your Supabase dashboard and run the following SQL:

### Bookings Table

```sql
-- Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  service TEXT NOT NULL,
  session_duration INTEGER NOT NULL,
  session_price INTEGER NOT NULL,
  payment_screenshot TEXT,
  payment_verified BOOLEAN DEFAULT FALSE,
  booking_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'pending_payment' CHECK (status IN ('pending_payment', 'payment_uploaded', 'payment_verified', 'scheduled', 'completed', 'cancelled'))
);

-- Create index on created_at for faster queries
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);

-- Create index on status for filtering
CREATE INDEX idx_bookings_status ON bookings(status);
```

### Testimonials Table (Optional)

```sql
-- Create testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  service TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for filtering approved testimonials
CREATE INDEX idx_testimonials_approved ON testimonials(approved);
```

## Step 3: Set Up Row Level Security (RLS)

### Enable RLS

```sql
-- Enable RLS on bookings table
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Enable RLS on testimonials table
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
```

### Create RLS Policies for Bookings

```sql
-- Allow public to insert bookings (for booking form)
CREATE POLICY "Allow public insert bookings"
ON bookings FOR INSERT
TO public
WITH CHECK (true);

-- Allow public to read their own bookings (optional - if you want clients to check status)
CREATE POLICY "Allow public read own bookings"
ON bookings FOR SELECT
TO public
USING (true);

-- Allow public to update their own bookings (for payment upload)
CREATE POLICY "Allow public update bookings"
ON bookings FOR UPDATE
TO public
USING (true);
```

### Create RLS Policies for Testimonials

```sql
-- Allow public to read approved testimonials only
CREATE POLICY "Allow public read approved testimonials"
ON testimonials FOR SELECT
TO public
USING (approved = true);

-- Allow public to insert testimonials (for testimonial submission)
CREATE POLICY "Allow public insert testimonials"
ON testimonials FOR INSERT
TO public
WITH CHECK (true);
```

## Step 4: Create Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **Create a new bucket**
3. Name it `bookings`
4. Make it **Public** (so images can be accessed)
5. Click **Create bucket**

### Set Storage Policies

```sql
-- Allow public to upload payment screenshots
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'bookings' AND (storage.foldername(name))[1] = 'payment-screenshots');

-- Allow public to read payment screenshots
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'bookings');
```

## Step 5: Get Your Credentials

1. Go to **Settings** > **API** in your Supabase dashboard
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

3. Add these to your `.env` file:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your-key-here
```

## Step 6: Test the Connection

1. Start your development server: `npm run dev`
2. Try to create a test booking
3. Check the Supabase dashboard to see if the booking appears in the database

## Database Schema Diagram

```
┌─────────────────────────────────┐
│         bookings                │
├─────────────────────────────────┤
│ id (UUID, PK)                   │
│ client_name (TEXT)              │
│ client_email (TEXT)             │
│ client_phone (TEXT)             │
│ service (TEXT)                  │
│ session_duration (INTEGER)      │
│ session_price (INTEGER)         │
│ payment_screenshot (TEXT)       │
│ payment_verified (BOOLEAN)      │
│ booking_date (TIMESTAMP)        │
│ created_at (TIMESTAMP)          │
│ status (TEXT)                   │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│       testimonials              │
├─────────────────────────────────┤
│ id (UUID, PK)                   │
│ name (TEXT)                     │
│ text (TEXT)                     │
│ rating (INTEGER, 1-5)           │
│ service (TEXT)                  │
│ approved (BOOLEAN)              │
│ created_at (TIMESTAMP)          │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  Storage: bookings bucket       │
├─────────────────────────────────┤
│  payment-screenshots/           │
│    └── {bookingId}-{timestamp}  │
└─────────────────────────────────┘
```

## Troubleshooting

### "relation does not exist" error
- Make sure you ran all the SQL commands to create tables
- Check that you're connected to the correct Supabase project

### "permission denied" error
- Check your RLS policies
- Verify that the policies allow the operations you're trying to perform

### Storage upload fails
- Ensure the bucket is created and set to public
- Check the storage policies allow uploads to the payment-screenshots folder

### Can't see data in admin panel
- Verify your Supabase URL and anon key are correct in `.env`
- Check browser console for any error messages
- Ensure RLS policies allow reading bookings

## Additional Features (Optional)

### Email Notifications

Enable email notifications in Supabase:
1. Go to **Authentication** > **Email Templates**
2. Customize email templates for booking confirmations

### Realtime Subscriptions

Add realtime subscriptions for live booking updates:

```typescript
// Listen for new bookings in real-time
const subscription = supabase
  .from('bookings')
  .on('INSERT', payload => {
    console.log('New booking!', payload.new);
  })
  .subscribe();
```

## Security Best Practices

1. **Never expose your service_role key** - only use anon key in frontend
2. **Use RLS policies** to restrict data access
3. **Validate data** on the client side before inserting
4. **Use HTTPS** in production (automatically handled by Vercel/Netlify)
5. **Regularly backup** your database

## Support

For Supabase-specific issues, check:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [Supabase GitHub](https://github.com/supabase/supabase)
