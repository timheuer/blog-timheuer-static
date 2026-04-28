---
title: "Building a deployable custom control for XAML Metro style apps"
slug: "creating-custom-controls-for-metro-style-apps"
pubDate: 2012-03-07T14:35:52.000Z
lastModified: 2019-10-23T04:20:39.000Z
categories:
  - "xaml"
  - "controls"
  - "nuget"
  - "windows 8"
  - "winrt"
draft: false
---

<p>At //build one of the surprising immediate things I heard about was folks wanting to build custom controls right away.  I knew that would happen, but not so quick on something so new (WinRT).  The XAML platform did not have good support for building custom controls in the Developer Preview but now that the <a href="http://preview.windows.com">Consumer Preview for Windows 8</a> and Visual Studio 11 Beta are out, there is much better support.  There are two key things when thinking about custom controls: 1) building it and 2) making it consumable by developers (even if those developers are your own company).  I’ll try to articulate the methods of both here.</p>  <h2>Defining custom versus user control</h2>  <p>There is usually some debate in the XAML community about the definition of a custom control.  For the purposes of this discussion I define a custom control as a control that provides a generic.xaml, can be styled/templated and is usually encapsulated in its own assembly which can then be distributed.  A custom control can <em>contain</em> user controls, but generally speaking does not.  A typical user control scenario is one that lives within your project and not meant to be consumed by anyone outside your project.</p>  <p>This definition is the same whether we are talking about C++, C# or Visual Basic.  Everything below applies to all languages.</p>  <h2>Creating the custom control</h2>  <p>The fundamentals of a custom control are that it is a class and it provides it’s own template/style.  This style/template definition usually lives in a file located at themes/generic.xaml.  This is the same pattern that has existed in other XAML implementations like WPF, Silverlight and Windows Phone.  The pattern is no different for Metro style apps in this regard.</p>  <p>The creation of the most basic custom control is very simple.  A Windows SDK sample for <a href="http://code.msdn.microsoft.com/windowsapps/XAML-user-and-custom-a8a9505e">XAML User and Custom Controls</a> is available for you to download for the quick review and core concept.  My intent here is to take that a step further for the end-to-end implementation if I were a control vendor.  Let’s first create our control.  For our purposes we will create a control that shows an Image and allows you to specify some Text for the label.  The label, however, will be prepended with some text that comes from string resources.</p>  <p>In Visual Studio we will create a class library project first.</p>  <blockquote>   <p><strong>NOTE</strong>: You can create a C#/VB Class Library and keep it managed, or convert it to a WinRT component.  You may also create this in C++ using the WinRT Component project type.  Again, these concepts are the same, the syntax will be obviously slightly different for C++ and managed code.</p> </blockquote>  <p>Once you create the class library (I called mine SimpleCustomControl and deleted the initial Class1.cs file that was created), add an item to the project.  You can do this via right-clicking on the project and choosing add item.  You will be presented with a few options, but the important one is Templated Control.</p>  <p><img title="Add Item dialog" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Add Item dialog" src="http://storage2.timheuer.com/cc-additem.png" /></p>  <p>Watch was this does to your project as it will do 2 things:</p>  <ul>   <li>Create a new class </li>    <li>Add a Themes folder and place a <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.resourcedictionary.aspx">ResourceDictionary</a> called generic.xaml in that folder </li> </ul>  <p>The themes/generic.xaml is very important if you use the <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.control.defaultstylekey.aspx">DefaultStyleKey</a> concept in your class.  This is very much a convention-based approach.  The contents of the class is very simple at this point, with the sole constructor and the DefaultStyleKey wired up:</p>  <div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">   <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">     <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">namespace</span> SimpleCustomControl</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">sealed</span> <span style="color: #0000ff">class</span> LabeledImage : Control</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>     {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>         <span style="color: #0000ff">public</span> LabeledImage()</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>         {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span>             <span style="color: #0000ff">this</span>.DefaultStyleKey = <span style="color: #0000ff">typeof</span>(LabeledImage);</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span>         }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum9" style="color: #606060">   9:</span>     }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum10" style="color: #606060">  10:</span> }</pre>
<!--CRLF--></div>
</div>

