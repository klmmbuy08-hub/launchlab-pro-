import { NextResponse } from "next/server";

export async function GET() {
  // Placeholder — integrate with Supabase Auth in production
  return NextResponse.json({
    user: {
      id: "usr_omar",
      name: "Omar",
      email: "omar@launchlab.pro",
      plan: "pro",
    },
  });
}
