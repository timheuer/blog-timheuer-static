---
title: "phoenix silverlight user group"
slug: "phoenix-silverlight-user-group-recap-feb"
pubDate: 2008-02-07T08:55:56.000Z
lastModified: 2019-10-23T04:20:16.000Z
categories:
  - "silverlight"
  - "xaml"
  - "plugin"
  - "user group"
  - "phoenix silverlight"
  - "imagesource"
  - "browser"
draft: false
---

<p><img style="MARGIN: 0px 10px 0px 0px" alt="Phoenix Silverlight User Group logo" align="left" src="http://s3.amazonaws.com/timheuer-img/silverlightUGwithText_6.jpg" />i was able to make it to the <strong><a href="http://tech.groups.yahoo.com/group/phoenix_silverlight">phoenix silverlight user group</a></strong> last night (2 separate trips downtown, yikes) and had a good time chatting with everyone there.  i understand that there will NOT be a separate march meeting because it essentially falls very close to when <strong></strong><a href="http://upcoming.yahoo.com/event/414413/">scott guthrie and others will be coming to town</a>.  the group is recommending that people attend that to learn the latest and greatest about <strong><a href="http://silverlight.net/">silverlight</a></strong> 2 right out of <strong><a href="http://visitmix.com/2008/default.aspx">MIX</a></strong>!  we had a good discussion about various things.  <strong><a href="http://weblogs.asp.net/palermo4">mike palermo</a></strong> showed a couple of things he'd been working on including a simple game and a magnifier for photos (similar to the one <a href="http://blogs.msdn.com/synergist">michael</a> has for video).  the concept was that you have a high resolution image on the page and then he had a magnification bubble that would react to the mouse wheel event on a mouse to zoom in/out of a selected area.  it looked in concept a lot of what like the <a href="http://labs.live.com/Seadragon.aspx">Live Labs 'Seadragon'</a> project describes as far as smooth zooming, etc.</p>
<p>one of the things mike did in this image magnifier is use a high-res image and basically clip it to the area being zoomed on for the mouse using transforms, etc.  i asked mike if he was using another image element or using an imagebrush.  i noted that i felt he should use an image brush rather than to use an existing image so that the image wasn't requested twice.  this is the efficient way of doing it when working with MediaElements and VideoBrushes so that the video in the brush is in sync as well as efficiently processed.  we worked up some pseudo code on the board real quick to describe what i was talking about.</p>
<p>well, i was slightly wrong.  the imagebrush element doesn't use 'sourcename' like a videobrush.  in videobrush you use the x:Name value of your mediaelement.  in the imagebrush you specify the actual image location (ImageSource).  i guess this somewhat surprised me so i started sniffing (thinking i made a mistake in my 'efficiency' statement.  when looking at the result of something like this:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">Image</span> <span class="attr">Width</span><span class="kwrd">="240"</span> <span class="attr">Height</span><span class="kwrd">="121"</span> <span class="attr">Source</span><span class="kwrd">="silverlightUGwithText_6.jpg"</span> 
         <span class="attr">Stretch</span><span class="kwrd">="Fill"</span> <span class="attr">x:Name</span><span class="kwrd">="PhxUgLogo"</span> 
         <span class="attr">Canvas</span>.<span class="attr">Top</span><span class="kwrd">="102"</span> <span class="attr">Canvas</span>.<span class="attr">Left</span><span class="kwrd">="132"</span><span class="kwrd">/&gt;</span>
  <span class="kwrd">&lt;</span><span class="html">Ellipse</span> <span class="attr">Width</span><span class="kwrd">="107"</span> <span class="attr">Height</span><span class="kwrd">="107"</span>
           <span class="attr">Stroke</span><span class="kwrd">="#FFEC1818"</span> <span class="attr">Canvas</span>.<span class="attr">Left</span><span class="kwrd">="224"</span> <span class="attr">Canvas</span>.<span class="attr">Top</span><span class="kwrd">="250"</span>
           <span class="attr">StrokeThickness</span><span class="kwrd">="5"</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">Ellipse.Fill</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">ImageBrush</span> <span class="attr">ImageSource</span><span class="kwrd">="silverlightUGwithText_6.jpg"</span> 
                  <span class="attr">Stretch</span><span class="kwrd">="None"</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">ImageBrush.RelativeTransform</span><span class="kwrd">&gt;</span>
          <span class="kwrd">&lt;</span><span class="html">TransformGroup</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">ScaleTransform</span> <span class="attr">ScaleX</span><span class="kwrd">="1.4"</span> <span class="attr">ScaleY</span><span class="kwrd">="1.4"</span><span class="kwrd">/&gt;</span>
          <span class="kwrd">&lt;/</span><span class="html">TransformGroup</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;/</span><span class="html">ImageBrush.RelativeTransform</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">ImageBrush</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">Ellipse.Fill</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;/</span><span class="html">Ellipse</span><span class="kwrd">&gt;</span></pre>
<p>there are actually 2 HTTP requests to the image source.  you can see them being requested.  what i've learned is that silverlight maintains an internal image cache anyway so the second request (although there and happening), would see the cached image instead.  so it looks like the method of using two Image elements would have the same effect...so given that i'm not sure either is 'better' than the other for doing this type of sample...what do you think?  regardless it was a cool demo.  thanks mike.</p>
<p>we talked a lot about why people are waiting for silverlight 2 and if that made sense.  we also had a good discussion of 'what if i just have casual media on my home page, why silverlight instead of flash' which is a question i hear a lot.  this discussion never revolves around technical issues (noted i said 'casual media' instead of high fidelity streaming, etc.) but rather around penetration of the plugin.  a lot of sites don't want to bear the load of plugin download/installation.  it's an interesting challenge when any new technology comes out and no different a discussion than when the .net framework first came out -- which 'app' was going to bear the installation tax in their app?  good discussion.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:4dd04828-7733-4b46-a949-1237d19111ce" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
