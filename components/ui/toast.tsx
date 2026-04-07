"use client"

import { useEffect } from "react"
import { useToast, type Toast as ToastType } from "@/lib/toast/context"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"

function Toast({ toast, onRemove }: { toast: ToastType; onRemove: () => void }) {
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(onRemove, toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast.duration, onRemove])

  const bgColor = {
    success: "bg-green-500/10 border-green-500/20",
    error: "bg-red-500/10 border-red-500/20",
    info: "bg-blue-500/10 border-blue-500/20",
  }[toast.type]

  const textColor = {
    success: "text-green-600",
    error: "text-red-600",
    info: "text-blue-600",
  }[toast.type]

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }[toast.type]

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${bgColor}`}
      role="alert"
    >
      <Icon className={`h-5 w-5 ${textColor} flex-shrink-0`} />
      <span className={`text-sm font-medium ${textColor}`}>{toast.message}</span>
      <button
        onClick={onRemove}
        className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}
