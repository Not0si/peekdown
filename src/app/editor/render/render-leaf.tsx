import { RenderLeafProps } from 'slate-react'

export default function RenderLeaf({
  attributes,
  children,
  leaf,
}: RenderLeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.strikeThrough) {
    children = <s>{children}</s>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return (
    <span
      {...attributes}
      style={{
        backgroundColor: leaf.highlight ? '#ffeeba' : undefined,
      }}
    >
      {children}
    </span>
  )
}
