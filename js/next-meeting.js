/**
 * next-meeting.js — Mizpah Lodge #302
 *
 * Computes the next stated meeting (first Wednesday of the month,
 * dinner 6:30 PM, meeting 7:00 PM Central) and provides:
 *   - A "next meeting" banner with a live countdown, rendered into any
 *     element with id="next-meeting". Set data-rsvp-button="false" on the
 *     container to hide the RSVP button (e.g. on the RSVP page itself).
 *   - "Add to calendar" links (Google Calendar + downloadable .ics).
 *   - schema.org Event JSON-LD injected into <head> for search engines.
 *
 * All date math is anchored to America/Chicago so visitors in other
 * timezones see the correct meeting date.
 */
(function () {
  var TZ = 'America/Chicago';
  var LODGE_NAME = 'Mizpah Lodge #302';
  var EVENT_NAME = LODGE_NAME + ' Stated Meeting & Dinner';
  var LOCATION = '1124 South 48th Street, Omaha, NE 68106';
  var DESCRIPTION =
    'Monthly stated meeting of Mizpah Lodge #302 A.F. & A.M. ' +
    'Dinner at 6:30 PM (all Masons, families, and guests welcome — RSVP at ' +
    'https://omahamasons.com/rsvp.html), stated meeting at 7:00 PM.';

  /* ── Chicago-anchored date helpers ─────────────────────────── */

  // Current date/time components in the lodge's timezone
  function chicagoParts(date) {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', hour12: false,
    }).formatToParts(date || new Date());
    var out = {};
    parts.forEach(function (p) {
      if (p.type !== 'literal') out[p.type] = parseInt(p.value, 10);
    });
    if (out.hour === 24) out.hour = 0; // some engines report midnight as 24
    return out; // { year, month (1-12), day, hour, minute }
  }

  // Day-of-month of the first Wednesday of a given month (month 1-12)
  function firstWednesday(year, month) {
    // Date.UTC weekday is timezone-independent for pure calendar math
    var weekdayOfFirst = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
    return 1 + ((3 - weekdayOfFirst + 7) % 7); // 3 = Wednesday
  }

  // Next meeting date { year, month, day }, keeping today's meeting
  // "next" until the day is over in Chicago
  function nextMeetingDate() {
    var now = chicagoParts();
    var y = now.year, m = now.month;
    var d = firstWednesday(y, m);
    if (now.day > d) {
      m += 1;
      if (m > 12) { m = 1; y += 1; }
      d = firstWednesday(y, m);
    }
    return { year: y, month: m, day: d };
  }

  // Convert a Chicago wall-clock time to a real Date (UTC instant),
  // trying both CDT (-5) and CST (-6) and keeping whichever round-trips
  function chicagoToUTC(y, m, d, hh, mi) {
    var offsets = [5, 6];
    for (var i = 0; i < offsets.length; i++) {
      var candidate = new Date(Date.UTC(y, m - 1, d, hh + offsets[i], mi));
      var p = chicagoParts(candidate);
      if (p.year === y && p.month === m && p.day === d &&
          p.hour === hh && p.minute === mi) {
        return { date: candidate, offsetHours: offsets[i] };
      }
    }
    return { date: new Date(Date.UTC(y, m - 1, d, hh + 6, mi)), offsetHours: 6 };
  }

  /* ── Formatting helpers ────────────────────────────────────── */

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // "20260805T233000Z" — UTC stamp for Google Calendar / ICS
  function utcStamp(date) {
    return date.getUTCFullYear() + pad(date.getUTCMonth() + 1) +
      pad(date.getUTCDate()) + 'T' + pad(date.getUTCHours()) +
      pad(date.getUTCMinutes()) + '00Z';
  }

  // "2026-08-05T18:30:00-05:00" — ISO with Chicago offset for JSON-LD
  function isoWithOffset(mtg, hh, mi, offsetHours) {
    return mtg.year + '-' + pad(mtg.month) + '-' + pad(mtg.day) +
      'T' + pad(hh) + ':' + pad(mi) + ':00-' + pad(offsetHours) + ':00';
  }

  /* ── Build everything for the next meeting ─────────────────── */

  var mtg = nextMeetingDate();
  var start = chicagoToUTC(mtg.year, mtg.month, mtg.day, 18, 30); // dinner
  var end   = chicagoToUTC(mtg.year, mtg.month, mtg.day, 21, 0);

  var prettyDate = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ, weekday: 'long', month: 'long', day: 'numeric',
  }).format(start.date);

  // Whole days between today and the meeting (calendar days, Chicago)
  var today = chicagoParts();
  var daysAway = Math.round(
    (Date.UTC(mtg.year, mtg.month - 1, mtg.day) -
     Date.UTC(today.year, today.month - 1, today.day)) / 86400000
  );
  var countdownText =
    daysAway === 0 ? 'tonight!' :
    daysAway === 1 ? 'tomorrow' :
    'in ' + daysAway + ' days';

  /* ── Calendar links ────────────────────────────────────────── */

  var googleUrl = 'https://calendar.google.com/calendar/render' +
    '?action=TEMPLATE' +
    '&text=' + encodeURIComponent(EVENT_NAME) +
    '&dates=' + utcStamp(start.date) + '/' + utcStamp(end.date) +
    '&details=' + encodeURIComponent(DESCRIPTION) +
    '&location=' + encodeURIComponent(LOCATION) +
    '&ctz=' + encodeURIComponent(TZ);

  var icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mizpah Lodge 302//omahamasons.com//EN',
    'BEGIN:VEVENT',
    'UID:stated-meeting-' + mtg.year + pad(mtg.month) + pad(mtg.day) + '@omahamasons.com',
    'DTSTAMP:' + utcStamp(new Date()),
    'DTSTART:' + utcStamp(start.date),
    'DTEND:' + utcStamp(end.date),
    'SUMMARY:' + EVENT_NAME,
    'LOCATION:' + LOCATION.replace(/,/g, '\\,'),
    'DESCRIPTION:' + DESCRIPTION.replace(/,/g, '\\,'),
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  var icsHref = 'data:text/calendar;charset=utf-8,' +
    encodeURIComponent(icsLines.join('\r\n'));

  /* ── schema.org Event JSON-LD ──────────────────────────────── */

  function injectEventSchema() {
    var schema = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: EVENT_NAME,
      startDate: isoWithOffset(mtg, 18, 30, start.offsetHours),
      endDate: isoWithOffset(mtg, 21, 0, end.offsetHours),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      description: DESCRIPTION,
      location: {
        '@type': 'Place',
        name: LODGE_NAME,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '1124 South 48th Street',
          addressLocality: 'Omaha',
          addressRegion: 'NE',
          postalCode: '68106',
          addressCountry: 'US',
        },
      },
      organizer: {
        '@type': 'Organization',
        name: 'Mizpah Lodge #302 A.F. & A.M.',
        url: 'https://omahamasons.com',
      },
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://omahamasons.com/rsvp.html',
        validFrom: new Date().toISOString().slice(0, 10),
      },
    };
    var tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.textContent = JSON.stringify(schema);
    document.head.appendChild(tag);
  }

  /* ── Banner ────────────────────────────────────────────────── */

  function renderBanner() {
    var container = document.getElementById('next-meeting');
    if (!container) return;
    var showRsvp = container.getAttribute('data-rsvp-button') !== 'false';

    container.className = 'next-meeting';
    container.innerHTML =
      '<p class="nm-line">Next stated meeting: <strong>' + prettyDate +
      ' at 7:00 PM</strong> <span class="nm-countdown">&mdash; ' +
      countdownText + '</span></p>' +
      '<p class="nm-sub">Dinner at 6:30 PM &mdash; all Masons, families, and guests welcome.</p>' +
      '<div class="nm-actions">' +
      (showRsvp ? '<a href="rsvp.html" class="btn btn-accent nm-rsvp">RSVP for Dinner</a>' : '') +
      '<a href="' + googleUrl + '" target="_blank" rel="noopener" class="nm-cal-link">+ Google Calendar</a>' +
      '<a href="' + icsHref + '" download="mizpah-302-stated-meeting.ics" class="nm-cal-link">+ Apple / Outlook (.ics)</a>' +
      '</div>';
  }

  function init() {
    injectEventSchema();
    renderBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
