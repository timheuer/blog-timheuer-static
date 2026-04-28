---
title: "Getting started with Silverlight: Part 2 - Defining the UI layout and Navigation"
slug: "silverlight-get-started-part-2-defining-layout"
pubDate: 2009-10-06T10:17:10.000Z
lastModified: 2019-10-23T04:20:32.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "datagrid"
draft: false
---

<p>This is part 2 in a series on getting started with <a href="http://silverlight.net">Silverlight</a>.  To view the <a href="http://timheuer.com/blog/articles/getting-started-with-silverlight-development.aspx">index to the series click here</a>.  <strong>You can download the completed project files for this sample application in </strong><a href="http://storage.timheuer.com/TwitterSearchMonitor_CS.zip"><strong>C#</strong></a><strong> or </strong><a href="http://storage.timheuer.com/TwitterSearchMonitor_VB.zip"><strong>Visual Basic</strong></a><strong>.</strong></p>  <p>Understanding layout management in XAML applications is an important aspect in being successful in Silverlight development.  For most coming from the web world, this will be one of the bigger challenges if you are not a CSS wizard.</p>  <h2>Understanding Layout Options</h2>  <p>Silverlight provides a flexible system for laying out UI elements on a surface.  There are layout models to support both a dynamic and absolute layout style.  There are several layout controls provided but the most commonly used will be:</p>  <ul>   <li>Canvas </li>    <li>StackPanel </li>    <li>Grid </li> </ul>  <p>Let’s take a look at each of these using elements placed within them to see how they work.  We’ll use a simple Button element to demonstrate the purpose.  We’re using the same project we started with in step 1 and will show these on the Home.xaml page for simplicity (this is throw away code so just pick somewhere to play around for now).</p>  <p><em>Canvas</em></p>  <p>The Canvas is the most basic layout and would be used for positioning elements in an absolute manner using coordinates.  You position elements in the Canvas using <em>Attached Properties.</em> Attached properties allow the parent container (in this case Canvas) to extend the property of the controls within it (in our example Button).  We can position several buttons on a Canvas like this:</p>  <div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">   <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">     <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">Canvas</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Canvas</span>.<span style="color: #ff0000">Top</span><span style="color: #0000ff">="50"</span> <span style="color: #ff0000">Canvas</span>.<span style="color: #ff0000">Left</span><span style="color: #0000ff">="50"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="Button 1"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="18"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="45"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Canvas</span>.<span style="color: #ff0000">Top</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Canvas</span>.<span style="color: #ff0000">Left</span><span style="color: #0000ff">="20"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="Button 2"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="18"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="45"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Canvas</span>.<span style="color: #ff0000">Top</span><span style="color: #0000ff">="70"</span> <span style="color: #ff0000">Canvas</span>.<span style="color: #ff0000">Left</span><span style="color: #0000ff">="80"</span> <span style="color: #ff0000">Canvas</span>.<span style="color: #ff0000">ZIndex</span><span style="color: #0000ff">="99"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="Button 3"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="18"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="45"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Canvas</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>and when rendered it would show something like this:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Canvas layout" alt="Canvas layout" src="http://storage.timheuer.com/gs-step2-canvas.png" /></p>

<p>As you can see, this is the absolute positioning approach to layout.  Notice in the code I can also specify an attached property for ZIndex which is why one Button is overlapping the other in this example.  This might be helpful in game development or high physics situations where the calculations are very specific.  Canvas is useful when things don’t move around much or you are pretty in control of the sizing of the application.  Otherwise, Canvas can sometimes be difficult to leverage in favor of things like StackPanel or Grid.</p>

<p><em>StackPanel</em></p>

<p>A StackPanel is a layout control which <em>stacks</em> the elements either vertically or horizontally (vertical by default).  Using the sample with 3 Buttons and this code:</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">StackPanel</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="10"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="Button 1"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="18"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="45"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="10"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="Button 2"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="18"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="45"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="10"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="Button 3"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="18"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="45"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">StackPanel</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>the layout rendered would be:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="StackPanel vertical" alt="StackPanel vertical" src="http://storage.timheuer.com/gs-step2-stackpanel-v.png" /></p>

