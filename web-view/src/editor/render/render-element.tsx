import { RenderElementProps } from 'slate-react'

import { IParagraphElement } from '../editor-types'
import { NodeBlockCode, NodeLineCode } from './node-block-code'
import NodeDefault from './node-default'
import NodeH1 from './node-h1'
import NodeH2 from './node-h2'
import NodeH3 from './node-h3'
import NodeH4 from './node-h4'
import NodeH5 from './node-h5'
import NodeH6 from './node-h6'

export default function RenderElement(props: RenderElementProps) {
  switch (props.element.type) {
    case 'code-block':
      return <NodeBlockCode {...props} />

    case 'code-line':
      return <NodeLineCode {...props} />

    case 'h1':
      return <NodeH1 {...props} />

    case 'h2':
      return <NodeH2 {...props} />

    case 'h3':
      return <NodeH3 {...props} />

    case 'h4':
      return <NodeH4 {...props} />

    case 'h5':
      return <NodeH5 {...props} />

    case 'h6':
      return <NodeH6 {...props} />

    default:
      return <NodeDefault {...props} />
  }
}

export const getAlignmentProps = (props: RenderElementProps) => {
  const element = props.element as IParagraphElement

  const isEmpty =
    !element.children?.length || element.children[0].text.trim() === ''

  const textAlign: 'left' | 'right' | 'center' | undefined =
    element.dir === 'ltr' ? 'left'
    : element.dir === 'rtl' ? 'right'
    : element.dir === 'center' ? 'center'
    : undefined

  return {
    textAlign,
    dir: element.dir,
    isEmpty,
  }
}
