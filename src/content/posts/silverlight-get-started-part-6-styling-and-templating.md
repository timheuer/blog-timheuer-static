---
title: "Getting started with Silverlight: Part 6 &ndash; Polish the UI with Styles and Templates"
slug: "silverlight-get-started-part-6-styling-and-templating"
pubDate: 2009-10-06T10:15:04.000Z
lastModified: 2019-10-23T04:20:32.000Z
categories:
  - "silverlight"
  - "blend"
  - "expression blend"
  - "xaml"
  - "ria"
  - "skinning"
  - "templating"
  - "silverlight toolkit"
draft: false
---

<p>This is part 6 in a series on getting started with <a href="http://silverlight.net">Silverlight</a>.  To view the <a href="http://timheuer.com/blog/articles/getting-started-with-silverlight-development.aspx">index to the series click here</a>. <strong>You can download the completed project files for this sample application in </strong><a href="http://storage.timheuer.com/TwitterSearchMonitor_CS.zip"><strong>C#</strong></a><strong> or </strong><a href="http://storage.timheuer.com/TwitterSearchMonitor_VB.zip"><strong>Visual Basic</strong></a><strong>.</strong></p>  <p>We now have a functioning application but could use some more polish.  Let’s make the data template for the search results look a little better.  We’re going to modify a few things in the data template in Search.xaml for the ItemsControl.  </p>  <p>These modifications can be done in Blend just like we have been doing with the editing template features.  This is how it was accomplished above.  With these styles now applied the new UI looks like this:</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Styled results" alt="Styled results" src="http://storage.timheuer.com/gs6-styled.png" /></p>  <p>Notice how more polished that looks and we didn’t affect any code, just the template style.  Since there was a few changes here since the last step it would be a lot of code to write out but let me point out where the styles are in the final project.</p>  <p>The styles and templates are applied just like the binding syntax with data and the templates.  If we look at the ScrollViewer it now states:</p>  <div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">   <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">     <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span>ScrollViewer Style="{StaticResource scrollViewerStyle}" ...</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span> ...</pre>
<!--CRLF--></div>
</div>

<p>Notice the familiar syntax?  instead of {Binding} it uses {StaticResource} to refer to a resource that either exists in the document or the App.xaml.  In this case the style is in the App.xaml (look for the scrollViewerStyle and scrollBarStyle nodes at the bottom of the file).</p>

<p>We also just made some subtle changes to the colors of the included style from the template.  With styling and templating in Blend, you don’t have to worry about modifying your .NET code most of the time.  We are able to change the visual layout and theme of controls without changing the code.</p>

<p>More resources on using <a href="http://microsoft.com/expression">Expression Blend</a>:</p>

<ul>
  <li><a href="http://www.adamkinney.com">Adam Kinney</a>’s blog (Blend Evangelist) </li>

  <li><a href="http://visitmix.com/labs/Rosetta/eyesofblend/skinning/">Styling and Skinning Controls</a> </li>
</ul>

<p>Having a designer friend at this stage of polishing the UI is extremely helpful.  In fact, you’d likely have this UI defined MUCH earlier in the project than our exercise here.  The two tools, Expression Blend and Visual Studio, share the same project structure file so you can easily open the project in either tool instead of passing around loose files.</p>

<p>Take a look around the Assets/Styles.xaml file in the completed project to understand how styles and templates can be used.</p>

<p>Next step: finishing off our application by <a href="http://timheuer.com/blog/articles/silverlight-get-started-part-7-taking-out-of-browser.aspx">making it available out-of-browser in part 7</a>.</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:697631f1-d6be-4154-a432-ee0c4a8e261a" class="wlWriterEditableSmartContent"></div>
