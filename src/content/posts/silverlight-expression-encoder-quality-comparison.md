---
title: "Silverlight and Media Encoding"
slug: "silverlight-expression-encoder-quality-comparison"
pubDate: 2008-04-30T10:39:51.000Z
lastModified: 2019-10-23T04:20:18.000Z
categories:
  - "silverlight"
  - "expression"
  - "flash"
  - "media"
  - "vc-1"
  - "encoder"
  - "flv"
  - "vp6"
  - "interlacing"
draft: false
---

<p>While you may not personally work with a lot of media solutions in your <a href="http://silverlight.net/">Silverlight</a> application, it is nice to know the quality is there when you need it.  Silverlight supports the <a href="http://en.wikipedia.org/wiki/VC-1">VC-1</a> codec for media which provides a standards implementation for high quality media.  I would imagine that most <strong>developers</strong> probably don’t know/care what all that means.  But if you are deploying a high-touch media solution (i.e., online TV, etc.) you want that high quality.</p>
<p>Our resident media expert, <a href="http://on10.net/blogs/benwagg">Ben Waggoner</a>, just put up a <a href="http://on10.net/blogs/benwagg/Hands-on-with-high-touch-encoding-Streaming-Media-All-Stars-Redo/">great (and detailed) post</a> about some ‘high-touch encoding’ techniques he uses and does some comparisons to some media outputs with FLV files as well.  There are some gory details for tweaks in the media outputs, much of which I won’t pretend to understand as an expert, but as a geek they seem to make sense :-).</p>
<p>One of the most compelling comparisons Ben notes is the quality from the VP6 (what FLV uses) and the VC-1 codec in a particular image…notice the shirt texture difference.  The VC-1 output in this sample is much more close to the original source.</p>
<p>FLV:</p>
<p><img alt="" src="http://on10.net/Link/6e5a49ae-ee60-4aca-a1aa-7e3fec553d34/" /> </p>
<p>VC-1:</p>
<p><img alt="" src="http://on10.net/Link/f104fd3d-e93c-4d59-9ca4-243b475b9f11/" /> </p>
<p>Ben admits in some areas he’s not sure why there is such a difference (i.e., the FLV is darker it appears as well).  It is an interesting article to read and he provides all the details, sample files and implementation for you to examine.  A lot of the things he shows for the tweak settings are a part of Encoder 2 which is to release soon.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:40b7ab58-e6e9-4354-9d52-17693ed71f31" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>

