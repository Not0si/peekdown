import fm from 'front-matter'
import debounce from 'lodash.debounce'
import { RendererObject, Tokens, marked } from 'marked'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import { Node } from 'slate'

export const deserializeMarkdown = (markdown: string): Node[] => {
  const tokens = marked.lexer(markdown)

  const nodes: Node[] = []

  for (const token of tokens) {
    console.log({ token })
    // if (token.type === 'heading') {
    //   nodes.push({
    //     type: 'heading',
    //     level: token.depth,
    //     children: [{ text: token.text }],
    //   })
    // } else if (token.type === 'paragraph') {
    //   nodes.push({
    //     type: 'paragraph',
    //     children: [{ text: token.text }],
    //   })
    // } else if (token.type === 'text') {
    //   nodes.push({
    //     type: 'paragraph',
    //     children: [{ text: token.text }],
    //   })
    // } else if (token.type === 'list') {
    //   nodes.push({
    //     type: 'list',
    //     ordered: token.ordered,
    //     children: token.items.map((item) => ({
    //       type: 'list-item',
    //       children: [{ text: item.text }],
    //     })),
    //   })
    // }
    // Add more token types as needed
  }

  return nodes.length > 0 ? nodes : []
}

/**
 * Represents the result of parsing a markdown string.
 *
 * @property frontmatter - An object containing the parsed YAML frontmatter, or `null` if not present or invalid.
 * @property content - The remaining markdown content after the frontmatter has been removed.
 */
export interface ParsedMarkdown {
  frontmatter: Record<string, any> | null
  content: string
  htmlContent: string
}

/**
 * Parses a markdown string and extracts optional YAML frontmatter and the content.
 *
 * @param markdown - The markdown string to parse.
 * @returns An object containing the parsed frontmatter and the markdown content.
 *
 * @example
 * const md = `---
 * title: Hello
 * tags:
 *   - intro
 * ---
 * # Welcome`
 *
 * const result = parseMarkdown(md)
 * // result.frontmatter => { title: "Hello", tags: ["intro"] }
 * // result.content => "# Welcome"
 */
export async function parseMarkdown(markdown: string): Promise<ParsedMarkdown> {
  const { attributes, body } = fm<Record<string, any>>(markdown)

  const highlighter = await createHighlighterCore({
    themes: [import('@shikijs/themes/vitesse-light')],
    langs: [
      import('@shikijs/langs/javascript'),
      import('@shikijs/langs/css'),
      import('@shikijs/langs/bash'),
    ],
    engine: createOnigurumaEngine(() => import('shiki/wasm')),
  })

  const renderer: RendererObject = {
    code: ({ text, lang }: Tokens.Code) => {
      const html = highlighter.codeToHtml(text, {
        lang: lang as any,
        theme: 'vitesse-light',
      })

      return html
    },
  }

  marked.use({ renderer })

  const htmlContent = await marked(body, { breaks: true })

  return {
    frontmatter: attributes,
    content: body,
    htmlContent,
  }
}

export const debouncedParse = debounce(
  async (payload: string, call: (result: ParsedMarkdown) => void) => {
    const result = await parseMarkdown(payload)

    call(result)
  },
  300,
)
