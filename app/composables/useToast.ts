export type ToastStyle = 'success' | 'error' | 'info'

export type ToastOptions = {
  id?: number
  message: string
  style?: ToastStyle
  duration?: number
  position?: ToastPosition
}

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'center'

const DEFAULT_DURATION = 3000

export const useToast = () => {
  const toasts = useState<ToastOptions[]>('toasts', () => [])

  const dismissToast = (id: number) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  const showToast = (options: ToastOptions) => {
    const id = options.id ?? Date.now() + Math.random()
    const duration = options.duration ?? DEFAULT_DURATION

    toasts.value.push({
      id,
      style: options.style ?? 'info',
      message: options.message,
      duration,
      position: options.position ?? 'top-right',
    })

    setTimeout(() => dismissToast(id), duration)
  }

  return {
    toasts,
    showToast,
    dismissToast,
  }
}
