import { Editor, Range, Transforms } from 'slate'
import { Element } from 'slate'

import { KeyboardEvent } from 'react'

import {
  IEditor,
  IElementTypes,
  ITextAlign,
  ITextElements,
  ITextFormat,
} from '../editor-types'
import { SlateElement } from './slate-element'

type IKeyEvent = KeyboardEvent<HTMLDivElement>

export const SlateCommands = {
  /**
   * Checks if a specific text format is currently active in the editor.
   *
   * @param {IEditor} editor - The editor instance from Slate.js.
   * @param {ITextFormat} format - The text format to check for (e.g., 'bold', 'italic').
   * @returns {boolean} True if the specified format is active, otherwise false.
   */
  isFormatActive: (editor: IEditor, format: ITextFormat): boolean => {
    const marks = Editor.marks(editor)
    return marks?.[format] === true
  },

  /**
   * Toggles a specific text format in the editor.
   * If the format is currently active, it will be removed;
   * otherwise, it will be applied.
   *
   * @param {IEditor} editor - The editor instance from Slate.js.
   * @param {ITextFormat} format - The text format to toggle (e.g., 'bold', 'italic').
   */
  toggleFormat: (editor: IEditor, format: ITextFormat): void => {
    if (SlateCommands.isFormatActive(editor, format)) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  },

  /**
   * Checks if the current text alignment in the editor matches the specified alignment.
   *
   * @param {IEditor} editor - The editor instance that contains the text and selection.
   * @param {ITextAlign} align - The alignment to check against (e.g., 'left', 'right', 'center', 'justify').
   * @returns {boolean} - Returns true if the current selection's alignment matches the specified alignment; otherwise, returns false.
   *
   * @example
   * const isCenterAligned = isAlignmentActive(editor, 'center');
   *   // true if the selected text is center-aligned, false otherwise.
   */
  isAlignmentActive: (editor: IEditor, align: ITextAlign): boolean => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (node) =>
          !Editor.isEditor(node) &&
          SlateElement.isElement(node) &&
          ((node as ITextElements)?.dir ?? 'ltr') === align,
      }),
    )

    return !!match
  },

  /**
   * Retrieves the alignment and type information of the first text node in the editor.
   *
   * @param {IEditor} editor - The editor instance from which to retrieve the text node alignment.
   * @returns {Object} - An object containing information about the text node:
   *   - {boolean} isTextNode - Indicates whether a text node was found.
   *   - {string | undefined} type - The type of the text node, if found; otherwise, undefined.
   *   - {string} dir - The direction of the text node, defaults to 'ltr' if not specified.
   *
   * @example
   * const alignmentInfo = getAlignment(editor);
   * console.log(alignmentInfo.isTextNode); // true if a text node exists
   * console.log(alignmentInfo.type); // type of the text node, if any
   * console.log(alignmentInfo.dir); // text direction, e.g., 'ltr' or 'rtl'
   */
  getAlignment: (editor: IEditor) => {
    const [object] = Editor.nodes(editor, {
      match: (node) => {
        if (Element.isElement(node)) {
          return node.category === 'text'
        }
        return false
      },
    })

    const node = object?.[0] as ITextElements

    return {
      isTextNode: Boolean(node),
      type: node?.type,
      dir: node?.dir ?? 'ltr',
    }
  },

  /**
   * Sets the alignment direction of the text nodes in the editor to the specified alignment.
   *
   * @param {IEditor} editor - The editor instance where the text alignment will be set.
   * @param {ITextAlign} align - The desired alignment to apply (e.g., 'left', 'right', 'center', 'justify').
   * @returns {void} - This function does not return a value.
   *
   * @example
   * setAlignment(editor, 'center'); // Sets the alignment of the selected text nodes to center.
   */
  setAlignment: (editor: IEditor, align: ITextAlign): void => {
    const obj = SlateCommands.getAlignment(editor)

    if (obj.isTextNode) {
      Transforms.setNodes(
        editor,
        { type: obj.type as IElementTypes, dir: align },
        {
          match: (node) =>
            SlateElement.isElement(node) &&
            node.type === (obj.type as IElementTypes),
        },
      )
    }
  },

  /**
   * Checks if the entire content in the editor is currently selected.
   *
   * @param {IEditor} editor - The editor instance to check the selection status.
   * @returns {boolean} - Returns true if there is a selection and it spans the entire content; otherwise, returns false.
   *
   * @example
   * const allSelected = isAllSelected(editor);
   * console.log(allSelected); // true if the whole content is selected, false otherwise.
   */
  isAllSelected: (editor: IEditor): boolean => {
    const { selection, children } = editor

    return Boolean(
      selection &&
        Range.isExpanded(selection) &&
        selection.focus.path[0] == children.length - 1,
    )
  },

  onSelectAll: (editor: IEditor, event: IKeyEvent): void => {
    if (
      event.key === 'Backspace' ||
      event.key === 'Delete' ||
      event.key === 'Enter' ||
      (event.ctrlKey && (event.key === 'X' || event.key === 'x'))
    ) {
      event.preventDefault()

      Transforms.removeNodes(editor)

      // Transforms.insertNodes(
      //   editor,
      //   {
      //     type: 'paragraph',
      //     children: [{ text: '' }],
      //     category: 'text',
      //   },
      //   { at: [0] },
      // )
    }
  },

  selectAll: (event: IKeyEvent, editor: IEditor) => {
    const aKey = event.key === 'a' || event.key === 'A'
    const triggerKey = event.ctrlKey || event.metaKey

    if (!(triggerKey && aKey)) return null
    event.preventDefault()

    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const nodes = Array.from(Editor.nodes(editor, { at: [] }))

      const selectableNodes = nodes.filter(
        ([node]) => Element.isElement(node) && node.type !== 'h1',
      )

      if (selectableNodes.length > 0) {
        const firstNodePath = Editor.path(editor, selectableNodes[0][1])
        const lastNodePath = Editor.path(
          editor,
          selectableNodes[selectableNodes.length - 1][1],
        )

        Transforms.select(editor, {
          anchor: Editor.start(editor, firstNodePath),
          focus: Editor.end(editor, lastNodePath),
        })
      }
    }
  },

  onBackspace: (event: IKeyEvent, editor: IEditor) => {
    if (event.key !== 'Backspace' && event.key !== 'Delete') return null

    const prevElem = SlateElement.previousElement(editor)
    if (prevElem?.type == 'h1' && prevElem.children?.[0]?.text.trim() === '') {
      return event.preventDefault()
    }

    if (
      SlateElement.isMatch(editor, 'h1') &&
      SlateElement.isEmptyText(editor)
    ) {
      return event.preventDefault()
    }
  },
}