<p>This maps to the generic.xaml definition of our control.  Let’s modify our <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.controls.controltemplate.aspx">ControlTemplate</a> in generic.xaml to be a little more than just a border:</p>

<div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">
    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">Style</span> <span style="color: #ff0000">TargetType</span><span style="color: #0000ff">="local:LabeledImage"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Setter</span> <span style="color: #ff0000">Property</span><span style="color: #0000ff">="Template"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">Setter.Value</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>             <span style="color: #0000ff">&lt;</span><span style="color: #800000">ControlTemplate</span> <span style="color: #ff0000">TargetType</span><span style="color: #0000ff">="local:LabeledImage"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>                 <span style="color: #0000ff">&lt;</span><span style="color: #800000">Border</span> <span style="color: #ff0000">Background</span><span style="color: #0000ff">="LightBlue"</span> <span style="color: #ff0000">BorderBrush</span><span style="color: #0000ff">="Black"</span> <span style="color: #ff0000">BorderThickness</span><span style="color: #0000ff">="2"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>                         <span style="color: #ff0000">HorizontalAlignment</span><span style="color: #0000ff">="Center"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="140"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="150"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span>                     <span style="color: #0000ff">&lt;</span><span style="color: #800000">StackPanel</span> <span style="color: #ff0000">HorizontalAlignment</span><span style="color: #0000ff">="Center"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span>                         <span style="color: #0000ff">&lt;</span><span style="color: #800000">Image</span> <span style="color: #ff0000">Stretch</span><span style="color: #0000ff">="Uniform"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="100"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="100"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum9" style="color: #606060">   9:</span>                                <span style="color: #ff0000">Source</span><span style="color: #0000ff">="{TemplateBinding ImagePath}"</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="5"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum10" style="color: #606060">  10:</span>                         <span style="color: #0000ff">&lt;</span><span style="color: #800000">TextBlock</span> <span style="color: #ff0000">TextAlignment</span><span style="color: #0000ff">="Center"</span> <span style="color: #ff0000">FontFamily</span><span style="color: #0000ff">="Segoe UI"</span> <span style="color: #ff0000">FontWeight</span><span style="color: #0000ff">="Light"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum11" style="color: #606060">  11:</span>                                    <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="26.667"</span> <span style="color: #ff0000">Foreground</span><span style="color: #0000ff">="Black"</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="LabelHeader"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum12" style="color: #606060">  12:</span>                         <span style="color: #0000ff">&lt;</span><span style="color: #800000">TextBlock</span> <span style="color: #ff0000">TextAlignment</span><span style="color: #0000ff">="Center"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum13" style="color: #606060">  13:</span>                                    <span style="color: #ff0000">Text</span><span style="color: #0000ff">="{TemplateBinding Label}"</span> <span style="color: #ff0000">FontFamily</span><span style="color: #0000ff">="Seqoe UI"</span> <span style="color: #ff0000">FontWeight</span><span style="color: #0000ff">="Light"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum14" style="color: #606060">  14:</span>                                    <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="26.667"</span> <span style="color: #ff0000">Foreground</span><span style="color: #0000ff">="Black"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum15" style="color: #606060">  15:</span>                     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">StackPanel</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum16" style="color: #606060">  16:</span>                 <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Border</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum17" style="color: #606060">  17:</span>             <span style="color: #0000ff">&lt;/</span><span style="color: #800000">ControlTemplate</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum18" style="color: #606060">  18:</span>         <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Setter.Value</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum19" style="color: #606060">  19:</span>     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Setter</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum20" style="color: #606060">  20:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Style</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Now we have a place for an Image, LabelHeader and a Label.  Notice that we have {<a href="http://msdn.microsoft.com/en-us/library/windows/apps/Hh758288.aspx">TemplatBinding</a>} statements there.  This is how the template binds (duh) to values provided to the control.  So our ControlTemplate is expecting these properties to exist on our control.  We will create these as <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.dependencyproperty.aspx">DependencyProperty</a> types so we can use them in Binding, change notification, etc.  In Visual Studio we can make re-use out of the ‘propdp’ code snippet that exists for WPF.  It is slightly different in the last argument, but it will definitely save you a lot of typing.  We’ll create 2 DependencyProperties like this in our LabeledImage.cs file:</p>

