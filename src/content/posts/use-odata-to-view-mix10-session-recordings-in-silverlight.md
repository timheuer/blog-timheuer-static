---
title: "MIX10: Yet another way to view video content sessions using their OData feed"
slug: "use-odata-to-view-mix10-session-recordings-in-silverlight"
pubDate: 2010-03-24T15:17:06.000Z
lastModified: 2019-10-23T04:20:34.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "mix"
  - "ria"
  - "visitmix"
  - "riaservices"
  - "mix10"
  - "wp7dev"
  - "wp7"
  - "windows-phone"
draft: false
---

<p>Well, MIX10 is over.  It was a great time to meet a lot of people and see friends from afar.  As anyone knows, the networking is a HUGE part of being <strong><em>in-person</em></strong> at any conference…that vibe, value and friendship cannot be matched online.</p>
<p>But the sessions – there were a TON of them.  It is quite impossible to be in 3 places at one time.  Thankfully the MIX team record all regular sessions and make them available for viewing online or offline.  For you <a href="http://silverlight.net">Silverlight</a> developers here are my picks to ensure you watch:</p>
<ul>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/EX55">EX55: Building the eBay Simple Lister</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL13">CL13: Overview of the Windows Phone 7 Application Platform</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/EX14">EX14: Understanding the Model-View-ViewModel Pattern</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL24">CL24: The Microsoft Silverlight Analytics Framework</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL02">CL02: Authoring for Windows Phone, WPF and Silveright with Expression Blend</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL10">CL10: Stepping outside the browser with Silverlight 4</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL08">CL08: Microsoft Silverlight 4 Business Applications</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL16">CL16: Building Windows Phone Applications with Silverlight</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL09">CL09: Developing with WCF RIA Services Quickly and Effectively</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL59">CL59: Unit Testing Silverlight and Windows Phone Applications</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL51">CL51: Building an Accessible Microsoft Silverlight Experience</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL52">CL52: Microsoft Silverlight Optimization and Extensibility with MEF</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL60">CL60: Silverlight Performance on Windows Phone</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/EX07">EX07: Principles of Microsoft Silverlight Graphics and Animation</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL50">CL50: Search Engine Optimization with Silverlight</a> </li>
    <li><a href="http://live.visitmix.com/MIX10/Sessions/CL58">CL58: Accessing Web Services in Silverlight</a> </li>
</ul>
<p>And there are many more…</p>
<p>Since OData was a big part of MIX10 this year, I thought I’d make this easier for you to get all the MIX10 Silverlight-specific videos (my pics above and all tagged with Silverlight).  </p>
<p><strong><em>Yes, this is yet another way to get access to the MIX videos.</em></strong></p>
<p>The site’s RSS feed will get you *all* of MIX sessions, but you may not want that.  Unfortunately they don’t expose tag-specific RSS feeds.  Fortunately though, they DO have an OData feed available for us.  I thought I’d have some fun and play around with that.</p>
<h2>MIX10 Online Silverlight Viewer</h2>
<p><em>If I were the visitmix.com team</em> – I’m sure they love to hear that.  But look at the list above.  If you watched each one of these, you’d be clicking a lot and going from page to page.  Why not treat them like a video library?  Let me see the ‘guide’ in one place and choose which ‘channel’ I want to watch, allowing me to switch channels quickly.  This was my vision:</p>
<p><a href="http://timheuer.com/silverlight/mixviewer"><img border="0" src="http://storage.timheuer.com/mixviewer-snap.jpg" alt="MIX10 Session Viewer" title="MIX10 Session Viewer" style="border: 0px none; margin: 0px auto; display: block; float: none;" /></a></p>
<p>Since their OData feed was exposed I could create queries to get to the list of sessions, details and video URIs.  I could (and would like) to do a lot more as far as adding a filter by tags, creating a playlist and then just hitting play, etc.  But you know, I was just tinkering.</p>
<p>I will have to say that the OData querying got me frazzled in some places.  OData is SUPER easy for single entity stuff, but trying to understand building up a relational query got me messed up at times since ‘normal’ LINQ querying wasn’t always supported in a translation to a URI query.  Special thanks to <a href="http://www.lostintangent.com">Jonathan Carter</a> (<a href="http://twitter.com/lostintangent">@lostintangent</a>) and <a href="http://www.chriswoodruff.com/">Chris Woodruff</a> (<a href="http://twitter.com/cwoodruff">@cwoodruff</a>) for being my ears of frustration and helping me get the right queries (didn’t end up implementing them all).</p>
<p>The <a href="http://timheuer.com/silverlight/mixviewer">sample MIX Viewer can be seen here</a> and supports multi-monitor full-screen pinning (requires Silverlight 4).  So you can start a video on your 2nd monitor and go to full-screen on that one while still working on the other.</p>
<h2>Tag-specific podcast feeds for MIX10 videos</h2>
<p>While the MIX team does have RSS feeds for the videos, they are all-inclusive.  I would really like to have tag-specific feeds…let me search on a tag, then generate a podcast feed based on the result.  </p>
<p>Well, I did just that.  Since they expose the feed, I could use Yahoo Pipes to do some quick manipulation in a ‘no-code’ sort of way (yes I could have used OData, etc. blah blah – look, this was no-code/tools…just a few clicks).</p>
<p>So I created a podcast feed for anyone who wants to use it.  Here’s the Silverlight feed links you can use to paste into your iTunes or Zune or whatever podcast software:</p>
<ul>
    <li><a href="http://pipes.yahoo.com/pipes/pipe.run?MediaType=WMVHigh&amp;Tag=Silverlight&amp;_id=2cf69ebc6e9c4f0a1ea4bc76cfd273df&amp;_render=rss">WMV High Quality ‘Silverlight’ tagged sessions</a> </li>
    <li><a href="http://pipes.yahoo.com/pipes/pipe.run?MediaType=WMV&amp;Tag=Silverlight&amp;_id=2cf69ebc6e9c4f0a1ea4bc76cfd273df&amp;_render=rss">WMV standard quality ‘Silverlight’ tagged sessions</a> </li>
    <li><a href="http://pipes.yahoo.com/pipes/pipe.run?MediaType=MP4&amp;Tag=Silverlight&amp;_id=2cf69ebc6e9c4f0a1ea4bc76cfd273df&amp;_render=rss">MP4 (iPod) ‘Silverlight’ tagged sessions</a> </li>
</ul>
<p>If you look at the URI:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> http://pipes.yahoo.com/pipes/pipe.run?MediaType=WMV&amp;Tag=Silverlight&amp;_id=2cf69ebc6e9c4f0a1ea4bc76cfd273df&amp;_render=rss</pre>
<!--CRLF--></div>
</div>
<p>You’ll notice that you can just substitute the format (WMV, WMVHigh, or MP4) and the tag.  This will give you your own custom feed for your topic. </p>
<p>Anyhow, I really enjoyed MIX and have been catching up on all the sessions I missed.  Hope this helps you get caught up as well! </p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:d08c72df-68c8-49d3-a557-81572c27011a" style="padding: 0px; margin: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
