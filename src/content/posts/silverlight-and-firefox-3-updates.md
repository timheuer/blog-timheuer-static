---
title: "Firefox 3 and Silverlight"
slug: "silverlight-and-firefox-3-updates"
pubDate: 2008-06-17T09:19:16.000Z
lastModified: 2019-10-23T04:20:20.000Z
categories:
  - "silverlight"
  - "plugin"
  - "firefox"
  - "silverlight.js"
  - "ria"
  - "npapi"
  - "firefox 3"
draft: false
---

<p>Well today (17 JUN 2008) will be the release of <strong>Firefox</strong> 3, a seemingly much anticipated browser update.  I checked out an earlier build (I think beta 2) and it was a nice browser.  I’m not a browser zealot, I use what works for me and IE works for me, has some tools that I like, etc.  Firefox is a fine browser as well and I do use some plugins from time to time in my Firefox install.</p>
<p>Today, I assume a lot of people will be downloading FF3 whether by explicit choice or by a prompt from their FF2 browser installs.  In fact, it appears that FF is going for a world record of software downloads.  Um, cool?  At any rate, the downloads will start soon (FF3 is already on public FTP servers now).</p>
<p><strong><font color="#ff0000">UPDATE (02 JUL 2008): </font><a href="http://timheuer.com/blog/archive/2008/07/02/updating-your-silverlight-javascript-detection.aspx"><font color="#ff0000">See updated information here on specific silverlight.js update instructions</font></a><font color="#ff0000">.</font></strong></p>
<p>So what does this mean for <a href="http://silverlight.net">Silverlight</a>?  Well, there has been an issue with Silverlight and FF3 getting along since the first public builds of FF3 started trickling out.  There has been a couple of issues, but two main nagging ones.  I’m not going to go into detail here, but there is certainly an interesting <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=421217">read in the bugzilla comments</a> and a <a href="http://weblogs.asp.net/jgalloway/archive/2008/06/08/silverlight-2-beta-2-and-firefox-3-so-happy-together.aspx">commentary here from Jon</a>.  My personal opinion is that there was some disagreement in the Mozilla core team about if indeed it was a bug or not…the comments are an interesting read and I think the MSFT team made valid arguments (the other <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=432371">issue is here</a>).  The nutshell version is that there was an apparent change in how NPAPI model was implemented in FF3.  Despite the back and forth in the bug report, Microsoft has made some servicing updates as well as SDK updates that make FF3 and Silverlight play nice together.  There still seems to be some broader concern over the FF3 implementation (as there were a number of plugins that stopped working as well), but at least a level of work around has been established for Silverlight.</p>
<p>The main concern really has to do with some install experience and initiation of the Silverlight plugin.  The latest SDK includes an updated <strong>Silverlight.js</strong> file with the necessary fixes in script detection that works with FF3.  You can get the SDK as a part of the <a href="http://silverlight.net/GetStarted">Silverlight 2 SDK downloads</a>.  This doesn’t mean that you have to immediately upgrade Silverlight 1.0 applications to v2, but just that the update is in the Silverlight 2 SDK.</p>
<p>Another item that was fixed (added) was removing the step to restart the browser in these instances as well – these are the same techniques as demonstrated in one of <a href="http://silverlight.net/learn/learnvideo.aspx?video=57016">my latest videos on optimizing the install experience</a>.</p>
<p>So if you are a Silverlight site author and anticipating a lot of FF3 usage on your site, you should indeed get the latest SDK for Silverlight and update the detection script and do some testing.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:25e013a5-169a-44d6-ac38-fec44b8112c4" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>

