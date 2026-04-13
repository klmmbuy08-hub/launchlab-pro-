'use client'

import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { AIAssistantGreeting } from '@/components/ai/ai-assistant-greeting'
import { AuthProvider } from '@/lib/auth/context'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-y-0 left-0 w-64 z-50">
        <Sidebar />
      </div>
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <div className="sticky top-0 z-40 w-full">
          <Header />
        </div>
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full relative">
          <AIAssistantGreeting />
          {children}
        </main>
      </div>
    </div>
    </AuthProvider>
  )
}
