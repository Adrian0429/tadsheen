import { NextResponse } from "next/server";
import supabase from "@/app/lib/supabaseClient";

export async function GET(request: Request) {
  const accessToken = request.headers.get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("access_token"))
    ?.split("=")[1];

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { data: user, error } = await supabase.auth.getUser(accessToken);

  if (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  return NextResponse.json({ user });
}
