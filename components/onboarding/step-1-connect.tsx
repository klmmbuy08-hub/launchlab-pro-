'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Camera, Network, Music } from 'lucide-react'
import { OnboardingData } from '@/lib/types/v2/onboarding'

interface Step1ConnectProps {
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
}

const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Camera,
    color: 'from-pink-500 to-purple-500',
    description: 'Connect your Instagram Business or Creator account',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: Music,
    color: 'from-black to-pink-500',
    description: 'Connect your TikTok Business account',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Network,
    color: 'from-blue-600 to-blue-400',
    description: 'Connect your LinkedIn profile or page',
  },
]

export function Step1Connect({ data, updateData }: Step1ConnectProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | undefined>(data.platform)

  const handleConnect = async (platformId: string) => {
    setSelectedPlatform(platformId)
    updateData({ platform: platformId as any })

    // TODO: Implement OAuth flow
    // For now, simulate connection
    console.log('Connecting to:', platformId)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Connect Your Platform</h2>
        <p className="text-neutral-400">
          Choose the platform you want to analyze and optimize
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon
          const isSelected = selectedPlatform === platform.id

          return (
            <Card
              key={platform.id}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20'
                  : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
              }`}
              onClick={() => handleConnect(platform.id)}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">{platform.name}</CardTitle>
                <CardDescription>{platform.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className={`w-full ${
                    isSelected
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-neutral-800 hover:bg-neutral-700'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleConnect(platform.id)
                  }}
                >
                  {isSelected ? '✓ Connected' : 'Connect'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedPlatform && (
        <Card className="mt-8 bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">✨</div>
              <div>
                <h3 className="font-semibold text-blue-300 mb-1">Great choice!</h3>
                <p className="text-sm text-blue-200">
                  We'll analyze your {selectedPlatform} content, identify your ideal follower, and show you what's generating real revenue.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
