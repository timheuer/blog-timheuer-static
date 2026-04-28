---
title: "Make your VS Code extension more helpful"
slug: "enhance-your-vs-code-extension-listing-easily"
pubDate: 2023-06-26T17:14:04.000Z
lastModified: 2023-06-26T17:14:04.000Z
description: "Enhance your VS Code extension listing with a few simple additions to your package manifest!"
categories:
  - "visual studio"
  - "tools"
  - "developer"
  - "vscode"
draft: false
---

<p>Whenever I work on something new, I like to make sure I try to better understand the tech and the ecosystem around it.&#160; With the launch of the <strong><a href="https://devblogs.microsoft.com/visualstudio/announcing-csharp-dev-kit-for-visual-studio-code/">C# Dev Kit</a></strong>, I had to dive deeper into understanding some things about how VS Code extensions work, and get dirtier with TypeScript/JavaScript more than usual that my ‘day job’ required.&#160; As a part of how I learn, I build.&#160; So I went and built some new extensions.&#160; Nearly all of my experiments are public on my repos, and all come with disclaimers that they usually are for completely selfish reasons (meaning they may not help anyone else but me – or just learning) or may not even be original ideas really.&#160; I only say that because you may know a lot of this already.</p>  <p>As a part of this journey I’ve loved the VS Code extensibility model and documentation.&#160; It really is great for 99% of the use cases (the remaining 1% being esoteric uses of WebView, some of the VS Code WebView UI Toolkit, etc).&#160; And one thing I’ve come to realize is the subtleties of making your VS Code extension a lot more helpful to your consumers in the information, with very little effort – just some simple entries in package.json in fact.&#160; Here were some that I wasn’t totally aware of (they are in the docs) mostly because my `yo code` starting point doesn’t emit them.&#160; Nearly all of these exist to help people understand your extension, discover it, or interact with YOU better.&#160; And they are simple!</p>  <h2>The Manifest</h2>  <p>First, make sure you understand the <a href="https://code.visualstudio.com/api/references/extension-manifest#marketplace-presentation-tips">extension manifest</a> is not just a package.json for node packages. It represents metadata for your Marketplace and some interaction with VS Code itself!</p>  <p><img title="VS Code Extension Manifest" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="VS Code Extension Manifest" src="https://storage2.timheuer.com/extension-manifest.png" width="1196" height="758" /></p>      <p>It’s just some snippet of text, but powers a few experiences…here are some I’ve noticed provide some added Marketplace and product value.</p>  <h2>Repository</h2>  <p>Sounds simple, but can be helpful if your extension is Open Source.&#160; The <a href="https://code.visualstudio.com/api/references/extension-manifest#marketplace-presentation-tips">repository</a> just surfaces a specific link in your listing directly to your repository.</p>  <pre class="brush: json;">&quot;repository&quot;: {
  &quot;type&quot;: &quot;git&quot;,
  &quot;url&quot;: &quot;https://github.com/timheuer/resx-editor&quot;
}
</pre>

<p>Simple enough, you specify a type and to the root of your repo.</p>

<h2>Bugs</h2>

<p>You want people to log issues right?&#160; This attribute powers the ‘Report Issue’ capability within VS Code itself:</p>

<p><img title="VS Code Issue Reporter" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="VS Code Issue Reporter" src="https://storage2.timheuer.com/issue-reporter.png" width="1026" height="462" /></p>

<p>To add this you simply put a URL to the issues collector of your project.&#160; Could be anything really, but if it is a GitHub repo then your users will be able to directly log an issue from within VS Code. If it is not, then the URL of your issues collector (e.g., Jira, Azure DevOps) will be displayed here in link format.</p>

<pre class="brush: json;">&quot;bugs&quot;: {
  &quot;url&quot;: &quot;https://github.com/timheuer/resx-editor/issues&quot;
}
</pre>

<p>This is super helpful for your users and I think a requirement!</p>

<h2>Q&amp;A</h2>

<p>By default if you publish to the Visual Studio Marketplace, then you get an Q&amp;A tab for your extension. People can come here and start asking questions. I personally think the experience is not great here right now, as the publisher is the sole respondent, the conversation isn’t threaded, etc. But you can change that.</p>

<pre class="brush: json;">&quot;qna&quot;: &quot;https://github.com/timheuer/resx-editor/issues&quot;
</pre>

