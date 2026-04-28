---
title: "Writing text on a Path in Silverlight"
slug: "silverlight-write-text-on-path-textblock-control"
pubDate: 2008-10-06T10:02:23.000Z
lastModified: 2019-10-23T04:20:23.000Z
categories:
  - "silverlight"
  - "xaml"
  - "codeplex"
  - "ms-pl"
  - "bill reiss"
  - "textblock"
  - "path"
  - "stroke"
draft: false
---

<p>One of the things that I’ve wanted to do since <a href="http://silverlight.net">Silverlight</a> released was two things with text, enable a Stroke and layout text on a Path.  Both of which in Silverlight 2 aren’t readily available.  Luckily we have a great ecosystem of developers and MVPs who love to extend our frameworks and create new capabilities for developers.</p>  <p><a href="http://www.bluerosegames.com/SilverlightBrassTacks/"><strong>Bill Reiss</strong></a> has done just that.  You may recognize Bill from some XNA and Silverlight gaming fame.  His game of Dr. Popper still remains my daughter’s favorite computer game!  Bill has created a new Silverlight user control he calls <strong>PathTextBlock</strong> control.  Bill describes the new control:</p>  <blockquote>   <p><em>“The PathTextBlock control converts text to a Path which allows you to do a couple of things you can't normally do with text in Silverlight. First of all, instead of a Foreground brush, you have a Stroke and a Fill, which allows you to draw text with an outline. Secondly, the PathTextBlock supports Transform objects which can allow you to distort the text, draw it along a curve, or other transforms. You can easily create your own transforms as well.” </em></p> </blockquote>  <p>This basically allows you to have a normal TextBlock, but distort and outline it…here’s an example output:</p>  <p><a href="http://www.bluerosegames.com/SilverlightBrassTacks/page/PathTextBlock-Control.aspx"><img border="0" src="http://www.bluerosegames.com/SilverlightBrassTacks/image.axd?picture=sample.jpg" /></a></p>  <p>Bill has also included a few transforms to play around with as well.  All of this is included in an <a href="http://www.opensource.org/licenses/ms-pl.html">Ms-Pl</a> licensed component that is available on Codeplex.  Go check out <a href="http://www.bluerosegames.com/SilverlightBrassTacks/page/PathTextBlock-Control.aspx">Bill’s blog post for a link and description</a>.</p>  <div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:c426d937-16c9-45be-8c34-a78246b7b282" class="wlWriterEditableSmartContent"></div>
