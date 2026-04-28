---
title: "Windows Phone 7 Developer Tools April 2010 Refresh"
slug: "windows-phone-tools-update-april-2010-silverlight-xna"
pubDate: 2010-04-29T10:14:14.000Z
lastModified: 2019-10-23T04:20:35.000Z
categories:
  - "silverlight"
  - "expression"
  - "xaml"
  - "mobile"
  - "ria"
  - "xna"
  - "wp7dev"
  - "wp7"
draft: false
---

<p>As most of you know at <strong><a href="http://live.visitmix.com">MIX10</a></strong>, we released the first version of the Windows Phone 7 developer tools (which are free) targeting <a href="http://www.silverlight.net">Silverlight</a> and XNA development to the world.  This was a community technology preview (CTP) release and targeted Visual Studio 2010 RC at the time (which was the publically available version).  Since MIX10, Visual Studio 2010 has released in final form and the phone developer tools team has been working to get a working version finalized.</p>
<p><img width="123" height="240" align="left" src="http://www.silverlight.net/resources/images/content/misc/ap-windows-phone-application.jpg" alt="Windows Phone 7 Associated Press application" title="Windows Phone 7 Associated Press application" style="margin: 0px 20px 0px 0px; display: inline;" />Today is that day – we’ve just made available the <a href="http://timh.me/wp7-apr2010"><strong>Windows Phone Developer Tools CTP (April 2010 Refresh)</strong></a> (direct link download).  This is the installer that will install directly on your machine.  If you don’t have any version of the tools installed, this will install the Visual Studio express edition for Windows Phone 7 (free).  If you already have any <em>released</em> version of Visual Studio 2010, this will install the tools on top (integrated) into those.</p>
<p>This April refresh is still a CTP-quality and as such there are a few known issues with this latest release.  Our goal was at least to get a set of tools that would be available to enable people to move to Visual Studio 2010 release.  The known issues are documented in the <a href="http://download.microsoft.com/download/D/9/A/D9A6B6ED-D1CF-4FB3-86BD-62A55959175F/ReleaseNotes.htm">release notes for the April 2010 refresh</a>.  Specifically the first item as a known issue in the release notes:</p>
<p><em><strong>Authenticode signed assemblies fail to load.</strong> When including Authenticode signed assemblies in your project, the application XAP will fail to deploy and run. This includes the use of Microsoft client libraries such as WCF Data Services, the Silverlight Toolkit, and 3rd party managed libraries. This issue will be resolved in a future release to permit the inclusion of Authenticode signed assemblies.</em></p>
<p>This might be annoying for some.  We will eventually get this fixed in a future release and understand this is annoying to some.  We apologize for this.  We do have a workaround for you in the manner of a PowerShell script (note: PowerShell is included in Windows 7, otherwise <a href="http://blogs.msdn.com/powershell/pages/download-windows-powershell.aspx">download a version here</a>).  Here is the workaround (also noted on <a href="http://blogs.msdn.com/ckindel">Charlie’s blog</a>).</p>
<p>You will know if you hit this issue if your app deploys to the emulator but fails to actually run with a <em>System.IO.FileLoadException</em> then you are likely hitting this issue.</p>
<h2>The PowerShell Script</h2>
<p>Attached here is the PowerShell Script – right-click and save this somewhere known.</p>
<p>Download: <a href="http://storage.timheuer.com/wp7ctpfix.ps1">wp7ctpfix.ps1</a></p>
<h2>Using the script</h2>
<p>Here’s the steps to using the script on the assemblies that will cause you issue (those signed assemblies).</p>
<ol>
    <li>Copy the script to the folder containing the signed assemblies </li>
    <li>Open an elevated command prompt (this must be done in elevated mode) and enter powershell (type: powershell) – alternatively you could start powershell itself </li>
    <li>Run “.\wp7ctpfix.ps1 &lt;your-signed-assembly-fully-qualified-path&gt;” in the PowerShell window </li>
    <li>The script should show ‘operation succeeded’ if successful. </li>
    <li>A *new* assembly prefixed with “WP7_CTP_Fix_&lt;signed-assembly&gt;” in that directory </li>
