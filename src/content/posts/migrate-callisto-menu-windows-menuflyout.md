---
title: "Callisto Migration Tip: Menus"
slug: "migrate-callisto-menu-windows-menuflyout"
pubDate: 2013-10-24T21:14:02.000Z
lastModified: 2019-10-23T04:20:40.000Z
categories:
  - "xaml"
  - "winrt"
  - "callisto"
  - "flyout"
  - "win8appdev"
  - "winrtxamltoolkit"
  - "windows 8.1"
  - "menu"
  - "menuflyout"
draft: false
---

<p>I’m continuing in my series of helping to provide <strong><a href="http://timheuer.com/blog/archive/2013/10/24/callisto-winrt-xaml-toolkit-windows-8-1-update-roadmap.aspx">Callisto migration tips to use new Windows 8.1 features</a></strong>.  In a recent post I talked about the <strong><a href="http://timheuer.com/blog/archive/2013/10/24/migrate-callisto-flyout-windows-xaml-flyout.aspx">Flyout control</a></strong> and provided the path to the platform-provided features.  In <strong><a href="http://winrtxamltoolkit.com/">Callisto</a></strong>, the <strong><a href="https://github.com/timheuer/callisto/wiki/Menu">Menu</a></strong> control was provided as sort of a prescribed content for the Flyout control.  In fact you really couldn’t use Menu without Flyout.</p>
<p>
    <img title="Menu control sample image" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Menu control sample image" src="http://storage2.timheuer.com/menuflyoutsample.png" /></p>
<p>This guide will help you change to the platform-provided <strong><a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.menuflyout.aspx">MenuFlyout</a></strong> now available in Windows 8.1.</p>
<h2>API Differences</h2>
<p>On the public surface area, there aren’t actually many changes here.  Windows 8.1 MenuFlyout provides more functionality as it derives from <strong><a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.primitives.flyoutbase.aspx">FlyoutBase</a></strong>, which is the base for Flyout as well.  So you get the same ShowAttachedFlyout capability that you have there.  Both have an Items property that is a collection of the menu items you’d put in there.  For these purposes I’m not detailing out the minutiae of differences between FlyoutBase and Menu here as it isn’t relevant to <em>migration</em> but is useful later as I’ll demonstrate.  The main reason is that as I noted earlier, you actually can’t use Menu in Callisto without using Flyout, hence the lack of a significant delta here at the Menu level.</p>
<h2>Change to the MenuFlyout</h2>
<p>As with the other examples, I’m going to use the Callisto test app code here to show migration.  Since Menu needed Flyout, you had more of a code-focused approach in ideal Callisto usage.  We believe that the main use cases for Menus are also in Button invoke scenarios.  Here’s an example of showing a Menu in Callisto:</p>

<pre class="brush: csharp; toolbar: false;">
private void ShowFlyoutMenu(object sender, RoutedEventArgs e)
{
    Callisto.Controls.Flyout f = new Callisto.Controls.Flyout();
    f.PlacementTarget = sender as UIElement;
    f.Placement = PlacementMode.Top;
    f.Closed += (x, y) =&gt;
    {
        LogEvent("Event: Closed");
    };
 
    Menu menu = new Menu();
 
    MenuItem mi = new MenuItem();
    mi.Tag = "Easy";
    mi.Tapped += ItemClicked;
    mi.Text = "Easy Game";
    mi.MenuTextMargin = new Thickness(28, 10, 28, 12);
 
    MenuItem mi2 = new MenuItem();
    mi2.Text = "Medium Game";
    mi2.Tag = "Medium";
    mi2.Tapped += ItemClicked;
    mi2.MenuTextMargin = new Thickness(28, 10, 28, 12);
 
    ToggleMenuItem tmi = new ToggleMenuItem();
    tmi.Text = "Enable Logging";
    tmi.IsChecked = chk;
    tmi.Tapped += (a, b) =&gt;
        {
            chk = !chk;
        };
 
    menu.Items.Add(mi);
    menu.Items.Add(mi2);
    menu.Items.Add(new MenuItemSeparator());
    menu.Items.Add(new MenuItem() { Text = "Foobar something really long", Tag = "Long menu option", MenuTextMargin = new Thickness(28,10,28,12) });
    menu.Items.Add(tmi);
 
    f.HostMargin = new Thickness(0); // on menu flyouts set HostMargin to 0
    f.Content = menu;
    f.IsOpen = true;
}

