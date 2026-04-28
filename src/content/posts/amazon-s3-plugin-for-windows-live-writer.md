---
title: "Amazon S3 Browser for Live Writer"
slug: "amazon-s3-plugin-for-windows-live-writer"
pubDate: 2008-03-10T15:31:52.000Z
lastModified: 2019-10-23T04:20:17.000Z
categories:
  - "live writer"
  - "windows live writer"
  - "amazon s3"
  - "codeplex"
  - "writer"
  - "codetrip"
  - "s3"
draft: false
---

<p>For about a year now I've been using <strong>Amazon S3 services</strong>.  Mostly I'm using it for image storage for my blog and web site.  I decided to stop using <strong>Flickr</strong> for screenshot stuff and keep it to 'photographs' when I can.  I signed up for an S3 account and have been using it for screenshot type stuff since then.  If you don't know, S3 is a service that basically enables 'object' storage in the cloud.  An object can be anything really, but I'm treating it like a remote host for images.</p>
<p>The one thing Amazon doesn't provide themselves is a tool to manage your account...it is really an API only.  There are plenty out there that have implemented user interfaces around S3 services.  My two favorites are the <a href="https://addons.mozilla.org/en-US/firefox/addon/3247">S3 plugin for Firefox</a> and <span style="text-decoration: line-through;">BucketExplorer</span>.  <span style="text-decoration: line-through;">I use the Firefox one more than anything for uploading just because it was faster for what I needed.</span></p>
<p style="margin-left: 40px;"><span style="font-weight: bold;">UPDATE:</span> While I still use the Firefox extension and always have it installed, I find myself using <a href="http://cloudberrylab.com/">CloudBerry Explorer</a> a LOT more.  It is the most full-featured (free) Amazon S3 tool I've seen and I love it.  They keep adding little subtle things to that make my process even easier!  Check it out today!</p>
<p>But the problem is that neither of the tools really incorporated *why* I was using S3 for me, which was primarily with my blog.  So a year ago I grabbed some of the sample code from the S3 developer site and whipped up a quick-and-dirty plugin for <a href="http://writer.live.com"><strong>Windows Live Writer</strong></a><strong> </strong>that I've been using.  I already had my <strong><a href="http://www.flickr4writer.com">Flickr4Writer</a></strong> plugin that I used for Flickr, but like I mentioned, I was using S3 for other image hosting now.  I was lazy though and only did a read version that inserted an image.  I was still relying on the other tools to upload, change permissions, etc. -- my workflow sucked.</p>
<p>Well as a part of <a href="http://thecodetrip.com"><strong>The Code Trip</strong></a>, we set goals to release projects on <a href="http://www.codeplex.com"><strong>CodePlex</strong></a>.  I decided to put this project out on CodePlex as far as I had it.  I immediately had a partner in <strong><a href="http://www.aaronlerch.com/blog">Aaron Lerch</a></strong>.  He jumped in and within a day basically put in the remaining features that were lacking.</p>
<p>The result is the <strong><a href="http://www.codeplex.com/s3browser">S3 Browser for Windows Live Writer</a></strong> project:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/s34writer4.png" /></p>
<p>The initial 0.91 beta release is available on the project now.  Please <a href="http://www.codeplex.com/s3browser">give it a spin</a> if you are a Live Writer and Amazon S3 user!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:ef76e8ab-4542-4360-948c-f6e22b0eaa35" style="margin: 0px; padding: 0px; display: inline;"></div>