</ol>
<blockquote>
<p>NOTE: If you get a warning that the script couldn’t be run, in PowerShell first run <em>set-executionpolicy Unrestricted</em> and then proceed (and reset back to Restricted if desired).</p>
</blockquote>
<p>You’ll need to do this on all assemblies you reference that might be impacted.  <strong>NOTE: This does not alter the existing assembly, but rather creates a NEW COPY for you to use temporarily.</strong></p>
<h2>Using the fixed assemblies</h2>
<p>Once you’ve completed the step above, you’ll have to change your project refrences:</p>
<ol>
    <li>Expand the References section of your project and remove any of the problematic references </li>
    <li>Add a reference pointing to the <strong><em>newly created copies</em></strong> done in the step above </li>
</ol>
<p>Using these fixed assemblies will only work in the emulator.  Since right now there is no means of application distribution for the masses, this isn’t an issue.  Again, <em>we will be fixing this issue and it is only temporary</em> – we have no announcements yet, however, on when the next update of the tools will be.  As noted in <a href="http://blogs.msdn.com/ckindel">Charlie’s blog</a> because this is a little bit of a ‘brute force’ technique, Microsoft is giving permission to do this with this fine print:</p>
<blockquote>
<p><em>So as to enable you to load your applications on the pre-release version of the Windows Phone 7 operating system that is included with this April 2010 CTP of the Windows Phone Developer Tools, you may temporarily remove the signatures from any Microsoft-owned assemblies that you would otherwise be licensed to include in your programs, solely for the limited purpose of evaluating this CTP.  Upon the next pre-release of these Developer Tools or July 31, 2010, whichever is earlier, you must replace such signature-stripped assemblies with assemblies from which the signatures have not been removed.  Nothing in this statement should be interpreted as permission on behalf of owners of non-Microsoft assemblies.</em></p>
</blockquote>
<h2>What’s New in April refresh?</h2>
<p>There are some new items in this refresh that we’ve changed/added which are noted in the <a href="http://go.microsoft.com/fwlink/?LinkID=190409">What’s New topic in MSDN</a>.  Here are some highlights:</p>
<ul>
    <li>Enabled launchers/choosers in the emulator (Windows Phone) </li>
    <li>Enabled incremental deployment for game projects (XNA) </li>
    <li>HOWTO: <a href="http://msdn.microsoft.com/en-us/library/ff637521(VS.92).aspx">Use Rx to emulate Accelerometer data</a> </li>
    <li>HOWTO: <a href="http://msdn.microsoft.com/en-us/library/ff637517(VS.92).aspx">Use Rx to emulate Location data</a> </li>
</ul>
<p>And a few others – be sure to review the topic link above on MSDN.</p>
<h2>What about Expression Blend?</h2>
<p>Expression Blend 4 had a plugin that enabled Windows Phone 7 development as well.  This plugin has also been updated for this April 2010 refresh.  You must have the Expression Blend 4 RC installed first. </p>
<p>You can get the updated Blend plugin here:</p>
<ul>
    <li><a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=47f5c718-9dec-4557-9687-619c0fdd3d4f&amp;displaylang=en">Expression Blend Add-in Preview for Windows Phone (April Refresh)</a> </li>
    <li><a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=86370108-4c14-42ee-8855-226e5dd9b85b&amp;displaylang=en">Expression Blend SDK Preview for Windows Phone (April Refresh)</a> </li>
</ul>
<h2>Summary</h2>
<p>Please read the release notes before installing the tools.  If you think any of the known issues will impact you significantly, please do  what you think is right (if that means sticking with the March CTP build on Visual Studio RC).  The bug above was discovered late in our plans.  We had to make a decision whether to hold up another potentially ‘weeks’ or release what we had in another CTP form.  In this case we chose the to release what we had to provide something that customers have been asking for.  </p>
<p>There are a few other known issues of this refresh that you should review, but also some new items as indicated above.</p>
<p>Other useful resources:</p>
<ul>
    <li><a href="http://blogs.msdn.com/ckindel">Charlie Kindel</a> </li>
    <li><a href="http://developer.windowsphone.com">http://developer.windowsphone.com</a>  </li>
    <li><a href="http://www.silverlight.net/learn/videos/windows-phone/">Silverlight.net Learning Videos</a> </li>
    <li><a href="http://r.ch9.ms/WP7TKDevs">Channel 9 Training Kit</a> </li>
</ul>
<p>Hope this helps! </p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:654fb890-1ae8-448b-ae22-96c24bdd07a7" style="padding: 0px; margin: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
