import { Descendant } from 'slate'

export const getInitialValue = (): Descendant[] => {
  const content = localStorage.getItem('content')
  let initialValue: Descendant[] = JSON.parse(content ?? 'null')

  try {
    initialValue = JSON.parse(content ?? '')
  } catch (error) {
    initialValue = [
      {
        type: 'h1',
        category: 'text',
        children: [{ text: '' }],
      },
      {
        type: 'paragraph',
        category: 'text',
        children: [{ text: '' }],
      },
    ]
  }

  return initialValue
}
