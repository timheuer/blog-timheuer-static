---
title: "Silverlight 2 RC0 Released for Developers"
slug: "silveright-rc0-released-for-developers"
pubDate: 2008-09-25T22:10:39.000Z
lastModified: 2019-10-23T04:20:23.000Z
categories:
  - "silverlight"
  - "expression"
  - "blend"
  - "xaml"
  - "vs2008"
  - "xap"
  - "rc0"
  - "rtm"
  - "rtw"
draft: false
---

<p>Today we <strong><a href="http://silverlight.net/GetStarted/sl2rc0.aspx">released Silverlight 2 RC0</a></strong><strong>.  </strong>This release is for a very specific purpose and although the information will likely be repeated, I wanted to try to help answer a few questions.</p>
<strong>  </strong>
<p><strong><u><strong>What is this release?</strong></u></strong></p>
<strong>  </strong>
<p>RC0 is a <em style="font-weight: bold;">developer release only</em>!  The intent of providing these bits is to provide developers with ample time to have access to the release candidate runtime/controls for Silverlight with the primary goal of making sure that developers with Silverlight 2 Beta 2 applications that are live today prepare for the release of Silverlight 2.</p>
<strong>  </strong>
<p><strong><strong><u>What should a developer do?</u></strong></strong></p>
<strong>  </strong>
<p>If you have a Silverlight 2 Beta 2 application that is out there today, you should use this RC0 build to port/stage your application <em>in a test environment</em> to this RC0 build and test to make any required changes based on the breaking changes from Beta 2 to RC0.</p>
<strong>  </strong>
<p><strong><strong><u>Why should I care?</u></strong></strong></p>
<strong>  </strong>
<p>Because your Silverlight 2 Beta 2 applications will not work on the release of Silverlight 2.  If you have applications today, you want to make sure that your application will work and that is why we’re providing this RC0 build for developers now.</p>
<strong>  </strong>
<p><strong><strong><u>I’ve made my changes and it works, should I deploy it now?</u></strong></strong></p>
<strong>  </strong>
<p><span style="font-weight: bold;">NO</span>!  This is a developer release only.  <em>What does that mean?</em> That means that there is no end-user installable runtime that is released, only the developer runtime with the developer tools.  If you deploy an RC0 application into the wild your users will be greeted with unfriendly install messages taking them to bits for Beta 2, making them confused.  You should, however, deploy to your test environments for your test team(s) to check out your application.</p>
<strong>  </strong>
<p><strong><strong><u>So why am I doing this again then?</u></strong></strong></p>
<strong>  </strong>
<p>Sorry to be repetitive, but this is for developers.  Again, the goal is to give developers who have Beta 2 applications ample time to port/stage and test their applications.  You want to do this to be ready so that when Silverlight 2 releases, your app will be ready and you can flip the switch on your bits.</p>
<strong>  </strong>
<p><strong><strong><u>Will my end users be auto updated to RC0?</u></strong></strong></p>
<strong>  </strong>
<p>No, end users who have either Silverlight 1.0 or Silverlight 2 Beta 2 installed will not be automatically updated to RC0.  When Silverlight 2 releases, they will be notified of a new version for the release version. </p>
<strong>  </strong>
<p><strong><strong><u>So how will I know what may break?</u></strong></strong></p>
<strong>  </strong>
<p>We’ve created a <a href="http://download.microsoft.com/download/6/f/e/6fe1f43d-9d0c-4346-ad08-602df9bcb3cf/BreakingChangesBetweenBeta2andRelease.doc">breaking changes</a> document that provides the breaking changes between Beta 2 and RC0.  It is available for you to download and we recommend you use this as your guide and first point of attack when troubleshooting porting your application.  The breaking changes document is <a href="http://download.microsoft.com/download/6/f/e/6fe1f43d-9d0c-4346-ad08-602df9bcb3cf/BreakingChangesBetweenBeta2andRelease.doc">located here</a>.</p>
<p>As an example, here’s one that I think is so simple, but might have some banging their heads when their users complain they are still being asked to install Silverlight.  In the Beta 2 builds, if you use the &lt;object&gt; instantiation method, your code may look something like this:</p>
<strong>  </strong>
<div style="border: 1px solid gray; margin: 20px 0px 10px; padding: 4px; overflow: auto; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: consolas,'Courier New',courier,monospace; max-height: 200px; font-size: 8pt; cursor: text;"><strong>   </strong>
<div style="border-style: none; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><strong>     </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   1:</strong></span><strong> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">object</span> <span style="color: rgb(255, 0, 0);">data</span><span style="color: rgb(0, 0, 255);">="data:application/x-silverlight,"</span> <span style="color: rgb(255, 0, 0);">type</span><span style="color: rgb(0, 0, 255);">="application/x-silverlight-2-b2"</span> <span style="color: rgb(255, 0, 0);">width</span><span style="color: rgb(0, 0, 255);">="100%"</span> <span style="color: rgb(255, 0, 0);">height</span><span style="color: rgb(0, 0, 255);">="100%"</span><span style="color: rgb(0, 0, 255);">&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   2:</strong></span><strong>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">param</span> <span style="color: rgb(255, 0, 0);">name</span><span style="color: rgb(0, 0, 255);">="source"</span> <span style="color: rgb(255, 0, 0);">value</span><span style="color: rgb(0, 0, 255);">="ClientBin/XMLFile.xap"</span><span style="color: rgb(0, 0, 255);">/&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   3:</strong></span><strong>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">param</span> <span style="color: rgb(255, 0, 0);">name</span><span style="color: rgb(0, 0, 255);">="onerror"</span> <span style="color: rgb(255, 0, 0);">value</span><span style="color: rgb(0, 0, 255);">="onSilverlightError"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   4:</strong></span><strong>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">param</span> <span style="color: rgb(255, 0, 0);">name</span><span style="color: rgb(0, 0, 255);">="background"</span> <span style="color: rgb(255, 0, 0);">value</span><span style="color: rgb(0, 0, 255);">="white"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   5:</strong></span><strong>     </strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   6:</strong></span><strong>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">a</span> <span style="color: rgb(255, 0, 0);">href</span><span style="color: rgb(0, 0, 255);">="http://go.microsoft.com/fwlink/?LinkID=115261"</span> <span style="color: rgb(255, 0, 0);">style</span><span style="color: rgb(0, 0, 255);">="text-decoration: none;"</span><span style="color: rgb(0, 0, 255);">&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   7:</strong></span><strong>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">img</span> <span style="color: rgb(255, 0, 0);">src</span><span style="color: rgb(0, 0, 255);">="http://go.microsoft.com/fwlink/?LinkId=108181"</span> <span style="color: rgb(255, 0, 0);">alt</span><span style="color: rgb(0, 0, 255);">="Get Microsoft Silverlight"</span> <span style="color: rgb(255, 0, 0);">style</span><span style="color: rgb(0, 0, 255);">="border-style: none"</span><span style="color: rgb(0, 0, 255);">/&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   8:</strong></span><strong>     <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">a</span><span style="color: rgb(0, 0, 255);">&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   9:</strong></span><strong> <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">object</span><span style="color: rgb(0, 0, 255);">&gt;</span></strong></pre>
<strong>  </strong></div>
</div>
<p>In RC0 (and release) you’ll want to change it to this:</p>
<div style="border: 1px solid gray; margin: 20px 0px 10px; padding: 4px; overflow: auto; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: consolas,'Courier New',courier,monospace; max-height: 200px; font-size: 8pt; cursor: text;"> <strong>  </strong>
<div style="border-style: none; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"> <strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   1:</strong></span><strong> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">object</span> <span style="color: rgb(255, 0, 0);">data</span><span style="color: rgb(0, 0, 255);">="data:application/x-silverlight,"</span> <span style="color: rgb(255, 0, 0);">type</span><span style="color: rgb(0, 0, 255);">="application/x-silverlight-2"</span> <span style="color: rgb(255, 0, 0);">width</span><span style="color: rgb(0, 0, 255);">="100%"</span> <span style="color: rgb(255, 0, 0);">height</span><span style="color: rgb(0, 0, 255);">="100%"</span><span style="color: rgb(0, 0, 255);">&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   2:</strong></span><strong>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">param</span> <span style="color: rgb(255, 0, 0);">name</span><span style="color: rgb(0, 0, 255);">="source"</span> <span style="color: rgb(255, 0, 0);">value</span><span style="color: rgb(0, 0, 255);">="ClientBin/XMLFile.xap"</span><span style="color: rgb(0, 0, 255);">/&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   3:</strong></span><strong>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">param</span> <span style="color: rgb(255, 0, 0);">name</span><span style="color: rgb(0, 0, 255);">="onerror"</span> <span style="color: rgb(255, 0, 0);">value</span><span style="color: rgb(0, 0, 255);">="onSilverlightError"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   4:</strong></span><strong>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">param</span> <span style="color: rgb(255, 0, 0);">name</span><span style="color: rgb(0, 0, 255);">="background"</span> <span style="color: rgb(255, 0, 0);">value</span><span style="color: rgb(0, 0, 255);">="white"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   5:</strong></span><strong>     </strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   6:</strong></span><strong>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">a</span> <span style="color: rgb(255, 0, 0);">href</span><span style="color: rgb(0, 0, 255);">="http://go.microsoft.com/fwlink/?LinkID=124807"</span> <span style="color: rgb(255, 0, 0);">style</span><span style="color: rgb(0, 0, 255);">="text-decoration: none;"</span><span style="color: rgb(0, 0, 255);">&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   7:</strong></span><strong>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">img</span> <span style="color: rgb(255, 0, 0);">src</span><span style="color: rgb(0, 0, 255);">="http://go.microsoft.com/fwlink/?LinkId=108181"</span> <span style="color: rgb(255, 0, 0);">alt</span><span style="color: rgb(0, 0, 255);">="Get Microsoft Silverlight"</span> <span style="color: rgb(255, 0, 0);">style</span><span style="color: rgb(0, 0, 255);">="border-style: none"</span><span style="color: rgb(0, 0, 255);">/&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   8:</strong></span><strong>     <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">a</span><span style="color: rgb(0, 0, 255);">&gt;</span></strong></pre>
<strong>    </strong>
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: consolas,'Courier New',courier,monospace; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);"><strong>   9:</strong></span><strong> <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">object</span><span style="color: rgb(0, 0, 255);">&gt;</span></strong></pre>
<strong>  </strong></div>
</div>
<p>Notice the type attribute in the &lt;object&gt; tag changes from <em>application/x-silverlight-2-b2</em> to <em>application/x-silverlight-2</em>.  Please note this is the plugin application type only and not to be confused with the server-side MIME type mapping (which should be .XAP mapping to <em>application/x-silverlight-app</em>).</p>
<p>Also notice the correct link to the “fwlink” to the runtime.  When Silverlight releases you’ll be sure in your <a href="http://timheuer.com/blog/archive/2008/03/25/creating-a-great-silverlight-deployment-experience.aspx">custom install experience</a> (please don’t use the default) you’ll want to point to the right link.</p>
<p><strong><strong><u>Ok, I’m convinced, what do I need to do?</u></strong></strong></p>
<p>Here’s what I’d do if I had a beta 2 application:</p>
<ul>
    <ul>
        <li>Re-read the above to make sure I understand the intent of this release fully. </li>
        <li>Download the <a href="http://go.microsoft.com/fwlink/?LinkId=129043">Silverlight Tools for Visual Studio 2008 (RC0)</a> – this will give you the VS project templates, the VS updates required, the RC0 developer runtime and the SDk documents. </li>
        <li>Download the <a href="http://www.microsoft.com/expression/try-it/default.aspx?filter=prerelease">Expression Blend 2 Service Pack 1 Preview</a> – this build of Blend is targeted against the release bits of Silverlight and will help you in porting your application. </li>
        <li>Make sure you have a backup of your project (or set a version/tag/branch in your source control) so you can rollback if needed. </li>
        <li>Open your Silverlight project using the updated tools.  You’ll see a note about the project needing to be upgraded. </li>
        <li>Compile/run your application and pay attention to any warnings/errors that the compiler/Visual Studio spit out. </li>
        <li>Compare/contrast any warnings/errors with the <a href="http://download.microsoft.com/download/6/f/e/6fe1f43d-9d0c-4346-ad08-602df9bcb3cf/BreakingChangesBetweenBeta2andRelease.doc">breaking changes document</a> and modify if needed. </li>
        <li>Put your application in a test environment only for your developers/internal testers to mess around with.  Do not deploy your application to your customers yet! </li>
        <li>Rinse.  Repeat.  The testing/changing cycle that is. </li>
    </ul>
