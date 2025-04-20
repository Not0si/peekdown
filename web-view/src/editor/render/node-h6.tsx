import { useMemo } from 'react'
import { RenderElementProps } from 'slate-react'

import { getAlignmentProps } from './render-element'

export default function NodeH6(props: RenderElementProps) {
  const values = useMemo(() => getAlignmentProps(props), [props.element])

  return (
    <h6
      style={{
        position: 'relative',
        textAlign: values.textAlign,
      }}
      dir={values.dir}
      {...props.attributes}
    >
      {props.children}
    </h6>
  )
}
