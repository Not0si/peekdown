import RootLayout from '@/components/layouts/root-layout'

import SplitPane from '../components/ui/split-pane'
import MarkdownEditor from './markdown-editor'
import MarkdownPreview from './markdown-preview'

export default function App() {
  return (
    <RootLayout>
      <RootLayout.Header>Hello</RootLayout.Header>
      <RootLayout.Content>
        <SplitPane defaultWidth="44%" minWidth="200px" maxWidth="80%">
          <SplitPane.Left>
            <MarkdownEditor />
          </SplitPane.Left>
          <SplitPane.Right>
            <MarkdownPreview />
          </SplitPane.Right>
        </SplitPane>
      </RootLayout.Content>
    </RootLayout>
  )
}
