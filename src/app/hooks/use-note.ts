import { WebviewApi } from 'vscode-webview'
import { create } from 'zustand'

import { ChangeEvent } from 'react'

import { ExtensionNotification, WebviewNotification } from '../../global'
import { debouncedParse, parseMarkdown } from '../utils/markdown'

interface DocumentInfo {
  fileName: string
  baseName: string
  extension: string
  directory: string
}

interface Note {
  vscode: WebviewApi<WebviewNotification>
  postMessage: (message: WebviewNotification) => void
  onExtensionEvent: (
    event: MessageEvent<ExtensionNotification>,
  ) => Promise<void>
  isLoading: boolean
  documentInfo: DocumentInfo | undefined
  content: string | undefined
  htmlContent: string | undefined
  frontmatter: Record<string, any> | null
  markdown: string | undefined
  setMarkdown: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const useNote = create<Note>((set, get) => ({
  vscode: acquireVsCodeApi<WebviewNotification>(),
  isLoading: true,
  documentInfo: undefined,
  content: undefined,
  frontmatter: null,
  htmlContent: undefined,
  markdown: undefined,

  //

  postMessage: (message) => {
    const vscode = get().vscode
    vscode.postMessage(message)
  },

  onExtensionEvent: async (event) => {
    const { type, payload } = event.data

    switch (type) {
      case 'title': {
        const data = JSON.parse(payload) as Omit<DocumentInfo, 'fileName'>
        set({
          documentInfo: {
            ...data,
            fileName: data.baseName.replace(data.extension, ''),
          },
        })
        break
      }

      case 'content': {
        const result = await parseMarkdown(payload)

        set({
          content: result.content,
          frontmatter: result.frontmatter,
          htmlContent: result.htmlContent,
          isLoading: false,
          markdown: payload,
        })
        break
      }

      default:
        break
    }
  },

  setMarkdown: (event) => {
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
