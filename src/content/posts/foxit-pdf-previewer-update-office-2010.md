---
title: "Foxit PDF Previewer update"
slug: "foxit-pdf-previewer-update-office-2010"
pubDate: 2009-09-03T20:56:24.000Z
lastModified: 2019-10-23T04:20:31.000Z
categories:
  - "pdf"
  - "outlook"
  - "foxit"
  - "preview handler"
  - "foxit software"
  - "foxit pdf"
  - "pdf previewer"
  - "office previewer"
draft: false
---

<p>For those that may use my <strong><a href="http://timheuer.com/foxit">Foxit PDF Previewer</a></strong> (for use with Outlook 2007 or Windows Vista and Windows 7), I wanted to provide a few updates.</p>  <h2>Blank white screen previews</h2>  <p>I’ve been getting quite a few reports lately about white screen previews while the PDF file renders fine in other readers.  After some research and patient testing with some of you that reported it, it’s been determined that the consistent piece is that the PDFs were documents that were scanned.  These documents in the PDF format contained a different format of encoded images.  The current incarnation of the Foxit PDF Previewer does not have the decoder embedded within the product.  Here is the workaround to get it to work:</p>  <ol>   <li>Download the JPEG2000/JPIG decoder file directly from Foxit: <a href="http://exchange.foxitsoftware.com/SDK/fxdecod1.zip">JPEG200 Decoder</a>.</li>    <li>Take the contents of that ZIP file (fxdecode1.dll) and place it in the directory where you installed the Foxit PDF Previewer (if you accepted all the defaults it will likely be c:\Program Files \Tim Heuer\Foxit PDF Preview Handler)</li>    <li>That’s it !</li> </ol>  <p>The decoder library isn’t currently licensed for me to distribute with the previewer and thus this workaround.  It may be possible in a future version that this functionality will be built in, but this is a minor workaround.  The decoder is built into the Foxit SDK for version 3 (the previewer uses version 2).</p>  <h2>Outlook 2010 Technical Preview</h2>  <p>I have also received some comments from beta testers of Microsoft Office 2010 Technical Preview.  These reports have indicated that the previewer does not work in 64-bit mode for Outlook.  I can confirm this to be true.  I’ve logged a bug with the Outlook developer team to track this issue and will make any modifications necessary to make it work.  Please feel free to <a href="http://feeds.timheuer.com/timheuer/foxit">subscribe here</a> for Foxit PDF Previewer specific updates (you may also <a href="http://feeds.timheuer.com/timheuer">subscribe to my main feed as well</a>).</p>  <p>I would like to remind participants of the Office 2010 technical preview program of any confidentiality agreements they may have agreed to and to respect those in public.  If you are a part of the program, please log an official bug with the Outlook 2010 program channels with regard to Foxit Previewer not working…this will help my cause :-).</p>  <p>That is all.  Thanks for being a user of the software and as always, thanks to <strong><a href="http://www.foxitsoftware.com">Foxit Software</a> </strong>for being such a great partner to provide the licensing of the SDK for this software to exist.  They make other great PDF software so be sure to check them out.</p>  <div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:8f1cb3d8-a2e0-43e7-a75a-12022c9202a6" class="wlWriterEditableSmartContent"></div>