</pre>

<p>You will have to understand some of the events and variables are examples here (LogEvent and chk).  Notice how you have to create a Flyout first, then put the Menu in it with all the items.  Here is how you would migrate that code to provide immediate migration to the platform control:</p>

<pre class="brush: csharp; toolbar: false; highlight: [4,33];">
private void ShowMenuFlyout3(object sender, RoutedEventArgs e)
{
    MenuFlyout mf = new MenuFlyout();
    MenuFlyout.SetAttachedFlyout(sender as FrameworkElement, mf);
    mf.Closed += (x, y) =&gt;
        {
            LogEvent("Event: Closed");
        };
 
    MenuFlyoutItem mi = new MenuFlyoutItem();
    mi.Tag = "Easy";
    mi.Tapped += ItemClicked;
    mi.Text = "Easy Game";
 
    MenuFlyoutItem mi2 = new MenuFlyoutItem();
    mi2.Text = "Medium Game";
    mi2.Tag = "Medium";
    mi2.Tapped += ItemClicked;
 
    ToggleMenuFlyoutItem tmi = new ToggleMenuFlyoutItem();
    tmi.Text = "Enable Logging";
    tmi.IsChecked = chk;
    tmi.Tapped += (a, b) =&gt;
        {
            chk = !chk;
        };
 
    mf.Items.Add(mi);
    mf.Items.Add(mi2);
    mf.Items.Add(new MenuFlyoutSeparator());
    mf.Items.Add(tmi);
 
    MenuFlyout.ShowAttachedFlyout(sender as FrameworkElement);
}

</pre>

<p>Now notice how the shape of the items is similar so helping with some migration.  You create a MenuFlyout, <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.menuflyoutitem.aspx"><strong>MenuFlyoutItems</strong></a> (notice the separator and <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.togglemenuflyoutitem.aspx"><strong>ToggleMenuFlyoutItem</strong></a>), then add them to the MenuFlyout and show it.  But just like Flyout in Windows 8.1 we believe there was an easier way we could provide creating and using MenuFlyout.</p>

<h2>A better way to use MenuFlyout</h2>

<p>Much like Flyout we believe the primary use case for MenuFlyout will be from ButtonBase invocations.  Let’s look at the declarative approach to the code above:</p>

<pre class="brush: xml; toolbar: false; highlight: [3];">
&lt;AppBarButton Icon="Add" Label="New Game"&gt;
     &lt;AppBarButton.Flyout&gt;
         &lt;MenuFlyout&gt;
             &lt;MenuFlyoutItem Tag="Easy" Text="Easy Game" Tapped="ItemClicked" /&gt;
             &lt;MenuFlyoutItem Tag="Medium" Text="Medium Game" Tapped="ItemClicked" /&gt;
             &lt;MenuFlyoutSeparator /&gt;
             &lt;ToggleMenuFlyoutItem Text="Enable Logging" IsChecked="True" /&gt;
         &lt;/MenuFlyout&gt;
     &lt;/AppBarButton.Flyout&gt;
 &lt;/AppBarButton&gt;
</pre>

<p>This allows us to provide an automatic way to show the menu when the button is clicked.  If we aren’t using a Button we can still use the Set/ShowAttachedFlyout method as demonstrated above.</p>

<h2>Summary</h2>

<p>Moving to the new MenuFlyout control will again gain you better performance, compliance with UI guidelines, declarative model and accessibility features.  As you can see there is a short-term migration approach using the the ShowAttachedFlyout method to allow you to very quickly take advantage of the new control if you were using the Callisto code method.  Your app can then decide if it makes sense to move to the declarative model.  Either way, the new control is great and you should use it!  We also have a <strong><a href="http://go.microsoft.com/fwlink/p/?LinkID=310074">Windows 8.1 MenuFlyout SDK Sample</a> </strong>that you can examine to play around with the API.</p>

<p>Hope this helps!</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:ea32f1f3-d8bf-4c0a-9db2-698252cbce57" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>


