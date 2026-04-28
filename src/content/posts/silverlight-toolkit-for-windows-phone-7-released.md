---
title: "Silverlight Toolkit for Windows Phone 7"
slug: "silverlight-toolkit-for-windows-phone-7-released"
pubDate: 2010-09-16T09:14:45.000Z
lastModified: 2019-10-23T04:20:37.000Z
categories:
  - "silverlight"
  - "expression blend"
  - "riaservices"
  - "wp7dev"
  - "wp7"
  - "windows-phone"
  - "windows phone"
draft: false
---

<p>Well, the official <a href="http://developer.windowsphone.com/"><strong>Windows Phone Developer Tools</strong></a> are out!  <a href="http://developer.windowsphone.com/">Go get them</a>. (warning likely some caching issues..direct installer <a href="http://go.microsoft.com/fwlink/?LinkId=185584">here</a>.)</p>  <p>The awesome <a href="http://silverlight.codeplex.com"><strong>Silverlight toolkit</strong></a> team is at it again, this time for Windows Phone 7.  The team is releasing a series of controls/libraries to help WP7 developers fill some gaps and simply make things easier and more consistent.  The initial set includes the following:</p>  <ul>   <li><a href="#context-menu">ContextMenu</a> control </li>    <li><a href="#datetime-pickers">DatePicker and TimePicker</a> controls </li>    <li><a href="#toggleswitch">ToggleSwitch</a> control </li>    <li><a href="#gesturehelper">GestureHelper</a> library </li>    <li><a href="#wrappanel">WrapPanel</a> control </li> </ul>  <p>These controls are available for download <strong>including the source code</strong>.  Here’s a quick synopsis of them for you to enjoy.  Note that the “toolkit” prefix on the controls is declared in the app as:</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> xmlns:toolkit=<span class="str">"clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone.Controls.Toolkit"</span> </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> xmlns:toolkitPrimitives=<span class="str">"clr-namespace:Microsoft.Phone.Controls.Primitives;assembly=Microsoft.Phone.Controls.Toolkit"</span></pre>
<!--CRLF--></div>
</div>

<p>after adding a reference to the Microsoft.Phone.Controls.Toolkit assembly.</p>

<h2><a name="context-menu"></a>ContextMenu</h2>

<p>In WP7 there is a notion of a context menu, where when the user holds down an item (tap and hold) it pops up a menu in-line with some options.  This is used in areas like the application list, where if you tap and hold an application you get the option to pin it to the start menu, uninstall, etc.  For the toolkit control this is implemented as a ContextMenu service.  For example, if I wanted to enable a context menu on my canvas I would use this markup:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">Canvas</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">Width</span><span class="kwrd">="345"</span> <span class="attr">Height</span><span class="kwrd">="91"</span> <span class="attr">Margin</span><span class="kwrd">="0,50,0,0"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>     <span class="kwrd">&lt;</span><span class="html">toolkit:ContextMenuService.ContextMenu</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>         <span class="kwrd">&lt;</span><span class="html">toolkit:ContextMenu</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>             <span class="kwrd">&lt;</span><span class="html">toolkit:MenuItem</span> <span class="attr">Header</span><span class="kwrd">="pin to start menu"</span> <span class="attr">Click</span><span class="kwrd">="OnMenuClicked"</span> <span class="attr">Tag</span><span class="kwrd">="START_MENU"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>             <span class="kwrd">&lt;</span><span class="html">toolkit:MenuItem</span> <span class="attr">Header</span><span class="kwrd">="delete"</span> <span class="attr">Click</span><span class="kwrd">="OnMenuClicked"</span> <span class="attr">Tag</span><span class="kwrd">="DELETE"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>             <span class="kwrd">&lt;</span><span class="html">toolkit:MenuItem</span> <span class="attr">Header</span><span class="kwrd">="share"</span> <span class="attr">Click</span><span class="kwrd">="OnMenuClicked"</span> <span class="attr">Tag</span><span class="kwrd">="SHARE"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>         <span class="kwrd">&lt;/</span><span class="html">toolkit:ContextMenu</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>     <span class="kwrd">&lt;/</span><span class="html">toolkit:ContextMenuService.ContextMenu</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>     <span class="kwrd">&lt;</span><span class="html">Rectangle</span> <span class="attr">Fill</span><span class="kwrd">="#FFF4F4F5"</span> <span class="attr">Height</span><span class="kwrd">="91"</span> <span class="attr">Stroke</span><span class="kwrd">="Black"</span> <span class="attr">Width</span><span class="kwrd">="345"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">TextWrapping</span><span class="kwrd">="Wrap"</span> <span class="attr">Text</span><span class="kwrd">="Tap and Hold (zoom)"</span> <span class="attr">Foreground</span><span class="kwrd">="Black"</span> <span class="attr">Canvas</span>.<span class="attr">Left</span><span class="kwrd">="71"</span> <span class="attr">Canvas</span>.<span class="attr">Top</span><span class="kwrd">="27"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span> <span class="kwrd">&lt;/</span><span class="html">Canvas</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>And the result would look like:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="ContextMenu control" alt="ContextMenu control" src="http://storage2.timheuer.com/wp7toolkit-context.png" /></p>

