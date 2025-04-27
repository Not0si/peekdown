import * as vscode from 'vscode'

export const getNonce = () => {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const getHtmlForWebview = (
  webview: vscode.Webview,
  context: vscode.ExtensionContext,
): string => {
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

export const updateTextDocument = (
  document: vscode.TextDocument,
  text: string,
) => {
  const edit = new vscode.WorkspaceEdit()

  // Replace the entire document
  edit.replace(
    document.uri,
    new vscode.Range(0, 0, document.lineCount, 0),
    text,
  )

  vscode.workspace.applyEdit(edit)
}
