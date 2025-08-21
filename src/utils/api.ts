// Simple client-side stub for form submissions.
// In production, replace with real HTTP call to backend / serverless function.

export interface TicketAttendee {
  name: string;
}

export interface ContactSubmission {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message?: string;
  isTicketing: boolean;
  attendees?: TicketAttendee[];
  submittedAt: string; // ISO timestamp
  source?: string;
  honeypot?: string; // spam trap (_gotcha)
}

const STORAGE_KEY = 'abha_contact_submissions';

export async function submitContact(submission: ContactSubmission): Promise<{ ok: true }>{
  const endpoint = (import.meta as any).env?.VITE_CONTACT_ENDPOINT as string | undefined;
  if (submission.honeypot) {
    // Bot filled hidden field: silently accept without network
    return { ok: true };
  }

  if (endpoint) {
    const isFormspree = /formspree\.io\/f\//.test(endpoint);
    const payload: Record<string, any> = isFormspree ? {
      _subject: `ABHA ${submission.isTicketing ? 'Ticketing' : 'Contact'}: ${submission.subject}`,
      fullName: submission.fullName,
      email: submission.email,
      phone: submission.phone || '',
      type: submission.isTicketing ? 'ticketing' : 'general',
      message: submission.message || '',
      attendees: submission.attendees?.map(a => a.name).join(', ') || '',
      submittedAt: submission.submittedAt,
      source: submission.source || 'web-form',
      _gotcha: submission.honeypot || ''
    } : submission;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return { ok: true };
      let errMsg = `Remote endpoint failed (${res.status})`;
      try {
        const j = await res.json();
        if (j && j.error) errMsg = j.error;
      } catch {}
      throw new Error(errMsg);
    } catch (e) {
      console.warn('Remote contact endpoint error', e);
      throw e instanceof Error ? e : new Error('Submission failed');
    }
  }
  // If no endpoint configured, local fallback for development
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const list: ContactSubmission[] = existingRaw ? JSON.parse(existingRaw) : [];
    list.push(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(-200)));
    return { ok: true };
  } catch {
    throw new Error('Local persistence failed');
  }
}

export function getStoredSubmissions(): ContactSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
