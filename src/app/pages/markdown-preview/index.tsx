import FrontMatter from '../../components/elements/front-matter'
import MarkdownViewer from '../../components/elements/markdown-viewer'

export default function Page() {
  return (
    <section className="flex w-full h-full">
      <FrontMatter />
      <MarkdownViewer />
    </section>
  )
}
