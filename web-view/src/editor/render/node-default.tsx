import { useMemo } from 'react'
import { RenderElementProps } from 'slate-react'

import { getAlignmentProps } from './render-element'
import { cn } from '../utils'

export default function NodeDefault(props: RenderElementProps) {
  const values = useMemo(() => getAlignmentProps(props), [props.element])

  return (
    <p
      style={{
        position: 'relative',
        textAlign: values.textAlign ?? 'left',
      }}
      className={cn(
        'first-of-type:data-[empty=true]:after:absolute',
        "first-of-type:data-[empty=true]:after:content-['Write_Somethings...']",
        'first-of-type:data-[empty=true]:after:top-0',
        'first-of-type:data-[empty=true]:after:left-0',
        'first-of-type:data-[empty=true]:after:opacity-[0.5]',
        'first-of-type:data-[empty=true]:after:cursor-text'
      )}
      data-empty={values.isEmpty}
      dir={values.dir}
      {...props.attributes}
    >
      {props.children}
    </p>
  )
}
