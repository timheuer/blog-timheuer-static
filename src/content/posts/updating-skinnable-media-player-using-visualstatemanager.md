---
title: "Updated Silverlight media player using VisualStateManager"
slug: "updating-skinnable-media-player-using-visualstatemanager"
pubDate: 2008-06-10T14:23:34.000Z
lastModified: 2019-10-23T04:20:19.000Z
categories:
  - "silverlight"
  - "wpf"
  - "expression"
  - "blend"
  - "xaml"
  - "ria"
  - "media"
  - "vc-1"
  - "controls"
  - "vsm"
  - "visualstatemanager"
  - "video"
draft: false
---

<p>I’ve just finished updating <a href="http://timheuer.com/blog/archive/2008/05/02/creating-a-skinnable-silverlight-media-player.aspx">my modification</a> of <a href="http://joel.neubeck.net/">Joel</a>’s original concept.  Joel had a really great base for me to build off of and used styling and templates to create simple controls for a standard <strong>Silverlight </strong>media player that could be embedded.  I took his sample and made some minor adjustments to accommodate automatic sizing as well as make it a bit more parameter-driven.  The end result was (what I think at least) a fairly nice player that could be flexible if needed:</p>  <p><img src="http://s3.amazonaws.com/timheuer-img/sl2player1.png" /> </p>  <p>Joel made great use of styling primitive controls to be able to leverage core functionality rather than building it all himself.  One of those controls used was the ToggleButton (the play/pause feature) which makes sense for the implementation.  In the beta 1 version of styling we were able to use different styles for MouseOver states for checked/unchecked features.  A snippet of the styling XAML looked like this:</p>  <pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">Storyboard</span> <span class="attr">x:Key</span><span class="kwrd">="MouseOver Unchecked State"</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">DoubleAnimation</span> <span class="attr">Duration</span><span class="kwrd">="0:0:0.1"</span> <span class="attr">Storyboard</span>.<span class="attr">TargetName</span><span class="kwrd">="playSymbol"</span> <br />                  <span class="attr">Storyboard</span>.<span class="attr">TargetProperty</span><span class="kwrd">="Opacity"</span> <span class="attr">To</span><span class="kwrd">="1"</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">DoubleAnimation</span> <span class="attr">Duration</span><span class="kwrd">="0:0:0.1"</span> <span class="attr">Storyboard</span>.<span class="attr">TargetName</span><span class="kwrd">="pauseSymbol"</span> <br />                  <span class="attr">Storyboard</span>.<span class="attr">TargetProperty</span><span class="kwrd">="Opacity"</span> <span class="attr">To</span><span class="kwrd">="0"</span> <span class="kwrd">/&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">Storyboard</span><span class="kwrd">&gt;</span></pre>
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

<p>This worked fine in beta 1.  Beta 2 introduces the <strong><a href="http://timheuer.com/blog/archive/2008/06/04/silverlight-introduces-visual-state-manager-vsm.aspx">VisualStateManager</a></strong> model which is an exciting new feature for developers and designers.  Opening the video player project in the latest tools had some things blow up for us…no problem, let’s make use of VSM to change the styling implementation.</p>

<p>One problem…the <strong>ToggleButton</strong> no longer supports MouseOver states specifically for Checked/Unchecked as we’ve implemented in the video player.  My first thought (and a few emails to the team) was to inherit from the ToggleButton and do my own implementation, adding those states into the control.  I was able to do this by creating a new class file in my <a href="http://silverlight.net">Silverlight</a> project, then inheriting from ToggleButton and a few overrides.  I first wanted to support VSM so I added the appropriate TemplateParts to my class:</p>

<pre class="csharpcode">[TemplateVisualState(Name = <span class="str">"CheckedMouseOver"</span>, GroupName = <span class="str">"CheckStates"</span>), <br />       TemplateVisualState(Name = <span class="str">"CheckedMouseOut"</span>, GroupName = <span class="str">"CheckStates"</span>),
TemplateVisualState(Name = <span class="str">"UncheckedMouseOver"</span>, GroupName = <span class="str">"CheckStates"</span>), <br />       TemplateVisualState(Name = <span class="str">"UncheckedMouseOut"</span>, GroupName = <span class="str">"CheckStates"</span>)]
<span class="kwrd">public</span> <span class="kwrd">class</span> ToggleButtonEnhanced : ToggleButton
{</pre>
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

<p>This worked fine and they showed up in Blend designers as well for me to implement.  I then chose to override the MouseEnter/Leave events and did something quick like this:</p>

<pre class="csharpcode"><span class="kwrd">protected</span> <span class="kwrd">override</span> <span class="kwrd">void</span> OnMouseEnter(MouseEventArgs e)
{
    <span class="kwrd">base</span>.OnMouseEnter(e);
    <span class="kwrd">if</span> (<span class="kwrd">base</span>.IsEnabled)
    {
        <span class="kwrd">if</span> ((<span class="kwrd">bool</span>)<span class="kwrd">base</span>.IsChecked)
        {
            VisualStateManager.GoToState(<span class="kwrd">this</span>, <span class="str">"CheckedMouseOver"</span>, <span class="kwrd">true</span>);
        }
        <span class="kwrd">else</span> <span class="kwrd">if</span> ((<span class="kwrd">bool</span>)!<span class="kwrd">base</span>.IsChecked)
        {
            VisualStateManager.GoToState(<span class="kwrd">this</span>, <span class="str">"UncheckedMouseOver"</span>, <span class="kwrd">true</span>);
        }
    }
}</pre>
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

<p>Fair enough right?  Well it <em>appeared</em> to be working.  The problem was that ToggleButton maintained a Normal state that was conflicting with certain scenarios I had in my implementation.  You see the base.OnMouseEnter() was essentially the rathole here.  Some spelunking showed that when a state changed it actualy went from the desired state, then back to ‘Normal’ – for example the Pressed action wend: MouseOver,Pressed,Normal.  The final transition was causing my problem.</p>

<p>Now I was looking at overriding the OnApplyTemplate method and thus virtually having to re-implement all the other state transitions as well.  Now I’m no longer really getting a huge benefit out of my inheritance.  So I went back to some experts for some advice.  <a href="http://blogs.msdn.com/devdave/">Dave</a> gave me some pointers and we chatted about the implementation and desired outcomes.  Dave’s much smarter than me on VSM, well, because he had to implement it :-).  For <strong>my particular scenario</strong> he pointed out that I really had only one property that was changing in the MouseEnter/Leave events: Opacity.  So why not just change Opacity for the Grid container rather than worry about the elements.  Duh.</p>

<p>So now I no longer needed my custom ToggleButton, but could use the primitive ToggleButton to do my dirty work.  I implemented the MouseOver, Checked, and Unchecked states is all I really needed to manage my transitions.  A few learnings about some things I was doing wrong and boom, the new player works as expected.</p>

<p>I learned a few things in this quick journey through VSMville, and one was that it was pretty easy to implement a custom control to support the VisualStateManager model as well.  I think I’ll be digging into this one deeper soon.</p>

<p>Hope this helps someone!  Here’s the <a href="http://s3.amazonaws.com:80/timheuer-img/VideoPlayer-v2.zip">code for the updated Video Player</a>.  While the ToggleButtonEnhanced is <strong>not used</strong> in the final implementation, I kept it in the code file so you could see what path I started along.</p>

<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:17d07d30-5b4d-4b8f-b50b-4d5aa570d12c" style="padding-right: 0px; display: inline; padding-left: 0px; float: none; padding-bottom: 0px; margin: 0px; padding-top: 0px"></div>
