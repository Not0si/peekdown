import { useEffect } from 'react'

import FrontMatter from './components/elements/front-matter'
import MarkdownViewer from './components/elements/markdown-viewer'
import Toolbar from './components/elements/toolbar'
import { useNote } from './hooks/use-note'

export default function Main() {
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

  return (
    <main className="w-full px-3 py-2 grid gap-2">
      <Toolbar />

      <section className="flex gap-2 ">
        <FrontMatter />
        <MarkdownViewer />
      </section>
    </main>
  )
}
