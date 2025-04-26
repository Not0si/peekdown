import { Editor, Element, Node } from 'slate'

import { CustomElement, IEditor } from '../editor-types'

export const SlateElement = {
  ...Element,
  isMatch: (editor: IEditor, type: string): boolean => {
    const [match] = Editor.nodes(editor, {
      match: (node) => {
        if (Element.isElement(node)) {
          return type ? node.type === type : true
        }

        return false
      },
    })

    return Boolean(match)
  },
  isImage: (editor: IEditor) => SlateElement.isMatch(editor, 'image'),
  isParagraph: (editor: IEditor) => SlateElement.isMatch(editor, 'p'),
  isH1: (editor: IEditor) => SlateElement.isMatch(editor, 'h1'),
  isQuote: (editor: IEditor) => SlateElement.isMatch(editor, 'quote'),
  isTextCategory: (editor: IEditor): boolean => {
    const [match] = Editor.nodes(editor, {
      match: (node) => {
        if (Element.isElement(node)) {
          return node.category === 'text'
        }

        return false
      },
    })

    return Boolean(match)
  },
  isEmptyText: (editor: IEditor): boolean => {
    const [match] = Editor.nodes(editor, {
      match: (node) => {
        if (Element.isElement(node)) {
          return Node.string(node).trim() === ''
        }

        return false
      },
    })

    return Boolean(match)
  },
  previousElement: (editor: IEditor): null | CustomElement => {
    const metadatas = Editor.previous(editor)

    if (metadatas) {
      const [_node, path] = metadatas
      const element = Node.parent(editor, path) as CustomElement
      return element
    }

    return null
  },
  nextElement: (editor: IEditor) => {
    const metadatas = Editor.next(editor)

    if (metadatas) {
      const [node, path] = metadatas
      console.log({ node, path })
    }
  },
}
