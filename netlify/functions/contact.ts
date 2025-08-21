// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - types provided by devDependency, ignored if not present in editor
import type { Handler } from '@netlify/functions';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nodemailer from 'nodemailer';

// Expect environment variables configured in Netlify dashboard (Site settings -> Environment variables)
// GMAIL_USER: your gmail address
// GMAIL_PASS: app password (NOT your real password; create an App Password if 2FA enabled)
// CONTACT_TO: destination inbox (can be same as GMAIL_USER)

const requiredEnv = ['GMAIL_USER', 'GMAIL_PASS', 'CONTACT_TO'] as const;

function assertEnv() {
  for (const key of requiredEnv) {
    if (!process.env[key]) throw new Error(`Missing env var ${key}`);
  }
}

const handler: Handler = (async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    assertEnv();
    const data = JSON.parse(event.body || '{}');

    const {
      fullName = '',
      email = '',
      phone = '',
      subject = 'Contact',
      message = '',
      isTicketing = false,
      attendees = [],
      submittedAt,
      source
    } = data;

    if (!email) return { statusCode: 400, body: 'Email required' };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const to = process.env.CONTACT_TO!;
    const mailSubject = `ABHA ${isTicketing ? 'Ticketing' : 'Contact'}: ${subject}`;

    const attendeeLines = isTicketing && attendees?.length
      ? '\nAttendees:\n' + attendees.map((a: any, i: number) => `  ${i + 1}. ${a.name}`).join('\n')
      : '';

    const html = `<p><strong>Name:</strong> ${fullName || '(first attendee)'}<br/>
<strong>Email:</strong> ${email}<br/>
<strong>Phone:</strong> ${phone || '—'}<br/>
<strong>Type:</strong> ${isTicketing ? 'Ticketing' : 'General'}<br/>
<strong>Source:</strong> ${source || 'web-form'}<br/>
<strong>Submitted At:</strong> ${submittedAt || new Date().toISOString()}</p>
${isTicketing ? `<p><strong>Ticket Request</strong> for ${attendees?.length || 0} people.</p>` : ''}
${message ? `<p>${message.replace(/</g,'&lt;')}</p>` : ''}
${attendeeLines ? `<pre>${attendeeLines}</pre>` : ''}`;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      replyTo: email,
      subject: mailSubject,
      html
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err: any) {
    console.error('Contact function error', err);
    return { statusCode: 500, body: 'Server error' };
  }
}) as Handler;

export { handler };
