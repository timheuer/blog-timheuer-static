---
title: "Add mouse wheel support to ScrollViewer"
slug: "mouse-wheel-support-for-scrollviewer"
pubDate: 2008-09-23T10:57:56.000Z
lastModified: 2019-10-23T04:20:23.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "deepzoom"
  - "scrollviewer"
  - "adam cooper"
  - "extension methods"
  - "listbox"
  - "mouse wheel"
draft: false
---

<p>As you may know, most wheel support is detected at the browser level.  In <a href="http://silverlight.net">Silverlight</a>, this makes adding mouse wheel support an interop action with the HTML host.  While <a href="http://blois.us/blog/2008/03/ive-heard-number-of-people-wondering.html">people have implemented it</a>, it has mostly been for the use of DeepZoom applications.  In fact, the latest DeepZoom Composer tool actually adds this support now if you choose to have a Silverlight project as a part of the output of the collection.</p>  <p>But what about other controls, namely <strong>ScrollViewer</strong>?  Having content in ScrollViewer enables <em>ScrollBar</em> functionality but doesn’t automatically respond to mouse wheel actions.  <a href="http://adamjcooper.com/blog/post/Improved-Mouse-Wheel-Support-for-Silverlight-2-Beta-2-ScrollViewer.aspx"><strong>Adam Cooper</strong> has solved</a> this gap problem by adding a helper class to which you can attach to your ScrollViewer object.  Let’s say our XAML is this:</p>  <div style="border-bottom: gray 1px solid; border-left: gray 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: consolas, 'Courier New', courier, monospace; font-size: 8pt; overflow: auto; border-top: gray 1px solid; cursor: text; border-right: gray 1px solid; padding-top: 4px">   <div style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px">     <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">ScrollViewer</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="MyScroller"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="300"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="100"</span> <span style="color: #ff0000">Background</span><span style="color: #0000ff">="AliceBlue"</span><span style="color: #0000ff">&gt;</span></pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   2:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">TextBlock</span> <span style="color: #ff0000">TextWrapping</span><span style="color: #0000ff">="Wrap"</span><span style="color: #0000ff">&gt;</span></pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   3:</span>         Even if you use my workaround ...</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   4:</span>     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">TextBlock</span><span style="color: #0000ff">&gt;</span></pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   5:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">ScrollViewer</span><span style="color: #0000ff">&gt;</span></pre>
  </div>
</div>

<p>If we run the application our content is scrollable, but not with the wheel.  Add Adam’s control reference and these lines of code in our Page.xaml.cs class:</p>

<div style="border-bottom: gray 1px solid; border-left: gray 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: consolas, 'Courier New', courier, monospace; font-size: 8pt; overflow: auto; border-top: gray 1px solid; cursor: text; border-right: gray 1px solid; padding-top: 4px">
  <div style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px">
    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   1:</span> <span style="color: #0000ff">using</span> Cooper.Silverlight.Controls;</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   2:</span>  </pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   3:</span> <span style="color: #0000ff">public</span> Page()</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   4:</span> {</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   5:</span>     InitializeComponent();</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   6:</span>  </pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   7:</span>     ScrollViewerMouseWheelSupport.Initialize(<span style="color: #0000ff">this</span>);</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   8:</span>  </pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   9:</span>     MyScroller.AddMouseWheelSupport();</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">  10:</span> }</pre>
  </div>
</div>

<p>and we have automatic wheel scroll support.  Great job Adam!  His post talks about various other methods of nesting and how it actually works.</p>

<p>It would be nice if you could just create <em>MyCustomScrollViewer</em> but unfortunately you cannot subclass ScrollViewer for some reason.  </p>

<p>Some might be also wondering how they could add this functionality to ListBox, since the default control template for ListBox contains a ScrollViewer.  Good question I thought as well and I went about trying.  There are some challenges to using the default ListBox.  First, the visual tree of the template is only loaded after the layout has been updated.  I’m not sure why it isn’t in Loaded, but in LayoutUpdated it is available.  So from this event you can use VisualTreeHelper.GetChild(ListBox, 0) to get the root node of the template.  From there you can use FindName(“ScrollViewer”) to get to the ScrollViewer in the default control template.</p>

<p>Here’s where it gets funky.</p>

<p>While you can add Adam’s extension method just fine with no exceptions, it doesn’t exactly work when rendered.  Here’s the code I used:</p>

<div style="border-bottom: gray 1px solid; border-left: gray 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: consolas, 'Courier New', courier, monospace; font-size: 8pt; overflow: auto; border-top: gray 1px solid; cursor: text; border-right: gray 1px solid; padding-top: 4px">
  <div style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px">
    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   1:</span> <span style="color: #0000ff">void</span> DefaultList_LayoutUpdated(<span style="color: #0000ff">object</span> sender, EventArgs e)</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   2:</span> {</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   3:</span>     <span style="color: #008000">// root node</span></pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   4:</span>     Grid rootGrid = VisualTreeHelper.GetChild(DefaultList, 0) <span style="color: #0000ff">as</span> Grid;</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   5:</span>     </pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   6:</span>     <span style="color: #008000">// find the ScrollViewer</span></pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   7:</span>     ScrollViewer scroller = rootGrid.FindName(<span style="color: #006080">"ScrollViewer"</span>) <span style="color: #0000ff">as</span> ScrollViewer;</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   8:</span>     </pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   9:</span>     <span style="color: #008000">// add the mouse wheel support</span></pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">  10:</span>     scroller.AddMouseWheelSupport();</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">  11:</span>  </pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">  12:</span>     <span style="color: #008000">// stop looking</span></pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">  13:</span>     DefaultList.LayoutUpdated -= <span style="color: #0000ff">new</span> EventHandler(DefaultList_LayoutUpdated);</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">  14:</span> }</pre>
  </div>
</div>

<p>And while no errors occur, I believe other events in the ItemTemplate are eating my events.  If anyone has any wise thoughts, post the comments here.  But either way, thanks Adam for this great utility for ScrollViewer!</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:ea5ae726-df53-4da0-94d5-e8edaab9bfc5" class="wlWriterEditableSmartContent"></div>
