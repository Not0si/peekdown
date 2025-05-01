import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './components/ui/resizable'
import MarkdownEditor from './pages/markdown-editor'
import MarkdownPreview from './pages/markdown-preview'

export default function App() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={25}>
        <MarkdownEditor />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <MarkdownPreview />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
