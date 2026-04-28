---
title: "Creating a VS Code editor extension"
slug: "resx-editor-for-visual-studio-code"
pubDate: 2023-06-30T00:52:27.000Z
lastModified: 2023-06-30T00:52:27.000Z
description: "I created a resx editor to learn how to write VS Code custom editor extensions. Check it out and the code."
categories:
  - "vscode"
  - "dotnet"
  - "tools"
  - "developer"
draft: false
---

<p>As I’ve been <a href="https://aka.ms/vs/csdevkit-launch">working more with Visual Studio Code</a> lately, I wanted to explore more about the developer experience and some of the more challenging areas around customization.&#160; VS Code has a great extensibility model and a TON of UI points for you to integrate.&#160; In the C# Dev Kit we’ve not yet had the need to introduce any custom UI in any views or other experiences that are ‘pixels’ on the screen for the user…pretty awesome extensibility. One area that doesn’t have default UI is the non-text editors. Something that you want to do fully custom in the editor space. For me, I wanted to see what this experience was so I went out to create a small custom editor. I chose to create a ResX editor for the simplest case as ResX is a known-schema based structure that could easily be serialized/de-serialized as needed.</p>  <p>NOTE: This is not an original idea. There are existing extensions that do ResX editing in different ways. With nearly every project that I set out with, it starts as a learning/selfish reasons…and also selfish scope. Some of the existing ones had expanded features I felt unnecessary and I wanted a simple structure. They are all interesting and you should check them out. I’m no way claiming to be ‘best’ or first-mover here, just sharing my learning path.</p>  <p>With that said, I’m pleased with what I learned and the result, which is an editor that ‘fits in’ with the VS Code UX and achieves my CRUD goal of editing a ResX file:</p>  <p><img title="Screenshot of ResX Editor and Viewer" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of ResX Editor and Viewer" src="https://storage2.timheuer.com/finalscreenshot.png" width="1659" height="683" /></p>  <p>With that, here’s what I’ve learned a bit…</p>  <h2>Custom Editors and UI</h2>  <p>There are a lot of warnings in the <a href="https://code.visualstudio.com/api/extension-guides/custom-editors">Custom Editor API docs</a> of making sure you <em>really</em> need a custom editor, but point to the value of what they can provide for previewing/WYSIWYG renderings of documents. But they point to the fact that you will likely be using a webview and thus be fully responsible for your UI.&#160; In the end you are owning the UI that you are drawing. For me, I’m not a UI designer, so I rely on others/toolkits to do a lot of heavy lifting. The examples I saw out there (and oddly enough the custom editor sample) don’t match the VS Code UX at all and I didn’t like that. I actually found it odd that the sample took such an extreme approach to the editor (cat paw drawings) rather than show a more realistic data-focused scenario on a known file format.</p>  <p>Luckily the team provides the <strong><a href="https://github.com/microsoft/vscode-webview-ui-toolkit">Webview UI Toolkit for Visual Studio</a></strong>, a set of components that match the UX of VS Code and adhere to the theming and interaction models. It’s excellent and <strong>anyone doing custom UI in VS Code extensions should start using this immediately</strong>. Your extension will feel way more professional and at home in the standard VS Code UX.&#160; My needs were fairly simple and I wanted to show the ResX (which is XML format) in a tabular format. The toolkit has a data-grid that was perfect for the job…mostly. But let’s start with the structure.</p>  <p>Most of the editor is in a provider (per the docs) and that’s where you implement a CustomTextEditorProvider which provides a register and resolveCustomTextEditor commands. Register does what you think, register’s your editor into the ecosystem, using the metadata from package.json about what file types/languages will trigger your editor.&#160; Resolve is where you start providing your content. It provides you with a Webview panel where you put your initial content. Mine was a simple grid:</p>  <pre class="brush: ts;">private _getWebviewContent(webview: vscode.Webview) {
  const webviewUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'out', 'webview.js'));
  const nonce = getNonce();
  const codiconsUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'codicon.css'));
  const codiconsFont = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'codicon.ttf'));

  return /*html*/ `
            &lt;!DOCTYPE html&gt;
            &lt;html lang=&quot;en&quot;&gt;
              &lt;head&gt;
                &lt;meta charset=&quot;UTF-8&quot;&gt;
                &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
                &lt;meta
                  http-equiv=&quot;Content-Security-Policy&quot;
                  content=&quot;default-src 'none'; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}'; style-src ${webview.cspSource} 'nonce-${nonce}'; style-src-elem ${webview.cspSource} 'unsafe-inline'; font-src ${webview.cspSource};&quot;
                /&gt;
                &lt;link href=&quot;${codiconsUri}&quot; rel=&quot;stylesheet&quot; nonce=&quot;${nonce}&quot;&gt;
              &lt;/head&gt;
              &lt;body&gt;
                &lt;vscode-data-grid id=&quot;resource-table&quot; aria-label=&quot;Basic&quot; generate-header=&quot;sticky&quot; aria-label=&quot;Sticky Header&quot;&gt;&lt;/vscode-data-grid&gt;
                &lt;vscode-button id=&quot;add-resource-button&quot;&gt;
                  Add New Resource
                  &lt;span slot=&quot;start&quot; class=&quot;codicon codicon-add&quot;&gt;&lt;/span&gt;
                &lt;/vscode-button&gt;
                &lt;script type=&quot;module&quot; nonce=&quot;${nonce}&quot; src=&quot;${webviewUri}&quot;&gt;&lt;/script&gt;
              &lt;/body&gt;
            &lt;/html&gt;
          `;
}
}
</pre>

