import { NextResponse } from 'next/server';
import supabase from '@/app/lib/supabaseClient';

export async function DELETE(request: Request) {
  const { quizId } = await request.json();

  const { error } = await supabase.from('quizzes').delete().eq('id', quizId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'Quiz deleted successfully' });
}
