import { useState } from 'react'
import { Editable, Slate, withReact } from 'slate-react'

import { createEditor } from 'slate'

import { getInitialValue } from './core/editor-Initial-value'
import { ReshaperPlugin } from './core/editor-plugins'
import { CustomElement, CustomText, IEditor } from './editor-types'
import RenderElement from './render/render-element'
import RenderLeaf from './render/render-leaf'

const initialValue = getInitialValue()

declare module 'slate' {
  interface CustomTypes {
    Editor: IEditor
    Element: CustomElement
    Text: CustomText
  }
}

export default function TextEditor() {
  const [editor] = useState(() => ReshaperPlugin(withReact(createEditor())))

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      // onChange={onChange}
    >
      <Editable
        as='article'
        className='focus-visible:outline-none m-8 py-10 px-20 min-h-screen card'
        // readOnly={lock}
        renderElement={RenderElement}
        renderLeaf={RenderLeaf}
        // decorate={(entry) => decorate({ entry, search })}
        // onKeyDown={(event) => onKeyDown(event, editor)}
      />
    </Slate>
  )
}
