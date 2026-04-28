---
title: "An out-of-browser install pattern for Silverlight"
slug: "silverlight-out-of-browser-force-install-pattern"
pubDate: 2009-08-12T09:29:05.000Z
lastModified: 2019-10-23T04:20:30.000Z
categories:
  - "silverlight"
  - "expression"
  - "blend"
  - "xaml"
  - "ux"
  - "ria"
  - "oob"
  - "riaservices"
  - "out-of-browser"
  - "out of browser"
draft: false
---

<p>One of the features that a lot of developers seem to enjoy is the <strong>out-of-browser</strong> feature in <a href="http://silverlight.net"><strong>Silverlight</strong></a>.  This is the feature that allows you to take your Silverlight application and run it like a desktop application (without some of the trust levels right now).  If you aren’t familiar with the feature, take a moment and familiarize yourself with it…here’s some info:</p>  <ul>   <li><a href="http://silverlight.net/learn/learnvideo.aspx?video=187318">Silverlight 3 Out of Browser developer APIs</a> </li>    <li><a href="http://www.microsoft.com/silverlight/silverlight/demos/oob/default.html">Sample Application</a> </li>    <li><a href="http://nerddawg.blogspot.com/2009/03/introducing-offline-and-out-of-browser.html">Feature overview</a> (from the PM that owns the feature) </li> </ul>  <p>Now that you have some basis of understanding, allow me to share a thought I’ve had.  I’m seeing a few people wanting to <em>force</em> the out-of-browser (OOB) experience.  That is to say, they want their application to be only run in OOB mode.  </p>  <blockquote>   <p>NOTE: If you feel you want this, you should understand the limitations in OOB mode.  Namely the HTML bridge features and certain network implications might affect your applications <em>depending on your needs</em>.</p> </blockquote>  <p>Honestly I am not sure I entirely see the value in that (forcing it), so if you have one, please enlighten me (maybe gaming I suppose).  After all, IsolatedStorage is shared between OOB and in-browser Silverlight applications from the same source.  But I digress.  </p>  <h2>The Problem</h2>  <p>One thing that I’ve seen is folks asking for a method on <em>how</em> they can force the OOB mode in their app.  One of the security features of OOB is that the Install action must be user initiated.  This means it must be from the end-user action…not automated.  So you can’t just send a URL to someone and have it suddenly install the application OOB.  So how would you go about this?</p>  <h2>A Solution</h2>  <p>Easy, I think.  Here’s the pattern that I think might work.  I’ll note that this is just my opinion of a solution…not the defacto in all situations.  By all means please consider your own scenario needs before blindly adopting.  That being said, I think it might be helpful to explore.  This solution involves leveraging the OOB APIs available to the developer and creating some different views in your application.</p>  <p><em>Step 1: Create some views</em></p>  <p>What you’ll need here really is two views (for lack of a better term at this point – if you want to call them controls, that is fine too) in addition to your main application.  I’ve called one <em>Installer</em> and the other <em>Installed</em>.  The purpose of Installer is that this will be the view shown when a user does not have the application installed OOB.  The purpose of Installed is that it will be the view shown when a user <em>does</em> have the OOB application installed *and* is attempting to view the application in-browser.  The third “view,” your application, is what will be rendered when the user views the OOB application.  Put Installer and Installed wherever you’d like in your app.  I created a folder called Views and stuck them there.  </p>  <p>For Installer, you’ll want to put some UI in here for the Installer “badge.”  I highly recommend putting some time into this using <a href="http://microsoft.com/expression"><strong>Expression Blend</strong></a><strong> </strong>to make it all look great and perhaps add any visual states you may want.  Remember, this is your user’s first impression.  This is still a Silverlight application, so go nuts with styling and using controls.  But you don’t need to make these the same size as your application.  For my example, my OOB application is 800x600, but my Installer app is only 300x162.  This Installer control/view will contain your actual install logic.  So somewhere here you need to have a button or something that the user can initiate as an action that you can call the Install method.  A button is easiest and easy to style.  In the Click event all you have to do (in simplest form, of course you’d want to add some error handling) is add the API call to install:</p>  <div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">   <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">     <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> Application.Current.Install();</pre>
<!--CRLF--></div>
</div>

