---
title: "XAML AppBar Button Styles for Windows 8"
slug: "visualizing-appbar-command-styles-windows-8"
pubDate: 2012-03-05T15:13:02.000Z
lastModified: 2019-10-23T04:20:39.000Z
categories:
  - "xaml"
  - "windows"
  - "windows 8"
  - "winrt"
  - "winjs"
  - "appbar"
draft: false
---

<p>An old colleague of mine and now HTML extraordinaire, <a href="http://adamkinney.com/">Adam Kinney</a>, just recently posted on his spelunking of some styling in both WinJS and XAML runtimes with regard to icons/buttons to use in a Metro style app and the AppBar.</p>  <p>Adam has two posts:</p>  <ul>   <li>(WinJS) <a href="http://adamkinney.com/blog/2012/03/04/windows-8-appbaricons-enumerated-and-visualized/">Windows 8 AppBarIcons enumerated and visualized</a> </li>    <li>(XAML) <a href="http://adamkinney.com/blog/2012/03/05/windows-8-appbarbuttonstyles-enumerated-and-visualized/">Windows 8 AppBarButtonStyles enumerated and visualized</a> </li> </ul>  <p>Basically what these do is define a set of styles, both in CSS and XAML, that map back to unicode values in the Segoe UI Symbol font.  This contains a set of glyphs that are well-suited for use within an AppBar.  As an example in WinJS you would use:</p>  <div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">   <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet">     <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">button</span> <span style="color: #ff0000">data-win-control</span><span style="color: #0000ff">="WinJS.UI.AppBarCommand"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>         <span style="color: #ff0000">data-win-options</span><span style="color: #0000ff">="{icon:'back', label:'Back'}"</span><span style="color: #0000ff">&gt;&lt;</span><span style="color: #800000">button</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>And in XAML you would use:</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Style</span><span style="color: #0000ff">="{StaticResource PreviousAppBarButtonStyle}"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>One thing that Adam points out is that WinJS includes definitions for a LOT of styles while the included StandardStyles.xaml file (provided for you when you create a new project in Visual Studio) defines a much smaller subset.  When determining what styles to include in the XAML set, we opted for choosing the most common rather than to bloat the ResourceDictionary with things you may not use.</p>

<blockquote>
  <p><strong>NOTE</strong>: Even within the provided one, you should always make it a best practice to REMOVE styles/templates that you aren’t using so the parser doesn’t have to worry about them.</p>
</blockquote>

<p>Adam also notes that he likes the style of defining the WinJS ones a bit better as he mentions the XAML syntax feels heavy.  I commented on his blog that WinJS is doing a lot of work for him here that has already defined the style.  If WinJS didn’t exist, surely it would be ‘heavy’ in defining them.  I’m still not sure why the XAML one feels heavy (once you just assume that a definition has been made for you in the ResourceDictionary provided – especially when I look above, they basically both look the same…but I digress.</p>

<p>One thing that I wanted to point out was how the tools, Visual Studio and Blend, help make it way easy to choose and quickly visualize these styles on the design surface.  For HTML/JS apps you need to use Blend for this as VS doesn’t support this feature at this time.  When in Blend in your HTML/JS app you can open up the control palette and see a helper for AppBar Command Button:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Blend and AppBar Command Button" alt="Blend and AppBar Command Button" src="http://storage2.timheuer.com/hblend-appbarcommand.png" /></p>

<p>And this produces a generic button definition much like above:</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; max-height: 200px; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">button</span> <span style="color: #ff0000">data-win-control</span><span style="color: #0000ff">="WinJS.UI.AppBarCommand"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; background-color: #f4f4f4; margin: 0em; border-left-style: none; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; border-right-style: none; font-size: 8pt; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>         <span style="color: #ff0000">data-win-options</span><span style="color: #0000ff">="{label:'Button', type:'button'}"</span><span style="color: #0000ff">&gt;&lt;/</span><span style="color: #800000">button</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>What you can’t do from now (that I could see) is quickly <strong>pick</strong> from a set of those data-win-options to choose which one you want…so you still have to know what the definition is that you want for the icon/label.  Let’s contrast that with the XAML experience with strongly-defined styles.  In VS or Blend I can use the resource picker to pick from a set of styles that apply to my control type, in this case button:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Blend for XAML AppBar Resources" alt="Blend for XAML AppBar Resources" src="http://storage2.timheuer.com/xblend-appbarcommand.png" /></p>

<p>I can quickly change and see the option on the design surface.  Now again, if you don’t need all these styles, then please delete what you aren’t using from your ResourceDictionary.</p>

<p>It is great that we have design-time implementations of these styles and of course I’m partial to the XAML one as more familiar to me.  Adam pointed out the discrepancy of not having all the styles defined.  As I note, you shouldn’t have defined what you don’t need, but in the spirit of adding value, here’s an <a href="http://storage2.timheuer.com/StandardStyles.zip">updated StandardStyles.zip</a> with all the 150 icons defined.</p>

<p>Hope this helps!
  </p><div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:d4876f31-b31a-46a9-b12d-898c47ae6ca6" class="wlWriterEditableSmartContent"></div>
