---
title: "Fixing Visual Studio 2010 and Blend Preview for .NET 4 integration"
slug: "fix-open-in-expression-blend-missing-link-in-visual-studio"
pubDate: 2009-11-22T20:36:10.000Z
lastModified: 2019-10-23T04:20:33.000Z
categories:
  - "silverlight"
  - "expression"
  - "blend"
  - "expression blend"
  - "xaml"
  - "visual studio"
  - "ria"
  - "riaservices"
  - "vs2010"
draft: false
---

<p>If you’ve been working with Visual Studio 2008, <a href="http://microsoft.com/expression">Expression Blend</a> 3 and <a href="http://silverlight.net">Silverlight</a> (or WPF) development, you’ve likely used the <em>Open in Expression Blend</em> feature in Visual Studio.  This occurs when you right-click on a XAML file in your project/solution and you’ll see that option as long as you have Expression Blend 3 installed.</p>
<p>Well…if you are an eager developer and have installed VS2010 and the <a href="http://go.microsoft.com/fwlink/?LinkId=169446"><strong>Blend Preview for .NET 4</strong></a>, you may have noticed that integration broken.</p>
<h2>Problem 1: VS2010 and Blend Preview for .NET 4 on a clean box – NO LINK</h2>
<p>You’ve just fired up a new virtual PC or you have a clean install and you’ve installed Visual Studio 2010, the Silverlight 4 tools and Blend Preview for .NET 4.  You start your new XAML development project, add some code, then want to use Blend.  You right-click and see this:</p>
<p><img src="http://storage.timheuer.com/openinblendpreview1-none.png" alt="Missing Open in Blend option" title="Missing Open in Blend option" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>Nothing.  No option.  You miss that convenience of immediately opening the solution/file from VS to Blend and want it back.  You are confused because you have both installed!</p>
<h2>Problem 2: VS2010 shows me the link, but it opens in Expression Blend 3</h2>
<p>The other problem you may face is that you have VS2010, Blend 3 and Blend Preview for .NET 4 installed.  You see the <em>Open in Expression Blend</em> option, but when you click on it expecting it to open the latest Blend, it opens your VS2010 project in Blend 3 (or tries to) and fails.  You want to change this to open in Blend Preview for .NET 4.</p>
<h2>Solution</h2>
<p>I have a solution for you and luckily it is a fairly easy one.  </p>
<blockquote>
<p><strong>First, a warning that “here be dragons”</strong> – this is a registry editing procedure.  If you aren’t familiar with editing your registry, or don’t know what it is (highly unlikely), then you shouldn’t be doing this.  Screwing up your registry can cause irreparable damage and may harm small kittens in the process.  Seriously, you’ve been warned so don’t email me if your machine explodes into a pile of dust.  Hey, <em>it works on my machine.</em></p>
</blockquote>
<p>With the warning aside, here’s the fix.  Basically Visual Studio looks for a specific key in the HKLM (that’s HKEY_LOCAL_MACHINE to you registry noobs) for where to launch Expression Blend.  There is only one setting though, so this will apply for any VS instance you have installed.  Once you implement the registry setting you’ll see the option:</p>
<p><img src="http://storage.timheuer.com/openinblendpreview1-fixed.png" alt="Open in Blend from Visual Studio" title="Open in Blend from Visual Studio" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>It is located in HKLM\Software\Microsoft\Expression\Blend – there is a key that VS is looking for there named “VS” with one String value named “BlendLaunchPath” which has the full path to the version of Expression Blend you want to launch.</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Expression\Blend\VS]</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> <span style="color: rgb(0, 96, 128);">"BlendLaunchPath"</span>=<span style="color: rgb(0, 96, 128);">"\"c:\\Program Files\\Microsoft Expression\\Blend Preview for .NET 4\\Blend.exe\""</span></pre>
<!--CRLF--></div>
</div>
<p>So if you are missing the link or want to change the link that exists (because you are running Blend 3 and Blend Preview for .NET 4 side-by-side – which can be done if you didn’t know that) all you have to do is change that path.</p>
<p><img width="100" height="96" align="left" src="http://storage.timheuer.com/works-on-my-machine-starburst_3.png" alt="Works on my machine logo" title="Works on my machine logo" style="margin: 0px 10px 0px 0px; display: inline;" />I’m providing a ZIP file of the registry file you can merge (a .REG file) for both 32-bit or 64-bit (x64 is in the Wow6432Node) that will automatically add this setting for you assuming you have Blend Preview for .NET 4 installed in the default location.  You can get that ZIP file here: <a href="http://storage.timheuer.com/OpenInBlendRegHack.zip">OpenInBlendRegHack.zip</a>.</p>
<p>Hopefully this is a helpful little tip for you if you want to implement this integration between the beta of VS and the preview of Blend.  I use this integration a lot and it’s nice to have it working with the new tools and not miss anything.  REMINDER: Changing this registry change makes it changed for both VS2010 and VS2008...be warned.  Hope this helps!</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:dc5f54d9-6908-47d2-9b40-6ac0ad50c5ed" style="margin: 0px; padding: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