<div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">
    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">public</span> ImageSource ImagePath</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>     get { <span style="color: #0000ff">return</span> (ImageSource)GetValue(ImagePathProperty); }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>     set { SetValue(ImagePathProperty, <span style="color: #0000ff">value</span>); }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span> }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>  </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span> <span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">readonly</span> DependencyProperty ImagePathProperty =</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span>     DependencyProperty.Register(<span style="color: #006080">"ImagePath"</span>, <span style="color: #0000ff">typeof</span>(ImageSource), <span style="color: #0000ff">typeof</span>(LabeledImage), <span style="color: #0000ff">new</span> PropertyMetadata(<span style="color: #0000ff">null</span>));</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum9" style="color: #606060">   9:</span>  </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum10" style="color: #606060">  10:</span> <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> Label</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum11" style="color: #606060">  11:</span> {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum12" style="color: #606060">  12:</span>     get { <span style="color: #0000ff">return</span> (<span style="color: #0000ff">string</span>)GetValue(LabelProperty); }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum13" style="color: #606060">  13:</span>     set { SetValue(LabelProperty, <span style="color: #0000ff">value</span>); }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum14" style="color: #606060">  14:</span> }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum15" style="color: #606060">  15:</span>  </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum16" style="color: #606060">  16:</span> <span style="color: #0000ff">public</span> <span style="color: #0000ff">static</span> <span style="color: #0000ff">readonly</span> DependencyProperty LabelProperty =</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum17" style="color: #606060">  17:</span>     DependencyProperty.Register(<span style="color: #006080">"Label"</span>, <span style="color: #0000ff">typeof</span>(<span style="color: #0000ff">string</span>), <span style="color: #0000ff">typeof</span>(LabeledImage), <span style="color: #0000ff">new</span> PropertyMetadata(<span style="color: #0000ff">null</span>));</pre>
<!--CRLF--></div>
</div>

<p>We also had that LabelHeader property.  This is going to be a value coming from a string resource that may be localized at some point.  In our library add a folder called “en” and then within that, using the Add Item dialog in VS, add a Resources.resw file.  Within that Resources.resw file add a name/value pair of name=<em>LabelHeader.Text</em> and value=<em>This is an image of a…</em> and you can save/close the file.</p>

<p>Now back to our class file we are going to set the value of our TextBlock by overriding our template rendering, grabbing a reference to that TextBlock and setting the value from our string resource.</p>

<div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">
    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">protected</span> <span style="color: #0000ff">override</span> <span style="color: #0000ff">void</span> OnApplyTemplate()</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>     <span style="color: #0000ff">base</span>.OnApplyTemplate();</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>  </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>     TextBlock tb = GetTemplateChild(<span style="color: #006080">"LabelHeader"</span>) <span style="color: #0000ff">as</span> TextBlock;</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>     tb.Text = <span style="color: #0000ff">new</span> ResourceLoader(<span style="color: #006080">"SimpleCustomControl/Resources/LabelHeader"</span>).GetString(<span style="color: #006080">"Text"</span>);</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span> }</pre>
<!--CRLF--></div>
</div>

<p>Now, I’m showing this way, because it is pretty verbose and there is an easier way…but you wouldn’t know it is easier unless you saw the harder way right?</p>

