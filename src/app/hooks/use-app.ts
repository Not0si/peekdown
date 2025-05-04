import { create } from 'zustand'

export const themes = [
  { id: 'dark-green', label: 'Dark Green', hexColor: '#006400' },
  { id: 'dark-orange', label: 'Dark Orange', hexColor: '#FF8C00' },
  { id: 'light-blue', label: 'Light Blue', hexColor: '#ADD8E6' },
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
  theme: 'light-blue',

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
