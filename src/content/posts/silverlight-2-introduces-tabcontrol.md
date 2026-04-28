---
title: "A new Silverlight control - TabControl"
slug: "silverlight-2-introduces-tabcontrol"
pubDate: 2008-06-04T16:50:47.000Z
lastModified: 2019-10-23T04:20:19.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "ria"
  - "controls"
  - "tabcontrol"
  - "tabitem"
draft: false
---

<p><a href="http://silverlight.net">Silverlight</a> 2 brings a suite of controls for designers and developers to leverage within their applications.  With the Expression tools helping us to be able to <strong>skin these controls</strong>, also comes some new controls you may not have used yet as well as a new one introduced with the latest release of Silverlight 2.</p>
<p>Introducing <strong>TabControl</strong>.</p>
<p><strong>UPDATE: <a href="http://silverlight.net/learn/learnvideo.aspx?video=61027">Video walk-through is now live</a>.</strong></p>
<p>The TabControl is implemented in the System.Windows.Controls.Extended class library and not in the Silverlight core.  To use it make a reference to the Extended assembly and it will be available to you.  In Expression Blend you’ll see TabControl in the <strong>Custom Controls</strong> section of the Asset Library:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/tabcontrol-1.png" /></p>
<p>You’ll notice there is actually a TabControl and <strong>TabItem</strong> controls…to implement you’ll need them both.  In Blend, you’ll have to drag a TabControl onto the design surface.  Once you have it, double-click on the TabControl in the Objects and Timeline explorer so that it has a yellow ring around it:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/tabcontrol-2.png" /></p>
<p>Having the yellow border indicates that it is the actively selected element.  Now if you go back to the asset library, change to a TabItem and double-click the TabItem, it will be added as a child of the TabControl.  Do this several times to add as many TabItems you need:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/tabcontrol-3.png" /></p>
<p>The resulting <strong>XAML</strong> looks like this:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">ex:TabControl</span> <span class="attr">TabStripPlacement</span><span class="kwrd">="Bottom"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> 
               <span class="attr">Width</span><span class="kwrd">="231.148"</span> <span class="attr">Height</span><span class="kwrd">="156.611"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> 
               <span class="attr">x:Name</span><span class="kwrd">="tabstrip1"</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">ex:TabItem</span> <span class="attr">Width</span><span class="kwrd">="75"</span> <span class="attr">Height</span><span class="kwrd">="20"</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">ex:TabItem</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">ex:TabItem</span> <span class="attr">Width</span><span class="kwrd">="75"</span> <span class="attr">Height</span><span class="kwrd">="20"</span> <span class="attr">Header</span><span class="kwrd">="Second"</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">ex:TabItem</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">ex:TabItem</span> <span class="attr">Width</span><span class="kwrd">="75"</span> <span class="attr">Height</span><span class="kwrd">="20"</span> <span class="attr">Header</span><span class="kwrd">="Third"</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">ex:TabItem</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">ex:TabControl</span><span class="kwrd">&gt;</span></pre>
<style type="text/css"><![CDATA[


.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }]]></style>
<p>You’ll notice the “ex” namespace with the TabControl.  Yours may be different and likely “System_Windows_Controls“ if you followed the steps above.  This is added automatically when you drag a control onto the surface from the asset library.  The namespace is actually directed in the root node of the XAML and you can change it to whatever you’d like.</p>
<p>The TabControl has properties you can set on it just like any other control, but one that you might find important would be the <strong>TabStripPlacement</strong> property.  This enables you to direct where the TabItems (tabs) actually get displayed: Top, Left, Right, or Bottom.  This can be set in XAML and also controlled during runtime using the Dock enumeration.</p>
<p>Each TabItem also has two properties to set content: Header and Content.  Header is where you would put the content for the tab itself and content direct the actual content within the TabItem.  This can be set to literal string values, but they can also be set to other content.  For example, if you want to set the content within the TabItem, you could do something like:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">ex:TabItem</span> <span class="attr">Width</span><span class="kwrd">="75"</span> <span class="attr">Height</span><span class="kwrd">="20"</span> <span class="attr">Header</span><span class="kwrd">="Third"</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Orientation</span><span class="kwrd">="Vertical"</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">TextBox</span> <span class="attr">x:Name</span><span class="kwrd">="yourname"</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">Button</span> <span class="attr">Content</span><span class="kwrd">="Click me"</span> <span class="attr">Click</span><span class="kwrd">="Button_Click"</span> <span class="kwrd">/&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="resulttext"</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">ex:TabItem</span><span class="kwrd">&gt;</span></pre>
<style type="text/css"><![CDATA[


.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }]]></style>
<p>If you wanted to set alternate content as the Header you could likewise do that as well noting the TabItem.Header:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">ex:TabItem</span> <span class="attr">Width</span><span class="kwrd">="75"</span> <span class="attr">Height</span><span class="kwrd">="20"</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">ex:TabItem.Header</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">Button</span> <span class="attr">Content</span><span class="kwrd">="foo"</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">ex:TabItem.Header</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">Button</span> <span class="attr">Content</span><span class="kwrd">="Click Me"</span> <span class="attr">Click</span><span class="kwrd">="Button_Click_1"</span><span class="kwrd">/&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">ex:TabItem</span><span class="kwrd">&gt;</span></pre>
<style type="text/css"><![CDATA[


.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }]]></style><style type="text/css"><![CDATA[


.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }]]></style>
<p>Let us all welcome TabControl to the family.  A simple yet probably widely used control is now available for you to think of marvelous uses :-).  Remember, that TabControl (as well as the calendar and date picker controls) is located in the Extended control assembly and not the core.  Here’s an example of a TabControl using some of the methods described above:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/tabcontrol-4.png" /></p>
<p>For a video demonstration of using TabControl, visit the <a href="http://silverlight.net/Learn">Silverlight community learning section</a> and stay updated as the video will be there shortly as well as other great videos on using Silverlight 2.</p>
<p>Hope this helps!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:0e405b57-1533-47c2-924c-e5b38c73b05d" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>

