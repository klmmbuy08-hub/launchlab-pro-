'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Download, FileText, Sheet, Mail } from 'lucide-react'

interface ExportMenuProps {
  onExport: (format: 'pdf' | 'csv' | 'email') => void
  loading?: boolean
}

export default function ExportMenu({ onExport, loading = false }: ExportMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={loading}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800">
        <DropdownMenuItem
          onClick={() => onExport('pdf')}
          className="cursor-pointer text-neutral-200 focus:bg-neutral-800"
        >
          <FileText className="w-4 h-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onExport('csv')}
          className="cursor-pointer text-neutral-200 focus:bg-neutral-800"
        >
          <Sheet className="w-4 h-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-neutral-800" />
        <DropdownMenuItem
          onClick={() => onExport('email')}
          className="cursor-pointer text-neutral-200 focus:bg-neutral-800"
        >
          <Mail className="w-4 h-4 mr-2" />
          Send via Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
