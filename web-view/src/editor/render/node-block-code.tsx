import { BundledLanguage, BundledTheme, codeToHtml } from 'shiki'
import { bundledLanguagesInfo, bundledThemesInfo } from 'shiki'
import { Node, Transforms } from 'slate'

import { RefObject } from 'react'
import { createContext, useContext, useEffect, useRef } from 'react'
import { ReactEditor, RenderElementProps, useSlateStatic } from 'slate-react'

import { ICodeBlockElement } from '../editor-types'

type CodeBlockAttr = {
  backgroundColor?: string
  color?: string
  className?: string
}

const extractPreAttributes = (htmlString: string): CodeBlockAttr => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  // Find the <pre> element
  const preElement = doc.querySelector('pre')

  if (!preElement) {
    return {
      backgroundColor: undefined,
      color: undefined,
      className: undefined,
    }
  }

  // Extract the class and style attributes
  const classAttr = preElement.getAttribute('class') || ''

  let backgroundColor: string | undefined
  let color: string | undefined

  const styleAttr = preElement.getAttribute('style') || ''

  // Convert style string to individual properties
  styleAttr
    .split(';')
    .filter((style) => style.trim().length > 0)
    .forEach((style) => {
      const [property, value] = style.split(':').map((s) => s.trim())
      if (property && value) {
        if (property === 'background-color') {
          backgroundColor = value
        } else if (property === 'color') {
          color = value
        }
      }
    })

  return {
    className: classAttr || undefined,
    backgroundColor,
    color,
  }
}

interface ICodeBlockStyle {
  lang: BundledLanguage
  theme: BundledTheme
}

export const getCodeBlockStyle = async ({
  lang = 'javascript',
  theme = 'min-light',
}: ICodeBlockStyle): Promise<CodeBlockAttr> => {
  try {
    const generatedHtml = await codeToHtml('', {
      lang,
      theme,
    })

    return extractPreAttributes(generatedHtml)
  } catch (error) {
    console.error('Error generating HTML:', error)

    return extractPreAttributes('')
  }
}

interface IGenerateHtml {
  code: string
  lang: BundledLanguage
  theme: BundledTheme
  ref: RefObject<HTMLDivElement>
}

const extractLineSpans = (htmlString: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  // Query all span elements with the class 'line'
  const lineSpans = doc.querySelectorAll('span.line')

  // Convert NodeList to an array and join the outerHTML of each span into a single string
  return Array.from(lineSpans)
    .map((span) => span.outerHTML)
    .join('')
}

const generateHtml = async ({
  code,
  lang = 'javascript',
  theme = 'min-light',
  ref,
}: IGenerateHtml) => {
  try {
    const generatedHtml = await codeToHtml(code, {
      lang,
      theme,
    })

    if (ref.current) {
      // ref.current.innerHTML = generatedHtml
      ref.current.innerHTML = extractLineSpans(generatedHtml)
    }
  } catch (error) {
    console.error('Error generating HTML:', error)
  }
}

const CodeBlockContext = createContext<ICodeBlockElement | null>(null)

export const themes = bundledThemesInfo.map((theme) => {
  return { id: theme.id, label: theme.displayName }
})

export const languages = bundledLanguagesInfo.map((language) => {
  return { id: language.id, label: language.name }
})

export const extractCustomCodeText = (
  codeBlockElement: ICodeBlockElement,
): string[] => {
  const result: string[] = []

  for (const codeLine of codeBlockElement.children) {
    for (const customCodeText of codeLine.children) {
      result.push(customCodeText.text)
    }
  }

  return result
}

export function NodeBlockCode({ children, element }: RenderElementProps) {
  const editor = useSlateStatic()

  const setSettings = (
    language: BundledLanguage,
    theme: BundledTheme,
    backgroundColor?: string,
    color?: string,
    className?: string,
  ) => {
    const path = ReactEditor.findPath(editor, element)

    Transforms.setNodes(
      editor,
      { language, theme, backgroundColor, color, className },
      { at: path },
    )
  }

  const fetchStyle = async (
    language?: BundledLanguage,
    theme?: BundledTheme,
  ) => {
    const { className, color, backgroundColor } = await getCodeBlockStyle({
      lang: language ?? (element as ICodeBlockElement).language,
      theme: theme ?? (element as ICodeBlockElement).theme,
    })

    setSettings(
      language ?? (element as ICodeBlockElement).language,
      theme ?? (element as ICodeBlockElement).theme,
      backgroundColor,
      color,
      className,
    )
  }

  useEffect(() => {
    fetchStyle()
  }, [])

  return (
    <CodeBlockContext.Provider value={element as ICodeBlockElement}>
      <div
        // className={styles.codeBlock}
        style={{
          backgroundColor: (element as ICodeBlockElement)?.backgroundColor,
          color: (element as ICodeBlockElement)?.color,
        }}
      >
        {/* <header
          {...attributes}
          contentEditable={false}
          className={styles.codeBlockHeader}
          style={{ color: (element as ICodeBlockElement)?.color }}
        >
          <Combobox
            value={(element as ICodeBlockElement).language}
            onSelect={(value) => fetchStyle(value as BundledLanguage)}
            options={languages}
            buttonProps={{
              style: {
                background: 'transparent',
                color: (element as ICodeBlockElement).color,
                border: 'none',
                padding: '4px 0px',
                gap: '2px',
              },
            }}
          />
          <Combobox
            value={(element as ICodeBlockElement).theme}
            onSelect={(value) => fetchStyle(undefined, value as BundledTheme)}
            options={themes}
            buttonProps={{
              style: {
                background: 'transparent',
                color: (element as ICodeBlockElement).color,
                border: 'none',
                padding: '4px 0px',
                gap: '2px',
              },
            }}
          />

          <button
            style={{
              borderColor: (element as ICodeBlockElement).color,
              color: (element as ICodeBlockElement).color,
            }}
            onClick={() => {
              const lines: string[] = extractCustomCodeText(
                element as ICodeBlockElement,
              )

              const codeString: string = lines.join('\n')

              navigator.clipboard.writeText(codeString)
            }}
            
          >
          
          </button>
        </header> */}
        <pre
          // className={styles.codeBlockPre}
          style={{ caretColor: (element as ICodeBlockElement)?.color }}
        >
          <code>{children}</code>
        </pre>
      </div>
    </CodeBlockContext.Provider>
  )
}

export function NodeLineCode({
  children,
  attributes,
  element,
}: RenderElementProps) {
  const parentElement = useContext(CodeBlockContext) as ICodeBlockElement
  const lineRef = useRef<HTMLDivElement>(null)
  const editor = useSlateStatic()

  useEffect(() => {
    const nodeText = Node.string(element)

    generateHtml({
      code: nodeText ?? '',
      lang: parentElement.language,
      theme: parentElement.theme,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: lineRef as any,
    })
  }, [element, editor, parentElement])

  return (
    <div
      style={{ position: 'relative' }}
      // className={styles.codeLine}
      {...attributes}
    >
      <div ref={lineRef} contentEditable={false} />
      {children}
    </div>
  )
}
