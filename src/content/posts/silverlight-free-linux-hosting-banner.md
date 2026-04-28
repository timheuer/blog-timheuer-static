---
title: "silverlight on some free hosters"
slug: "silverlight-free-linux-hosting-banner"
pubDate: 2007-08-26T14:52:04.000Z
lastModified: 2019-10-23T04:20:08.000Z
categories:
  - "silverlight"
  - "free hosting"
draft: false
---

<p>well, in <a href="http://timheuer.com/blog/archive/2007/08/23/silverlight-hosting-on-linux-apache-osx-streaming.aspx">my previous examples</a>, i was using a free linux hoster.  i found another one that was much more reliable from a responsiveness standpoint, but found a snag and wanted to share.</p>
<p>you see on some free hosters, in order to be free they'll add banner adds to your pages.  for my purposes, who cares.  i signed up with this particular one and none of my samples were working.  huh, weird i thought.  until you look at the error message of 'unknown namespace' from silverlight.  ahh...</p>
<p>you see what the free host was doing was injecting their banner ad code into *every* served request.  so when the xaml page was requested, it was being injected into the root of the xaml, thus putting in stuff like &lt;div&gt;my banner ad&lt;/div&gt; before the root &lt;Canvas&gt; node.  the silverlight parser looked at that and said 'sorry man, homey don't play that.' </p>
<p>argh, off to find another...anyone know of a good free linux host (ad supported is okay as long as it doesn't do the above)?</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:1702dfdd-451b-4496-9b42-71a6eb8f1266" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
