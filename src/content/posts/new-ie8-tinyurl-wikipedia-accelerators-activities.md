---
title: "IE8 Beta 2 release &ndash; my TinyURL Accelerator"
slug: "new-ie8-tinyurl-wikipedia-accelerators-activities"
pubDate: 2008-08-27T12:17:37.000Z
lastModified: 2019-10-23T04:20:22.000Z
categories:
  - "internet explorer"
  - "ie"
  - "ie8"
  - "activities"
  - "tinyurl"
  - "accelerator"
  - "open service description"
draft: false
---

<p />  <p>I first saw the accelerators (the artists formerly known as activities) during The Code Trip, when <a href="http://blog.pewitt.org">Woody</a> created an IE8 activity for Wikipedia.  It was a convenient tool to have in your right-click toolbox on IE and I loved it (and still do).</p>  <p>Well, <a href="http://blogs.msdn.com/ie">now that IE8 Beta 2 is out</a>, I decided (well, my selfishness decided) that I should create an <strike>activity</strike> accelerator for something that I use often so I introduce you to: <strong>IE8 Accelerator for </strong><a href="http://tinyurl.com"><strong>TinyURL</strong></a>.  So with a little XML, it was done.  Seriously, like &lt; 5 minutes.  I ran into one problem with URL encoding, but Kevin at TinyURL fixed his end to handle the encoded URL information sent to his service.  </p>  <blockquote>   <p>Kevin rocks.  Seriously.  We’re still trying to figure out why his icon dosen’t display in the context menu, but he’s been super responsive and willing to try different random things on his end to help.  Thanks Kevin.</p> </blockquote>  <p>Basically you can select (highlight) text that is a URL and right-click (or choose the accelerator icon in IE8) then choose the “<strong>Shrink URL</strong>” option (I’m taking votes if this should be “TinyURL-ify” instead).  This will take your selection (or selected hyperlink) and send it to TinyURL.  A simple, but hopefully useful accelerator for you to use.  Here’s a little video demonstration:</p>  <p><object type="application/x-shockwave-flash" width="500" height="274" data="http://www.flickr.com/apps/video/stewart.swf?v=59154" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"> <param name="flashvars" value="intl_lang=en-us&amp;photo_secret=9d92ebbea8&amp;photo_id=2800664943&amp;show_info_box=true" /> <param name="movie" value="http://www.flickr.com/apps/video/stewart.swf?v=59154" /> <param name="bgcolor" value="#000000" /> <param name="allowFullScreen" value="true" /><embed type="application/x-shockwave-flash" src="http://www.flickr.com/apps/video/stewart.swf?v=59154" bgcolor="#000000" allowfullscreen="true" flashvars="intl_lang=en-us&amp;photo_secret=9d92ebbea8&amp;photo_id=2800664943&amp;flickr_show_info_box=true" height="274" width="500" /></object></p>  <p>Oh, and I also modified Woody’s Wikipedia one to meet the new specifications for the accelerator manfiest, so here’s that one as well!  To install them, just click on these links:</p>  <ul>   <ul>     <li><a href="javascript:window.external.AddService('http://timheuer.com/tinyurl.xml')">Install TinyURL Accelerator</a> </li>      <li><a href="javascript:window.external.AddService('http://timheuer.com/wikidefine.xml')">Install Wikipedia Accelerator</a> </li>   </ul> </ul>  <p>Enjoy.</p>  <div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:8e0d728c-3b02-4c70-b3b9-11ed9d44b317" class="wlWriterSmartContent"></div>