<p>There is an option to disable ‘zoom’ of the context menu, which follows the UI consistency of the device itself and is the default.  Additionally you could implement the actual command using ICommand on the particular item.</p>

<h2><a name="datetime-pickers"></a>DatePicker and TimePicker</h2>

<p>These are two controls I’ve seen attempted to create to mimic the actual device controls in the WP7 OS itself.  Some implementations have been better than others.  Here the UI is matched with the semantics of the device.  When using the control, it will automatically provide you with a TextBox input and when the user selects it, the picker will display.  The markup is very simple:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">toolkit:DatePicker</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>to produce the user experience when the user clicks on the input area:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="WP7 Toolkit pickers" alt="WP7 Toolkit pickers" src="http://storage2.timheuer.com/wp7toolkit-pickers2.png" /></p>

<p>While shown above is the DatePicker, the TimePicker operates in similar fashion.</p>

<p>For the pickers you may notice that in my screenshot above I have the checkmark and the “x” icons in the ApplicationBar.  If you didn’t read the code comments in the toolkit you likely have “x” icon placeholders and are wondering why.  The toolkit provides the necessary icons for these, but you have to bring them into your application.  Once installed, look for them in the SDK folder and then add them using this well-known path:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="WP7 toolkit icon layout" alt="WP7 toolkit icon layout" src="http://storage2.timheuer.com/wp7toolkit-iconcontent.png" /></p>

<p>Once you have the PNG files there, be sure to mark them as Content so they are included correctly and then you should be good!</p>

<h2><a name="toggleswitch"></a>ToggleSwitch</h2>

<p>If you notice areas in WP7 that have simple on/off settings you may want to provide a consistent look in your application.  The ToggleSwitch control does just that, providing not only the actual ToggleButton, but also the area for label/etc.  This area could be templated as well so if you needed more than just a single text heading listing.  The code:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">toolkit:ToggleSwitch</span> <span class="attr">Header</span><span class="kwrd">="my setting name"</span> <span class="attr">Height</span><span class="kwrd">="118"</span> <span class="attr">Margin</span><span class="kwrd">="0,0,-24,-34"</span> <span class="attr">Width</span><span class="kwrd">="480"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>and the resulting UI:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="ToggleSwitch control" alt="ToggleSwitch control" src="http://storage2.timheuer.com/wp7toolkit-toggle.png" /></p>

<h2><a name="gesturehelper"></a>GestureHelper</h2>

<p>Wish you had a library that made it easier to know when a ‘flick’ or ‘pinch’ gesture happened?  Enter GestureHelper.  Using this on elements like this:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">Image</span> <span class="attr">x:Name</span><span class="kwrd">="GesturedImage"</span> <span class="attr">Source</span><span class="kwrd">="dividbyzero.jpg"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Center"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Center"</span> <span class="attr">Width</span><span class="kwrd">="450"</span> </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>     <span class="attr">RenderTransformOrigin</span><span class="kwrd">="0.5,0.5"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="kwrd">&lt;</span><span class="html">Image.RenderTransform</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>         <span class="kwrd">&lt;</span><span class="html">ScaleTransform</span> <span class="attr">x:Name</span><span class="kwrd">="ImageScaling"</span> <span class="attr">ScaleX</span><span class="kwrd">="1"</span> <span class="attr">ScaleY</span><span class="kwrd">="1"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     <span class="kwrd">&lt;/</span><span class="html">Image.RenderTransform</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>     <span class="kwrd">&lt;</span><span class="html">toolkit:GestureService.GestureListener</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>         <span class="kwrd">&lt;</span><span class="html">toolkit:GestureListener</span> <span class="attr">PinchDelta</span><span class="kwrd">="OnPinchDelta"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>     <span class="kwrd">&lt;/</span><span class="html">toolkit:GestureService.GestureListener</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span> <span class="kwrd">&lt;/</span><span class="html">Image</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>enables you to respond to these events when they happen and react accordingly:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> OnPinchDelta(<span class="kwrd">object</span> sender, PinchGestureEventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     ImageScaling.ScaleX = e.DistanceRatio;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     ImageScaling.ScaleY = e.DistanceRatio;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span> }</pre>
<!--CRLF--></div>
</div>

<p>Very helpful library!!  NOTE: the above sample is actually not goot ‘pinch’ scaling for an image, but merely here to demonstrate a quick point.</p>

<h2><a name="wrappanel"></a>WrapPanel</h2>

