import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabaseClient';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { user, session } = data;
  const accessToken = session?.access_token; // Access JWT here

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token not found' }, { status: 500 });
  }
  
  const response = NextResponse.json({
    message: 'Login successful',
    user,
  });

  response.cookies.set('access_token', accessToken, {
    httpOnly: false, // Protect cookie from being accessed by client-side scripts
    secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    path: '/', // Make the cookie available across the entire site
    maxAge: 60 * 60 * 1, 
  });

  return response;
}
