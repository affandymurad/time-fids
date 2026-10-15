// Builders for "add to calendar" links (Google, Outlook.com, Office 365, Yahoo) and an .ics file (Apple / iCal).

export interface CalendarEvent {
  title: string;
  description: string;
  start: Date;
  durationMinutes?: number;
  timezone: string; // IANA zone the event is shown in (used by Google Calendar)
}

export type CalendarProvider = 'google' | 'apple' | 'outlook' | 'office365' | 'yahoo';

const pad = (n: number) => String(n).padStart(2, '0');

// 20261015T103000Z
const toCompactUtc = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(
    d.getUTCMinutes()
  )}${pad(d.getUTCSeconds())}Z`;

const toIsoNoMs = (d: Date) => d.toISOString().replace(/\.\d{3}Z$/, 'Z');

const enc = encodeURIComponent;

const endOf = (e: CalendarEvent) => new Date(e.start.getTime() + (e.durationMinutes ?? 60) * 60000);

// RFC 5545 text escaping
const icsEscape = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

export function buildIcs(e: CalendarEvent): string {
  const uid = `${e.start.getTime()}-${Math.random().toString(36).slice(2, 10)}@fids-world-time`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FIDS World Time//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toCompactUtc(new Date())}`,
    `DTSTART:${toCompactUtc(e.start)}`,
    `DTEND:${toCompactUtc(endOf(e))}`,
    `SUMMARY:${icsEscape(e.title)}`,
    `DESCRIPTION:${icsEscape(e.description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}

/** Web URL for providers that support a compose deep link. Apple/iCal uses a downloaded .ics instead. */
export function buildCalendarUrl(provider: Exclude<CalendarProvider, 'apple'>, e: CalendarEvent): string {
  const end = endOf(e);
  switch (provider) {
    case 'google':
      return (
        'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        `&text=${enc(e.title)}&dates=${toCompactUtc(e.start)}/${toCompactUtc(end)}` +
        `&details=${enc(e.description)}&ctz=${enc(e.timezone)}`
      );
    case 'outlook':
    case 'office365': {
      const host = provider === 'outlook' ? 'outlook.live.com' : 'outlook.office.com';
      return (
        `https://${host}/calendar/0/deeplink/compose?path=${enc('/calendar/action/compose')}&rru=addevent` +
        `&subject=${enc(e.title)}&startdt=${enc(toIsoNoMs(e.start))}&enddt=${enc(toIsoNoMs(end))}` +
        `&body=${enc(e.description)}`
      );
    }
    case 'yahoo': {
      const mins = e.durationMinutes ?? 60;
      const dur = `${pad(Math.floor(mins / 60))}${pad(mins % 60)}`;
      return (
        'https://calendar.yahoo.com/?v=60' +
        `&title=${enc(e.title)}&st=${toCompactUtc(e.start)}&dur=${dur}&desc=${enc(e.description)}`
      );
    }
  }
}

/** Triggers a browser download of the .ics file (opens in Apple Calendar / iCal and most other calendar apps). */
export function downloadIcs(e: CalendarEvent, fileBaseName: string): void {
  const blob = new Blob([buildIcs(e)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileBaseName.replace(/[^\w\-]+/g, '_') || 'event'}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
