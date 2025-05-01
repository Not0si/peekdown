import { useNote } from '../../hooks/use-note'
import { cn } from '../../utils/cn'

interface MarkdownViewerProps {
  className?: string
}

export default function MarkdownViewer({ className }: MarkdownViewerProps) {
  const { htmlContent } = useNote()

  return (
    <div
      className={cn(
        'card p-4 w-full min-h-[calc(100vh-76px)] max-h-[calc(100vh-76px)]',
        'overflow-y-auto',
        className,
      )}
    >
      {htmlContent ?
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      : null}
    </div>
  )
}