<p>This serves as the HTML ‘shell’ and then the actual interaction is via the webview.js you see being included. Some special things here or just how it includes the correct link to the js/css files I need but also notice the Content-Security-Policy. That was interesting to get right initially but it’s a recommendation solid meta tag to include (otherwise console will spit out warnings to anyone looking).&#160; The webview.js is basically any JavaScript I needed to interact with my editor. Specifically this uses the registration of the Webview UI Toolkit and converts the resx to json and back (using the <a href="https://www.npmjs.com/package/resx">npm library resx</a>). Here’s a snippet of that code in the custom editor provider that basically updates the document to JSON format as it changes:</p>

<pre class="brush: ts;">private async updateTextDocument(document: vscode.TextDocument, json: any) {

  const edit = new vscode.WorkspaceEdit();

  edit.replace(
    document.uri,
    new vscode.Range(0, 0, document.lineCount, 0),
    await resx.js2resx(JSON.parse(json)));
  return vscode.workspace.applyEdit(edit);
}
</pre>

<p>So that gets the essence of the ‘bones’ of the editor that I needed. Once I had the data then a function in the webview.js can ‘bind’ the data to the vscode-data-grid supplying the column names + data easily and just set as the data rows quickly (lines 20,21):</p>

<pre class="brush: ts; highlight: [20,21];">function updateContent(/** @type {string} **/ text) {
    if (text) {

        var resxValues = [];

        let json;
        try {
            json = JSON.parse(text);
        }
        catch
        {
            console.log(&quot;error parsing json&quot;);
            return;
        }

        for (const node in json || []) {
            if (node) {
                let res = json[node];
                // eslint-disable-next-line @typescript-eslint/naming-convention
                var item = { Key: node, &quot;Value&quot;: res.value || '', &quot;Comment&quot;: res.comment || '' };
                resxValues.push(item);
            }
            else {
                console.log('node is undefined or null');
            }
        }

        table.rowsData = resxValues;
    }
    else {
        console.log(&quot;text is null&quot;);
        return;
    }
}
</pre>

<p>And the vscode-data-grid generates the rows, sticky header, handles the scrolling, theming, responding to environment, etc. for me! </p>

<p><img title="Grid view" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Grid view" src="https://storage2.timheuer.com/data-grid-only.png" width="1309" height="287" /></p>

<p>Now I want to edit…</p>

<h2>Editing in the vscode-data-grid</h2>

<p>The default data-grid does NOT provide editing capabilities unfortunately and I really didn’t want to have to invent something here and end up not getting the value from all the Webview UI Toolkit. Luckily some in the universe also tackling the same problem.&#160; Thankfully <a href="https://twitter.com/notesofbarry">Liam Barry</a> was at the same time trying to solve the same problem and helped contribute what I needed.&#160; It works and provides a simple editing experience:</p>

<p><img title="Editing a row" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Editing a row" src="https://storage2.timheuer.com/editing-resx.gif" width="1318" height="318" /></p>

<p>Now that I can edit can I delete?</p>

<h2>Deleting items in the grid</h2>

<p>Maybe you made an error and you want to delete.&#160; I decided to expose a command that can be invoked from the command palette but also from a context menu. I specifically chose not to put an “X” or delete button per-row…it didn’t feel like the right UX.&#160; Once I created the command (which basically gets the element and then the _rowData from the vscode-data-grid element (yay, that was awesome the context is set for me!!).&#160; Then I just remove it from the items array and update the doc.&#160; The code is okay, but the experience is simple exposing as a right-click context menu:</p>

<p><img title="Deleting an item" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Deleting an item" src="https://storage2.timheuer.com/deleting-resx.gif" width="1154" height="372" /></p>

