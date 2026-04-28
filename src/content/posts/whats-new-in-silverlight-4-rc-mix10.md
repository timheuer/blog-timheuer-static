---
title: "A guide to what has changed in the Silverlight 4 RC"
slug: "whats-new-in-silverlight-4-rc-mix10"
pubDate: 2010-03-15T10:24:28.000Z
lastModified: 2019-10-23T04:20:34.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "mix"
  - "ria"
  - "xap"
  - "riaservices"
  - "mix10"
  - "sllauncher"
draft: false
---

<p><font size="5"><span style="font-weight: bold;">UPDATE: Silverlight 4 is RELEASED!  <a href="http://timheuer.com/blog/archive/2010/04/15/download-silverlight-4-released.aspx">READ HERE</a>!</span></font></p>
<p><a href="http://silverlight.net/getstarted/silverlight-4"><img border="0" align="right" src="http://storage.timheuer.com/sl4bloglogo.png" alt="Silverlight 4" title="Silverlight 4" style="border-width: 0px; margin: 0px 20px; display: inline;" /></a>At MIX10, <a href="http://silverlight.net">Silverlight</a> 4 released an update, the Silverlight 4 RC (release candidate).  A few things have changed since the beta which was released in November.  If you haven’t read my <strong><a href="http://timheuer.com/blog/archive/2009/11/18/whats-new-in-silverlight-4-complete-guide-new-features.aspx">guide to Silverlight 4</a></strong> you may want to check that out.  The features still exist, but there are some changes to the implementations of some of the features as well as some new ones.  Please <a href="http://timheuer.com/blog/archive/2009/11/18/whats-new-in-silverlight-4-complete-guide-new-features.aspx">go read the previous post</a> to familiarize yourself with the features.  This post will be complimentary to that and identify new/changed.</p>
<p>First let’s get you going with the <a href="http://silverlight.net/getstarted/silverlight-4/">tools</a>:</p>
<ul>
    <li><a href="http://go.microsoft.com/fwlink/?LinkID=151797">Visual Studio 2010 RC</a><a href="http://www.microsoft.com/express/Downloads/#Visual_Studio_2010_Express_Downloads"></a> </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkID=141284">Silverlight 4 Tools for Visual Studio 2010</a> (this installs Silverlight developer runtime, SDK, tools, and <a href="http://silverlight.net/riaservices">WCF RIA Services</a>). </li>
    <li><a href="http://silverlight.codeplex.com">Silverlight Toolkit</a> March 2010 Release (coming soon)<br />
    </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkId=185121">WCF RIA Services Toolkit</a> </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkId=169446">Expression Blend 4 beta</a> (note: existing Blend 3 licensed users will get this as a free upgrade) </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkId=167831">BREAKING CHANGES DOCUMENTATION</a> – read this </li>
    <li><a href="http://silverlight.net/getstarted/devices/windows-phone">Windows Phone Developer tools</a> </li>
</ul>
<p>And since sometimes people just want to get going with learning resources here’s my top suggestions:</p>
<ul>
    <li><a href="http://silverlight.net/learn/videos/silverlight-4-videos/">Silverlight learning videos for Silverlight 4</a> (3 new feature ones added)
    <ul>
        <li><a href="http://silverlight.net/learn/videos/all/custom-window-chrome">Custom Windows Chrome</a> </li>
        <li><a href="http://silverlight.net/learn/videos/all/xap-signing">XAP Signing</a> </li>
        <li><a href="http://silverlight.net/learn/videos/all/fullscreen-window-pinning">Full-screen pinning mode</a> </li>
    </ul>
    </li>
    <li><a href="http://silverlight.net/learn/handsonlabs/">Silverlight 4 hands-on-labs</a> – major updates including an 8-part business application lab </li>
    <li><a href="http://silverlight.net/learn/books/">Silverlight 4 books</a> – check out what you can pre-order from the experts </li>
