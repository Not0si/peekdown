import { create } from 'zustand'

export const themes = [
  { id: 'ash', label: 'Ash', hexColor: '#323339' },
  { id: 'dark', label: 'Dark', hexColor: '#1d1d21' },
  { id: 'vscode', label: 'Light', hexColor: '#292d3e' },
  { id: 'light', label: 'Light', hexColor: '#ffffff' },
] as const

type Theme = (typeof themes)[number]['id']

interface App {
  accentColor: string
  palettes: string[]
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useApp = create<App>((set, _get) => ({
  /**
   * Attributes
   */
  accentColor: '#2a9d8f',
  palettes: [],
  theme: 'vscode',

  /**
   * Methodes
   */

  setTheme: (theme: Theme) => {
    set({ theme: theme })

    document.documentElement.setAttribute('data-theme', theme)
  },
  /**
   * End
   */
}))
