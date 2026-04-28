---
title: "integrating html and silverlight"
slug: "integrating-silverlight-and-html-dom"
pubDate: 2007-10-03T22:19:06.000Z
lastModified: 2019-10-23T04:20:10.000Z
categories:
  - "silverlight"
  - "expression"
  - "blend"
  - "blend2"
  - "svg"
  - "timheuer"
  - "html"
  - "dom"
  - "timcast"
draft: false
---

<p>in <a href="http://timheuer.com/blog/archive/2007/08/30/convert-vector-svg-to-xaml-for-silverlight.aspx">part 1</a> of my baseball example concept, i discussed how i was able to re-use some SVG vector art in XAML.  in that screencast i used an SVG file and a PDF file.  it set the stage for the remaining part of my samples here.  to recap, my goal is to show: using vector files for XAML (done), integrating that XAML and html functionality (here) and then to show a "game play" view of the vector art, extracting just the field information.</p>
<p><a href="http://channel9.msdn.com/ShowPost.aspx?PostID=345811"><img style="MARGIN: 0px 5px 0px 0px" align="left" border="0" alt="" src="http://s3.amazonaws.com/timheuer-img/sc-html-silverlight-small.png" /></a>in this part 2 of that goal, i set out to recreate a different user experience for the ticket purchase process of the online site for the baseball team.  right now at the <a href="http://arizona.diamondbacks.mlb.com/ari/ballpark/seating_pricing.jsp">dbacks seating/pricing site</a>, they provide a chart and a color match html table.  there is some "zoom" functionality (really it is just image swapping) to get a closer look at the sections.  to me, i wanted to see a simpler implementation -- don't make me think.  when i choose the infield section, clearly show me where that is -- if i can't decipher the colors very well, then i might not understand where the section is.  this is, of course, a very simple sample, but one that can easily demonstrate how easy it is to work with silverlight and html from a DOM perspective.</p>
<p>you see, once the silverlight plugin is loaded, it is a part of the page DOM.  because of this, other elements can dig into it, manipulate XAML, execute storyboards, etc. -- and vice versa...the silverlight plugin can alter html on the same page.  it actually is quite simple, but i've received some questions on it, so i thought i'd whip this quick sample together.  please <a href="http://feeds.feedburner.com/timcast-all">subscribe to the podcast feed</a> on the left to get the previous screencast and future ones as well.</p>
<p>i hope it helps.  if it doesn't, let me know or let me know how to refine a better sample.  leave a comment in the blogs.</p>
<p>part 3 will be (maybe) the final part of this sample, demonstrating a "game view" using the same imported vector data, real-time data from SQL server, asp.net ajax integration...it's wicked cool and i can't wait to post it!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:88a9f5b4-34a4-44a1-b2cd-26e5ae680749" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
