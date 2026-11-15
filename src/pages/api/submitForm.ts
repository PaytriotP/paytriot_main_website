import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { isName, isPhone, isEmail, isWebsite } from '../../lib/validate';
import { clean, cell, clientIp, sameOrigin, limited, humanOk, emailReal } from '../../lib/formGuard';

export const config = { api: { bodyParser: { sizeLimit: '20kb' } } };

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS as string);
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  // Same-site only. The old `Access-Control-Allow-Origin: *` let any website post here.
  if (!sameOrigin(req)) return res.status(403).json({ message: 'Forbidden' });

  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const ip = clientIp(req);
  const bad = (m = 'Please check your details and try again.') => {
    console.warn('submitForm rejected', ip, req.headers['user-agent']); // shows in Vercel logs
    return res.status(400).json({ message: m });
  };

  if (clean(b.hp)) return res.status(200).json({ message: 'Form submitted successfully' }); // honeypot
  if (limited(ip)) return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  if (!(await humanOk(b.turnstileToken, ip))) return bad('Verification failed. Please refresh and try again.');

  const fullName = clean(b.fullName, 80);
  const phoneNumber = clean(b.phoneNumber, 25);
  const email = clean(b.email, 254).toLowerCase();
  const website = clean(b.website, 200);
  const password = clean(b.password, 128);
  const repeatPassword = clean(b.repeatPassword, 128);

  if (!isName(fullName) || !isPhone(phoneNumber) || !isEmail(email) || !isWebsite(website)) return bad();
  if (password.length < 8 || password !== repeatPassword) return bad();
  if (!(await emailReal(email))) return bad('Please enter a real email address.');

  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID1;
    if (!spreadsheetId) throw new Error('GOOGLE_SHEET_ID1 environment variable is not defined.');

    const now = new Date();
    const formattedDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await google.sheets({ version: 'v4', auth }).spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:H', // H = sender IP, to trace spam
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        // SECURITY: passwords still stored in plain text here (existing behaviour). See review notes.
        values: [[formattedDate, cell(fullName), phoneNumber /* validated digits only; cell() would add a visible ' before +44 */, cell(email), cell(website), cell(password), cell(repeatPassword), ip]],
      },
    });

    return res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error: any) {
    console.error('Error:', error.response?.body || error.message);
    return res.status(500).json({ message: 'Internal Server Error' }); // no error.message leak
  }
}
