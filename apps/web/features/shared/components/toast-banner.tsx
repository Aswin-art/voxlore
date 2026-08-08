"use client"

interface ToastBannerProps {
  message: string | null
  onDismiss: () => void
}

export function ToastBanner({ message, onDismiss }: ToastBannerProps) {
  if (!message) return null

  return (
    <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-2xl flex items-center justify-between shadow-2xl animate-in fade-in slide-in-from-top-2">
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="opacity-70 hover:opacity-100 ml-2 cursor-pointer"
      >
        ✕
      </button>
    </div>
  )
}
