---
title: "Getting rid of StandardStyles.xaml in Windows 8.1"
slug: "remove-standardstyles-xaml-from-windows-8-1-winrt-projects"
pubDate: 2013-10-29T09:19:45.000Z
lastModified: 2019-10-23T04:20:40.000Z
categories:
  - "blend"
  - "xaml"
  - "visual studio"
  - "winrt"
  - "windows 8.1"
  - "standardstyles.xaml"
draft: false
---

<p>If you’ve created a Windows 8 app using <strong>XAML</strong> then you’ve likely seen a file in the project called <strong>StandardStyles.xaml</strong> in the Common folder and merged in with your application.  As I’ve seen apps developed I’ve seen people pretty much treat this as a system component and not change it at all.  Sometimes that’s good, but mostly it has been bad.  There are a lot of apps that I’ve seen that don’t use a lot of the styles in that dictionary, but don’t do anything to trim the file or even remove it if not needed.</p>  <p>The file was included in Windows 8 Visual Studio project templates to help style some areas of the template.  In looking at performance in Windows 8.1 we saw that people were not removing this file or unused styles in this file.  We also saw that there was benefit to including some of these styles in the framework because of some styles/template deferred loading we implemented in Windows 8.1.  As such for almost all apps we’ve seen in practice, the styles provided in Windows 8/VS2012’s StandardStyles.xaml file can be removed from your application and replaced with styles in the XAML framework.</p>  <h2>Text Styles</h2>  <p>A big portion of the file is providing some text styles that map to the typographic ramp for the Windows design language.  Roughly 100 lines of text styling can now be migrated to new framework-provided text styles.  Here’s a mapping of what you should examine replacing with in your Windows 8.1 app:</p>  <table cellspacing="0" cellpadding="2" width="650" border="1"><tbody>     <tr>       <td valign="top" width="325"><strong>StandardStyles.xaml (in VS 2012)</strong></td>        <td valign="top" width="325"><strong>Windows 8.1 XAML Framework-provided name</strong></td>     </tr>      <tr>       <td valign="top" width="325">BasicTextStyle</td>        <td valign="top" width="325">BaseTextBlockStyle</td>     </tr>      <tr>       <td valign="top" width="325">BaselineTextStyle</td>        <td valign="top" width="325">n/a (merged with BaseTextBlockStyle)</td>     </tr>      <tr>       <td valign="top" width="325">HeaderTextStyle</td>        <td valign="top" width="325">HeaderTextBlockStyle</td>     </tr>      <tr>       <td valign="top" width="325">SubheaderTextStyle</td>        <td valign="top" width="325">SubheaderTextBlockStyle</td>     </tr>      <tr>       <td valign="top" width="325">TitleTextStyle</td>        <td valign="top" width="325">TitleTextBlockStyle</td>     </tr>      <tr>       <td valign="top" width="325">SubtitleTextStyle</td>        <td valign="top" width="325">SubtitleTextBlockStyle</td>     </tr>      <tr>       <td valign="top" width="325">BodyTextStyle</td>        <td valign="top" width="325">BodyTextBlockStyle</td>     </tr>      <tr>       <td valign="top" width="325">CaptionTextStyle</td>        <td valign="top" width="325">CaptionTextBlockStyle</td>     </tr>      <tr>       <td valign="top" width="325">BaseRichTextStyle</td>        <td valign="top" width="325">BaseRichTextBlockStyle</td>     </tr>      <tr>       <td valign="top" width="325">BaselineRichTextStyle</td>        <td valign="top" width="325">n/a (merged with BaseRichTextBlockStyle)</td>     </tr>      <tr>       <td valign="top" width="325">BodyRichTextStyle</td>        <td valign="top" width="325">BodyRichTextBlockStyle</td>     </tr>      <tr>       <td valign="top" width="325">ItemRichTextStyle</td>        <td valign="top" width="325">n/a (was same as BodyRichTextBlockStyle)</td>     </tr>   </tbody></table>  <p> </p>  <p>The replacement is pretty simple as wherever you were using {StaticResource SomeTextStyle} you would now change to {StaticResource FrameworkProvidedStyle} (obviously using the correct names).  As with anything, when making these changes test your app to ensure your UI fidelity remains as you expect.  Should you need to continue to style some of the above, you could use these as your BasedOn starting point.</p>  <h2>Button Styles</h2>  <p>Another area was a series of Button styles around Back button, TextBlock buttons and the most used AppBarButton styles.  TextButtonStyle is now TextBlockButtonStyle and serves as a styled Button for areas like GridView clickable section headers, etc.  </p>  <p>There were also a few Back button styles.  With the introduction of <strong><a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.appbarbutton.aspx">AppBarButton</a></strong> in Windows 8.1, we can provide a better/specific template style provided in the framework with the right glyphs for the arrows.  Instead of using the BackButtonStyle/SnappedBackButtonStyle in StandardStyles.xaml you should use NavigationBackButtonNormalStyle and NavigationBackButtonSmallStyle.  The normal style is the main one that you would use on pages and is the 41x41px standard back button.  The small style is the 30x30px smaller button that you might use for a narrow (formerly snapped) view or other areas.</p>  <p>Perhaps one of the most used areas were the AppBarButton styles.  There is roughly 1100 lines of styling for a series of button styles for the various popular glyphs of AppBar button styles.  We are now providing a typed button that is optimized for that UI and we now have included 190 icon types as a part of the base.  As an example this is what you might have had in your Windows 8 app:</p>  <pre class="brush: xml;">&lt;Button Style="{StaticResource PlayAppBarButtonStyle}" /&gt;</pre>