<p>or if we change the default Orientation attribute to horizontal using this code (notice only difference is Orientation attribute on StackPanel):</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">StackPanel</span> <span style="color: #ff0000">Orientation</span><span style="color: #0000ff">="Horizontal"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="10"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="Button 1"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="18"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="45"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="10"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="Button 2"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="18"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="45"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="10"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="Button 3"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="18"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="45"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">StackPanel</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>it would render like:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="StackPanel horizontal" alt="StackPanel horizontal" src="http://storage.timheuer.com/gs-step2-stackpanel-h.png" /></p>

<p />

<p />

<p />

<p />

<p />

<p>StackPanel provides a simple way to layout elements on top of each other or alongside each other without much challenge of worrying about the positioning of the elements within this container.</p>

<p><em>Grid</em></p>

<p>Grid is going to usually be the most flexible layout for most scenarios (notice I said most, not all).  It is exactly what it sounds like, a Grid structure using rows and columns.  Unlike what web developers may be used to with the &lt;table&gt; element where the content is within the &lt;tr&gt;,&lt;td&gt; tags, the XAML Grid is different.  You define the overall structure of the Grid and then use attached properties to tell the elements where to place themselves.</p>

<p>Consider this code (notice I’m explicitly showing grid lines but that isn’t something you’d normally do generally…just showing here for better visualization):</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">Grid</span> <span style="color: #ff0000">ShowGridLines</span><span style="color: #0000ff">="True"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Grid.RowDefinitions</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">RowDefinition</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="60"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">RowDefinition</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="60"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">RowDefinition</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="60"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum6">   6:</span>     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Grid.RowDefinitions</span><span style="color: #0000ff">&gt;</span>   </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum7">   7:</span>     </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum8">   8:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Grid.ColumnDefinitions</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum9">   9:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">ColumnDefinition</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="175"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum10">  10:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">ColumnDefinition</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="175"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum11">  11:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">ColumnDefinition</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="175"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum12">  12:</span>     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Grid.ColumnDefinitions</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum13">  13:</span>     </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum14">  14:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Grid</span>.<span style="color: #ff0000">Column</span><span style="color: #0000ff">="0"</span> <span style="color: #ff0000">Grid</span>.<span style="color: #ff0000">Row</span><span style="color: #0000ff">="0"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="Button 1"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="18"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="45"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum15">  15:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Grid</span>.<span style="color: #ff0000">Column</span><span style="color: #0000ff">="2"</span> <span style="color: #ff0000">Grid</span>.<span style="color: #ff0000">Row</span><span style="color: #0000ff">="0"</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="10"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="Button 2"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="18"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="45"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum16">  16:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">Grid</span>.<span style="color: #ff0000">Column</span><span style="color: #0000ff">="1"</span> <span style="color: #ff0000">Grid</span>.<span style="color: #ff0000">Row</span><span style="color: #0000ff">="2"</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="10"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="Button 3"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="18"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="150"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="45"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum17">  17:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Grid</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>We are defining the Grid to have 3 columns and 3 rows with specific width and heights.  Notice then in the Button elements we are positioning them in specific places within the Grid using the attached properties.  The resulting rendering looks like this:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" src="http://storage.timheuer.com/gs-step2-grid.png" /></p>

<p>Notice how the attached properties on the Button (Grid.Column, Grid.Row) tell the element where to position itself within the container.  Working with layouts is where <a href="http://microsoft.com/expression">Expression Blend</a> can be extremely helpful.  Notice how in Blend you can use the guides to specify the column/row definitions visually and it will generate the XAML for you:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Grid in Blend" alt="Grid in Blend" src="http://storage.timheuer.com/gs-step2-grid-blend.png" /></p>

