import { cn } from '@/utils/cn'

import { Button } from '@/components/ui/button'

import { useNote } from '@/hooks/use-note'

export default function Page() {
  const { metadata, htmlContent } = useNote()

  return (
    <section className="flex w-full h-full flex-col">
      <header className="section-header">
        <h1>{metadata?.baseName}</h1>
        <Button size={'xs'}>Save</Button>
      </header>
      <main className="w-full h-full pr-2 pb-2">
        <div
          className={cn(
            'px-4 py-8 w-full h-full max-h-full',
            'rounded-[1.5rem] border border-border overflow-y-auto',
          )}
        >
          {htmlContent ?
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          : null}
        </div>
      </main>
    </section>
  )
}
