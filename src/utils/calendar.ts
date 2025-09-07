export function toGoogleDate(date: Date): string {
  // Format as YYYYMMDDTHHmmssZ using UTC
  const iso = date.toISOString(); // e.g., 2025-09-26T21:30:00.000Z
  return iso.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

export function parseEventDateRange(dateStr: string): { month: string; startDay: number; endDay: number; year: number } | null {
  // Examples: "September 27-28, 2025" or "September 26, 2025"
  const rangeRe = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:\s*-\s*(\d{1,2}))?,\s*(\d{4})$/i;
  const m = dateStr.trim().match(rangeRe);
  if (!m) return null;
  const month = m[1];
  const startDay = parseInt(m[2], 10);
  const endDay = m[3] ? parseInt(m[3], 10) : startDay;
  const year = parseInt(m[4], 10);
  return { month, startDay, endDay, year };
}

export function parseTimeRange(timeStr: string): { startH: number; startM: number; endH: number; endM: number } | null {
  // Example: "5:30 PM - 11:00 PM" or "10:00 AM - 10:00 PM"
  const re = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i;
  const m = timeStr.trim().match(re);
  if (!m) return null;
  const h1 = parseInt(m[1], 10) % 12 + (m[3].toUpperCase() === 'PM' ? 12 : 0);
  const h2 = parseInt(m[4], 10) % 12 + (m[6].toUpperCase() === 'PM' ? 12 : 0);
  const startH = h1 === 24 ? 12 : h1;
  const endH = h2 === 24 ? 12 : h2;
  const startM = m[2] ? parseInt(m[2], 10) : 0;
  const endM = m[5] ? parseInt(m[5], 10) : 0;
  return { startH, startM, endH, endM };
}

export function toDate(month: string, day: number, year: number, h: number, m: number): Date {
  // Construct in local time; Google URL builder will use UTC conversion
  return new Date(`${month} ${day}, ${year} ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
}

export function buildGoogleCalendarUrl(opts: {
  title: string;
  date: string; // e.g., "September 27-28, 2025" or "September 26, 2025"
  time: string; // e.g., "10:00 AM - 10:00 PM"
  details?: string;
  location?: string;
}): string | null {
  const dr = parseEventDateRange(opts.date);
  const tr = parseTimeRange(opts.time);
  if (!dr || !tr) return null;
  const start = toDate(dr.month, dr.startDay, dr.year, tr.startH, tr.startM);
  const end = toDate(dr.month, dr.endDay, dr.year, tr.endH, tr.endM);
  const dates = `${toGoogleDate(start)}/${toGoogleDate(end)}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: opts.title,
    dates,
  });
  if (opts.location) params.set('location', opts.location);
  if (opts.details) params.set('details', opts.details);
  return `https://www.google.com/calendar/render?${params.toString()}`;
}
