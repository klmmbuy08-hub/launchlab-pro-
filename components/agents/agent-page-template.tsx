'use client'

export interface AgentConfig {
  name: string
  title: string
  description: string
  avatar?: string
  color?: string
}

interface AgentPageTemplateProps {
  config: AgentConfig
  children?: React.ReactNode
}

export function AgentPageTemplate({ config, children }: AgentPageTemplateProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="rounded-[12px] bg-[#171717] border border-[#262626] p-6">
        <div className="flex items-center gap-4 mb-4">
          {config.avatar && (
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ background: config.color || '#3B82F6' }}
            >
              {config.avatar}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-white">{config.name}</h1>
            <p className="text-[#6B7280]">{config.title}</p>
          </div>
        </div>
        <p className="text-[#9CA3AF] text-sm">{config.description}</p>
      </div>

      {children && (
        <div className="rounded-[12px] bg-[#171717] border border-[#262626] p-6">
          {children}
        </div>
      )}
    </div>
  )
}
