import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: '1',
        name: 'Juan García',
        email: 'juan@inmobiliaria.es',
        phone: '+34 912 345 678',
        company: 'García Propiedades',
        status: 'qualified',
        source: 'linkedin',
        created_date: '2026-04-08',
        value: 2500,
      },
      {
        id: '2',
        name: 'María López',
        email: 'maria@realestate.es',
        phone: '+34 913 456 789',
        company: 'López & Asociados',
        status: 'contacted',
        source: 'website',
        created_date: '2026-04-10',
        value: 2500,
      },
    ],
  })
}
