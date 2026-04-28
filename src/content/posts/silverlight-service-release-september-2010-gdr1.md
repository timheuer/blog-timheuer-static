---
title: "Silverlight 4 service release (September 2010)"
slug: "silverlight-service-release-september-2010-gdr1"
pubDate: 2010-09-01T10:44:36.000Z
lastModified: 2019-10-23T04:20:36.000Z
categories:
  - "silverlight"
  - "expression"
  - "xaml"
  - "ria"
  - "riaservices"
  - "lightswitch"
draft: false
---

<p>Today we released an update to <a href="http://www.silverlight.net">Silverlight</a> 4 (update build is 4.0.50826.0) along with an updated SDK.  We appreciate our customers’ patience on working with us to help identify and verify necessary updates to this service release.  You can find all the details in <a href="http://support.microsoft.com/kb/2164913">KB2164913</a>.  Here are the relevant highlights:</p>  <ul>   <li>SDK feature to enable Add New Row capabilities in DataGrid control</li>    <li>Improving startup performance of Silverlight applications</li>    <li>Adding mouse wheel support for out-of-browser applications on the Mac platform</li>    <li>Various media-related fixes around DRM content</li>    <li>Fixed memory leak when MouseCapture is used</li>    <li>Fixed memory leak for DataTemplate usage</li> </ul>  <p>All the installer links have been updated to leverage these new bits for our customers.</p>  <h2>For end users</h2>  <p>For end users, having them simply install the runtime will provide them with the updated bits and benefits of the fixes/features in this service release.  The best way to <strike>force</strike> encourage your users to upgrade to this service release would be to leverage the MinRuntimeVersion attribute of your object tag:</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">object</span> <span class="attr">data</span><span class="kwrd">="data:application/x-silverlight-2,"</span> <span class="attr">type</span><span class="kwrd">="application/x-silverlight-2"</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>     <span class="attr">width</span><span class="kwrd">="640"</span> <span class="attr">height</span><span class="kwrd">="400"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="source"</span> <span class="attr">value</span><span class="kwrd">="YOUR_PATH_TO_XAP"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="background"</span> <span class="attr">value</span><span class="kwrd">="white"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="minRuntimeVersion"</span> <span class="attr">value</span><span class="kwrd">="4.0.50826.0"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>     <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="autoUpgrade"</span> <span class="attr">value</span><span class="kwrd">="true"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>     <span class="kwrd">&lt;</span><span class="html">a</span> <span class="attr">href</span><span class="kwrd">="http://go.microsoft.com/fwlink/?LinkID=149156&amp;amp;v=4.0.50826.0"</span> <span class="attr">style</span><span class="kwrd">="text-decoration: none"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>         <span class="kwrd">&lt;</span><span class="html">img</span> <span class="attr">src</span><span class="kwrd">="http://go.microsoft.com/fwlink/?LinkId=161376"</span> <span class="attr">alt</span><span class="kwrd">="Get Microsoft Silverlight"</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>             <span class="attr">style</span><span class="kwrd">="border-style: none"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>     <span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span> <span class="kwrd">&lt;/</span><span class="html">object</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Notice lines 5 and 6 above.  This would trigger that the end user is required for your application to run and require them to upgrade. The minRuntimeVersion/autoUpgrade are the <em>minimum</em> to require your user to upgrade to the later version.  Ideally you would follow good installation experience guidance (see “<a href="http://www.silverlight.net/learn/whitepapers/">Installation Experience Whitepaper</a>” with complete sample source code) to customize your install and/or upgrade experience.</p>

<h2>For Developers</h2>

<p>If you are a developer and authoring Silverlight applications you may want to grab the new <strong>developer </strong>bits and updated SDK:</p>

<ul>
  <li><a href="http://go.microsoft.com/fwlink/?LinkID=188039">Windows <strong>developer</strong> runtime</a></li>

  <li><a href="http://go.microsoft.com/fwlink/?LinkID=188040">Mac <strong>developer</strong> runtime</a></li>

  <li><a href="http://go.microsoft.com/fwlink/?LinkID=188043">Silverlight 4.0.50826.0 SDK</a></li>
</ul>

<p>I would install the developer build first and then the SDK and you’ll have a refreshed environment.  <strong>As with any release we try to get you the information as soon as possible and sometimes the information flows faster than the download servers replicate.</strong>  If you aren’t getting the updated bits using the links above, please be patient as the download servers from Microsoft refresh their replication caches.  </p>

<p>Note that when you now <em>create</em> a new project you’ll be using the new SDK and so the minRuntimeVersion (see above) of the project templates as well as compiled bits for your SL4 application will be using/requiring the updated runtime. </p>

<p>There are NO Visual Studio tools updates for this release so the Silverlight4_Tools.exe package is not needed to re-install. </p>

<h2>For Visual Studio LightSwitch Users</h2>

<p>When <a href="http://www.microsoft.com/lightswitch">Visual Studio LightSwitch</a> shipped they included a pre-release later build of Silverlight 4.  This caused some issues for customers who were using a single machine to evaluate LightSwitch but also using the same machine.  Any Silverlight 4 application developed and deployed would give customers messages indicating that they needed a later version of Silverlight, but were unable to acquire a compatible version!</p>

<p>This is now solved with this service release.  Simply put: <strong>If you are using LightSwitch, install the updated developer runtime and SDK</strong>.  This will solve this issue and allow you to develop LightSwitch applications as well as production Silverlight 4 applications.</p>

<p>Hope this helps!  As always if you have feedback on Silverlight, <a href="http://timheuer.com/blog/archive/2010/05/03/ways-to-give-feedback-on-silverlight.aspx">here are some methods of providing feedback to our team</a>.

  </p><div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:464d3d8e-1e09-4ec6-97ee-6eb780ac862f" class="wlWriterEditableSmartContent"></div>
