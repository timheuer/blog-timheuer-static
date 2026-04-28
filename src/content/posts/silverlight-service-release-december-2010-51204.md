---
title: "Silverlight service release today - 4.0.51204"
slug: "silverlight-service-release-december-2010-51204"
pubDate: 2010-12-15T15:59:52.000Z
lastModified: 2019-10-23T04:20:37.000Z
categories:
  - "silverlight"
  - "xaml"
  - "riaservices"
draft: false
---

<p>Today we are releasing an update to <a href="http://silverlight.net">Silverlight</a> 4.  This is an update to two areas where no workarounds could be provided for customers and we found it important to fix.  The two issues in today’s update (which brings Silverlight to version 4.0.51204.0) are:</p>
<h2>Diacritics</h2>
<p>Foreign diacritical marks (usually accent marks on non-US languages) do not display in a TextBox control or a RichTextBox control in an out-of-browser (OOB) application on the Mac platform.</p>
<p>This update simply fixes what was a broken piece of functionality.</p>
<h2>Trusted and Signed Applications</h2>
<p>Before you apply this update, a Silverlight 4 OOB application can enable an update only when the application is signed with matching certificates that have not expired. </p>
<p>This update relaxes this restriction. After you apply the update, an OOB application can enable an update if the following conditions are true: </p>
<ul>
    <li>Both the new application and the old application have valid signatures. </li>
    <li>The new application is signed with a trusted certificate. </li>
    <li>The Subject and the Issuer of the certificate that is used to sign the new application match those of the certificate that is used to sign the old application. </li>
</ul>
<h2>Summary</h2>
<p>This update will be provided via Microsoft Update and other auto-update mechanisms for users.  We felt the need to service these issues because of the lack of a usable workaround for customers.  In the end this will benefit all Silverlight out-of-browser applications.</p>
<p>If you are a developer, you can always update the latest <strong>developer runtime</strong> by downloading it here: <a href="http://go.microsoft.com/fwlink/?LinkID=188039">Silverlight Developer Runtime</a>.  </p>
<p>You can read the ‘official’ <a href="http://support.microsoft.com/kb/2477244">KB article 2477244</a>.  Hope this helps!    </p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:fa306b30-9ce4-4c8c-98d7-03af7c48977a" style="margin: 0px; padding: 0px; float: none; display: inline;"></div>