</ul>
<p><a name="top"></a>So here we go, here’s my brain dump of some key areas of what you’ll be seeing in the Silverlight 4 RC.  This is not all-inclusive, but I think a list of some that most will want to know about.</p>
<table width="600" cellspacing="0" cellpadding="2" border="0">
    <tbody>
        <tr>
            <td width="300" valign="top"><strong><u>Changed</u></strong></td>
            <td width="300" valign="top"><strong><u>New</u></strong></td>
        </tr>
        <tr>
            <td width="300" valign="top">
            <ul>
                <li><a href="#richtextbox">RichTextBox improvements</a> </li>
                <li><a href="#webbrowser">WebBrowser control</a> </li>
                <li><a href="#printing">Printing API enhancements</a> </li>
                <li><a href="#native">Native automation (COM interop)</a> </li>
                <li><a href="#language">Language/Script support</a> </li>
                <li><a href="#networking">Networking and Sockets</a> </li>
                <li><a href="#user-consent">User consent dialog on webcam/clipboard/etc.</a> </li>
            </ul>
            </td>
            <td width="300" valign="top">
            <ul>
                <li><a href="#xap-signing">XAP Signing</a> </li>
                <li><a href="#custom-window-chrome">Custom window chrome for trusted applications</a> </li>
                <li><a href="#pinned-fullscreen">Pinned full-screen mode</a> </li>
                <li><a href="#riaservices">WCF RIA Services Toolkit</a> </li>
                <li><a href="#context-control">ContextMenu control</a> </li>
                <li><a href="#sllauncher">SLLauncher silent installs</a> </li>
            </ul>
            </td>
        </tr>
    </tbody>
