"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);

// src/notedown-provider.ts
var vscode = __toESM(require("vscode"));
var NotedownProvider = class _NotedownProvider {
  constructor(context) {
    this.context = context;
  }
  static viewType = "notedown.editor";
  static register(context) {
    const provider = new _NotedownProvider(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(
      _NotedownProvider.viewType,
      provider
    );
    return providerRegistration;
  }
  resolveCustomTextEditor(document, webviewPanel, _token) {
    const html = this.getHtmlForWebview(
      webviewPanel.webview,
      document.getText()
    );
    webviewPanel.webview.options = {
      enableScripts: true
    };
    webviewPanel.webview.html = html;
  }
  /**
   * Get the static html used for the editor webviews.
   */
  getHtmlForWebview(webview, content) {
    let scriptSrc = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "web-view",
        "dist",
        "assets",
        "index.js"
      )
    );
    let cssSrc = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "web-view",
        "dist",
        "assets",
        "index.css"
      )
    );
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
    </html>`;
  }
  //
};

// src/extension.ts
function activate(context) {
  context.subscriptions.push(NotedownProvider.register(context));
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
