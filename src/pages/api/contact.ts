import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';
import { Twilio } from 'twilio';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { name, email, phone, website, message, subject } = req.body;

  sgMail.setApiKey(`${process.env.Bearer_Token}`);


  const msg = {
    to: process.env.TWILIO_TO_EMAIL || '',
    from: process.env.TWILIO_FROM_EMAIL || '',
    subject: `New Contact Form Submission ${subject} from ${name}`,
    html: `
      <p><strong>Subject:</strong> ${subject}</p>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Website: ${website}</p>
      <p>Phone: ${phone}</p>
      <p>Message: ${message}</p>
    `
  };

  try {
    await sgMail.send(msg);

    // Only enable this if you need SMS alersts
    // await twilio.messages.create({
    //   body: `New Contact Form Submission from ${name}: ${message}`,
    //   from: process.env.FROM_PHONE_NUMBER || '',
    //   to: process.env.TO_PHONE_NUMBER || ''
    // });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending message' });
  }
}
