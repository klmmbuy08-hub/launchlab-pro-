import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      { id: '1', name: 'Instagram', category: 'Social Media', status: 'connected', icon: 'instagram', description: 'Connect your Instagram account' },
      { id: '2', name: 'LinkedIn', category: 'Social Media', status: 'connected', icon: 'linkedin', description: 'Connect your LinkedIn profile' },
      { id: '3', name: 'Pipedrive', category: 'CRM', status: 'connected', icon: 'pipedrive', description: 'Sync leads to Pipedrive' },
      { id: '4', name: 'n8n', category: 'Automation', status: 'connected', icon: 'n8n', description: 'Create automated workflows' },
      { id: '5', name: 'Google Analytics', category: 'Analytics', status: 'disconnected', icon: 'google', description: 'Track website analytics' },
    ],
  })
}
