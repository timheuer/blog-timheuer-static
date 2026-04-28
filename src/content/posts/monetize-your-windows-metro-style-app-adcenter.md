---
title: "Monetize your Metro style app with Microsoft AdCenter"
slug: "monetize-your-windows-metro-style-app-adcenter"
pubDate: 2012-03-08T15:54:12.000Z
lastModified: 2019-10-23T04:20:39.000Z
categories:
  - "xaml"
  - "metro"
  - "windows 8"
  - "winrt"
  - "adcenter"
  - "pubcenter"
draft: false
---

<p><img title="Microsoft Advertising logo" style="float: left; display: inline" alt="Microsoft Advertising logo" align="left" src="http://storage2.timheuer.com/adCenterCommunity_Logo.png" />Today, the Microsoft Advertising team announced an update to their AdCenter SDK to include support for monetizing your Metro style apps.</p>  <p>In a <a href="http://community.microsoftadvertising.com/blogs/advertising/archive/2012/03/06/developers-microsoft-advertising-sdk-windows-metro-apps.aspx">blog post announcing the update</a>, Ian notes that if you were using the previous SDK that there have been breaking changes and to use the updated SDK.  This update includes support for XAML applications and adding the ad units couldn’t be easier.  After installing their SDK (which was developed using the same distribution concepts in my post about <strong><a href="http://timheuer.com/blog/archive/2012/03/07/creating-custom-controls-for-metro-style-apps.aspx">creating a distributable custom control</a></strong> previous post), you will be able to use <em>Add Reference</em> in Visual Studio, navigate to the Windows/Extensions area and add the SDK.  After that it is as simple as adding the control in your project:</p>  <div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">   <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">     <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">Grid</span> <span style="color: #ff0000">Background</span><span style="color: #0000ff">="{StaticResource ApplicationPageBackgroundBrush}"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Border</span> <span style="color: #ff0000">Background</span><span style="color: #0000ff">="Red"</span> <span style="color: #ff0000">VerticalAlignment</span><span style="color: #0000ff">="Bottom"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">ads:AdControl</span> <span style="color: #ff0000">xmlns:ads</span><span style="color: #0000ff">="using:Microsoft.Advertising.WinRT.UI"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>                        <span style="color: #ff0000">VerticalAlignment</span><span style="color: #0000ff">="Bottom"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="728"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="90"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>                        <span style="color: #ff0000">AdUnitId</span><span style="color: #0000ff">="YOUR_AD_UNIT_ID"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>                        <span style="color: #ff0000">ApplicationId</span><span style="color: #0000ff">="YOUR_APPLICATION_ID"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span>     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Border</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Grid</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Now you do, of course, have to have a pubCenter account and create the ad units beforehand in order for this to work, but that setup time didn’t take long at all.</p>

<p>You may have some time for your own ad units to be provisioned and start serving ads, but the ad team <a href="http://msdn.microsoft.com/en-US/library/hh506361(v=msads.10).aspx">created some test values you can use</a> to see how things all work.  Download the <strong><a href="http://go.microsoft.com/?linkid=9800248">Ads SDK</a></strong> today!</p>

<p>Hope this helps!
  </p><div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:bc350bbf-d63d-43d9-b0ac-979e32a9737e" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>
