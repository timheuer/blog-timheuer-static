---
title: "feedreader gets a contribution"
slug: "feedreader-sharpoint-web-part-gets-contributions-again"
pubDate: 2008-01-17T09:09:08.000Z
lastModified: 2019-10-23T04:20:15.000Z
categories:
  - "rss"
  - "codeplex"
  - "sharepoint"
  - "moss"
  - "flickr4writer"
  - "open source"
  - "oss"
  - "ms-pl"
  - "shared source"
  - "xml"
  - "wss"
  - "feedreader"
  - "web part"
  - "josh holmes"
  - "ryan mcintyre"
  - "atom"
  - "syndication"
draft: false
---

<p><strong><a href="http://www.codeplex.com/FeedReader">feedreader</a></strong>, my <strong><a title="SharePoint" target="_blank" href="http://msdn.microsoft.com/sharepoint">sharepoint</a> web part</strong> originally built for <a title="SharePoint" href="http://msdn.microsoft.com/sharepoint" target="_blank">sharepoint</a> 2003, has been consumed by quite a few people (which i think is cool -- it is a rare moment when a lowly d00d like me can fill a gap).  while sharepoint 2007 has better built-in support for syndicated feeds (actually 2003 did already with the xml web part), i still think <a title="" href="http://www.codeplex.com/Wiki/View.aspx?ProjectName=FeedReader">feedreader</a> has some advantages that can be leveraged.</p>
<p>a while back i put <a title="" href="http://www.codeplex.com/Wiki/View.aspx?ProjectName=FeedReader">feedreader</a> on <strong><a href="http://www.codeplex.com">codeplex</a></strong>, an open source sharing ground.  i used the microsoft public license so anyone can download, alter, and profit from the code.  i did this because i was getting feature requests weekly as well as some of the problematic issues that i never fixed (namely proxy server support needs to be better).  i thought to myself that there way better developers out there than me and can actually help out.  i wanted to prove <a href="http://timheuer.com/blog/archive/2006/08/14/13288.aspx">my own theory</a> wrong.</p>
<p>well, there wasn't a ton of contributions (more work items though), but over the past month i got another one of those requests.  and just the other day, the rss feed from my codeplex project source code check-ins delivered this to me:</p>
<blockquote>
<p>1) Added the code that jdenicola suggested in the codeplex discussion forum to fix the object reference... error. The error is caused by the cache being empty. Which is weird since the PartCacheWrite line is being called, but when it reads it doesn’t return anything. Might be environmental, but I didn’t spend too much time trying to figure it out.<br />
2) Changed the cache key from this.Parent.ClientID to this.ClientID (neither key affected the results of PartCacheRead)<br />
3) Moved the assignment of the graphic to the web part code from the .dwp. This fixed the display of the icon at the top right in the title bar, but it still didn’t display the graphic in the web part library. Could be a SharePoint bug not reading the property. The properties PartImageSmall and PartImageLarge are obsolete. I used TitleIconImageUrl and CatalogIconImageUrl (but still couldn’t get the catalog icon image to show up)<br />
4) Repackaged it in a .wsp for WSS 3.0. I included a new manifest file, a couple .ddf’s, and some stsadm commands to handle the install/upgrade from a build event.<br />
5) Added .snk files so assemblies could be strong named and added to the GAC<br />
6) Added setting for "Expand Headline Descriptions by Default" which, when checked, will expand the item descriptions when the page first loads instead of showing them as collapsed (assuming the headline descriptions are not hidden)<br />
7) Added a div tag with a class called sg-item-description surrounding the item descriptions which the user can overload to control the look (background color, border, text size, etc.) of the description</p>
</blockquote>
<p>sweet.  a contribution...and a good one at that.  several things were fixed and a few added.  the contributor, <a href="http://randomdust.com/blogs/ryan">ryan mcintyre</a> really stepped up because he saw some things he could fix and leverage for his own benefit as well.  i should also note that <a href="http://www.flickr4writer.com">flickr4writer</a> also got some contributions from <a href="http://www.joshholmes.com">josh holmes</a> a few months back as well.  it is cool to see some progress on something i hadn't had the time to work on and to that i say 'thank you' to ryan for making <strong><a title="" href="http://www.codeplex.com/Wiki/View.aspx?ProjectName=FeedReader">feedreader</a></strong> a better experience!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:e37ea1e2-2e61-49de-a631-f008283341b0" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
