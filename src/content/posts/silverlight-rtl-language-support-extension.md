---
title: "silverlight and right-to-left (rtl) languages"
slug: "silverlight-rtl-language-support-extension"
pubDate: 2007-10-26T19:43:21.000Z
lastModified: 2019-10-23T04:20:11.000Z
categories:
  - "silverlight"
  - ".net"
  - "arabic"
  - "hebrew"
  - "justin-josef"
  - "rtl"
  - "right-to-left"
  - "silverlightrtl"
draft: false
---

<p>okay, if you don't know <a href="http://www.justinangel.net/">justin-josef angel</a>, that is a shame, the dude is smart.  he's an mvp for microsoft and has been active in the silverlight community now, trying to really start the community thinking different on extending silverlight.  lately he's done just that.</p>
<p>anyone who has ever had to develop a global application knows the challenges of ensuring localization.  it is perhaps one of my weakest spots as a developer and i'm sure a lot of others as well.  since justin-josef speaks arabic and hebrew he wanted to tackle this problem...rtl language display in <a rel="tag" href="http://silverlight.net">silverlight</a>.  thus enter the Silverlight Arabic and Hebrew languages support project (SAAHLSP; just kidding the acronym is mine, but there is a job for justin in microsoft product naming in his future).</p>
<table cellspacing="0" cellpadding="2" width="662" border="1">
    <tbody>
        <tr>
            <td valign="top" align="center" width="100%" colspan="2"><strong>Rendering Comparison</strong> </td>
        </tr>
        <tr>
            <td valign="top" width="328">
            <p dir="ltr" style="MARGIN-RIGHT: 0px">Normal Silverlight</p>
            </td>
            <td valign="top" width="332">
            <p>Silverlight Hebrew and Arabic Support</p>
            </td>
        </tr>
        <tr>
            <td valign="top" width="328">RTL (Right-to-Left): <font color="#ff0000">Not Supported <br />
            </font>Align-to-right: <font color="#ff0000">Not Supported</font></td>
            <td valign="top" width="332">RTL: <font color="#00bb5e"><strong>Supported</strong></font> <br />
            Alight-to-Right: <font color="#00bb5e"><strong>Supported</strong></font></td>
        </tr>
        <tr>
            <td valign="top" width="328"> <img alt="" src="http://s3.amazonaws.com/timheuer-img/rtl1.png" /></td>
            <td valign="top" width="332"> <img alt="" src="http://s3.amazonaws.com/timheuer-img/rtl2.png" /></td>
        </tr>
        <tr>
            <td valign="top" width="328"> <img height="277" width="318" alt="" src="http://s3.amazonaws.com/timheuer-img/rtl3.png" /></td>
            <td valign="top" width="332"> <img height="276" width="314" alt="" src="http://s3.amazonaws.com/timheuer-img/rtl4.png" /></td>
        </tr>
    </tbody>
</table>
<p>way to go!  this project really shows the power of having the .net framework when silverlight 1.1 comes to light and the extensibility you can add to this platform, empowering the developer to makes these extensions.</p>
<p>the project has several learning points to it if you are interested...</p>
<ul>
    <ul>
        <li><a href="http://www.codeplex.com/SilverlightRTL">Codeplex Project</a> </li>
        <li><a href="http://www.justinangel.net/SilverlightRTL">Online lab/demo</a> </li>
        <li><a href="http://ttvv.tv/users/publicftp/justinangel/SilverlightRTL.wmv">20 minute webcast explaining</a> </li>
        <li><a href="http://blogs.microsoft.co.il/blogs/justinangel/archive/2007/10/26/silverlight-1-1-hebrew-and-arabic-language-support-silverlightrtl.aspx">Complete tutorial/walkthrough</a> </li>
    </ul>
</ul>
<p>great work!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:b43be3c7-c2dd-4aa8-a9df-8b45a0a12e80" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
