const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { google } = require('googleapis');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// Load Service Account Key
// You must download this from Google Cloud Console -> IAM & Admin -> Service Accounts
// Rename it to 'service-account.json' and place it in the 'functions' folder
const serviceAccount = require('./service-account.json');

const calendar = google.calendar('v3');

const jwtClient = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    ['https://www.googleapis.com/auth/calendar']
);

// Your Calendar ID (email address of the calendar you want to book on)
// You can also move this to environment variables later
const CALENDAR_ID = '9ba57b7bdf1829e3c25117f14c8eab2bab88974cf88ad7fcffaf7629ee576309@group.calendar.google.com';

exports.checkAvailability = functions.https.onCall(async (data, context) => {
    const { timeMin, timeMax } = data;

    try {
        await jwtClient.authorize();

        const response = await calendar.events.list({
            auth: jwtClient,
            calendarId: CALENDAR_ID,
            timeMin: timeMin,
            timeMax: timeMax,
            singleEvents: true,
            orderBy: 'startTime',
        });

        return response.data.items;
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        throw new functions.https.HttpsError('internal', `Failed to fetch availability: ${error.message}`);
    }
});

exports.createBooking = functions.https.onCall(async (data, context) => {
    const { summary, description, startTime, endTime } = data;

    try {
        await jwtClient.authorize();

        const event = {
            summary: summary,
            description: description,
            start: {
                dateTime: startTime,
                timeZone: 'Europe/Prague', // Adjust as needed
            },
            end: {
                dateTime: endTime,
                timeZone: 'Europe/Prague',
            },
        };

        const response = await calendar.events.insert({
            auth: jwtClient,
            calendarId: CALENDAR_ID,
            resource: event,
        });

        return { success: true, eventId: response.data.id };
    } catch (error) {
        console.error('Error creating booking:', error);
        throw new functions.https.HttpsError('internal', 'Failed to create booking');
    }
});
