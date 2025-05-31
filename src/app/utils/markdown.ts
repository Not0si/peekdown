import fm from 'front-matter'
import debounce from 'lodash.debounce'
import { RendererObject, Tokens, marked } from 'marked'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

/**
 *
 *
 */
interface ParsedMarkdown {
  frontmatter: Record<string, any> | null
  content: string
  htmlContent: string
}

export async function parseMarkdown(markdown: string): Promise<ParsedMarkdown> {
  const { attributes, body } = fm<Record<string, any>>(markdown)

  const highlighter = await createHighlighterCore({
    themes: [
      import('@shikijs/themes/vitesse-light'),
      import('@shikijs/themes/vitesse-dark'),
      import('@shikijs/themes/catppuccin-frappe'),
      import('@shikijs/themes/github-light'),
      import('@shikijs/themes/dracula-soft'),
      import('@shikijs/themes/monokai'),
      import('@shikijs/themes/nord'),
      import('@shikijs/themes/one-dark-pro'),
      import('@shikijs/themes/ayu-dark'),
      import('@shikijs/themes/solarized-light'),
      import('@shikijs/themes/solarized-dark'),
      import('@shikijs/themes/night-owl'),
      import('@shikijs/themes/rose-pine'),
      import('@shikijs/themes/rose-pine-dawn'),
      import('@shikijs/themes/rose-pine-moon'),
      import('@shikijs/themes/poimandres'),
      import('@shikijs/themes/andromeeda'),
      import('@shikijs/themes/slack-dark'),
      import('@shikijs/themes/slack-ochin'),
      import('@shikijs/themes/kanagawa-wave'),
      import('@shikijs/themes/kanagawa-dragon'),
      import('@shikijs/themes/kanagawa-lotus'),
      import('@shikijs/themes/laserwave'),
      import('@shikijs/themes/red'),
      import('@shikijs/themes/houston'),
      import('@shikijs/themes/everforest-dark'),
      import('@shikijs/themes/everforest-light'),
      import('@shikijs/themes/dark-plus'),
      import('@shikijs/themes/light-plus'),
      import('@shikijs/themes/min-dark'),
      import('@shikijs/themes/min-light'),
    ],
    langs: [
      import('@shikijs/langs/javascript'),
      import('@shikijs/langs/typescript'),
      import('@shikijs/langs/css'),
      import('@shikijs/langs/html'),
      import('@shikijs/langs/json'),
      import('@shikijs/langs/markdown'),
      import('@shikijs/langs/python'),
      import('@shikijs/langs/bash'),
      import('@shikijs/langs/java'),
      import('@shikijs/langs/sql'),
      import('@shikijs/langs/xml'),
      import('@shikijs/langs/yaml'),
      import('@shikijs/langs/php'),
      import('@shikijs/langs/csharp'),
      import('@shikijs/langs/cpp'),
      import('@shikijs/langs/go'),
      import('@shikijs/langs/ruby'),
      import('@shikijs/langs/perl'),
      import('@shikijs/langs/lua'),
      import('@shikijs/langs/dart'),
      import('@shikijs/langs/swift'),
      import('@shikijs/langs/kotlin'),
      import('@shikijs/langs/rust'),
      import('@shikijs/langs/shell'),
      import('@shikijs/langs/scss'),
      import('@shikijs/langs/sass'),
      import('@shikijs/langs/less'),
      import('@shikijs/langs/ini'),
      import('@shikijs/langs/toml'),
      import('@shikijs/langs/r'),
      import('@shikijs/langs/latex'),
      import('@shikijs/langs/haskell'),
      import('@shikijs/langs/elixir'),
      import('@shikijs/langs/erlang'),
      import('@shikijs/langs/clojure'),
      import('@shikijs/langs/fsharp'),
      import('@shikijs/langs/objective-c'),
      import('@shikijs/langs/vb'),
      import('@shikijs/langs/awk'),
      import('@shikijs/langs/prolog'),
      import('@shikijs/langs/sql'),
      import('@shikijs/langs/nginx'),
      import('@shikijs/langs/powershell'),
      import('@shikijs/langs/d'),
      import('@shikijs/langs/coffeescript'),
      import('@shikijs/langs/julia'),
      import('@shikijs/langs/fish'),
      import('@shikijs/langs/haml'),
      import('@shikijs/langs/dockerfile'),
      import('@shikijs/langs/makefile'),
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

/**
 *
 *
 */
export const debouncedParse = debounce(
  async (payload: string, call: (result: ParsedMarkdown) => void) => {
    const result = await parseMarkdown(payload)

    call(result)
  },
  300,
)
