---
title: "Silverlight and the VisualStateManager"
slug: "silverlight-introduces-visual-state-manager-vsm"
pubDate: 2008-06-04T10:25:20.000Z
lastModified: 2019-10-23T04:20:19.000Z
categories:
  - "silverlight"
  - "wpf"
  - "expression"
  - "blend"
  - "xaml"
  - "ria"
  - "skinning"
  - "vsm"
  - "visualstatemanager"
  - "visual state manager"
  - "transitions"
  - "storyboard"
draft: false
---

<p>If you’ve heard the news about <a href="http://silverlight.net">Silverlight</a> 2 Beta 2 and <a href="http://silverlight.net/GetStarted">Expression Blend 2.5</a> (June 2008 preview), you will notice something else in addition to being able to <strong><a href="http://timheuer.com/blog/archive/2008/06/04/skinning-silverlight-controls-made-easier.aspx">skin your controls easier</a></strong>.  Remember how you may have had to create different states for your element using “MouseOver State" and then create storyboards to transition to states?  There’s now a better way.</p>  <p>Enter <strong>VisualStateManager</strong>.</p>  <p>Let’s take a look and see if we can simplify this down a bit a basic understanding.  Let’s use something that most everyone should be able to relate to with states: Button.  A button has MouseOver, MouseOut, MouseDown, etc. states that you can see.  Using VisualStateManager and the new UI ability to customize templates, we can make our lives easier.</p>  <p>Start in Expression Blend and drop a button on the default design surface.  I’ve created mine larger just for context, but whatever you want is fine.  You should have something like this:</p>  <p><img src="http://s3.amazonaws.com:80/timheuer-img/vsmb2-1.png" /></p>  <p>Now, using the method in one of my previous posts about skinning the controls, right-click on the button and choose to edit the template.  I’d choose <em>Edit a Copy</em> for now to make things easier for now…keep it a document resource as well.  After you’ve done that, take a look in the upper left pallette (assuming default and you haven’t moved your palettes around…in which case you probably already know about VSM and are smarter than me anyway):</p>  <p><img src="http://s3.amazonaws.com:80/timheuer-img/vsmb2-2.png" /></p>  <p>The various states of this control are represented in this particular template.  Some other controls might have a blank palette here until some are added, but Button has some default states.  As a designer now you can simply concentrate on what the final look of the element (in our case a Button) in each state.  Just define the state and what the element should look like in that state.  The State palette shows a few things.  You’ll notice “Base” as well as two other named containers, “CommonStates” and “FocusStates” which are what are called state groups and containers for different states.</p>  <p>Beneath that you can select a state and see it’s final state.  Want to change the MouseOver state, select it in the state palette and start customizing the template.  Let’s change the MouseOver state, select it and let’s change some properties.  By default it looks like this:</p>  <p><img src="http://s3.amazonaws.com:80/timheuer-img/vsmb2-3.png" /></p>  <p>You’ll also notice a few things changed.  Basically the design surface goes into Timeline recording mode and a subtle new feature in the objects palette indicating the property being animated/changed…in this case the BackgroundGradient:</p>  <p><img src="http://s3.amazonaws.com:80/timheuer-img/vsmb2-4.png" /></p>  <p>I’m selecting the BackgroundGradient element and then changing the color within the Properties palette.  Let’s change it to red.  There is no need for me to pay attention to any timeline stop points or anything, just concentrate on what I want the final Button to look like, position, etc. in this state:</p>  <p><img src="http://s3.amazonaws.com:80/timheuer-img/vsmb2-5.png" /></p>  <p>That’s it.  MouseOver will now represent my new state.  I didn’t have to create any new StoryBoard elements or anything.  This is in part where VSM does some magic.  You see, the VSM engine bascially knows the beginning end states between any given transition (i.e., Normal –&gt; MouseOver).  The VSM engine automatically handles the transition for us.  Think of it as creating a dynamic StoryBoard on the fly and executing it.  If we run the application and mouse over the Button, it changes to our state.</p>  <p>Notice the time in the state palette for a given state:</p>  <p><img src="http://s3.amazonaws.com:80/timheuer-img/vsmb2-6.png" /></p>  <p>This controls the duration of the transition TO that final state.</p>  <p>The VSM model also enables you to move between states via code.  VisualStateManager.GoToState() is a static method that enables you to move between states and optionally use the transition or just get to the state.  For example if we had our Button named "foo" and had some other event we could do this:</p>  <pre class="csharpcode">VisualStateManager.GoToState(foo, <span class="str">"MouseOver"</span>, <span class="kwrd">true</span>);</pre>
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

<p>The last parameter is to use the transition or not.  True would do the transition based on the duration set in that state.  False just gets to that state.</p>

<p>The theory is that VisualStateManager now makes it easy for us with our skinning, etc., but also separates more from the developer/designer so that the designer can concentrate on the final look and experience of the final states rather than having to code something up.</p>

<p>A Button used above is a simple example and I hope it helps demonstrate the VSM class available.  There could be other uses than the simple Button of course :-) and I hope to see some creative uses.  As a for instance, I've seen a lot of applications with slide-out control panel implementations.  You could use VisualStateManager and set the "collapsed" and "open" states for a control panel and just concentrate on the final stages of each and let VSM handle the transitions, etc.  </p>

<p>For some further designer-driven tutorials on this model, head on over to <a href="http://www.nibblestutorials.net/">Nibbles</a> where Celso will have some tutorials on what VSM means to designers in more depth.  Also be sure to check out <a href="http://electricbeach.org/">Christian’s blog</a> for more information on VisualStateManager.</p>

<p>Hope this helps!</p>

<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:ceeb3f48-e9c1-46af-a41b-70218a1890cd" style="padding-right: 0px; display: inline; padding-left: 0px; float: none; padding-bottom: 0px; margin: 0px; padding-top: 0px"></div>
