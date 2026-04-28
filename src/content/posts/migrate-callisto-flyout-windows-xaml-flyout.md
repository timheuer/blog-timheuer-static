---
title: "Callisto Migration Tip: Flyouts"
slug: "migrate-callisto-flyout-windows-xaml-flyout"
pubDate: 2013-10-24T20:45:46.000Z
lastModified: 2019-10-23T04:20:40.000Z
categories:
  - "xaml"
  - "winrt"
  - "appbar"
  - "callisto"
  - "flyout"
  - "win8appdev"
  - "winrtxamltoolkit"
  - "windows 8.1"
draft: false
---

<p>This is another post in my series of providing <strong><a href="http://timheuer.com/blog/archive/2013/10/24/callisto-winrt-xaml-toolkit-windows-8-1-update-roadmap.aspx">migration tips from certain Callisto controls to using Windows 8.1 features</a></strong>.  I previously demonstrated probably the most popular <strong><a href="http://winrtxamltoolkit.com/">Callisto</a></strong> control, the <strong><a href="http://timheuer.com/blog/archive/2013/10/24/migrate-callisto-settings-flyout-windows-settingsflyout.aspx">SettingsFlyout</a></strong>.  Coming in a very close second in popularity is the <strong><a href="https://github.com/timheuer/callisto/wiki/Flyout">Flyout</a></strong> control.  The Flyout is a concept of a non-modal small dialog for information and commands.</p>
<p>
    <img title="Flyout sample image" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Flyout sample image" src="http://storage2.timheuer.com/flyoutsample.png" /></p>
<p>The primary use case for a lot of Flyouts was something from Button areas, namely the <strong><a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.appbar.aspx">AppBar</a></strong>.  Getting the experience right was not intuitively easy using a <strong><a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.primitives.popup.aspx">Popup</a></strong> primitive as you had to handle the right UI guidelines for animation, positioning and dismiss logic.  Callisto provided most of this in the Flyout class but also left some people wanting a bit more flexibility.  This post will aim to help you migrate existing Callisto Flyout code to the new <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.flyout.aspx"><strong>Windows 8.1 Flyout</strong></a> class.</p>
<h2 />
<h2>API Differences</h2>
<p>As I did with showing some of the more prominent API differences in SettingsFlyout, I’m presenting some of the important differences for Flyout here.  You should read this table as Callisto API==old, Windows 8.1 API==new and what you should use.</p>
<table cellspacing="0" cellpadding="2" width="100%" border="1">
    <tbody>
        <tr>
            <td valign="top" width="216"><strong>Callisto API</strong></td>
            <td valign="top" width="216"><strong>Windows 8.1 API</strong></td>
            <td valign="top" width="395"><strong>Comments</strong></td>
        </tr>
        <tr>
            <td valign="top" width="216">HorizontalOffset/VerticalOffset</td>
            <td valign="top" width="216">n/a</td>
            <td valign="top" width="395">Not really needed in almost all default cases.  If you really needed to adjust the default logic, you could provide a template for FlyoutPresenter and change the margin there.</td>
        </tr>
        <tr>
            <td valign="top" width="216">HostMargin</td>
            <td valign="top" width="216">n/a</td>
            <td valign="top" width="395">Not needed</td>
        </tr>
        <tr>
            <td valign="top" width="216">HostPopup</td>
            <td valign="top" width="216">n/a</td>
            <td valign="top" width="395">Not needed</td>
        </tr>
        <tr>
            <td valign="top" width="216">IsOpen</td>
            <td valign="top" width="216">ShowAttachedFlyout</td>
            <td valign="top" width="395">See explanation below</td>
        </tr>
        <tr>
            <td valign="top" width="216">Placement</td>
            <td valign="top" width="216">Placement</td>
            <td valign="top" width="395">Same concept, different enum</td>
        </tr>
        <tr>
            <td valign="top" width="216">PlacementTarget</td>
            <td valign="top" width="216">ShowAttachedFlyout</td>
            <td valign="top" width="395">See explanation below</td>
        </tr>
        <tr>
            <td valign="top" width="216">Closed</td>
            <td valign="top" width="216">Closed</td>
            <td valign="top" width="395" />
        </tr>
        <tr>
            <td valign="top" width="216">n/a</td>
            <td valign="top" width="216">Opened</td>
            <td valign="top" width="395">New event</td>
        </tr>
        <tr>
            <td valign="top" width="216">n/a</td>
            <td valign="top" width="216">Opening</td>
            <td valign="top" width="395">New event</td>
        </tr>
    </tbody>