<p>First it is important to understand how these resources are indexed.  You’ll notice that I’m using a <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.applicationmodel.resources.resourceloader.aspx">ResourceLoader</a> class to map to what looks like {component}/{resw-file-name}/{property} which is effectively right.  When you create a resw file, at compile-time these get built into a PRI file.  This post isn’t about this whole resource loading process, but you should definitely understand this a bit.  Basically for a control creator perspective you need to understand that your string resources (and file-based resources) live in a <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.applicationmodel.resources.core.resourcemap.aspx">ResourceMap</a> that is the name of your component.</p>

<blockquote>
  <p><strong>NOTE</strong>: An easy way to look at this resource indexing is to use the makepri.exe tool installed with VS.  From a VS command prompt navigate to your build output and you should see a resources.pri file.  Call makepri.exe dump and you’ll get an XML representation of that file you can look at.  Knowing that structure is very helpful.</p>
</blockquote>

<p>I said there was an easier way to get that string though.  First remove the OnApplyTemplate override completely…we don’t need it for this control anymore.  Now in generic.xaml change the x:Name=”LabelHeader” to the following:</p>

<div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">
    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">Style</span> <span style="color: #ff0000">TargetType</span><span style="color: #0000ff">="local:LabeledImage"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> ...</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">TextBlock</span> <span style="color: #ff0000">TextAlignment</span><span style="color: #0000ff">="Center"</span> <span style="color: #ff0000">FontFamily</span><span style="color: #0000ff">="Segoe UI"</span> <span style="color: #ff0000">FontWeight</span><span style="color: #0000ff">="Light"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>                <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="26.667"</span> <span style="color: #ff0000">Foreground</span><span style="color: #0000ff">="Black"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>                 <span style="color: #ff0000">x:Uid</span><span style="color: #0000ff">="/SimpleCustomControl/Resources/LabelHeader"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span> ...</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Style</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>This will use the XAML parser way of getting the string resource (note the ResourceMap is still in the x:Uid value).  Using the ResourceMap prefix is necessary when using this method as a custom control vendor.</p>

<p>We are done.  Our control is complete.</p>

<h2>Consuming the control from an application</h2>

<p>We can quickly test our control by adding a new Metro style app to our project.  Once we do this, make that the startup project and add a project reference to our control library.  Then in the default page for our app (BlankPage or MainPage depending on your template choice), add an xmlns to the top and then consume the control:</p>

<div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">
    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">Page</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span>     <span style="color: #ff0000">x:Class</span><span style="color: #0000ff">="Application1.BlankPage"</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>     <span style="color: #ff0000">xmlns</span><span style="color: #0000ff">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>     <span style="color: #ff0000">xmlns:x</span><span style="color: #0000ff">="http://schemas.microsoft.com/winfx/2006/xaml"</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>     <span style="color: #ff0000">xmlns:local</span><span style="color: #0000ff">="using:Application1"</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>     <span style="color: #ff0000">xmlns:d</span><span style="color: #0000ff">="http://schemas.microsoft.com/expression/blend/2008"</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span>     <span style="color: #ff0000">xmlns:mc</span><span style="color: #0000ff">="http://schemas.openxmlformats.org/markup-compatibility/2006"</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span>     <span style="color: #ff0000">xmlns:controls</span><span style="color: #0000ff">="using:SimpleCustomControl"</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum9" style="color: #606060">   9:</span>     <span style="color: #ff0000">mc:Ignorable</span><span style="color: #0000ff">="d"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum10" style="color: #606060">  10:</span>  </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum11" style="color: #606060">  11:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Grid</span> <span style="color: #ff0000">Background</span><span style="color: #0000ff">="{StaticResource ApplicationPageBackgroundBrush}"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum12" style="color: #606060">  12:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">controls:LabeledImage</span> <span style="color: #ff0000">ImagePath</span><span style="color: #0000ff">="Assets/110Orange.png"</span> <span style="color: #ff0000">Label</span><span style="color: #0000ff">="Orange"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum13" style="color: #606060">  13:</span>     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Grid</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum14" style="color: #606060">  14:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Page</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>See how the ImagePath and Label are used here?  In more advanced scenarios we can bind values from our view model or other ways.  When rendered the control will show like this:</p>