</table>
<h2>A quick note about Visual Studio 2010 RC</h2>
<p>The Silverlight 4 tools linked above target the RC release of Visual Studio.  There have been 2 patches to Visual Studio 2010 RC since it’s release.  It is recommended that you have these two patches installed prior to installing the Silverlight tools.  Information about these patches (and links to them) is available <a target="_blank" href="http://blogs.msdn.com/visualstudio/archive/2010/03/02/second-patch-now-available-for-intellisense-crashes-in-vs-2010-rc.aspx">here</a>.</p>
<h2><a name="richtextbox"></a>RichTextBox (the control formerly known as RichTextArea)</h2>
<p>Silverlight 4 introduced a new control for enabling editing and display of rich text.  (<a href="http://timheuer.com/blog/archive/2009/11/18/whats-new-in-silverlight-4-complete-guide-new-features.aspx#richtext">See original details here for RichTextArea</a>.)  A few things have changed here, one key one being the name: <em>RichTextBox</em>.  This was to be more consistent with WPF and also based on your feedback.  Additional improvements were also enabling the ability to get the XAML that makes up the underlying runs and paragraph of the rich text.  This is helpful for saving off the data and re-hydrating later if desired.  It’s a simple property on the RichTextBox control (assuming the control name is ‘MyRichContent’):</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">string</span> richText = MyRichContent.Xaml;</pre>
<!--CRLF--></div>
</div>
<p>In addition to that, there are also some new text selection and position APIs to enable you programmatically select text and/or know where the current position of the text is located.  This is best demonstrated in the ‘Silverlight Notepad’ sample application in the <a target="_blank" href="http://silverlight.net/learn/handsonlabs">hands-on-lab</a> area where you can see examples of it being used.</p>
<p><a href="#top">^ back to top</a></p>
<h2><a name="webbrowser"></a>WebBrowser control</h2>
<p>The beta provided us with a mechanism for <a target="_blank" href="http://timheuer.com/blog/archive/2009/11/18/whats-new-in-silverlight-4-complete-guide-new-features.aspx#htmlhost">hosting HTML content</a> within an out-of-browser application.  This is still available to us, however some APIs have changed.  The HtmlBrush is now called the WebBrowserBrush to be consistent in naming and what it actually does.</p>
<p>You can view a <a href="http://silverlight.net/learn/videos/all/Hosting-HTML-Content">video on using the WebBrowser control here</a>.</p>
<p><a href="#top">^ back to top</a></p>
<h2><a name="printing"></a>Printing API enhancements</h2>
<p>The printing API was enhanced to help developers query for the printer page size and the printable area.  Another change was where the ‘document name’ is provided.  It is now required and a part of the Print() method.  Before:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> PrintDocument doc = <span class="kwrd">new</span> PrintDocument();</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span> doc.DocumentName = <span class="str">"Sample Document"</span>;</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span> doc.Print();</pre>
<!--CRLF--></div>
</div>
<p>After:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> PrintDocument doc = <span class="kwrd">new</span> PrintDocument();</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span> doc.Print(<span class="str">"Sample Document"</span>);</pre>
<!--CRLF--></div>
</div>
<p>You can view a <a href="http://silverlight.net/learn/videos/all/Printing-API-Basics">video on using the printing APIs here</a>.</p>
<p><a href="#top">^ back to top</a></p>
<h2><a name="native"></a>Native automation (COM interop)</h2>
<p>API changes in the naming of the <a target="_blank" href="http://timheuer.com/blog/archive/2009/11/18/whats-new-in-silverlight-4-complete-guide-new-features.aspx#com">native integration (COM interop) feature</a> for trusted applications.  Before:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> dynamic excel = ComAutomationFactory.CreateObject(<span class="str">"Excel.Application"</span>);</pre>
<!--CRLF--></div>
</div>
<p>After:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> dynamic excel = AutomationFactory.CreateObject(<span class="str">"Excel.Application"</span>);</pre>
<!--CRLF--></div>
</div>
<p>Simple, but will catch you in a recompile :-).  You can <a href="http://silverlight.net/learn/videos/all/COM-Object-Access-Trusted-Applications">view a video on using native integration here</a>.</p>
<p><a href="#top">^ back to top</a></p>
<h2><a name="language"></a>Language/script support</h2>
<p>Silverlight now has extended language support, including Thai and Vietnamese.  Additionally we added support for multiple Indic scripts.  The following Indic scripts are now supported:</p>
<table width="600" cellspacing="0" cellpadding="2" border="1">
    <tbody>
        <tr>
            <td width="300" valign="top"><strong><u>Script</u></strong></td>
            <td width="300" valign="top"><strong><u>Language</u></strong></td>
        </tr>
        <tr>
            <td width="300" valign="top">Bengali</td>
            <td width="300" valign="top">Bengali, Assamese, Manipuri</td>
        </tr>
        <tr>
            <td width="300" valign="top">Oriya</td>
            <td width="300" valign="top">Oriya</td>
        </tr>
        <tr>
            <td width="300" valign="top">Malayalam</td>
            <td width="300" valign="top">Malayalam</td>
        </tr>
        <tr>
            <td width="300" valign="top">Kannada</td>
            <td width="300" valign="top">Kannada</td>
        </tr>
        <tr>
            <td width="300" valign="top">Tamil</td>
            <td width="300" valign="top">Tamil</td>
        </tr>
        <tr>
            <td width="300" valign="top">Telugu</td>
            <td width="300" valign="top">Telugu</td>
        </tr>
        <tr>
            <td width="300" valign="top">Gujarati</td>
            <td width="300" valign="top">Gujarati</td>
        </tr>
        <tr>
            <td width="300" valign="top">Gurmukhi</td>
            <td width="300" valign="top">Punjabi</td>
        </tr>
        <tr>
            <td width="300" valign="top">Devanagari</td>
            <td width="300" valign="top">Hindi, Marathi, Sanskirt, Konkani, Kashmiri, Nepali, Sindhi</td>
        </tr>
    </tbody>
