---
title: "Intellisense for Virtual Earth API"
slug: "virtual-earth-gets-visual-studio-intellisense"
pubDate: 2008-02-26T10:16:31.000Z
lastModified: 2019-10-23T04:20:16.000Z
categories:
  - "windows live"
  - "virtual earth"
  - "codeplex"
  - "orcas"
  - "vs2008"
  - "visual studio 2008"
  - "javascript"
  - "intellisense"
draft: false
---

<p>When developing <strong><a href="http://dev.live.com/virtualearth">Virtual Earth</a></strong> applications I find myself always having the SDK documents open in the background for reference.  While this isn't a bad practice, I've historically only used them for parameter reference, etc.  I longed for the time that I could get <strike>cheater help</strike> <strong>intellisense</strong> for the Virtual Earth API.  </p>
<p>When <strong>Visual Studio 2008</strong> came out with Javascript intellisense, I figured the day has come.  But unfortunately, the Javascript intellisense isn't enabled for external (external==not-the-same-app-domain) files.  The thing about the implementation of the Javascript intellisense in VS2008 is that you can just make a reference to a file for the intellisense and it doesn't have to actually be the implemented file.  Make sense?  Probably not.  </p>
<p>My colleague <a href="http://blogs.msdn.com/devkeydet">Marc</a> has created a <a href="http://codeplex.com/vejs"><strong>Codeplex</strong> project for enabling Virtual Earth intellisense</a>.  Basically he's created a helper Javascript file that you can reference in your project to enable the intellisense.  Note that this does not actually get referenced in your project (meaning, the Javascript file isn't downloaded to your users), but rather just leveraging the VS2008 Javascript intellisense reference scheme to 'trick' the IDE into giving you intellisense for your referenced Virtual Earth API.  This is accomplished because the Javascript reference of the helper file is a design-time only helper...not affecting any true reference to the Virtual Earth control.</p>
<p>Once you do that, you'll get something like this:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/ve_intell.png" /></p>
<p>Marc did a great job getting a lot up and running with this helper file.  He's <a href="http://blogs.msdn.com/devkeydet/archive/2008/02/26/javascript-intellisense-for-the-virtual-earth-map-control.aspx">recorded a short screencast</a> on how it works to help you understand it a little better.  And if you are interested in helping contribute to the project, please watch the screencast for more information.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:3a9f5d36-fdbc-4ec5-8e74-d61049e9faa4" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