<p><img title="Custom control rendered" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Custom control rendered" src="http://storage2.timheuer.com/cc-rendered.png" /></p>

<p>This is great…but also what we call a “project-to-project” (P2P) reference.  As a control vendor we want to distribute our control, not our source primarily.  So we need to package this up.  There are two ways you can do this.</p>

<h2>Package your control as an Extension SDK</h2>

<p>One of the new methods for distributing Metro style controls in VS11 is via Extension SDKs, also sometimes referred to as non-Framework SDKs.  Extension SDKs are machine-wide and available to all projects once installed.  They can be distributed via the Visual Studio gallery and using the VSIX mechanism…which allows for update notification in Visual Studio.  There are a few intricacies that you can configure your Extension SDK but for most it will get down to three things:</p>

<ul>
  <li>Describing your SDK and what it supports </li>

  <li>Including the binary that projects need to reference </li>

  <li>Including any assets/files that the control relies on to render </li>
</ul>

<p>In examining our sample above we have a few things that map to this:</p>

<ul>
  <li>Describing – our sample is a C# custom control so it will only work with managed Metro style apps, we will need to describe this in our SDK </li>

  <li>Binary – we have one binary: SimpleCustomControl.dll </li>

  <li>Redistributables – we have a generic.xaml and a PRI file with our string resources </li>
</ul>

<p>The last part (redist) probably is making some existing XAML control developers scratch their heads.  <em>Why isn’t the generic.xaml embedded </em>is what you are likely asking yourself.  In Metro style apps, XAML assets are not embedded but rather exist as “loose file” assets for your control.  This is why it is critical for getting the distribution model correct so that the runtime knows where to get the definitions for everything.</p>

<blockquote>
  <p><strong>NOTE</strong>: This is a default method.  You can, of course, use other techniques to get your assets into your binary either via string constants, other embedding techniques, etc.  In doing so, however, you will now be managing all those extractions yourself rather than being able to rely on the resource APIs for Metro style apps.</p>
</blockquote>

<p>The first thing we want to do is understand the structure of an SDK.  These live in %ProgramFiles%\Microsoft SDKs\Windows\v8.0\Extension SDKs directory on disk.  Within there you will have your own folder, version and then the layout of your SDK, as described by your manifest.  Here is what our manifest (SDKManifest.xml) would look like for our control:</p>

<div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">
    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">&lt;?</span><span style="color: #800000">xml</span> <span style="color: #ff0000">version</span><span style="color: #0000ff">="1.0"</span> <span style="color: #ff0000">encoding</span><span style="color: #0000ff">="utf-8"</span> ?<span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">FileList</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>   <span style="color: #ff0000">DisplayName</span><span style="color: #0000ff">="Simple Custom Control"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>   <span style="color: #ff0000">ProductFamilyName</span><span style="color: #0000ff">="Simple Controls"</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>   <span style="color: #ff0000">MinVSVersion</span><span style="color: #0000ff">="11.0"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>   <span style="color: #ff0000">MinToolsVersion</span><span style="color: #0000ff">="4.0"</span> </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span>   <span style="color: #ff0000">CopyRedistToSubDirectory</span><span style="color: #0000ff">="SimpleCustomControl"</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span>   <span style="color: #ff0000">AppliesTo</span><span style="color: #0000ff">="WindowsAppContainer+WindowsXAML+Managed"</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum10" style="color: #606060">  10:</span>   <span style="color: #ff0000">MoreInfo</span><span style="color: #0000ff">="http://timheuer.com/blog/"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum11" style="color: #606060">  11:</span>   <span style="color: #0000ff">&lt;</span><span style="color: #800000">File</span> <span style="color: #ff0000">Reference</span><span style="color: #0000ff">="SimpleCustomControl.dll"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum12" style="color: #606060">  12:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">ContainsControls</span><span style="color: #0000ff">&gt;</span>True<span style="color: #0000ff">&lt;/</span><span style="color: #800000">ContainsControls</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum13" style="color: #606060">  13:</span>   <span style="color: #0000ff">&lt;/</span><span style="color: #800000">File</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum14" style="color: #606060">  14:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">FileList</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>We are describing the display information as well as some key data:</p>

