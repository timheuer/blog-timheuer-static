---
title: "rss and json format"
slug: "convert-rss-to-json-using-asp-net-javascript-ajax"
pubDate: 2007-08-29T16:09:01.000Z
lastModified: 2019-10-23T04:20:08.000Z
categories:
  - "json"
  - "atlas"
  - "asp.net"
  - "aspnet"
  - "rss"
  - "asp.net ajax"
  - "javascript"
draft: false
---

<p>i was working on a little sample and wanted to make it a bit easier on myself to work with my rss data.  my thought was to use the JSON format for the data and that way i could get at the data in super-cool-ajaxy-type ways.  what was cool was what i found as i began searching.</p>
<p><a href="http://ajax.asp.net">ASP.NET Ajax</a> provides a class library to javascript!  in System.Web.Script.Serialization.JavascriptSerializer is where you will find your magic.  the JavascriptSerializer can be used on anything that uses XmlSerialization.  sweet.</p>
<p>so now all i had to do was take my RSS data (already in good xml format) and serialize that to xml.  once the rss is in a strongly typed respresentation using XmlSerialization, then i can pass that object to the JavascriptSerializer and voila...json formatted representation.</p>
<p>so my rss:</p>
<pre class="csharpcode"><span class="kwrd">&lt;?</span><span class="html">xml</span> <span class="attr">version</span><span class="kwrd">="1.0"</span> <span class="attr">encoding</span><span class="kwrd">="UTF-8"</span>?<span class="kwrd">&gt;</span> <span class="kwrd">&lt;</span><span class="html">channel</span><span class="kwrd">&gt;</span> <br /><span class="kwrd">&lt;</span><span class="html">title</span><span class="kwrd">&gt;</span>Method ~ of ~ failed<span class="kwrd">&lt;/</span><span class="html">title</span><span class="kwrd">&gt;</span> <span class="kwrd">&lt;</span><span class="html">link</span><span class="kwrd">&gt;</span>http://timheuer.com/blog/Default.aspx<span class="kwrd">&lt;/</span><span class="html">link</span><span class="kwrd">&gt;</span> <br /><span class="kwrd">&lt;</span><span class="html">description</span><span class="kwrd">&gt;</span>ramblings from the digital underbelly<span class="kwrd">&lt;/</span><span class="html">description</span><span class="kwrd">&gt;</span> <br /><span class="kwrd">&lt;</span><span class="html">language</span><span class="kwrd">&gt;</span>en-US<span class="kwrd">&lt;/</span><span class="html">language</span><span class="kwrd">&gt;</span> <span class="kwrd">&lt;</span><span class="html">copyright</span><span class="kwrd">&gt;</span>timheuer<span class="kwrd">&lt;/</span><span class="html">copyright</span><span class="kwrd">&gt;</span> <br /><span class="kwrd">&lt;</span><span class="html">managingEditor</span><span class="kwrd">&gt;</span>tim@timheuer.com<span class="kwrd">&lt;/</span><span class="html">managingEditor</span><span class="kwrd">&gt;</span> <br /><span class="kwrd">&lt;</span><span class="html">generator</span><span class="kwrd">&gt;</span>Subtext Version 1.9.5.176<span class="kwrd">&lt;/</span><span class="html">generator</span><span class="kwrd">&gt;</span> ...</pre>
<p>becomes:</p>
<pre class="csharpcode">{<span class="str">"Version"</span>:<span class="str">"2.0"</span>,<span class="str">"Channel"</span>:{<span class="str">"Categories"</span>:[],<span class="str">"Cloud"</span>:<span class="kwrd">null</span>,<br /><span class="str">"Copyright"</span>:<span class="str">"timheuer"</span>,<span class="str">"Description"</span>:<span class="str">"ramblings from the digital underbelly"</span>,<br /><span class="str">"Docs"</span>:<span class="kwrd">null</span>,<span class="str">"Generator"</span>:<span class="str">"Subtext Version 1.9.5.176"</span>, ...</pre>
<p>wicked.  i put this in an asp.net handler file for me so now i can easily reference some rss data and immediately get back json data to work with, something like:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">src</span><span class="kwrd">="http://mysite/rss2json.ashx?u=http://feeds.feedburner.com/timheuer"</span><span class="kwrd">&gt;&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>
<p>you can get an rss serializer with this function built in over at <a href="http://blogs.msdn.com/shahpiyush/archive/2007/04/12/2103116.aspx">piyush's blog</a>.  very cool, now i can move on to my next step...</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:7a611dc9-25fa-461a-a1c3-d0c122413c35" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
