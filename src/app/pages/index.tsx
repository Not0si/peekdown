import AppSettings from '@/components/elements/app-settings'
import RootLayout from '@/components/layouts/root-layout'

import { useNote } from '@/hooks/use-note'

import SplitPane from '../components/ui/split-pane'
import MarkdownEditor from './markdown-editor'
import MarkdownPreview from './markdown-preview'

export default function Pages() {
  const { documentInfo } = useNote()

  return (
    <RootLayout>
      <RootLayout.Header>
        <h1 className="text-foreground">
          {documentInfo?.fileName ?? 'Uknown'}
        </h1>
        <AppSettings />
      </RootLayout.Header>
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
