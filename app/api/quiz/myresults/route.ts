// app/api/results/route.ts
import { NextResponse } from 'next/server';
import supabase from '@/app/lib/supabaseClient';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId'); // Ensure it's 'userId' (case-sensitive)

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { data: results, error } = await supabase
      .from('results')
      .select('quiz_id, score, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Group results by quiz
    const groupedResults = results.reduce<Record<string, { score: number; created_at: string }[]>>(
      (acc, result) => {
        const { quiz_id, score, created_at } = result;
        if (!acc[quiz_id]) {
          acc[quiz_id] = [];
        }
        acc[quiz_id].push({ score, created_at });
        return acc;
      },
      {}
    );

    return NextResponse.json(groupedResults);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