</table>
<p><a href="#top">^ back to top</a></p>
<h2><a name="networking"></a>Networking</h2>
<p>In the beta, socket ports were still being restricted in trusted applications.  In this release, the port restriction for socket ranges in trusted applications is removed.</p>
<p>Additionally, the client networking stack (ClientHttp) has been enhanced to enable UploadProgress reporting and caching support.</p>
<p><a href="#top">^ back to top</a></p>
<h2><a name="user-consent"></a>User consent dialogs (webcam/clipboard/etc.)</h2>
<p>We call those dialogs that require user permissions ‘consent dialogs.’  Your users will see these whenever code requires things like requesting device access for webcam/microphone, clipboard access, or quota increase for IsolatedStorage.  In the beta we showed these dialogs always and didn’t have a mechanism for enabling the user to determine if they wanted their consent preference saved.  That has changed in this release.  Consent dialogs now give the user the option to remember the setting which is persisted to their preferences <em>only for that application</em> and is in their control.  Here’s the new consent dialog for clipboard, webcam and full-screen pinning:</p>
<p><img src="http://storage.timheuer.com/consent-dialog-new.png" alt="Silverlight consent dialog" title="Silverlight consent dialog" style="margin: 0px auto; display: block; float: none;" /></p>
<p>And if you look at the Silverlight configuration dialog you’ll notice a permissions tab now where these permissions are set for the user, which they can change or delete:</p>
<p><img src="http://storage.timheuer.com/permissions-pref-dialog.png" alt="Silverlight permissions dialog" title="Silverlight permissions dialog" style="margin: 0px auto; display: block; float: none;" /></p>
<p>This consent dialog ‘remember my preference’ setting is <strong>not</strong> available for IsolatedStorage quote increase however.  It doesn’t make sense to enable that really for that scenario.</p>
<p><a href="#top">^ back to top</a></p>
<h2><a name="xap-signing"></a>XAP Signing for trusted applications</h2>
<p>We think trusted applications (or elevated privileges applications) will be a widely used feature for this release.  We changed the install prompt dialog for trusted applications.  These are different dialogs than the typical out-of-browser install prompt as we need the user to have more information provided about them.  One key feature of a trusted application is the ability to code-sign the XAP file.  Here’s a trusted application install prompt from an un-signed application:</p>
<p><em>Windows:</em></p>
<p><img src="http://storage.timheuer.com/trusted-unsigned-win.png" alt="Unsigned trusted application on Windows" title="Unsigned trusted application on Windows" style="margin: 0px auto; display: block; float: none;" /></p>
<p><em>Mac OSX:</em></p>
<p><img src="http://storage.timheuer.com/xapsign-untrusted-mac.png" alt="Unsigned trusted application on OSX" title="Unsigned trusted application on OSX" style="margin: 0px auto; display: block; float: none;" /></p>
<p>And here is one from a code-signed one:</p>
<p><em>Windows:</em></p>
<p><img src="http://storage.timheuer.com/trusted-signed-win.png" alt="Signed trusted application on Windows" title="Signed trusted application on Windows" style="margin: 0px auto; display: block; float: none;" /></p>
<p><em>Mac OSX:</em></p>
<p><img src="http://storage.timheuer.com/xapsign-trusted-mac.png" alt="Signed trusted application on OSX" title="Signed trusted application on OSX" style="margin: 0px auto; display: block; float: none;" /></p>
<p>Which would you feel more comfortable installing?  Notice that in signed applications your custom icon will show as well (even if you have the icon settings set up, if the app is unsigned they will not show).  The process of code signing is very simple and although I expect the tooling for Silverlight to improve on this, it is as simple as adding a post-build event task (or a task for automated builds) that uses the signtool.exe (installed with Visual Studio) to sign the XAP.  Here’s my post-build event task:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="str">"%ProgramFiles%\Microsoft SDKs\Windows\v7.0A\Bin\signtool.exe"</span> sign /v </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>     /f c:\users\timheuer\documents\authenticode\timheuer.pfx </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     /p <span class="str">"MYPASSWORD"</span> </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>     /t TIMESTAMP_URI_FROM_PROVIDER $(TargetName).xap</pre>
<!--CRLF--></div>
</div>
<p>The PFX file is an exported certificate with my private key and password protected.  You can acquire code-signing certificates (normal Authenticode ones) from providers.  We were thankful to get assistance in testing this feature from the following providers who can provide you code-signing certificates for your organization:</p>
<ul>
    <li><a target="_blank" href="http://www.verisign.com/code-signing/content-signing-certificates/index.html?sl=button">VeriSign</a> </li>
    <li><a target="_blank" href="http://www.thawte.com/code-signing/index.html">Thawte</a> </li>
    <li><a target="_blank" href="http://www.godaddy.com/gdshop/ssl/signing.asp?ci=13314">GoDaddy</a> </li>
    <li><a target="_blank" href="http://www.comodo.com/e-commerce/ssl-certificates/code-signing-certificate.php">Comodo</a> </li>
