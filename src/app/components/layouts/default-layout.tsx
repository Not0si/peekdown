import { ReactNode, useEffect } from 'react'

import { useNote } from '../../hooks/use-note'

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const { postMessage, onExtensionEvent } = useNote()

  useEffect(() => {
    postMessage({
      type: 'mount',
    })
  }, [])

  useEffect(() => {
    window.addEventListener('message', onExtensionEvent)

    return () => {
      window.removeEventListener('message', onExtensionEvent)
    }
  }, [])

  return <>{children}</>
}