<p>The WrapPanel has been specifically ported for WP7.  Using the similar syntax:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">toolkit:WrapPanel</span> <span class="attr">Orientation</span><span class="kwrd">="Horizontal"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>     <span class="kwrd">&lt;</span><span class="html">Rectangle</span> <span class="attr">Fill</span><span class="kwrd">="Blue"</span> <span class="attr">Width</span><span class="kwrd">="100"</span> <span class="attr">Height</span><span class="kwrd">="100"</span> <span class="attr">Stroke</span><span class="kwrd">="Black"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="kwrd">&lt;</span><span class="html">Rectangle</span> <span class="attr">Fill</span><span class="kwrd">="Red"</span> <span class="attr">Width</span><span class="kwrd">="100"</span> <span class="attr">Height</span><span class="kwrd">="100"</span> <span class="attr">Stroke</span><span class="kwrd">="Black"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     <span class="kwrd">&lt;</span><span class="html">Rectangle</span> <span class="attr">Fill</span><span class="kwrd">="Green"</span> <span class="attr">Width</span><span class="kwrd">="100"</span> <span class="attr">Height</span><span class="kwrd">="100"</span> <span class="attr">Stroke</span><span class="kwrd">="Black"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     <span class="kwrd">&lt;</span><span class="html">Rectangle</span> <span class="attr">Fill</span><span class="kwrd">="Gray"</span> <span class="attr">Width</span><span class="kwrd">="100"</span> <span class="attr">Height</span><span class="kwrd">="100"</span> <span class="attr">Stroke</span><span class="kwrd">="Black"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>     <span class="kwrd">&lt;</span><span class="html">Rectangle</span> <span class="attr">Fill</span><span class="kwrd">="Yellow"</span> <span class="attr">Width</span><span class="kwrd">="100"</span> <span class="attr">Height</span><span class="kwrd">="100"</span> <span class="attr">Stroke</span><span class="kwrd">="Black"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>     <span class="kwrd">&lt;</span><span class="html">Rectangle</span> <span class="attr">Fill</span><span class="kwrd">="Orange"</span> <span class="attr">Width</span><span class="kwrd">="100"</span> <span class="attr">Height</span><span class="kwrd">="100"</span> <span class="attr">Stroke</span><span class="kwrd">="Black"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>     <span class="kwrd">&lt;</span><span class="html">Rectangle</span> <span class="attr">Fill</span><span class="kwrd">="Teal"</span> <span class="attr">Width</span><span class="kwrd">="100"</span> <span class="attr">Height</span><span class="kwrd">="100"</span> <span class="attr">Stroke</span><span class="kwrd">="Black"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>     <span class="kwrd">&lt;</span><span class="html">Rectangle</span> <span class="attr">Fill</span><span class="kwrd">="White"</span> <span class="attr">Width</span><span class="kwrd">="100"</span> <span class="attr">Height</span><span class="kwrd">="100"</span> <span class="attr">Stroke</span><span class="kwrd">="Black"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>     <span class="kwrd">&lt;</span><span class="html">Rectangle</span> <span class="attr">Fill</span><span class="kwrd">="Pink"</span> <span class="attr">Width</span><span class="kwrd">="100"</span> <span class="attr">Height</span><span class="kwrd">="100"</span> <span class="attr">Stroke</span><span class="kwrd">="Black"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>     <span class="kwrd">&lt;</span><span class="html">Rectangle</span> <span class="attr">Fill</span><span class="kwrd">="Magenta"</span> <span class="attr">Width</span><span class="kwrd">="100"</span> <span class="attr">Height</span><span class="kwrd">="100"</span> <span class="attr">Stroke</span><span class="kwrd">="Black"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span> <span class="kwrd">&lt;/</span><span class="html">toolkit:WrapPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>would produce the elements within the WrapPanel to be placed accordingly for you:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="WP7 Toolkit WrapPanel" alt="WP7 Toolkit WrapPanel" src="http://storage2.timheuer.com/wp7toolkit-wrappanel.png" /></p>

<p>This will be helpful especially in areas of displaying items in storage locations (i.e., pictures, album art) I think.</p>

<h2>Summary</h2>

<p>These controls are being made available for you to freely consume in your applications.  Go to the <a href="http://silverlight.codeplex.com"><strong>Silverlight Toolkit</strong></a> site right now and download the <strong>Silverlight for Windows Phone Toolkit</strong> and begin incorporating them into your applications today.  Be sure to leave feedback <strong>on the Codeplex site </strong>with any issues you may find with your scenarios.</p>

<p align="left">Be sure to visit the <a href="http://www.silverlight.net">Silverlight</a> Toolkit site for the bits and also ensure you subscribe to <a href="http://www.jeff.wilcox.name/">Jeff Wilcox</a> and <a href="http://blogs.msdn.com/delay">David Anson</a>’s blogs for what likely will follow more detailed and useful information about the toolkit items!</p>

<p>Hope this helps! </p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:a8d419f2-666b-4d43-bfae-0e4fef77b53d" class="wlWriterEditableSmartContent"></div>
