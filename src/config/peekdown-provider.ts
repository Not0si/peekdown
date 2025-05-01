import * as path from 'path'
import * as vscode from 'vscode'

import { WebviewNotification } from './type'

export class PeekdownProvider implements vscode.CustomTextEditorProvider {
  private static readonly viewType = 'peekdown.editor'

  constructor(private readonly context: vscode.ExtensionContext) {}

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new PeekdownProvider(context)
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      PeekdownProvider.viewType,
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
    // Set webview config options
    webviewPanel.webview.options = {
      enableScripts: true,
    }

    // render initial html
    webviewPanel.webview.html = getHtmlForWebview(
      webviewPanel.webview,
      this.context,
    )

    // Send messages to the webview
    const updateWebview = () => {
      webviewPanel.webview.postMessage({
        type: 'content',
        payload: document.getText(),
      })

      webviewPanel.webview.postMessage({
        type: 'title',
        payload: JSON.stringify({
          baseName: path.basename(document.fileName),
          extension: path.extname(document.fileName),
          directory: path.dirname(document.fileName),
        }),
      })
    }

    // const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(
    //   (e) => {
    //     if (e.document.uri.toString() === document.uri.toString()) {
    //       updateWebview()
    //     }
    //   },
    // )

    // webviewPanel.onDidDispose(() => {
    //   changeDocumentSubscription.dispose()
    // })

    // Handle messages from the webview
    webviewPanel.webview.onDidReceiveMessage((event: WebviewNotification) => {
      switch (event.type) {
        case 'mount':
          updateWebview()
          break
        case 'save':
          updateTextDocument(document, event.payload)
          return
      }
    })
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

function getHtmlForWebview(
  webview: vscode.Webview,
  context: vscode.ExtensionContext,
): string {
  const nonce = getNonce() // you need a nonce too (will show you below)

  let scriptUri = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'dist', 'app', 'index.js'),
  )

  let styleUri = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'dist', 'app', 'index.css'),
  )

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
         <link href=${styleUri} rel="stylesheet">
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

function updateTextDocument(document: vscode.TextDocument, text: string) {
  const edit = new vscode.WorkspaceEdit()

  // Replace the entire document
  edit.replace(
    document.uri,
    new vscode.Range(0, 0, document.lineCount, 0),
    text,
  )

  vscode.workspace.applyEdit(edit)
}
