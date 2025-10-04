// src/pages/api/paytriot-proxy.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the body
    const body = new URLSearchParams(req.body).toString();
    
    console.log('Making request to Paytriot from Vercel...');
    
    const response = await fetch('https://gateway.paytriot.co.uk/direct/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (compatible; Vercel-Proxy/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      body: body
    });

    const responseText = await response.text();
    console.log('Paytriot response status:', response.status);
    console.log('Response preview:', responseText.substring(0, 200));

    res.status(response.status).send(responseText);
  } catch (error) {
    console.error('Vercel API error:', error);
    res.status(500).json({ error: error.message });
  }
}
