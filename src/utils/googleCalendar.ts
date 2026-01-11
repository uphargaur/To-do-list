import { gapi } from 'gapi-script';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

let gapiInitialized = false;

export const initGoogleCalendar = () => {
  return new Promise<void>((resolve, reject) => {
    gapi.load('client:auth2', async () => {
      try {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: SCOPES,
        });
        gapiInitialized = true;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const signInToGoogle = async () => {
  if (!gapiInitialized) {
    await initGoogleCalendar();
  }
  return gapi.auth2.getAuthInstance().signIn();
};

export const signOutFromGoogle = () => {
  return gapi.auth2.getAuthInstance().signOut();
};

export const isSignedIn = () => {
  if (!gapiInitialized) return false;
  return gapi.auth2.getAuthInstance().isSignedIn.get();
};

export const getAvailableSlots = async (date: Date, duration: number) => {
  if (!gapiInitialized) {
    await initGoogleCalendar();
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const response = await gapi.client.calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin: startOfDay.toISOString(),
    timeMax: endOfDay.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.result.items || [];

  // Generate time slots for business hours (9 AM to 6 PM)
  const slots: { start: Date; end: Date; available: boolean }[] = [];
  const workStart = 9; // 9 AM
  const workEnd = 18; // 6 PM
  const slotDuration = duration; // in minutes

  for (let hour = workStart; hour < workEnd; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const slotStart = new Date(date);
      slotStart.setHours(hour, minute, 0, 0);

      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);

      // Check if slot end time exceeds work hours
      if (slotEnd.getHours() >= workEnd) {
        break;
      }

      // Check if slot conflicts with existing events
      const hasConflict = events.some((event: any) => {
        const eventStart = new Date(event.start.dateTime || event.start.date);
        const eventEnd = new Date(event.end.dateTime || event.end.date);
        return (
          (slotStart >= eventStart && slotStart < eventEnd) ||
          (slotEnd > eventStart && slotEnd <= eventEnd) ||
          (slotStart <= eventStart && slotEnd >= eventEnd)
        );
      });

      slots.push({
        start: slotStart,
        end: slotEnd,
        available: !hasConflict && slotStart > new Date(), // Only future slots
      });
    }
  }

  return slots;
};

export const createCalendarEvent = async (
  title: string,
  description: string,
  startTime: Date,
  endTime: Date,
  attendeeEmail: string
) => {
  if (!gapiInitialized) {
    await initGoogleCalendar();
  }

  const event = {
    summary: title,
    description: description,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    attendees: [{ email: attendeeEmail }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 1 day before
        { method: 'popup', minutes: 60 }, // 1 hour before
      ],
    },
  };

  const response = await gapi.client.calendar.events.insert({
    calendarId: CALENDAR_ID,
    resource: event,
    sendUpdates: 'all',
  });

  return response.result;
};
