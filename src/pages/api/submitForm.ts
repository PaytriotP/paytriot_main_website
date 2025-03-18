import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // You can replace '*' with your specific domain
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const data = req.body;

      // Do something with the data
      // Example: Log the data
      console.log('Received form data:', data);

      // You can now call Google Apps Script webhook or Google Sheets API here
      // Alternatively, send email using nodemailer or any service

      return res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error processing form:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
