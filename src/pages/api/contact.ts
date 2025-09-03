// import sgMail from '@sendgrid/mail';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { Twilio } from 'twilio';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     res.status(405).end();
//     return;
//   }

//   const { name, email, phone, website, message, subject } = req.body;

//   sgMail.setApiKey(`${process.env.Bearer_Token}`);


//   const msg = {
//     to: process.env.TWILIO_TO_EMAIL || '',
//     from: process.env.TWILIO_FROM_EMAIL || '',
//     subject: `New Contact Form Submission ${subject} from ${name}`,
//     html: `
//       <p><strong>Subject:</strong> ${subject}</p>
//       <p>Name: ${name}</p>
//       <p>Email: ${email}</p>
//       <p>Website: ${website}</p>
//       <p>Phone: ${phone}</p>
//       <p>Message: ${message}</p>
//     `
//   };

//   try {
//     await sgMail.send(msg);

//     // Only enable this if you need SMS alersts
//     // await twilio.messages.create({
//     //   body: `New Contact Form Submission from ${name}: ${message}`,
//     //   from: process.env.FROM_PHONE_NUMBER || '',
//     //   to: process.env.TO_PHONE_NUMBER || ''
//     // });

//     res.status(200).json({ message: 'Message sent successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error sending message' });
//   }
// }

// import sgMail from '@sendgrid/mail';

// import { NextApiRequest, NextApiResponse } from 'next';

// import { Twilio } from 'twilio'; // Keep if you intend to use Twilio



// export default async function handler(

//   req: NextApiRequest,

//   res: NextApiResponse

// ) {

//   if (req.method !== 'POST') {

//     res.status(405).end();

//     return;

//   }



//   // Destructure the new fields sent from the frontend

//   const { type, emailSubject, emailBody, ...formData } = req.body;



//   sgMail.setApiKey(`${process.env.Bearer_Token}`);



//   // Construct the email message for SendGrid

//   const msg = {

//     to: process.env.TWILIO_TO_EMAIL || 'info@paytriot.co.uk', // Ensure this is your receiving email

//     from: process.env.TWILIO_FROM_EMAIL || 'info@paytriot.co.uk', // Ensure this is a verified SendGrid sender

//     subject: emailSubject, // Use the subject passed from the frontend

//     html: `<p style="white-space: pre-wrap;">${emailBody}</p>` // Use the body passed from the frontend, pre-wrap to preserve formatting

//   };



//   try {

//     await sgMail.send(msg);



//     // Only enable this if you need SMS alerts and have Twilio configured

//     // const twilioClient = new Twilio(

//     //   process.env.TWILIO_ACCOUNT_SID,

//     //   process.env.TWILIO_AUTH_TOKEN

//     // );

//     // if (type === 'quote' && formData.phone) {

//     //   await twilioClient.messages.create({

//     //     body: `New Quote Request from ${formData.firstName}: Phone: ${formData.phone}, Email: ${formData.email}`,

//     //     from: process.env.FROM_PHONE_NUMBER || '', // Your Twilio phone number

//     //     to: process.env.TO_PHONE_NUMBER || '' // The recipient phone number for SMS alerts

//     //   });

//     // } else if (type === 'support' && formData.supportName && formData.supportEmail) {

//     //   await twilioClient.messages.create({

//     //     body: `New Support Request from ${formData.supportName}: Issue: ${formData.issueType}, Priority: ${formData.priority}`,

//     //     from: process.env.FROM_PHONE_NUMBER || '',

//     //     to: process.env.TO_PHONE_NUMBER || ''

//     //   });

//     // }



//     res.status(200).json({ message: 'Message sent successfully' });

//   } catch (err: any) {

//     console.error('Error sending message:', err.response?.body || err);

//     res.status(500).json({ message: 'Error sending message', error: err.message });

//   }

// }

import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';
import { Twilio } from 'twilio'; // keep if you intend to use Twilio
import { google } from 'googleapis';

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS as string);
const sheetsAuth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  // Destructure the new fields sent from the frontend
  const { type, emailSubject, emailBody, ...formData } = req.body;

  sgMail.setApiKey(`${process.env.Bearer_Token}`);

  // Construct the email message for SendGrid
  const msg = {
    to: process.env.TWILIO_TO_EMAIL || 'info@paytriot.co.uk',
    from: process.env.TWILIO_FROM_EMAIL || 'info@paytriot.co.uk',
    subject: emailSubject,
    html: `<p style="white-space: pre-wrap;">${emailBody}</p>`,
  };

  try {
    // Step 1: Send the email first
    await sgMail.send(msg);

    // Step 2: If the email sends successfully, then update the Google Sheet
    const authClient = await sheetsAuth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    const spreadsheetId2 = process.env.GOOGLE_SHEET_ID2;

    if (!spreadsheetId2) {
      throw new Error('GOOGLE_SHEET_ID2 environment variable is not defined.');
    }

    const businessValues = Object.values(formData);
    const businessRange = 'Sheet1!A:Z';

    await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId2,
      range: businessRange,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [businessValues] },
    });

    // Twilio logic (still commented out)
    // const twilioClient = new Twilio(
    //   process.env.TWILIO_ACCOUNT_SID,
    //   process.env.TWILIO_AUTH_TOKEN
    // );
    // if (type === 'quote' && formData.phone) {
    //   await twilioClient.messages.create({
    //     body: `New Quote Request from ${formData.firstName}: Phone: ${formData.phone}, Email: ${formData.email}`,
    //     from: process.env.FROM_PHONE_NUMBER || '',
    //     to: process.env.TO_PHONE_NUMBER || ''
    //   });
    // } else if (type === 'support' && formData.supportName && formData.supportEmail) {
    //   await twilioClient.messages.create({
    //     body: `New Support Request from ${formData.supportName}: Issue: ${formData.issueType}, Priority: ${formData.priority}`,
    //     from: process.env.FROM_PHONE_NUMBER || '',
    //     to: process.env.TO_PHONE_NUMBER || ''
    //   });
    // }

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err: any) {
    console.error('Error sending message:', err.response?.body || err);
    res
      .status(500)
      .json({ message: 'Error sending message', error: err.message });
  }
}
