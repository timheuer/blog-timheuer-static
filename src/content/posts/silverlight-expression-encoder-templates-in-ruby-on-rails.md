---
title: "jumbling the encoder silverlight template files"
slug: "silverlight-expression-encoder-templates-in-ruby-on-rails"
pubDate: 2008-01-15T16:52:17.000Z
lastModified: 2019-10-23T04:20:15.000Z
categories:
  - "silverlight"
  - "wpf"
  - "expression"
  - "xaml"
  - "ruby on rails"
  - "rails"
  - "overview.aspx"
  - "expression encoder"
  - "mediaelement"
  - "encoder"
  - "ror"
  - "startplayer.js"
draft: false
---

<p>i recently got an email from a <a rel="tag" href="http://rubyonrails.org"><strong>rails</strong></a> developer who was using <a rel="tag" href="http://silverlight.net/"><strong>silverlight</strong></a> on a site to display high-quality media.  what?! you though silverlight was a windows-only technology? blasphemy!  you see, silverlight is a client-technology, which means as long as it can be served up to the browser (and the user has the plugin), the <a href="http://timheuer.com/blog/archive/2007/08/23/silverlight-hosting-on-linux-apache-osx-streaming.aspx">server can be your own custom version</a> of l337hax0r web edition or whatever.  now, there are advantages of using <strong>internet</strong> information services on windows and some integration with asp.net, but that's not what this post is about.  on to the issue at hand will you...</p>
<p>so the email...he was getting an error message:</p>
<blockquote>
<p>ActionController::RoutingError (No route matches "/player.xaml" with {:method=&gt;:get}):</p>
</blockquote>
<p>now i'm not incredibly familiar with what web server configuration he is running (although he is running netbeans/mongrel), but it got me thinking of 2 things.  first, maybe he needed to add a mime mapping.</p>
<blockquote>
<p>for silverlight, the following MIME map is for .xaml files: .xaml: application/xaml+xml</p>
</blockquote>
<p>but then i also thought that it might be something of some files moved around and such.  i deduced from his note that an <strong><a rel="tag" href="http://www.microsoft.com/expression/products/overview.aspx?key=encoder">expression encoder</a></strong> template was being used as he mentioned he moved the javascript files to the javascripts directory of his rails application.  for those who don't know, rails is an MVC pattern web framework.  when creating a rails application you get a few different folders created for you (note: i'm just talking rails foo command here).  a lot of the work is done in controllers/models/views folder but there is also a folder called public.  within there are your typical images and javascripts type folders.  basically you can think of public mapping to "/" for static files.</p>
<p>now most rails applications probably wouldn't want all the encoder output to be dumped into /public as-is.  if developers are anything like me (OCD about project folder organization), then you want *.js to be in one place, etc.  i suspected that my reader put all the encoder files in the /public/javascripts folder.  this would be fine and should work okay.  but lets say you want some organization.</p>
<p>for example, i want to put my .js files in /public/javascripts, my jpg/pngs in /public/images and i'm going to create a folder for my xaml and a folder for media (wmv).  great, so we move all the files around then we run the Default.html page.  nothing happens.  why?  well a few things need to change if you move things around.</p>
<p>first, you need your hosting page (in this case right now it is Default.html) to reference the right path to the javascript locations.  so in our example we'd modify (in Default.html) lines like:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">type</span><span class="kwrd">='text/javascript'</span> <span class="attr">src</span><span class="kwrd">="Silverlight.js"</span><span class="kwrd">&gt;&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>
&lt;script type=<span class="str">'text/javascript'</span> src=<span class="str">"BasePlayer.js"</span>&gt;<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>
<p>to this:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">type</span><span class="kwrd">='text/javascript'</span> <span class="attr">src</span><span class="kwrd">="javascripts/Silverlight.js"</span><span class="kwrd">&gt;&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span>
&lt;script type=<span class="str">'text/javascript'</span> src=<span class="str">"javascripts/BasePlayer.js"</span>&gt;<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>
<p>noting that of course there are more than just these two files.  now if we run the application it would still fail.  this is for two reasons, both of which are in StartPlayer.js.  the first is on or about line 8 of the script:</p>
<div class="csharpcode">
<pre><span class="lnum">   1:  </span> </pre>
<pre><span class="lnum">   2:  </span> </pre>
<pre><span class="lnum">   3:  </span> </pre>
<pre><span class="lnum">   4:  </span><span class="kwrd">function</span> get_mediainfo(mediainfoIndex) {</pre>
<pre><span class="lnum">   5:  </span>    <span class="kwrd">switch</span> (mediainfoIndex) {        </pre>
<pre><span class="lnum">   6:  </span> </pre>
<pre><span class="lnum">   7:  </span>        <span class="kwrd">case</span> 0:</pre>
<pre><span class="lnum">   8:  </span>            <span class="kwrd">return</span>  { <span class="str">"mediaUrl"</span>: <span class="str">"CodeTripSample.wmv"</span>,</pre>
<pre><span class="lnum">   9:  </span>                      <span class="str">"placeholderImage"</span>: <span class="str">"CodeTripSample_Thumb.jpg"</span>,</pre>
</div>
<p>the next is on or about line 24:</p>
<div class="csharpcode">
<pre><span class="lnum">  22:  </span><span class="kwrd">function</span> StartPlayer_0(parentId) {</pre>
<pre><span class="lnum">  23:  </span>    <span class="kwrd">this</span>._hostname = EePlayer.Player._getUniqueName(<span class="str">"xamlHost"</span>);</pre>
<pre><span class="lnum">  24:  </span>    Silverlight.createObjectEx( {   source: <span class="str">player.xaml'</span>, </pre>
</div>
<p>these both need to map to the right references of where that content has moved...so noting my above folder changes (images/javascripts/media/xaml) my StartPlayer.js file now starts like this:</p>
<div class="csharpcode">
<pre><span class="lnum">   1:  </span> </pre>
<pre><span class="lnum">   2:  </span> </pre>
<pre><span class="lnum">   3:  </span> </pre>
<pre><span class="lnum">   4:  </span><span class="kwrd">function</span> get_mediainfo(mediainfoIndex) {</pre>
<pre><span class="lnum">   5:  </span>    <span class="kwrd">switch</span> (mediainfoIndex) {        </pre>
<pre><span class="lnum">   6:  </span> </pre>
<pre><span class="lnum">   7:  </span>        <span class="kwrd">case</span> 0:</pre>
<pre><span class="lnum">   8:  </span>            <span class="kwrd">return</span>  { <span class="str">"mediaUrl"</span>: <span class="str">"media/CodeTripSample.wmv"</span>,</pre>
<pre><span class="lnum">   9:  </span>                      <span class="str">"placeholderImage"</span>: <span class="str">"images/CodeTripSample_Thumb.jpg"</span>,</pre>
<pre><span class="lnum">  10:  </span>                      <span class="str">"chapters"</span>: [               </pre>
<pre><span class="lnum">  11:  </span>                                  ] };                                                                </pre>
<pre><span class="lnum">  12:  </span>                          </pre>
<pre><span class="lnum">  13:  </span>        <span class="kwrd">default</span>:</pre>
<pre><span class="lnum">  14:  </span>             <span class="kwrd">throw</span> Error.invalidOperation(<span class="str">"No such mediainfo"</span>);</pre>
<pre><span class="lnum">  15:  </span>     }</pre>
<pre><span class="lnum">  16:  </span>}</pre>
<pre><span class="lnum">  17:  </span> </pre>
<pre><span class="lnum">  18:  </span><span class="kwrd">function</span> StartWithParent(parentId, appId) {</pre>
<pre><span class="lnum">  19:  </span>    <span class="kwrd">new</span> StartPlayer_0(parentId);</pre>
<pre><span class="lnum">  20:  </span>}</pre>
<pre><span class="lnum">  21:  </span> </pre>
<pre><span class="lnum">  22:  </span><span class="kwrd">function</span> StartPlayer_0(parentId) {</pre>
<pre><span class="lnum">  23:  </span>    <span class="kwrd">this</span>._hostname = EePlayer.Player._getUniqueName(<span class="str">"xamlHost"</span>);</pre>
<pre><span class="lnum">  24:  </span>    Silverlight.createObjectEx( {   source: <span class="str">'xaml/player.xaml'</span>, </pre>
</div>
<p>and all is well -- my rails app starts and my silverlight content is loaded.  my resulting rails app structure looks like this:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/railssilver.png" /></p>
<p>simple enough, but if you move things around you might not have known where you need to change things.  you may wonder why you don't have to change the MediaElement in the player.xaml file.  well, if you are using an expression encoder template, the Url of that element is controlled by the StartPlayer.js mediaUrl attribute being passed to the player.</p>
<p>so if you have static information for your rails app this would probably work fine for you, but i suspect your rails application might be using views and such.  so you'd probably want to ensure you are modifying the appropriate view in views/layouts to ensure the javascript reference is correct, etc.</p>
<p>hope this helps.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:23300fb6-ef29-4883-9352-597d1f20b7a1" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
