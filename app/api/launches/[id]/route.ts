import { NextRequest, NextResponse } from 'next/server'
import { getLaunchById, updateLaunch, deleteLaunch } from '@/lib/db/launches'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const launch = await getLaunchById(id)
    return NextResponse.json({ success: true, launch })
  } catch (error: any) {
    console.error('Get launch error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { id } = await params
    const launch = await updateLaunch(id, body)
    return NextResponse.json({ success: true, launch })
  } catch (error: any) {
    console.error('Update launch error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteLaunch(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Delete launch error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
