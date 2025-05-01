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
