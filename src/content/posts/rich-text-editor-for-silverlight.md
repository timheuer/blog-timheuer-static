---
title: "Rich Text Editor for Silverlight 2"
slug: "rich-text-editor-for-silverlight"
pubDate: 2008-04-29T17:18:47.000Z
lastModified: 2019-10-23T04:20:18.000Z
categories:
  - "silverlight"
  - "codeplex"
  - "rich editor"
  - "silverlight controls"
  - "rte"
  - "rich text editor"
  - "rich text"
  - "user control"
  - "text input"
  - "textblock"
  - "textbox"
draft: false
---

<p>For <a href="http://silverlight.net/">Silverlight</a> 2, we finally have some native controls to leverage.  Most of them are to aid in input scenarios.  The text input, however, is currently scoped to be plain text input.  Some have desired a richer input control.  You knew it wouldn’t be long before someone in the community stepped up to the challenge.  Christopher Husse has done just that.</p>
<p>Enter: <a href="http://www.codeplex.com/richtextedit">Silverlight rich text editor</a>.</p>
<p><img alt="" src="http://michaelsync.net/wp-content/uploads/2008/04/preview.jpg" /> </p>
<p>He posts a <a href="http://michaelsync.net/2008/04/29/silverlight-the-first-rich-text-editor">detailed description of all the capabilities on Michael Syncs blog</a>.  The effort is also posted on <a href="http://www.codeplex.com/richtextedit">Codeplex for you to peruse</a>.</p>
<p>Here is what he calls the ‘incomplete feature list’:</p>
<ul>
    <ul>
        <li>Copy/Paste formatted text between RichTextBoxes and copy/paste from/to clipboard of unformatted but macro-enabled text. This means in windows clipboard even things like emoticons will be kept. </li>
        <li>You may insert line breaks, unordered lists and blockquotes. </li>
        <li>You may use various keyboard selection features like End/ Home/ PageUp/ PageDown/ Left/ Up/ Right/ Down, Ctrl+A/ End/ Home, Ctrl+Shift+End/ Home/ Left/ Right, Shift+End/ Home/ PageUp/ PageDown/ Left/ Up/ Right/ Down and so forth… </li>
        <li>Supports direct Unicode character input using “Ctrl”+[NumPad]. </li>
        <li>All silverlight font formatting is supported and even some more like SUP/SUB formatting. </li>
        <li>You may define macros and a proper object class that should replace matching text, like emoticons… </li>
        <li>In contrast to many other rich text editors, this one is fully real-time. That means no preview is required because the editor allows editing all things directly. </li>
        <li>If you only use macros and IRichTextObject to extend the control, you will automatically get support for secure content serialization of all control elements. Content serialization also supports to reload content and edit it again. </li>
        <li>Secure content serialization gets rid of any potential security leak when storing user typed formatted text on a server and presenting it to visitors, because it is fully verifiable. </li>
        <li>You may restrict font formatting to a well defined custom subset. This allows you to ensure that all user typed input matches your needs or website design. (this feature is currently not implemented, but only prototyped) </li>
        <li>Snapshots allow convenient access to formatted content and also Find&amp;Replace with regular expressions for example… </li>
    </ul>
</ul>
<p>Way to go Christopher!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:0b1dfb7c-9074-48e9-a568-578a0bfeea5f" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>

