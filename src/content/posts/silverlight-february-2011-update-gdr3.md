---
title: "Silverlight 4 February 2011 Update Released Today"
slug: "silverlight-february-2011-update-gdr3"
pubDate: 2011-02-14T12:19:12.000Z
lastModified: 2019-10-23T04:20:38.000Z
categories:
  - "silverlight"
  - "gdr"
  - "gdr3"
  - "datatemplate"
draft: false
---

<p>Today (at approximately 10:00 AM PST) our team released an update to the <a href="http://silverlight.net">Silverlight</a> 4 runtime.  This update, dubbed internally as “GDR3,” provides an update in the following key areas (<a href="http://support.microsoft.com/kb/2495644">KB2495644</a>):</p>
<ul>
    <li>Timestamp issues with media playback and VC-1 codec</li>
    <li>Visual Studio IDE crash when profiling a Silverlight application which has a pixel shader</li>
    <li>Enabling Silverlight to run as a 32-bit process in 64-bit Firefox on OSX</li>
    <li>DRM fixes for a “6207” error when playing protected content after upgrading to a version of Silverlight</li>
    <li>Memory leak fixes with regard to the use of in-line DataTemplate</li>
    <li>Out-of-browser applications failing to update if the application name was changed</li>
    <li>Media playback error when the media streams have redirect information</li>
    <li>Improving network latency (<a href="http://support.microsoft.com/kb/2505882">KB2505882</a>)</li>
</ul>
<p>Many readers of this blog will likely zero in on the memory leak fix here.  The issue is discussed/debated/ridiculed ad nauseam on the forums relating to this issue.  If your customer applications are facing this issue and you chose not to apply one of the two workarounds, then you want to encourage your customers to upgrade to this release.  This can be done using the minimum runtime version attributes in your &lt;object&gt; tags where you use Silverlight.  This will prompt the user for an upgrade.  Of course, I’ve stated my opinion many times before that this should be a customized experience and we’ve even <a href="http://silverlight.net/learn/whitepapers">provided sample code</a> to do so in our installation experience whitepaper.</p>
<h2>‘I noticed &lt;your-favorite-bug/feature&gt; isn’t fixed here’</h2>
<p>Each service release doesn’t fix our backlog completely.  If there is an issue you are seeing with Silverlight after applying this update, please, please, please log a bug on the product.  Don’t assume someone else has.  There is a specific way you can log a product bug on Silverlight as I’ve outlined in this post: <a href="http://timheuer.com/blog/archive/2010/05/03/ways-to-give-feedback-on-silverlight.aspx">Ways to give feedback on Silverlight</a>.  The ideal bug is one that is detailed, reproducible, and provides an actual repro project/sample.  This is the fastest route to getting a bug understood and evaluated.</p>
<h2>Getting the update</h2>
<p>As with all service updates, this update will be made available to customers via Microsoft Update.  If you are a developer and don’t want to wait, you can download the bits here (please be aware network propagation across the globe might take a few hours):</p>
<ul>
    <li><a href="http://go.microsoft.com/fwlink/?LinkId=149156">Silverlight runtime</a> (end-user)</li>
    <li>Silverlight <strong>developer</strong> runtime: <a href="http://go.microsoft.com/fwlink/?LinkID=188039">Windows</a> or <a href="http://go.microsoft.com/fwlink/?LinkID=188040">Mac</a></li>
</ul>
<p>There is NO SDK update for this release.  As a developer you only need to update the developer runtime on your machine to continue enabling Silverlight development but to also have the new runtime on your machine as a user as well.  Please note that by you, the developer, simply having the updated dev runtime doesn’t “force” your apps to use it.  This is controlled by using the minRuntimeVersion flags in your &lt;object&gt; tag to trigger what the minimum requirement is for your application.</p>
<p>Hope this helps!   </p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:f3bb9552-0348-4f51-ae97-980d399cfa42" style="margin: 0px; padding: 0px; float: none; display: inline;"></div>

