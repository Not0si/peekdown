import { Transforms } from 'slate'

import { IEditor, IEditorKeyEvent } from '../editor-types'
import { SlateCommands } from './slate-command'
import { SlateElement } from './slate-element'

export const onKeyDown = (event: IEditorKeyEvent, editor: IEditor) => {
  SlateCommands.selectAll(event, editor)
  SlateCommands.onBackspace(event, editor)

  if (SlateCommands.isAllSelected(editor)) {
    return SlateCommands.onSelectAll(editor, event)
  }

  if (event.key === 'Enter') {
    event.preventDefault()

    const isCodeBlock = SlateElement.isMatch(editor, 'code-block')
    const isCodeLine = SlateElement.isMatch(editor, 'code-line')

    if (isCodeBlock || isCodeLine) {
      Transforms.insertNodes(editor, {
        type: 'code-line',
        children: [{ text: '' }],
        category: 'advanced',
      })
    } else {
      Transforms.insertNodes(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
        category: 'text',
      })
    }
  }

  if (event.ctrlKey && event.altKey) {
    event.preventDefault()

    switch (event.key) {
      case '2': {
        // Add Code Block
        // SlateCommands.insertH2(editor)

        break
      }

      case '3': {
        // Add Code Block
        break
      }

      case '4': {
        // Add Code Block
        break
      }

      case '5': {
        // Add Code Block
        break
      }

      case '6': {
        // Add Code Block
        break
      }

      case 'c':
      case 'C': {
        // Add Code Block
        // SlateCommands.insertCode(editor)

        break
      }

      case 'o':
      case 'O': {
        // Add Code Block
        break
      }

      case 'l':
      case 'L': {
        // Add Code Block
        break
      }

      case 'q':
      case 'Q': {
        // Add Code Block
        break
      }

      case 'i':
      case 'I': {
        // Make Text Italic
        SlateCommands.toggleFormat(editor, 'italic')

        break
      }

      case 'e':
      case 'E': {
        break
      }

      case 'b':
      case 'B': {
        // Make Text Bold
        SlateCommands.toggleFormat(editor, 'bold')

        break
      }

      case 'u':
      case 'U': {
        // Add Underline
        SlateCommands.toggleFormat(editor, 'underline')

        break
      }

      case 'w':
      case 'W': {
        // Add Code Block
        break
      }

      case 's':
      case 'S': {
        // Strike Through Text
        SlateCommands.toggleFormat(editor, 'strikeThrough')

        break
      }

      default: {
        // Do Nothing
        break
      }
    }
  }

  //
}
