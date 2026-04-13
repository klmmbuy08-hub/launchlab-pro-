'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Send, 
  MessageSquare, 
  Plus, 
  Search, 
  Sparkles, 
  BrainCircuit, 
  UserCircle2,
  MoreVertical,
  Paperclip,
  Smile,
  Circle,
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  agent?: 'CEO' | 'CMO' | 'SALES' | 'SYSTEM'
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      agent: 'CEO',
      content: 'Welcome to the Command Chat. I am the CEO Agent. How can our board help you scale today?',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeAgent, setActiveAgent] = useState<'CEO' | 'CMO' | 'SALES'>('CEO')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, agent: activeAgent }),
      })
      const result = await response.json()
      
      if (result.success) {
        setIsTyping(false)
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          agent: activeAgent,
          content: result.data.reply,
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, assistantMsg])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setIsTyping(false)
    }
  }

  const agents = [
    { id: 'CEO', name: 'Strategic CEO', desc: 'Growth & Vision', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'CMO', name: 'Creativity CMO', desc: 'Marketing & Ads', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'SALES', name: 'Closer Sales', desc: 'Conversion & CRM', color: 'text-green-400', bg: 'bg-green-400/10' },
  ]

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6">
      {/* Sidebar: Agents */}
      <div className="w-80 flex flex-col gap-6">
        <Card className="bg-neutral-900 border-neutral-800 flex-1 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-xl font-bold text-white mb-4">Board Members</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input placeholder="Search threads..." className="bg-neutral-950 border-neutral-800 pl-10 text-xs" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent.id as any)}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${
                  activeAgent === agent.id 
                    ? 'bg-neutral-800 border border-neutral-700 shadow-xl' 
                    : 'hover:bg-neutral-800/50 border border-transparent'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl ${agent.bg} flex items-center justify-center relative shrink-0`}>
                  <UserCircle2 className={`w-6 h-6 ${agent.color}`} />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{agent.name}</p>
                  <p className="text-[10px] text-neutral-500 truncate uppercase mt-0.5">{agent.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-neutral-800 bg-neutral-950/50">
            <Button variant="outline" className="w-full border-neutral-800 text-neutral-400 hover:text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Start Multi-Agent Debate
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Chat Area */}
      <Card className="flex-1 bg-neutral-950 border-neutral-800 flex flex-col overflow-hidden relative shadow-2xl">
        {/* Chat Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/30 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-xl bg-neutral-800`}>
              <BrainCircuit className="w-6 h-6 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Operational Briefing: <span className="text-blue-400">{activeAgent}</span>
              </h3>
              <div className="flex items-center gap-2">
                <Circle className="w-2 h-2 fill-green-500 text-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-none mt-0.5">Encrypted Connection Active</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-white"><MoreVertical className="w-5 h-5" /></Button>
          </div>
        </div>

        {/* Messages Container */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent)]"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.role === 'assistant' && (
                  <div className={`w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0`}>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                )}
                <div className="space-y-1">
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 rounded-tr-none' 
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-200 shadow-xl rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                  <div className={`flex items-center gap-2 text-[10px] text-neutral-600 px-1 font-bold uppercase tracking-widest ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.agent || 'YOU'}</span>
                    <span>•</span>
                    <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 bg-neutral-900 border border-neutral-800 p-4 rounded-2xl rounded-tl-none shadow-xl">
                 <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" />
                   <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                   <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-neutral-900/50 backdrop-blur-xl border-t border-neutral-800 z-10">
          <div className="relative flex items-center gap-3">
             <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-white bg-neutral-950 border border-neutral-800">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-white bg-neutral-950 border border-neutral-800">
                  <Smile className="w-4 h-4" />
                </Button>
             </div>
             <div className="flex-1 relative">
                <Input 
                  placeholder={`Send message to ${activeAgent}...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="bg-neutral-950 border-neutral-800 focus:border-blue-500 h-14 pl-4 pr-12 text-sm text-white rounded-2xl shadow-inner shadow-black/50" 
                />
                <Button 
                  size="icon" 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
             </div>
          </div>
          <p className="text-[10px] text-neutral-600 text-center mt-4 font-bold uppercase tracking-widest">
            AI can make mistakes. Verify critical business output.
          </p>
        </div>
      </Card>
    </div>
  )
}
