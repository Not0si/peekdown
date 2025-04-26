import { useMemo } from 'react'
import { RenderElementProps } from 'slate-react'

import { cn } from '../utils'
import { getAlignmentProps } from './render-element'

export default function NodeDefault(props: RenderElementProps) {
  const values = useMemo(() => getAlignmentProps(props), [props])

  return (
    <p
      style={{
        position: 'relative',
        textAlign: values.textAlign ?? 'left',
      }}
      className={cn(
        'text-foreground',
        'first-of-type:data-[empty=true]:after:absolute',
        "first-of-type:data-[empty=true]:after:content-['Write_Somethings...']",
        'first-of-type:data-[empty=true]:after:top-0',
        'first-of-type:data-[empty=true]:after:left-0',
        'first-of-type:data-[empty=true]:after:opacity-[0.5]',
        'first-of-type:data-[empty=true]:after:cursor-text',
      )}
      data-empty={values.isEmpty}
      dir={values.dir}
      {...props.attributes}
    >
      {props.children}
    </p>
  )
}