<p>And can now be replaced with:</p>

<pre class="brush: xml;">&lt;AppBarButton Icon="Play" Label="Play" /&gt;</pre>

<p>This reduces the need for the base AppBarButtonStyle as well as the others that were glyph-specific.  If you need them to be RTL specific, just add the FlowDirection property as you need it for your app.  The Label property will map directly through to the AutomationProperties.Name value by default as well for the accessibility needs.</p>

<h2>List/Grid Item Templates/Styles</h2>

<p>In the Grid/Split templates there were also style item templates for the use in the pages within these templates.  In looking where they were actually used, these were moved to only the pages that need them.  Many people think that your styles/templates must be in App.xaml, but this is not true and most of the time not a good performance decision.  If your style is only used in one page, put it in the resources of that page!  That is what was done with these specific styles for the VS 2013 project templates.  Some were removed in accordance with new guidance around app sizes as well.</p>

<h2>Using Visual Studio 2013 for Styling</h2>

<p>You may ask yourself now how you would use this or know about them or even remember them!  Luckily Visual Studio 2013 added some great new features in the tools to bring more visibility to these styles.  The resource pane is still there and would show the framework-provided styles as seen here in Blend:</p>

<p><img title="System Resource style selection image" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="System Resource style selection image" src="http://storage2.timheuer.com/sysresourcepaneblend2.png" /></p>

<p>If you are an editor-only person, there is still great news as VS added Style IntelliSense!!!  As you use StaticResource you will get auto-completion on the styles that apply to that style you are on.  For example on TextBlock you will only see Styles that apply to TargetType=TextBlock as seen here:</p>

<p><img title="VS Style IntelliSense image" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="VS Style IntelliSense image" src="http://storage2.timheuer.com/styleintellisense.png" /></p>

<p>This IntelliSense will work with your own custom styles as well and is a great productivity enhancement to the tools.  This one of my favorite new features of VS!</p>

<p>If you want to see the details of these styles you can use the great template-editing features in Visual Studio/Blend to inspect them as well.  Once you have the style you can now also F12 (Go to definition) on the Style itself!!!!  This will take you to the definition of the style in the framework’s generic.xaml:</p>

<p><img title="Style Go to definition example" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Style Go to definition example" src="http://storage2.timheuer.com/stylef12.gif" /></p>

<p>This is an amazing productivity feature that is available for all Styles in XAML, again including your own!  These styles can be manually inspected by looking at the generic.xaml that ships in the Windows SDK (location %programfiles%\Windows Kits\8.1\Include\WinRT\XAML\Design).</p>

<h2>Summary</h2>

<p>One of our main goals was continue to improve overall app performance for Windows 8.1 for all users.  This optimization of bringing most commonly used styles into the framework benefits developers for consistency and productivity as well as all users for shared use of these templates and reduced load/parse time for each individual app needing to provide some of these core styles.</p>

<p>Hope this helps!</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:256bb30e-f938-4c71-bc2a-27c0a5980760" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>