<p>The arrows show you the guides as well as a visual indicator if the row/column are a fixed size (the lock).  We’ll use a combination of layout controls in our application.  In fact, the default template we chose makes use of all the different types of layout controls already for our basic shell for our application.</p>

<p />

<h2>Building our <a href="http://twitter.com/timheuer">Twitter</a> Application</h2>

<p>Now we can start building out our application.  In general, this is the mockup that we’ll be going after:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Twitter app mockup" alt="Twitter app mockup" src="http://storage.timheuer.com/gs-step2-mockup.png" /></p>

<p>Notice that we’ll have a place for the user to enter a search term, and the results will display in some list layout.  We’ll also have navigation areas to go to different views such as previous search term history and possibly some statistics.</p>

<p>Luckily the navigation template we chose already gives us some heavy lifting of our overall layout.  In MainPage.xaml I’m going to make a few changes.  On about line 29 in MainPage.xaml, I’m removing the application logo, and then changing the ApplicationnameTextBlock below it to “Twitter Search Monitor” for my application.</p>

<p>We’ll get back to navigation in a minute, but let’s recreate our Views.  In the project structure in the Views folder, create a new Page by right-clicking in Visual Studio and choosing to create a new Silverlight Page and name it Search.xaml:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Add Silverlight Page dialog" alt="Add Silverlight Page dialog" src="http://storage.timheuer.com/gs-step2-slpage.png" /></p>

<p>Now you should have a blank XAML page with a default Grid layout.  This is where we’ll create the search screen seen above.  We get the header information from our MainPage.xaml because we are using a Frame element to host our navigation.</p>

<h2>Silverlight Navigation Framework</h2>

<p>At this point let’s take a tangent and understand the Silverlight navigation framework.  If you recall we started using the navigation application template.  The default template gave us MainPage.xaml and some views of Home, About.  The navigation framework is fundamentally made up of 3 parts: UriMapper, Frame and Page.  </p>

<p><em>UriMapper</em></p>

<p>I like to think of the UriMapper element as a routing engine of sorts.  It is not required by any means but I think obfuscates and simplifies your navigation endpoint.  Instead of exposing the literal /Views/Home.xaml URI endpoint, you can map that to a simpler “/Home” endpoint that is more readable and doesn’t give away and technical configuration…and can change later to map to something else.  You can see the UriMapper as an element of the Frame in MainPage.xaml:</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">navigation:Frame</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="ContentFrame"</span> <span style="color: #ff0000">Style</span><span style="color: #0000ff">="{StaticResource ContentFrameStyle}"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>                 <span style="color: #ff0000">Source</span><span style="color: #0000ff">="/Home"</span> <span style="color: #ff0000">Navigated</span><span style="color: #0000ff">="ContentFrame_Navigated"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>                 <span style="color: #ff0000">NavigationFailed</span><span style="color: #0000ff">="ContentFrame_NavigationFailed"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">navigation:Frame.UriMapper</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span>   <span style="color: #0000ff">&lt;</span><span style="color: #800000">uriMapper:UriMapper</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum6">   6:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">uriMapper:UriMapping</span> <span style="color: #ff0000">Uri</span><span style="color: #0000ff">=""</span> <span style="color: #ff0000">MappedUri</span><span style="color: #0000ff">="/Views/Home.xaml"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum7">   7:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">uriMapper:UriMapping</span> <span style="color: #ff0000">Uri</span><span style="color: #0000ff">="/{pageName}"</span> <span style="color: #ff0000">MappedUri</span><span style="color: #0000ff">="/Views/{pageName}.xaml"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum8">   8:</span>   <span style="color: #0000ff">&lt;/</span><span style="color: #800000">uriMapper:UriMapper</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum9">   9:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">navigation:Frame.UriMapper</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum10">  10:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">navigation:Frame</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Now this UriMapper is in XAML like above, but it could also have been a resource and if done that way then you would add it to the Frame element like this (assuming the resource was UriMapperRoutes):</p>

