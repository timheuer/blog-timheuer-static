---
title: "New Silverlight 4 Themes available&ndash;get the raw bits"
slug: "new-silverlight-4-themes-available-for-download"
pubDate: 2010-05-03T10:24:59.000Z
lastModified: 2019-10-23T04:20:35.000Z
categories:
  - "silverlight"
  - "wpf"
  - "expression"
  - "expression blend"
  - "xaml"
  - "templates"
  - "ria"
  - "controls"
  - "styles"
  - "toolkit"
  - "riaservices"
  - "themes"
  - "theming"
draft: false
---

<p><font size="5"><span style="font-weight: bold;">NOW OFFICIALLY RELEASED: <a href="http://go.microsoft.com/fwlink/?LinkId=192411">DOWNLOAD HERE</a></span></font><br />
</p>
<p>A while back I <a href="http://timheuer.com/blog/archive/2010/03/11/silverlight-application-theme-preview-sneak-peek-template.aspx">posted a sneak peek preview of 3 new themes</a> that we were working on for <a href="http://www.silverlight.net"><strong>Silverlight</strong></a><strong> 4</strong> applications.  Our team wanted to do more than just the overall base theme and provide the themes for the core, SDK and some <a href="http://silverlight.codeplex.com"><strong>Silverlight Toolkit</strong></a> controls as well.  In addition, there was a lot of internal chatter about how cool these new themes were and a lot of teams wanting to adopt them as default, including WCF RIA Services.</p>
<p>While we finalize a better distribution plan for these templates (and some may show up as defaults soon), I wanted to provide a raw drop of the sample project we use to display the themes.  These projects have the Silverlight <strong>ResourceDictionary</strong> files for the themes and a few pages showing samples.  <em>These are raw theme project files.</em>  And without further adieu, I present the bits for you:</p>
<h2>Grayscale Theme</h2>
<p>This theme is a clean implementation that initially has a ‘greenscale’ approach to it, but modifying the brushes even slightly will give you some great color pallettes to work with.</p>
<p><img src="http://storage.timheuer.com/greenscale1.png" alt="Silverlight 4 Theme - Grayscale" title="Silverlight 4 Theme - Grayscale" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>Honestly, initially this one didn’t pop for me as much, but the fit-n-finish added here is really making me like this structure.  And the ability to change a single brush and have it replicate through other areas makes this clean template highly customizable.</p>
<h2>Windows Theme</h2>
<p>Want a theme for your application to look a bit more native?  Here’s a starter place for you.  </p>
<p><img src="http://storage.timheuer.com/win7theme-2.png" alt="Silverlight 4 Theme - Windows" title="Silverlight 4 Theme - Windows" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<h2>Cosmopolitan Theme (formerly Metro)</h2>
<p>And finally the most popular requested, we’re calling Cosmopolitan.  This one has features that resemble the Zune and Windows Phone design language aspects of it in a modern, clean UI form.</p>
<p><img src="http://storage.timheuer.com/cosmo1.png" alt="Silverlight 4 Theme - Cosmopolitan" title="Silverlight 4 Theme - Cosmopolitan" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>This theme also has a ToUpper and ToLower behavior files that you can apply to your XAML for text formatting.</p>
<h2>How these raw projects are structured</h2>
<p>As I mentioned, these are raw project structures…ripped from the designer’s desktop, zipped and presented here.  There may be dependencies that you don’t have and will need (i.e., Toolkit, etc.).  There may be residual test files in there.  Deal with it :-).  But at the basics the core themes are all structured as ResourceDictionary files in the Assets folder:</p>
<p><img src="http://storage.timheuer.com/newthemes-structure1.png" alt="Theme project structure" title="Theme project structure" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>As you can see in here the files should be relatively self-explanatory.   We tried to make it so that you can pick and choose what you’d like from them (as well as learn how to segment out these types of dictionary files).</p>
<p>In each project you will also see the themes represented in showing: core controls, sdk controls and toolkit controls.  Please make sure to appreciate all of them.  I didn’t post screenshots of all here.</p>
<h2>The future deployment of these themes/templates</h2>
<p>The idea is that we’ll clean these up in a more distributable manner.  We’ll likely create VSIX files (Visual Studio extension installers) so that you could then say <em>File…New Silverlight Cosmopolitan Application</em> and have these already in there.  This also allows us to put them in the Visual Studio Gallery where you can search/download directly to Visual Studio.  We also will likely put the resources on the Expression Gallery for download.  And as I mentioned before, it’s possible that future iterations of things like WCF RIA Services and such might use them as default.  You tell me: what is the best distribution method?  How would you expect to download/install/use these?</p>
<h2>Summary</h2>
<p>I love these new themes.  I think our design team did a great job here.  Tsitsi and <a href="http://blogs.msdn.com/corrinab">Corrina</a> are awesome and put a lot of work into refining these.  By the feedback that I’ve been getting in email and blog comments, these are exactly the type of things that you’ve been wanting.  Mostly from developers I’m hearing the <em>thank you for helping me since I have no design skills</em>!  This is great feedback that our team loves to hear.  I hope you find these valuable.</p>
<p>These raw project templates here are essentially the Silverlight Navigation Application template modified.  We’ll have the biz app ones a while later, but these should get you started.</p>
<p>Hope this helps! </p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:420976b8-3742-499b-b05c-b569763d5559" style="padding: 0px; margin: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
