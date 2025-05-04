import SplitPane from './components/ui/split-pane'
import MarkdownEditor from './pages/markdown-editor'
import MarkdownPreview from './pages/markdown-preview'

export default function App() {
  return (
    <SplitPane defaultWidth="44%" minWidth="200px" maxWidth="80%">
      <SplitPane.Left className="h-full mr-2">
        <MarkdownEditor />
      </SplitPane.Left>
      <SplitPane.Right className="h-full">
        <MarkdownPreview />
      </SplitPane.Right>
    </SplitPane>
  )
}
