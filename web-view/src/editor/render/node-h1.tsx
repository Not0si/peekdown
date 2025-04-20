import { useMemo } from 'react'
import { RenderElementProps } from 'slate-react'

import { getAlignmentProps } from './render-element'
import { cn } from '../utils'

export default function NodeH1(props: RenderElementProps) {
  const values = useMemo(() => getAlignmentProps(props), [props.element])

  return (
    <h1
      style={{
        position: 'relative',
        textAlign: values.textAlign ?? 'left',
      }}
      className={cn(
        'text-4xl font-medium tracking-normal mb-[26px] whitespace-pre-wrap relative',
        `data-[empty=true]:after:absolute data-[empty=true]:after:content-['Untitled_Article'] data-[empty=true]:after:top-0 data-[empty=true]:after:left-0 data-[empty=true]:after:opacity-[0.5] data-[empty=true]:after:cursor-text text-red-600`
      )}
      data-empty={values.isEmpty}
      dir={values.dir}
      {...props.attributes}
    >
      {props.children}
    </h1>
  )
}
