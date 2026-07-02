import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  try {
    // Fetch the original long URL from Vercel KV using the short code
    const originalUrl = await kv.get<string>(code);

    if (!originalUrl) {
      return NextResponse.redirect(new URL('/?error=not-found', request.url));
    }

    return NextResponse.redirect(new URL(originalUrl));
  } catch (error) {
    console.error('Redirection error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
