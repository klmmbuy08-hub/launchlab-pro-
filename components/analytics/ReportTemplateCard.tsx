import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface ReportTemplateCardProps {
  title: string
  description: string
  icon: ReactNode
  onClick: () => void
}

export default function ReportTemplateCard({
  title,
  description,
  icon,
  onClick,
}: ReportTemplateCardProps) {
  return (
    <Card className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer">
      <CardContent className="p-6 space-y-4">
        <div className="text-blue-400">{icon}</div>
        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          <p className="text-sm text-neutral-400 mt-1">{description}</p>
        </div>
        <Button
          onClick={onClick}
          size="sm"
          className="w-full"
        >
          Generate Report
        </Button>
      </CardContent>
    </Card>
  )
}
