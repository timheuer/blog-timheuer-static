---
title: "Using AppBarButton in Windows 8.1"
slug: "use-new-appbarbutton-in-windows-8-1-commandbar"
pubDate: 2013-10-29T17:20:41.000Z
lastModified: 2019-10-23T04:20:40.000Z
categories:
  - "xaml"
  - "winrt"
  - "appbar"
  - "windows 8.1"
  - "standardstyles.xaml"
  - "appbarbutton"
  - "commandbar"
draft: false
---

<p>In a previous post I talked about <a href="http://timheuer.com/blog/archive/2013/10/29/remove-standardstyles-xaml-from-windows-8-1-winrt-projects.aspx">removing the dependency on StandardStyles.xaml from your Windows 8.1 projects</a>.  One of those tips noted that a popular use of the styles in that helper file was the AppBarButton styles and the roughly 200 different glyphs used for AppBarButtons.  I thought I’d dig a little deeper quickly on the use of AppBarButton since I received a few pieces of email about it.</p>  <h2>Typical Scenario – Symbol Icons</h2>  <p>The <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.appbarbutton.aspx"><strong>AppBarButton</strong></a><strong> </strong>class is new in Windows 8.1 and primarily intended for use the <strong><a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.commandbar.aspx">CommandBar</a></strong> scenario, providing the UI, behavior and accessibility needs to the control.  </p>  <blockquote>   <p><strong>NOTE</strong>: CommandBar is new in Windows 8.1 and meant to serve as the best-practices control for AppBars that are non-custom and use only command buttons.  It provides automatic sizing logic (meaning commands will drop as the window gets smaller) built-in as well as better keyboarding support for navigating through the commands in the AppBar.  If you are using AppBar and only have the ‘standard’ button UI, you should be using CommandBar instead in your Windows 8.1 app.</p> </blockquote>  <p>It allows you to rapidly create the UI by setting two properties: Label and Icon.  Here’s a quick example:</p>  <pre class="brush: xml;">&lt;AppBarButton Label="Reply via Email" Icon="MailReply" /&gt;</pre>

<p>which produces:</p>

<p><img title="Reply via Email icon image" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Reply via Email icon image" src="http://storage2.timheuer.com/replymailicon.png" /></p>

<p>That’s it.  The functionality still remains to be a button and the API surround that type.  This just gives you a quick way to set the label and visual.  All the visual states (pressed/hover/etc) are taken care of for you.  We’ve also pushed through the Label property to be the AutomationProperties.Name value for the button for you, providing accessibility by default here.  This Icon property method is the shortcut version of this more verbose method:</p>

<pre class="brush: xml;">&lt;AppBarButton Label="Reply via Email"&gt;
    &lt;AppBarButton.Icon&gt;
        &lt;SymbolIcon Symbol="MailReply" /&gt;
    &lt;/AppBarButton.Icon&gt;
&lt;/AppBarButton&gt;</pre>

<p>As you can see the attached property for ButtonBase is where the Icon property lives.  Because we have this Icon property we can use other methods as well.  We also expose an IsCompact property on the AppBarButton types that will shrink the margins and drop the labels automatically for you for a smaller view.  This is what the CommandBar sets when the Window size gets too small to fit the elements.</p>

<h2 />

<h2>Using other custom fonts as Icon sources</h2>

<p>If one of the 190 included Icon types does not suit your needs you can still use the AppBarButton with your own custom icons.  I HIGHLY recommend using the Font approach as it provides a great automatic scaling method for your icons and seems to be the direction of a lot of apps on the web as well.  While you can <strong><a href="http://www.intridea.com/blog/2012/4/24/symbol-font">make your own Symbol font</a></strong>, there are also many great providers out there that you can use.</p>

<blockquote>
  <p><strong>NOTE</strong>: I am not a lawyer and you should consult the font provider’s license for acceptable use policies/rights/restrictions on using fonts that are embedded in your application.  Don’t assume that every font is acceptable to use in this manner just because it is TTF/OTF – be sure to consult the license if you are not the font author.</p>
</blockquote>

<p>Let’s say I want to add some social media commands to my app.  I can use the popular <strong><a href="http://modernuiicons.com/">Modern UI Icons</a></strong> library, which happens to <a href="http://modernuiicons.com/downloads/ModernUIIconsSocial.zip">provide a font download of the social icons</a> created.  Once unzipped I include the TTF file in my project (I could have used OTF but since TTF is provided I’ll use that – also note I renamed the file in my VS project) and then can use in my app:</p>

