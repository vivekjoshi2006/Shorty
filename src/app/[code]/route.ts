import { NextRequest, NextResponse } from 'next/server';
import { redis } from '../redis'; // Import our new type-safe Redis client

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  try {
    const originalUrl = await redis.get(code);

    if (!originalUrl) {
      return NextResponse.redirect(new URL('/?error=not-found', request.url));
    }

    return NextResponse.redirect(new URL(originalUrl));
  } catch (error) {
    console.error('Redirection error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
