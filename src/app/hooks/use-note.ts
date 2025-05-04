import debounce from 'lodash.debounce'
import { WebviewApi } from 'vscode-webview'
import { create } from 'zustand'

import { ChangeEvent } from 'react'

import { ExtensionNotification, WebviewNotification } from '../../global'
import { ParsedMarkdown, parseMarkdown } from '../utils'

interface Note {
  vscode: WebviewApi<WebviewNotification>
  postMessage: (message: WebviewNotification) => void
  onExtensionEvent: (event: MessageEvent<ExtensionNotification>) => void
  isLoading: boolean
  metadata:
    | {
        baseName: string
        extension: string
        directory: string
      }
    | undefined
  content: string | undefined
  htmlContent: string | undefined
  frontmatter: Record<string, any> | null
  markdown: string | undefined
  setMarkdown: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const useNote = create<Note>((set, get) => ({
  vscode: acquireVsCodeApi<WebviewNotification>(),
  isLoading: true,
  metadata: undefined,
  content: undefined,
  frontmatter: null,
  htmlContent: undefined,
  markdown: undefined,

  //

  postMessage: (message) => {
    const vscode = get().vscode
    vscode.postMessage(message)
  },

  onExtensionEvent: (event: MessageEvent<ExtensionNotification>) => {
    const { type, payload } = event.data

    switch (type) {
      case 'title':
        set({ metadata: JSON.parse(payload) })
        break

      case 'content':
        parseMarkdown(payload)
          .then((result) => {
            set({
              content: result.content,
              frontmatter: result.frontmatter,
              htmlContent: result.htmlContent,
              isLoading: false,
              markdown: payload,
            })
          })
          .catch(() => {
            // Optionally handle the error
            set({ isLoading: false })
          })
        break

      default:
        break
    }
  },

  setMarkdown: (event: ChangeEvent<HTMLTextAreaElement>) => {
    const payload = event.target.value ?? ''
    set({ markdown: payload })

    debouncedParse(payload, (result) => {
      set({
        frontmatter: result.frontmatter,
        htmlContent: result.htmlContent,
      })
    })
  },

  //
}))

export const debouncedParse = debounce(
  async (payload: string, call: (result: ParsedMarkdown) => void) => {
    const result = await parseMarkdown(payload)
    call(result)
  },
  300,
)
