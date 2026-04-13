import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: '1',
        name: 'LinkedIn Lead Qualifier',
        description: 'Automatically qualifies LinkedIn leads and adds to CRM',
        status: 'active',
        platform: 'n8n',
        trigger: 'LinkedIn message received',
        executions: 245,
        last_run: '2026-04-13 10:30',
        success_rate: 94,
      },
      {
        id: '2',
        name: 'Lead to Pipedrive',
        description: 'Sends qualified leads to Pipedrive automatically',
        status: 'active',
        platform: 'make',
        trigger: 'Lead qualified in system',
        executions: 128,
        last_run: '2026-04-13 09:15',
        success_rate: 98,
      },
    ],
  })
}
