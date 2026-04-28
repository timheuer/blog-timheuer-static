---
title: "Silverlight Streaming adds video upload fix"
slug: "silverlight-streaming-video-upload-fix"
pubDate: 2008-06-06T09:03:41.000Z
lastModified: 2019-10-23T04:20:19.000Z
categories: []
draft: false
---

<p>I <a href="http://timheuer.com/blog/archive/2008/06/03/silverlight-streaming-video-issue-workaround.aspx">previously wrote about a known issue</a> with <a href="http://silverlight.live.com">Silverlight Streaming</a> services and videos encoded with Encoder 2.  The quick recap is that a video <strong>already encoded to VC-1 using Encoder 2</strong> will not process when using the <em>Manage Videos</em> feature of <a href="http://silverlight.net">Silverlight</a> Streaming services.  I provided 3 work around options (#3 being the easiest of those 3) to get you past the issue and get the video uploaded.</p>  <p>The SLS team recently just added another option into the actual process and enables you to use the <em>Manage Videos</em> feature rather than act like uploading an application or renaming files.  When you log into your account (you get 10GB free by the way), click on the <em>Manage Videos</em> option and then choose to upload a video.  You’ll be presented with this screen:</p>  <p><img src="http://s3.amazonaws.com:80/timheuer-img/sls-workaround1.png" /></p>  <p>Notice the new option of <em>The video is WMV / VC1-compliant.</em> (It should actually read VC-1 to be picky, but I digress.)  Here’s what you do if <strong>your video is already VC-1</strong>.  This only applies to this situation…if you still want to use the transcode service, feel free with your AVIs, etc.</p>  <p>First, click that checkbox first.  Do this before you browse the file to set the flag that you will be bypassing the transcode.  Then browse to your file, give it a title and upload.</p>  <p>I hope this helps get around this issue the team identified.  Thanks to the SLS team for implementing a better work around in a short time after the problem was identified.</p>
