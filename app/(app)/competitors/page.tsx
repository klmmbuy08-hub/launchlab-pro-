'use client'

import { useState, useEffect } from 'react'
import { Plus, Target, BarChart2, Zap, Info, ShieldCheck, Trophy, ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CompetitorCard } from '@/components/business/CompetitorCard'
import { BenchmarkTable } from '@/components/business/BenchmarkTable'
import { GapAnalysisCard } from '@/components/business/GapAnalysisCard'
import { AddCompetitorModal } from '@/components/business/AddCompetitorModal'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/lib/toast/context'
import { motion, AnimatePresence } from 'framer-motion'

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<any[]>([])
  const [userAccount, setUserAccount] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCompetitor, setSelectedCompetitor] = useState<any>(null)
  const { addToast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/competitors')
      const result = await response.json()
      if (result.success) {
        setCompetitors(result.data.competitors)
        setUserAccount(result.data.user_account)
        if (result.data.competitors.length > 0) {
          setSelectedCompetitor(result.data.competitors[0])
        }
      }
    } catch (error) {
      console.error('Fetch error:', error)
      addToast("Could not sync competitor data.", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleAddCompetitor = async (username: string, platform: string) => {
    try {
      const response = await fetch('/api/competitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, platform })
      })
      const result = await response.json()
      if (result.success) {
        addToast(`We are now tracking @${username}.`, "success")
        fetchData()
      } else {
        addToast(result.error, "error")
      }
    } catch (error) {
      addToast("Failed to connect to monitoring service.", "error")
    }
  }

  if (loading) {
    return (
      <div className="space-y-12 p-8 max-w-[1600px] mx-auto animate-pulse">
        <div className="flex justify-between items-center">
          <Skeleton className="h-14 w-80 bg-[#1A1A1A] rounded-2xl" />
          <Skeleton className="h-14 w-44 bg-[#1A1A1A] rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-80 rounded-3xl bg-[#1A1A1A]/50" />)}
        </div>
        <Skeleton className="h-[400px] rounded-3xl bg-[#1A1A1A]/30" />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 space-y-12 max-w-[1600px] mx-auto pb-24">
      {/* Premium Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-12"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 font-black text-[10px] uppercase tracking-[0.2em]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Competitive Intelligence Engine v2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
             RIVALS
          </h1>
          <p className="text-[#4B5563] text-lg md:text-xl font-bold max-w-2xl leading-relaxed">
            Ethical spying and performance mapping. Identify their weaknesses and replicate their winning hooks.
          </p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-neutral-100 hover:text-black text-white h-16 px-10 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl shadow-red-600/20 transition-all active:scale-95 shrink-0"
        >
          <Plus className="mr-3 h-6 w-6 stroke-[3px]" />
          Track New Entity
        </Button>
      </motion.div>

      {/* Competitor Grid Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="h-px flex-1 bg-white/5" />
           <div className="flex items-center gap-2 text-neutral-600 text-[10px] font-black uppercase tracking-[0.3em]">
              <BarChart2 className="h-4 w-4" />
              Live Performance Grid
           </div>
           <div className="h-px flex-1 bg-white/5" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {competitors.map((comp, idx) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <CompetitorCard 
                  competitor={comp} 
                  onAnalyze={(c: any) => setSelectedCompetitor(c)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {competitors.length === 0 && (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-[#262626] rounded-[40px] bg-[#171717]/20">
               <div className="bg-[#1A1A1A] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Info className="h-10 w-10 text-neutral-600" />
               </div>
               <h3 className="text-2xl font-black text-white mb-2">Dark Orbit Empty</h3>
               <p className="text-[#4B5563] max-w-sm mx-auto font-medium">Add a competitor username and platform to begin deep-packet strategy analysis.</p>
               <Button onClick={() => setIsModalOpen(true)} variant="link" className="mt-4 text-red-500 font-black uppercase tracking-widest text-xs">
                 Initialize tracking now <ArrowRight className="ml-2 w-4 h-4" />
               </Button>
            </div>
          )}
        </div>
      </section>

      {/* Main Analysis Section */}
      {competitors.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 xl:grid-cols-12 gap-10"
        >
          {/* Left Column: Metrics & Benchmarking */}
          <div className="xl:col-span-8 space-y-12">
             <BenchmarkTable userAccount={userAccount} competitors={competitors} />
             
             <div className="space-y-8 pt-4">
                <div className="flex items-end justify-between border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3">
                     <div className="p-3 bg-yellow-500/10 rounded-2xl">
                        <Zap className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-white">AI Strategy Breakdown</h2>
                        <p className="text-[#4B5563] text-sm font-bold uppercase tracking-widest">Targeting: @{selectedCompetitor?.username}</p>
                     </div>
                  </div>
                </div>
                <GapAnalysisCard competitor={selectedCompetitor} />
             </div>
          </div>
          
          {/* Right Column: Global Trends & Insights */}
          <div className="xl:col-span-4 space-y-8">
             <div className="bg-gradient-to-b from-[#171717] to-neutral-900 rounded-[32px] p-8 border border-white/5 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5">
                   <Trophy className="w-64 h-64 text-yellow-500 rotate-12" />
                </div>
                
                <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-red-600 rounded-full" />
                  Growth Leaderboard
                </h3>
                
                <div className="space-y-6 relative z-10">
                   {competitors.sort((a,b) => b.growth_30d - a.growth_30d).slice(0, 5).map((c, i) => (
                     <div key={i} className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform" onClick={() => setSelectedCompetitor(c)}>
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img 
                              src={c.profile_data?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.username}`} 
                              className="h-12 w-12 rounded-2xl border-2 border-[#262626] group-hover:border-red-500 transition-colors" 
                              alt="" 
                            />
                            {i === 0 && <Trophy className="absolute -top-2 -right-2 w-5 h-5 text-yellow-500 fill-yellow-500 drop-shadow-md" />}
                          </div>
                          <div>
                            <p className="text-sm font-black text-white">@{c.username}</p>
                            <p className="text-[10px] text-neutral-600 font-bold uppercase">{c.platform}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-black ${c.growth_30d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {c.growth_30d > 0 ? '+' : ''}{c.growth_30d.toFixed(1)}%
                          </p>
                          <div className="h-1 w-20 bg-[#1A1A1A] rounded-full mt-1.5 overflow-hidden">
                             <div 
                               className={`h-full ${c.growth_30d >= 0 ? 'bg-green-500' : 'bg-red-500'}`} 
                               style={{ width: `${Math.min(Math.abs(c.growth_30d) * 3, 100)}%` }} 
                             />
                          </div>
                        </div>
                     </div>
                   ))}
                </div>
                
                <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                   <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest">
                      <TrendingUp className="w-4 h-4 text-red-500" />
                      Weekly Intelligence
                   </div>
                   <p className="text-sm text-[#6B7280] leading-relaxed font-medium">
                     Your target niche is shifting towards <strong>High-Contrast Visuals</strong>. Top performers are seeing a 24% boost in reach when using this style.
                   </p>
                </div>
             </div>

             {/* Bottom Action Card */}
             <Card className="bg-red-600 rounded-[32px] p-8 border-none overflow-hidden relative shadow-2xl group cursor-pointer">
                <div className="absolute top-0 right-0 -mr-4 -mt-4 bg-white/10 w-24 h-24 rounded-full blur-3xl transition-all group-hover:scale-150" />
                <h4 className="text-2xl font-black text-white mb-2 relative z-10">Outperform them</h4>
                <p className="text-red-100/80 text-sm font-bold mb-6 relative z-10">Generate a custom content calendar based on competitor analysis.</p>
                <Button className="w-full bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl h-14 group-hover:gap-4 transition-all">
                  Run Agent Protocol <ArrowRight className="w-4 h-4" />
                </Button>
             </Card>
          </div>
        </motion.div>
      )}

      {/* Modal */}
      <AddCompetitorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddCompetitor}
      />
    </div>
  )
}
