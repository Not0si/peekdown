import { createRoot } from 'react-dom/client'

import DefaultLayout from '@/components/layouts/default-layout'

import './global.css'
import Pages from './pages'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <DefaultLayout>
    <Pages />
  </DefaultLayout>,
)
