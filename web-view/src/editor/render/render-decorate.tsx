import { NodeEntry } from 'slate'
import { Path } from 'slate'
import { Text } from 'slate'

import { CustomElement, IRange } from '../editor-types'

interface IDecorateProps {
  entry: NodeEntry
  search?: string
}

const decorate = ({ entry, search }: IDecorateProps): IRange[] => {
  const ranges: IRange[] = []
  const node: CustomElement = entry[0] as CustomElement
  const path: Path = entry[1]

  if (
    search &&
    Array.isArray(node.children) &&
    node.children.every(Text.isText)
  ) {
    const texts = node.children.map((item) => item.text)
    const str = texts.join('')
    const length = search.length
    let start = str.indexOf(search)
    let index = 0
    let iterated = 0
    while (start !== -1) {
      // Skip already iterated strings
      while (index < texts.length && start >= iterated + texts[index].length) {
        iterated = iterated + texts[index].length
        index++
      }
      // Find the index of array and relative position
      let offset = start - iterated
      let remaining = length
      while (index < texts.length && remaining > 0) {
        const currentText = texts[index]
        const currentPath = [...path, index]
        const taken = Math.min(remaining, currentText.length - offset)

        ranges.push({
          anchor: { path: currentPath, offset },
          focus: { path: currentPath, offset: offset + taken },
          highlight: true,
        })

        remaining = remaining - taken

        if (remaining > 0) {
          iterated = iterated + currentText.length
          // Next block will be indexed from 0
          offset = 0
          index++
        }
      }
      // Looking for next search block
      start = str.indexOf(search, start + search.length)
    }
  }

  return ranges
}

export default decorate
