import { NextResponse } from 'next/server';
import supabase from '@/app/lib/supabaseClient';

export async function GET(request: Request, context: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await context.params;

  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select('id, title, questions (id, text, answers (id, text))')
    .eq('id', quizId)
    .single();

  if (quizError) {
    return NextResponse.json({ error: quizError.message }, { status: 400 });
  }
  
  return NextResponse.json({
    title: quiz.title,
    questions: quiz.questions.map((q: { id: string; text: string; answers: { id: string; text: string }[] }) => ({
      id: q.id,
      text: q.text,
      answers: q.answers,
    })),
  });
}
