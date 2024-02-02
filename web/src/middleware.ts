import { NextRequest, NextResponse } from 'next/server'

const apiURL = process.env.API_URL || 'http://localhost:5000'

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect('/login')
  }

  try {
    await fetch(`${apiURL}/user/validate-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    })

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect('/login')
  }
}

export const config = { matcher: ['/boards', '/board/:path*'] }