<p>By adding this, the Q&amp;A link in the marketplace will now direct people to your specific link here rather than bifurcate your Q&amp;A discussions in marketplace and your chosen place. This can be GitHub Issues, GitHub Discussions, some other forum software, whatever. It provides a good entry point so that you don’t have to monitor yet another Q&amp;A portion for your product.</p>

<h2>Keywords</h2>

<p>Yes you have categories (which are specific words that the Marketplace knows about), but you can also have keywords (up to 5). This is helpful when you basically want to add some searchable context/content that might not be in your title or brief description.</p>

<pre class="brush: json;">&quot;keywords&quot;: [
  &quot;resx&quot;,
  &quot;resw&quot;,
  &quot;resource&quot;,
  &quot;editor&quot;,
  &quot;viewer&quot;
],
</pre>

<p>You can only have 5 so tune them well, but don’t leave these out.&#160; They also display in the marketplace listing.</p>

<h2>Badges</h2>

<p>Who doesn’t love a good badge to show build status or versioning! One small delighter for the nerds among us is the Marketplace/manifest support this URL format from a set of <a href="https://code.visualstudio.com/api/references/extension-manifest#approved-badges">approved badge providers</a>.&#160; Adding this in your manifest:</p>

<pre class="brush: json;">&quot;badges&quot;: [
  {
    &quot;url&quot;: &quot;https://img.shields.io/visual-studio-marketplace/v/timheuer.resx-editor?label=VS%20Code%20Marketplace&amp;color=brightgreen&amp;logo=visualstudiocode&quot;,
    &quot;href&quot;: &quot;https://marketplace.visualstudio.com/items?itemName=TimHeuer.resx-editor&quot;,
    &quot;description&quot;: &quot;Current Version&quot;
  },
  {
    &quot;url&quot;: &quot;https://github.com/timheuer/resx-editor/actions/workflows/build.yaml/badge.svg&quot;,
    &quot;href&quot;: &quot;https://github.com/timheuer/resx-editor/actions/workflows/build.yaml&quot;,
    &quot;description&quot;: &quot;Build Status&quot;
  }
]
</pre>

<p>now shows these by default in your Marketplace listing:</p>

<p><img title="VS Code Marketplace listing with badges" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="VS Code Marketplace listing with badges" src="https://storage2.timheuer.com/badges-marketplace.png" width="539" height="277" /></p>

<p>Maybe a bit ‘extra’ as my daughter would say, but I think it adds a nice touch.</p>

<h2>Snippets</h2>

<p>If you are a code provider or a custom editor you may want to add some <a href="https://code.visualstudio.com/docs/editor/userdefinedsnippets#_create-your-own-snippets">snippets</a>.&#160; Your extension can directly contribute them with your other functionality.</p>

<pre class="brush: json;">&quot;snippets&quot;: [
  {
    &quot;language&quot;: &quot;xml&quot;,
    &quot;path&quot;: &quot;./snippet/resx.json&quot;
  }
]
</pre>

<p>Then when your extension is installed these are just a part of it and you don’t need to provide a ‘snippet only’ pack of sorts.</p>

<h2>Menus</h2>

<p>If you are doing custom things, you likely already know about contributing menus and commands.&#160; But did you know that commands appear in the command palette by default? Perhaps you don’t want that as your command is context specific: only when a certain file type is open, a specific editor is in view, etc. So you’ll want to hide them by default in the command pallette using the ‘when’ clause like in lines 5 and 11 here. I want to never show one in the command palette (when:false) and the other only certain conditions when a specific view is open.</p>



<pre class="brush: json; highlight: [5,11];">&quot;menus&quot;: {
  &quot;webview/context&quot;: [
    {
      &quot;command&quot;: &quot;resx-editor.deleteResource&quot;,
      &quot;when&quot;: &quot;config.resx-editor.experimentalDelete == true &amp;&amp; webviewId == 'resx-editor.editor'&quot;
    }
  ],
  &quot;commandPalette&quot;: [
    {
      &quot;command&quot;: &quot;resx-editor.deleteResource&quot;,
      &quot;when&quot;: &quot;false&quot;
    }
  ]
}
</pre>



<p>This enables the commands to be surfaced where you want like custom views, context menus, etc. without them showing as an ‘anytime’ available command.</p>

<h2>Summary</h2>

<p>There is a lot more you can do and of course the most important thing is providing a useful extension (heck, even if only to you). But these are some really simple and subtle changes I noticed in my learning that I think more extension authors should take advantage of!&#160; Hope this helps!</p>
