import { ThemeSwitcher } from '../../components/elements/theme-switcher'
import { useNote } from '../../hooks/use-note'

export default function Page() {
  const { markdown, setMarkdown } = useNote()

  return (
    <section className="w-full h-screen overflow-hidden">
      <header className="section-header">
        <div className="w-3"></div>
        <ThemeSwitcher />
      </header>
      <main className="w-full h-full pl-2 pb-2">
        <textarea
          id="markdown-editor"
          value={markdown}
          onChange={setMarkdown}
          className="w-full h-full  px-4 py-8 font-mono resize-none border-0 focus:ring-0 focus:outline-none! text-foreground text-base"
          placeholder="Type markdown here..."
        />
      </main>
    </section>
  )
}