</ul>
<p>All of the above provide Authenticode code-signing certificates and are trusted certificate authorities (CA) on Windows.  A trusted CA means that their root certificates are already a part of Windows verification.  The process of obtaining one is not instant so plan ahead.  There is a specific organizational verification process that occurs which may require documentation of proof of the organization and a few phone calls.  Once you have these certificates you will be on your way to providing even more trusted applications to your users.</p>
<blockquote>
<p>NOTE: Thawte code-signing certificate requests should be made from a Windows XP machine as their current process does not support Windows Vista or Windows 7.  If you use Vista/7 you will not be able to export to a PFX file for automated build or to have your certificate stored on other machines.  Read each instructions carefully.</p>
</blockquote>
<p>You can also sign your XAP using self-signed certificates.  If you do so, it is likely that you are not a trusted CA on machines and would have to instruct your users further.  In my opinion, it is better to acquire a trusted CA cert for external applications.  Take a look at <a target="_blank" href="http://www.jeff.wilcox.name/2010/02/codesigning101/">Jeff Wilcox’s epic post on Code Signing 101</a>.</p>
<p>A special note on trusted applications…please read!  If you want to take advantage of using the update features of Silverlight for your application (aka CheckAndDownloadUpdateAsync), then your application <strong>must be signed</strong>.  <strong><em>If you do not sign your XAP for a trusted application it cannot auto-update.</em></strong>  Self-signed works here to, but don’t get your application in a state where it cannot be updated automatically!</p>
<p>You can view a <a href="http://silverlight.net/learn/videos/all/xap-signing">video walk-through of XAP signing here</a>.</p>
<p><a href="#top">^ back to top</a></p>
<h2><a name="custom-window-chrome"></a>Custom window chrome</h2>
<p>One of the more requested features of trusted applications is the ability to customize the ‘chrome’ around the window.  The chrome area refers to the standard OS-specific border and title bar that a typical out-of-browser application will receive.  In this release we give you the ability to customize this for your users.  The Visual Studio tools also build in the capability to make this easier for you:</p>
<p><img src="http://storage.timheuer.com/window-style-oob.png" alt="Window Style setting options" title="Window Style setting options" style="margin: 0px auto; display: block; float: none;" /></p>
<p>You can see there are a few options to choose from for window types.  Right now we do not support transparent windows or irregular shapes but are aware of the desire to have these.  Here’s an example of the Facebook client before:</p>
<p><img src="http://storage.timheuer.com/FacebookSilverlight4BetaClient1.jpg" alt="Silverlight Facebook Client (beta)" title="Silverlight Facebook Client (beta)" style="margin: 0px auto; display: block; float: none;" /></p>
<p>and with custom window chrome:</p>
<p><img src="http://storage.timheuer.com/facebook-custom-chrome.png" alt="Silverlight Facebook Client custom window" title="Silverlight Facebook Client custom window" style="margin: 0px auto; display: block; float: none;" /></p>
<p>You’ll notice that in the custom window mode that since you don’t have the OS-specific title bar with minimize/maximize/close that you’ll be responsible for doing that.  That also includes handling the window moving and resizing events.  We enable APIs for you to do all of this easily.  </p>
<p>You can <a href="http://silverlight.net/learn/videos/all/custom-window-chrome">view a video on customizing window chrome and handling resizing and moving here</a>.</p>
<p><a href="#top">^ back to top</a></p>
<h2><a name="pinned-fullscreen"></a>Pinned full-screen mode</h2>
<p>Are you a developer with multiple monitor setup?  I’m jealous.  If you’ve used silverlight you’ve no doubt run into a situation where you’ve put something in full-screen on one monitor and anticipated being able to work on other stuff in the other monitor.  Maybe you’re watching a Netflix movie while working?  You’ve likely experienced the issue that the full-screen mode goes back to regular when activity occurs in the second monitor.</p>
<p>We’ve changed that to enable the developer to prompt for permission to 'pin’ the Silverlight application to the monitor.  This will prompt the consent dialog option (with preference remembering) to get the user’s permission.  The code is extremely simple:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> App.Current.Host.Content.FullScreenOptions = System.Windows.Interop.FullScreenOptions.StaysFullScreenWhenUnfocused;</pre>
<!--CRLF--></div>
</div>
<p>Once that is implemented, the full-screen application will remain pinned until the user hits ESC key or until you change the IsFullScreen mode in the code for them.</p>
<p>You can <a href="http://silverlight.net/learn/videos/all/fullscreen-window-pinning">view a video on using the full-screen pinning mode here</a>.</p>
<p><a href="#top">^ back to top</a></p>
<h2><a name="context-control"></a>ContextMenu control</h2>
<p>In the beta we introduced the right-click event handling capabilities.  In most cases this would be used by developers to implement context menus.  The Silverlight Toolkit for March 2010 release now provides a ContextMenu control for you to use and wire-up for this event.  It’s similar to the one Jesse Bishop created for the beta, so if you’ve used that it should be familiar.  It also supports ICommand too!</p>
<p>You can get the ContextMenu control and other great controls by ensuring you download and install the <strong><a target="_blank" href="http://silverlight.codeplex.com">Silverlight Toolkit March 2010 release</a></strong>.</p>
<p><a href="#top">^ back to top</a></p>
<h2><a name="sllauncher"></a>SLLauncher silent installs</h2>
<p>One of the features we added in this release was using the sllauncher.exe (which is the program that assists in out-of-browser applications) to provide silent install capabilities for your applications.  The primary scenario here would be something like CD-based installation situations.  Using a command like this:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="str">"%ProgramFiles%\Microsoft Silverlight\sllauncher.exe"</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>     /install:<span class="str">"D:\deploy\demoapp.xap"</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     /origin:<span class="str">"http://foocompany.com/apps/ClientBin/demoapp.xap"</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>     /shortcut:desktop+startmenu  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>     /overwrite </pre>
<!--CRLF--></div>
</div>
<p>would enable you to deploy an application in this type of a situation.  Setting the origin flag here enables the application to determine where it would get future updates from if CheckAndDownloadUpdateAsync methods are called within the application.</p>
<p><a href="#top">^ back to top</a></p>
<h2><a name="riaservices"></a>WCF RIA Services Toolkit</h2>
<p>If you read above you’ll know that installing the Silverlight 4 Tools for Visual Studio also automatically installs the WCF RIA Services framework for you.  This release the RIA Services team also has a toolkit of their own.  After installing the RIA Services Toolkit you’ll get:</p>
<ul>
    <li>LinqToSql DomainService </li>
    <li>SOAP endpoint – enabling exposing a SOAP endpoint for your DomainService </li>
    <li>JSON endpoint – enabling exposing a JSON endpoint for your DomainService </li>
    <li>ASP.NET DomainDataSource – enabling your ASP.NET application to talk to your DomainService </li>
