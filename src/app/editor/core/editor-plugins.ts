import { CustomElement, IEditor } from '../editor-types'

const voidElements = ['image', 'test']

export const ReshaperPlugin = (editor: IEditor): IEditor => {
  const { insertData, isVoid } = editor

  editor.isVoid = (element: CustomElement) => {
    return voidElements.includes(element.type) ? true : isVoid(element)
  }

  // Handle Past
  editor.insertData = (data: DataTransfer): void => {
    return insertData(data)
  }

  return editor
}
