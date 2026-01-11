# Quick Start Guide

Get your spiritual counseling website up and running in 15 minutes!

## Prerequisites

- **Node.js 18+** installed
- **Supabase account** (free)
- **Google account** for Calendar API

## Step 1: Install Node.js (2 minutes)

```bash
# Check if Node.js is installed
node --version

# If not installed, install it:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Step 2: Install Dependencies (2 minutes)

```bash
cd Website-AStrolgy
npm install
```

## Step 3: Set Up Supabase (5 minutes)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Run this SQL in SQL Editor:

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

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public operations on bookings"
ON bookings FOR ALL
TO public
USING (true)
WITH CHECK (true);
```

4. Create a storage bucket named `bookings` (make it public)
5. Copy your Project URL and anon key from Settings > API

## Step 4: Configure Environment Variables (2 minutes)

```bash
cp .env.example .env
nano .env
```

Update these values:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=yourSecurePassword123
```

## Step 5: Run the Development Server (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Step 6: Test Basic Features (3 minutes)

1. **Homepage**: Check if the site loads
2. **Booking**: Try creating a test booking
3. **Admin Panel**: Go to `/admin` and login with your password
4. **Payment Upload**: Upload a test image

## What's Working Now?

✅ Full website with all pages
✅ Booking system
✅ Payment QR display and upload
✅ Admin panel for managing bookings
✅ Responsive design

## What's Not Working Yet?

⚠️ Google Calendar integration (needs setup)

## Next Steps

### To Enable Google Calendar:

Follow `GOOGLE_CALENDAR_SETUP.md` (takes 10 minutes)

### To Deploy to Production:

Follow `DEPLOYMENT.md` (takes 15 minutes)

### To Customize:

1. **Change services/pricing**: Edit `src/utils/data.ts`
2. **Change colors**: Edit `src/utils/theme.ts`
3. **Replace images**: Update files in `src/assets/`
4. **Update content**: Edit page files in `src/pages/`

## Common Issues

### "npm: command not found"
Install Node.js (see Step 1)

### "Cannot find module"
Run `npm install`

### "Supabase error"
Check your `.env` file has correct credentials

### Port 3000 already in use
Use a different port: `npm run dev -- --port 3001`

## File Structure Overview

```
src/
├── pages/          # All website pages
│   ├── Home.tsx    # Landing page
│   ├── Book.tsx    # Booking system
│   └── Admin.tsx   # Admin panel
├── components/     # Reusable components
├── utils/          # Configuration & data
│   ├── data.ts     # Services & testimonials
│   ├── theme.ts    # Colors & styling
│   └── supabase.ts # Database functions
└── assets/         # Images & files
```

## Quick Customizations

### Change Session Prices

Edit `src/utils/data.ts`:
```typescript
export const sessionOptions: SessionOption[] = [
  { duration: 30, price: 500 },   // Change these
  { duration: 60, price: 900 },
  { duration: 90, price: 1300 },
];
```

### Change Color Theme

Edit `src/utils/theme.ts`:
```typescript
primary: {
  main: '#6B46C1',  // Change to your color
},
secondary: {
  main: '#D4AF37',  // Change to your color
},
```

### Update About Content

Edit `src/utils/data.ts` > `aboutContent`

### Add/Remove Services

Edit `src/utils/data.ts` > `services` array

## Admin Panel

**URL**: `http://localhost:3000/admin`
**Password**: The one you set in `.env`

**Features**:
- View all bookings
- Verify payment screenshots
- Update booking status
- Manage client information

## Getting Help

- **Setup issues**: Check `README.md`
- **Supabase**: See `SUPABASE_SETUP.md`
- **Google Calendar**: See `GOOGLE_CALENDAR_SETUP.md`
- **Deployment**: See `DEPLOYMENT.md`

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

## Ready to Deploy?

Once everything works locally:

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

See `DEPLOYMENT.md` for detailed instructions.

---

**That's it!** You now have a fully functional spiritual counseling website running locally. 🎉

Next: Follow `GOOGLE_CALENDAR_SETUP.md` to enable calendar bookings, then `DEPLOYMENT.md` to go live!
