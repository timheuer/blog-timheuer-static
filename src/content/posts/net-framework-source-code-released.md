---
title: ".net framework source code released"
slug: "net-framework-source-code-released"
pubDate: 2007-10-03T09:09:58.000Z
lastModified: 2019-10-23T04:20:10.000Z
categories:
  - ".net"
  - "visual studio"
  - "scottgu"
  - "bcl"
  - "hanselman"
  - "open source"
  - "oss"
  - "timheuer"
  - "shared source"
  - "ms-rl"
  - "source code"
  - "microsoft reference license"
draft: false
---

<p><a title="26-jaw-drop" href="http://www.flickr.com/photos/35034346886@N01/490806934/"><img alt="26-jaw-drop" border="0" src="http://static.flickr.com/194/490806934_5fc42f0785.jpg" /></a></p>
<p>yeah, me too.  the news of the day is that microsoft's developer group is releasing portions of the .net framework base class libraries (bcl) under the <a href="http://www.microsoft.com/resources/sharedsource/licensingbasics/referencelicense.mspx">microsoft reference license</a> (ms-rl).  in a nutshell the license enables the viewing of the source code, but no modification.  even so a step in the right direction in my opinion.  while it isn't an open source license, this is a part of microsoft's broader shared source initiatives to aid developers in the understanding of the innerworkings of the .net framework.</p>
<p>we'll also be introducing capabilities in visual studio 2008 to allow .net developers debugging their apps to not only step into their own source code, but also into the .net framework source code using visual studio!  aside from that functionality, anyone who accepts the license agreement will be able to download and view the source code.  the release will include the bcl, windows forms, asp.net, System.Data and <a rel="tag" href="http://www.windowsclient.net">WPF</a>.  this includes System, System.IO, System.Collections, System.Configuration, System.Threading, System.Net, System.Security, System.Runtime, System.Text, System.Data, System.Web, System.Windows.Forms, System.Windows.  you may not see <a rel="tag" href="http://silverlight.net">silverlight</a> or <a rel="tag" href="http://wcf.netfx3.com/">wcf</a>/<a rel="tag" href="http://wf.netfx3.com/">workflow</a> or linq (linq is yet to be released anyway) but each library that is considered to be released under this initiative will go through a review process.  additional libraries are planned as time progresses.</p>
<p>you can see a demonstration and more details on <a href="http://weblogs.asp.net/scottgu">scottgu's blog</a> as well as listen to shawn burke discuss it on <a href="http://www.hanselminutes.com">hanselminutes</a>.  integration with the debug symbols is going to be as simple as:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/step1.jpg" /></p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:9485262e-ff76-4674-acc6-06cd347ae253" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
