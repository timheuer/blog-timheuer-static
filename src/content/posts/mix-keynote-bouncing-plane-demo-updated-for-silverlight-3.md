---
title: "Silverlight 3 Bouncing plane gratuitous demo"
slug: "mix-keynote-bouncing-plane-demo-updated-for-silverlight-3"
pubDate: 2009-07-21T08:10:26.000Z
lastModified: 2019-10-23T04:20:30.000Z
categories:
  - "silverlight"
  - "xaml"
  - "scottgu"
  - "ria"
  - "mix09"
  - "pixel shader"
  - "shader"
  - "fx"
  - "directx"
draft: false
---

<p>I’ve received a few emails about updated code for the <a href="http://weblogs.asp.net/scottgu">Scott Guthrie</a> MIX09 keynote demo referred to as “bouncing plane” <a href="http://silverlight.net/">Silverlight</a> demo.  A screenshot of this demo is seen here to refresh your memory:</p>
<p><img style="display: block; float: none; margin-left: auto; margin-right: auto;" title="Bouncing plane Silverlight demo" alt="Bouncing plane Silverlight demo" src="http://storage.timheuer.com/bounceplane3.png" /></p>
<p>There really isn’t anything ‘new’ about this demo code for SL3, other than being recompiled.  Perhaps the only real change is to accommodate the new requirement that pixel shaders are resources of the project.  You’ll see the Effect1.cs code file where the constructor code for the shaders uses:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> pixelShader = <span style="color: rgb(0, 0, 255);">new</span> PixelShader();</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> pixelShader.UriSource = <span style="color: rgb(0, 0, 255);">new</span> Uri(<span style="color: rgb(0, 96, 128);">"/BouncingPlane;component/ShaderBytecode/Ripple.fx.ps"</span>, UriKind.Relative);</pre>
<!--CRLF--></div>
</div>
<p>If you are writing shaders, I’d refer you to <a href="http://timheuer.com/blog/archive/2009/05/19/silverlight-visual-studio-item-templates-helpers.aspx">my post talking which has some Visual Studio code snippets and item templates</a> so you can say <em>Add New Item…Silverlight Pixel Shader</em> and get the appropriate stub code already there for you!</p>
<p>Here’s the Visual Studio project for Silverlight 3 for the bouncing plane demonstration: <a href="http://storage.timheuer.com/BouncingPlane_SL3.zip">BouncingPlane_SL3.zip</a>.</p>
<p><strong>UPDATE: Hosting a demo of it (minus the video, so you'll get an error if you choose video) here: <a href="http://timheuer.com/silverlight/bouncingplane/">Bouncing Plane Silverlight Demo</a></strong>.<br />
</p>
<div style="margin: 0px; padding: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:aeb6de92-43af-46e0-be5d-f025c53c21dc" class="wlWriterEditableSmartContent"></div>

