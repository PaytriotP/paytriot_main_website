// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host');
  const pathname = req.nextUrl.pathname;

  // Redirect rules based on host and path

  if (host === 'doc.paytriot.co.uk') {
    if (
      pathname === '/ptr-merchant-api/1.0' ||
      pathname === '/ptr-merchant-api/1.0/' ||
      pathname.startsWith('/ptr-merchant-api')
    ) {
      return NextResponse.redirect(new URL('https://www.paytriot.co.uk/services', req.url));
    }
    return NextResponse.redirect(new URL('https://www.paytriot.co.uk/services', req.url));
  }

  if (host === 'gateway.paytriot.co.uk' && pathname === '/__zenedge/c') {
    return NextResponse.redirect('https://gateway.paytriot.co.uk/admin/login.php');
  }

  if (host === 'mms.paytriot.co.uk' && pathname === '/tel:0800%203687345') {
    return NextResponse.redirect('https://mms.paytriot.co.uk/admin/login.php');
  }

  if (host === 'wallet.paytriot.co.uk' && pathname === '/en/auth/login/') {
    return NextResponse.redirect('https://wallet.paytriot.co.uk/admin/login.php');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
