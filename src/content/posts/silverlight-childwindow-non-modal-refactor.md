---
title: "Refactoring Silverlight ChildWindow for a non-modal use"
slug: "silverlight-childwindow-non-modal-refactor"
pubDate: 2009-05-10T15:08:06.000Z
lastModified: 2019-10-23T04:20:29.000Z
categories:
  - "silverlight"
  - "expression"
  - "expression blend"
  - "xaml"
  - "ria"
  - "silverlight toolkit"
  - "childwindow"
  - "floatablewindow"
  - "modal"
draft: false
---

<p><strong>UPDATE: FloatableWindow is now on CodePlex for easier community contributions and management of latest source and builds.  <a href="http://floatablewindow.codeplex.com">FloatableWindow CodePlex Project</a>.  If you like this idea <a href="http://silverlight.codeplex.com/WorkItem/View.aspx?WorkItemId=3668">VOTE FOR IT in the Silverlight Toolkit</a>!</strong> </p>
<p>I’ve seen a few comments/requests incoming lately that people like the <strong>ChildWindow</strong> control in the <a href="http://silverlight.net/"><strong>Silverlight</strong></a> 3 SDK.  This is a great control that creates a modal dialog for you.  When you use it, it disables your root layout application and shows the dialog you provide:</p>
<p><img style="display: block; float: none; margin-left: auto; margin-right: auto;" title="ChildWindow example" alt="ChildWindow example" src="http://s3.amazonaws.com:80/storage.timheuer.com/childwindow1.png" /></p>
<p>This is great for those true modal needs.  It responds to normal windows DialogResult type responses if you have buttons, etc. – great for error dialogs, logins, etc.  The request I’ve been seeing is for the same functionality, but in a ‘normal’ ChildWindow.</p>
<p>But I’ve been seeing requests that it should act more like the normal Window object in .NET, which has an option for showing a window as a ‘dialog’ (modal) versus a normal one.  Well, since the source code is available under <strong>Ms-PL</strong> license at the <strong><a href="http://codeplex.com/silverlight">Silverlight Toolkit</a></strong> project, I decided to play around and refactor a bit.  If you look at the base class implementation of Window, the API shows two methods: <em>Show</em> and <em>ShowDialog</em>.  This is what I wanted to emulate.  I changed the ChildWindow to <em>FloatableWindow</em> only because I couldn’t think of a better name and it represented a desired behavior.  In ChildWindow, the default behavior is a modal dialog and there are a few key areas that drive this behavior.   There is a template part called <em>Overlay</em> that is responsible for the faded-out background of your app when the ChildWindow is shown.  The other modal semantics are driven by looking at the RootLayout of the parent creating the ChildWindow and changing its properties (IsEnabled=False).  Basically I just spelunked these areas and did some changing.</p>
<p>I implemented a property IsModal (_modal for the private accessor) that would be set in my new show methods, which I refactored to Show, ShowDialog and ShowWindow (internal).  ShowWindow would accept a boolean whether it was to be a modal or not, setting the private accessor.  The calls checking for disabling RootLayout, UpdateOverlaySize, ChangeVisualState and some of the focus event handling (as in a non-modal you may have multiple and you want each to be able to have focus).  After doing this I could create non-modal windows easily:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> FloatableWindow fw = <span style="color: rgb(0, 0, 255);">new</span> FloatableWindow();</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> fw.Title = <span style="color: rgb(0, 96, 128);">"Testing FloatableWindow"</span>;</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span> fw.Height = 200;</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span> fw.Width = 200;</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span> fw.Content = <span style="color: rgb(0, 96, 128);">"Created at "</span> + DateTime.Now.ToLongTimeString();</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span> fw.Show(); <span style="color: rgb(0, 128, 0);">//for non-modal</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span> fw.ShowDialog(); //<span style="color: rgb(0, 0, 255);">for</span> modal dialog</pre>
<!--CRLF--></div>
</div>
<p>And I could create multiple:</p>
<p><img style="display: block; float: none; margin-left: auto; margin-right: auto;" title="FloatableWindow" alt="FloatableWindow" src="http://s3.amazonaws.com:80/storage.timheuer.com/floatablewindow1.png" /></p>
<p>All the other functions of the ChildWindow are there so there wasn’t a lot of work to do.  I kept the template parts, etc. so it is customizable in tools like Expression Blend.  There are a few things that I still need to do:</p>
<ul>
    <li>Better enable a default start position for the FloatableWindow </li>
    <li>On focus events, if there are multiple windows, make sure that the selected window gets brought to the front of the layout when being used (NOTE: the logic for this is working actually, but ZIndex doesn’t appear to be able to be set on Popup, which I’m talking with the team about)</li>
    <li>Whatever other bugs I may have caused by my assumptions :-) </li>
</ul>
<p>But it was an experiment at least and seems to work so far.  Here’s the code: <a href="http://s3.amazonaws.com:80/storage.timheuer.com/FloatableWindow_1.1.zip">FloatableWindow_1.1.zip</a>.  The archive file includes the code I used as well as Visual Studio item templates (C# and Visual Basic) to mirror the same functionality of <em>Add New Item</em> where you can add a new ChildWindow to your project as a user control.  </p>
<p><img style="display: block; float: none; margin-left: auto; margin-right: auto;" title="FloatableWindow Item Templates" alt="FloatableWindow Item Templates" src="http://s3.amazonaws.com:80/storage.timheuer.com/floatablewindow2.png" /></p>
<p>Let me know what you think.  Hope this helps!</p>
<div style="margin: 0px; padding: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:870d2d52-34ca-4704-ad35-d072bd446586" class="wlWriterEditableSmartContent"></div>

