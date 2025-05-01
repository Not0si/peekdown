import { create } from 'zustand'

interface App {
  accentColor: string
  palettes: string[]
  theme: 'dark' | 'light'
}

export const useApp = create<App>((_set, _get) => ({
  /**
   * Attributes
   */
  accentColor: '#2a9d8f',
  palettes: [],
  theme: 'light',

  /**
   * Methodes
   */

  /**
   * End
   */
}))