<ul>
  <li>Display data – the title that will show up in Add Reference </li>

  <li>CopyRedistToSubdirectory – this would be the name of your component </li>

  <li>AppliesTo – what I support; in this I’m saying managed, XAML, Metro style apps </li>

  <li>&lt;File&gt; – these are the files that describe components in my SDK (not their loose assets) </li>
</ul>

<p>Now to create the structure.  When you build the DLL your output will give you this:</p>

<p><img title="Build output" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Build output" src="http://storage2.timheuer.com/cc-buildoutput.png" /></p>

<p>We need to create the following structure that will live under the Extension SDK folder listed above:</p>

<p>%ProgramFiles%\Microsoft SDKs\Windows\v8.0\Extension SDKs\</p>

<p>--SimpleCustomControl</p>

<p>----1.0</p>

<p>------SDKManifest.xml (the file above)</p>

<p>------References\CommonConfiguration\neutral\SimpleCustomControl.dll</p>

<p>------Redist\CommonConfiguration\neutral\SimpleCustomControl.pri</p>

<p>------Redist\CommonConfiguration\neutral\Themes\generic.xaml</p>

<p>Notice the References and Redist folders.  By placing these in that structure, the project will know what it needs to get type information (References) and then during running/deployment what it needs to package (Redist) and where it puts it (CopyRedistToSubdirectory).  Put this layout in the directory and then when you choose add reference on a project you will see your option:</p>

<p><img title="Add reference dialog" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Add reference dialog" src="http://storage2.timheuer.com/cc-addref.png" /></p>

<p>There are other configuration options for the SDKManifest that you can use and the required reading is the Extension SDK section in this <strong><a href="http://go.microsoft.com/fwlink/?LinkID=235409">MSDN article: How to: Create a Software Development Kit</a></strong>.</p>

<p>The next step for an Extension SDK is to really package it up nicely.  You probably don’t want your users copy directories around all the time…and what about updates as well!  Using the Visual Studio VSIX structure for this really makes it easy to do.</p>

<p>There are tools for Visual Studio to allow you to create a VSIX package.  This requires the <a href="http://www.microsoft.com/visualstudio/11/en-us/downloads#vs-sdk">Visual Studio extensibility SDK</a> to be installed and using Visual Studio professional or higher.  Once you do that you can create a VSIX package and you will see the VSIX manifest designer.  On the Install Targets tab you will choose Extension SDK:</p>

<p><img title="VSIX Install Targets" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="VSIX Install Targets" src="http://storage2.timheuer.com/cc-vsixtarget.png" /></p>

<p>We then re-create the layout structure in the VSIX project and add the Assets to the manifest.  The result in the IDE looks something like this:</p>

<p><img title="VSIX Manifest Assets" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="VSIX Manifest Assets" src="http://storage2.timheuer.com/cc-vsixmanifest.png" /></p>

<p>Now when we build we will get a VSIX installer that we can upload to the Visual Studio Gallery or distribute to our customers.</p>

<p>NOTE: Uploading the to Visual Studio Gallery has benefits in that once installed, any update you put in the gallery will provide notifications to the Visual Studio user than an update exists.  This is done via the unique Product ID value in your manifest, so choose that value accordingly and don’t change it if you want this capability.</p>

