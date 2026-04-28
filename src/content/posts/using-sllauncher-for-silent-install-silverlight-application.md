---
title: "Installing Silverlight applications without the browser involved"
slug: "using-sllauncher-for-silent-install-silverlight-application"
pubDate: 2010-03-25T14:50:10.000Z
lastModified: 2019-10-23T04:20:34.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "ria"
  - "riaservices"
  - "trusted application"
  - "sllauncher"
  - "installshield"
draft: false
---

<p>One of the features we are introducing in <a href="http://silverlight.net">Silverlight</a> 4 is a ‘silent install’ mechanism for out-of-browser applications.  Currently every out-of-browser application (trusted or not) starts from an in-browser mechanism.  In some instances where you want to deploy the app via managed desktop software or perhaps via CD-ROM, you don’t want to have to tell the user to start on an HTML page first.</p>
<p>Now I’m not going to write here about the merits of <em>why</em> you might want to do this other than to point out what I believe to be the 2 prominent scenarios: managed desktop deployment and CD/DVD distribution.  I know some of you might be thinking <em>Well if it is a managed desktop environment, why not just use WPF then?</em> – and I would pose the same question to the customer as well first.  But again, this post is to merely outline the capabilities and I’ll let you all debate the reasons :-)</p>
<p>The function still requires the Silverlight plugin to be installed (and requires Silverlight 4).  It would also require the ability to install out-of-browser applications (there is a possibility for an administrator to disable this feature).  Given those two requirements, the key tool at your disposal is <em>sllauncher.exe</em>.  This is installed with the plugin and is located at <em>%ProgramFiles%\Microsoft Silverlight</em> on the machine.</p>
<blockquote>
<p>NOTE: The features I’m describing here are for Windows machines.  Out-of-browser applications on OSX are actually deployed as ‘apps’ (.app) versus how just the XAP is deployed on a Windows machine.  I’m investigating how to do something similar here with scripting on OSX, but I’m unfortunately not a Mac developer :-).</p>
</blockquote>
<p>Let’s take a look at the required steps and a scenario.</p>
<h2>The Setup</h2>
<p>You’ll need to ensure that the plugin is installed as I mentioned earlier.  You’ll also want to have a copy of the XAP handy that you’ll want to be installing.  This would be the main XAP and would be the same one that would be in the Source parameter of the &lt;object&gt; tag where you normally would host this.</p>
<blockquote>
<p>NOTE: Because “Program Files” is different on 32- and 64-bit machines you’ll want to make sure your script/installer can handle the determination of where the sllauncher.exe program will be.  Since it isn’t a native 64-bit app, it will be in “Program Files (x86)” on a 64-bit machine.  This sometimes can cause confusion because the %ProgramFiles% environment variable on 64-bit is the native program files directory and *not* the x86 one.</p>
</blockquote>
<p>Your Silverlight XAP will already have to have been configured for out-of-browser and have the appropriate manifest information within it.</p>
<p>Once you have those you can move on to understanding the parameters.</p>
<h2>The Options for Install</h2>
<p>The sllauncher.exe program for install require at a minimum 2 options and I’ll suggest that you always use all 4 I will describe here.</p>
<p><em>/install:”path-toXAP-File”</em> – this is the first and points to the XAP file you are wanting to install.  This might be on a network share, on the CD, or in an installer.  This is required.</p>
<p><em>/origin:”URI-to-origin”</em> – this is the ‘origin’ of the XAP and is required.  Even though you might not be using auto-update features, etc. you must set this.  I actually recommend being smart about it and having the XAP on a real URI endpoint as well so that your origin is actually real.</p>
<p><em>/shortcut:desktop+startmenu</em> – while this is optional, it actually seems silly not to include at least one – or your users will have a hard time launching your application!  You can use: desktop, startmenu, or desktop+startmenu (my recommendation).</p>
<p><em>/overwrite</em> – this option confirms the XAP you are installing will overwrite any existing version currently there.  This is optional, but again, I think you should use it.</p>
<p>Let’s assume the following scenario using the <a href="http://bit.ly/facebookclient">Silverlight Client for Facebook</a> application as an example.  I have the XAP (Silverface.xap) that I want to deploy.  I would use the following command:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="str">"%ProgramFiles%\Microsoft Silverlight\sllauncher.exe"</span> </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>     /install:<span class="str">"Silverface.xap"</span> </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     /origin:<span class="str">"http://www.silverlight.net/content/samples/apps/facebookclient/ClientBin/Silverface.xap"</span> </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>     /shortcut:desktop+startmenu /overwrite</pre>
<!--CRLF--></div>
</div>
<p>This assumes that I’m calling this command from where the Silverface.xap is currently.  Notice that the origin parameter points to the XAP origin and not the site hosting it.  This is important.  This above command would install the app and create shortcuts.</p>
<h2>Automatically Launching the App</h2>
<p>So what if you wanted to also automatically launch the app after installing (i.e., the CD/DVD ‘autorun’ scenario).  You again would use sllauncher.exe to do this for you <em>after you’ve installed the app</em>.  Using our same sample above here would be the command:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="str">"%ProgramFiles%\Microsoft Silverlight\sllauncher.exe"</span> </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>     /emulate:"Silverface.xap" </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     /origin:<span class="str">"http://www.silverlight.net/content/samples/apps/facebookclient/ClientBin/Silverface.xap"</span> </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>     /overwrite</pre>
<!--CRLF--></div>
</div>
<p>Notice the <em>emulate</em> command.  This is the launcher.  Now you’ll notice that this isn’t the same command-line options if you looked at an installed applications’ created shortcuts.  Because the folder where the XAP gets installed is pretty random, we use the origin as the hint to the sllauncher.exe program to find the right app for us and start it up.  I’ve found that using /overwrite will also give a more consistent behavior.</p>
<h2>Uninstalling the App</h2>
<p>What if now you want to uninstall the app?  Perhaps the managed desktop admins deprecate an application or you want the CD/DVD experience to be a non-transient one and clean up when done.  The command again is simple:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="str">"%ProgramFiles%\Microsoft Silverlight\sllauncher.exe"</span> </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>     /uninstall </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     /origin:<span class="str"><a href="http://www.silverlight.net/content/samples/apps/facebookclient/ClientBin/Silverface.xap">http://www.silverlight.net/content/samples/apps/facebookclient/ClientBin/Silverface.xap</a></span></pre>
<!--CRLF--></div>
</div>
<p>Instead of the <em>install</em> parameter you use the <em>uninstall</em> parameter.  Again, notice the use of the origin parameter – this is critical in all these tasks.  The above command would remove the application and essentially does the same thing as the right-click <em>Remove this application</em> context menu option in Silverlight.</p>
<h2>Using these commands in Installers</h2>
<p>While I think those that actually have a need for this option will be using scripts and batch files, I do think some may want to include this in an installer experience.  The only option I can see for this is because you are also deploying some additional items along with your XAP (perhaps assets to the user’s document store that the app will use later like plugins or something).  Other than that if you are creating an installer simply to wrap the above methods, it might not seem wise.</p>
<p>Why, you ask?  Well if you think about it, your installer itself will stamp an entry into Windows as an installed application and Silverlight will also stamp an entry.  In our Facebook example, the <em>Add/Remove Programs</em> would show 2 “Silverlight for Facebook” entries (assuming we named our installer that as well).  This would likely confuse the user.  I’m not saying it isn’t impossible to do this nor is it difficult to manage, I just think it looks odd.</p>
<p>Regardless, if you are using something like InstallShield (FYI look for InstallShield LE in Visual Studio 2010…it’s very good) or the Visual Studio Setup projects, you can include a Custom Action to these installers.  The process would be a custom action *after* the install is complete because you need to locate the XAP to install.  Most setup programs are easy to use and provide pre-configured platform-specific environment variables you can use to map to things like the correct Program Files directory.</p>
<p>In the ideal situation you’re batch file/installer should check for the presence of Silverlight (and the correct version).  These can be done using file path verification or registry checking, both of which are outlined in the <a href="http://silverlight.net/learn/whitepapers">deployment guide whitepaper</a>.</p>
<blockquote>
<p>What about redistribution of Silverlight?  Right now we do not have broad redistribution rights for Silverlight.  You will still need to point users to where they can get the plugin so that they can be presented with the EULA and get the correct version for their platform.</p>
</blockquote>
<p>If you do use the installer route, make sure that you account for clean un-installations as well!</p>
<h2>Other insights and summary</h2>
<p>You may be asking yourself if the user will be prompted here to install the application?  The answer is no.  Since this is essentially a command-line execution, the trust is implied here.  The user first has to knowingly type the command (not likely) or knowingly execute your install mechanism (batch file, installer, whatever).  These commands cannot be automatically run from the browser, for example.  For managed desktops, sure, these may be silently installed.  This is intended because in a managed desktop environment the software is, well, managed.  An elevated or normal-privileged application will install just the same using these methods.</p>
<p>As to the shortcuts (the /shortcut parameter being optional).  I think we’re going to fix that in some update.  Again, it’s a bit foolish to not provide one so consider it required :-).</p>
<p>If you find yourself in a situation needing this, hopefully it will come in useful.  I really think this is a helpful tool, but also a niche tool.  Those of you creating general consumer applications/sites will not benefit here really because you’ll likely start with an in-browser instance anyway.  But for those using managed desktop environments, or thinking about CD ‘autorun’ type situations, hopefully this information will come in useful. </p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:4d2a2488-99bb-40a8-8fa3-5c41bc5bcb1d" style="padding: 0px; margin: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
