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
        'bg-muted px-4 py-8 w-full h-full max-h-full',
        'rounded-[1.5rem] border border-border overflow-y-auto',
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
