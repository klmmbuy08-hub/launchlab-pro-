'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"

interface AddCompetitorModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (username: string, platform: string) => Promise<void>
}

export function AddCompetitorModal({ isOpen, onClose, onAdd }: AddCompetitorModalProps) {
  const [username, setUsername] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username) return
    
    setLoading(true)
    try {
      await onAdd(username, platform)
      setUsername('')
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-900 border-neutral-800 text-white sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Track New Competitor</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Enter the social media handle of the competitor you want to analyze and outpace.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="platform" className="text-xs font-bold uppercase tracking-widest text-neutral-500">Platform</Label>
            <select 
              id="platform"
              className="w-full bg-neutral-800 border-neutral-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-neutral-500">Username / Handle</Label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-neutral-500 font-bold">@</span>
              <Input 
                id="username"
                className="bg-neutral-800 border-neutral-700 pl-9 h-12 rounded-xl focus:ring-red-500"
                placeholder="competitor_handle"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="pt-4 gap-2">
            <Button variant="ghost" type="button" onClick={onClose} disabled={loading} className="rounded-xl font-bold">
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 rounded-xl shadow-lg shadow-red-600/20" disabled={loading}>
              {loading ? 'Analyzing...' : 'Start Tracking'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
