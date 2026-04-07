import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="pt-16 p-6 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full">{children}</main>
      </div>
    </div>
  )
}