<p>&lt;code/&gt;</p>

<p>We’ll stick to keeping what the template has provided us though at this time.</p>

<p><em>Frame</em></p>

<p>If you are an ASP.NET developer, you can think of the Frame element as like the ContentPlaceholder control.  The Frame is the area defined as the area <em>that can be navigated</em>.  You would specify a default view but then any navigation can occur within that area which we will see later.  Looking at the code above, you can see that the default view, the Source attribute of the Frame, is the “/Home” route for our application.</p>

<p><em>Page</em></p>

<p>The final fundamental area of navigation is the Page element, which we just created in our last step.  These are basically the content areas that are displayed in the Frame element.  They are very similar to the basic UserControl element that you might normally add (what MainPage is), but are special in that they can interact with navigation.  We will consider our Views in our application as our Page elements.</p>

<p>You can learn more about navigation specifically in this video walk-through:</p>

<ul>
  <li><a href="http://silverlight.net/learn/videos/silverlight-videos/navigation-framework">Navigation Framework in Silverlight</a> </li>
</ul>

<p>It’s fairly simple to understand once you dig around in it and can be powerful to use.  This framework is what allows deep-linking into Silverlight applications to exist.</p>

<h2>Creating the UI layout for our search view</h2>

<p />

<p>Let’s finish creating the UI in our Search.xaml page we just created.  At this point you may be wondering what all the <em>{StaticResource XXXXXXXX}</em> elements are in the XAML.  We’ll get to that in the styling/templating section in step 5, so try not to let it bother you for now.</p>

<p>Looking at our mockup, we are going to need a text input area, button and data display grid.  Let’s start laying that out using Blend in our Search.xaml page.  To do this, from Visual Studio, right-click on the Search.xaml page and choose Edit in Expression Blend:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Open in Blend dialog" alt="Open in Blend dialog" src="http://storage.timheuer.com/gs-step2-open-in-blend.png" /></p>

<p>Since Blend and Visual Studio share the same project structures you will be able to open the file at the same time to do the visual editing of the XAML before we start coding away.</p>

<p>While in blend we’ll layout our Grid to have 2 rows, one for the search input/button and the second for the results view.  In the top row we’ll drag a StackPanel in there and add a TextBox and Button into the StackPanel, setting it for Orientation=Horizontal.</p>

<p>The next thing we’ll do is add a DataGrid to show our data.  Since DataGrid is not a core control, it is in the SDK libraries and we’ll need to add a reference to it.  You can do this in various ways.  Blend will actually do this automatically for you.  In the toolbox pallette for Blend, click the double arrow and search for DataGrid:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Add DataGrid" alt="Add DataGrid" src="http://s3.amazonaws.com:80/storage.timheuer.com/gs-step2-datagrid.png" /></p>

