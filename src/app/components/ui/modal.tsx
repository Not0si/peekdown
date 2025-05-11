import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

import IconCancel from '@/assets/icons/icon-cancel'

import { Button } from './button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <section className="bg-muted rounded-2xl shadow-lg max-w-lg w-full relative">
        <header className="w-full flex items-center justify-between p-4">
          {title && (
            <h2 className="text-xl font-semibold select-none">{title}</h2>
          )}
          <Button
            variant="ghost"
            size="xsicon"
            className="rounded-full"
            onClick={onClose}
          >
            <IconCancel />
          </Button>
        </header>

        <main className="p-4">{children}</main>
      </section>
    </div>,
    document.getElementById('portal')!,
  )
}
