import { NextResponse } from 'next/server';
import supabase from '@/app/lib/supabaseClient';

export async function POST(request: Request) {
  try {
 
    const authorizationHeader = request.headers.get('Authorization');
    console.log('authorizationHeader:', authorizationHeader);
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = authorizationHeader.split(' ')[1];
    console.log('accessToken:', accessToken);

    const { data: user, error: userError } = await supabase.auth.getUser(accessToken);
    console.log('user:', user);
    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid user' }, { status: 401 });
    }

    const { title, description, questions } = await request.json();

    if (!title || !questions || !questions.length) {
      return NextResponse.json(
        { error: 'Title and questions are required.' },
        { status: 400 }
      );
    }

    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        title,
        description,
        created_by: user.user.id,
      })
      .select()
      .single();

    if (quizError) {
      return NextResponse.json({ error: quizError.message }, { status: 400 });
    }
    
    const formattedQuestions = questions.map((q: { text: string }) => ({
      quiz_id: quiz.id,
      text: q.text,
    }));

    const { data: insertedQuestions, error: questionError } = await supabase
      .from('questions')
      .insert(formattedQuestions)
      .select();

    if (questionError) {
      return NextResponse.json({ error: questionError.message }, { status: 400 });
    }

    // Insert answers for each question
    for (const [index, question] of insertedQuestions.entries()) {
      const answers = questions[index].answers.map((a: { text: string; is_correct: boolean }) => ({
        question_id: question.id,
        text: a.text,
        is_correct: a.is_correct,
      }));

      const { error: answerError } = await supabase.from('answers').insert(answers);
      if (answerError) {
        return NextResponse.json({ error: answerError.message }, { status: 400 });
      }
    }

    return NextResponse.json({ message: 'Quiz created successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
