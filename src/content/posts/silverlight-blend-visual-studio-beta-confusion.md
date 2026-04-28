---
title: "Clearing some air in Silverlight, Blend and Visual Studio Beta land"
slug: "silverlight-blend-visual-studio-beta-confusion"
pubDate: 2009-05-24T13:36:59.000Z
lastModified: 2019-10-23T04:20:29.000Z
categories:
  - "silverlight"
  - "wpf"
  - "blend"
  - "expression blend"
  - "xaml"
  - "visual studio"
  - "riaservices"
  - "vs2010"
draft: false
---

<p>In <a href="http://timheuer.com/blog/archive/2009/05/20/silverlight-and-visual-studio-2010-beta.aspx">a previous post</a> I wanted to call attention to the multi-targeting and design surface improvements for <a href="http://silverlight.net/"><strong>Silverlight</strong></a><strong> </strong>developers with <strong>Visual Studio 2010 Beta 1</strong>.  There has been some comments on that post and a few emails and <a href="http://twitter.com/timheuer">Twitter</a> replies as well with some great follow-up questions.  I thought I’d post a sort of <em>what works with what</em> information to help you navigate Betaville as a Silverlight developer.</p>  <blockquote>   <p>NOTE: We’re talking about <strong><em>Beta</em></strong> technologies here.  That means things may not work, that you shouldn’t count on them for production releases at this time, etc.  In the ‘release early, release often’ mantra of things, I know Microsoft may not follow the ‘often’ side of things, but we sure do release early a lot of things.  It is important to have a perspective that this is for mutual benefit, but also remember that it is beta and things may just not work in harmony.</p> </blockquote>  <p>Being an early adopter usually means you are on the edge.  Standing on that edge of technology comes pain with betas at times.  Add to that <em>multiple</em> beta technologies and you may feel like you are pulling your hair out constantly.  Me too.  Here’s the spectrum of things for a Silverlight developer from a current (as of May 2009) perspective.</p>  <h2><a href="sl2"></a>Silverlight 2 Development</h2>  <p>Silverlight 2 has been released for a while now (since Oct 2008) and is production-ready for you to use.  There is full tool support in both Visual Studio 2008 SP1 (just <a href="http://silverlight.net/getstarted">install the Silverlight tools for VS2008</a>) and Blend 2 SP1.  Both VS2008 and Blend 2 can share project files in harmony and edit back and forth.</p>  <p>The recent Visual Studio 2010 Beta 1 (referred to in this post VS10 so I don’t have to keep typing out beta) will also support Silverlight 2 development.  The Silverlight tools will <u>not</u> install on top of VS10 and you’ll get a warning if you try.  If all you want is Silverlight 2 development in VS10 right now, install the <a href="http://www.microsoft.com/downloads/details.aspx?FamilyId=8D933343-038F-499C-986C-C3C7E87A60B3&amp;displaylang=en">Silverlight 2 SDK</a> and the <a href="http://go.microsoft.com/fwlink/?LinkID=119972">Silverlight 2 developer runtime</a>.  That’s it…you can then develop Silverlight 2 applications.</p>  <h2><a href="sl3"></a>Silverlight 3 Development</h2>  <p>Silverlight 3 is currently in beta as are the associated tools (Silverlight 3 tools for VS2008 and Blend 3).  A lot of people have been working fine with these in beta and everything works well.  VS2008 can author SL3 projects and Blend 3 can open them no problem.  Both of these are still in beta right now, but it is important to know that Silverlight 3 release tools will be VS2008 and Blend 3.</p>  <p>For VS10 and Silverlight 3, the situation with the tools is similar to Silverlight 2.  The Silverlight tools installer will still not run on VS10.  If you want to add Silverlight 3 development to your VS10 environment, you can follow my <a href="http://timheuer.com/blog/archive/2009/05/20/silverlight-and-visual-studio-2010-beta.aspx">previous post instructions</a>, which basically is to install the SL3 SDK and SL3 developer runtime.  At this time, VS10 will only target Silverlight 3 beta and will also not run the .NET RIA Services bits that you might be using.</p>  <h2><a href="blend"></a>What about Blend and Visual Studio 2010 Beta 1?</h2>  <p>With VS10 there are some caveats.  With VS10 you can create multi-target solutions.  You can see this when you create a new project in VS10:</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Visual Studio 10 multi-targeting" alt="Visual Studio 10 multi-targeting" src="http://s3.amazonaws.com:80/storage.timheuer.com/vs10-multitargetfx.png" /></p>  <p>Now for the caveat.  If you select <em>.NET Framework 4</em> in VS10, and then open your project in Blend 2 you will see this warning:</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Blend warning on opening VS10 solution file" alt="Blend warning on opening VS10 solution file" src="http://s3.amazonaws.com:80/storage.timheuer.com/blendvs10-warn1.png" /></p>  <p>In my experience under simple circumstances you can still open it and work with files.  Here’s where beta life starts getting confusing.  If your Silverlight application is just the application, you will see the above warnings and should be able to edit (regardless of if your target in the new project window was .NET Framework 4 or 3.5).  Now, <strong>if you also added a web project to your solution</strong> and open it in <a href="http://www.microsoft.com/expression/try-it/blendpreview.aspx">Blend 3 Preview</a>, you will see this:</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Blend warning on opening up .NET 4 project" alt="Blend warning on opening up .NET 4 project" src="http://s3.amazonaws.com:80/storage.timheuer.com/blendvs10-warn2.png" /></p>  <p>Indicating that the web project type is not supported at this time in Blend 3.  The solution will open in blend (if you say yes) but your web project will have a “?” next to it and read (unsupported project).  You’ll still be able to edit the Silverlight application, but not do anything with the web project.</p>  <p><em>What about WPF projects then?!</em></p>  <p>If your target selection was <em>.NET Framework 3.5</em> then you’ll still get the first warning, but should be able to work with the project.  If your target selection was <em>.NET Framework 4</em>, then you’ll get the unsupported warning and won’t be able to work with this.  Oddly enough, Blend 2 will open the .NET 4 project, weird.  In either route, when you compile in blend you’ll see this note:</p>  <div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">   <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">     <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> Project file contains ToolsVersion="4.0", which is not supported by this version of MSBuild.  </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span> Treating the project as if it had ToolsVersion="3.5".</pre>
<!--CRLF--></div>
</div>

