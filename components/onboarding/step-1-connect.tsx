'use client'

import { Button } from '@/components/ui/button'
import { Share2, Video, Send, Globe } from 'lucide-react'

interface StepProps {
  data: any
  updateData: (data: any) => void
}

export function Step1Connect({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Connect Your Powerhouse</h2>
        <p className="text-neutral-400">Sync your social accounts to let our AI analyze your audience.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button
          variant={data.platform === 'instagram' ? 'default' : 'outline'}
          className={`h-16 justify-between px-6 ${
            data.platform === 'instagram' ? 'bg-gradient-to-r from-pink-600 to-purple-600 border-0' : 'border-neutral-800'
          }`}
          onClick={() => updateData({ platform: 'instagram' })}
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Share2 className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-bold">Instagram Business</p>
              <p className="text-xs opacity-70">Sync followers, reels & posts</p>
            </div>
          </div>
          {data.platform === 'instagram' && <div className="w-2 h-2 bg-white rounded-full" />}
        </Button>

        <Button
         
          className="h-16 justify-between px-6 border-neutral-800 opacity-50 cursor-not-allowed"
          disabled
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Video className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-bold">YouTube (Coming Soon)</p>
              <p className="text-xs opacity-70">Analyze shorts & subscribers</p>
            </div>
          </div>
        </Button>

        <Button
         
          className="h-16 justify-between px-6 border-neutral-800 opacity-50 cursor-not-allowed"
          disabled
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Send className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-bold">Facebook Ads</p>
              <p className="text-xs opacity-70">Requires account permission</p>
            </div>
          </div>
        </Button>
      </div>

      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex gap-3 mt-8">
        <Globe className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-100 leading-relaxed">
          LaunchOS uses officially verified APIs from Meta and Google to ensure your data security and platform integrity.
        </p>
      </div>
    </div>
  )
}
