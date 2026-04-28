---
title: "Silverlight Media Framework 2 released&ndash;integrate with Live Writer"
slug: "silverlight-media-framework-and-windows-live-writer-embedding"
pubDate: 2010-07-08T14:44:14.000Z
lastModified: 2019-10-23T04:20:36.000Z
categories:
  - "silverlight"
  - "codeplex"
  - "media"
  - "smf"
draft: false
---

<p>Yesterday (7-Jul-2010), the <a href="http://smf.codeplex.com"><strong>Silverlight Media Framework</strong></a> v2 was released on Codeplex (yeah, it’s Open Source).  If you aren’t familiar with it, it is a <a href="http://www.silverlight.net">Silverlight</a> framework encapsulating the best practices for media playback for Silverlight applications.  It is both a framework and, in v2, they also provided compiled simple player XAPs that you can just drop in HTML.  If you are building apps, you’ll want to take a look at the framework in more detail, but if you want a solid media player experience grab the players too.</p>  <p>Since I use <strong><a href="http://writer.live.com">Windows Live Writer</a></strong> as my blogging tool, I wanted to share my workflow for embedding videos into blog posts (or other content that I can author using Live Writer).  First, grab the necessary tools:</p>  <ul>   <li><a href="http://www.joecheng.com/code/DynamicTemplate/">Dynamic Template add-in for Writer</a> </li>    <li><a href="http://smf.codeplex.com/releases/view/48471">Silverlight Media Framework v2</a> Progressive Download template (and/or Smooth Streaming player) </li> </ul>  <p>Install the Dynamic Template add-in for Writer.  Next step is to put your ProgressiveDownloadPlayer.xap <em>somewhere</em>.  This doesn’t matter, as along as you know the URL to it.  I keep mine on my cloud storage share since I can re-use it in various places.  Once all those pieces are in place here is what I do.</p>  <h2>Step 1 – Create the Dynamic Template</h2>  <p>In order to create a template, you have to execute the <em>Insert</em> function for Dynamic Template to bring up the dialog.  Once there, choose to Edit Templates and give it a name.</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Dynamic Template insert dialog" alt="Dynamic Template insert dialog" src="http://storage2.timheuer.com/template-insert.png" /></p>  <p>Then in the template code, copy this HTML:</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">object</span> <span class="attr">data</span><span class="kwrd">="data:application/x-silverlight-2,"</span> <span class="attr">type</span><span class="kwrd">="application/x-silverlight-2"</span> <span class="attr">width</span><span class="kwrd">="640"</span> <span class="attr">height</span><span class="kwrd">="480"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="source"</span> <span class="attr">value</span><span class="kwrd">="URL_TO_YOUR_PLAYER_XAP"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="background"</span> <span class="attr">value</span><span class="kwrd">="white"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="enableHtmlAccess"</span> <span class="attr">value</span><span class="kwrd">="true"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="minRuntimeVersion"</span> <span class="attr">value</span><span class="kwrd">="4.0.50424.0"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="initParams"</span> <span class="attr">value</span><span class="kwrd">="MediaUrl=&lt;%= VideoUrl %&gt;,AutoPlay=false,ThumbnailUrl=&lt;%= ThumbnailUrl %&gt;"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="autoUpgrade"</span> <span class="attr">value</span><span class="kwrd">="true"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>   <span class="kwrd">&lt;</span><span class="html">a</span> <span class="attr">href</span><span class="kwrd">="http://go.microsoft.com/fwlink/?LinkID=149156&amp;amp;v=4.0.50424.0"</span> <span class="attr">style</span><span class="kwrd">="text-decoration:none"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>       <span class="kwrd">&lt;</span><span class="html">img</span> <span class="attr">src</span><span class="kwrd">="http://go.microsoft.com/fwlink/?LinkId=161376"</span> <span class="attr">alt</span><span class="kwrd">="Get Microsoft Silverlight"</span> <span class="attr">style</span><span class="kwrd">="border-style:none"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>   <span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span> <span class="kwrd">&lt;/</span><span class="html">object</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>And in the settings use these in this screenshot:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Code variables" alt="Code variables" src="http://storage2.timheuer.com/code-template-vars.png" /></p>

<p>Of course, replace with the URL to your player location.  That’s it, that is your template.</p>

<h2>Step 2 – Prepare your media</h2>

<p>I’m assuming that you already have media to display, but if you don’t, use your <a href="http://www.microsoft.com/expression/products/EncoderPro_Overview.aspx">favorite media encoding tool</a> to create the media and have the URL.  Note that it doesn’t have to be an absolute URL, but just understand the paths of your web app if you plan on using a relative URL.  Personally I recommend using an absolute one always.</p>

<p>Also the snippet above, while not required, implements the <em>ThumbnailUrl</em> (thanks <a href="http://twitter.com/sundriedcoder">Kevin</a>) parameter for the player.  You’ll need a URL to a thumbnail image for preview.</p>

<h2>Step 3 – Execute the template</h2>

<p>Now that you have the template, you can use it.  Rather than talk about it, here’s an embedded video (using the process) demonstrating the process :-)…</p>

<p><object data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="640" height="480">
  <param name="source" value="http://video.timheuer.com/players/smf/v2/ProgressiveDownloadPlayer.xap" />
  <param name="background" value="white" />
  <param name="enableHtmlAccess" value="true" />
  <param name="minRuntimeVersion" value="4.0.50424.0" />
  <param name="initParams" value="MediaUrl=http://video.timheuer.com/smfv2-writer.wmv,AutoPlay=false,ThumbnailUrl=http://storage2.timheuer.com/smfv2-howto-thumb.png" />
  <param name="autoUpgrade" value="true" />
  <a href="http://go.microsoft.com/fwlink/?LinkID=149156&amp;v=4.0.50424.0" style="text-decoration:none">
	  <img src="http://go.microsoft.com/fwlink/?LinkId=161376" alt="Get Microsoft Silverlight" style="border-style:none" />
  </a>
</object></p>

<p>Simple, huh? Now of course you cannot see the final result in Writer (not sure why actually but I think it has something to do with the rendering techniques they use in authoring mode (hence the white box in the vid), but you can see the end result!</p>

<h2>Summary</h2>

<p>Silverlight Media Framework is awesome.  Live Writer is awesome.  Awesome+Aweomse = Awesomely Awesome.  Kidding aside, if you have similar workflows to me, this should help you.  It has streamlined the content publishing process when I need it in a simple, but efficient way.</p>

<p>Hope this helps!</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:e53d2d33-db91-461d-b053-3369eca132ce" class="wlWriterEditableSmartContent"></div>
