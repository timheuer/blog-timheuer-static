---
title: "FeedReader web part 3.0.0.2"
slug: "new-feedreader-sharepoint-web-part-release"
pubDate: 2008-06-28T14:50:30.000Z
lastModified: 2019-10-23T04:20:20.000Z
categories:
  - "sharepoint"
  - "feedreader"
  - "web part"
draft: false
---

<p>For those of you who use my RSS <a href="http://www.codeplex.com/FeedReader">FeedReader</a> Web Part for <strong>SharePoint</strong>, it has been updated into an ‘official’ release for the project.  Version 3.0.0.2 is now the latest release.  It incorporates all the changes from our team’s contributor, Ryan – thanks Ryan!!!  You can read the checkin on the <a href="http://www.codeplex.com/FeedReader">Codeplex site</a> or <a href="http://timheuer.com/blog/archive/2008/01/17/feedreader-sharpoint-web-part-gets-contributions-again.aspx">review this previous post</a> for Ryan’s checkin notes.</p>  <p>As always, the source code is included on the site, licensed under the <a href="http://www.opensource.org/licenses/ms-pl.html">Ms-Pl</a>.</p>  <p>There has been some emails/work items/debate over the installer.  The installation is two parts:</p>  <ul>   <ul>     <li>Installation of binaries </li>      <li>Deployment to SharePoint servers </li>   </ul> </ul>  <p>It has been much debated with me in private emails about that the MSI installer should automatically deploy to the server.  Initially this is how <strong><a title="" href="http://www.codeplex.com/Wiki/View.aspx?ProjectName=FeedReader">feedreader</a></strong> did it.  And I was flooded with email complaints.  Why?  Well, turns out people don’t always install to the same locations, have SharePoint in the same locations, want to deploy only certain web parts to certain SharePoint site collections, etc., etc. – I could go on.  The bottom line is that every configuration was different enough that it didn’t make sense to me to put effort into the installer to either a) guess or b) ask configuration questions.</p>  <p>SharePoint already provides a tool to do this: <strong>stsadm.exe</strong>.  The readme (yes, there is a readme file) provides instructions for deploying the web part to your specific configurations.  I also received notes that the sample script should be more explicit.  Again, people haven’t always been installing the binaries to the same location so if I was explicit, I’d be wrong in some instances.  I can’t please everyone :-)</p>  <p>The first step (after running the MSI which installs the binaries to your machine) is to run the stsadm tool to add the web part solution:</p>  <div style="border-right: gray 1px solid; padding-right: 4px; border-top: gray 1px solid; padding-left: 4px; font-size: 8pt; padding-bottom: 4px; margin: 20px 0px 10px; border-left: gray 1px solid; width: 97.5%; cursor: text; max-height: 200px; line-height: 12pt; padding-top: 4px; border-bottom: gray 1px solid; font-family: consolas, 'Courier New', courier, monospace; background-color: #f4f4f4">   <pre style="padding-right: 0px; padding-left: 0px; font-size: 8pt; padding-bottom: 0px; margin: 0em; overflow: visible; width: 100%; color: black; border-top-style: none; line-height: 12pt; padding-top: 0px; font-family: consolas, 'Courier New', courier, monospace; border-right-style: none; border-left-style: none; background-color: #f4f4f4; border-bottom-style: none">stsadm -o addsolution -filename %YOUR_INSTALL_DIR%\SharePoint.WebParts.Rss.wsp</pre>
</div>

<p>Note the %YOUR_INSTALL_DIR% is not a literal you should be typing.  This refers to where you installed the binaries.  If you didn’t change any settings it would be this:</p>

<div style="border-right: gray 1px solid; padding-right: 4px; border-top: gray 1px solid; padding-left: 4px; font-size: 8pt; padding-bottom: 4px; margin: 20px 0px 10px; border-left: gray 1px solid; width: 97.5%; cursor: text; max-height: 200px; line-height: 12pt; padding-top: 4px; border-bottom: gray 1px solid; font-family: consolas, 'Courier New', courier, monospace; background-color: #f4f4f4">
  <pre style="padding-right: 0px; padding-left: 0px; font-size: 8pt; padding-bottom: 0px; margin: 0em; overflow: visible; width: 100%; color: black; border-top-style: none; line-height: 12pt; padding-top: 0px; font-family: consolas, 'Courier New', courier, monospace; border-right-style: none; border-left-style: none; background-color: #f4f4f4; border-bottom-style: none">stsadm -o addsolution -filename <span style="color: #006080">"C:\Program Files\Tim Heuer\RSS <a title="" href="http://www.codeplex.com/Wiki/View.aspx?ProjectName=FeedReader">feedreader</a> Web Part\SharePoint.WebParts.Rss.wsp"</span></pre>
</div>

<p>Notice that if you have spaces in your path <strong>you must put them in quotes</strong>.</p>

<p>If you have problems/suggestions log them as a bug/work item on the Codeplex site please.  If you have an idea and would like to contribute, the source is available!</p>

<p>The web part package you may have noticed is not packaged in a WSP file for easier deployment to Windows SharePoint Services v3 and in fact, that is a new requirement (WSS v3) for this update.</p>

<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:a579609c-f41f-48fa-b562-3e9a0707f877" style="padding-right: 0px; display: inline; padding-left: 0px; float: none; padding-bottom: 0px; margin: 0px; padding-top: 0px"></div>
