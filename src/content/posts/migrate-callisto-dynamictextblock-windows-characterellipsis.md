---
title: "Callisto Migration Tip: Use CharacterEllipsis"
slug: "migrate-callisto-dynamictextblock-windows-characterellipsis"
pubDate: 2013-10-24T19:45:16.000Z
lastModified: 2019-10-23T04:20:40.000Z
categories:
  - "xaml"
  - "textblock"
  - "winrt"
  - "callisto"
  - "win8appdev"
  - "winrtxamltoolkit"
  - "windows 8.1"
  - "dynamictextblock"
draft: false
---

<p>Frankly I’m going to be honest and say I’m not sure why it took us so long to add this capability to TextBlock, especially given that the support in <strong><a href="http://winrtxamltoolkit.com/">Callisto</a> </strong>provided via <strong><a href="https://github.com/timheuer/callisto/wiki/DynamicTextBlock">DynamicTextBlock</a></strong> was originally done in Silverlight 2.  O_O.  Well, <a href="http://twitter.com/ingebretsen">Robby</a> can rest well now knowing that we no longer have to depend on his contributions to <strong>Callisto</strong>.</p>
<p>
    <img title="DynamicTextBlock sample image" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="DynamicTextBlock sample image" src="http://storage2.timheuer.com/charellipsis.png" /></p>
<p align="center"><em>Example of use DynamicTextBlock on bottom</em></p>
<p>Here’s the quick migration tip.</p>
<h2 />
<h2 />
<h2>Change back to TextBlock</h2>
<p>The DynamicTextBlock served one purpose, to provide trimming at the character level rather than the word level.  The implementation of DynamicTextBlock was done using a ContentControl which, frankly, was probably too heavy handed for the usage here.  However since TextBlock is sealed this was necessary.  The usage for having this was simple:</p>

<pre class="brush: xml; toolbar: false;">
&lt;callisto:DynamicTextBlock Text="Some long text here" TextWrapping="NoWrap" /&gt;
</pre>

<p>And changing this to provide platform-supported trimming is simple as well:</p>

<pre class="brush: xml; toolbar: false;">
&lt;TextBlock Text="Some long text here" TextTrimming="CharacterEllipsis" /&gt;
</pre>

<p>Yep, that’s it.</p>

<h2>Summary</h2>

<p>This migration should be quick and painless.  Using the platform’s TextBlock will allow you to benefit from the new typography settings provided in Windows 8.1 (like TextTrimming=”Clip” as well) in conjunction with this as well as better global text support.  I’m thankful we were able to add this into the platform finally.</p>

<p>Hope this helps!</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:11214303-33f4-41bf-aa2c-2499ee24c4e4" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>

