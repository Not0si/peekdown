import React, { useEffect, useRef, useState } from 'react'

import { cn } from '../../utils/cn'

interface SplitPaneProps {
  children: React.ReactNode
  defaultWidth?: number | string
  minWidth?: number | string
  maxWidth?: number | string
}

interface PaneProps {
  children: React.ReactNode
  className?: string
}

const SplitPane: React.FC<SplitPaneProps> & {
  Left: React.FC<PaneProps>
  Right: React.FC<PaneProps>
} = ({
  children,
  defaultWidth = '50%',
  minWidth = '100px',
  maxWidth = '90%',
}) => {
  const [leftWidth, setLeftWidth] = useState<string | number>(defaultWidth)
  const [isDragging, setIsDragging] = useState(false)
  const splitPaneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !splitPaneRef.current) return

      const containerRect = splitPaneRef.current.getBoundingClientRect()
      const containerLeft = containerRect.left
      const containerWidth = containerRect.width

      let newLeftWidth = ((e.clientX - containerLeft) / containerWidth) * 100

      // Apply min/max constraints
      if (typeof minWidth === 'string' && minWidth.endsWith('%')) {
        const minPercent = parseFloat(minWidth)
        newLeftWidth = Math.max(newLeftWidth, minPercent)
      } else if (typeof minWidth === 'number') {
        const minPixels = (minWidth / containerWidth) * 100
        newLeftWidth = Math.max(newLeftWidth, minPixels)
      }

      if (typeof maxWidth === 'string' && maxWidth.endsWith('%')) {
        const maxPercent = parseFloat(maxWidth)
        newLeftWidth = Math.min(newLeftWidth, maxPercent)
      } else if (typeof maxWidth === 'number') {
        const maxPixels = (maxWidth / containerWidth) * 100
        newLeftWidth = Math.min(newLeftWidth, maxPixels)
      }

      setLeftWidth(`${newLeftWidth}%`)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, minWidth, maxWidth])

  const childrenArray = React.Children.toArray(children)
  const leftPane = childrenArray.find((child) => (child as any).type === Left)
  const rightPane = childrenArray.find((child) => (child as any).type === Right)

  return (
    <div
      ref={splitPaneRef}
      className="split-pane"
      style={{ display: 'flex', height: '100%', position: 'relative' }}
    >
      <div className="left-pane" style={{ width: leftWidth, overflow: 'auto' }}>
        {leftPane}
      </div>
      <div
        className="gutter bg-background select-none hover:bg-blue-600/40"
        style={{
          width: '4px',
          cursor: 'col-resize',
        }}
        onMouseDown={() => setIsDragging(true)}
      />
      <div className="right-pane" style={{ flex: 1, overflow: 'auto' }}>
        {rightPane}
      </div>
    </div>
  )
}

const Left: React.FC<PaneProps> = ({ children, className }) => {
  return <div className={cn('left-pane-content', className)}>{children}</div>
}

const Right: React.FC<PaneProps> = ({ children, className }) => {
  return <div className={cn('right-pane-content', className)}>{children}</div>
}

SplitPane.Left = Left
SplitPane.Right = Right

export default SplitPane
