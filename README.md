# Shirnjani - Spiritual Counseling & Guidance Website

A professional React-based website for a spiritual counseling practice offering psychology, tarot, astrology, numerology, and Vastu services.

## Features

- **Landing Page**: Beautiful hero section with services preview and testimonials
- **About Page**: Professional introduction with experience and qualifications
- **Services Page**: Detailed service descriptions with pricing
- **Booking System**: Multi-step booking flow with payment integration
- **Payment Integration**: QR code payment with screenshot upload
- **Admin Panel**: Password-protected dashboard for managing bookings
- **Legal Pages**: Privacy policy, terms of service, and disclaimers
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Backend/Database**: Supabase
- **Calendar Integration**: Google Calendar API
- **Styling**: Emotion (CSS-in-JS)

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

## Installation

### 1. Install Node.js

If you don't have Node.js installed:

```bash
# For Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### 2. Install Dependencies

```bash
npm install
```

## Configuration

### 1. Supabase Setup

1. Go to [Supabase](https://supabase.com/) and create a new project
2. Create the following tables in your Supabase database:

#### Bookings Table

```sql
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
  status TEXT DEFAULT 'pending_payment'
);
```

#### Testimonials Table (Optional)

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL,
  service TEXT NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

3. Create a storage bucket named `bookings` for payment screenshots
4. Set up Row Level Security (RLS) policies as needed

### 2. Google Calendar API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google Calendar API
4. Create credentials (OAuth 2.0 Client ID)
5. Add authorized JavaScript origins: `http://localhost:3000`
6. Copy your Client ID and API Key

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Google Calendar API
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_GOOGLE_API_KEY=your-api-key-here
VITE_GOOGLE_CALENDAR_ID=primary

# Admin Password
VITE_ADMIN_PASSWORD=your-secure-password-here
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/           # Images and static files
│   ├── images/       # Profile images
│   └── qr/          # Payment QR code
├── components/       # Reusable React components
│   ├── Navbar.tsx
│   └── Footer.tsx
├── pages/           # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Book.tsx
│   ├── Admin.tsx
│   └── Legal.tsx
├── types/           # TypeScript type definitions
│   └── index.ts
├── utils/           # Utility functions
│   ├── supabase.ts      # Supabase client & functions
│   ├── googleCalendar.ts # Google Calendar integration
│   ├── theme.ts         # MUI theme configuration
│   └── data.ts          # Static data (services, testimonials)
├── App.tsx          # Main app component with routing
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Admin Panel

Access the admin panel at `/admin`

**Default credentials:**
- Password: `admin123` (change this in `.env`)

**Admin Features:**
- View all bookings
- Verify payment screenshots
- Update booking status
- Manage client information

## Customization

### Changing Colors/Theme

Edit `src/utils/theme.ts` to customize the color scheme and styling.

### Updating Services

Edit `src/utils/data.ts` to modify services, pricing, and testimonials.

### Session Pricing

Modify the `sessionOptions` array in `src/utils/data.ts`:

```typescript
export const sessionOptions: SessionOption[] = [
  { duration: 30, price: 500 },
  { duration: 60, price: 900 },
  { duration: 90, price: 1300 },
];
```

### Payment QR Code

Replace `src/assets/qr/payment-qr.jpg` with your own payment QR code.

### Profile Image

Replace `src/assets/images/shirnjani.png` with the practitioner's photo.

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### Environment Variables in Production

Make sure to set all environment variables in your hosting platform's dashboard.

## Future Enhancements

- Email notifications for bookings
- WhatsApp integration
- Blog section
- Client testimonial submission form
- Multi-language support
- Payment gateway integration (Razorpay/Stripe)
- Live chat support

## Troubleshooting

### Node.js not found
Install Node.js using the instructions in the Prerequisites section.

### Supabase connection errors
- Check your Supabase URL and anon key in `.env`
- Ensure RLS policies allow public access for inserts and reads
- Verify the storage bucket is publicly accessible

### Google Calendar not loading
- Verify your Client ID and API Key
- Check authorized origins in Google Cloud Console
- Ensure Calendar API is enabled

## Support

For issues or questions:
- Email: t1346fh@gmail.com

## License

This project is proprietary and confidential.

---

Built with ❤️ for Shirnjani's Spiritual Counseling Practice
