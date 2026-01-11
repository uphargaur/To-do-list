# Google Calendar API Setup Guide

This guide will help you set up Google Calendar API integration for the booking system.

## Why Google Calendar?

The Google Calendar integration allows:
- Clients to book available time slots
- Automatic calendar event creation
- Email reminders to both you and the client
- Sync with your Google Calendar

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click **Select a project** > **New Project**
4. Enter project name: "Spiritual Counseling Website"
5. Click **Create**

## Step 2: Enable Google Calendar API

1. In the Google Cloud Console, select your project
2. Go to **APIs & Services** > **Library**
3. Search for "Google Calendar API"
4. Click on it and click **Enable**

## Step 3: Create OAuth 2.0 Credentials

### Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Select **External** user type
3. Click **Create**
4. Fill in the required information:
   - **App name**: Spiritual Counseling Booking
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. Click **Save and Continue**
6. **Scopes**: Click **Add or Remove Scopes**
   - Search and add: `https://www.googleapis.com/auth/calendar.events`
7. Click **Save and Continue**
8. **Test users**: Add your email address
9. Click **Save and Continue**

### Create OAuth Client ID

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Select **Web application**
4. Name: "Spiritual Counseling Website"
5. **Authorized JavaScript origins**:
   - Add: `http://localhost:3000` (for development)
   - Add: `https://yourdomain.com` (for production)
6. **Authorized redirect URIs**:
   - Add: `http://localhost:3000` (for development)
   - Add: `https://yourdomain.com` (for production)
7. Click **Create**
8. **Important**: Copy your **Client ID** - you'll need this!

## Step 4: Create API Key

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API key**
3. Copy the API key
4. Click **Restrict Key**
5. Under **API restrictions**, select **Restrict key**
6. Choose **Google Calendar API**
7. Click **Save**

## Step 5: Configure Environment Variables

Add your credentials to `.env`:

```env
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_GOOGLE_API_KEY=your-api-key
VITE_GOOGLE_CALENDAR_ID=primary
```

**Note**: Use `primary` for your main Google Calendar, or specify a calendar ID if you want to use a specific calendar.

## Step 6: Get Specific Calendar ID (Optional)

If you want to use a specific calendar instead of your primary calendar:

1. Go to [Google Calendar](https://calendar.google.com)
2. Click the three dots next to the calendar you want to use
3. Click **Settings and sharing**
4. Scroll down to **Integrate calendar**
5. Copy the **Calendar ID** (looks like: `abc123@group.calendar.google.com`)
6. Update `.env`:
   ```env
   VITE_GOOGLE_CALENDAR_ID=abc123@group.calendar.google.com
   ```

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Go to the booking page
3. After payment verification, try to select a time slot
4. The system should show available slots from your calendar
5. Book a test session
6. Check your Google Calendar - the event should appear!

## How It Works

### 1. Authentication Flow

When a client needs to book a time slot:
1. They click to view available times
2. System prompts them to sign in with Google (one-time)
3. After authentication, available slots are displayed
4. They select a slot and confirm booking
5. Event is created in your Google Calendar

### 2. Available Slots Detection

The system automatically:
- Checks your calendar for existing events
- Shows only time slots that are free
- Respects your business hours (9 AM - 6 PM by default)
- Only shows future time slots

### 3. Event Creation

When a booking is confirmed:
- Creates a Google Calendar event
- Adds the client's email as an attendee
- Sends automatic email notifications
- Sets up reminders (1 day before + 1 hour before)

## Customizing Business Hours

Edit `src/utils/googleCalendar.ts` to change your working hours:

```typescript
const workStart = 9;  // 9 AM
const workEnd = 18;   // 6 PM
```

## Customizing Timezone

The default timezone is set to `Asia/Kolkata`. To change it:

```typescript
// In src/utils/googleCalendar.ts
timeZone: 'Your/Timezone',  // e.g., 'America/New_York'
```

## Production Deployment

When deploying to production:

1. **Update OAuth Consent Screen**:
   - Go back to OAuth consent screen
   - Change status from "Testing" to "Published"
   - Or keep it in testing and add all client emails as test users

2. **Update Authorized Origins**:
   - Add your production domain to authorized origins
   - Example: `https://yourwebsite.com`

3. **Update Environment Variables**:
   - Set the same credentials in your hosting platform

## Alternative: Service Account (Advanced)

For a more automated solution without user authentication:

1. Create a service account in Google Cloud Console
2. Share your calendar with the service account email
3. Update the code to use service account authentication

This allows booking without requiring clients to sign in with Google.

## Troubleshooting

### "Error: popup_closed_by_user"
- The user closed the Google sign-in popup
- Ask them to try again

### "Error: access_denied"
- User didn't grant calendar permissions
- Ask them to sign in again and accept permissions

### No available slots showing
- Check that your calendar is accessible
- Verify the Calendar ID is correct
- Ensure the date range includes future dates

### Events not appearing in calendar
- Check calendar permissions
- Verify API key has Calendar API access
- Check browser console for errors

### "Invalid client ID" error
- Verify your Client ID is correct in `.env`
- Check that authorized origins include your domain

## Security Notes

1. **Never commit** your API keys or Client ID to public repositories
2. **Use environment variables** for all credentials
3. **Restrict API key** to only Google Calendar API
4. **Keep OAuth consent screen** in testing mode unless you need public access

## Webhook Notifications (Advanced)

To get real-time updates when calendar events change:

1. Set up webhook endpoint in your backend
2. Use Google Calendar Push Notifications API
3. Subscribe to calendar changes

## Cost

- Google Calendar API is **free** for normal usage
- Limits: 1,000,000 requests per day
- More than enough for a booking system

## Support

For Google Calendar API issues:
- [Google Calendar API Documentation](https://developers.google.com/calendar)
- [Google Calendar API Forum](https://stackoverflow.com/questions/tagged/google-calendar-api)
- [Google Workspace Support](https://support.google.com/a)

---

**Pro Tip**: Create a separate Google account for business use to keep personal and business calendars separate!
