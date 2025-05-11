import { cn } from '@/utils/cn'

import { FC, ReactNode } from 'react'

// Define the types for the compound component
type RootLayoutProps = {
  children: ReactNode
}

type LayoutComponent = FC<RootLayoutProps> & {
  Header: FC<RootLayoutProps>
  Content: FC<RootLayoutProps>
}

// Main layout component
const RootLayout: LayoutComponent = ({ children }) => {
  return <div>{children}</div>
}

// Header sub-component
const Header: FC<RootLayoutProps> = ({ children }) => {
  return (
    <header
      className={cn(
        'min-h-11 max-h-11 w-full bg-background p-2 rounded-[8px]',
        'border border-border-focus',
        'flex items-center',
      )}
    >
      {children}
    </header>
  )
}

// Content sub-component
const Content: FC<RootLayoutProps> = ({ children }) => {
  return (
    <main
      className={cn(
        'mt-2 rounded-[8px] border border-border-focus',
        'max-h-[calc(100vh-68px)] bg-muted overflow-hidden',
      )}
    >
      {children}
    </main>
  )
}

// Attach sub-components to RootLayout
RootLayout.Header = Header
RootLayout.Content = Content

export default RootLayout
