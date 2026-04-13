'use client'

import React from 'react'
import { StoryContent } from '@/lib/types/stories'
import { cn } from '@/lib/utils'

interface PhoneMockupProps {
  story: StoryContent | null
  className?: string
}

export function PhoneMockup({ story, className }: PhoneMockupProps) {
  if (!story) {
    return (
      <div className={cn("w-[375px] h-[812px] bg-neutral-900 rounded-[50px] border-[8px] border-neutral-800 flex items-center justify-center text-neutral-500", className)}>
        Select a template to preview
      </div>
    )
  }

  const { background, text, sticker } = story

  return (
    <div className={cn("relative w-[375px] h-[812px] bg-black rounded-[50px] border-[8px] border-neutral-800 overflow-hidden shadow-2xl", className)}>
      {/* iOS Status Bar Mock */}
      <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-8 z-20 text-white/90 text-xs font-bold">
        <span>9:41</span>
        <div className="flex gap-1.5">
          <div className="w-4 h-4 rounded-full border border-white/40" />
          <div className="w-4 h-4 rounded-full border border-white/40" />
        </div>
      </div>

      {/* Story Content */}
      <div 
        className="absolute inset-0 transition-all duration-500"
        style={{ 
          background: background.type === 'gradient' ? background.value : background.value,
          backgroundColor: background.type === 'solid' ? background.value : 'transparent'
        }}
      >
        {/* Background Image Placeholder if any */}
        {background.type === 'image' && (
          <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
        )}

        <div className={cn(
          "relative h-full w-full p-8 flex flex-col",
          text.position === 'top' ? 'justify-start pt-24' : 
          text.position === 'center' ? 'justify-center text-center' : 
          'justify-end pb-24'
        )}>
          {/* Main Text */}
          <h2 className={cn(
             "font-black tracking-tight leading-tight transition-all duration-300",
             text.style === 'modern' ? 'text-4xl text-white' :
             text.style === 'neon' ? 'text-4xl text-pink-500 drop-shadow-[0_0_10px_rgba(255,0,128,0.8)]' :
             text.style === 'minimal' ? 'text-2xl text-neutral-100 font-light' :
             'text-3xl text-white font-serif italic'
          )}>
            {text.content}
          </h2>

          {/* Sticker */}
          {sticker && (
            <div className="mt-8 flex justify-center">
              {sticker.type === 'poll' && (
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 w-full shadow-lg">
                  <p className="text-black font-bold text-sm mb-4">{sticker.question}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {sticker.options?.map((opt, i) => (
                      <div key={i} className="bg-neutral-100 py-2.5 rounded-xl text-black text-xs font-black text-center border-b-4 border-neutral-300">
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {sticker.type === 'question' && (
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 w-full shadow-lg text-center">
                   <p className="text-black font-bold text-sm mb-4">{sticker.question}</p>
                   <div className="bg-neutral-100 py-4 rounded-2xl text-neutral-400 text-xs italic">
                     Type something...
                   </div>
                </div>
              )}
              {sticker.type === 'quiz' && (
                <div className="bg-white/95 rounded-2xl p-5 w-full shadow-xl">
                   <p className="text-black font-bold text-center mb-4">{sticker.question}</p>
                   <div className="space-y-2">
                     {sticker.options?.map((opt, i) => (
                       <div key={i} className="bg-white border-2 border-neutral-100 py-3 px-4 rounded-xl text-black text-xs font-medium flex justify-between items-center">
                         {opt}
                         <div className="w-4 h-4 rounded-full border border-neutral-300" />
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* iOS Bottom Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/30 rounded-full z-20" />
    </div>
  )
}
