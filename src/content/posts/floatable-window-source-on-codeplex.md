---
title: "FloatableWindow source on CodePlex"
slug: "floatable-window-source-on-codeplex"
pubDate: 2009-07-21T11:57:25.000Z
lastModified: 2019-10-23T04:20:30.000Z
categories:
  - "wpf"
  - "xaml"
  - "codeplex"
  - "ria"
  - "silverlight toolkit"
  - "toolkit"
  - "riaservices"
  - "childwindow"
  - "floatablewindow"
  - "mdi"
  - "silveright"
draft: false
---

<p>I got enough feedback and suggestions that I figured it would be better just to put the code up on <strong>CodePlex</strong> rather than package zips on my blog :-).  Here it is: <a href="http://floatablewindow.codeplex.com"><strong>FloatableWindow project</strong></a>.  The latest build I have is up there which incorporates some feedback that I’ve received.</p>
<p><strong>UPDATE: If you like this idea <a href="http://silverlight.codeplex.com/WorkItem/View.aspx?WorkItemId=3668">VOTE FOR IT in the Silverlight Toolkit</a>!</strong><br />
</p>
<p>Basically the ShowDialog() API operates the same way that <strong>ChildWindow</strong>.Show() does today.  No changes there, popup is used.  But when you just want some simple MDI type windows, use Show() which will not use Popup but rather add the elements as children to your root visual.  Now the key here is defining that root.  Before you show the window you’d want to do something like this:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> FloatableWindow fw = <span style="color: rgb(0, 0, 255);">new</span> FloatableWindow();</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> fw.Width = 200;</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span> fw.Height = 200;</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span> fw.Title = <span style="color: rgb(0, 96, 128);">"Foobar"</span>;</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span> fw.ParentLayoutRoot = <span style="color: rgb(0, 0, 255);">this</span>.LayoutRoot;</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span> fw.VerticalOffset = 200;</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span> fw.HorizontalOffset = 100;</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span> fw.Show();</pre>
<!--CRLF--></div>
</div>
<p>Notice line #5 where I specify a Panel element to add it to?  That would be required.  An ArgumentNullException is thrown if it is not provided.</p>
<p>Thanks for the great feedback and encouragement on this refactoring.  I hope that putting it on CodePlex provides a better home for evolution and tracking issues (I know there is an animation issue now with non-modal).</p>
<div style="margin: 0px; padding: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:45b754fb-4c0a-4e5a-ab8d-9c1edcd7e315" class="wlWriterEditableSmartContent"></div>

