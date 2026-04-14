'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown } from "lucide-react"

interface BenchmarkTableProps {
  userAccount: any
  competitors: any[]
}

export function BenchmarkTable({ userAccount, competitors }: BenchmarkTableProps) {
  // Combine user and competitors for comparison
  const data = [
    {
      id: 'you',
      isUser: true,
      username: userAccount?.username || 'You',
      name: 'Your Channel',
      followers: userAccount?.insights?.[0]?.total_followers || 0,
      engagement: userAccount?.insights?.[0]?.avg_engagement_rate || 0,
      growth: userAccount?.insights?.[0]?.follower_growth || 0,
    },
    ...competitors.map(c => ({
      id: c.id,
      isUser: false,
      username: c.username,
      name: '@' + c.username,
      followers: c.latest_snapshot?.followers || 0,
      engagement: c.latest_snapshot?.avg_engagement_rate || 0,
      growth: c.growth_30d || 0,
    }))
  ].sort((a, b) => b.followers - a.followers)

  return (
    <Card className="bg-neutral-900 border-neutral-800 overflow-hidden rounded-3xl">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">Benchmark Matrix</CardTitle>
        <CardDescription>Direct metric mapping against your primary rivals.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-800 text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">
                <th className="pb-4 pl-8 pt-2"># Rank</th>
                <th className="pb-4 pt-2">Entity</th>
                <th className="pb-4 pt-2">Audience</th>
                <th className="pb-4 pt-2">Engagement</th>
                <th className="pb-4 pt-2">30d Velocity</th>
                <th className="pb-4 pr-8 pt-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={`border-b border-neutral-800/50 transition-colors group ${
                    item.isUser ? 'bg-red-500/5 hover:bg-red-500/10' : 'hover:bg-neutral-800/40'
                  }`}
                >
                  <td className="py-6 pl-8">
                    <span className={`text-lg font-black ${
                      index === 0 ? 'text-yellow-500' : index === 1 ? 'text-neutral-400' : index === 2 ? 'text-amber-700' : 'text-neutral-700'
                    }`}>
                      {index === 0 ? <Crown className="inline h-4 w-4 mr-1 -mt-1" /> : null}
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-6">
                    <div>
                      <p className={`font-bold transition-colors ${item.isUser ? 'text-red-400' : 'text-white'}`}>
                        {item.name}
                      </p>
                      <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-wider">@{item.username}</p>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="text-white font-mono font-bold">
                      {(item.followers / 1000).toFixed(1)}k
                    </span>
                  </td>
                  <td className="py-6">
                    <div className="flex items-center gap-2">
                       <span className={`font-bold ${item.engagement > 5 ? 'text-green-400' : 'text-blue-400'}`}>
                         {item.engagement}%
                       </span>
                       <div className="w-16 h-1 bg-neutral-800 rounded-full overflow-hidden hidden sm:block">
                          <div 
                            className={`h-full ${item.engagement > 5 ? 'bg-green-500' : 'bg-blue-500'}`} 
                            style={{ width: `${Math.min(item.engagement * 4, 100)}%` }} 
                          />
                       </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className={`font-black ${item.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {item.growth > 0 ? '+' : ''}{item.growth.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-6 pr-8 text-right">
                    {item.isUser ? (
                      <Badge className="bg-red-600 text-white font-black uppercase text-[9px] px-3">Main Account</Badge>
                    ) : (
                      <Badge className="border-neutral-700 text-neutral-500 font-bold uppercase text-[9px] px-3">Tracking</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
