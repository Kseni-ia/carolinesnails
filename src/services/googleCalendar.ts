import { gapi } from 'gapi-script';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const CALENDAR_ID = process.env.REACT_APP_GOOGLE_CALENDAR_ID;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const initClient = () => {
    return new Promise<void>((resolve, reject) => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            }).then(() => {
                resolve();
            }).catch((error: any) => {
                reject(error);
            });
        });
    });
};

export const checkAvailability = async (startDate: Date, endDate: Date) => {
    try {
        const response = await gapi.client.calendar.events.list({
            'calendarId': CALENDAR_ID,
            'timeMin': startDate.toISOString(),
            'timeMax': endDate.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'orderBy': 'startTime'
        });
        return response.result.items;
    } catch (error) {
        console.error("Error fetching events", error);
        return [];
    }
};

export const createEvent = async (eventDetails: any) => {
    // Ensure user is signed in before creating event
    const authInstance = gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
    }

    try {
        const event = {
            'summary': eventDetails.summary,
            'location': 'Nail Studio',
            'description': eventDetails.description,
            'start': {
                'dateTime': eventDetails.start.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            'end': {
                'dateTime': eventDetails.end.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            'attendees': [
                { 'email': CALENDAR_ID } // Invite the business
            ]
        };

        const request = gapi.client.calendar.events.insert({
            'calendarId': 'primary', // Add to the CLIENT'S calendar
            'resource': event,
            'sendUpdates': 'all', // Send email notifications
        });

        const response = await request.execute();
        return response;
    } catch (error) {
        console.error("Error creating event", error);
        throw error;
    }
};
