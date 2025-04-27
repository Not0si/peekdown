import { WebviewApi } from 'vscode-webview'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'

import { APIMessage } from './../../type'

interface IAppContext {
  vscode: WebviewApi<APIMessage>
}

const AppContext = createContext<IAppContext | undefined>(undefined)

export function AppContextProvider({ children }: { children: ReactNode }) {
  const handleMessages = useCallback((event: MessageEvent) => {
    switch (event.data.type) {
      case 'update':
        console.log({ text: event.data.text })
        break

      default:
        console.log({ text: event.data.text })
    }
  }, [])

  const vscode = useMemo(() => acquireVsCodeApi<APIMessage>(), [])

  /**
   *
   *
   */
  useEffect(() => {
    vscode.postMessage({
      type: 'COMMON',
      payload: '🐛 Hello World',
    })
  }, [])

  useEffect(() => {
    window.addEventListener('message', handleMessages)

    return () => {
      window.removeEventListener('message', handleMessages)
    }
  }, [])

  return (
    <AppContext.Provider value={{ vscode }}>{children}</AppContext.Provider>
  )
}

export const useAppContext = (): IAppContext => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }

  return context
}