</ul>
<p>This is a separate install that you must complete.  For more details on this toolkit, visit <a target="_blank" href="http://blogs.msdn.com/deepm">Deepesh’s blog</a>.</p>
<p>If you aren’t familiar with WCF RIA Services, you can <a target="_blank" href="http://silverlight.net/riaservices">view an introductory video here</a>.</p>
<p><a href="http://#top">^ back to top</a></p>
<h2>Summary</h2>
<p>It’s been a fast pace since getting the Silverlight 4 beta in your hands in November.  We’ve had a lot of work to do to finish things up and implement some new key features.  We are very excited about this release of Silverlight 4 for developers and look forward to seeing the great applications you build with it!</p>
<p>Be sure to visit the <a target="_blank" href="http://live.visitmix.com">MIX10</a> site for video recordings of various Silverlight-related presentations as the event is happening and as reference later on!  I really encourage you to view the keynote to see some new consumer-facing application experiences built on Silverlight, like eBay, Associated Press (Windows Phone 7)</p>
<p>Hope this helps!  Be sure to <a href="http://feeds.timheuer.com/timheuer">subscribe here via RSS</a> or email and if you’re on <a href="http://twitter.com/timheuer">Twitter</a> you can <a href="http://twitter.com/timheuer">follow me</a> there as well for Silverlight updates/resources</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:28337519-859c-4038-be40-e9dce50e3b7f" style="padding: 0px; margin: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
