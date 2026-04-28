---
title: "Callisto Migration Tip: Use PlaceholderText in Windows 8.1"
slug: "migrate-callisto-watermarktextbox-windows-placeholdertext"
pubDate: 2013-10-24T19:59:56.000Z
lastModified: 2019-10-23T04:20:40.000Z
categories:
  - "xaml"
  - "textbox"
  - "winrt"
  - "callisto"
  - "win8appdev"
  - "winrtxamltoolkit"
  - "windows 8.1"
  - "passwordbox"
  - "watermark"
  - "placeholdertext"
draft: false
---

<p>Continuing on my tips in <a href="http://timheuer.com/blog/archive/2013/10/24/callisto-winrt-xaml-toolkit-windows-8-1-update-roadmap.aspx"><strong>migrating from Callisto for platform-supported Windows 8.1 APIs</strong></a>, I’ll cover another simple, but helpful text control in this post: <strong><a href="https://github.com/timheuer/callisto/wiki/WatermarkTextBox">WatermarkTextBox</a></strong>.</p>
<p>
    <img title="WatermarkTextBox sample image" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="WatermarkTextBox sample image" src="http://storage2.timheuer.com/watermarkbox.png" /></p>
<p>When writing an app that provides input from customers, providing some “hint” when there is no text is a valuable thing to add.  Here’s how to change to the platform-supported APIs.</p>
<h2>Change back to TextBox</h2>
<p>When using <strong><a href="http://winrtxamltoolkit.com/">Callisto</a></strong>, you had to use a specific control that derived from TextBox.  Simple enough:</p>

<pre class="brush: xml; toolbar: false;">
&lt;callisto:WatermarkTextBox Watermark="Enter some text..." /&gt;
</pre>

<p>In Windows 8.1 the concept of watermark text was added to controls for text input, including <strong><a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.passwordbox.aspx">PasswordBox</a></strong> (one of the requests Callisto frequently got in this area).  This support is added via the <strong><a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.textbox.placeholdertext.aspx">PlaceholderText</a></strong> property on these controls.  The use is simple and to change from Callisto, simply move back to TextBox control and use the property:</p>

<pre class="brush: xml; toolbar: false;">
&lt;TextBox PlaceholderText="Enter some text..." /&gt;
&lt;PasswordBox PlaceholderText="Enter your password" /&gt;
</pre>

<p>There are some subtle UI differences here in that the PlaceholderText in Windows 8.1 is not italic (something I personally prefer to better differentiate), but that’s about it.  The same functionality of when it shows and doesn’t exists.</p>

<h2>Summary</h2>

<p>A quick change to your code will yield you yet another gain of removing a sub-classed control with it’s own template and take advantage of platform-supported text goodness and performance.  Make the change my friends, make the change!  Be sure to check out the other <a href="http://timheuer.com/blog/archive/2013/10/24/callisto-winrt-xaml-toolkit-windows-8-1-update-roadmap.aspx">Callisto migration tips when moving your app to Windows 8.1</a>!</p>

<p>Hope this helps!</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:8e7f79ab-4311-4885-8b68-b4c9352ea525" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>

