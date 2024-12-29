import { NextResponse } from 'next/server';
import supabase from '@/app/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const { userId, quizId, answers } = await request.json();

    // Fetch all correct answers for the quiz
    const { data: correctAnswers, error: correctAnswersError } = await supabase
      .from('answers')
      .select('id, question_id, is_correct')
      .in(
        'question_id',
        (
          await supabase
            .from('questions')
            .select('id')
            .eq('quiz_id', quizId)
        ).data?.map((q) => q.id) || []
      )
      .eq('is_correct', true);

    if (correctAnswersError) {
      return NextResponse.json({ error: correctAnswersError.message }, { status: 400 });
    }

    if (!correctAnswers || correctAnswers.length === 0) {
      return NextResponse.json({ error: 'No correct answers found for this quiz' }, { status: 404 });
    }

    // Group correct answers by question ID
    const correctAnswersByQuestion = correctAnswers.reduce((acc, answer) => {
      if (!acc[answer.question_id]) acc[answer.question_id] = [];
      acc[answer.question_id].push(answer.id);
      return acc;
    }, {} as Record<string, string[]>);

    // Calculate the total number of questions
    const totalQuestions = Object.keys(correctAnswersByQuestion).length;

    // Calculate the score
    let correctQuestionsCount = 0;

    answers.forEach(({ questionId, answerIds }: { questionId: string; answerIds: string[] }) => {
      const correctAnswersForQuestion = correctAnswersByQuestion[questionId] || [];

      // Count how many correct answers the user selected
      const userCorrectAnswerCount = answerIds.filter((id) => correctAnswersForQuestion.includes(id)).length;

      // Check if all correct answers for the question are selected
      const isCompletelyCorrect = userCorrectAnswerCount === correctAnswersForQuestion.length;

      // Check if user selected any incorrect answers
      const hasIncorrectAnswer = answerIds.some((id) => !correctAnswersForQuestion.includes(id));

      // Question is considered correct if all correct answers are selected and no incorrect answers are selected
      if (isCompletelyCorrect && !hasIncorrectAnswer) {
        correctQuestionsCount++;
      }
    });

    // Calculate the final score as a percentage
    const score = Math.round((correctQuestionsCount / totalQuestions) * 100);

    // Save the result to the database
    const { error: resultError } = await supabase.from('results').insert({
      user_id: userId,
      quiz_id: quizId,
      score,
    });

    if (resultError) {
      return NextResponse.json({ error: resultError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Quiz submitted successfully', score });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
