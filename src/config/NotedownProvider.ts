import * as vscode from 'vscode'

import { APIMessage } from '../type'
import { getHtmlForWebview, updateTextDocument } from './utils'

export class NotedownProvider implements vscode.CustomTextEditorProvider {
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
        type: 'update',
        text: document.getText(),
      })

      webviewPanel.webview.postMessage({
        type: 'title',
        text: document.fileName,
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
    webviewPanel.webview.onDidReceiveMessage((event: APIMessage) => {
      console.log({ event, from: 'web' })
      switch (event.type) {
        case 'save':
          updateTextDocument(document, event.payload)
          return
      }
    })

    updateWebview()
  }
}
