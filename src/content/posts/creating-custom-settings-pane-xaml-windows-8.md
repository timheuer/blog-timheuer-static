---
title: "Building a good app settings experience in XAML"
slug: "creating-custom-settings-pane-xaml-windows-8"
pubDate: 2012-03-06T07:48:50.000Z
lastModified: 2019-10-23T04:20:39.000Z
categories:
  - "xaml"
  - "windows 8"
  - "winrt"
  - "winjs"
  - "appbar"
  - "settings"
draft: false
---

<p>So you’ve started to kick the tires of the <a href="http://preview.windows.com">Windows 8 Consumer Preview</a> and now you are building an app.  You’ve read all the <a href="http://design.windows.com">UX design guidelines</a> and started looking at some great apps on the store.   Perhaps you’ve also viewed the <a href="http://msdn.microsoft.com/windows">online documentation and some samples</a>?  And you’ve likely read about the contract implementations and other charms items like custom settings.  </p>
<p><strong><font color="#ff0000">UPDATE</font>:</strong> Take a look at <strong><a href="/blog/archive/2012/05/31/introducing-callisto-a-xaml-toolkit-for-metro-apps.aspx">Callisto: a XAML toolkit </a></strong>which has a SettingsFlyout control</p>
<h2>What is Settings?</h2>
<p>When I refer to Settings here I’m referring to that consistent experience in Metro style apps when the user invokes the charms bar and chooses settings.  By default <strong>every</strong> application will respond to that Settings charm.  If you do nothing you will get the default experience that you may have seen:</p>
<p><img title="Default Settings experience" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Default Settings experience" src="http://storage2.timheuer.com/win8-settings-default.png" /></p>
<p>The text items underneath your app title are referred to as commands.  Each application will always get the <em>Permissions</em> command.  When the user clicks this they will get some “about” information on your app (name, version, publisher) as well as the permissions the app has requested.  As an app developer, you have to do nothing to get this experience.  In addition to that the Settings pane shows some OS-level options like volume, Wi-Fi, brightness, etc. that the user can manipulate.  But you, my fellow app developer, can also implement custom settings options in your app.</p>
<h2>The custom SettingsCommand</h2>
<p>The first thing you have to do to customize your experience is implement a custom <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.applicationsettings.settingscommand.aspx#Y0">SettingsCommand</a>.  These are implemented by first listening to when the <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.applicationsettings.settingspane.aspx">SettingsPane</a> will request if there are any additional commands for the current view.  Settings can be global if you have something like a “master” page setup in your XAML application, but <strong>can also</strong> be specific to a currently viewed XAML page.  It is not an either/or but a both.  I’ll leave the exercise up to you and your app on when you need which (or both).</p>
<p>First thing you have to do is listen for the event.  You would likely do this in your XAML view’s constructor:</p>
<div id="codeSnippetWrapper" style="margin: 20px 0px 10px; padding: 4px; border: 1px solid silver; width: 97.5%; text-align: left; line-height: 12pt; overflow: auto; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; cursor: text; direction: ltr; background-color: rgb(244, 244, 244);">
<div id="codeSnippet" style="padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);">
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> <span style="color: rgb(0, 0, 255);">public</span> BlankPage()</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span>     <span style="color: rgb(0, 0, 255);">this</span>.InitializeComponent();</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>  </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>     _windowBounds = Window.Current.Bounds;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span>  </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>     Window.Current.SizeChanged += OnWindowSizeChanged;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span>  </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum9" style="color: rgb(96, 96, 96);">   9:</span>     SettingsPane.GetForCurrentView().CommandsRequested += BlankPage_CommandsRequested;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum10" style="color: rgb(96, 96, 96);">  10:</span> }</pre>
<!--CRLF--></div>
</div>
<p>Notice the <em>SettingsPane.GetForCurrentView().<a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.applicationsettings.settingspane.commandsrequested.aspx">CommandsRequested</a></em> event handler that I am using.  This will get triggered whenever the user invokes the Settings charm while on this view.  It is your opportunity to add more commands to that experience.  In your method for this you would create your new SettingsCommand and add them to the <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.applicationsettings.settingspanecommandsrequest.applicationcommands.aspx">ApplicationCommands</a>:</p>
<div id="codeSnippetWrapper" style="margin: 20px 0px 10px; padding: 4px; border: 1px solid silver; width: 97.5%; text-align: left; line-height: 12pt; overflow: auto; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; cursor: text; direction: ltr; background-color: rgb(244, 244, 244);">
<div id="codeSnippet" style="padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);">
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> <span style="color: rgb(0, 0, 255);">void</span> BlankPage_CommandsRequested(SettingsPane sender, SettingsPaneCommandsRequestedEventArgs args)</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span>     ResourceLoader rl = <span style="color: rgb(0, 0, 255);">new</span> ResourceLoader();</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>  </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>     SettingsCommand cmd = <span style="color: rgb(0, 0, 255);">new</span> SettingsCommand(<span style="color: rgb(0, 96, 128);">"sample"</span>, </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span>         rl.GetString(<span style="color: rgb(0, 96, 128);">"SoundOptionCommandText"</span>), (x) =&gt;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>         {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span>             <span style="color: rgb(0, 128, 0);">// more in a minute</span></pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum9" style="color: rgb(96, 96, 96);">   9:</span>         });</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum10" style="color: rgb(96, 96, 96);">  10:</span>  </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum11" style="color: rgb(96, 96, 96);">  11:</span>     args.Request.ApplicationCommands.Add(cmd);</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum12" style="color: rgb(96, 96, 96);">  12:</span> }</pre>
<!--CRLF--></div>
</div>
<p>You are able to add the text-based commands to the SettingsPane at this time.  The second argument I provided above will be the text that will display as the menu.  Notice how here I’m using <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.applicationmodel.resources.resourceloader.aspx">ResourceLoader</a> to get the string value for the text to be displayed.  This is a best practice to ensure you give your user’s the best experience.  Even though you may not localize now, setting this up in the beginning makes it way easier to just drop in localized strings and not have to change code.  The “SoundOptionCommandText” exists as a key/value pair in a file in my project located at en/Resources.resw.</p>
<p>Now that I have this enabled and my CommandsRequested wired up, when I invoke the charm while my app is running you see my new command:</p>
<p><img title="Custom SettingsCommand" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Custom SettingsCommand" src="http://storage2.timheuer.com/win8-settings-custom-1.png" /></p>
<p>Yippee!  Your custom commands will show before the Permissions one.  The next step is to actually add something valuable to the user when they click on this new command…and that means some UI.</p>
<h2>The custom Settings UI</h2>
<p>When your user clicks your new shiny command you want them to see some shiny, but relevant UI.  If you were using HTML/JS you would use the <a href="http://msdn.microsoft.com/library/windows/apps/Hh701253">WinJS.UI.SettingsFlyout</a> control to do a lot of this for you.  There is a <a href="http://code.msdn.microsoft.com/windowsapps/App-settings-sample-1f762f49">sample of this for comparison located in the Windows 8 developer samples</a>.  In XAML there isn’t the literal ‘SettingsFlyout’ control equivalent, but a set of primitives for you to create the experience.  There are a few pieces you will need in place.</p>
<p>First I create a few member variable helpers to store some items away:</p>
<ul>
    <li>_windowBounds – this is the Rect of the current Window size.  I will need this for proper placement </li>
    <li>_settingsWidth – The UX guidelines suggest either a 346 or 646 wide settings flyout </li>
    <li>_settingsPopup – the Popup that will actually host my settings UI </li>
</ul>
<p>The <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.primitives.popup.aspx">Popup</a> is the important piece here.  It is the primitive that provides us with the “light dismiss” behavior that you see a lot in the Windows 8 experience.  This is where you have a menu/dialog and you simply tap away and it dismisses.  <em>Popup.IsLightDismissEnabled</em> gives us that functionality in our control that we will need in XAML.  Now let us go back to where we created our custom SettingsCommand and add back in the creation of our Popup and custom UI:</p>
<div id="codeSnippetWrapper" style="margin: 20px 0px 10px; padding: 4px; border: 1px solid silver; width: 97.5%; text-align: left; line-height: 12pt; overflow: auto; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; cursor: text; direction: ltr; background-color: rgb(244, 244, 244);">
<div id="codeSnippet" style="padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);">
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> SettingsCommand cmd = <span style="color: rgb(0, 0, 255);">new</span> SettingsCommand(<span style="color: rgb(0, 96, 128);">"sample"</span>, rl.GetString(<span style="color: rgb(0, 96, 128);">"SoundOptionCommandText"</span>), (x) =&gt;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span>     _settingsPopup = <span style="color: rgb(0, 0, 255);">new</span> Popup();</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>     _settingsPopup.Closed += OnPopupClosed;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>     Window.Current.Activated += OnWindowActivated;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span>     _settingsPopup.IsLightDismissEnabled = <span style="color: rgb(0, 0, 255);">true</span>;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>     _settingsPopup.Width = _settingsWidth;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span>     _settingsPopup.Height = _windowBounds.Height;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum9" style="color: rgb(96, 96, 96);">   9:</span>  </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum10" style="color: rgb(96, 96, 96);">  10:</span>     <span style="color: rgb(0, 128, 0);">// more to come still</span></pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum11" style="color: rgb(96, 96, 96);">  11:</span> });</pre>
<!--CRLF--></div>
</div>
<p>Notice that we are creating the Popup, setting the width to the value specified in _settingsWidth and the height to whatever the current height of the active Window is at this time.  We are also listening to the Activated event on the Window to ensure that when our Window may be de-activated for something that a user may not have done via touch/mouse interaction (i.e., some other charm invocation, snapping an app, etc.) that we dismiss the Popup correctly.  here is the OnWindowActivated method definition:</p>
<div id="codeSnippetWrapper" style="margin: 20px 0px 10px; padding: 4px; border: 1px solid silver; width: 97.5%; text-align: left; line-height: 12pt; overflow: auto; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; cursor: text; direction: ltr; background-color: rgb(244, 244, 244);">
<div id="codeSnippet" style="padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);">
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> <span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">void</span> OnWindowActivated(<span style="color: rgb(0, 0, 255);">object</span> sender, Windows.UI.Core.WindowActivatedEventArgs e)</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span>     <span style="color: rgb(0, 0, 255);">if</span> (e.WindowActivationState == Windows.UI.Core.CoreWindowActivationState.Deactivated)</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>     {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>         _settingsPopup.IsOpen = <span style="color: rgb(0, 0, 255);">false</span>;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span>     }</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span> }</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span>  </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum9" style="color: rgb(96, 96, 96);">   9:</span> <span style="color: rgb(0, 0, 255);">void</span> OnPopupClosed(<span style="color: rgb(0, 0, 255);">object</span> sender, <span style="color: rgb(0, 0, 255);">object</span> e)</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum10" style="color: rgb(96, 96, 96);">  10:</span> {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum11" style="color: rgb(96, 96, 96);">  11:</span>     Window.Current.Activated -= OnWindowActivated;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum12" style="color: rgb(96, 96, 96);">  12:</span> }</pre>
<!--CRLF--></div>
</div>
<p>Notice we are also listening for the Popup.Closed event.  This is so that we can remove the OnWindowActivated method to avoid any reference leaks lying around.  Great, now let’s put some UI into our Popup.</p>
<p>For my example here I’m using a UserControl that I created to exhibit my settings needs.  Your use may vary and you may just need some simple things.  As we know in XAML there is more than one way to implement it in this flexible framework and this is just an example.  Going back to our custom SettingsCommand we now create an instance of my UserControl and set it as the Child of the Popup, setting appropriate Width/Height values as well:</p>
<div id="codeSnippetWrapper" style="margin: 20px 0px 10px; padding: 4px; border: 1px solid silver; width: 97.5%; text-align: left; line-height: 12pt; overflow: auto; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; cursor: text; direction: ltr; background-color: rgb(244, 244, 244);">
<div id="codeSnippet" style="padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);">
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> SettingsCommand cmd = <span style="color: rgb(0, 0, 255);">new</span> SettingsCommand(<span style="color: rgb(0, 96, 128);">"sample"</span>, rl.GetString(<span style="color: rgb(0, 96, 128);">"SoundOptionCommandText"</span>), (x) =&gt;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span>     _settingsPopup = <span style="color: rgb(0, 0, 255);">new</span> Popup();</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>     _settingsPopup.Closed += OnPopupClosed;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>     Window.Current.Activated += OnWindowActivated;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span>     _settingsPopup.IsLightDismissEnabled = <span style="color: rgb(0, 0, 255);">true</span>;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>     _settingsPopup.Width = _settingsWidth;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span>     _settingsPopup.Height = _windowBounds.Height;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum9" style="color: rgb(96, 96, 96);">   9:</span>  </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum10" style="color: rgb(96, 96, 96);">  10:</span>     SimpleSettingsNarrow mypane = <span style="color: rgb(0, 0, 255);">new</span> SimpleSettingsNarrow();</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum11" style="color: rgb(96, 96, 96);">  11:</span>     mypane.Width = _settingsWidth;                    </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum12" style="color: rgb(96, 96, 96);">  12:</span>     mypane.Height = _windowBounds.Height;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum13" style="color: rgb(96, 96, 96);">  13:</span>  </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum14" style="color: rgb(96, 96, 96);">  14:</span>     _settingsPopup.Child = mypane;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum15" style="color: rgb(96, 96, 96);">  15:</span>     _settingsPopup.SetValue(Canvas.LeftProperty, _windowBounds.Width - _settingsWidth);</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum16" style="color: rgb(96, 96, 96);">  16:</span>     _settingsPopup.SetValue(Canvas.TopProperty, 0);</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum17" style="color: rgb(96, 96, 96);">  17:</span>     _settingsPopup.IsOpen = <span style="color: rgb(0, 0, 255);">true</span>;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum18" style="color: rgb(96, 96, 96);">  18:</span> });</pre>
<!--CRLF--></div>
</div>
<p>Now when the user clicks the “Sound Options” they will see my custom UI:</p>
<p><img title="Custom Settings UI" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Custom Settings UI" src="http://storage2.timheuer.com/win8-settings-custom-2.png" /></p>
<p>And if the user taps/clicks away from the dialog then it automatically dismisses itself.  You now have the fundamentals on how to create your custom UI for settings.</p>
<h2>Some guiding principles</h2>
<p>While this is simple to implement, there are some key guiding principles that make this key for your user’s experience.  First and foremost, this should be a consistent and predictable experience for your users.  Don’t get crazy with your implementation and stay within the UX design guidelines to ensure your app gives the user confidence when using it.  Additionally, here are some of my other tips.</p>
<p><em>Header Elements</em></p>
<p>You’ll notice above that the header of the custom UI is specific and contains a few elements.  The title should be clear (and again be ideally localized) in what the settings is doing.  The background color would match your app’s branding and likely be the same as the value of BackgroundColor in your app’s package manifest.  Putting your logo (use the same image you use for your SmallLogo setting in your package manifest) helps re-enforce this is the setting only for this app and not for the system.  Additionally providing a “back” button so the user can navigate back to the root SettingsPane and not have to invoke the charm again if they wanted to change other app settings.  In my example, the button simply just calls the SettingsPane APIs again to show it:</p>
<div id="codeSnippetWrapper" style="margin: 20px 0px 10px; padding: 4px; border: 1px solid silver; width: 97.5%; text-align: left; line-height: 12pt; overflow: auto; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; cursor: text; direction: ltr; background-color: rgb(244, 244, 244);">
<div id="codeSnippet" style="padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);">
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> <span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">void</span> MySettingsBackClicked(<span style="color: rgb(0, 0, 255);">object</span> sender, RoutedEventArgs e)</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span>     <span style="color: rgb(0, 0, 255);">if</span> (<span style="color: rgb(0, 0, 255);">this</span>.Parent.GetType() == <span style="color: rgb(0, 0, 255);">typeof</span>(Popup))</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>     {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>         ((Popup)<span style="color: rgb(0, 0, 255);">this</span>.Parent).IsOpen = <span style="color: rgb(0, 0, 255);">false</span>;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span>     }</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>     SettingsPane.Show();</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span> }</pre>
<!--CRLF--></div>
</div>
<p>You may be curious to see the XAML used for my custom UI and I’ve included that in the download at the end here as not to take up viewing area here on the key areas.</p>
<p><em>Immediate Action</em></p>
<p>Unlike some modal dialog experiences, the Settings experience should create immediate change to your application.  Don’t put confirmation/save/cancel buttons in your UI but rather have the changes take effect immediately.  For instance in my sound example, if the user invokes the Settings charm, clicks/taps on my Sound Options and toggles the Sound Effects option on/off, then the sound should immediately turn on/off.  Now implementing this philosophy may change the way you create your custom UI and/or UserControl, but take that into account when designing.</p>
<p><em>Light Dismiss</em></p>
<p>This concept of light dismiss is about honoring the user’s action and not requiring interruption.  This is why we use the Popup.IsLightDismissEnabled option as we get this capability for free.  By using this if the user taps away to another part of the application or Window, then the Popup simply dismisses.  Don’t hang confirmation dialogs in there to block the user from doing what they want, but rather honor the context change for them.</p>
<h2>Summary</h2>
<p>The Windows platform has afforded us developers a lot of great APIs to create very predictable and consistent user experiences for the common things our apps will need.  Settings is one of those simple, yet effective places to create confidence in your application and a consistent Windows experience for your users.  Stick to the principles:</p>
<ul>
    <li>Set up custom commands that make sense for the context of the view and/or for the app as a whole </li>
    <li>Create and show your UI according to the UX design guidelines </li>
    <li>Have your settings immediately affect the application </li>
    <li>Ensure that you use the dismiss model </li>
</ul>
<p>Combine all these and you will be set.  Everything I talk about above is supported in XAML and WinRT.  My example is in C# because I’m most proficient in that language.  But this 100% equally applies in C++ as well and should be identical in practice.</p>
<p>You may be saying to yourself <em>wouldn’t this make a great custom control?</em>  Ah, stay tuned and <a href="http://feeds.timheuer.com/timheuer">subscribe here</a> :-)!</p>
<p>Hope this helps!</p>
<p>Download Sample: download removed...see <a href="/blog/archive/2012/05/31/introducing-callisto-a-xaml-toolkit-for-metro-apps.aspx">Callisto</a></p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:38ce04ab-2e4c-4da1-bdc2-b1e5ffec5b8b" style="margin: 0px; padding: 0px; float: none; display: inline;"></div>

