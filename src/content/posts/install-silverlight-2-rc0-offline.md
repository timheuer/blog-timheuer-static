---
title: "Installing Silverlight Offline"
slug: "install-silverlight-2-rc0-offline"
pubDate: 2008-09-29T12:07:32.000Z
lastModified: 2019-10-23T04:20:23.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "silverlight tools"
  - "rc0"
  - "chainer"
  - "runtime"
draft: false
---

<p>I’ve gotten a few questions (including a <a href="http://timheuer.com/blog/archive/2008/09/25/silveright-rc0-released-for-developers.aspx#9238">great comment</a>) about needing to install <a href="http://silverlight.net">Silverlight</a> under offline or administrative-restricted environments.  There are two ways you can install this.</p>
<p>First, you’ll still need the <a href="http://go.microsoft.com/fwlink/?LinkID=143571">Silverlight Tools for Visual Studio installer</a>.  Next, make sure you download the <a href="http://go.microsoft.com/fwlink/?LinkID=150228">Silverlight Developer Runtime</a> (Windows).  There is a Mac runtime for developers as well, but if you are wanting to install the developer tools for Visual Studio offline, I’m guessing you are on Windows :-).</p>
<p>Okay, here’s the two options.  These really should only be done if you need an offline install experience.  If you don’t, let the installer do the work it needs please.  <span style="text-decoration: line-through;">These instructions are for RC0 runtime at this time only.</span> UPDATE: These also work for RTW.<br />
</p>
<p><strong><u>Option 1 – Extract and Paste</u></strong></p>
<p>Open a command-line window and navigate to where you downloaded the silverlight_tools.exe (Silverlight Tools for Visual Studio) file.  Run this command:</p>
<div style="border: 1px solid gray; margin: 20px 0px 10px; padding: 4px; overflow: auto; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: consolas,'Courier New',courier,monospace; max-height: 200px; font-size: 8pt; cursor: text;">
<div style="border-style: none; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);">   1:</span> silverlight_tools.exe /x</pre>
</div>
</div>
<p>This should bring up a window like this:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/extractedinstaller.png" /></p>
<p>Choose a location where you want the installer files to be extracted.  Make note of that path :-).  Now take the Silverlight_Developer.exe file you downloaded (Silverlight Developer Runtime) and put it in the folder where you just extracted the tools bits.</p>
<p>Now from the extracted folder, run SPInstaller.exe and the setup should run through installing the developer runtime and all the other required tools for development.</p>
<p><strong><u>Option 2 – Put the Silverlight Developer Runtime in Temp</u></strong></p>
<p>  </p>
<p>The second option still requires you to have both files, but you don’t have to extract the files from the tools installer.  It involves putting the developer runtime in your current Temp directory.  <em>How do I know what my current temp directory is?</em>  Again, open a command window and type:</p>
<div style="border: 1px solid gray; margin: 20px 0px 10px; padding: 4px; overflow: auto; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: consolas,'Courier New',courier,monospace; max-height: 200px; font-size: 8pt; cursor: text;">
<div style="border-style: none; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);">   1:</span> cd %TEMP%</pre>
</div>
</div>
<p>This should navigate you your current Temp directory.  Now that you are in this directory, create a directory called “Silverlight Tools RTW” – you can use your command window to do this by typing:</p>
<div style="border: 1px solid gray; margin: 20px 0px 10px; padding: 4px; overflow: auto; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: consolas,'Courier New',courier,monospace; max-height: 200px; font-size: 8pt; cursor: text;">
<div style="border-style: none; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);">   1:</span> mkdir <span style="color: rgb(0, 96, 128);">"Silverlight Tools RTW"</span></pre>
</div>
</div>
<p>Now copy the Silverlight_Developer.exe file into that newly created folder and run the silverlight_tools.exe installer file.  This should get you the developer runtime installed and then the remaining tools.</p>
<p>I hope this helps some get over any admin/offline hump you may be experiencing.</p>
<div style="margin: 0px; padding: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:6964c654-065b-4152-9c52-ca486ce5dc1f" class="wlWriterEditableSmartContent"></div>

