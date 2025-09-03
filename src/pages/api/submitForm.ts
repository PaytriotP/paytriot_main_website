// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Set CORS headers for all requests
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   if (req.method === 'OPTIONS') {
//     // Respond to preflight OPTIONS request
//     res.status(200).end();
//     return;
//   }

//   if (req.method === 'POST') {
//     try {
//       const response = await fetch(
//         'https://script.google.com/macros/s/AKfycbwz_NyXLZim6XM_51QWO894KEeSreQKnlu837Hub7g80ZQJCBjWplm05eHQB-31TedI/exec',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(req.body),
//         }
//       );

//       // Sometimes Apps Script may respond with plain text, not JSON
//       const textResponse = await response.text();

//       // Try parsing JSON, fallback to text
//       let result;
//       try {
//         result = JSON.parse(textResponse);
//       } catch {
//         result = textResponse;
//       }

//       if (!response.ok) {
//         throw new Error(`Google Script Error: ${textResponse}`);
//       }

//       res.status(200).json({ message: 'Form submitted successfully', result });
//     } catch (error: any) {
//       console.error('Error:', error);
//       res.status(500).json({ message: error.message || 'Internal Server Error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST', 'OPTIONS']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

// Read credentials from a secure environment variable
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS as string);
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const {
    fullName,
    phoneNumber,
    email,
    website,
    password,
    repeatPassword
  } = req.body;

  try {
    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID1;
    
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID1 environment variable is not defined.');
    }

    const sheetRange = 'Sheet1!A:G';

    const now = new Date();
    const formattedDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const values = [[
      new Date().toISOString(),
      fullName,
      phoneNumber,
      email,
      website,
      password,
      repeatPassword
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetRange,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: values },
    });

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error: any) {
    console.error('Error:', error.response?.body || error.message);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
}

