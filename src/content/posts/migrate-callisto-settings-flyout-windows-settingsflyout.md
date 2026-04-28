---
title: "Callisto Migration Tip: Use Windows 8.1 SettingsFlyout"
slug: "migrate-callisto-settings-flyout-windows-settingsflyout"
pubDate: 2013-10-24T17:32:07.000Z
lastModified: 2019-10-23T04:20:40.000Z
categories:
  - "xaml"
  - "winrt"
  - "callisto"
  - "win8appdev"
  - "winappdev"
  - "winrtxamltoolkit"
  - "windows 8.1"
  - "settingsflyout"
draft: false
---

<p>As a part of my promise from my <a href="http://timheuer.com/blog/archive/2013/10/24/callisto-winrt-xaml-toolkit-windows-8-1-update-roadmap.aspx">previous post talking about migrating to new Windows 8.1 controls instead of some <strong>Callisto</strong></a> ones, I’ll talk about how to leverage the new <strong><a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.settingsflyout.aspx">SettingsFlyout</a></strong> control provided by the framework.</p>
<p>
    <img title="SettingsFlyout example image" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="SettingsFlyout example image" src="http://storage2.timheuer.com/sample-settingsflyout.png" /></p>
<p>Without a doubt one of the two most popular Callisto controls is the <a href="https://github.com/timheuer/callisto/wiki/SettingsFlyout">SettingsFlyout</a>.  This is a marquee experience for <a href="http://dev.windows.com">Windows Store apps</a> to provide the “charm” area for managing settings for your application.  This control provides the animations, near pixel-perfect UI and behavior for handling the software keyboard movement.  Like everything in Callisto, it is simple but powerful and popular.  This post is to help you migrate to the platform-provided control if you are currently using the Callisto SettingsFlyout.</p>
<h2>API Differences</h2>
<p>In the Windows 8.1 implementation there are a few subtle differences that I will call out before walking through an example.  I will not be talking about inherited API properties in general (that are provided from the base ContentControl derivation) but rather the specific differences in mappings to how you would have been using Callisto.  You should read this table as Callisto API==old, Windows 8.1 API==new and what you should use.</p>
<table cellspacing="0" cellpadding="2" width="100%" border="1">
    <tbody>
        <tr>
            <td valign="top" width="216"><strong>Callisto API</strong></td>
            <td valign="top" width="216"><strong>Windows 8.1 API</strong></td>
            <td valign="top" width="408"><strong>Comments</strong></td>
        </tr>
        <tr>
            <td valign="top" width="216">ContentBackgroundBrush</td>
            <td valign="top" width="216">Background</td>
            <td valign="top" width="408">ContentBackground brush was a temporary workaround to an initial poor implementation in the Callisto template</td>
        </tr>
        <tr>
            <td valign="top" width="216">ContentForegroundBrush</td>
            <td valign="top" width="216">Foreground</td>
            <td valign="top" width="408">Same as above</td>
        </tr>
        <tr>
            <td valign="top" width="216">FlyoutWidth</td>
            <td valign="top" width="216">Width</td>
            <td valign="top" width="408">The new UI guidelines don’t specify hard widths for ‘narrow’ or ‘wide’ but recommend a maximum of 500px width.  Here you can set your value.</td>
        </tr>
        <tr>
            <td valign="top" width="216">HeaderBrush</td>
            <td valign="top" width="216">HeaderBackground</td>
            <td valign="top" width="408">Naming difference, they do the same thing</td>
        </tr>
        <tr>
            <td valign="top" width="216">HeaderText</td>
            <td valign="top" width="216">Title</td>
            <td valign="top" width="408">Naming difference, they do the same thing…this is the title of the settings area</td>
        </tr>
        <tr>
            <td valign="top" width="216">ColorContrastConverter</td>
            <td valign="top" width="216">HeaderForeground</td>
            <td valign="top" width="408">Allows you to specify the foreground color for the title text.  In Callisto, this was automatically interpreted for you based on the background color and determined to be light/dark based on a contrast calculation</td>
        </tr>
        <tr>
            <td valign="top" width="216">HostPopup</td>
            <td valign="top" width="216">N/A</td>
            <td valign="top" width="408">not needed</td>
        </tr>
        <tr>
            <td valign="top" width="216">IsOpen</td>
            <td valign="top" width="216">Show/ShowIndependent/Hide</td>
            <td valign="top" width="408">Methods for showing/hiding the SettingsFlyout.  If ShowIndependent is used it interacts with the back button differently.</td>
        </tr>
        <tr>
            <td valign="top" width="216">SmallLogoImageSource</td>
            <td valign="top" width="216">IconSource</td>
            <td valign="top" width="408">You can still use AppManifestHelper from Callisto to get this for you</td>
        </tr>
        <tr>
            <td valign="top" width="216">BackClicked</td>
            <td valign="top" width="216">BackClick</td>
            <td valign="top" width="408">Same functionality</td>
        </tr>
    </tbody>