<p>Once you see it, select it and drag it into the second row.  This automatically added the reference to the System.Windows.Controls.Data.dll for you and changed the markup in the XAML:</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">navigation:Page</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>            <span style="color: #ff0000">xmlns</span><span style="color: #0000ff">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>            <span style="color: #ff0000">xmlns:x</span><span style="color: #0000ff">="http://schemas.microsoft.com/winfx/2006/xaml"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span>            <span style="color: #ff0000">xmlns:d</span><span style="color: #0000ff">="http://schemas.microsoft.com/expression/blend/2008"</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span>            <span style="color: #ff0000">xmlns:mc</span><span style="color: #0000ff">="http://schemas.openxmlformats.org/markup-compatibility/2006"</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum6">   6:</span>            <span style="color: #ff0000">mc:Ignorable</span><span style="color: #0000ff">="d"</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum7">   7:</span>            <span style="color: #ff0000">xmlns:navigation</span><span style="color: #0000ff">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Navigation"</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum8">   8:</span>            <span style="color: #ff0000">xmlns:data</span><span style="color: #0000ff">="clr-namespace:System.Windows.Controls;assembly=System.Windows.Controls.Data"</span> <span style="color: #ff0000">x:Class</span><span style="color: #0000ff">="TwitterSearchMonitor.Views.Search"</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum9">   9:</span>            <span style="color: #ff0000">d:DesignWidth</span><span style="color: #0000ff">="640"</span> <span style="color: #ff0000">d:DesignHeight</span><span style="color: #0000ff">="480"</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum10">  10:</span>            <span style="color: #ff0000">Title</span><span style="color: #0000ff">="Twitter Search Page"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum11">  11:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">Grid</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="LayoutRoot"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum12">  12:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">Grid.RowDefinitions</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum13">  13:</span>             <span style="color: #0000ff">&lt;</span><span style="color: #800000">RowDefinition</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="32"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum14">  14:</span>             <span style="color: #0000ff">&lt;</span><span style="color: #800000">RowDefinition</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum15">  15:</span>         <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Grid.RowDefinitions</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum16">  16:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">StackPanel</span> <span style="color: #ff0000">HorizontalAlignment</span><span style="color: #0000ff">="Left"</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="0,-32,0,0"</span> <span style="color: #ff0000">VerticalAlignment</span><span style="color: #0000ff">="Top"</span> <span style="color: #ff0000">Grid</span>.<span style="color: #ff0000">Row</span><span style="color: #0000ff">="1"</span> <span style="color: #ff0000">Orientation</span><span style="color: #0000ff">="Horizontal"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum17">  17:</span>             <span style="color: #0000ff">&lt;</span><span style="color: #800000">TextBox</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="SearchTerm"</span> <span style="color: #ff0000">FontSize</span><span style="color: #0000ff">="14.667"</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="0,0,10,0"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="275"</span> <span style="color: #ff0000">TextWrapping</span><span style="color: #0000ff">="Wrap"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum18">  18:</span>             <span style="color: #0000ff">&lt;</span><span style="color: #800000">Button</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="SearchButton"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="75"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="SEARCH"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum19">  19:</span>         <span style="color: #0000ff">&lt;/</span><span style="color: #800000">StackPanel</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum20">  20:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">data:DataGrid</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="SearchResults"</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="0,8,0,0"</span> <span style="color: #ff0000">Grid</span>.<span style="color: #ff0000">Row</span><span style="color: #0000ff">="1"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum21">  21:</span>     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Grid</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum22">  22:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">navigation:Page</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Notice the xmlns:data in the top.  This is how, after adding a reference to the assembly, you add non-core controls to the XAML.  Then to use them you’ll see the data:DataGrid element in the Grid.  Your XAML now should look a bit like mine and visually it looks like this:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Final initial layout" alt="Final initial layout" src="http://storage.timheuer.com/gs-step2-final-layout.png" /></p>

<p>Notice in the XAML that I gave x:Name’s to my TextBox (SearchTerm), Button (SearchButton) and DataGrid (SearchResults).  This will help us later easily program against these elements.</p>

<p>Now if you go back to Visual Studio you may see a prompt to reload the project.  This is because Blend altered the project file by adding a reference to the DataGrid control.  You can go ahead and reload it.  This shows how integrated the tools are at the project file level.  Now we can start coding again using VS.</p>

<h2>Changing our UriMapper to default to Search.xaml</h2>