<p>When a user gets the VSIX, they double-click it and see the installer:</p>

<p><img title="VSIX Installer" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="VSIX Installer" src="http://storage2.timheuer.com/cc-vsixinstaller.png" /></p>

<p>And then they can use it as normally in Add Reference just like described above.  Additional details on other VSIX deployment configurations can be found here: <strong><a href="http://msdn.microsoft.com/en-us/library/ff363239.aspx">VSIX Deployment</a></strong>.</p>

<p>Once you have your VSIX you can upload to the Visual Studio Gallery and make it discoverable for users from within Visual Studio.  Remember that this method of Extension SDK is machine-wide which is in contrast to the second method described next.</p>

<h2>Package your control as a NuGet Package</h2>

<p>The other option you have is to package up your control via a <a href="http://www.nuget.org">NuGet</a> package.  NuGet packages apply to the <strong>project</strong> and not the machine, but have the flexibility of not having to have anything installed and can travel their dependencies with the project.  NuGet packages are another type of package that has a manifest that describes what the content does.  </p>

<p>For Metro style XAML controls you will have to do a few things differently currently with the NuGet package you create.  NuGet packages are based on nuspec files, which is basically a manifest describing where to get/put things in the package.  You can also use the <a href="http://docs.nuget.org/docs/creating-packages/creating-and-publishing-a-package">NuGet Package Explorer</a> for a GUI way of reading/creating new packages.  If you are unfamiliar with the nuspec format, using the package explorer will help you get a package created quickly.  </p>

<p>NuGet is one area where there actually are current differences in C++ or managed code.  Right now NuGet only supports managed code projects and not C++.  I’m sure this may change in the future, but as of right now this applies only to managed code.  For our control above here is what my nuspec file looks like:</p>

<div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">
    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">&lt;?</span><span style="color: #800000">xml</span> <span style="color: #ff0000">version</span><span style="color: #0000ff">="1.0"</span>?<span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">package</span> <span style="color: #ff0000">xmlns</span><span style="color: #0000ff">="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>   <span style="color: #0000ff">&lt;</span><span style="color: #800000">metadata</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">version</span><span style="color: #0000ff">&gt;</span>1.0.0<span style="color: #0000ff">&lt;/</span><span style="color: #800000">version</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">authors</span><span style="color: #0000ff">&gt;</span>Tim Heuer<span style="color: #0000ff">&lt;/</span><span style="color: #800000">authors</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">owners</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">id</span><span style="color: #0000ff">&gt;</span>SimpleCustomControl<span style="color: #0000ff">&lt;/</span><span style="color: #800000">id</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">title</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum9" style="color: #606060">   9:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">requireLicenseAcceptance</span><span style="color: #0000ff">&gt;</span>false<span style="color: #0000ff">&lt;/</span><span style="color: #800000">requireLicenseAcceptance</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum10" style="color: #606060">  10:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">description</span><span style="color: #0000ff">&gt;</span>A simple custom control for Metro style apps<span style="color: #0000ff">&lt;/</span><span style="color: #800000">description</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum11" style="color: #606060">  11:</span>   <span style="color: #0000ff">&lt;/</span><span style="color: #800000">metadata</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum12" style="color: #606060">  12:</span>   <span style="color: #0000ff">&lt;</span><span style="color: #800000">files</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum13" style="color: #606060">  13:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">file</span> <span style="color: #ff0000">src</span><span style="color: #0000ff">="SimpleCustomControl\bin\Debug\Themes\Generic.xaml"</span> <span style="color: #ff0000">target</span><span style="color: #0000ff">="lib\winrt\SimpleCustomControl\Themes\Generic.xaml"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum14" style="color: #606060">  14:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">file</span> <span style="color: #ff0000">src</span><span style="color: #0000ff">="SimpleCustomControl\bin\Debug\SimpleCustomControl.dll"</span> <span style="color: #ff0000">target</span><span style="color: #0000ff">="lib\winrt\SimpleCustomControl.dll"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum15" style="color: #606060">  15:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">file</span> <span style="color: #ff0000">src</span><span style="color: #0000ff">="SimpleCustomControl\bin\Debug\SimpleCustomControl.pri"</span> <span style="color: #ff0000">target</span><span style="color: #0000ff">="lib\winrt\SimpleCustomControl.pri"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum16" style="color: #606060">  16:</span>   <span style="color: #0000ff">&lt;/</span><span style="color: #800000">files</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum17" style="color: #606060">  17:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">package</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>This assumes that the binaries being referenced here are all relative to the nuspec file.  Notice how all the files go into the lib\winrt folder and that we essentially re-create that SDK layout in our package as well.</p>

