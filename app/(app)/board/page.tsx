'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BrainCircuit, 
  UserCircle2,
  ChevronRight,
  Headphones,
} from 'lucide-react'

export default function VoiceBoardPage() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [briefing, setBriefing] = useState<string>('')
  const [activeAgent, setActiveAgent] = useState<'CEO' | 'CMO' | 'SALES'>('CEO')
  const synth = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    synth.current = window.speechSynthesis
  }, [])

  const fetchBriefing = async () => {
    setIsSpeaking(true)
    try {
      const response = await fetch('/api/board/briefing')
      const data = await response.json()
      if (data.success) {
        setBriefing(data.data.text)
        speak(data.data.text)
      }
    } catch (error) {
      console.error('Failed to fetch briefing:', error)
      setIsSpeaking(false)
    }
  }

  const speak = (text: string) => {
    if (!synth.current) return
    
    // Stop any current speech
    synth.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 1.0
    utterance.pitch = 1.0
    
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    synth.current.speak(utterance)
  }

  const stopSpeaking = () => {
    if (synth.current) {
      synth.current.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] space-y-12">
      {/* Visualizer / Agent Avatar */}
      <div className="relative">
        {/* Animated Rings */}
        {(isSpeaking || isListening) && (
          <>
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping scale-150" />
            <div className="absolute inset-0 bg-purple-500/10 rounded-full animate-ping scale-[2] [animation-delay:0.5s]" />
          </>
        )}
        
        <div className="relative w-48 h-48 rounded-full bg-neutral-900 border-4 border-neutral-800 flex items-center justify-center shadow-2xl overflow-hidden group">
          <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-1000 ${
            activeAgent === 'CEO' ? 'from-blue-600/20 to-transparent' :
            activeAgent === 'CMO' ? 'from-purple-600/20 to-transparent' :
            'from-green-600/20 to-transparent'
          }`} />
          
          <div className="relative z-10 text-center">
            <UserCircle2 className={`w-20 h-20 mx-auto mb-2 transition-colors duration-500 ${
              isSpeaking ? 'text-white' : 'text-neutral-600'
            }`} />
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500">
              Agent {activeAgent}
            </p>
          </div>
        </div>
      </div>

      {/* Main Info */}
      <div className="text-center space-y-4 max-w-xl">
        <h1 className="text-4xl font-black text-white tracking-tight">The Executive Briefing</h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          {isSpeaking 
            ? "Your AI Board is currently reporting on your business performance and strategic pivots."
            : "Connect with your Board of Directors for a real-time voice update on your launch status."
          }
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <Button
          size="lg"
          variant="outline"
          className="w-16 h-16 rounded-full border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-white shadow-xl"
          onClick={() => {
            const agents: Array<'CEO' | 'CMO' | 'SALES'> = ['CEO', 'CMO', 'SALES']
            const nextIdx = (agents.indexOf(activeAgent) + 1) % agents.length
            setActiveAgent(agents[nextIdx])
          }}
        >
          <BrainCircuit className="w-6 h-6" />
        </Button>

        <Button
          size="lg"
          onClick={isSpeaking ? stopSpeaking : fetchBriefing}
          className={`w-24 h-24 rounded-full shadow-2xl transition-all active:scale-95 ${
            isSpeaking 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSpeaking ? <VolumeX className="w-10 h-10" /> : <Volume2 className="w-10 h-10" />}
        </Button>

        <Button
          size="lg"
          variant="outline"
          disabled={isSpeaking}
          className={`w-16 h-16 rounded-full border-neutral-800 bg-neutral-900 text-white shadow-xl ${
            isListening ? 'border-red-500 text-red-500' : ''
          }`}
          onClick={() => setIsListening(!isListening)}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>
      </div>

      {/* Real-time Subtitles / Text */}
      {briefing && (
        <Card className="bg-neutral-950 border-neutral-800 max-w-2xl w-full">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Live Transcript</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed italic">
              "{briefing}"
            </p>
          </CardContent>
        </Card>
      )}

      {/* Agent Selector Help */}
      <div className="flex gap-4 p-2 bg-neutral-900/50 rounded-2xl border border-neutral-800">
        {(['CEO', 'CMO', 'SALES'] as const).map(agent => (
          <button
            key={agent}
            onClick={() => setActiveAgent(agent)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeAgent === agent 
                ? 'bg-blue-600 text-white' 
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            {agent}
          </button>
        ))}
      </div>
    </div>
  )
}
