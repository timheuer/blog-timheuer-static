---
title: "Updating Silverlight.js and Firefox 3"
slug: "updating-your-silverlight-javascript-detection"
pubDate: 2008-07-02T22:49:46.000Z
lastModified: 2019-10-23T04:20:20.000Z
categories:
  - "silverlight"
  - "expression"
  - "silverlight.js"
  - "encoder"
  - "firefox 3"
  - "supporteduseragent"
  - "silverlightjs"
draft: false
---

<p>I’m hoping this post will help explain a few things with regard to <a href="http://silverlight.net"><strong>Silverlight</strong></a> detection scripts that some sites may be using.  This is related to the <strong>silverlight.js</strong> Javascript file that was deployed with a lot of Silverlight 1.0 applications/sites and is also available as a part of the <strong>Silverlight 2 SDK</strong> tools.</p>
<p><strong><u>What the heck is this Silverlight.js you speak of?</u></strong></p>
<p>Simply put, Silverlight.js is a helper file which enables Web sites to create advanced Silverlight installation and instantiation experiences.  It was a resource file that was initially shipped along side several templates and helper projects to aid in the detection of browsers and platforms and instantiate a new Silverlight application on a web page.  This actually was a method similar to other frameworks that used Javascript to instantiate plugin content to provide for a better user experience in some deployment instances.  When delivering rich internet applications, it is important to provide your users with the most positive experience in installing any plugins they may require.  You can read more about my thoughts about that here in <em><a href="http://timheuer.com/blog/archive/2008/03/25/creating-a-great-silverlight-deployment-experience.aspx">Providing a great Silverlight deployment experience</a></em>.</p>
<p>Although not generally used for Silverlight 2 deployment now in favor of simply using the &lt;object&gt; tag explicitly, it is still a resource available to site developers should they choose to use it.  It provides some simple functions like checking if Silverlight is installed, and a method to create the HTML output content for when it is (object) and when it is not (HTML content).</p>
<p><strong><u>So why is it being updated, is something totally wrong?</u></strong></p>
<p>Not really.  We received feedback on some areas of the file and some scenarios where an enhanced version of certain aspects should be modified.  As an example, after the plugin was installed (by a user who previously did not have Silverlight), the browser had to be refreshed (and in some cases restarted) prior to the Silverlight plugin being able to be used.  This was one area of feedback that we heard and while some script methods surfaced as work arounds, ultimately they ended up being incorporated into this newer Silverlight.js file.</p>
<p>Some of the enhancements provided in this update are:</p>
<ul>
    <ul>
        <li>Auto-refresh behavior where available, providing <em>WaitForInstallation and onSilverlightInstalled</em> hooks for developers to use. </li>
        <li>Reduced clicks in the default installation badge </li>
        <li>Inproved UI for default badge image (i.e., looks better on all sites) </li>
    </ul>
