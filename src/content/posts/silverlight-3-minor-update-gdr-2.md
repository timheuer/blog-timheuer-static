---
title: "Silverlight minor update released today"
slug: "silverlight-3-minor-update-gdr-2"
pubDate: 2009-09-01T10:45:52.000Z
lastModified: 2019-10-23T04:20:31.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "gdr"
  - "gdr2"
draft: false
---

<p>Small public service announcement here for <a href="http://silverlight.net"><strong>Silverlight</strong></a> developers…we released a minor update to the runtime and SDK today.  You may see this referred to as <em><strong>Silverlight 3 GDR2</strong></em>.  Formally it is version 3.0.40818.0.  Usually when a release pops up people are curious about what is in it and why there wasn’t some major announcement.</p>
<blockquote>
<p>NOTE: “GDR” is Microsoft-speak for <em>general distribution release</em>.</p>
</blockquote>
<p>If you are interested in the full release history for Silverlight it is always <a href="http://www.microsoft.com/silverlight/resources/technical-resources/#release-history">available online</a> (click the deployment section).  This latest minor release really had several updates for improving some media and network scenarios, but namely the main driver on this release was <a href="http://gb18030.org/">GB18030</a>, which is a Chinese government standard for support of its national characters.  The standard reads:</p>
<blockquote>
<p><em>“All products currently sold or to be sold in China must plan the code page migration to support GB18030 without exception. GB18030 is a "mandatory standard" and the Chinese government regulates the certification process to reinforce GB18030 deployment.” source: <a href="http://gb18030.org">http://gb18030.org</a> </em></p>
</blockquote>
<p>So yeah, we needed to do this :-).  Silverlight made necessary changes to ensure that Blend and Visual Studio would be in compliance.</p>
<h2>How will this affect my users?</h2>
<p>Most likely it won’t unless you know about the fixes and have been a customer of one of the needs.  The driver for your customers/end-users of your applications is the <em>minRuntimeVersion</em> attribute of the plugin.  This is what tells the plugin on the end user machine what version they must have at a minimum to support your application.  Unless you change this to 3.0.40818.0 then your app isn’t likely to be affected.</p>
<p>If you need the update to comply with GB18030 deployments for example, then you’d want to modify the <em>minRuntimeVersion</em> to suit your needs.  This would prompt users with an older version to install the update.  You can make this a better experience for them by following the guidance in the <a href="http://silverlight.net/learn/whitepapers.aspx">Silverlight Installation Experience</a> whitepaper (you can see a very simple implementation of this <a href="http://timheuer.com/silverlight/install/simple/">here</a>).</p>
<h2>What about my development environment?</h2>
<p>For your development environment, you’ll need to upgrade to the latest <strong><em>development runtime</em></strong>.  If you try to install the end-user runtime on a developer machine, you will not be successful.  This is like trying to upgrade your turbo car engine with the standard V8.  The developer runtime is a superset so you can only upgrade to another developer runtime.</p>
<p>The links available at the <a href="http://silverlight.net">Silverlight Community Site</a> in the <a href="http://silverlight.net/getstarted">Get Started</a> section are still valid (see developer runtime links at the bottom of that page for <a href="http://go.microsoft.com/fwlink/?LinkID=150228">Windows</a> and <a href="http://go.microsoft.com/fwlink/?LinkID=150227">Mac</a>).  There are no new Silverlight Tools update you need to install at this time.  There were some minor updates to the SDK which aren’t required, but again, if you want the latest, you can always <a href="http://silverlight.net/getstarted">get it</a>. </p>
<p>That is all.  This is not a major update, but if you’re like me and can’t stand having anything but the latest, you can go out and get it.  Note that all your current installer links for your end users will remain to work always.  We update our installation handlers on our sites each release to be appropriate. </p>
<p>These updates went live approximately 10:00AM PST.  There may be some still propagating across the giant tubes of the interwebs.</p>
<p>Hope this helps!</p>
<div style="margin: 0px; padding: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:c48c5fb5-f891-4c2e-a185-75d5a80f6984" class="wlWriterEditableSmartContent"></div>

