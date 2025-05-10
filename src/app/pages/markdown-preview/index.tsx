import { cn } from '@/utils/cn'

import { useNote } from '@/hooks/use-note'

export default function Page() {
  const { htmlContent } = useNote()

  return (
    <section
      className={cn(
        'mr-2',
        'px-4 py-8 w-full h-[calc(100vh-70px)] overflow-auto',
      )}
    >
      {htmlContent ?
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      : null}
    </section>
  )
}
