---
title: "Silverlight 3 Multi-touch: The Basics"
slug: "silverlight-3-multi-touch-introduction-fundamentals-basics"
pubDate: 2009-07-30T14:03:39.000Z
lastModified: 2019-10-23T04:20:30.000Z
categories:
  - "silverlight"
  - "touch"
  - "windows 7"
  - "win7"
  - "multi-touch"
draft: false
---

<p>One of the new features to <a href="http://silverlight.net/"><strong>Silverlight</strong></a> 3 is the ability to add <strong>multi-touch</strong> capabilities to your application.  When I posed the question on <a href="http://twitter.com/timheuer">Twitter</a>, I got some responses of ideas people would use this for.  Honestly most of them could be accomplished with mouse events today and X/Y calculations.  These would be the touch applications that are pretty singular.  But I did get some multi-touch ideas that I think I’ll try to explore.  First though, let’s look at the basics of what Silverlight provides for multi-touch application development.</p>  <h2>Hardware</h2>  <p>Hopefully I’m stating the obvious here, but your hardware has to support multi-touch.  And I’m not talking about that fake kind.  I’m talking about hardware that announces the WM_TOUCH messages to Windows.  If you (or your customers) aren’t going to be having multi-touch hardware, then writing against this API isn’t going to help!  I’m currently using the <a href="http://tinyurl.com/hptstx2">HP TouchSmart TX2</a> laptop running Windows 7.  I find this to be a good machine and fairly cheap-ish with regard to how laptops are these days and with the features it provides. </p>  <h2>The Event</h2>  <p>The first thing to understand is how to tap into the touch events from the hardware to Silverlight.  Understanding this at the beginning of your application development can be a critical step.  The key reason for this is unlike other input events (i.e., MouseLeftButtonDown, etc.) which can be added to individual UIElements in an application, the touch event is an application-wide event.  </p>  <p>There is one primary event: <em>FrameReported</em>.  This event is what gets fired when the hardware sends the touch events to the runtime.  The Touch class is a static class for the sole reason of this FrameReported API.  To wire it up in your application you can use code like this:</p>  <div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">   <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">     <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> Touch.FrameReported += <span style="color: #0000ff">new</span> TouchFrameEventHandler(Touch_FrameReported);</pre>
<!--CRLF--></div>
</div>

<p>And now you have to write your event handler.</p>

<h2>The Event Handler Arguments</h2>

<p>Once the runtime receives a touch message, the FrameReported event fires (and will do so several times…see later here).  The arguments you get that you primarily need to concern yourself in most circumstances are the GetPrimaryTouchPoint and GetTouchPoints.</p>

<p>The primary touch point could be thought of as the <em>first</em> touch message/point that the runtime received in a current sequence.  So if your application is using single gesture touch behaviors, this is likely what you’d use.  Otherwise GetTouchPoints is going to give you all the registered touch points from the hardware reported to the runtime.</p>

<p>For me understanding the Move event is critical.  If you take a look and add the data to my diagnostic app below for Move, you’ll see that even simply touching your finger in one place fires constant Move commands.</p>

<h2>What you get in a TouchPoint</h2>

<p>Both the primary and the collection of touch points listed above will return the TouchPoint object, which contains valuable information.  Namely it is going to give you Postition, which is a point relative to the offset you provided in the GetTouchPoint call (or absolute if you pass in null).</p>

<p>You also get the Action of the touch.  There are three actions: Down, Move and Up.  It is important to understand the firing sequence here.  Assume a given TouchPoint, it will first report Down, then it will continue to report Move until the touch is removed, at which point Up will occur.  The key piece in the middle is Move.  This action is firing even if you aren’t moving any element.  It is essentially reporting that you have a TouchPoint that is in Down state (i.e., touched).  Move can be helpful if you are needing to move things along with the updated position of the element.</p>

<p>You also get the TouchDevice which contains some helpful information.  Provided via the TouchDevice is an Id value, which is a unique id provided by the operating system for the device which reported the TouchPoint.  Also provided is <em>DirectlyOver</em> which is the topmost UIElement the position is over at the time the touch was produced.</p>

<h2>What about my mouse events?</h2>

<p>Ah, good point!  In the <em>TouchFrameEventArgs</em> you have a method you can call which is <em>SuspendMousePromotionUntilTouchUp</em>.  You would want to use this if you knew *for sure* that the end user had multi-touch hardware.  This would prevent the mouse event promotion for the given touch point.  This method can only be called if the Action is Down for the TouchPoint.  Once the TouchPoints all report Up, then normal mouse event promotion would resume.</p>

<h2>Putting it all together</h2>

<p>For these basics, I decided just to create a quick diagnostic application that would show the registering of the TouchPoint elements, as well as identifying the primary touch point.  My application has registered the FrameReported event handler and then I’ve added some logic:</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">public</span> MainPage()</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span> {</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>     InitializeComponent();</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span>     Touch.FrameReported += <span style="color: #0000ff">new</span> TouchFrameEventHandler(Touch_FrameReported);</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span> }</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum6">   6:</span>  </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum7">   7:</span> <span style="color: #0000ff">void</span> Touch_FrameReported(<span style="color: #0000ff">object</span> sender, TouchFrameEventArgs e)</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum8">   8:</span> {</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum9">   9:</span>     <span style="color: #0000ff">foreach</span> (TouchPoint tp <span style="color: #0000ff">in</span> e.GetTouchPoints(<span style="color: #0000ff">this</span>.Positions))</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum10">  10:</span>     {</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum11">  11:</span>         <span style="color: #0000ff">if</span> (tp.Action == TouchAction.Down)</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum12">  12:</span>         {</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum13">  13:</span>             <span style="color: #008000">// do something</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum14">  14:</span>         }</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum15">  15:</span>     }</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum16">  16:</span> }</pre>
<!--CRLF--></div>
</div>

<p>The end result is that when the user touches that application surface, we add the TouchPoint to an ObservableCollection that is bound to a DataGrid to show the points currently registered and by which device.  When the user removes the touch action, they go away.</p>

<p>Obviously it is hard to demonstrate touch capabilities in a screenshot and it really does it no justice.  I’m going to do my best attempt here to show you a picture-in-picture view of the application running and me interacting with it via Touch.  You’ll need Silverlight to view this demonstration.</p>

<p align="center"><iframe height="408" src="http://video.timheuer.com/mt1/Default.html" frameborder="0" width="640" scrolling="no"></iframe></p>

<h2>Summary</h2>

<p>There you have it.  The basics of multi-touch in Silverlight 3.  It’s fairly simple to understand the core mechanics of the API.  What gets tricky is interacting with your application beyond just showing the points :-).  In a future post I’ll show an application that makes use of this multi-touch feature in understanding where the touch occurred in my given application and how you can find the element that was touched (even though it’s an application-wide event).  If you aren’t subscribed, please consider <a href="http://feeds.timheuer.com/timheuer">subscribing to my blog</a> for regular updates for Silverlight information.</p>

<p>Feel free to spelunk this diagnostic app code:  <a href="http://storage.timheuer.com/MultiTouch_CS.zip">MultiTouch_CS.zip</a> (C#) or <a href="http://storage.timheuer.com/MultiTouch_VB.zip">MultiTouch_VB.zip</a> (Visual Basic).</p>

<p>Hope this helps!</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:2c9e7a5a-9374-4201-9932-14a77fbb3e81" class="wlWriterEditableSmartContent"></div>
