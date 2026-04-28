---
title: "Embedding fonts in Silverlight 2"
slug: "embedding-fonts-in-silverlight-2"
pubDate: 2008-03-10T22:36:29.000Z
lastModified: 2019-10-23T04:20:17.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "silverlight 2"
  - "embed fonts"
  - "fontfamily"
  - "setfontsource"
draft: false
---

<p><span style="font-weight: bold;">UPDATE: The supported method for Silverlight 2 release is shown here: <a href="http://silverlight.net/learn/learnvideo.aspx?video=69800">http://silverlight.net/learn/learnvideo.aspx?video=69800</a>.  You basically have to make it an assembly resource.</span><br />
</p>
<p>Since the beginning of <strong><a href="http://silverlight.net/">Silverlight</a></strong> you've been able to embed fonts within a Silverlight application.  The challenge in version 1.0 was that you essentially had to use a <strong>downloader</strong> and some SetFontSource methods on a <strong>TextBlock</strong> (for example) to do it.  I <a href="http://timheuer.com/blog/archive/2007/08/29/embedding-fonts-with-silverlight-and-user-controls-rss-json.aspx">wrote about this a while back when using my own handwriting as a font</a> within Silverlight.  </p>
<p>It looked something like this:</p>
<pre class="csharpcode"><span class="kwrd">this</span>.downloader = control.createObject(<span class="str">"downloader"</span>);  <br /><span class="kwrd">this</span>.downloader.addEventListener(<span class="str">"completed"</span>, <br />     Silverlight.createDelegate(<span class="kwrd">this</span>, <span class="kwrd">this</span>.handleFontDownloaded));  <br /><span class="kwrd">this</span>.downloader.open(<span class="str">"GET"</span>, <span class="str">"timheuer.ttf"</span>);  <br /><span class="kwrd">this</span>.downloader.send();<br /><br />handleFontDownloaded: <span class="kwrd">function</span>(sender, eventArgs) <br />{   <br />    <span class="kwrd">this</span>.header.setFontSource(sender);   <br />    <span class="kwrd">this</span>.itemtext.setFontSource(sender);   <br />    <span class="kwrd">this</span>.header.fontFamily = <span class="str">"Tim Heuer Normal"</span>;   <br />    <span class="kwrd">this</span>.itemtext.fontFamily = <span class="str">"Tim Heuer Normal"</span>; <br />}</pre>
<p>It isn't incredibly ideal for all situations.  It works, and in some scenarios might be valid and fine.</p>
<p>For most, I think we'll want an easier implementation and something that feels a bit more natural.  Well, in Silverlight 2, we now have it.  Let's take a look at the above sample and how we could do that for Silverlight 2:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="Header"</span> <span class="attr">FontFamily</span><span class="kwrd">="timheuer.ttf#Tim Heuer Normal"</span> <span class="kwrd">/&gt;</span> <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="ItemText"</span> <span class="attr">FontFamily</span><span class="kwrd">="timheuer.ttf#Tim Heuer Normal"</span> <span class="kwrd">/&gt;</span></pre>
<p>Okay, so what is happening here?  What happened to the script?  There is none (obviously).  What is happening here is that Silverlight now does the lifting for you.  Let's break this down a bit more.</p>
<p>First, the FontFamily is set to "timheuer.ttf" in this example, which is my handwriting font in TrueType format.  This font is located next to the applications XAP file which is in ClientBin.  It could be located anywhere in the same application domain and you could use an absolute URL here as well.  For our purposes, we have a file on a web server.</p>
<p>When we set that in the FontFamily to a file, Silverlight essentially creates the downloader for us in an efficient manner.  The font file is requested based on the URI provided and downloaded via a GET request.  Once downloaded it parses out the second part (the "#") to look within that font file for the <strong>named</strong> font.  So essentially the format is:</p>
<p>&lt;file&gt;#&lt;named-font&gt;</p>
<p>where # is the delimiter in this format.  That's it, you are done.  No script needed.  If you choose to package several font assets within your application you can put them in a single archive file as well and the same syntax would apply:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="Header"</span> <span class="attr">FontFamily</span><span class="kwrd">="timheuer.zip#Tim Heuer Normal"</span> <span class="kwrd">/&gt;</span></pre>
<p>The same execution happens.  Silverlight gets the archive file and then looks at the font file contents in the archive to find the first named font to use.  The archive doesn't have to only have font files either...which is cool at times.</p>
<p>Hope this helps!</p>
<div style="margin: 0px; padding: 0px; display: inline;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:6ffcd965-357d-4b8c-a2ef-24666a55f664" class="wlWriterSmartContent"></div>
