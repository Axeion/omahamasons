/**
 * rsvp-handler.gs — Mizpah Lodge #302 dinner RSVP backend
 *
 * Google Apps Script web app that receives RSVP submissions from
 * https://omahamasons.com/rsvp.html, appends them to a Google Sheet,
 * and emails the submitter a confirmation with the meeting details.
 *
 * This file lives in the website repo for reference/version control only —
 * it runs on script.google.com. See README.md in this folder for how to
 * deploy it.
 */

var CONFIG = {
  // Spreadsheet that collects RSVPs. Leave SHEET_ID empty ('') if this
  // script is bound to the spreadsheet (created via Extensions > Apps Script).
  SHEET_ID: 'PASTE_SPREADSHEET_ID_HERE',
  SHEET_NAME: 'RSVPs',

  // Confirmation email to the person who RSVP'd
  SEND_CONFIRMATION: true,
  FROM_NAME: 'Mizpah Lodge #302',

  // Heads-up email to the secretary for each RSVP
  NOTIFY_SECRETARY: true,
  SECRETARY_EMAIL: 'Mizpah302sec@gmail.com',

  TIMEZONE: 'America/Chicago',
  LODGE_ADDRESS: '1124 South 48th Street, Omaha, NE 68106',
  PAYPAL_URL: 'https://www.paypal.me/mizpah302',
  VENMO_URL: 'https://www.venmo.com/u/mizpah302',
};

// Column order for appended rows — must match the sheet's header row.
var HEADERS = [
  'Timestamp', 'Meeting Date', 'First Name', 'Last Name',
  'Email', 'Phone', 'Attending As', 'Seats', 'Dietary Notes',
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Honeypot: silently accept-and-drop bot submissions that filled
    // the hidden "website" field
    if (data.website) {
      return jsonResponse_({ ok: true });
    }

    // Basic validation
    var firstName = clean_(data.firstName);
    var lastName  = clean_(data.lastName);
    var email     = clean_(data.email);
    var phone     = clean_(data.phone);
    if (!firstName || !lastName || !email || !phone) {
      return jsonResponse_({ ok: false, error: 'Missing required fields.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse_({ ok: false, error: 'Invalid email address.' });
    }
    var guestCount = Math.min(10, Math.max(1, parseInt(data.guestCount, 10) || 1));
    var role       = clean_(data.role) || 'Guest';
    var dietary    = clean_(data.dietary);

    var meeting = nextMeetingPretty_();

    // Append to the sheet
    var ss = CONFIG.SHEET_ID
      ? SpreadsheetApp.openById(CONFIG.SHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    sheet.appendRow([
      Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'M/d/yyyy h:mm a'),
      meeting, firstName, lastName, email, phone, role, guestCount, dietary,
    ]);

    // Confirmation email to the submitter
    if (CONFIG.SEND_CONFIRMATION) {
      MailApp.sendEmail({
        to: email,
        subject: 'RSVP Confirmed — Mizpah Lodge #302 Dinner, ' + meeting,
        name: CONFIG.FROM_NAME,
        body:
          'Hello ' + firstName + ',\n\n' +
          'Your RSVP for the Mizpah Lodge #302 monthly dinner is confirmed.\n\n' +
          'When:  ' + meeting + '\n' +
          '       Dinner at 6:30 PM — Stated meeting at 7:00 PM\n' +
          'Where: ' + CONFIG.LODGE_ADDRESS + '\n' +
          'Seats: ' + guestCount + '\n' +
          (dietary ? 'Notes: ' + dietary + '\n' : '') +
          '\n' +
          'Dinner is pay-what-you-wish. If you would like to contribute to\n' +
          'catering costs, you can pay online:\n' +
          '  PayPal: ' + CONFIG.PAYPAL_URL + '\n' +
          '  Venmo:  ' + CONFIG.VENMO_URL + '\n\n' +
          'Need to change or cancel? Reply to this email or contact the\n' +
          'lodge secretary at ' + CONFIG.SECRETARY_EMAIL + ' / (402) 558-0666.\n\n' +
          'We look forward to seeing you at the lodge!\n\n' +
          'Mizpah Lodge #302 A.F. & A.M.\n' +
          'https://omahamasons.com',
      });
    }

    // Notification to the secretary
    if (CONFIG.NOTIFY_SECRETARY && CONFIG.SECRETARY_EMAIL) {
      MailApp.sendEmail({
        to: CONFIG.SECRETARY_EMAIL,
        subject: 'New dinner RSVP: ' + firstName + ' ' + lastName +
                 ' (' + guestCount + ') — ' + meeting,
        name: CONFIG.FROM_NAME,
        body:
          firstName + ' ' + lastName + ' has RSVP\'d for ' + meeting + '.\n\n' +
          'Attending as: ' + role + '\n' +
          'Seats: ' + guestCount + '\n' +
          'Email: ' + email + '\n' +
          'Phone: ' + phone + '\n' +
          (dietary ? 'Dietary notes: ' + dietary + '\n' : ''),
      });
    }

    return jsonResponse_({ ok: true, meeting: meeting });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

/* ── Helpers ─────────────────────────────────────────────────── */

function clean_(v) {
  return String(v == null ? '' : v).trim().slice(0, 500);
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// "Wednesday, August 5, 2026" — the next first-Wednesday in lodge time,
// counting today as upcoming until the day is over
function nextMeetingPretty_() {
  var now = new Date();
  var todayStr = Utilities.formatDate(now, CONFIG.TIMEZONE, 'yyyy-M-d');
  var parts = todayStr.split('-').map(Number);
  var y = parts[0], m = parts[1], today = parts[2];

  var d = firstWednesday_(y, m);
  if (today > d) {
    m += 1;
    if (m > 12) { m = 1; y += 1; }
    d = firstWednesday_(y, m);
  }
  // Noon UTC avoids any timezone edge shifting the calendar date
  var meetingDate = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return Utilities.formatDate(meetingDate, CONFIG.TIMEZONE, 'EEEE, MMMM d, yyyy');
}

function firstWednesday_(year, month) {
  var weekdayOfFirst = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  return 1 + ((3 - weekdayOfFirst + 7) % 7); // 3 = Wednesday
}
