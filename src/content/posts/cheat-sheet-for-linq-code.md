---
title: "linq cheat sheet"
slug: "cheat-sheet-for-linq-code"
pubDate: 2007-12-17T15:29:07.000Z
lastModified: 2019-10-23T04:20:13.000Z
categories:
  - "visual studio"
  - "linq"
  - ".net 3.5"
  - "language integrated query"
  - "keith rull"
draft: false
---

<p>just saw in my feed reader...a <a href="http://www.keithrull.com/2007/12/17/My+LINQ+Cheatsheet.aspx">cheat sheet by keith rull for LINQ</a>.  keith purports that this isn't a definitive list by any means but says:</p>
<blockquote>
<p><em>"It consist of a few snippets that you might commonly do when doing LINQ processing."</em></p>
</blockquote>
<p>he uses this for his most common tasks.  when i first start learning anything new, i do the same thing keeping snippets around to help me remember certain things.  as an example, can't remember how to do the paging?  use keith's cheat:</p>
<pre class="csharpcode"><span class="rem">//take three records</span>
var takeThree = listOfPerson.Take(3);

<span class="rem">//go to the 10th record and then take 3 records from there</span>
var skipTenTakeThree = listOfPerson.Skip(10).Take(3);</pre>
<p>thanks for posting keith and look forward to your updates!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:5dce92a9-3b75-4757-8323-ebeaa768c370" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
