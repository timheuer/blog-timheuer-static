---
title: "Creating XAML Code Snippets for Visual Studio 2013"
slug: "xaml-code-snippets-for-visual-studio"
pubDate: 2013-07-08T23:26:05.000Z
lastModified: 2019-10-23T04:20:40.000Z
categories:
  - "blend"
  - "xaml"
  - "visual studio"
  - "snippets"
  - "windows"
  - "vsix"
  - "windows 8"
  - "winrt"
draft: false
---

<p>A few weeks ago I had the great pleasure of being in front of you, our developer customers (and friends) at the Microsoft BUILD conference. (I never know how to write “build” in a sentence and refuse to use the “//” in front of it.)  These are things that I LOVE doing and wish I could do it more.  I had the privilege of introducing an overview of <a href="http://channel9.msdn.com/Events/Build/2013/2-164"><strong>what was new in the XAML UI framework for Windows 8.1</strong></a>.  All the sessions are recorded so please go <a href="http://channel9.msdn.com/Events/Build/2013/2-164">view mine and review</a> it how you think so they might invite me back!</p>
<p>In my session I gave some preview of some of the great new XAML tooling that is introduced for developer productivity in Visual Studio 2013 which, as of this writing, is currently in <a href="http://www.microsoft.com/visualstudio/eng/2013-downloads">preview form and available for download</a>.  My colleague Unni followed my session with one specifically about XAML tooling enhancements with a whirlwind tour of all the new features.  Please go check out his session: <strong><a href="http://channel9.msdn.com/Events/Build/2013/3-321">What’s New in Blend and Visual Studio for XAML Developers</a></strong> for the complete details.</p>
<p>One of the things I showed was the introduction of Visual Studio (VS) code snippets for the XAML editor.  This was one of the <a href="http://visualstudio.uservoice.com/forums/121579-visual-studio/suggestions/2718112-enable-xaml-snippets-in-the-xaml-editor">customer requests</a> for a while for the XAML editor and is now available in the VS 2013 preview!  In my presentation I showed a common task that I do which is to have many elements and wrap them in a StackPanel.  I’ve gotten lazy and wanted a quick ‘refactor’ way to do this and now I can!  A few have emailed me asking where the snippet I used was as nothing was working in the preview for them.  As of this writing, the functionality was in the preview, however no default XAML code snippets are provided.  I’ve responded to a few on an <a href="http://social.msdn.microsoft.com/Forums/windowsapps/en-US/5d616476-0b9b-48fc-bd8d-b378096a80b3/surround-with-not-working">MSDN forum thread</a> offering to share my snippets and someone suggested I post more details, so here it is!</p>
<h2>Anatomy of a Code Snippet</h2>
<p>Code Snippets in VS are basically XML files that sit in a special location (one of two locations, global or user).  These code snippets can apply to many things including languages (C#, VB, etc.) as well as ‘markup’ languages (CSS and now XAML).  You can read more in-depth data about <a href="http://msdn.microsoft.com/en-us/library/ms165392(v=vs.120).aspx">VS Code Snippets here</a>.  The basics that I think you want to know are the two main types of snippets: Expansion and SurroundWith.  </p>
<p>An <strong>Expansion snippet </strong>is one that you invoke and it gives you placeholders for stuff to fill out.  My most widely used one is ‘foreach’ in C#.  You start typing foreach, then hit tab-tab and you are presented with a template, more or less, to complete.  A <strong>SurroundWith</strong> snippet is one that surrounds (duh!) the selected content in the editor surface with your template.  An example of this is the #region snippet which puts the begin/end region tags around selected code.  It is important to note that these can be used exclusively or together.  That is to say I can have a SurroundWith snippet that is also an Expansion.  In fact, the #region one is a good example: it surrounds the selected code and also gives you a field to complete for the region name.  The Code Snippet structure is the same for most languages with the difference being that in the Code node of the snippet definition it defines which language it applies to for the editors.</p>
<blockquote>
    <p>NOTE: Creating Code Snippets is a very manual process.  At the time of this writing there was no really great tool to “extract” a chunk of code and turn it into a code snippet.  There are a few attempts out there, but most have been abandoned and not all working.</p>
</blockquote>
<p>Once you have these XML files (.snippet files for VS), you place them in well-known locations or can use the Code Snippets manager in VS (more on that later).</p>
<h2>XAML Code Snippets</h2>
<p>As noted above the XAML code snippets are the same structure as the C# snippets with the difference being the Language attribute on the Code node in the definition.  In my demo I used a StackPanel SurroundWith snippet with the following definition:</p>

<pre class="brush: xml; toolbar: false;">
&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;CodeSnippet Format="1.0.0" xmlns="http://schemas.microsoft.com/VisualStudio/2005/CodeSnippet"&gt;
  &lt;Header&gt;
    &lt;SnippetTypes&gt;
      &lt;SnippetType&gt;SurroundsWith&lt;/SnippetType&gt;
    &lt;/SnippetTypes&gt;
    &lt;Title&gt;Vertical StackPanel&lt;/Title&gt;
    &lt;Author&gt;Tim Heuer&lt;/Author&gt;
    &lt;Description&gt;XAML snippet for surrounding content in a vertical StackPanel&lt;/Description&gt;
    &lt;HelpUrl&gt;
    &lt;/HelpUrl&gt;
    &lt;Shortcut&gt;vsp&lt;/Shortcut&gt;
  &lt;/Header&gt;
  &lt;Snippet&gt;
    &lt;Code Language="XAML"&gt;&lt;![CDATA[&lt;StackPanel&gt;$selected$$end$&lt;/StackPanel&gt;]]&gt;&lt;/Code&gt;
  &lt;/Snippet&gt;
&lt;/CodeSnippet&gt;
</pre>

<p>Notice the &lt;Code&gt; element and how it has the Language=”XAML”?  That is the only difference between this and a C# one.  There are keywords for certain things like <em>selected</em> (which is a marker for selected content) and <em>end</em> (which is where you want the cursor to be at the completion of the snippet) that you can use and are in the documentation.  Here is another example of an Expansion XAML snippet for an AppBarButton:</p>

<pre class="brush: xml; toolbar: false;">
&lt;?xml version="1.0" encoding="utf-8" ?&gt;
&lt;CodeSnippets  xmlns="http://schemas.microsoft.com/VisualStudio/2005/CodeSnippet"&gt;
    &lt;CodeSnippet Format="1.0.0"&gt;
        &lt;Header&gt;
            &lt;Title&gt;AppBarButton&lt;/Title&gt;
            &lt;Shortcut&gt;abb&lt;/Shortcut&gt;
            &lt;Description&gt;Code snippet for XAML AppBarButton&lt;/Description&gt;
            &lt;Author&gt;Tim Heuer&lt;/Author&gt;
            &lt;SnippetTypes&gt;
                &lt;SnippetType&gt;Expansion&lt;/SnippetType&gt;
            &lt;/SnippetTypes&gt;
        &lt;/Header&gt;
        &lt;Snippet&gt;
            &lt;Declarations&gt;
                &lt;Literal&gt;
                    &lt;ID&gt;icon&lt;/ID&gt;
                    &lt;ToolTip&gt;The Icon value to use for the visual&lt;/ToolTip&gt;
                    &lt;Default&gt;Emoji&lt;/Default&gt;
                &lt;/Literal&gt;
                &lt;Literal&gt;
                    &lt;ID&gt;label&lt;/ID&gt;
                    &lt;ToolTip&gt;The text label for the button&lt;/ToolTip&gt;
                    &lt;Default&gt;My Label&lt;/Default&gt;
                &lt;/Literal&gt;
                &lt;Literal&gt;
                    &lt;ID&gt;uniqueid&lt;/ID&gt;
                    &lt;ToolTip&gt;The unique ID for the button&lt;/ToolTip&gt;
                    &lt;Default&gt;MyAppBarButton&lt;/Default&gt;
                &lt;/Literal&gt;
            &lt;/Declarations&gt;
            &lt;Code Language="XAML"&gt;&lt;![CDATA[&lt;AppBarButton x:Uid="$uniqueid$" x:Name="$uniqueid$" Label="$label$" Icon="$icon$" /&gt;$end$]]&gt;
            &lt;/Code&gt;
        &lt;/Snippet&gt;
    &lt;/CodeSnippet&gt;
&lt;/CodeSnippets&gt;
</pre>

<p>As you can see they are pretty simple to use!</p>

<h2>Adding Code Snippets to VS</h2>

<p>There are two ways to distribute snippets: as raw .snippet files or with an installer.  You can send someone a .snippet file and they can use the Code Snippets Manager tool to import it into their environment.  This is a per-user method.  From VS you would use the Tools menu and choose the Code Snippets manager:</p>

<p>&lt;pic&gt;</p>

<p>From here you would navigate to the XAML folder, then choose <em>Import</em> and select your .snippet files.  These would then import them into your local profile (Documents\Visual Studio 2013\Code Snippets) and be ready for immediate use.  Another way is through an installer.  Now up until VS 2013 there was the VSI installer (<a href="http://msdn.microsoft.com/en-us/library/ms242311(v=vs.120).aspx">as documented here on MSDN</a>) which has since been eclipsed by the VSIX extensibility method.  Right now there doesn’t appear to be much documentation on this method, but you *can* distribute code snippets via the VSIX installer.  VSIX is basically a ZIP file format with a manifest and content.  For this purpose the manifest describes the targets and the package definition for the VSPackage we are installing, which is in this case a folder of snippets.  This is a little tricky method to get VSIX to use as an installer for snippets, but works.  I won’t detail out the entire process here, but leave you with a few screenshots and you can download the file and look at the contents to see how it works…again it is a regular ZIP file so just rename and explore.</p>

<p>Contents of VSIX:</p>

<p>
    <img title="Contents of VSIX package" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Contents of VSIX package" src="http://storage2.timheuer.com/vsixcontents.png" /></p>

<p>Installer dialog:</p>

<p>
    <img title="VSIX installer dialog" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="VSIX installer dialog" src="http://storage2.timheuer.com/vsixinstaller.png" /></p>

<p>Once installed your VSIX-deployed snippets show up in the Extension Manager:</p>

<p>
    <img title="Extension manager listing" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Extension manager listing" src="http://storage2.timheuer.com/snippetextmgr.png" /></p>

<p>And there you have it!  A simple way to distribute your code snippets.  This VSIX can be put on <a href="http://visualstudiogallery.msdn.microsoft.com/">VS gallery</a> as well so that you can update it there and anyone who installed it can get updates from within VS itself!</p>

<p>To actually <em>use</em> the code snippets, from within the XAML editor use the shortcuts CTRL+K,S (for surround snippets):</p>

<p>
    <img title="Surround code snippet" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Surround code snippet" src="http://storage2.timheuer.com/surroundexpand.png" /></p>

<p>or CTRL+K,X (for expansion snippets):</p>

<p>
    <img title="Expansion snippet" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Expansion snippet" src="http://storage2.timheuer.com/abbexpand.png" /></p>

<p>
    <img title="Expansion snippet completed" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Expansion snippet completed" src="http://storage2.timheuer.com/abbexpandfull.png" /></p>

<h2>Summary</h2>

<p>Code snippets can be a powerful productivity tool for VS.  You probably use them daily (like foreach) and maybe didn’t even realize it!  Now that this concept is extended to XAML there are some great opportunities to increase your markup productivity by encapsulating some things that you do often into a XAML code snippet.  Right now the VS gallery doesn’t support uploading the method for VSIX that I have described so you can <a href="http://s3.amazonaws.com:80/storage2.timheuer.com/XAMLCodeSnippets.vsix"><strong>download my VSIX for some code snippets examples here for now</strong></a>.</p>

<p>Hope this helps!</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:1b7ce493-59c4-4ad4-962a-f1f069c503ee" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>

