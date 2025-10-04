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
    // Parse the body to extract customer IP
    const formData = new URLSearchParams(req.body);
    const customerIP = formData.get('customerIPAddress') || '188.57.103.82';
    const body = formData.toString();
    
    console.log('Customer IP from payload:', customerIP);
    console.log('Making request to Paytriot from Vercel...');
    
    const response = await fetch('https://gateway.paytriot.co.uk/direct/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9,en-US;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'X-Forwarded-For': customerIP,
        'X-Real-IP': customerIP,
        'CF-Connecting-IP': customerIP,
        'X-Client-IP': customerIP
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