<p>Now when I build this with nuget.exe I get a package output.  In Visual Studio (with NuGet installed) I can now right-click on a project and choose <em>Manage NuGet Packages </em>and browse the library of packages.  In testing out my package, I create a custom library (you do this via the Settings option when you are in the Manage NuGet Packages dialog) and just point it to the folder where my nupkg file was created:</p>

<p><img title="Manage NuGet Packages dialog" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Manage NuGet Packages dialog" src="http://storage2.timheuer.com/cc-nugetmanage.png" /></p>

<p>When the package is selected, the reference is added to my project and during build, all the right pieces are put in my APPX package where they need to go.  Once the reference is there I build and run my project and the control renders as expected!</p>

<h2>What about the design-time experience?</h2>

<p>All of the methods above will allow you to view your control on the XAML design surface in Visual Studio as well.  In the Extension SDK method there is actually additional affordances for you to provide additional design-time assemblies/resources to make that experience even better.  Custom control developers for XAML know about this .Design.dll that is created for their projects that can improve the design-time experience for UI controls.  I highly encourage you to do that if you are creating a control that is for wide distribution and not just yourself or your small group of friends.</p>

<h2>Summary</h2>











<p>Wow this felt like a long post…thanks for reading this far!  I think developing custom controls is a great way to encapsulate specific UI and behavior you want in your application.  XAML has a great ecosystem of control vendors and I fully expect them to produce controls for Metro style apps as well.  Hopefully these techniques of packaging them up for distribution will help us all take advantage of them.</p>

<p>I also think that creating an Extension SDK *and* a NuGet package are the best ways of thinking about it as a producer.  This enables your consumers to have the greatest flexibility in how they want to consume your control.  Creating these distribution mechanisms may seem cumbersome at first (and there are some places where Visual Studio can improve the experience of creating/managing these manifests), but once you understand the core layout that is required for a Metro style XAML control and the fact that you now have “loose files” to consider it really becomes pretty streamlined and you can automate the creation of these pretty quickly in your build systems.</p>

<p>Be sure to check out these resources again:</p>

<ul>
  <li>Windows SDK: <strong><a href="http://code.msdn.microsoft.com/windowsapps/XAML-user-and-custom-a8a9505e">XAML User and Custom Controls</a></strong> (shows the C++ custom control as well)</li>

  <li><a href="http://go.microsoft.com/fwlink/?LinkID=235409">Creating a Software Development Kit</a> (refer to Extension SDK section)</li>

  <li><a href="http://docs.nuget.org/docs/creating-packages/creating-and-publishing-a-package">NuGet Packages</a></li>

  <li><a href="http://msdn.microsoft.com/en-us/library/ff363239.aspx">VSIX Deployment</a></li>
</ul>

<p>Here is the solution for the project I walked through above: <a href="http://s3.amazonaws.com:80/storage2.timheuer.com/SimpleCustomControl.zip">SimpleCustomControl.zip</a></p>

<p>Hope this helps!
  </p><div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:a855f32c-534b-4b6e-9992-ebb0d4fa959f" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>
