---
title: "Building Silverlight 2 and 3 applications with Visual Studio 2008"
slug: "build-silverlight-2-and-3-apps-with-visual-studio-2008"
pubDate: 2009-07-17T14:34:17.000Z
lastModified: 2019-10-23T04:20:30.000Z
categories:
  - "silverlight"
  - "xaml"
  - "visual studio"
  - "ria"
  - "vs2008"
  - "msbuild"
  - "riaservices"
  - "vs2010"
  - "multi-target"
draft: false
---

<p>As we’ve noted before, <strong>Visual Studio 2008</strong> doesn’t have multi-targeting support for <a href="http://silverlight.net/"><strong>Silverlight</strong></a><strong> </strong>development.  Generally speaking what this means is that if you install the Silverlight 3 tools, you have a <strong>Silverlight 3</strong> development environment with VS2008.  True <strong>multi-targeting for Silverlight</strong> in the IDE will come in <strong>Visual Studio 2010</strong> (you can see how that works in this post). </p>
<blockquote>
<p>NOTE: Visual Studio 2010 beta 1 (current version available at the time of this writing) does not fully support Silverlight 3 <em>*release version*</em> (also referred to ‘RTM’ or ‘RTW’) development.  There are a few things missing in VS10 beta 1 for full support for SL3 RTW and .NET RIA Services development.  This support will come in later beta builds of VS10 – and no, I have no idea when Visual Studio will be planning on releasing additional beta builds.</p>
</blockquote>
<p>But people still want to know how they can build SL2 apps using a single VS2008 machine, no virtual images and without VS2010.  There is a way to do this, but please allow me to set some major caveats.  We must first make sure that what I’m saying here is still that VS2008 does not support multi-targeting IDE development with Silverlight 2 and Silverlight 3.  What I’m also saying is that VS2008 IDE and MSBuild are two different experiences.  MSBuild could care less about an IDE and it just does what it is instructed to do…so let’s instruct it to build Silverlight 2 code, shall we?</p>
<h2>Assumptions – please read</h2>
<p>Let’s assume this scenario: you are working on SL3 apps so you need the SL3 tools.  Great – install them.  But you also need to either a) support an SL2 application and/or b) for some reason you want to start a new project in Silverlight classic…err, I mean…Silverlight 2.  Okay, let’s proceed with these assumptions and that you <em>already have VS2008 and SL3 dev tools installed</em>. </p>
<h2>Step 1: Install the Silverlight 2 SDK</h2>
<p>Go grab the <a href="http://www.microsoft.com/downloads/details.aspx?FamilyId=8D933343-038F-499C-986C-C3C7E87A60B3&amp;displaylang=en">Silverlight 2 SDK</a>.  This is different than the Silverlight 2 Tools for Visual Studio.  Don’t install those…you’ll be made at me for no reason if you do.  Again, install the <a href="http://www.microsoft.com/downloads/details.aspx?FamilyId=8D933343-038F-499C-986C-C3C7E87A60B3&amp;displaylang=en">Silverlight 2 SDK</a>.  Once you’ve done that, if you look at your<em> %ProgramFiles%\Microsoft SDKs\Silverlight </em>directory you will see both SDKs installed:</p>
<p><img src="http://storage.timheuer.com/multi2008-sdkpostinstall.png" alt="SDK directory with both Silverlight SDKs" title="SDK directory with both Silverlight SDKs" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<h2>Step 2: Create a new project or open your existing Silverlight 2 application</h2>
<p>If you are creating a new application and are targeting Silverlight 2 and <strong>not taking advantage of all the great new features in Silverlight 3</strong>, then create a new Silverlight application.  Obviously (or hopefully so) you cannot choose the Navigation or RIA Services templates…you’ll have to choose the basic <em>Silverlight 2 Application</em> template.  If you are working on an existing SL2 application, open that project.  In this case, VS will convert the project up to an SL3 project.  This is fine for now.</p>
<p>At this point you have your application open in VS and it is basically a SL3 application project.  If you hit F5 at this point, it would build as an SL3 application.</p>
<h2>Step 3: Make a copy of the .csproj or .vbproj file</h2>
<p>Go to your project’s directory in explorer (fastest way to do this is right-click on the project in Solution Explorer and choose <em>Open Folder in Windows Explorer</em> which is second to the last option by default.  Once in Explorer, make a copy of the .**proj file (either .csproj for C# or .vbproj for Visual Basic).  Name it whatever you want, maybe something like &lt;projectname&gt;-SL2.csproj.</p>
<p>Open that file in notepad or other plain text editor.  You’ll see a line that looks like this (for a default project this is about line 84 – and note the CSharp.Targets will be different if you are using VB):</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Import</span> <span style="color: rgb(255, 0, 0);">Project</span><span style="color: rgb(0, 0, 255);">="$(MSBuildExtensionsPath32)\Microsoft\Silverlight\v3.0\Microsoft.Silverlight.CSharp.targets"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Notice the “v3.0” in the build path?  Alter that <em>only in your copied **proj file</em> to this: (again, noting the difference between CSharp and VB):</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Import</span> <span style="color: rgb(255, 0, 0);">Project</span><span style="color: rgb(0, 0, 255);">="$(MSBuildExtensionsPath32)\Microsoft\Silverlight\v2.0\Microsoft.Silverlight.CSharp.targets"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Basically change the “v3.0” to “v2.0” in that Import node.  This tells the build system to use the SL2 SDK that you installed in Step 1.</p>
<h2>Step 4: Modify your build events in VS</h2>
<p>At this point, if you still hit F5 you’d be running a SL3 application.  This is still because a) you aren’t opening the altered **proj file we just created in Step 3 and b) you have SL3 tools installed for VS.  What we need to do is instruct Visual Studio to perform an additional build command for your project.</p>
<p>Right-click on the project and select the project properties.  Then from here choose the Build Events tab.  If you really want only a v2 build of your app, then in your post-build event you can enter this (obviously changing to the file name you created in Step 3:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> $(MSBuildBinPath)\MSBuild <span style="color: rgb(0, 96, 128);">"$(ProjectDir)SilverlightApplication1_2-SL2.csproj"</span></pre>
<!--CRLF--></div>
</div>
<p>And when you F5 you’ll end up with a Silverlight 2 XAP.  Go ahead and look at the generated AppManifest.xaml file…it will show you RuntimeVersion=”2.0.31005.0” in the file.</p>
<h2>What just happened?</h2>
<p>Basically when you F5 in Visual Studio in projects, you are initiating build commands.  Sometimes you’ll see that it just uses csc.exe, but basically these are all build commands in the system.  What we’re doing in Step 4 is telling Visual Studio: <em>When you’re done with that, go ahead and execute this additional build command for me, kthxbye.</em>  Some may look at this and ask if 2 builds are happening.  The answer is YES.  Issuing a build command in VS does its normal process and then we are OVERWRITING THE OUTPUT with our second build.</p>
<blockquote>
<p>NOTE: If someone has a better way to tell VS <em>don’t do your normal build but do this instead</em> please post in the comments…I’m not a VS build system pro.</p>
</blockquote>
<p>You are definitely overwriting your SL3 compiled bits with the new ones.</p>
<h2>Can I build both SL2 and SL3 from the same base?</h2>
<p>Sure.  You’ll have to modify the OutputPath setting for your projects so they don’t overwrite each other.  I’m sure if you are asking this question you have a good reason for it as SL2 apps are compatible running under the SL3 runtime without needing to recompile.  I modified my VS IDE app on the Build tab (in the Properties dialog) to put the output in an SL3 folder.  I then modified the OutputPath setting in my file from Step 3 to a folder called SL2.  Now when I build in VS I get both binaries/XAPs created:</p>
<p><img src="http://storage.timheuer.com/multi2008-postbuild.png" alt="post build directories" title="post build directories" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>So I can do what I want with the XAPs now.</p>
<h2>So, what’s the catch?  Isn’t this multi-targeting?</h2>
<p>Big catches…and NO, this isn’t multi-targeting for VS2008 (at least what we define it for Visual Studio).  Here’s the catches I’ve found:</p>
<p>Your IDE is still a Silverlight 3 IDE environment.  What I mean by this is that VS is doing nothing to prevent you from writing Silverlight 3 code.  Intellisense will be targeted at the SL3 SDK you have installed.  This means if you aren’t paying attention and don’t know what APIs aren’t available in SL2, you can get into trouble VERY fast.  In this event, if you do add code that is SL3 specific your SL2 SDK MSBuild will error out and report back in VS.  Here’s an example of where I added some element-to-element binding in my XAML and VS reports the error for the post-build event (as reported in the Errors output window):</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> Error    2    The property <span style="color: rgb(0, 96, 128);">'ElementName'</span> does not exist on the type <span style="color: rgb(0, 96, 128);">'Binding'</span> <span style="color: rgb(0, 0, 255);">in</span> the XML namespace <span style="color: rgb(0, 96, 128);">'http://schemas.microsoft.com/winfx/2006/xaml/presentation'</span>.    C:\Users\timheuer\Documents\Visual Studio 2008\Projects\SilverlightApplication66_3\SilverlightApplication1_2\MainPage.xaml    10    61    SilverlightApplication1_2</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> Error    3    The command <span style="color: rgb(0, 96, 128);">"C:\Windows\Microsoft.NET\Framework\v3.5\MSBuild "</span>C:\Users\timheuer\Documents\Visual Studio 2008\Projects\SilverlightApplication66_3\SilverlightApplication1_2\SilverlightApplication1_2-SL2.csproj<span style="color: rgb(0, 96, 128);">""</span> exited with code 1.    SilverlightApplication1_2</pre>
<!--CRLF--></div>
</div>
<p>My SL3 build will still complete fine, remember the SL2 is a <em>post-build</em> event.</p>
<p>The other thing is copying files to an associated web project.  In my steps above, the XAP that would get copied to the ClientBin directory of the web app was the SL3 version.  Honestly I didn’t take the time to worry about that and I know that you could get more creative with your build command to change that…but I wanted to be clear about the output of my steps outlined here.</p>
<p>Assembly references will be another issue.  Remember, VS is doing nothing to prevent you from doing things SL3-specific.  So the assembly reference list you see will include SL3-specific binaries.  Also when you add references in VS, it alters the **proj file.  So each time this happens you’d have to manually edit your copied file to make sure the references are there <em>and are the correct ones for the SL2 SDK</em>.  This can get messy very fast.</p>
<h2>What if I just want to continue doing Silverlight 2 development, but view SL3 sites?</h2>
<p>Well, then I need to come over there and talk to you about the aweseomeness of Silverlight 3!  But if you must, let me let you know what is going on here.</p>
<p>Short answer: don’t install the SL3 tools.  But again, you’re crazy right?  Silverlight 3 is awesome!</p>
<p>Longer answer…</p>
<p>The Silverlight 2 Tools installer now installs the Silverlight 3 developer runtime, but still installs the SL2 SDK.  Confusing huh?  Bottom line is that in this configuration you can develop SL2 apps in the IDE (with SL2 Intellisense, assembly references, etc) but still be able to view SL3 sites out on the Internet.  How is this possible?  Because the SL2 tools are using the build commands and VS hooks for SL2 SDK (look at the project file and you’ll see it is like above in Step 3).</p>
<p>If you have SL2 tools already installed but don’t have SL3 yet…you cannot install the end-user SL3 runtime on top of a developer runtime (i.e., you cannot ‘upgrade’ a developer runtime to a non-developer runtime).  So you’ll want to install the <a href="http://go.microsoft.com/fwlink/?LinkID=150228">SL3 developer runtime</a> on top of your SL2 environment in this situation.</p>
<h2>Summary</h2>
<p>I do not by any means consider this guidance from the Silverlight team.  This is, in fact, a hack.  It’s unsupported, might not work for your situation and as <a href="http://www.hanselman.com/blog/">Scott Hanselman</a> says, it may hurt baby kittens.  This information is merely here to really prove a point that <strong>you can use MSBuild to build Silverlight 2 applications with the Silverlight 2 SDK</strong>.  That’s really the end output here.  The rest is hackery to get VS to do things with that build.  <strong><em>I firmly recommend you develop using Silverlight 3 anyway!</em></strong></p>
<p>Use at your own risk.  If there are other MSBuild professionals out there that have better methods than post-build events, please comment – again, I’m not a pro in that area, so this was my first pass at testing this out based on questions I got from the community.</p>
<p>Hope this helps and don’t blame me for any injured baby animals.</p>
<p>  </p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:80ca78d6-1af9-4e02-9b7a-c41b902e44ab" style="margin: 0px; padding: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
