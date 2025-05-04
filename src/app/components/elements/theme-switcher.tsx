import { useEffect, useRef, useState } from 'react'

import { themes, useApp } from '@/hooks/use-app'

import { cn } from '../../utils/cn'
import { Button } from '../ui/button'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useApp()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button variant="outline" size="xsicon" onClick={() => setOpen(!open)}>
        <div
          className={cn('w-full px-2 h-full bg-amber-600')}
          style={{
            background: themes.find((item) => item.id === theme)?.hexColor,
          }}
        />
      </Button>

      <div
        className={cn(
          'absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded shadow-lg transition-all duration-200 overflow-hidden',
          open ?
            'opacity-100 scale-100'
          : 'opacity-0 scale-95 pointer-events-none',
        )}
      >
        <div className="flex flex-col">
          {themes.map((theme, index) => {
            return (
              <Button
                key={index}
                variant="link"
                size="icon"
                onClick={() => {
                  setTheme(theme.id)
                  setOpen(false)
                }}
              >
                {theme.label}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