<p>This is exposed by enabling the command on the webview context menu via package.json – notice on line 2 is where it is exposed on the context menu and the conditions of which it is exposed (a specific config value and ensuring that my editor is the active one):</p>

<pre class="brush: json; highlight: [2];">&quot;menus&quot;: {
  &quot;webview/context&quot;: [
    {
      &quot;command&quot;: &quot;resx-editor.deleteResource&quot;,
      &quot;when&quot;: &quot;config.resx-editor.experimentalDelete == true &amp;&amp; activeCustomEditorId == 'resx-editor.editor'&quot;
    }
  ]
...
}
</pre>

<p>Deleting done, now add a new one!</p>

<h2>Adding a new item</h2>

<p>Obviously you want to add one! So I want to capture input…but don’t want to do a ‘form’ as that doesn’t feel like the VS Code way. I chose to use a multi-input method using the command area to capture the flow. This can be invoked from the button you see but also from the command palette command itself.</p>

<p><img title="Add new resource" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Add new resource" src="https://storage2.timheuer.com/addnew-resx.gif" width="1068" height="492" /></p>

<p>Simple enough, it captures the inputs and adds a new item to the data array and the document is updated again.</p>

<h2>Using the default editor</h2>

<p>While custom editors are great, there may be times you want to use the default editor. This can be done by doing “open with” on the file from Explorer view, but I wanted to provide a quicker method from my custom editor. I added a command that re-opens the active document in the text editor:</p>

<pre class="brush: ts;">let openInTextEditorCommand = vscode.commands.registerCommand(AppConstants.openInTextEditorCommand, () =&gt; {
  vscode.commands.executeCommand('workbench.action.reopenTextEditor', document?.uri);
});
</pre>

<p>and expose that command in the editor title context menu (package.json entry):</p>

<pre class="brush: json;">&quot;editor/title&quot;: [
{
  &quot;command&quot;: &quot;resx-editor.openInTextEditor&quot;,
  &quot;when&quot;: &quot;activeCustomEditorId == 'resx-editor.editor' &amp;&amp; activeEditorIsNotPreview == false&quot;,
  &quot;group&quot;: &quot;navigation@1&quot;
}
...
]
</pre>

<p>Here’s the experience:</p>

<p><img title="Toggle resx raw view" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Toggle resx raw view" src="https://storage2.timheuer.com/toggle-resx.gif" width="1250" height="524" /></p>

<p>Helpful way to toggle back to the ‘raw’ view.</p>

<h2>Using the custom editor as a previewer</h2>

<p>But what if you are in the raw view and want to see the formatted one? This may be common for standard formats where users do NOT have your editor set as default. You can expose a preview mode for yours and similarly, expose a button on the editor to preview it. This is what I’ve done here in package.json:</p>

<pre class="brush: json;">&quot;editor/title&quot;: [
...
{
  &quot;command&quot;: &quot;resx-editor.openPreview&quot;,
  &quot;when&quot;: &quot;(resourceExtname == '.resx' || resourceExtname == '.resw') &amp;&amp; activeCustomEditorId != 'resx-editor.editor'&quot;,
  &quot;group&quot;: &quot;navigation@1&quot;
}
...
]
</pre>

<p>And the command that is used to open a document in my specific editor:</p>



<pre class="brush: ts;">let openInResxEditor = vscode.commands.registerCommand(AppConstants.openInResxEditorCommand, () =&gt; {

    const editor = vscode.window.activeTextEditor;

    vscode.commands.executeCommand('vscode.openWith',
        editor?.document?.uri,
        AppConstants.viewTypeId,
        {
            preview: false,
            viewColumn: vscode.ViewColumn.Active
        });
});
</pre>



<p>Now I’ve got a different ways to see the raw view, preview, or default structured custom view.&#160; </p>

<p><img title="Preview mode" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Preview mode" src="https://storage2.timheuer.com/preview-resx.gif" width="1344" height="652" /></p>

<p>Nice!</p>

<h2>Check out the codez</h2>

<p>As I mentioned earlier this is hardly an original idea, but I liked learning, using a standard UX and trying to make sure it felt like it fit within the VS Code experience.&#160; So go ahead and give it an install and play around. It is not perfect and comes with the ‘works on my machine’ guarantee.</p>

<p><img title="Marketplace listing" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Marketplace listing" src="https://storage2.timheuer.com/marketplacelisting-resx.png" width="1125" height="336" /></p>

<p>The code is out there and linked in the <a href="https://marketplace.visualstudio.com/items?itemName=TimHeuer.resx-editor">Marketplace listing</a> for you.</p>
