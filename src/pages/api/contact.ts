import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { isName, isPhone, isEmail, isWebsite } from '../../lib/validate';
import { clean, esc, cell, clientIp, sameOrigin, limited, humanOk, emailReal, linkCount } from '../../lib/formGuard';

export const config = { api: { bodyParser: { sizeLimit: '20kb' } } };

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS as string);
const sheetsAuth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const PLATFORMS = ['WooCommerce', 'Shopify', 'Magento', 'PrestaShop', 'EKM', 'None', 'Other'];
const ISSUES = ['onboarding', 'technical', 'billing', 'other'];
const PRIORITIES = ['low', 'medium', 'high'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  // SendGrid event webhook posts arrays here; acknowledge and do nothing.
  if (Array.isArray(req.body)) return res.status(200).json({ status: 'received' });

  if (!sameOrigin(req)) return res.status(403).json({ message: 'Forbidden' });

  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const ip = clientIp(req);
  const bad = (m = 'Please check your details and try again.') => {
    console.warn('contact rejected', ip, req.headers['user-agent']); // shows in Vercel logs
    return res.status(400).json({ message: m });
  };

  if (clean(b.hp)) return res.status(200).json({ message: 'Message sent successfully' }); // honeypot
  if (limited(`contact:${ip}`)) return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  if (!(await humanOk(b.turnstileToken, ip))) return bad('Verification failed. Please refresh and try again.');

  // Subject and body are built here from validated fields. The browser used to send ready-made
  // HTML, which let anyone mail arbitrary content to info@ from our SendGrid sender.
  let row: string[];
  let subject: string;
  let lines: [string, string][];

  if (b.type === 'quote') {
    const name = clean(b.firstName, 80);
    const phone = clean(b.phone, 25);
    const email = clean(b.email, 254).toLowerCase();
    const website = clean(b.website, 200);
    const platforms = (Array.isArray(b.ecommercePlatform) ? b.ecommercePlatform : []).filter((p: unknown) =>
      PLATFORMS.includes(p as string)
    ) as string[];
    const other = platforms.includes('Other') ? clean(b.otherPlatformValue, 60) : '';
    const info = clean(b.additionalInfo, 3000, true);

    if (!isName(name) || !isPhone(phone) || !isEmail(email) || !isWebsite(website)) return bad();
    if (linkCount(info) > 2 || linkCount(other) > 0) return bad();
    if (!(await emailReal(email))) return bad('Please enter a real email address.');

    const plats = [...platforms.filter(p => p !== 'Other'), ...(other ? [other] : [])].join(', ');
    subject = 'New Enquiry for Paytriot Payments - Setup Call';
    lines = [
      ['Name', name], ['Email', email], ['Phone', phone], ['Website', website],
      ['E-commerce Platform', plats || 'N/A'], ['Additional Information', info || 'N/A'],
    ];
    row = [cell(name), phone, cell(email), cell(website), cell(plats), cell(info)];
  } else if (b.type === 'support') {
    const name = clean(b.supportName, 80);
    const email = clean(b.supportEmail, 254).toLowerCase();
    const issue = clean(b.issueType, 20);
    const priority = clean(b.priority, 10);
    const message = clean(b.message, 3000, true);

    if (!isName(name) || !isEmail(email) || !ISSUES.includes(issue) || !PRIORITIES.includes(priority)) return bad();
    if (message.length < 10 || linkCount(message) > 2) return bad();
    if (!(await emailReal(email))) return bad('Please enter a real email address.');

    subject = `New Support Request from ${name} - ${issue}`; // clean() already stripped newlines
    lines = [['Name', name], ['Email', email], ['Issue Type', issue], ['Priority', priority], ['Message', message]];
    row = [cell(name), '', cell(email), '', '', cell(message)];
  } else {
    return bad();
  }

  try {
    sgMail.setApiKey(process.env.Bearer_Token as string);
    await sgMail.send({
      to: process.env.TWILIO_TO_EMAIL || 'info@paytriot.co.uk',
      from: process.env.TWILIO_FROM_EMAIL || 'info@paytriot.co.uk',
      subject,
      html: `<p style="white-space: pre-wrap;">${lines.map(([k, v]) => `${k}: ${esc(v)}`).join('\n')}</p>`,
    });

    try {
      const spreadsheetId = process.env.GOOGLE_SHEET_ID2;
      if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID2 not set');
      await google.sheets({ version: 'v4', auth: sheetsAuth }).spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:H', // H = sender IP, to trace spam
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [[new Date().toISOString(), ...row, ip]] },
      });
    } catch (sheetErr) {
      console.error('Google Sheets error:', sheetErr);
    }

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (err: any) {
    console.error('SendGrid error:', err.response?.body || err);
    return res.status(500).json({ message: 'Error sending message' }); // no err.message leak
  }
}
