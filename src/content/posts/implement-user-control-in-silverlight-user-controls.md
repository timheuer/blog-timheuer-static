---
title: "implementing silverlight controls in 1.0"
slug: "implement-user-control-in-silverlight-user-controls"
pubDate: 2007-08-19T22:52:03.000Z
lastModified: 2019-10-23T04:20:08.000Z
categories:
  - "silverlight"
  - "podcast"
  - "visual studio"
  - "orcas"
  - "user controls"
  - "visual studio 2008"
  - "vcast"
  - "downlaoder"
draft: false
---

<p>i just put up my latest screencast featuring a sample on how to create your own user control in <a rel="tag" href="http://silverlight.net">silverlight</a> version 1.0.  this is about a 24 minute screencast that walks through creating the XAML as a user control (not the primary focus) quickly, and then consuming this user control in a silverlight 1.0 application, creating the control dynamically using createFromXaml.</p>
<p><a href="http://channel9.msdn.com/ShowPost.aspx?PostID=335556"><img style="MARGIN: 0px 5px 0px 0px" alt="" align="left" border="0" src="http://s3.amazonaws.com/timheuer-img/slcontrols10-small.png" /></a>i also realized that in the screencast i mentioned that i was using the 'open as web site' feature in visual studio 2008 instead of just right-clicking the project in blend and choosing 'edit in visual studio' -- but then didn't remember to explain why :-).  here's the skinny.  in my sample i'm using the <a href="http://msdn2.microsoft.com/en-us/library/bb232870.aspx">downloader</a> object in silverlight.  in the release candidate of silverlight there was a change to the downloader disallowing the use of the file:/// schema for downloads for security reasons.  unfortunately in visual studio 2008 (beta 2), the default project type for silverlight is a file-based project instead of a web site project.  this will work fine most of the time, but not when you are using a downloader object (you'll get an AG_CONTROL_NETWORK_ERROR).  so because of this i simply opened the same project as a web site and all is well (because it then uses the built-in asp.net development web server for rednering).</p>
<p>this is a part 1 screencast, which part 2 will demonstrate consuming the same user control in silverlight 1.1 which provides us an added benefit in the user control model.  you can view the screencast by <a href="http://feeds.feedburner.com/timcast-all">subscribing to the feed</a> (located on the left as well -- the all option has ipod format as well).  additionally i posted it on channel 9.</p>
<p>part 2 will be hopefully posted later on monday.  the code for part 1 is associated on this blog post at the bottom.</p>
<p>Screencast source code: <a href="http://s3.amazonaws.com/timheuer-img/GlassButtonControl.zip">GlassButtonControl.zip</a></p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:cdc19692-4159-4351-8352-2860ac38e46d" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