</table>
<h2>Changing your code – an example</h2>
<p>Now that we have a basic overview of the differences I’ll show you how you were likely using this in your app.  </p>
<p>NOTE: Perhaps one of Callisto’s biggest feedback was that these flyout-based controls couldn’t be used well in markup.  This was due to some design decisions made really early in Callisto development.  You may use the new SettingsFlyout differently, but I’ll be pointing out here how to port code with minimal impact, which would still be no markup.</p>
<p>I’ll use the Callisto test app as the example here.  When you wanted to have a settings experience you would use the <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.applicationsettings.settingspane.aspx"><strong>SettingsPane</strong></a> series of APIs to create a <strong><a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.applicationsettings.settingscommand.aspx">SettingsCommand</a></strong> and then do what you want in your code.  This is how the Callisto test app does it (this code is in the CommandsRequested event handler):</p>

<pre class="brush: csharp; toolbar: false;">
SettingsCommand cmd = new SettingsCommand("sample", "Sample Custom Setting", (x) =&gt;
{
    // create a new instance of the flyout
    Callisto.Controls.SettingsFlyout settings = new Callisto.Controls.SettingsFlyout();
 
    // set the desired width.  If you leave this out, you will get Narrow (346px)
    settings.FlyoutWidth = (Callisto.Controls.SettingsFlyout.SettingsFlyoutWidth)Enum.Parse(typeof(Callisto.Controls.SettingsFlyout.SettingsFlyoutWidth), settingswidth.SelectionBoxItem.ToString());
    
    // if using Callisto's AppManifestHelper you can grab the element from some member var you held it in
    settings.HeaderBrush = new SolidColorBrush(App.VisualElements.BackgroundColor);
    settings.HeaderText = string.Format("{0} Custom Settings", App.VisualElements.DisplayName);
 
    // provide some logo (preferrably the smallogo the app uses)
    BitmapImage bmp = new BitmapImage(App.VisualElements.SmallLogoUri);
    settings.SmallLogoImageSource = bmp;
 
    // set the content for the flyout
    settings.Content = new SettingsContent();
 
    // open it
    settings.IsOpen = true;
});
 
args.Request.ApplicationCommands.Add(cmd);
</pre>

<p>Please note that “SettingsContent” class here is a UserControl with some example content.</p>

<p>Fairly simple and the IsOpen would show the settings experience when the user clicked the setting (in this case “AppName Custom Settings”).  Now lets look at the modifications you would change using the Windows 8.1 API:</p>

<pre class="brush: csharp; toolbar: false; highlight: [5,6,7,8,10];">
SettingsCommand cmd = new SettingsCommand("sample2", "Sample 2", (x) =&gt;
{
    Windows.UI.Xaml.Controls.SettingsFlyout settings = new Windows.UI.Xaml.Controls.SettingsFlyout();
    settings.Width = 500;
    settings.HeaderBackground = new SolidColorBrush(App.VisualElements.BackgroundColor);
    settings.HeaderForeground = new SolidColorBrush(Colors.Black);
    settings.Title = string.Format("{0} Custom 2", App.VisualElements.DisplayName);
    settings.IconSource = new BitmapImage(Windows.ApplicationModel.Package.Current.Logo);
    settings.Content = new SettingsContent();
    settings.Show();
});
 
args.Request.ApplicationCommands.Add(cmd);
</pre>

<p>As you can see this is pretty dang close to the same.  If you had special “back” logic you could wire-up the BackClick event handler and do what you need to do.  Otherwise Back will be handled to you to show the SettingsPane again (or none at all if ShowIndependent was used).</p>

<p>The SettingsFlyout does the same “light dismiss” functionality as Callisto and the rest of the operating system, this is all handled for you.  </p>

<h2>Callisto’s AppSettings Manager</h2>

<p>One of the great feelings in Open Source is when people contribute to your projects in meaningful ways.  That was the case when Scott Dorman added a helper class to automatically register SettingsFlyout controls in App.xaml through a static method.  We called this AppSettings and had an AddCommand method.  For Callisto for Windows 8.1 support I added two new overloads to that method to account for the change from FlyoutWidth (enum) to Width (double).  This is the only change and the internal functions remain the same and do the correct wire-up with the SettingsPane/Commands.  Here is the old:</p>

<pre class="brush: csharp; toolbar: false;">
AppSettings.Current.AddCommand&lt;SettingsContent&gt;("App Registered", Callisto.Controls.SettingsFlyout.SettingsFlyoutWidth.Wide);
</pre>

<p>And the change for using the Windows 8.1 platform control:</p>

<pre class="brush: csharp; toolbar: false;">
AppSettings.Current.AddCommand&lt;SettingsContent&gt;("App Registered 2", 500);
</pre>

<p>Again the SettingsContent class here is my UserControl that represents my content.  That’s it and a small change helps keep this really helpful class around!</p>

<h2>Summary</h2>

<p>Again this was an extremely widely used control in Callisto and as you can see there are only a few subtle changes to your code to use the Windows-supported control.  In doing so you get better support for orientation/rotation/software keyboard handling/accessibility and performance.  The SettingsFlyout in Windows 8.1 can actually be used as a UserControl itself (and should).  The <a href="http://code.msdn.microsoft.com/windowsapps/App-settings-sample-1f762f49#content"><strong>Application Settings SDK Sample</strong></a> shows this in Scenario 3 on how to use the new control in this manner.</p>

<p>I hope this helps you to migrate to the new control!</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:bc00ff3e-4dcd-427b-9f4e-1a422027b696" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>

