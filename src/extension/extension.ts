// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(NotedownProvider.register(context))
}

// This method is called when your extension is deactivated
export function deactivate() {}

class NotedownProvider implements vscode.CustomTextEditorProvider {
  private static readonly viewType = 'notedown.editor'

  constructor(private readonly context: vscode.ExtensionContext) {}

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new NotedownProvider(context)
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      NotedownProvider.viewType,
      provider,
      {
        webviewOptions: { retainContextWhenHidden: true },
      },
    )

    return providerRegistration
  }

  resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken,
  ): void {
    const html = this.getHtmlForWebview(
      webviewPanel.webview,
      document.getText(),
    )

    webviewPanel.webview.options = {
      enableScripts: true,
    }

    webviewPanel.webview.html = html

    const updateWebview = () => {
      webviewPanel.webview.postMessage({
        type: 'update',
        text: document.getText(),
      })
    }

    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(
      (e) => {
        if (e.document.uri.toString() === document.uri.toString()) {
          updateWebview()
        }
      },
    )

    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose()
    })

    webviewPanel.webview.onDidReceiveMessage((e) => {
      switch (e.type) {
        case 'save':
          this.updateTextDocument(document, e.content)
          return
      }
    })

    updateWebview()
  }

  /**
   * Get the static html used for the editor webviews.
   */
  private getHtmlForWebview(webview: vscode.Webview, content: string): string {
    const nonce = getNonce() // you need a nonce too (will show you below)

    let scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'dist', 'app', 'index.js'),
    )

    // let cssSrc = webview.asWebviewUri(
    //   vscode.Uri.joinPath(
    //     this.context.extensionUri,
    //     'web-view',
    //     'dist',
    //     'assets',
    //     'index.css',
    //   ),
    // )

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
        
        <title>Notedown Editor</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
    </html>
  `
  }

  private updateTextDocument(document: vscode.TextDocument, text: string) {
    const edit = new vscode.WorkspaceEdit()

    // Replace the entire document
    edit.replace(
      document.uri,
      new vscode.Range(0, 0, document.lineCount, 0),
      text,
    )

    vscode.workspace.applyEdit(edit)
  }
}

function getNonce() {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