</ul>
<p>Although they may seem minor, they help in enabling site owners deliver great deployment experiences.</p>
<p><strong><u>Great, so where can I get this update?</u></strong></p>
<p>The updated Silverlight.js file has been available for a while in the Silverlight 2 SDK materials.  However, you have had to download the full Silverlight 2 SDK just to get to the one file you may need.</p>
<blockquote>
<p>NOTE: If you have already done this, the file is located in C:\Program Files\Microsoft SDKs\Silverlight\v2.0\Tools path.</p>
</blockquote>
<p>Today, we actually made it available on its own without having to download the full Silverlight 2 SDK (but you should really check out Silverlight 2…it’s really great).  Leveraging the MSDN Code Gallery, the Silverlight.js file is now available for download as a stand-alone file at the <a href="http://code.msdn.microsoft.com/silverlightjs">Silverlight.js Code Gallery project site</a>.  A link to the API documentation and any breaking changes from the previous version are also available there.  What is further great is that it is being released under the <a href="http://www.opensource.org/licenses/ms-pl.html"><strong>Microsoft Public License</strong></a> (<a href="http://www.opensource.org/licenses/ms-pl.html">Ms-Pl</a>), which means it is available for you to freely modify to your own needs.</p>
<p><strong><u>I got the file, how and what should I be updating with this new file?</u></strong></p>
<p>Now that you have the updated file, what do you do with it.  Well, that depends :-).  The simplest answer here is to replace your old Silverlight.js file with this new one.  <strong>IMPORTANT: Review the </strong><a href="javascript:window.location.href='http://code.msdn.microsoft.com/Project/Download/FileDownload.aspx?ProjectName=silverlightjs&amp;DownloadId=2485';"><strong>breaking changes documentation</strong></a><strong> to ensure you aren’t using things that may break.</strong>  If you never knew you were even using the Silverlight.js file you should generally be safe with a simple replace.  Your old file will likely be sitting in your web application and named Silverlight.js…just copy this file over that one (I’d recommend backing up your old one just in case).</p>
<p>There may be other areas where you want to update the file so that you don’t have to update the file to begin with.  Now, please note this is a suggestion from me and likely ‘unsupported’ but I feel pretty safe about updating these templates.   Here are some suggestions:</p>
<p><em><u>Visual Studio 2005 Project Templates</u></em></p>
<p>If you are using VS2005, you probably downloaded the Silverlight 1.0 SDK which installed some VS2005 project templates for your creating Silverlight 1.0 applications.  Look for the template file in <em>C:\users\(username}\Documents\Visual Studio 2005\Projects\Templates\ProjectTemplates\Silverlight\<strong>SilverlightJSApplication.zip</strong></em>.  This is the path on Vista, but the user path is slightly different on Windows XP (c:\documents and settings…etc.).  If you open that archive you’ll see the Silverlight.js file there.  Now, please note this is a suggestion from me and likely ‘unsupported’ but I feel pretty safe about updating this template.  Simply use your favorite archive tool to open the template file and replace the Silverlight.js file with the new one.  Now when you choose <em>File…New…Silverlight Javascript Application </em>in Visual Studio 2005 you’ll have the updated Silverlight.js file already!</p>
<p><em><u>Visual Studio 2008 Project Templates</u></em></p>
<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">
<p>NOTE: These actually shouldn't need updating if you are using the latest Silverlight 2 Beta 2 SDK tools...the templates already have the update in them.</p>
</blockquote>
<p>If you are using VS2008 you are likely using Silverlight 2 development (which the project templates do not use Silverlight.js), but there actually is a <em>Silverlight Script Web</em> project type for still working on 1.0 projects.  The location of that template is <em>C:\Program Files\Microsoft Visual Studio 9.0\Common7\IDE\ProjectTemplates\Web\{language}\1033</em> where <em>language</em> is both <strong>CSharp</strong> and <strong>VisualBasic</strong> (there is a template for both).  Within this folder is an archive file called <strong>SilverlightScriptWeb.zip</strong> which is the template file.  If you open that archive you’ll see the Silverlight.js file there.  Simply use your favorite archive tool to open the template file and replace the Silverlight.js file with the new one.  Now when you choose <em>File…New Web Site…Silverlight Script Web</em> in Visual Studio 2008 you’ll have the updated Silverlight.js file already!</p>
<p><em><u>Expression Encoder Output Templates</u></em></p>
<p>All of the Expression Encoder media output templates use this file.  This process is a bit more time because there are more templates than just two.  Navigate to <em>C:\Program Files\Microsoft Expression\Encoder 2\Templates\en</em> to see the templates.  If you have Encoder 1 installed the path will be different slightly in <em>C:\Program Files\Microsoft Expression</em> and might be called <em>Media Encoder</em> depending on what version you have (but you really should get <a href="http://www.microsoft.com/expression/products/Overview.aspx?key=encoder"><strong>Encoder 2</strong></a>, it rocks).  In each of those template folder you’ll see the Silverlight.js file there.  Again, I’d recommend backing this up ‘just in case’ before making any changes.  Since none of these are in an archive folder, you can copy/paste the file into each of the template folders.  If you have <a href="http://www.microsoft.com/windowsserver2003/technologies/management/powershell/download.mspx"><strong>Powershell</strong></a> installed you can navigate to the run this command (nod to <a href="http://www.hanselman.com/blog/">ScottHa</a> for the help):</p>
<div style="BORDER-RIGHT: gray 1px solid; PADDING-RIGHT: 4px; BORDER-TOP: gray 1px solid; PADDING-LEFT: 4px; FONT-SIZE: 8pt; PADDING-BOTTOM: 4px; MARGIN: 20px 0px 10px; BORDER-LEFT: gray 1px solid; WIDTH: 97.5%; CURSOR: text; MAX-HEIGHT: 200px; LINE-HEIGHT: 12pt; PADDING-TOP: 4px; BORDER-BOTTOM: gray 1px solid; FONT-FAMILY: consolas, 'Courier New', courier, monospace; BACKGROUND-COLOR: #f4f4f4">
<div style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; FONT-SIZE: 8pt; PADDING-BOTTOM: 0px; OVERFLOW: visible; WIDTH: 100%; COLOR: black; BORDER-TOP-STYLE: none; LINE-HEIGHT: 12pt; PADDING-TOP: 0px; FONT-FAMILY: consolas, 'Courier New', courier, monospace; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BACKGROUND-COLOR: #f4f4f4; BORDER-BOTTOM-STYLE: none">
<pre style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; FONT-SIZE: 8pt; PADDING-BOTTOM: 0px; MARGIN: 0em; OVERFLOW: visible; WIDTH: 100%; COLOR: black; BORDER-TOP-STYLE: none; LINE-HEIGHT: 12pt; PADDING-TOP: 0px; FONT-FAMILY: consolas, 'Courier New', courier, monospace; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BACKGROUND-COLOR: #f4f4f4; BORDER-BOTTOM-STYLE: none"><span style="COLOR: #606060">   1:</span> dir . silverlight.js -recurse |% { copy c:\foo $_.FullName  }</pre>
</div>
</div>
<p>obviously replacing {c:\foo} with the location of where you downloaded the updated Silverlight.js file.  One note here is that the Encoder templates included an obfuscated/compressed version of Silverlight.js.  The new one is not compressed/obfuscated and you should test your templates to ensure everything works.</p>
<p><strong><u>Does this fix any Firefox 3 issues?</u></strong></p>
<p>It’s important to note that Firefox 3 is not currently a supported browser for Silverlight.  At the time of release of Silverlight 1.0, Firefox 3 was not a released product.  And right now Silverlight 2 is still in beta as well.  We intent on making Firefox 3 a supported browser when Silverlight 2 releases this year.</p>
<p>That said the updated file will likely fix one problem with Firefox 3 visiting sites that use Silverlight.js.  Using the old file, visitors using Firefox 3 would see an image asking them to install Silverlight even though they already had it installed.  We’ve made some updates to the isInstalled method to cover the Firefox 3 scenario so this won’t happen.</p>
<p>You can see an example I put up on my server by visiting the same Silverlight application using the <strong><a href="http://timheuer.com/ff3oldscript">old script</a></strong> or the <strong><a href="http://timheuer.com/ff3newscript">new script</a></strong>.  The only difference between these two is a cut/paste of Silverlight.js.</p>
<p><em>OLD:</em></p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/ff3-oldscript.png" /></p>
<p><em>NEW (replacing only silverlight.js):</em></p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/ff3-newscript.png" /></p>
<p><strong>Attention site owners:</strong>  If you are seeing information from your users or haven’t tested your Silverlight applications in Firefox 3, please do so and update to the latest Silverlight.js file if you are using the old one.  Visitors, if you see sites that are displaying the ‘install Silverlight’ badge and you have Silverlight installed, you can try to contact them and refer them to this post…or leave a comment here as well.  Yes, I know some Microsoft sites need this update as well, we’re working on getting the site owners to update as well!</p>
<p><strong><u>I saw a link about Silverlight.supportedUserAgent.js as well, what is that?</u></strong></p>
<p>This file is an optional add-on for Silverlight.js. It adds Silverlight.supportedUserAgent function which determines if the user's browser is supported by Silverlight.  This is not included in the base because supportedUserAgent is highly dependent upon the current Web browser implementations.  Because browsers evolve, this file would need to be updated more frequently than Silverlight.js.  If you need this functionality, you’ll want to check back often to get any updates.  The supportedUserAgent file has a <a href="http://code.msdn.microsoft.com/SLsupportedUA">Code Gallery project site</a> as well.</p>
<p>I hope this helps clear up some confusion and provide some pointers where you might want to update.  If you have any questions, leave a comment and I’ll do my best to answer!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:b1f6c064-6744-463b-8533-e526e8c48241" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>

