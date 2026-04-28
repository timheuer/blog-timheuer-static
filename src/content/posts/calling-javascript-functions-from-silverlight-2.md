---
title: "Calling Javascript functions from Silverlight 2"
slug: "calling-javascript-functions-from-silverlight-2"
pubDate: 2008-03-09T10:08:20.000Z
lastModified: 2019-10-23T04:20:17.000Z
categories:
  - "silverlight"
  - "atlas"
  - "aspnet"
  - "ajax"
  - "script"
  - "javascript"
  - "html"
  - "silverlight 2"
  - "htmldocument"
  - "htmlpage"
  - "html dom"
draft: false
---

<p>When working with <strong></strong><strong><a href="http://silverlight.net/">Silverlight</a></strong><strong> 2</strong>, most will be working with managed code (c#, vb, etc.).  But likely people are working with Silverlight as an additive value to their web application, providing some enhanced user experience to an application.  there may be times where you will still need to call back into the hosting html context.  For then, you'll want to be familiar with two objects HtmlDocument and HtmlPage.  </p>
<p>Both of these objects provide access to the page context hosting your silverlight control.  If you need to seek things in the HTML DOM, you could use the HtmlDocument class.  For example, let's say I need to change the innerHTML property of some &lt;div&gt; element:</p>
<pre class="csharpcode"><span class="kwrd">using</span> System.Web.Browser;

HtmlDocument doc = HtmlPage.Document;
doc.GetElementById(<span class="str">"mydiv"</span>).SetProperty(<span class="str">"innerHTML"</span>, <span class="str">"&lt;b&gt;hello world&lt;/b&gt;"</span>);</pre>
<p>Also, i might want to interact with existing client-side functions, perhaps from <a href="http://ajax.asp.net">client-side frameworks</a> or other library utilities you might have developed on your own.  If I have a function on my page called "foo()" I would invoke it like this:</p>
<pre class="csharpcode"><span class="kwrd">using</span> System.Web.Browser;

HtmlPage.Window.CreateInstance(<span class="str">"foo"</span>);</pre>
<p>And if I had parameters in a function, like "foo2(theAlert)," I would invoke it like this:</p>
<pre class="csharpcode"><span class="kwrd">using</span> System.Web.Browser;

HtmlPage.Window.CreateInstance(<span class="str">"foo2"</span>, <span class="kwrd">new</span> <span class="kwrd">string</span>[] { <span class="str">"tim heuer"</span> });</pre>
<p>This may not be the norm with your Silverlight project, but I hope this helps clear some things up!  I am including the "using" statements in my c# samples so you know where in the namespace the class library exists.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:d5e0fece-346b-4c0f-a776-36108c251786" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