</ul>
<p>This should get you going rather quickly.  If you experience issues, use the appropriate feedback channels that you’ve already established (i.e., if you are working with someone at Microsoft or have a contact).  Please be sure to consult the breaking changes document first though.</p>
<p>Allow me to comment about breaking changes.  I know that as a developer this can add work for you…ah the joys of being an early adopter!  Breaking changes in beta to release products can be a good thing if it helps bring compatibility in frameworks and if it makes for an easier or more logical API.</p>
<p><strong><strong><u>Okay, so we do all this prep work, when is Silverlight 2 releasing?</u></strong></strong></p>
<p>Ah, the magic question.  While we aren’t providing any dates right now, we are still committing to shipping Silverlight this year.  We are providing this release now to ensure you as a developer can stage/test your Beta 2 applications and be ready!  If you don’t have any applications that are running now (live) on Beta 2 but have been working on one, then you’ll want to start with RC0 as well so that you minimize the work you have to do when you go live.</p>
<p><strong><strong><u>Other goodness</u></strong></strong></p>
<p>The ADO.NET Data Services (the artist formerly known as “Astoria”) bits are also updated in RC0 SDK/Tools.  The <a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=CF8F88C3-D869-46DE-A7BF-FB7712C791B7&amp;displaylang=en">bits that were provided as a stop gap</a> are now a part of the RC0 bits.</p>
<p>Need the Mac developer runtime for testing?  You can get that <a href="http://go.microsoft.com/fwlink/?LinkId=129186">here</a>.  Also keep in mind this is a developer build as well.</p>
<p><em>What’s new you say?</em>  Well not a ton (as we’ve been saying) but you should see a <span style="font-weight: bold;">ProgressBar</span>, <span style="font-weight: bold;">PasswordBox </span>and <span style="font-weight: bold;">ComboBox </span>in there now!  In addition to the new controls, all the controls were updated with new skin templates.  Also the RC0 bits allow you to enable HTTP hosted applications to call secure services (policy file required), which I know people have been wanting.  Wondering about stuff that <a href="http://blogs.msdn.com/sburke/archive/2008/09/17/control-freak.aspx">Shawn mentioned</a>?  Well you shouldn’t have expected them here for 2 reasons.  First, they aren’t going to be a part of the core runtime.  Second he mentioned that they are working toward a preview release for PDC (end of October).  So be on the lookout for that work!</p>
<p>I hope this helps!  Again, this information is also <a href="http://silverlight.net/GetStarted/sl2rc0.aspx">linked here</a> and you can see some more <a href="http://weblogs.asp.net/scottgu/archive/2008/09/25/silverlight-2-release-candidate-now-available.aspx">notes from ScottGu here</a>.<br />
</p>
<div style="margin: 0px; padding: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:10a9a470-ab95-45ca-9e1e-879df4241052" class="wlWriterEditableSmartContent"></div>

