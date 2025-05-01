import { useNote } from '../../hooks/use-note'
import { cn } from '../../utils/cn'

export default function Toolbar() {
  const { metadata } = useNote()

  return (
    <header
      className={cn(
        'flex items-center justify-between bg-muted card h-[48px] px-4 select-none',
      )}
    >
      <h1 className="text-xl font-semibold text-gray-900">
        {metadata?.baseName}
      </h1>
      <aside></aside>
    </header>
  )
}
