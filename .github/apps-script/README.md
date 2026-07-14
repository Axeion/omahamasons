# RSVP Confirmation Email — Apps Script Deployment

`rsvp-handler.gs` is the backend for the dinner RSVP form on
[rsvp.html](../../rsvp.html). It appends each RSVP to a Google Sheet and
emails the submitter a confirmation with the meeting date, address, and
payment links. It is kept in this repo for version control, but it **runs
on script.google.com**, not on the website.

## Deploying (one-time, ~10 minutes)

1. Open the Google Sheet that collects RSVPs, then **Extensions →
   Apps Script** (this creates a *bound* script — leave `SHEET_ID`
   empty in that case). Alternatively, open the existing RSVP project
   at [script.google.com](https://script.google.com) and paste the sheet's
   ID into `CONFIG.SHEET_ID`.
2. Replace the project's code with the contents of `rsvp-handler.gs`.
3. Review the `CONFIG` block at the top:
   - `SHEET_NAME` — tab name to append to (created if missing).
   - `SEND_CONFIRMATION` / `NOTIFY_SECRETARY` — turn either email off if
     not wanted.
   - If your existing sheet already has data, make its header row match
     `HEADERS` (or reorder `HEADERS` and the `appendRow` call to match
     your sheet).
4. **Deploy → New deployment → Web app**:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone** (required for the public form to POST)
5. Authorize the requested permissions (Sheets + send email as you).
6. Copy the new `/exec` URL and paste it into `APPS_SCRIPT_URL` near the
   bottom of `rsvp.html`, then commit and push.

Quotas: consumer Google accounts can send 100 emails/day via
`MailApp` — far above expected RSVP volume.

## Optional: real success/failure feedback on the form

The page currently posts with `mode: 'no-cors'`, which means the browser
cannot read the script's response — the form shows "confirmed" as long as
the request didn't throw. The script already returns JSON
(`{ok: true/false}`), so once deployed you can enable verified feedback by
changing the `fetch` call in `rsvp.html` to:

```js
const res = await fetch(APPS_SCRIPT_URL, {
  method: 'POST',
  // text/plain avoids a CORS preflight, which Apps Script cannot answer
  headers: { 'Content-Type': 'text/plain;charset=utf-8' },
  body: JSON.stringify(payload)
});
const result = await res.json();
if (!result.ok) throw new Error(result.error || 'Submission failed');
```

(Keep `JSON.parse(e.postData.contents)` in the script — it parses the
body regardless of content type.)

## Testing

After deploying, submit a test RSVP from the live page and confirm:
1. A new row appears in the sheet.
2. The confirmation email arrives at the address you entered.
3. The secretary notification arrives (if enabled).
