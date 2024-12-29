import { NextResponse } from 'next/server';
import supabase from '@/app/lib/supabaseClient';

export async function GET() {

  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select('*')

  if (quizError) {
    return NextResponse.json({ error: quizError.message }, { status: 400 });
  }

  return NextResponse.json(quiz);
}
