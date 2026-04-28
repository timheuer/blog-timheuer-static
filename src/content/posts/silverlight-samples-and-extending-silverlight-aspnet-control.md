---
title: "Awesome Silverlight Samples"
slug: "silverlight-samples-and-extending-silverlight-aspnet-control"
pubDate: 2008-03-11T20:33:51.000Z
lastModified: 2019-10-23T04:20:17.000Z
categories:
  - "silverlight"
  - "asp.net"
  - "aspnet"
  - "pete brown"
  - "cameron albert"
draft: false
---

<p>I just saw two links that I simply have to promote as they are very helpful to people doing <strong><a href="http://silverlight.net/">Silverlight</a> </strong>development and one specifically with <strong>ASP.NET</strong>.</p>
<p>The first is a site on silverlight.net (you should bookmark this site as a resource and subscribe to all the feeds), there is now a <a href="http://silverlight.net/Samples/2b1/SilverlightControls/run/default.html">Silverlight 2 Beta 1 control sample page</a>, which hosts all the new Silverlight controls on the site.  It shows some different usage of all the controls:</p>
<p><img alt="Silverlight Controls Sample" src="http://s3.amazonaws.com:80/codetrip/slcontrolssample.png" /></p>
<p>Very cool to see all the controls implemented in one section, play around with them and see different styles in some as well.</p>
<p>The second link is awesome because when I read it I laughed out loud.  The reason wasn't because of the post, but because of a conversation I had with <strong><a href="http://community.irritatedvowel.com/blogs/pete_browns_blog/default.aspx">Pete Brown</a> </strong>over email.  It is best described simply by showing you the email (privacy information blurred to protect the innocent):</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/petebrownconversation.png" /></p>
<p>Alas, <a href="http://www.cameronalbert.com/post/2008/03/lt3baspSilverlight-gt3b-Override.aspx">Cameron Albert created an &lt;asp:Silverlight&gt; override control</a> that enables using the control and supplying a splash screen XAML file and event handler.  This is great!  It enables you to still use the server control with ease but adds some customized functionality so that you can enhance the user load experience.  Essentially it boils down to:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">lg:Silverlight</span> <span class="attr">ID</span><span class="kwrd">="silverlight1"</span> <span class="attr">runat</span><span class="kwrd">="server"</span> <span class="attr">Source</span><span class="kwrd">="~/ClientBin/Perenthia.xap"</span> 
                <span class="attr">Version</span><span class="kwrd">="2.0"</span> <span class="attr">Width</span><span class="kwrd">="800"</span> <span class="attr">Height</span><span class="kwrd">="500"</span> <span class="attr">SplashScreenSource</span><span class="kwrd">="~/Common/Xaml/Splash.xaml"</span> 
                <span class="attr">OnSourceDownloadProgressChanged</span><span class="kwrd">="onSourceDownloadProgressChanged"</span> <span class="kwrd">/&gt;</span></pre>
<p>Anyhow, I couldn't help but laugh when I saw that -- but it is a great post and control!  Great job Cameron!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:9550dce2-b5fb-4cf3-ad78-465ece6118b6" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
