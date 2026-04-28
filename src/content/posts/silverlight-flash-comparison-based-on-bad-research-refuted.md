---
title: "Silverlight misconceptions, bad reviews, bad comparisons"
slug: "silverlight-flash-comparison-based-on-bad-research-refuted"
pubDate: 2009-08-21T08:05:43.000Z
lastModified: 2019-10-23T04:20:31.000Z
categories:
  - "silverlight"
  - "xaml"
  - "flash"
  - "adobe"
  - "ria"
draft: false
---

<p><strong>UPDATE: Michael has <a href="http://timheuer.com/blog/archive/2009/08/21/silverlight-flash-comparison-based-on-bad-research-refuted.aspx#13519">posted a comment</a> here and offered himself up to the gauntlet and apologized for his article.  He <a href="http://timheuer.com/blog/archive/2009/08/21/silverlight-flash-comparison-based-on-bad-research-refuted.aspx#13519">writes below</a>:</strong></p>
<blockquote><em><p>Tim did me a favor with this article, and his comments on Connected Internet. I have left the article up on Connected, because frankly, I deserve the lumps I get over it.</p></em></blockquote>
<p>Anyone who has spent more than 5 minutes talking with me, reading this blog, or listening to me on podcasts (<a href="http://herdingcode.com/?p=69">Herding Code</a>, <a href="http://thirstydeveloper.com/2009/08/10/71TalkingSilverlightWithTimHeuer.aspx">Thirsty Developer</a>, <a href="http://misfitgeek.com/podcast/misfit-geek-podcast/">Misfit Geek</a>) will know that I LOVE Microsoft.  I’m not ashamed to admit it and I’m not ashamed about my passion for the company or technology it produces.  I’m also not afraid to admit when and where we suck.  I don’t use every Microsoft product…if there are ones that I feel are better for how I use them, then I pick the better tools/technology.  There, bias stated.</p>
<p>I also think that I’m a fair person when it comes to comparisons and reviews and answering questions about competition, etc.  I welcome those conversations.  When I participate in them I do my best to be informed or point out where I’m not informed.  When not informed I try not to make definitive opinions until I have been informed by research or in trying it out for myself.</p>
<p>So you could imagine (like others) that I get frustrated when I see, hear, read things based on bad information, and what seems like no research has been done.  I’ve got thick skin, can usually comment and brush it off.  But today I read something that just triggered a twitch response in me that is making me reply.  It isn’t because of this post only, but because <a href="http://www.smashingmagazine.com/2009/05/09/flash-vs-silverlight-what-suits-your-needs-best/">others have written articles</a> on <a href="http://silverlight.net">Silverlight</a> that have used the same ill-informed bias.  The one that got me today was from Michael Lankton written for Connected Internet titled <em><a href="http://www.connectedinternet.co.uk/2009/08/20/10-reasons-why-flash-is-better-than-silverlight/">10 Reasons Why Flash is Better than Silverlight</a></em>.  Michael’s bio talks about him being an AV enthusiast and a corrections officer.  It briefly talks about him having ‘some coder and sysadmin in his history’ – here’s the full bio:</p>
<blockquote>
<p><em>About the Author: Michael was a bass player in a hardcore punk band in the 80's and spent the 90's building and riding custom Harleys. As strange a combination as it may seem, Mike also has some coder and sysadmin in his history as well. At 43 Mike's now a husband and dad, and works as a Corrections Officer in a maximum security lockdown unit by day, and is admin at AV Enthusiast and contributor to Connected Internet when time allows. Mike is also passionate about food and travel.</em></p>
</blockquote>
<p>So, bravo for Connected Internet for picking someone acutely aware of the landscape of the RIA space to do this comparison.  Oh wait.</p>
<p>A few people have commented on the post and JC being first had a lot of good points, refuting most of the bad information but Michael hasn’t corrected anything (despite saying so).  I’ve posted a comment offering to provide accurate information for him (and I’ll extend to anyone) in doing an evaluation.  You should be informed about the capabilities before doing things like this.  In that spirit, since there are some common misconceptions noted in Michael’s post that are incorrect, I had a moment of thought to note them (which others have already added their comments as well).</p>
<p>Michael’s intro paragraph says “<em>you have better options for embedding video and audio content into a web page”</em> than Flash or Silverlight.  Really?  Is this the wondrous HTML5 you speak of?  That isn’t complete, only supported in certain versions of browsers and requires likely a different encoding of the media than you already have?  Yeah, thought so.  Let’s be honest.  Flash and Silverlight are *the* ways to leverage media in mainstream applications today.  Are there alternatives?  Sure.  Are they more pervasive?  No.  On to the article after this little intro correction now.</p>
<p><strong>1. Platform compatibility.</strong>  </p>
<p><strong>MYTH</strong>: Michael notes the platform where we are supported and on Mac says “only just recently too.”  <br />
<strong>FACT</strong>: Silverlight has been supported on Mac platforms since it’s incarnation.  The current managed code versions are supported on Intel-based Macs only.  A simple check of the system requirements would have found this.</p>
<p>In the comments Michael states that what he meant by this is that .NET is required.  We’ll get to that in point 9.</p>
<p><strong>MYTH</strong>: Windows servers are required for Silverlight.    <br />
<strong>FACT</strong>: You could serve up Silverlight from your Samba share if you want.  Silverlight is a client technology…we don’t care what is on the server.  The only thing we require (for security) is that the XAP must be served with the right content MIME type (application/x-silverlight-app).  That’s it.  And every web server out there can have this MIME type.</p>
<p><strong>2. Market penetration.</strong></p>
<p>Our latest install statistics we see from our downloads, etc. as announced at MIX09 put us around 1/3 market penetration.  This is continuing to grow.  I honestly don’t have daily visibility to this number to give you current stats.  Michael makes a note “<em>Not sure about that, as some independent studies show it as low as 6%”</em> – um, cite the study?  If not, that’s a blatant assumption.  Heck even the much disputed riastats.com shows penetration at 34%.  Again, cite the source, or move along.  I even cite riastats.com here, although that’s not the benchmark that Microsoft uses…but at least I’m citing where I pull the number from (the 34% number, not the 1/3).</p>
<p><strong>3. 64-bit web browser support.</strong>  </p>
<p>It’s funny that in the comments Michael says to a commenter not to talk about beta technologies, yet in this point here that’s all the evidence he has: An alpha of Flash for 64-bit.  Silverlight doesn’t have a 64-bit plugin.  Neither does Flash.  Enough said.</p>
<p><strong>4. Supported image formats.</strong></p>
<p>I couldn’t find a definitive source on what image formats Flash officially supports with no extensibility, but I think it is JPG, PNG and GIF (someone cite a source if you have better data).  True, Silverlight doesn’t support GIF.  I’m not upset about it.  Guess what though…we have <a href="http://blogs.msdn.com/jstegman/archive/2008/10/30/updated-source-for-image-samples.aspx">an extensible platform and if you absolutely need to support your GIFs from 1997, you can</a>.</p>
<p><strong>5. Package Delivery.</strong></p>
<p><strong>MYTH</strong>: Silverlight files are loose and uncompressed.    <br />
<strong>FACT</strong>: Silverlight files are packaged into a XAP file which is a standard compressed/archive format.</p>
<p>In fact, just rename to .zip and use your favorite tool to see the contents.  If you think your favorite tool can get even better compression…feel free to recompress again.  We think we have decent improved compression.  </p>
<p>Oh and we also support cached assemblies, partitioning applications, and other techniques to minimize the size of your application base file.  This point tells me he’s evaluating on Silverlight 1.0 (which didn’t leverage the XAP package and was in fact loose files – which could be gzip/deflate compressed by the server btw).</p>
<p><strong>6. Audio.</strong></p>
<p><strong>MYTH</strong>: Silverlight does not support APIs for generating and controlling audio.    <br />
<strong>FACT</strong>: Silverlight has a MediaElement control for controlling audio/video, MediaStreamSource API for providing your own decode/logic and APIs for RAW audio, video stream.  </p>
<p>Again, do your research.  Samples available for this <a href="http://www.microsoft.com/silverlight/overview/top-features/default.aspx">here (extensible media format support sample)</a> and <a href="http://community.irritatedvowel.com/blogs/pete_browns_blog/archive/2009/07/19/Silverlight-Synthesizer-Source-Code-_1320_-MediaStreamSource-Raw-Sound.aspx">here</a>.</p>
<p><strong>7.  Portability.</strong></p>
<p>I’m not sure his description of Flash’s abilities here are even accurate.  I *think* he may be talking about just running a SWF file using the standalone Flash player, but I wonder if he also means AIR here as well.  I’m just not sure (and he doesn’t indicate).  Silverlight has the capability to run out-of-browser.  Is it a full-trust application like AIR?  No.  But again, he doesn’t clarify here what he’s referring to.  Sure Flash has a standalone player, but I can’t remember the last time I played only a SWF.  If referring to AIR, there are some comparisons that could be drawn, but bottom line is you <a href="http://timheuer.com/blog/archive/2009/08/12/silverlight-out-of-browser-force-install-pattern.aspx">can run Silverlight applications out of the browser</a>.</p>
<p><strong>8.  Accessibility.</strong></p>
<p><strong>MYTH</strong>: Silverlight is not an accessible technology.    <br />
<strong>FACT</strong>: Silverlight can be developed with accessibility in mind.</p>
<p>Michael points out “changing color schemes” and I think is referring to high-contrast mode.  Yes we have that.  But we also have caption support for media files and have the ability to integrate with other accessible technologies.  Here’s some resources:</p>
<ul>
    <li><a href="http://amp.codeplex.com/">Accessible Media Project</a> (full open source implementation of an accessible media player).  Note: that this is built upon *existing* APIs that are built-in to the product.</li>
    <li>Accessibility in Silverlight with Mark Rideout <a href="http://archive.visitmix.com/blogs/Joshua/Silverlight-2-Accessibility-with-Mark-Rideout/">here</a> and <a href="http://www.code-magazine.com/article.aspx?quickid=0810062&amp;page=1">here</a>.</li>
    <li><a href="http://www.buttercupreader.net">Buttercup Reader</a> – an implementation of an accessible application in Silverlight.</li>
