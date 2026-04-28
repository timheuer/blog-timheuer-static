---
title: "New power tools for Office development"
slug: "power-tools-for-office-developers"
pubDate: 2008-02-22T11:37:17.000Z
lastModified: 2019-10-23T04:20:16.000Z
categories:
  - "visual studio"
  - "office"
  - "vsto"
  - "office development"
  - "pia"
  - "ooxml"
  - "open office xml"
  - "imagemso"
draft: false
---

<p>If you develop <strong>Office</strong> applications, then hopefully you've seen some of the great improvements for developing Office applications using <strong>Visual Studio 2008</strong>.  I <a href="http://timheuer.com/blog/archive/2008/02/01/denver-big-event-follow-up-office-dev.aspx">recently spoke about these at an event in Denver</a> and demonstrated some of the capabilities.</p>
<p>Of the many new features in streamlining the process for creating Office applications, there are two that required some extra hoops.  Now granted they are minor, but if you are doing a lot of <strong>Open Office XML</strong> and <strong>Ribbon</strong> customization, it was a bit of a snare to always refer back to other applications and documents for reference.</p>
<p>Well, the Office team has released a set of Power Tools for developers.  There are many more features implemented in the power tools downloads, all detailed in the overview document available at the download.  Two that I thought were helpful utilities were being able to open an Office document (i.e., docx) in Visual Studio and see the contents of the Open Office XML format.  Here's a sample of a document I had readily available opened in <strong>VS2008</strong>:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/vsto_pt_docs.png" /></p>
<p>From this view I can then double-click on any node in the document and perhaps get the document XML to manipulate on the fly for a mail merge or something else.  Helpful.</p>
<p>The other is for Ribbon customization.  Office allows you to use the icon base of their application if you want to provide images in your add-in for applications.  This is implemented by inputting an "<strong>ImageMso</strong>" value.  Basically a value from an enumeration of the boat-loads of icons available.  The only really good place to find the information was a random Excel document that had a macro in it to show the icons and values.  With the power tools installation you get a tools window that has them all for you:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/vsto_pt_imagemso.png" /></p>
<p>When you select an icon, it puts it on the clipboard for you to paste into your property pane.  Sure, it would be even cooler to have this pop-up when in the property field for that value, but I'll take the baby steps here.</p>
<p>As I mentioned, there are other features in the power tools that were released.  There is a great overview document in that download (you can download it separate) to learn about the various add-ons available to Office developers.  <a href="http://www.microsoft.com/downloads/details.aspx?FamilyId=46B6BF86-E35D-4870-B214-4D7B72B02BF9&amp;displaylang=en">Go check out the downloads</a> to see if they will be helpful to you!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:dfd7dd48-a97c-40e6-81b3-38a72503fdb0" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
