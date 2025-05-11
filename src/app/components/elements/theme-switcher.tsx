import { cn } from '@/utils/cn'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { themes, useSetting } from '@/hooks/use-setting'

import { Button } from '../ui/button'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useSetting()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="p-1 rounded-full border-muted hover:shadow-sm transition"
        >
          <div
            className="w-5 h-5 rounded-full transition"
            style={{
              backgroundColor: themes.find((item) => item.id === theme)
                ?.hexColor,
            }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          'flex flex-col gap-2 p-2',
          'bg-white shadow-lg rounded-xl',
          'min-w-[50px] w-[50px]',
        )}
      >
        {themes.map((theme, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => setTheme(theme.id)}
            className="w-6 h-6 rounded-full transition transform hover:scale-110 border"
            style={{ backgroundColor: theme.hexColor }}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