<p>That should tell you something if you think Blend 2 is going to build your .NET 4 project just because it will open :-).</p>

<h2><a href="future"></a>Why is it this way and when will it all work?</h2>

<p>Ah, the magic crystal ball.  If we could get all the teams on the same ship cycle it would be easy, but it just isn’t that way right now.  Basically VS10 went into beta 1 lockdown before certain things for Silverlight and Blend tools were able to hit certain milestones.  So given that, here’s where we stand.</p>

<blockquote>
  <p>NOTE: Expression Encoder outputs either Silverlight 1.0 or Silverlight 2 templates and the output are completed projects.  If you open up the source for an Encoder project it will prompt the VS10 upgrade wizard, or in VS2008 just open for you to edit (assuming you have the Silverlight tools installed)</p>
</blockquote>

<p>For Blend 3 and VS10 projects to work in harmony, an update to the Expression Blend 3 preview that supports Visual Studio 2010 and .NET Framework 4 projects is expected to be available in Q3 of 2009.</p>

<p>For VS10 and Silverlight 3 RTW/.NET RIA Services working, we’re looking at an update to VS10 would be needed and we haven’t determined a timeframe on that just yet.</p>

<h2>What should I do?</h2>

<p>Well, as a Silverlight developer, I’ve <a href="http://timheuer.com/blog/archive/2009/05/20/silverlight-and-visual-studio-2010-beta.aspx">given my opinion</a> already.  Until that update for VS10 happens to enable Silverlight 3 RTW and .NET RIA Services development, I think the best option will still be the released tools for the environment (VS2008, Blend 3).  Consider VS10 something to look at, but not ready just yet for full Silverlight 3 development.</p>

<p>For other project types like ASP.NET, WPF, WinForms, etc. you’ll still be able to multi-target in VS10 and most of these are released right now so you should be in a decent environment.  WPF caveats above still apply as most WPF developers also rely on Blend as a tool for their projects.</p>

<h2>Summary</h2>

<p>I know this is totally confusing and it sucks.  After re-reading this, my own head spins.  It is easy for us to say it is the pain of an early adopter…and it is.  By sitting on the edge with beta technologies we take risks and have to determine our own rewards.  Knowing this information should help you be informed about your projects.</p>

<ul>
  <li>Silverlight 2 + VS2008 + Blend 2 development: released, available, working </li>

  <li>Silverlight 2 + VS10 + Blend 2 development: available, working (VS10 in beta) </li>

  <li>Silverlight 3 + VS2008 + Blend 3 development: available, working (Silverlight 3 and Blend 3 in beta) </li>

  <li>Silverlight 3 + VS10 + Blend 3 development: available, working with caveats (Silverlight 3 beta only, no RIA services) </li>

  <li>WPF + VS10 + Blend 3 development: available, caveat of Blend 3 will not open .NET 4 projects from VS10 </li>
</ul>

<p>Remember, virtual machines can be your friend!  For some more general Visual Studio 2010 and .NET 4 training information check out the <a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=752CB725-969B-4732-A383-ED5740F02E93&amp;displaylang=en">training kit here</a>.  For information regarding ASP.NET MVC and VS10, check out <a href="http://haacked.com/archive/2009/05/18/aspnetmvc-vs2010-beta1.aspx">Phil’s post</a>.  Hope this helps!</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:8358e713-c7ef-4f6e-ad1f-0b590ea1ed60" class="wlWriterEditableSmartContent"></div>
