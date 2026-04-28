---
title: "Deploying Silverlight assemblies via NuPack"
slug: "silverlight-toolkit-nupack-windows-phone-toolkit"
pubDate: 2010-10-07T18:50:02.000Z
lastModified: 2019-10-23T04:20:37.000Z
categories:
  - "silverlight"
  - "xaml"
  - "wp7dev"
  - "windows-phone"
  - "nupack"
  - "gem"
draft: false
---

<p>Yesterday there was quite a buzz around something Microsoft just released called “<strong><a href="http://nupack.codeplex.com">NuPack</a></strong>” which is described as:</p>  <blockquote>   <p><em>NuPack is a free open source package manager that makes it easy for you to find, install, and use .NET libraries in your projects. It works with all .NET project types (including, but not limited to, both ASP.NET Web Forms and ASP.NET MVC).</em></p>    <p><em>NuPack enables developers who maintain open source projects (for example, projects like Moq, NHibernate, Ninject, StructureMap, NUnit, Windsor, RhinoMocks, Elmah, etc) to package up their libraries and register them with an online gallery/catalog that is searchable. </em></p> </blockquote>  <p>It’s a pretty cool mechanism for getting .NET libraries.  For other open source developers this concept isn’t something new (i.e., gems).  But for .NET developers it might be because it is a difference from the way we typically have received dependent and 3rd party assemblies for our projects.  It provides a PowerShell script mechanism for adding packages as well as the well-known “Add Reference” gesture for VS developers.</p>  <p>All the initial information around NuPack has been from folks like <a href="http://weblogs.asp.net/scottgu">Scott Guthrie</a>, Phil Haack, David Ebbo, etc.  You might recognize these names from the ASP.NET world.  In fact if you do your first “list-package” command you’ll see a lot of ASP.NET-related packages.  If you didn’t know any better and weren’t an ASP.NET developer you might ignore this.  However, NuPack is for everyone!</p>  <p>One of the most commonly installed items for <a href="http://www.silverlight.net">Silverlight</a> developers after the toolset is the <a href="http://silverlight.codeplex.com">Silverlight Toolkit</a>.  It is a plethora of controls that frankly you probably can’t live without (at least one of them) if you are developing a broad Silverlight application.  After spending a few minutes reading on NuPack I decided to explore.</p>  <h2>My initial playground – Building the MyNuLibrary package</h2>  <p>I first just wanted to play around and created a Silverlight class library <em>MyNuLibrary</em>.  It has one class <em>Math</em> that just has two functions.  The contents is pretty much irrelevant here.  I wanted to create a package for this and test it out.</p>  <p>In my project structure I decided to put the tools in the project.  To be clear, this felt completely wrong.  My “tools” shouldn’t be a part of my project.  I think this will be resolved with better build task integration, but for now to <strong>create</strong> a package you need the NuPack.exe tool.  I put that and NuPack.Core.dll in a Tools folder in my project.  I then created my manifest (MyNuLibrary.nuspec) file as follows and put it in the root of my project (marking the build action as None of course):</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;?</span><span class="html">xml</span> <span class="attr">version</span><span class="kwrd">="1.0"</span> <span class="attr">encoding</span><span class="kwrd">="utf-8"</span>?<span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> <span class="kwrd">&lt;</span><span class="html">package</span> <span class="attr">xmlns</span><span class="kwrd">="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="kwrd">&lt;</span><span class="html">metadata</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>         <span class="kwrd">&lt;</span><span class="html">id</span><span class="kwrd">&gt;</span>MyNuLibrary<span class="kwrd">&lt;/</span><span class="html">id</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>         <span class="kwrd">&lt;</span><span class="html">version</span><span class="kwrd">&gt;</span>1.4<span class="kwrd">&lt;/</span><span class="html">version</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>         <span class="kwrd">&lt;</span><span class="html">authors</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>             <span class="kwrd">&lt;</span><span class="html">author</span><span class="kwrd">&gt;</span>Tim Heuer<span class="kwrd">&lt;/</span><span class="html">author</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>         <span class="kwrd">&lt;/</span><span class="html">authors</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>         <span class="kwrd">&lt;</span><span class="html">language</span><span class="kwrd">&gt;</span>en-US<span class="kwrd">&lt;/</span><span class="html">language</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>         <span class="kwrd">&lt;</span><span class="html">description</span><span class="kwrd">&gt;</span>Custom Silvelright Math library<span class="kwrd">&lt;/</span><span class="html">description</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>     <span class="kwrd">&lt;/</span><span class="html">metadata</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>     <span class="kwrd">&lt;</span><span class="html">files</span> <span class="attr">src</span><span class="kwrd">="bin\debug\MyNuLibrary.dll"</span> <span class="attr">target</span><span class="kwrd">="lib\SL4"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span> <span class="kwrd">&lt;/</span><span class="html">package</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>You can see that the &lt;files/&gt; node tells the package where to put things.  Notice the lib\SL4 target attribute value.  This tells NuPack (and installers of the package) that this library is really targeting Silverlight 4 (uses TargetFramework value of the source project when installing the package to verify).  There is more information on the NuPack project site about this.</p>

