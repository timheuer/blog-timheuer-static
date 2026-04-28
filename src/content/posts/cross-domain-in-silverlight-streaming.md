---
title: "Cross domain in Silverlight Streaming"
slug: "cross-domain-in-silverlight-streaming"
pubDate: 2008-04-09T12:39:25.000Z
lastModified: 2019-10-23T04:20:18.000Z
categories:
  - "silverlight streaming"
  - "silverlight"
  - "manifest"
  - "cross domain"
  - "clientaccesspolicy"
  - "sls"
draft: false
---

<p>In my <a href="http://timheuer.com/blog/archive/2008/04/06/silverlight-cross-domain-policy-file-snippet-intellisense.aspx">previous post about cross-domain policy files</a> I received some comments about whether or not cross-domain access is allowed on <strong>Silverlight Streaming</strong>.  I think really this is two questions that I'll try to clarify here.</p>
<p><strong>What is Silverlight Streaming?</strong></p>
<p>For those who don't know, Microsoft provides anyone with an account to "stream" <strong><a href="http://silverlight.net/">Silverlight</a></strong> applications for free.  We'll give you 10GB of space to put your Silverlight applications.  There are some limitations, which you can read about in the service.  The "streaming" name has confused some.  It isn't only a "where can I put media files" location, but is a service to "stream" your entire Silverlight application.  You can have a media player, or a hello world textbox...no matter.  If you haven't checked it out, <a href="http://silverlight.live.com">sign up</a>.</p>
<p><strong>Does Silverlight Streaming support cross domain calls from Silverlight?</strong></p>
<p>This really has to do with the <a href="http://dev.live.com/silverlight/">Silverlight Streaming API</a>.  Silverlight Streaming provides an API to manage your applications.  You can perform various activities on your Silverlight Streaming account through this API such as managing your applications, requesting files, etc.</p>
<p>Now I'm not sure why you would want to access the API <em>from a Silverlight application</em>, but I will say that the in order for this to happen (as noted in my post about cross domain access), the service would have to host a policy file at the end point.  Silverlight Streaming currently does not have that policy file.</p>
<p><strong>Can my application hosted in Silverlight Streaming access cross domain services?</strong></p>
<p>This is what I think the question really is in the comments.  Yes.  Provided that the service you are accessing has a clientaccesspolicy.xml file at the root of the site, then yes it could.  I whipped up a quick DataGrid sample and put it on my Silverlight Streaming account.  This is a Silverlight 2 application (xap) that calls the MSN Video POX service via a WebClient call.  I take the information and bind it to a DataGrid.  So this application below is hosted in Silverlight Streaming, calling a 3rd party service (which has a policy file enabled) and embedded within my blog post here.</p>
<p><iframe style="WIDTH: 500px; HEIGHT: 400px" src="http://silverlight.services.live.com/invoke/217/XDomainSample/iframe.html" frameborder="0" scrolling="no"></iframe></p>
<p>I hope that makes it a little clear that yes you can do this with your apps.</p>
<p><strong>How did you get a Silverlight 2 application on Silverlight Streaming?</strong></p>
<p>Very easily.  Just a bit after <strong>MIX08</strong>, the SLS team added support for Silverlight 2 Beta 1 applications.  You can read <a href="http://dev.live.com/blogs/sls/archive/2008/03/18/225.aspx">about it here</a>, but here is the manifest I used for the application you see above:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">SilverlightApp</span><span class="kwrd">&gt;</span>
   <span class="kwrd">&lt;</span><span class="html">version</span><span class="kwrd">&gt;</span>2.0<span class="kwrd">&lt;/</span><span class="html">version</span><span class="kwrd">&gt;</span>
   <span class="kwrd">&lt;</span><span class="html">source</span><span class="kwrd">&gt;</span>StreamingCrossDomain.xap<span class="kwrd">&lt;/</span><span class="html">source</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">SilverlightApp</span><span class="kwrd">&gt;</span></pre>
<p>I added that manifest.xml and my StreamingCrossDomain.xap file to a zip, uploaded it to my account and done.</p>
<p>Hope this helps!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:2182802d-0c92-4554-83e9-d6f7e17d3937" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
