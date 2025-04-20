import * as vscode from 'vscode'

export default class NotedownProvider
  implements vscode.CustomTextEditorProvider
{
  private static readonly viewType = 'notedown.editor'

  constructor(private readonly context: vscode.ExtensionContext) {}

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new NotedownProvider(context)
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      NotedownProvider.viewType,
      provider
    )

    return providerRegistration
  }

  resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Thenable<void> | void {
    const html = this.getHtmlForWebview(
      webviewPanel.webview,
      document.getText()
    )

    webviewPanel.webview.options = {
      enableScripts: true,
    }
    webviewPanel.webview.html = html
  }

  /**
   * Get the static html used for the editor webviews.
   */
  private getHtmlForWebview(webview: vscode.Webview, content: string): string {
    let scriptSrc = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        'web-view',
        'dist',
        'assets',
        'index.js'
      )
    )

    let cssSrc = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        'web-view',
        'dist',
        'assets',
        'index.css'
      )
    )

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">

        <!--
				Use a content security policy to only allow loading images from https or from our extension directory,
				and only allow scripts that have a specific nonce.
				-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="${cssSrc}" />
      
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <script src="${scriptSrc}"></script>
      </body>
    </html>`
  }

  //
}
