---
title: "Foxit PDF Previewer Security Update"
slug: "foxit-pdf-preview-handler-security-patch"
pubDate: 2008-05-06T23:53:26.000Z
lastModified: 2019-10-23T04:20:18.000Z
categories:
  - "vista"
  - "pdf"
  - "office"
  - "outlook"
  - "foxit"
  - "preview handler"
  - "reader"
  - "acrobat"
  - "xp"
draft: false
---

<p>Hello readers!  If you are a <a href="http://www.foxitsoftware.com/">Foxit</a> user, please <strong><a href="http://www.foxitsoftware.com/pdf/reader_2/down_reader.htm">update your reader software</a></strong> to the latest version ASAP.  A <a href="http://blog.washingtonpost.com/securityfix/2008/04/use_foxit_patch_it.html?nav=rss_blog">recent exploit was found by a security research firm</a> and Foxit turned around an update to their reader within 24 hours.  Bravo to the Foxit team for being very agile and getting this rectified.</p>  <p>After some further research and discussion with the development team it was found that the ActiveX component used in the PDF Preview Handlers might also be vulnerable.  To reconcile this, Foxit has issued a patched (and updated) version of the ActiveX control for the preview handlers.  I have since patched  both the Vista and the XP versions accordingly and tested them on several Vista and XP SP2 machines accordingly.</p>  <p>If you are using these and have installed them PRIOR to 07-MAY-2008), please take a moment to proceed with the following:</p>  <ol>   <ol>     <li>Close any instance of Outlook 2007. </li>      <li>Uninstall any versions of the Foxit PDF Preview Handler from your system. </li>      <li>Download the latest version of the PDF Preview Handler (<a href="http://www.box.net/shared/7zz5xcy048">Vista</a> or <a href="http://www.box.net/shared/v3c1y1o8wg">XP</a>).  </li>      <li>Install the latest version. </li>   </ol> </ol>  <blockquote>   <p><strong>Note</strong>: that the previous links have been updated with the patched versions as well just in case. </p> </blockquote>  <p>That should do it!  If you find any issues, please report them to me.  Thanks again to Foxit for being responsive and aggressive in this manner and for their support of the PDF Preview Handlers.</p>  <div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:104a9111-7325-4e7e-81ec-cc6b2b4ecb6e" style="padding-right: 0px; display: inline; padding-left: 0px; float: none; padding-bottom: 0px; margin: 0px; padding-top: 0px"></div> 
