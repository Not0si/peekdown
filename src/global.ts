export type WebviewNotification =
  | { type: 'mount' }
  | {
      type: 'save'
      payload: string
    }

export type ExtensionNotification =
  | {
      type: 'content'
      payload: string
    }
  | {
      type: 'title'
      payload: string
    }

/**
 *
 *
 *
 */

function getNonce() {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const nonce = getNonce()
