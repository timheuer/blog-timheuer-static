---
title: "implementing user controls in silverlight 1.1"
slug: "silverlight-user-controls-silverlight-1_1"
pubDate: 2007-08-20T14:00:17.000Z
lastModified: 2019-10-23T04:20:08.000Z
categories:
  - "silverlight"
  - "aspnet"
  - "visual studio"
  - "orcas"
  - "silverlight controls"
  - "user controls"
  - "visual studio 2008"
draft: false
---

<p>following up in part 2, we build upon <a href="http://timheuer.com/blog/archive/2007/08/19/implement-user-control-in-silverlight-user-controls.aspx">part 1</a> of our demonstration of using user controls in our silverlight applications.  in part 1, we created our user control in xaml using expression blend and then wired it up in our silverlight 1.0 application using javascript as the code.</p>
<p><a href="http://channel9.msdn.com/ShowPost.aspx?PostID=335728"><img style="MARGIN: 0px 5px 0px 0px" alt="" align="left" border="0" src="http://s3.amazonaws.com/timheuer-img/slcontrols11-small.png" /></a>in part 2, we take the same xaml, but this time compile it into a managed assembly for consumption in a silverlight 1.1 application.  the result is that we now have a modular approach to reusable components in silverlight and the user control in managed code also affords us familiar implementation style similar to asp.net user control syntax.  rather than only relying on code, we can implement the control directly in the xaml using syntax like &lt;mynamespace:mycontrol /&gt;.</p>
<p>the code for part 2 is found here: <a href="http://s3.amazonaws.com/timheuer-img/Screencast.SilverlightControls.zip">Screencast.SilverlightControls.zip</a>.  as always, feedback and more suggestions for future screencasts are appreciated!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:ea2eb575-41bc-4b5e-be1b-8744216c011c" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
