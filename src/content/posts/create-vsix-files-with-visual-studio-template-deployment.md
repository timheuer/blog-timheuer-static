---
title: "Creating Visual Studio Extension Files (VSIX) for Template Deployment"
slug: "create-vsix-files-with-visual-studio-template-deployment"
pubDate: 2010-05-03T10:19:30.000Z
lastModified: 2019-10-23T04:20:35.000Z
categories:
  - "visual studio"
  - "seesmic"
  - "vsix"
  - "vsi"
  - "extension manager"
draft: false
---

<p>While working on some plugins for the new <a href="http://devwiki.seesmic.com"><strong>Seesmic Desktop Platform</strong></a><strong> </strong>I got sick of copying and pasting some boiler plate code over and over.  I had created some helper templates for myself so that I could say <em>File…New </em><a href="http://www.seesmic.com"><em>Seesmic</em></a><em> Desktop Plugin</em> and get everything I needed initially.  This weekend I had some time and formalized those templates into an easy-to-use installer for anyone to consume.  </p>  <blockquote>   <p>NOTE: It is likely that Seesmic themselves will create developer project/item templates…these were for my own use and I shared them on the <a href="http://platform.seesmic.com/">Seesmic Desktop Platform</a> developer forum for anyone to benefit from (or ignore).  They are not the official templates from Seesmic.</p> </blockquote>  <p>Prior to VS2010 you could create what is called a Visual Studio Community Content Installer…which is a .VSI file that installs things like snippets, etc.  And actually you can still do that today.  The process is manual and involves a few XML manifest files, zipping up the contents and renaming it to .VSI (the VSI is just a ZIP format).  It isn’t hard, but isn’t painless as well – it’s a lot of manual steps.</p>  <p>Enter VS2010 and the <a href="http://www.microsoft.com/downloads/details.aspx?displaylang=en&amp;FamilyID=47305cf4-2bea-43c0-91cd-1b853602dcc5">Visual Studio SDK</a>.  First, the items I am describing below require you to have the <a href="http://www.microsoft.com/downloads/details.aspx?displaylang=en&amp;FamilyID=47305cf4-2bea-43c0-91cd-1b853602dcc5">VS2010 SDK</a> installed.  It is NOT installed by default.  Visual Studio 2010 has a file format called VSIX which is basically a Visual Studio Extension (VSX was already taken by Visio).  This extension format is intended to be a one-stop installer format for all things extensible.  Things like add-ins, etc.  But it can also be used for simple things like Item and Project template types.  Here’s what I did.</p>  <h2>1. Starting the project</h2>  <p>After you have VS2010 SDK installed, choose <em>File…New VSIX Project</em></p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="VSIX Project " alt="VSIX Project " src="http://storage.timheuer.com/vsix1.png" /></p>  <p>Note that this is under a language area (C# or Visual Basic).  This is because there is some assumption that you are creating more than just a template deployer…but just note that.  In my instance it actually didn’t matter what language area I chose.</p>  <h2>2. Removing ‘binary’ packages</h2>  <p>By default the VSIX project thinks you are going to be creating code extensions and will package the project’s DLL and PDB files as a part of your extension.  <strong><em>If you are using this process as I was for template extensions, this is not necessary.</em></strong>  There is an easy way of avoiding this.  Open up the csproj file (or vbproj) you just created in notepad and add these lines in the XML file:</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">PropertyGroup</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>   <span class="kwrd">&lt;</span><span class="html">CopyBuildOutputToOutputDirectory</span><span class="kwrd">&gt;</span>false<span class="kwrd">&lt;/</span><span class="html">CopyBuildOutputToOutputDirectory</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>   <span class="kwrd">&lt;</span><span class="html">CopyOutputSymbolsToOutputDirectory</span><span class="kwrd">&gt;</span>false<span class="kwrd">&lt;/</span><span class="html">CopyOutputSymbolsToOutputDirectory</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span> <span class="kwrd">&lt;/</span><span class="html">PropertyGroup</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>This tells the compiler to not package those types of files into our extension.  I put these below my last PropertyGroup statement in the file.  Save the proj file.  If you return to Visual Studio (and had the project open while making these edits in notepad) you’ll be alerted to reload the project, go ahead and reload baby.</p>

<h2>3. Editing the manfiest information</h2>

<p>When you create the project it will open up with a dialog that is a visual editor to the core manifest.  This is where you will put your metadata as well as begin to add your content.  Here is a snapshot of mine:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="VSIX Manifest Editor" alt="VSIX Manifest Editor" src="http://storage.timheuer.com/vsix2.png" /></p>

<p>Notice the simple metadata information (name, author, version, etc.).  This is important information that I’d highly recommend to include as you’ll see why in later steps.</p>

<p>Notice the Content area in the bottom.  This is where you’ll add your content.  If you have a blank project you will click the <em>Add Content</em> button and choose the type (in my case Project Template and Item Template) and browse to the file.  Note that this copies that file to this project…not a reference.  So if you change the file outside of this project, you’ll want to update it again.  Do this for each template type you want to deploy.</p>

<h2>4. Understanding Path information for templates</h2>

<p>Notice my path of my templates:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="template path data" alt="template path data" src="http://storage.timheuer.com/vsix3.png" /></p>

<p>This is important because it will determine how the templates are structured in Visual Studio after the user installs them.  My path above results in this:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Installed Templates view" alt="Installed Templates view" src="http://storage.timheuer.com/vsix4.png" /></p>

<p>This enables my users to find it under <a href="http://www.silverlight.net">Silverlight</a> as well as the custom branch that I have specified.  This is a helpful tip to your users and provides a more professional look in my opinion.</p>

<h2>5.  Building the VSIX file</h2>

<p>This step is easy.  F5.  It’s the same build process as any other project type.  The result is a VSIX file.  When the user double-clicks on that (and has Visual Studio installed) they’ll see your dialog:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="VSIX Install Dialog" alt="VSIX Install Dialog" src="http://storage.timheuer.com/vsix5.png" /></p>

<p>You could optionally digitally sign your VSIX file so the ‘unidentified publisher’ statement isn’t there.</p>

<h2>6.  Making your VSIX Discoverable</h2>

<p>This is the fun part.  Now that you have a standard Visual Studio Extension, you can make it readily available to any Visual Studio developer.  You could simply post a link to it on your blog, have the user download the VSIX and that is acceptable.  But you can <strong>also</strong> make it available in Visual Studio’s online gallery which then becomes searchable and seamlessly installable by end users.</p>

<p>Visit the <a href="http://visualstudiogallery.msdn.microsoft.com/en-us/">Visual Studio Gallery</a> page to start the process.  Notice the Upload button in the upper right area…that is where you start.  After authenticating with Windows Live ID, it is a 3 step process:</p>

<ol>
  <li>Determine what type (Tool, Control, Template) </li>

  <li>Upload the VSIX </li>

  <li>Edit and annotate further criteria </li>
</ol>

<p>The first two steps are simple, in my case I chose Template, then uploaded my VSIX which goes through some steps of validation making sure it is a valid VSIX file.  The final step enables you to specify more data that is annotating your extension to make it more searchable.  Here was my page.</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Visual Studio Gallery info page" alt="Visual Studio Gallery info page" src="http://storage.timheuer.com/vsix7.png" /></p>

<p>Notice the tags I added to help it be discoverable?  Now users can – from within Visual Studio 2010 – search and install extensions immediately:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Integrated extension search in Visual Studio" alt="Integrated extension search in Visual Studio" src="http://storage.timheuer.com/vsix6.png" /></p>

<p>Any installed extensions show up in the Extension Manager (Tools menu) for easy disabling or uninstalling).</p>

<h2>Summary</h2>

<p>After this quick process I have a distributed package for my community as well as now have added templates to my development environment making it easy to create new extensions for Seesmic (my sample used here):</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="new project templates" alt="new project templates" src="http://storage.timheuer.com/vsix8.png" /></p>

<p>It was fairly simple and I love that it is integrated into Visual Studio 2010 for everyone now!</p>

<p>Hope this helps! </p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:5287b0e5-3f24-49d8-8901-4ed7132602d7" class="wlWriterEditableSmartContent"></div>
