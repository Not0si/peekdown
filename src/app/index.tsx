import { createRoot } from 'react-dom/client'

import App from './app'
import DefaultLayout from './components/layouts/default-layout'
import './global.css'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <DefaultLayout>
    <App />
  </DefaultLayout>,
)
