import { NextResponse } from "next/server";

export async function GET() {
  const launches = [
    {
      id: "1",
      name: "Captación Propietarios Madrid Q1",
      type: "LinkedIn Outreach",
      status: "activo",
      prospects: 234,
      signals: 45,
      conversions: 8,
      startDate: "2025-03-01",
      endDate: "2025-03-31",
    },
    {
      id: "2",
      name: "Meta Ads — Vendedores Barcelona",
      type: "Meta Ads",
      status: "activo",
      prospects: 1240,
      signals: 87,
      conversions: 12,
      startDate: "2025-02-15",
      endDate: "2025-04-15",
    },
  ];

  return NextResponse.json({ launches });
}

export async function POST(request: Request) {
  const body = await request.json();

  // Validate required fields
  if (!body.name || !body.type) {
    return NextResponse.json(
      { error: "name and type are required" },
      { status: 400 }
    );
  }

  const newLaunch = {
    id: crypto.randomUUID(),
    ...body,
    status: "borrador",
    prospects: 0,
    signals: 0,
    conversions: 0,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ launch: newLaunch }, { status: 201 });
}