<p>Now that we just created the Search page (which is essentially our home page of the application), let’s make a few changes to the navigation framework.  In MainPage.xaml find the Frame and make a few changes to change the default from Home.xaml to our Search and making some other default changes as well.  Your Frame XAML should now look like this:</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">navigation:Frame</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="ContentFrame"</span> <span style="color: #ff0000">Style</span><span style="color: #0000ff">="{StaticResource ContentFrameStyle}"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>               <span style="color: #ff0000">Source</span><span style="color: #0000ff">="/Search"</span> <span style="color: #ff0000">Navigated</span><span style="color: #0000ff">="ContentFrame_Navigated"</span> <span style="color: #ff0000">NavigationFailed</span><span style="color: #0000ff">="ContentFrame_NavigationFailed"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">navigation:Frame.UriMapper</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span>   <span style="color: #0000ff">&lt;</span><span style="color: #800000">uriMapper:UriMapper</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">uriMapper:UriMapping</span> <span style="color: #ff0000">Uri</span><span style="color: #0000ff">=""</span> <span style="color: #ff0000">MappedUri</span><span style="color: #0000ff">="/Views/Search.xaml"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum6">   6:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">uriMapper:UriMapping</span> <span style="color: #ff0000">Uri</span><span style="color: #0000ff">="/{pageName}"</span> <span style="color: #ff0000">MappedUri</span><span style="color: #0000ff">="/Views/{pageName}.xaml"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum7">   7:</span>   <span style="color: #0000ff">&lt;/</span><span style="color: #800000">uriMapper:UriMapper</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum8">   8:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">navigation:Frame.UriMapper</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum9">   9:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">navigation:Frame</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Because we don’t need the Home.xaml anymore, go ahead and delete it from the project.  Also add a new view called History.xaml and alter the MainPage.xaml LinksBorder area to include a link to that:</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">Border</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="LinksBorder"</span> <span style="color: #ff0000">Style</span><span style="color: #0000ff">="{StaticResource LinksBorderStyle}"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">StackPanel</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="LinksStackPanel"</span> <span style="color: #ff0000">Style</span><span style="color: #0000ff">="{StaticResource LinksStackPanelStyle}"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>  </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">HyperlinkButton</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="Link1"</span> <span style="color: #ff0000">Style</span><span style="color: #0000ff">="{StaticResource LinkStyle}"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span>                          <span style="color: #ff0000">NavigateUri</span><span style="color: #0000ff">="/Search"</span> <span style="color: #ff0000">TargetName</span><span style="color: #0000ff">="ContentFrame"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="home"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum6">   6:</span>                          </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum7">   7:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">Rectangle</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="Divider1"</span> <span style="color: #ff0000">Style</span><span style="color: #0000ff">="{StaticResource DividerStyle}"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum8">   8:</span>         </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum9">   9:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">HyperlinkButton</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="Link2"</span> <span style="color: #ff0000">Style</span><span style="color: #0000ff">="{StaticResource LinkStyle}"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum10">  10:</span>                          <span style="color: #ff0000">NavigateUri</span><span style="color: #0000ff">="/History"</span> <span style="color: #ff0000">TargetName</span><span style="color: #0000ff">="ContentFrame"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="history"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum11">  11:</span>                          </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum12">  12:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">Rectangle</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="Divider2"</span> <span style="color: #ff0000">Style</span><span style="color: #0000ff">="{StaticResource DividerStyle}"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum13">  13:</span>  </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum14">  14:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">HyperlinkButton</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="Link3"</span> <span style="color: #ff0000">Style</span><span style="color: #0000ff">="{StaticResource LinkStyle}"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum15">  15:</span>                          <span style="color: #ff0000">NavigateUri</span><span style="color: #0000ff">="/About"</span> <span style="color: #ff0000">TargetName</span><span style="color: #0000ff">="ContentFrame"</span> <span style="color: #ff0000">Content</span><span style="color: #0000ff">="about"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum16">  16:</span>  </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum17">  17:</span>     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">StackPanel</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum18">  18:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Border</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Now our rendering if we run it should look like this:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Final layout rendered" alt="Final layout rendered" src="http://storage.timheuer.com/gs-step2-final-layout-rendered.png" /></p>

<p>Now that we’ve got the basics of the layout, let’s start adding data in <a href="http://timheuer.com/blog/articles/silverlight-get-started-part-3-accessing-data.aspx">part 3</a>.</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:0ebfe24a-9f70-498b-a16e-1dcb6dd956ec" class="wlWriterEditableSmartContent"></div>
