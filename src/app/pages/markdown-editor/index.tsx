import { useNote } from '@/hooks/use-note'

export default function Page() {
  const { markdown, setMarkdown } = useNote()

  return (
    <section className="h-[calc(100vh-70px)] pr-2 pb-2">
      <textarea
        id="markdown-editor"
        value={markdown}
        onChange={setMarkdown}
        className="w-full h-full  px-4 py-8 font-mono resize-none border-0 focus:ring-0 focus:outline-none! text-foreground text-base"
        placeholder="Type markdown here..."
      />
    </section>
  )
}
