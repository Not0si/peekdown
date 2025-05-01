import { useNote } from '../../hooks/use-note'
import { cn } from '../../utils/cn'

export default function Page() {
  const { markdown, setMarkdown } = useNote()

  return (
    <section
      className={cn(
        'transition-all duration-300 ease-in-out',
        // isPreviewVisible ? 'w-1/2' : 'w-full',
      )}
    >
      <textarea
        id="markdown-editor"
        value={markdown}
        onChange={setMarkdown}
        className="w-full h-[500px] p-4 font-mono text-sm resize-none border-0 focus:ring-0 focus:outline-none"
        placeholder="Type markdown here..."
      />
    </section>
  )
}
