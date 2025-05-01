import { useNote } from '../../hooks/use-note'
import { cn } from '../../utils/cn'

interface FrontMatterProps {
  className?: string
}

export default function FrontMatter({ className }: FrontMatterProps) {
  const { frontmatter } = useNote()

  return (
    <div className={cn('card p-4 w-full max-w-[300px] select-none', className)}>
      {frontmatter ?
        Object.entries(frontmatter).map(([key, value], index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="font-semibold text-gray-700">{key}</span>
            <span className="mx-2 text-gray-500">:</span>
            <span className="text-gray-900">
              {typeof value === 'object' ? JSON.stringify(value) : value}
            </span>
          </div>
        ))
      : <p className="text-gray-500">No frontmatter available</p>}
    </div>
  )
}