<p>For Installed, you’ll do the same thing, except make the UI/UX for the experience of letting someone know they already have it installed.  This could be something as simple as a text message, or complete instructions, etc., whatever.  You decide.</p>

<p>When you are done with this step you should have two XAML UserControls: Installer.xaml and Installed.xaml both for their specific purpose.</p>

<p><em>Step 2: Wire up the application startup logic</em></p>

<p>What I’ve chosen to do is take control of the App_Startup logic to determine the state.  I felt it would be better here based on the scenario I’m trying to accomplish rather than to load a default UserControl and have to do some funky app logic to swap out the RootVisual.  What I’ve chosen to do is to check the state of the trigger to run and follow some logic:</p>

<ul>
  <li>If the app is installed and the user is running in-browser: Show Installed </li>

  <li>If the app is not installed and the user running in-browser: Show Installer </li>

  <li>Else: Show App </li>
</ul>

<p>The logic finds the correct state in a simple if…elseif…else statement and decides which RootVisual to show.  Here’s the complete code:</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">private</span> <span style="color: #0000ff">void</span> Application_Startup(<span style="color: #0000ff">object</span> sender, StartupEventArgs e)</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span> {</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>     <span style="color: #0000ff">if</span> ((App.Current.InstallState == InstallState.Installed) &amp;&amp; (!App.Current.IsRunningOutOfBrowser))</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span>     {</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span>         <span style="color: #0000ff">this</span>.RootVisual = <span style="color: #0000ff">new</span> Installed();</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum6">   6:</span>     }</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum7">   7:</span>     <span style="color: #0000ff">else</span> <span style="color: #0000ff">if</span> (!App.Current.IsRunningOutOfBrowser)</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum8">   8:</span>     {</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum9">   9:</span>         <span style="color: #0000ff">this</span>.RootVisual = <span style="color: #0000ff">new</span> Installer();</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum10">  10:</span>     }</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum11">  11:</span>     <span style="color: #0000ff">else</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum12">  12:</span>     {</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum13">  13:</span>         <span style="color: #0000ff">this</span>.RootVisual = <span style="color: #0000ff">new</span> MainPage();</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum14">  14:</span>     }</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum15">  15:</span> }</pre>
<!--CRLF--></div>
</div>

<p>Simple, isn’t it?  You can see that the “app” that gets run is the correct starting point given the state.</p>

<p><em>Step 3: Configure your OOB settings</em></p>

<p>Visual Studio 2008 adds a dialog feature for you to easily generate the OOB settings.  You can read more about that here and see some screenshots: <strong><a href="http://timheuer.com/blog/archive/2009/07/10/silverlight-3-released-what-is-new-and-changed.aspx#oob">Silverlight Out-of-browser Settings Dialog</a></strong>.  Once you’ve done this, when you compile your application it enables it for OOB install capabilities.</p>

<p><em>Step 4: Deploy</em></p>

<p>That’s really it.  Of course the harder part is your own application :-), but that’s for you to figure out, not me.  In the end you could then embed your application somewhere within a web page.  It will show your Installer if the user doesn’t have it, or remind them it’s already installed if they do.  Here’s a working example based on this pattern (Silverlight 3 required to run this application):</p>

<p align="center"><iframe height="162" src="http://timheuer.com/silverlight/oob-install-pattern/default.html" frameborder="0" width="300" scrolling="no"></iframe></p>

<p>This is just a stub example app, no working functionality in the main application.  The purpose is just to show this pattern.  As you can see, when the application runs, it runs at the desired 800x600 application width that I want for my actual application, game, whatever.  All this while I minimize the impact visually to show the messages of the Installer and the Installed controls.</p>

<h2>Summary</h2>

<p>This is just a sample pattern that you may want to implement if the need (or desire) is there to force your applications to be run OOB.  Again, OOB in general should be understood before blindly going in and assuming 100% of what you have will run in this mode.  But if it will and this is something you want, you may consider using this pattern to make a smaller visual impact on the installer and providing the end user with a better user experience to get it installed.  Or at least it was an experiment for me.</p>

<p>Hope this helps!</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:34a4df5f-38e1-4992-9e9f-60a486817d58" class="wlWriterEditableSmartContent"></div>
