---
title: "Lt. Bennett returns and brings his Silverlight source code with him!"
slug: "source-code-released-for-zero-gravity-silverlight-game-including-windows-phone-code"
pubDate: 2010-09-20T15:56:01.000Z
lastModified: 2019-10-23T04:20:37.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "zero gravity"
  - "terralever"
  - "gaming"
  - "casual games"
  - "windows-phone"
  - "windows phone 7"
  - "zerog"
draft: false
---

<p><img align="left" src="http://s3.amazonaws.com/timheuer-img/ltbennett-ship.png" alt="Lt. Bennett in Zero Gravity" title="Lt. Bennett in Zero Gravity" style="display: inline; float: left;" />Three years ago I <a href="http://timheuer.com/blog/archive/2007/06/26/zerogravity.aspx">wrote about one of the first full-featured casual games</a> built in <a href="http://www.silverlight.net">Silverlight</a> (at the time Silverlight 1.1) which we called <em>Zero Gravity</em>.  It was a game featuring Lt. Bennett a character who was lost in space and your job was to navigate him through simple puzzle boards back to his space ship.  It is a fun little game that can keep you busy for a while and even get you frustrated on some of the harder mazes.  </p>
<p>The project was done in concert with <strong><a href="http://www.terralever.com">Terralever</a></strong>, an agency who has great experience in building great online casual experiences for some of the top brands in the world.  It was really fun to come up with various concepts on a casual game proof of concept in the VERY early days of Silverlight (they actually created the first Silverlight 1.0 game that was published to Miniclip.com and as well another Silverlight 2 game that was published as well).  Those early days of Silverlight were tough when you didn’t have a lot of the infrastructure we do now with the core runtime.  There is no multi-player Halo-style shooting or 3D here, and is representative of what was available at the time.  </p>
<p>Two weeks ago I reached out to <strong>Terralever</strong> and mentioned that we kind of let that project get stale (my fault) as we both wanted to release the source code but it never turned up as a priority for me (sorry about that).  In that discussion, they had some cycles to spare and their lead developer, <strong><a href="http://twitter.com/ryanplemons">Ryan Plemons</a></strong>, released the source code for Zero Gravity, updated for use in current Silverlight.  But not only that, he also ported the code to Silverlight for Windows Phone!!!  I love this gem of a statement from Ryan:</p>
<blockquote>
<p><em>“I for one was very shocked that the transition went as smoothly as it did.”</em></p>
</blockquote>
<p>Ryan has a blog post where he goes into some detail about the port, where there were things he needed to change (and got some benefit) like using the XNA sound libraries and the <strong>GestureHelper</strong> library from the <a href="http://silverlight.codeplex.com"><strong>Silverlight Toolkit</strong></a>.</p>
<p><img src="http://storage2.timheuer.com/zerog-wp7.png" alt="Zero Gravity on Windows Phone 7" title="Zero Gravity on Windows Phone 7" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>Now before you start pointing out all the obvious things that “shouldn’t be in the phone version” we’ll concede that there are some things that don’t match what a mobile experience should be.  The part of this exercise was to see how easy it would be to port something Silverlight 2/3 wholesale and still run.  I think it’s pretty cool to see a huge amount of codebase running as-is.  The introduction of the sound/gesture APIs weren’t required, but just added benefit to trimming some areas of code.</p>
<p>Congratulations and THANK YOU to Ryan and Terralever for doing this effort and <strong>publishing the source code</strong> for both projects.  Read more:</p>
<ul>
    <li><a href="http://digitaltransfusion.net/2010/09/19/zero-gravity-conquering-new-frontiers/">Zero Gravity Source Code released</a> (desktop and Windows Phone 7 source)</li>
    <li><a href="http://digitaltransfusion.net/2010/09/19/zero-gravity-moving-to-wp7/">Porting Zero Gravity to Windows Phone 7</a></li>
</ul>
<ul>If you haven’t yet got the tools yet for Windows Phone development, you can get the release versions now at the <a href="http://developer.windowsphone.com/">Windows Phone developer portal</a>.</ul>
    <ul>Hope this helps!
        <div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:6a8a88d9-6a90-4ac8-8b13-e11f7898f6ac" style="padding: 0px; margin: 0px; display: inline; float: none;"></div>
    </ul>
    <div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
    <div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
    </div>