<p>Since my tools were relative to the root I needed to provide the bin\debug path in the source attribute value.  Initially this caused me problems as the NuPack.exe unmodified then bundled them into lib\SL4\bin\debug\MyNuLibrary.dll path.  When installing (using add-package) it failed because it said it couldn’t find any assembly that would match my project.  Apparently right now NuPack expects binaries to be in the framework folders, but not in tree structure.  For me, I modified PathResolver (in NuPack.Core):</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">if</span> (actualPath.StartsWith(basePath, StringComparison.OrdinalIgnoreCase))</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>         <span class="rem">//packagePath = actualPath.Substring(basePath.Length).TrimStart(Path.DirectorySeparatorChar);</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>         packagePath = Path.GetFileName(actualPath);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>     <span class="kwrd">else</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>         packagePath = Path.GetFileName(actualPath);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span> }</pre>
<!--CRLF--></div>
</div>

<p>for my needs.  I’ve communicated the issue to some folks on the NuPack core team and I think there may be some changes (I haven’t submitted a patch yet until I understand the need for the original code path).  And yes, I realize my change above effectively makes the if…else do the same thing and thus the if…else isn’t needed.  Again, I’m awaiting confirmation of the valid scenarios before submitting what I think the patch should be.</p>

<p>All that aside, I then added a post-build event to my project (note I added quoted params here which is not in the CodePlex documentation sample – if you don’t use quotes and you have spaces in your paths, then your post-build will fail…adding the quotes saves you time):</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="str">"$(ProjectDir)Tools\NuPack.exe"</span> <span class="str">"$(ProjectDir)MyNuLibrary.nspec"</span></pre>
<!--CRLF--></div>
</div>