</ul>
<p>9.  Client-server communication.</p>
<p>MYTH: You must use .NET server technologies for service communication on Silverlight.   <br />
FACT: Silverlight can communicate with ASP.NET web services, WCF, SOAP services and REST APIs.  ASP.NET on the server is not required for client-server communication.</p>
<p>Michael’s assertion here is simply incorrect.  Silverlight has a network stack available to developers to communicate with servers/services of all kinds and also includes a Socket implementation if you so desire.  This is just completely false what Michael notes here.</p>
<p>There are some technologies we are developing (.NET RIA Services) that do require .NET on the server and provide a better experience for developers using Microsoft technologies front-to-back.  This, however, is not a requirement of Silverlight.  Use your Ruby REST api if you’d like.</p>
<p>10.  3D rendering.</p>
<p>I’m definitely not an expert in 3D.  I have to admit I don’t know the capabilities of Flash in this regard.  Silverlight does, however, support perspective 3D (taking a 2D object and putting it in 3D space).  Do we have full on support for 3D meshes, etc.  No, we don’t right now.  I *think* (again, Flashers correct me if I’m wrong) that Flash’s implementation is similar based on some quick <a href="http://en.wikipedia.org/wiki/3D_Flash">search research</a>.  I’m willing to admit I’m wrong here on their implementation.</p>
<p>We do have several ways to extend 3D type models though:</p>
<ul>
    <li><a href="http://www.codeplex.com/Kit3D">Kit3D</a> – an open source 3D graphics engine for Silverlight.</li>
    <li><a href="http://balder.codeplex.com/">Balder</a> – a managed game engine with 2D and 3D support.</li>
    <li><a href="http://www.erain.com/products/zam3d">Zam3D</a> – a commercial product for exporting 3D environments to XAML</li>
</ul>
<p>As for game development.  Sigh.  Yes it can be done.  In fact how about a platform that lets you reuse technology to develop a game for desktop, browser, XBOX and Zune?  Check out <a href="http://www.silverarcade.com">Silver Arcade</a> for some casual games that people are developing.  We’ve also got a thriving ecosystem around <a href="http://www.codeplex.com/FarseerPhysics">physics engines that are open source</a> as well!  Casual games not your thing?  How about <a href="http://www.innoveware.com/ql3/QuakeLight.html">Quake in Silverlight</a>?</p>
<p>Michael ends his article with these words (emphasis mine):</p>
<blockquote>
<p><em>I have a platform to express my opinions, and they are <strong>generally backed up with solid experience or data to justify them</strong>. I am not always right, and I welcome anyone who disagrees with my thoughts on Microsoft’s Silverlight to begin that discussion in the comments section.</em></p>
</blockquote>
<p>Michael – you have been engaged in the comment section and haven’t corrected where you are wrong.  Your opinion, this time, is <strong>not </strong>backed up with solid experience or data.  Period.</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:16921fda-2a94-4e90-952b-d8b8ccd1ba83" style="margin: 0px; padding: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
