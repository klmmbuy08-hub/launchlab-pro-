'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Users, Zap, ExternalLink, BarChart3 } from "lucide-react"

export function CompetitorCard({ competitor, onAnalyze }: any) {
  const { username, platform, latest_snapshot, growth_7d, growth_30d } = competitor
  const followers = latest_snapshot?.followers || 0
  const engagement = latest_snapshot?.avg_engagement_rate || 0

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-[#171717] border-neutral-800 hover:border-red-500/50 transition-all duration-300 group overflow-hidden shadow-2xl rounded-3xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-14 w-14 border-2 border-neutral-800 group-hover:border-red-500/30 transition-colors">
                  <AvatarImage src={competitor.profile_data?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} />
                  <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h3 className="font-bold text-white group-hover:text-red-400 transition-colors">@{username}</h3>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{platform}</p>
              </div>
            </div>
            <a href={`https://${platform}.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-white transition-colors">
               <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/[0.08] transition-colors">
              <div className="flex items-center gap-1.5 text-neutral-500 mb-1">
                <Users className="h-3.5 w-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Followers</span>
              </div>
              <p className="text-xl font-black text-white">{(followers / 1000).toFixed(1)}k</p>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/[0.08] transition-colors">
              <div className="flex items-center gap-1.5 text-neutral-500 mb-1">
                <Zap className="h-3.5 w-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Eng. Rate</span>
              </div>
              <p className="text-xl font-black text-white">{engagement}%</p>
            </div>
          </div>

          <div className="space-y-3 mb-6 bg-black/40 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-neutral-500">7d Growth</span>
              <div className={`flex items-center gap-1 ${growth_7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {growth_7d >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(growth_7d).toFixed(1)}%
              </div>
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-neutral-500">30d Momentum</span>
              <div className={`flex items-center gap-1 ${growth_30d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {growth_30d >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(growth_30d).toFixed(1)}%
              </div>
            </div>
          </div>

          <Button 
            onClick={() => onAnalyze(competitor)}
            className="w-full bg-neutral-800 hover:bg-white hover:text-black font-black uppercase tracking-widest text-[11px] border-none transition-all duration-300 py-6 rounded-2xl shadow-lg"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analyze Intelligence
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
