---
title: "Silverlight Tools RTW"
slug: "silverlight-tools-for-visual-studio-rtw"
pubDate: 2008-10-28T15:24:44.000Z
lastModified: 2019-10-23T04:20:24.000Z
categories:
  - "silverlight"
  - "wpf"
  - "expression"
  - "xaml"
  - "visual studio"
  - "orcas"
draft: false
---

<p><strong><font color="#ff0000">UPDATED: See last paragraph about offline installation.</font></strong></p>  <p>Sorry for the short post, this is more of a public service announcement.  When the <a href="http://silverlight.net">Silverlight</a> 2 runtime shipped, we shipped the Visual Studio tools along with it.  The tools download was labeled “RC1” and caused some confusion.  There were some reasons for this, but regardless it still targeted the Silverlight 2 release runtime.</p>  <p>Today we <a href="http://go.microsoft.com/fwlink/?LinkId=129043">released the RTW</a> (<strong>R</strong>eleast <strong>T</strong>o <strong>W</strong>eb for those who are wondering what that means) of the tools.  There is no need to re-download the runtime or anything.  All you need to do is download the RTW bits, and run the installer, then be happy.</p>  <p>So go now and <a href="http://go.microsoft.com/fwlink/?LinkId=129043">get the official RTW of Silverlight Tools</a>.  Uninstall the previous version in your Control Panel (Add/Remove Programs) before installing this build.</p>  <p>There have been a few comments about installing the Silverlight Tools in either and “offline” mode (not connected to the Internet) or in environments with proxy servers, etc.  Let me try to explain some steps.  The first step in the tools installer is always to download the latest developer runtime for Silverlight.  This requires an Internet connection.  In environments where you might be behind a proxy we’ve seem this step fail as well.  To perform an installation of the tools in either of these situation, you can <a href="http://timheuer.com/blog/archive/2008/09/29/install-silverlight-2-rc0-offline.aspx">follow the steps I outlined in a previous post on Silverlight offline installation</a>.  Even though the post is labeled RC0, the steps still apply.  This will help you install the tools.  Even if you already have the developer runtime installed, the tools installer will still attempt to download to ensure the latest is always downloaded.  I hope this helps!</p>  <div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:1939166e-cc24-480d-99d9-454a4896f5f2" class="wlWriterEditableSmartContent"></div>
