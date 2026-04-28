---
title: "using silverlight, expression encoder and asp.net ajax"
slug: "expression-encoder-and-aspnet-ajax"
pubDate: 2007-09-14T10:42:19.000Z
lastModified: 2019-10-23T04:20:09.000Z
categories:
  - "silverlight"
  - "expression"
  - "expression media encoder"
  - "atlas"
  - "asp.net"
  - "ajax"
  - "asp.net ajax"
  - "expression encoder"
  - "encoder template"
  - "scriptmanager"
  - "microsoftajax"
  - "microsoft ajax"
draft: false
---

<p>in <a href="http://timheuer.com/blog/archive/2007/09/11/expression-encoder-custom-templates.aspx">my previous sample i talked about creating custom expression encoder templates</a>.  good times.  also <a href="http://silverlight.net/blogs/jesseliberty/archive/2007/09/10/the-great-asynchronous-learning-experiment-day-6.aspx">jesse</a> alluded to a something him and i have been working on with regard to what he calls "hyper video" and what i've previously referred to as '<a href="http://timheuer.com/blog/archive/2007/06/21/creating-silverlight-video-with-timed-overlays.aspx">timed overlays</a>' in an example.</p>
<p>in going through both of these i found an issue that i forgot to write about (but a helpful commenter reminded me: thanks ernie!) with regard to using the expression encoder templates and asp.net ajax.</p>
<p><strong><u>the problem</u></strong></p>
<p>expression encoder uses a model of encapsulating silverlight and the media elements within an asp.net ajax control.  because they do that, they include the Microsoft AJAX client library (MicrosoftAjax.js) in the template output.  this poses a problem when you implement their code within an asp.net page that already has asp.net ajax in it!  </p>
<p>if you don't make any changes and have a <a href="http://asp.net/ajax/documentation/live/overview/ScriptManagerOverview.aspx">ScriptManager</a> in your code in addition to the template output, you'll see errors like Sys._application, yada yada.</p>
<p><strong><u>the solution</u></strong></p>
<p>the solution is two part.</p>
<p>first, you'll notice that in your expression encoder output you'll see the script reference to MicrosoftAjax.js.  if you are including a ScriptManager on your page for other ajax-ness, then you can remove this.  why? well because ScriptManager brings down the MicrosoftAjax.js file for you automatically (read: trust me, you don't need it).</p>
<p>second, you have to move your other javascript references from expression encoder to within the ScriptManager.  it will look something like this when completed:</p>
<blockquote>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">asp:ScriptManager</span> <span class="attr">id</span><span class="kwrd">="sm"</span> <span class="attr">runat</span><span class="kwrd">="server"</span><span class="kwrd">&gt;</span> <br />    <span class="kwrd">&lt;</span><span class="html">Scripts</span><span class="kwrd">&gt;</span> <br />      <span class="kwrd">&lt;</span><span class="html">asp:ScriptReference</span> <span class="attr">Path</span><span class="kwrd">="~/Silverlight.js"</span> <span class="kwrd">/&gt;</span> <br />      <span class="kwrd">&lt;</span><span class="html">asp:ScriptReference</span> <span class="attr">Path</span><span class="kwrd">="~/BasePlayer.js"</span> <span class="kwrd">/&gt;</span> <br />      <span class="kwrd">&lt;</span><span class="html">asp:ScriptReference</span> <span class="attr">Path</span><span class="kwrd">="~/PlayerStrings.js"</span> <span class="kwrd">/&gt;</span> <br />      <span class="kwrd">&lt;</span><span class="html">asp:ScriptReference</span> <span class="attr">Path</span><span class="kwrd">="~/player.js"</span> <span class="kwrd">/&gt;</span> <br />      <span class="kwrd">&lt;</span><span class="html">asp:ScriptReference</span> <span class="attr">Path</span><span class="kwrd">="~/StartPlayer.js"</span> <span class="kwrd">/&gt;</span> <br />    <span class="kwrd">&lt;/</span><span class="html">Scripts</span><span class="kwrd">&gt;<br /></span><span class="kwrd">&lt;/</span><span class="html">asp:ScriptManager</span><span class="kwrd">&gt;</span></pre>
</blockquote>
<p>this is only necessary if you have expression encoder template output as well as you are implementing asp.net ajax content on your page/application.</p>
<p>hope this helps.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:357b1760-cb41-4da0-803c-e4f4fb3047c3" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
