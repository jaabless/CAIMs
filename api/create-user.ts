import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

function generateTempPassword(): string {
  const upper = 'ABCDEFGHJKMNPQRSTUVWXYZ';
  const lower = 'abcdefghjkmnpqrstuvwxyz';
  const digits = '23456789';
  const specials = '!@#$';

  const rand = (str: string) => str[Math.floor(Math.random() * str.length)];

  const password = [
    rand(upper),
    rand(upper),
    rand(lower),
    rand(lower),
    rand(digits),
    rand(digits),
    rand(specials),
    rand(upper + lower + digits),
  ];

  // Shuffle
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, role } = req.body ?? {};

  if (!firstName || !lastName || !email || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const tempPassword = generateTempPassword();

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    // ⚠️  For testing: 'onboarding@resend.dev' only delivers to your Resend account email.
    // For production: replace with a verified domain address e.g. 'noreply@caims.com'
    from: 'CAIMs <onboarding@resend.dev>',
    to: email,
    subject: 'Welcome to CAIMs — Your Account Details',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#f9fafb;border-radius:12px;">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;background:#1a6b4a;border-radius:12px;">
            <span style="color:white;font-size:20px;font-weight:700;">C</span>
          </div>
          <h1 style="font-size:20px;font-weight:700;color:#111827;margin:12px 0 4px;">Welcome to CAIMs</h1>
          <p style="color:#6b7280;font-size:14px;margin:0;">Customer Asset Information Management System</p>
        </div>

        <div style="background:white;border-radius:8px;padding:24px;border:1px solid #e5e7eb;">
          <p style="color:#374151;font-size:15px;margin:0 0 16px;">Hi <strong>${firstName}</strong>,</p>
          <p style="color:#374151;font-size:14px;margin:0 0 16px;">
            Your CAIMs account has been created. Below are your login credentials.
            Please log in and change your password as soon as possible.
          </p>

          <div style="background:#f3f4f6;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="margin:0 0 8px;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Your Credentials</p>
            <p style="margin:4px 0;font-size:14px;color:#111827;"><strong>Email:</strong> ${email}</p>
            <p style="margin:4px 0;font-size:14px;color:#111827;"><strong>Temporary Password:</strong>
              <span style="font-family:monospace;background:#e5e7eb;padding:2px 8px;border-radius:4px;font-size:15px;">${tempPassword}</span>
            </p>
            <p style="margin:4px 0;font-size:14px;color:#111827;"><strong>Role:</strong> ${role}</p>
          </div>

          <a href="https://caims.vercel.app/login" style="display:block;text-align:center;margin:20px 0 4px;padding:12px;background:#1a6b4a;color:white;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
            Log in to CAIMs
          </a>

          <p style="color:#6b7280;font-size:13px;margin:16px 0 0;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>

        <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:20px;">
          © ${new Date().getFullYear()} CAIMs. All rights reserved.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email. User was not created.' });
  }

  return res.status(200).json({ success: true });
}
