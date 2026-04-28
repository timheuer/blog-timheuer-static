---
title: "Calling services from Silverlight 2 part 2"
slug: "calling-services-with-silverlight-part-2"
pubDate: 2008-03-19T08:25:41.000Z
lastModified: 2019-10-23T04:20:17.000Z
categories:
  - "silverlight"
  - "flickr"
  - "linq"
  - "wcf"
  - "rest"
  - "asmx"
  - "web service"
  - "crossdomainxml"
  - "cross domain"
draft: false
---

<p>In a <a href="http://timheuer.com/blog/archive/2008/03/14/calling-web-services-with-silverlight-2.aspx">previous post, I wrote about some samples of calling various types of services from Silverlight 2</a>.  In the code, I was using constructors in my ASMX and <strong>WCF</strong> services with specifying a binding type and endpoint address.</p>
<p>It was called out to me that in other demonstrations, people did not use this construct.  While the method I demonstrated works (explicitly specifying the binding and endpoint), in some cases it may not be necessary.  One such case would be if you only have one endpoint and it is <strong>basicHttpBinding</strong>.</p>
<p>The error in my code/instructions was about changing the binding information in web.config.  The information is correct, however I wasn't clear on when/what you needed to do.  For example, the default information in web.config for the <strong><a href="http://silverlight.net/">Silverlight</a></strong> project created for you uses wsHttpBinding.  If you add a service reference in your Silverlight project <strong><em>PRIOR</em></strong> to changing that binding information, your generated proxy will require you to specify a binding and endpoint as Silverlight doesn't support wsHttpBinding and it would be trying to use that as a default method.</p>
<p>So the appropriate way is to change the binding type in your web.config <strong><em>FIRST</em></strong>.  Then generate the service reference in your Silverlight application and your proxy code generated will then allow you to new up the service using:</p>
<pre class="csharpcode">WcfServiceClient wcf = <span class="kwrd">new</span> WcfServiceClient();</pre>
<p>for both WCF and ASMX services...which is probably more familiar to most web developers implementing services in their applications.</p>
<p>Again, EITHER way is fine.  Providing no information in the constructor will use the default binding/endpoint information for that service, and if it isn't supported, you'll get a nasty exception.  Whether or not it is best practice to always explicitly call it out in your code is up to you.  I'd argue it is.  In looking at the code above do you know what binding/endpoint is being used at the time of the service call?  No.  You could make some reasonable assumptions (hey, I'm in Silverlight and I know I must use basicHttpBinding), but for maintainability, maybe someone else coming to the code doesn't have the same understanding.</p>
<p>To each his own.  Either way, I hope this clarifies and I've <a href="http://timheuer.com/blog/archive/2008/03/14/calling-web-services-with-silverlight-2.aspx">updated my post</a> with the note about this as well.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:1f300a86-d182-47e2-8631-ecc867a15c4b" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