<p>And upon build I now have a MyNuLibrary.1.4.nupkg file as an artifact of my build.  Done!  If we look at the contents (it’s actually just a OPC ZIP file we can see the structure and you’ll notice that our binary is in the lib\SL4 folder.</p>

<h2>Surfacing MyNuLibrary package</h2>

<p>The next step is to have your package visible somewhere.  The NuPack VS shell and the Add Reference dialog can recognize 2 types of paths: an Atom feed or a local directory.  For testing I just used a local directory using the settings in VS:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="NuPack source locations" alt="NuPack source locations" src="http://storage2.timheuer.com/nupack-config1.png" /></p>

<p>And then when I run <em>list-package</em> it shows only my packages from that “feed”:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="NuPack list-package output" alt="NuPack list-package output" src="http://storage2.timheuer.com/nupack-config2.png" /></p>

<p>Now I can consume it.</p>

<h2>Consuming MyNuLibrary package</h2>

<p>Now I can start a new Silverlight project and open up the VS Package Window and initiate a command to add the package.  I call <em>add-package MyNuLibrary</em> and see that my Silverlight project gets the reference automatically included in my project (and the literal binary is placed alongside my solution for the reference path):</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="NuPack consuming add-package" alt="NuPack consuming add-package" src="http://storage2.timheuer.com/nupack-config3.png" /></p>

<p>And I’m done.  Pretty cool.  Any updates I (as the library author) would just update my .nuspec file to the new version, generate a new package, and publish it again.  The app developer can initiate <em>update-package MyNuLibrary</em> and get the updated bits.</p>

<h2>Real world – Silverlight Toolkits</h2>

<p>While my above exercise was interesting and demonstrated that NuPack could be used for Silverlight projects as well (ahem, <a href="http://silverlightcontrib.codeplex.com/">SilverlightContrib</a>) I thought I’d explore a more useful sample.  I took the Silverlight Toolkit binaries and packaged them up for NuPack.  Here was my manifest:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;?</span><span class="html">xml</span> <span class="attr">version</span><span class="kwrd">="1.0"</span> <span class="attr">encoding</span><span class="kwrd">="utf-8"</span>?<span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> <span class="kwrd">&lt;</span><span class="html">package</span> <span class="attr">xmlns</span><span class="kwrd">="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="kwrd">&lt;</span><span class="html">metadata</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>         <span class="kwrd">&lt;</span><span class="html">id</span><span class="kwrd">&gt;</span>SilverlightToolkit<span class="kwrd">&lt;/</span><span class="html">id</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>         <span class="kwrd">&lt;</span><span class="html">version</span><span class="kwrd">&gt;</span>4.0.40413.2020<span class="kwrd">&lt;/</span><span class="html">version</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>         <span class="kwrd">&lt;</span><span class="html">authors</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>             <span class="kwrd">&lt;</span><span class="html">author</span><span class="kwrd">&gt;</span>Microsoft<span class="kwrd">&lt;/</span><span class="html">author</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>         <span class="kwrd">&lt;/</span><span class="html">authors</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>         <span class="kwrd">&lt;</span><span class="html">language</span><span class="kwrd">&gt;</span>en-US<span class="kwrd">&lt;/</span><span class="html">language</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>         <span class="kwrd">&lt;</span><span class="html">description</span><span class="kwrd">&gt;</span>Silverlight Toolkit providing a set of controls<span class="kwrd">&lt;/</span><span class="html">description</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>     <span class="kwrd">&lt;/</span><span class="html">metadata</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>     <span class="kwrd">&lt;</span><span class="html">files</span> <span class="attr">src</span><span class="kwrd">="Binaries\System.Windows.Controls.Toolkit.dll"</span> <span class="attr">target</span><span class="kwrd">="lib\SL4"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span>     <span class="kwrd">&lt;</span><span class="html">files</span> <span class="attr">src</span><span class="kwrd">="Binaries\System.Windows.Controls.Input.Toolkit.dll"</span> <span class="attr">target</span><span class="kwrd">="lib\SL4"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum14" class="lnum">  14:</span>     <span class="kwrd">&lt;</span><span class="html">files</span> <span class="attr">src</span><span class="kwrd">="Binaries\System.Windows.Controls.Layout.Toolkit.dll"</span> <span class="attr">target</span><span class="kwrd">="lib\SL4"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum15" class="lnum">  15:</span>     <span class="kwrd">&lt;</span><span class="html">files</span> <span class="attr">src</span><span class="kwrd">="Binaries\System.Windows.Controls.Data.Toolkit.dll"</span> <span class="attr">target</span><span class="kwrd">="lib\SL4"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum16" class="lnum">  16:</span>     <span class="kwrd">&lt;</span><span class="html">files</span> <span class="attr">src</span><span class="kwrd">="Binaries\System.Windows.Controls.DataVisualization.Toolkit.dll"</span> <span class="attr">target</span><span class="kwrd">="lib\SL4"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum17" class="lnum">  17:</span> <span class="kwrd">&lt;/</span><span class="html">package</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Since the source code is available for the toolkit I just used that base (hence the “Binaries”) folder name in the manifest.</p>

<p>The end result is me being able to include the Silverlight Toolkit and referencing it in one step rather than downloading, installing the MSI, and adding references.  Here’s a quick video of how simple that was:</p>

<p><object data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="640" height="480">
  <param name="source" value="http://video.timheuer.com/players/smf/v2/ProgressiveDownloadPlayer.xap" />
  <param name="background" value="white" />
  <param name="enableHtmlAccess" value="true" />
  <param name="minRuntimeVersion" value="4.0.50424.0" />
  <param name="initParams" value="MediaUrl=http://video.timheuer.com/NuPackSLTest.mp4,AutoPlay=false,ThumbnailUrl=http://video.timheuer.com/FirstFrame.png" />
  <param name="autoUpgrade" value="true" />
  <a href="http://go.microsoft.com/fwlink/?LinkID=149156&amp;v=4.0.50424.0" style="text-decoration:none">
	  <img src="http://go.microsoft.com/fwlink/?LinkId=161376" alt="Get Microsoft Silverlight" style="border-style:none" />
  </a>
</object></p>

<p>Awesome huh?  Now I could (and probably should have) actually made these independent packages so you could only get the Visualizations if you didn’t need anything else…and then could use the dependency feature of NuPack if needed.</p>

<p>Notice how I also did the Silverlight for Windows Phone Toolkit as well and that it automatically added the Icons for the ApplicationBar in my project as well.  That was due to a helpful tip from Phil about naming conventions in the package.</p>

<h2>Summary</h2>

<p>I think NuPack is pretty cool  Yes, flame away that it is nothing new conceptually.  That’s fine.  However the interation into the tool I use most is great and that I don’t have to go to a different console window and then back and forth.  That level of integration is pretty slick.</p>

<p>Will the Silverlight Toolkit(s) be deployed like this?  Who knows, right now it is just an experiment.  But it was pretty cool to see it all working as expected.  I think for an alpha view of the process it’s pretty good.  Oh and if you want IntelliSense on the nuspec file, they’ve published the schema so you can put that in a text file (nuspec.xsd) and place it in your %ProgramFiles%\Microsoft Visual Studio 10.0\Xml\Schemas directory.  Then notice my xmlns that I have in the snippets above?  Adding that will give you IntelliSense on the file format.</p>

<p>Hope this helps!
  </p><div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:be848970-af96-40de-b291-548398bc3a75" class="wlWriterEditableSmartContent"></div>
