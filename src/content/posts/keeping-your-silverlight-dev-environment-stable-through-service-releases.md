---
title: "Understanding Silverlight releases (and the September 2010 2nd service update)"
slug: "keeping-your-silverlight-dev-environment-stable-through-service-releases"
pubDate: 2010-09-28T23:35:09.000Z
lastModified: 2019-10-23T04:20:37.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "wp7dev"
  - "lightswitch"
draft: false
---

<p>Recently our team released a service release for <a href="http://www.silverlight.net">Silverlight</a> on 1-Sep-2010.  We affectionately call these “GDR” releases (general distribution release).</p>
<blockquote>
<p>NOTE: Other teams have different names for different things.  I’m not sure why Microsoft doesn’t have a standard on these things and it’s funny to hear marketing teams argue the benefit of one name over the other.  For what it is worth, in my eyes, if it isn’t a major milestone release (or at least a ‘dot’ release [4.0-&gt;4.1 for example] then it is a service update.  Call it a GDR, Wave X, Service Pack, R2, blah blah.</p>
</blockquote>
<p>In the GDR1 release (version 4.0.50826.0) we also released an update to the SDK.  This is where it can start get confusing…allow me to attempt to explain.  GDR1 released:</p>
<ul>
    <li>Runtime</li>
    <li>SDK</li>
</ul>
<p>On top of that when the release of the Windows Phone Developer Tools released, they shipped the GDR1 bits (and SDK) with them…so while there was no real “tool” update (outside of the required updates for WP7), them shipping the update in the tools effectively put all the new bits on your machine if you installed it.  Most of the time GDR releases are runtime-only releases.  Putting out an SDK release can have some consequences (beneficial if you need the update) as some of you have seen.</p>
<h2>The Problem</h2>
<p>Here’s what people are seeing…</p>
<p><em>Hey my users are getting messages to upgrade their Silverlight runtime when my app says minRuntimeVersion=”4.0.50401.0” – what gives?!  I thought this thing was supposed to work!?!?</em></p>
<p>Every time someone asks me about this, my first question is if they’ve installed the updated SDK.  Almost all the time the answer is yes.  And that is where the issue is (as also they’ve recompiled their app).  Along with the minRuntimeVersion, <strong><em>within</em></strong> the XAP the AppManifest.xml file there is also a RuntimeVersion attribute stamped for the app.  Both of these versions are being set by the <strong>version of the SDK</strong>.  So when you install a new SDK, that version is the value used here.</p>
<p>NOTE: Your &lt;object&gt; tag minRuntimeVersion isn’t updated on existing projects, but check on a new project and you’ll see it updated there.</p>
<p>So even though you might have specified in the &lt;object&gt; tag minRuntimeVersion for RTW (4.0.50401.0), the fact that the XAP is demanding (via the AppManifest) a later version is what is causing the conflict.</p>
<p>The problem exists when you either want (or have no choice because of auto-updates you subscribe to) the latest Silverlight <em>runtime</em> but as a developer, need to maintain applications and do not want to drive the user to an upgrade to the latest bits.</p>
<h2>The Solution</h2>
<p>If you find yourself in this situation and don’t want to keep manually changing the AppManifest attribute after each build and re-packaging the XAP, then you can do one thing to keep your environment the way you expect it.</p>
<p>To be clear, what I am outlining here will: enable you to have the latest Silverlight <em>runtime</em> while still building against the RTW of Silverlight 4.</p>
<p>First, you can uninstall Silverlight 4 GDR1 SDK (you can do this via the Add/Remove Control Panel).  Once you’ve done that you can install the <a href="http://download.microsoft.com/download/3/0/F/30F4B101-1D1A-49F3-8CAF-388C26606C4F/sdk/silverlight_sdk.exe">Silverlight 4 RTW SDK</a> (4.0.50401.0).</p>
<p>Now you’re done :-).  If you have apps that have been in this problematic state you’ll likely have to do some cleans on your build to ensure that the AppManifest is overridden correctly now.</p>
<h2>Future Updates</h2>
<p>As I mentioned, generally speaking the GDRs are runtime-only releases.  And actually we issued a second service release in September (<a href="http://support.microsoft.com/kb/2416427">GDR2 – 4.0.50917.0</a>).  </p>
<blockquote>
<p>NOTE: This GDR2 update has NO OTHER fixes than the issue mentioned in the KB article.  This was fixing a regression that prevented an app from loading/updating.  No other fixes are in this build at this time.</p>
</blockquote>
<p>In these cases as a developer all you need to do is ensure you have the latest <strong>developer runtime</strong> to ensure you can debug, etc.  The Windows developer runtime can be <a href="http://go.microsoft.com/fwlink/?LinkID=188039">obtained here</a>.</p>
<h2>Summary</h2>
<p>If you’re in the situation as described above where your users are seeing a prompt that is not expected, you can easily modify your dev environment to prevent this.  The simple summary is:</p>
<ul>
    <li>Keep up-to-date on the latest developer runtime</li>
    <li>Have the RTW SDK installed</li>
</ul>
<p>The consequences here are if you are doing development with LightSwitch (which requires the updated SDK).</p>
<p>I’m not sure if my rambling here helps, but I tried to just say it how it is.</p>
<p>Hope this helps!   </p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:0ce662d3-eb46-4d07-b383-c635f335da9b" style="padding: 0px; margin: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
