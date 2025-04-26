import { useEffect } from 'react'

import './global.css'

export default function App() {
  useEffect(() => {
    window.addEventListener('message', (event: MessageEvent) => {
      // Object containing type prop and value prop
      console.log({ event })
    })
  }, [])

  return <div>Hello World</div>
}
