'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Volume2, VolumeX, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function AIAssistantGreeting() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [briefing, setBriefing] = useState('')
  const [hasGreeted, setHasGreeted] = useState(false)
  const [voiceSettings, setVoiceSettings] = useState({
    voiceName: '',
    pitch: 1.1,
    rate: 1.0
  })
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [showSettings, setShowSettings] = useState(false)
  
  const pathname = usePathname()
  const synth = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    synth.current = window.speechSynthesis
    
    const loadVoices = () => {
      if (synth.current) {
        const voices = synth.current.getVoices()
        setAvailableVoices(voices)
        
        // Load saved settings
        const saved = localStorage.getItem('launchos-voice-settings')
        if (saved) {
          setVoiceSettings(JSON.parse(saved))
        }
      }
    }

    loadVoices()
    if (synth.current?.onvoiceschanged !== undefined) {
      synth.current.onvoiceschanged = loadVoices
    }

    if (pathname === '/dashboard' && !hasGreeted) {
      triggerGreeting()
    }
  }, [pathname])

  const saveSettings = (newSettings: any) => {
    setVoiceSettings(newSettings)
    localStorage.setItem('launchos-voice-settings', JSON.stringify(newSettings))
  }

  const triggerGreeting = async () => {
    try {
      const response = await fetch('/api/board/briefing?type=welcome')
      
      if (!response.ok) {
        console.warn(`Greeting API returned status ${response.status}`)
        return
      }

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('Greeting API returned non-JSON response')
        return
      }

      const data = await response.json()
      
      if (data.success) {
        setBriefing(data.data.text)
        setShowNotification(true)
        setHasGreeted(true)
        
        // Brief delay before speaking
        setTimeout(() => {
          speak(data.data.text)
        }, 1000)
      }
    } catch (error) {
      console.error('Greeting error details:', error)
    }
  }

  const speak = (text: string) => {
    if (!synth.current) return
    synth.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    
    // Apply custom voice if selected
    if (voiceSettings.voiceName) {
      const selectedVoice = availableVoices.find(v => v.name === voiceSettings.voiceName)
      if (selectedVoice) utterance.voice = selectedVoice
    }
    
    utterance.lang = 'es-ES'
    utterance.rate = voiceSettings.rate
    utterance.pitch = voiceSettings.pitch

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => {
      setIsSpeaking(false)
      // Hide notification after 5 seconds of finishing
      setTimeout(() => setShowNotification(false), 5000)
    }

    synth.current.speak(utterance)
  }

  const stopSpeaking = () => {
    if (synth.current) {
      synth.current.cancel()
      setIsSpeaking(false)
      setShowNotification(false)
    }
  }

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 w-80"
        >
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-2xl overflow-hidden relative">
            {/* Animated Progress / Voice Waves */}
            {isSpeaking && (
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600/20">
                <motion.div 
                   className="h-full bg-blue-500"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 15, ease: "linear" }}
                />
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-xl shrink-0 ${isSpeaking ? 'bg-blue-600 text-white animate-pulse' : 'bg-neutral-800 text-neutral-400'}`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Asistente IA Global</p>
                  <button onClick={stopSpeaking} className="text-neutral-600 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">Actualización de Inteligencia</h4>
                <p className="text-xs text-neutral-400 leading-relaxed italic">
                  "{briefing}"
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowSettings(!showSettings)}
                className="text-[10px] h-7 px-3 text-neutral-500"
              >
                Ajustes
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={stopSpeaking}
                className="text-[10px] h-7 px-3 text-neutral-500 hover:text-red-400"
              >
                {isSpeaking ? 'Silenciar' : 'Cerrar'}
              </Button>
            </div>

            {showSettings && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-4 pt-4 border-t border-neutral-800 space-y-3"
              >
                <div className="space-y-1">
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Seleccionar Voz</p>
                  <select 
                    className="w-full bg-black border border-neutral-800 rounded px-2 py-1 text-[10px] text-white"
                    value={voiceSettings.voiceName}
                    onChange={(e) => saveSettings({ ...voiceSettings, voiceName: e.target.value })}
                  >
                    <option value="">Predeterminada</option>
                    {availableVoices
                      .filter(v => v.lang.startsWith('en') || v.lang.startsWith('es'))
                      .map(v => (
                        <option key={v.name} value={v.name}>{v.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Tono: {voiceSettings.pitch}</p>
                    <input 
                      type="range" min="0.5" max="2" step="0.1"
                      className="w-full accent-blue-600"
                      value={voiceSettings.pitch}
                      onChange={(e) => saveSettings({ ...voiceSettings, pitch: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Velocidad: {voiceSettings.rate}</p>
                    <input 
                      type="range" min="0.5" max="2" step="0.1"
                      className="w-full accent-blue-600"
                      value={voiceSettings.rate}
                      onChange={(e) => saveSettings({ ...voiceSettings, rate: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