</table>
<h2>Changing your code – an example</h2>
<p>Similar to previous examples, I’m going to use the Callisto test app examples here.  Flyout in Callisto was another control that didn’t work well in markup.  This section will show how you would change your existing code if you were using the Callisto method to use the new Flyout in Windows 8.1.  After this section I’ll explain a better way to do this for most cases and the preferred way to use the control.  However again I want to provide a “least code change” mechanism to migrate and will do so here.</p>
<p>In Callisto, you most likely wrote code to trigger opening a Flyout.  Here’s an example taken from the test app (this was from a Button click event):</p>

<pre class="brush: csharp; toolbar: false;">
private void ShowFlyoutMenu2(object sender, RoutedEventArgs e)
{
    Callisto.Controls.Flyout f = new Callisto.Controls.Flyout();
 
    // content code removed for brevity
    // assume "b" variable here represents a visual tree or a user control
    f.Content = b;
 
    f.Placement = PlacementMode.Top;
    f.PlacementTarget = sender as UIElement;
    
    f.IsOpen = true;
}
</pre>

<p>The code here basically requires you to wire this up in an event handler and provide the UIElement as the PlacementTarget so it knows where to position the Flyout.</p>

<p>To change this here is what it would look like in Windows 8.1:</p>

<pre class="brush: csharp; toolbar: false; highlight: [8,9];">
private void ShowFlyoutMenu2(object sender, RoutedEventArgs e)
{
    Flyout f = new Flyout();
 
    // again for brevity sake assume "b" here represents content
    f.Content = b;
 
    Flyout.SetAttachedFlyout(sender as FrameworkElement, f);
    Flyout.ShowAttachedFlyout(sender as FrameworkElement);
}
</pre>

<p>The key here is the <strong><a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.primitives.flyoutbase.setattachedflyout.aspx">SetAttachedFlyout</a></strong>/<a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.primitives.flyoutbase.showattachedflyout.aspx"><strong>ShowAttachedFlyout</strong></a> method calls.  You must first attach the Flyout to the FrameworkElement (again in this case this is on a Button).  Then you show it.  I’ve omitted the Placement here to allow for the new default (top) to occur.  You could have also added Placement to the change as well.  Placement will attempt to fit in this order: Top, Bottom, Left, Right.</p>

<p>The above is meant to demonstrate how to quickly change from Callisto code with minimal impact.  The next section actually shows a preferred way of using the control and what a lot of Callisto users were actually asking for.</p>

<h2>A better way to use Flyout</h2>

<p>As demonstrated the Flyout can still be called from code after attaching it to a FrameworkElement.  You are then responsible for calling the ShowAttachedFlyout method to open it.  The Windows 8.1 Flyout was designed for the primary use case of ButtonBase elements and will automatically show for you when used in those cases.  Let’s assume an example where I have a Button in my AppBar (btw, you should use the new <strong><a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.appbarbutton.aspx">AppBarButtons</a></strong> in Windows 8.1) and I want to show a Flyout when the user clicks on the button.  I could do the event model above, but my MVVM friends are cringing a bit.  Here’s an alternate and the most likely way you would use Flyout:</p>

<pre class="brush: xml; toolbar: false; highlight: [2,3];">
&lt;AppBarButton Icon="Add" Label="Add File"&gt;
    &lt;AppBarButton.Flyout&gt;
        &lt;Flyout&gt;
            &lt;!-- content here --&gt;
        &lt;/Flyout&gt;
    &lt;/AppBarButton.Flyout&gt;
&lt;/AppBarButton&gt;
</pre>

<p>As you can see here, on Button we’ve provided an attached property to put the Flyout element and its content.  The framework will handle the showing of the Flyout when automatically attached to the Button like this.  If you don’t want to use the Button method and perhaps you have to launch a Flyout from some other UIElement, you would use the ShowAttachedFlyout method as demonstrated above.</p>

<h2>Summary</h2>

<p>As one of the more popular controls this migration may take you down the quick route first and then give you more time to think about using the declarative way to really change later.  I recommend using the new Flyout here as you will get all the proper behavior as well as better performance, accessibility and interaction with the software keyboard.  We also have a new <strong><a href="http://go.microsoft.com/fwlink/p/?LinkID=310074">Windows 8.1 Flyout SDK Sample</a> </strong>that walks through this usage and some other scenarios you can examine for your needs.</p>

<p>Hope this helps!</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:9f9c373c-a354-4f83-8cbf-df501f9be93b" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>

