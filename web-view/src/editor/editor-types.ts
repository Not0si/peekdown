import { BundledLanguage, BundledTheme } from 'shiki'
import { BaseEditor, BaseRange } from 'slate'

import { KeyboardEvent } from 'react'
import { ReactEditor } from 'slate-react'

export type IEditor = BaseEditor & ReactEditor

export type IEditorKeyEvent = KeyboardEvent<HTMLDivElement>

export type ITextFormat = 'bold' | 'italic' | 'underline' | 'strikeThrough'
export type ITextAlign = 'ltr' | 'rtl' | 'center'

export type IElementTypes =
  | 'paragraph'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'quote'
  | 'code-block'
  | 'code-line'

export type IRange = BaseRange & {
  highlight?: boolean
}

export type CustomText = {
  text: string
  highlight?: boolean
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikeThrough?: boolean
}

export type ICodeLineElement = {
  type: 'code-line'
  category: 'advanced'
  children: CustomText[]
}

export type ICodeBlockElement = {
  type: 'code-block'
  category: 'advanced'
  children: ICodeLineElement[]
  language: BundledLanguage
  theme: BundledTheme
  backgroundColor?: string
  color?: string
  className?: string
}

type ITextElementParams = {
  category: 'text'
  dir?: 'ltr' | 'rtl' | 'center'
  fontFamily?: 'string'
}

export type IParagraphElement = ITextElementParams & {
  type: 'paragraph'
  children: CustomText[]
}

export type IH1Element = ITextElementParams & {
  type: 'h1'
  children: CustomText[]
}

export type IH2Element = ITextElementParams & {
  type: 'h2'
  children: CustomText[]
}

export type IH3Element = ITextElementParams & {
  type: 'h3'
  children: CustomText[]
}

export type IH4Element = ITextElementParams & {
  type: 'h4'
  children: CustomText[]
}

export type IH5Element = ITextElementParams & {
  type: 'h5'
  children: CustomText[]
}

export type IH6Element = ITextElementParams & {
  type: 'h6'
  children: CustomText[]
}

export type IQuoteElement = ITextElementParams & {
  type: 'quote'
  children: CustomText[]
}

export type ITextElements =
  | IParagraphElement
  | IH1Element
  | IH2Element
  | IH3Element
  | IH4Element
  | IH5Element
  | IH6Element
  | IQuoteElement

export type CustomElement =
  | IParagraphElement
  | IH1Element
  | IH2Element
  | IH3Element
  | IH4Element
  | IH5Element
  | IH6Element
  | IQuoteElement
  | ICodeBlockElement
  | ICodeLineElement