<pre class="brush: xml; highlight: [3,9];">&lt;AppBarButton Label="Tweet This"&gt;
    &lt;AppBarButton.Icon&gt;
        &lt;FontIcon FontFamily="ms-appx:///modernuiicons.ttf#Modern-UI-Icons---Social" 
            Margin="0,2,0,0" Glyph="&amp;#xe045;" FontSize="37.333" /&gt;
    &lt;/AppBarButton.Icon&gt;
&lt;/AppBarButton&gt;
&lt;AppBarButton Label="Review on Yelp"&gt;
    &lt;AppBarButton.Icon&gt;
        &lt;FontIcon FontFamily="ms-appx:///modernuiicons.ttf#Modern-UI-Icons---Social" 
            Margin="0,2,0,0" Glyph="&amp;#xe04f;" FontSize="37.333" /&gt;
    &lt;/AppBarButton.Icon&gt;
&lt;/AppBarButton&gt;</pre>

<p>which produces:</p>

<p><img title="Modern UI Icon sample usage" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Modern UI Icon sample usage" src="http://storage2.timheuer.com/moderniconsample.png" /></p>

<p>Pretty cool.  Now when using Fonts sometimes it is tricky to figure out the right value to set after the “#” symbol in the FontFamily path.  The trick I use on Windows is to open the TTF/OTF file and it will show the font preview as well as the “Font name” in the very first.  This is the value you want to specify after the path to the actual file.  The Glyph value you supply is totally dependent upon the font you choose.  Most authors use Unicode value ranges for symbols, but I’ve seen some that would be as simple as “B” that you could put there.  This is something you should consult the font provider for a mapping (Modern UI Icons provides a nice web page preview with all the values next to the icons).  Also notice that some font information in the font may vary and you may have to do some adjustments.  For me, I found I had to nudge the Modern UI Icons 2px down as well as size up the FontSize value to my liking.</p>

<h2 />

<h2>Other variations of Icon</h2>

<p>There are two other variations of Icons you can use.  I recommend using the default Symbol method first as almost always you’ll find something you need in that 190 set.  Second I would recommend looking at the Font approach.  These last two have some caveats that aren’t as “drop in” simple to use usually and greatly depend on the graphic data provided.</p>

<ul>
  <li>PathIcon – this is for providing vector data using the XAML Path data format.  This is vector and will scale nicely.  You must, however, provide the vector data already sized to 40px so it fits within the template.  For some this can be difficult if just provided some data.  Using tools like Inkscape or Snycfusion Metro Studio may help. </li>

  <li>BitmapIcon – this works for providing PNG based images.  Note that these will NOT automatically scale.  You would want to provide the various scale-factor images (100,140,180) for each image provided here.  This can be a cumbersome task and if not done won’t look well on higher resolution displays.  Additionally BitmapIcon doesn’t yield great fidelity for non-rectangular items. </li>
</ul>

<h2>Using Visual Studio</h2>

<p>In Visual Studio 2013 some great tooling around this experience was provided so you can easily pick out visuals for your AppBar buttons.  In the property pane for the designer you can see the various properties you can set:</p>

<p><img title="Visual Studio AppBarButton Icon tooling image" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Visual Studio AppBarButton Icon tooling image" src="http://storage2.timheuer.com/vsicontooling.png" /></p>

<p>There is also tooling for changing to the other types of icons mentioned above as well.</p>

<h2>Summary</h2>

<p>We wanted to make some things simpler, reduce VS template-provided code and improve app usability/accessibility.  While this feature may seem simple, it is useful and can help you focus on the core of your application rather than some fundamental pieces.  If you are using other button styles and some of the more standard icons, I encourage you to move to AppBarButton with the default Icon types provided by the framework.  Be sure to check out the <strong><a href="http://code.msdn.microsoft.com/windowsapps/XAML-AppBar-control-sample-2aa1cbb4">AppBar Windows SDK Sample</a></strong> for playing around with the concepts discussed in this post.</p>

<p>Hope this helps!</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:1d613b85-1faa-4893-9f12-74af0e9fbd21" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>
