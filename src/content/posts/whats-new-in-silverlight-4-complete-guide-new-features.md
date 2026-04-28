---
title: "Silverlight 4 Beta &ndash; A guide to the new features"
slug: "whats-new-in-silverlight-4-complete-guide-new-features"
pubDate: 2009-11-18T11:18:16.000Z
lastModified: 2019-10-23T04:20:32.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "ria"
  - "riaservices"
  - "pdc09"
  - "sl4"
  - "silverlight 4"
  - "trusted application"
  - "elevated"
draft: false
---

<p><a href="http://silverlight.net/getstarted/silverlight-4-beta"><img border="0" align="left" alt="" style="border-width: 0px; margin: 0px 10px 0px 0px; display: inline;" src="http://storage.timheuer.com/sl4bloglogo.png" /></a></p>
<p>  </p>
<p style="text-decoration: line-through;">At the <a href="http://www.microsoftpdc.com">Microsoft Professional Developer</a> (PDC) conference, <a href="http://weblogs.asp.net/scottgu">Scott Guthrie</a> announced the <strong>availability of </strong><a href="http://silverlight.net"><strong>Silverlight</strong></a><strong> 4 Beta</strong>.</p>
<p><strong><span style="color: rgb(255, 0, 0);">UPDATE (March 2010): </span><a href="http://timheuer.com/blog/archive/2010/03/15/whats-new-in-silverlight-4-rc-mix10.aspx" style="color: rgb(255, 0, 0);">Silverlight 4 RC made available!  Go read my updated post on what has changed</a><span style="color: rgb(255, 0, 0);"> </span><span style="text-decoration: underline; color: rgb(255, 0, 0);">after</span><span style="color: rgb(255, 0, 0);"> you read below about the core features.</span><br />
</strong></p>
<p><strong>WHAT?!</strong></p>
<p>That’s right, we’ve released an early beta of the next version of Silverlight.  It’s really amazing to think what the team is accomplishing at the pace they are accomplishing it!  Silverlight 3 released just over 3 months ago and here we are with yet another release full of features that our community has been asking for.  </p>
<p>This beta release is a developer release.  This means that this is a preview mostly for developers to understand the new features and continue to get feedback.  No “end-user” runtime is available for this release, nor is a “go-live” license for customers wishing to put their applications into production.  If you have questions on this, feel free to leave a comment here.</p>
<p>Enough blabbing, here’s the goods.  WARNING: Long post ahead…but filled with information.</p>
<h2>Download Silverlight 4 and tools</h2>
<p>To be successful in your evaluation of Silverlight 4 you are going to need some tools.  Here’s the link dump of everything:</p>
<ul>
    <li><a href="http://msdn.microsoft.com/en-us/vstudio/dd582936.aspx">Visual Studio 2010 Beta 2</a> or <a href="http://go.microsoft.com/fwlink/?LinkID=167874">Visual Web Developer Express 2010 Beta 2</a> (pick one) </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkID=177508">Silverlight Tools for Visual Studio 2010</a> </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkId=169446">Expression Blend for .NET 4 Preview</a> – for authoring Silverlight 4 and WPF 4 applications </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkId=169231">WCF RIA Services</a> (formerly .NET RIA Services) (NOTE: This is actually included in the SL Tools for Silverlight 4) </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkID=167824">Silverlight 4 SDK CHM</a> (offline documentation) – optionally <a href="http://go.microsoft.com/fwlink/?LinkID=111305">online here</a> as well </li>
    <li>Updated <a href="http://silverlight.codeplex.com">Silverlight Toolkit</a> for Silverlight 4 </li>
    <li>Developer runtimes: <a href="http://silverlight.dlservice.microsoft.com/download/F/6/5/F653F7FD-AD4D-411D-8B1F-9C4B1BD69881/Silverlight_Developer.exe">Windows</a> and <a href="http://silverlight.dlservice.microsoft.com/download/F/6/5/F653F7FD-AD4D-411D-8B1F-9C4B1BD69881/Silverlight_Developer.dmg">Mac</a> platforms </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkID=169408">Silverlight 4 SDK only</a> – not needed if you install the tools above </li>
    <li><a href="http://smf.codeplex.com">Silverlight Media Framework</a> – a new, Open Source media player framework for you to use. </li>
</ul>
<p>These are the full set of tools to help you evaluate <strong>Silverlight 4</strong>.  At a bare minimum for a developer you’ll need/want Visual Studio 2010 and the Silverlight Tools for VS.  </p>
<blockquote>
<p><strong>NOTE</strong>: When you install the Silverlight Tools for VS, you get the Windows developer runtime, the Silverlight 4 SDK and the Visual Studio tools/templates.  <em>It is NOT necessary to install the SDK and developer runtimes again if you are using the tools installer</em>.  The developer runtimes are provided for you to put on other developer test machines to help test your applications.  Additionally, RIA Services is also included in the Silverlight Tools for Visual Studio 2010.  If you have a version of RIA Services already installed, you will need to uninstall it.</p>
</blockquote>
<p>Go ahead and get the tools starting to download.  In the meantime, here’s some other helpful information for you.</p>
<h2>Silverlight 4 Resources</h2>
<p>There are a few places for you to go to learn some things:</p>
<ul>
    <li>this blog – hey, you are here, you might as well <a href="http://feeds.timheuer.com/timheuer">subscribe</a> as well as follow me on <a href="http://twitter.com/timheuer">Twitter</a>. </li>
    <li><a href="http://blogs.silverlight.net/blogs/jesseliberty/">Jesse Liberty</a>, <a href="http://johnpapa.net">John Papa</a> and <a href="http://www.adamkinney.com">Adam Kinney</a> blogs, my partners in Silverlight </li>
    <li><a href="http://forums.silverlight.net/forums/59.aspx">Silverlight 4 beta</a> and <a href="http://forums.silverlight.net/forums/53.aspx">WCF RIA Services</a> forums. </li>
    <li>View initial <a href="http://silverlight.net/learn/videos/silverlight-4-beta/">Silverlight 4 learning videos</a> with sample code in C# and Visual Basic. </li>
    <li>Walk through some <a href="http://silverlight.net/learn/handsonlabs">hands-on labs</a>. </li>
</ul>
<p>You should bookmark and subscribe to the above sites for constant updated Silverlight information.</p>
<h2>What’s new in Silverlight 4 – feature review</h2>
<p><a name="top"></a>Okay, now on to the details.  Sit back, switch this post to your largest monitor, and grab a drink.  This is a long post intentionally to provide you with details to the framework.  In each area I’ll be sure to point out if there are existing resources (labs, videos, etc.) for that specific feature and be as concise as I can as to be “to the point” about what it provides, what are the requirements and some sample code, where appropriate.  Here we go with the feature dump…</p>
<table width="600" cellspacing="0" cellpadding="2" border="0">
    <tbody>
        <tr>
            <td width="300" valign="top">
            <ul>
                <li><a href="#tools">Tooling</a> </li>
                <li><a href="#printing">Printing API</a> </li>
                <li><a href="#rightclick">Right-click event handling</a> </li>
                <li><a href="#webcam">Webcam/microphone access</a> </li>
                <li><a href="#mousehweel">Mouse wheel support</a> </li>
                <li><a href="#richtext">RichTextArea Control</a> </li>
                <li><a href="#commands">ICommand support</a> </li>
                <li><a href="#clipboard">Clipboard API</a> </li>
                <li><a href="#htmlhost">HTML Hosting with WebBrowser</a> </li>
                <li><a href="#elevated">Elevated trust applications</a> </li>
                <li><a href="#localfiles">Local file access</a> </li>
                <li><a href="#com">COM interop</a> </li>
                <li><a href="#toast">Notification (“toast”) API</a> </li>
                <li><a href="#netauth">Network authentication</a> </li>
                <li><a href="#xdomain">Cross-domain Networking changes</a> </li>
                <li><a href="#fullscreen">Keyboard access in full screen mode</a> </li>
                <li><a href="#texttrim">Text trimming</a> </li>
            </ul>
            </td>
            <td width="300" valign="top">
            <ul>
                <li><a href="#viewbox">ViewBox</a> </li>
                <li><a href="#bidi-rtl">Right-to-left, BiDi and complex script</a> </li>
                <li><a href="#offlinedrm">Offline DRM</a> </li>
                <li><a href="#h264drm">H.264 protected content</a> </li>
                <li><a href="#droptarget">Silverlight as a drop target</a> </li>
                <li>Data binding
                <ul>
                    <li><a href="#idataerrorinfo">IDataErrorInfo and Async Validation</a> </li>
                    <li><a href="#dobind">DependencyObject Binding</a> </li>
                    <li><a href="#stringformat">StringFormat, TargetNullValue, FallbackValue</a> </li>
                </ul>
                </li>
                <li><a href="#mef">Managed Extensibility Framework (MEF)</a> </li>
                <li><a href="#datagrid">DataGrid enhancements</a> </li>
                <li><a href="#fluidui">Fluid UI support in items controls</a> </li>
                <li><a href="#implicit-style">Implicit theming</a> </li>
                <li><a href="#google-chrome">Google Chrome support</a> </li>
            </ul>
            </td>
        </tr>
    </tbody>
</table>
<p><u><em><a name="tools"></a>Tooling</em></u></p>
<p>With Visual Studio 2010, we finally have our designer surface back for Silverlight!  Yes, you have an editable design surface for Silverlight…and actually this isn’t just limited to Silverlight 4…it is available for Silverlight 3.  What is great about the Silverlight tools in VS2010 is that the databinding support is pretty rich in the designer surface as well.</p>
<p><img style="display: block; float: none; margin-left: auto; margin-right: auto;" title="DataBinding window in VS2010" alt="DataBinding window in VS2010" src="http://storage.timheuer.com/databindingvs2010.png" /></p>
<p>Additionally, for WCF RIA Services, we have improved designer/editor support for using DomainSource classes as a Data Source in Visual Studio.  Be sure to grab VS2010 for all your development needs.  VS2010 allows for multi-targeting of Silverlight 3 and 4 applications.</p>
<p><strong>Video: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/RIA-Services-Support-Visual-Studio-2010"><strong>RIA Services Support in Visual Studio 2010</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="printing"></a>Printing API</em></u></p>
<p>One of the top-most requested features in Silverlight has been to enable some printing support from the Silverlight application client-side versus always having the developer do things server-side.  In Silverlight 4 we’re providing a printing API that we believe to be extensible for the developer and provide you with a simple printing of a visual tree, or a highly extensible model to enable you to create a virtual visual tree to print for the end user directly from Silverlight.</p>
<p>Code sample:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">void</span> PrintAll_Click(<span style="color: rgb(0, 0, 255);">object</span> sender, RoutedEventArgs e)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>     <span style="color: rgb(0, 128, 0);">// instantiate a new PrintDocument</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>     PrintDocument docToPrint = <span style="color: rgb(0, 0, 255);">new</span> PrintDocument();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>     </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span>     <span style="color: rgb(0, 128, 0);">// set a friendly name for display in print queues</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span>     docToPrint.DocumentName = <span style="color: rgb(0, 96, 128);">"Entire Screen Sample"</span>;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum9">   9:</span>     <span style="color: rgb(0, 128, 0);">// wire up any starting code pre-printing (i.e., UI activity display)</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum10">  10:</span>     docToPrint.StartPrint += (s, args) =&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum11">  11:</span>         {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum12">  12:</span>             ActivityDisplay.IsActive = <span style="color: rgb(0, 0, 255);">true</span>;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum13">  13:</span>         };</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum14">  14:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum15">  15:</span>     <span style="color: rgb(0, 128, 0);">// tell the API what to print</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum16">  16:</span>     docToPrint.PrintPage += (s, args) =&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum17">  17:</span>         {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum18">  18:</span>             args.PageVisual = <span style="color: rgb(0, 0, 255);">this</span>.StackOfStuff;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum19">  19:</span>         };</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum20">  20:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum21">  21:</span>     <span style="color: rgb(0, 128, 0);">// wire up any clean-up code pre-printing (i.e., UI activity display)</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum22">  22:</span>     docToPrint.EndPrint += (s, args) =&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum23">  23:</span>         {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum24">  24:</span>             ActivityDisplay.IsActive = <span style="color: rgb(0, 0, 255);">false</span>;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum25">  25:</span>         };</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum26">  26:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum27">  27:</span>     <span style="color: rgb(0, 128, 0);">// execute the print job</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum28">  28:</span>     docToPrint.Print();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum29">  29:</span> }</pre>
<!--CRLF--></div>
</div>
<p>As you can see above, you can wire up pre- and post-print events for any type of preparation and clean-up code.  The PrintPage is the important area here where the developer would pass a UIElement to print.  This could be something that already exists in the visual tree, or something that is created virtually in-memory and not even added to the visual tree.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/Printing-API-Basics"><strong>Printing API Basics</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="rightclick"></a>Right-click event handling</em></u></p>
<p>Do you have an application that has a need for a context-style menu (aka ‘right click’ menus)?  Well, in addition to the MouseLeftButtonUp/Down events, we now enable the Mouse<strong>Right</strong>ButtonUp/Down events for you to attach to and handle.  This enables the developer to take control over what you’d like to do when those events occur.  This can be from handling simple commands for gaming (i.e., a right click is a different interaction in the game than the left click) or as well for providing context-style menus for additional functionality within the application.</p>
<p>Sample Code:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">partial</span> <span style="color: rgb(0, 0, 255);">class</span> MainPage : UserControl</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>     <span style="color: rgb(0, 0, 255);">public</span> MainPage()</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>     {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>         InitializeComponent();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span>         <span style="color: rgb(0, 128, 0);">// wire up the event handlers for the event on a particular UIElement</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>         ChangingRectangle.MouseRightButtonDown += <span style="color: rgb(0, 0, 255);">new</span> MouseButtonEventHandler(RectangleContextDown);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum9">   9:</span>         ChangingRectangle.MouseRightButtonUp += <span style="color: rgb(0, 0, 255);">new</span> MouseButtonEventHandler(RectangleContextUp);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum10">  10:</span>     }</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum11">  11:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum12">  12:</span>     <span style="color: rgb(0, 0, 255);">void</span> RectangleContextUp(<span style="color: rgb(0, 0, 255);">object</span> sender, MouseButtonEventArgs e)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum13">  13:</span>     {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum14">  14:</span>         <span style="color: rgb(0, 128, 0);">// create custom context menu control and show it.</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum15">  15:</span>         ColorChangeContextMenu contextMenu = <span style="color: rgb(0, 0, 255);">new</span> ColorChangeContextMenu(ChangingRectangle);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum16">  16:</span>         contextMenu.Show(e.GetPosition(LayoutRoot));</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum17">  17:</span>     }</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum18">  18:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum19">  19:</span>     <span style="color: rgb(0, 0, 255);">void</span> RectangleContextDown(<span style="color: rgb(0, 0, 255);">object</span> sender, MouseButtonEventArgs e)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum20">  20:</span>     {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum21">  21:</span>         <span style="color: rgb(0, 128, 0);">// handle the event so the default context menu is hidden</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum22">  22:</span>         e.Handled = <span style="color: rgb(0, 0, 255);">true</span>;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum23">  23:</span>     }</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum24">  24:</span> }</pre>
<!--CRLF--></div>
</div>
<p>The sample above shows a snippet from implementing a context menu within the application.  The result of the above code looks like this:</p>
<p><img style="display: block; float: none; margin-left: auto; margin-right: auto;" title="right click event sample" alt="right click event sample" src="http://storage.timheuer.com/sl4-rightclick.png" /></p>
<p>As you can see, the event handling is simple and the flexibility exists for you, the developer, to choose what you want to happen functionally and visually when the right-click events occur.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/Right-Click-Mouse-Events"><strong>Right-click Mouse Events</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="webcam"></a>Webcam and micrphone access</em></u></p>
<p>Need access to your user’s attached (or integrated) web camera and/or microphone?  You got it.  With a few simple lines of code you can request permission to your users to leverage their capture devices and then capture both the audio and video.</p>
<p>Sample code for requesting permission:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 128, 0);">// request user permission and display the capture</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> <span style="color: rgb(0, 0, 255);">if</span> (CaptureDeviceConfiguration.AllowedDeviceAccess || CaptureDeviceConfiguration.RequestDeviceAccess())</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span> {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>     _captureSource.Start();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span> }</pre>
<!--CRLF--></div>
</div>
<p>Sample code for capturing the video:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">if</span> (_captureSource != <span style="color: rgb(0, 0, 255);">null</span>)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>     _captureSource.Stop(); <span style="color: rgb(0, 128, 0);">// stop whatever device may be capturing</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>     <span style="color: rgb(0, 128, 0);">// set the devices for the capture source</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span>     _captureSource.VideoCaptureDevice = (VideoCaptureDevice)VideoSources.SelectedItem;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span>     _captureSource.AudioCaptureDevice = (AudioCaptureDevice)AudioSources.SelectedItem;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum9">   9:</span>     <span style="color: rgb(0, 128, 0);">// create the brush</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum10">  10:</span>     VideoBrush vidBrush = <span style="color: rgb(0, 0, 255);">new</span> VideoBrush();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum11">  11:</span>     vidBrush.SetSource(_captureSource);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum12">  12:</span>     WebcamCapture.Fill = vidBrush; <span style="color: rgb(0, 128, 0);">// paint the brush on the rectangle</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum13">  13:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum14">  14:</span>     <span style="color: rgb(0, 128, 0);">// request user permission and display the capture</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum15">  15:</span>     <span style="color: rgb(0, 0, 255);">if</span> (CaptureDeviceConfiguration.AllowedDeviceAccess || CaptureDeviceConfiguration.RequestDeviceAccess())</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum16">  16:</span>     {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum17">  17:</span>         _captureSource.Start();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum18">  18:</span>     }</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum19">  19:</span> }</pre>
<!--CRLF--></div>
</div>
<p>We also provide a very simple API for enabling “snapshot” images from the webcam:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">void</span> TakeSnapshot_Click(<span style="color: rgb(0, 0, 255);">object</span> sender, RoutedEventArgs e)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>     <span style="color: rgb(0, 0, 255);">if</span> (_captureSource != <span style="color: rgb(0, 0, 255);">null</span>)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>     {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>         <span style="color: rgb(0, 128, 0);">// capture the current frame and add it to our observable collection</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span>         _captureSource.AsyncCaptureImage((snapImage) =&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span>             {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>                 _images.Add(snapImage);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum9">   9:</span>             });</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum10">  10:</span>     }</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum11">  11:</span> }</pre>
<!--CRLF--></div>
</div>
<p>I am interested to see how these webcam/microphone features are implemented in the wild by developers!</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/Access-Web-Camera-Microphone"><strong>Webcam and Microphone Support</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="mousewheel"></a>Mouse wheel support</em></u></p>
<p>In previous versions of Silverlight, you had to rely on some helper classes from either DeepZoom or other sample sites to implement handling the mouse’s scroll wheel functionality on things like ListBox, etc.  We’re now providing APIs for you to handle MouseWheel events.  You can attach this event handler to other items as well (not just ListBox).</p>
<p>Sample Code:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 128, 0);">// wire up the event</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> myRectangle.MouseWheel += <span style="color: rgb(0, 0, 255);">new</span> MouseWheelEventHandler(RectangleZoom);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span> <span style="color: rgb(0, 0, 255);">void</span> RectangleZoom(<span style="color: rgb(0, 0, 255);">object</span> sender, MouseWheelEventArgs e)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span> {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span>     <span style="color: rgb(0, 128, 0);">// do something here like alter the scale</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span>     <span style="color: rgb(0, 128, 0);">// MouseWheelEventArgs.Delta gives you an int</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>     <span style="color: rgb(0, 128, 0);">// of the amount changed in the scroll event</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum9">   9:</span> }</pre>
<!--CRLF--></div>
</div>
<p>So as you can see, you can easily wire-up the event handler for the MouseWheel event on a particular element and respond accordingly.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/MouseWheel-API"><strong>Handling MouseWheel Events</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="richtext"></a>RichTextArea control</em></u></p>
<p>One of the requested features has been to provide an editable text control that enabled rich text editing using common rich text changes like bold, italics, different sizes, etc.  Using the RichTextArea, you can now enable these types of editing areas in your application.</p>
<p>Here’s an example of implementing the RichTextArea control:</p>
<p><img style="display: block; float: none; margin-left: auto; margin-right: auto;" title="RichTextArea sample" alt="RichTextArea sample" src="http://storage.timheuer.com/sl4-richtextarea.png" /></p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/RichTextArea"><strong>RichTextArea Control</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="commands"></a>ICommand support on ButtonBase and Hyperlink</em></u></p>
<p>To help support development patterns like the popular Model-View-ViewModel pattern, support for commanding infrastructures is now provided on ButtonBase and Hyperlink.  These exposed properties, <em>Command</em> and <em>CommandParameter</em> enable binding from a View to a ViewModel approach without the need for click event handlers in code behind files.  This helps aide the pattern of separation of concerns for the UI and code layers.</p>
<p>Sample Code:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> &lt;UserControl.Resources&gt; </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span>     &lt;local:ProductViewModel x:Key=<span style="color: rgb(0, 96, 128);">"ViewModelContext"</span>/&gt; </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span> &lt;/UserControl.Resources&gt; </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span> &lt;Grid DataContext=<span style="color: rgb(0, 96, 128);">"{StaticResource ViewModelContext}"</span> Name=<span style="color: rgb(0, 96, 128);">"LayoutRoot"</span>&gt; </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span> &lt;TextBox x:Name=<span style="color: rgb(0, 96, 128);">"CostThresholdFilter"</span>/&gt; </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span> &lt;Button Content=<span style="color: rgb(0, 96, 128);">"Load Products"</span> Width=<span style="color: rgb(0, 96, 128);">"120"</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span>     Command=<span style="color: rgb(0, 96, 128);">"{Binding FindMatchingProducts}"</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>     CommandParameter=<span style="color: rgb(0, 96, 128);">"{Binding Path=Text, ElementName=CostThresholdFilter}"</span>/&gt;</pre>
<!--CRLF--></div>
</div>
<p>In this example above, the XAML binds the Button to an event, <em>FindMatchingProducts</em>, from the DataContext (the “ViewModelContext” resource) as well as providing the parameter, <em>CostThresholdFilter</em>, from another UIElement on the page.  For those implementing solutions using the MVVM pattern (or other similar patterns), this added support for ICommand is a welcome addition!  Get those MVVM framework revisions working :-).</p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="clipboard"></a>Clipboard API</em></u></p>
<p>Prior to now, having a reliable method for providing contents that can be temporarily held in the machine’s “clipboard” memory area involved an IE-only solution or introducing other platforms into your Silverlight application.</p>
<p>With the addition of the Clipboard API, you can now have a cross-platform mechanism in Silverlight to provide this facility for you. </p>
<p>Sample Code:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> Clipboard.SetText(<span style="color: rgb(0, 96, 128);">"Some text to save in the clipboard area"</span>);</pre>
<!--CRLF--></div>
</div>
<p>This sample above shows setting some simple text to the Clipboard which could then be pasted to the Silverlight application, or to other applications the user is using as this is now in the machine’s clipboard memory.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/Accessing-Global-Clipboard"><strong>Accessing the Global Clipboard Programmatically</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="htmlhost"></a>Host HTML content using WebBrowser control</em></u></p>
<p>When you are working in the web world, you likely are dealing with HTML content in some area.  Especially if you are creating content-managed systems, sometimes that content is stored as HTML.  Enabling hosting HTML content in Silverlight is now possible by providing a simple WebBrowser control that will enable you to provide string-based HTML contents or navigate to a fully interactive URL.</p>
<p>Sample Code (XAML):</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> &lt;WebBrowser x:Name=<span style="color: rgb(0, 96, 128);">"MyBrowserControl"</span> Width=<span style="color: rgb(0, 96, 128);">"800"</span> Height=<span style="color: rgb(0, 96, 128);">"600"</span> /&gt;</pre>
<!--CRLF--></div>
</div>
<p>Sample Code (C#):</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> MyBrowserControl.NavigateToString(<span style="color: rgb(0, 96, 128);">"&lt;div style='color:red;width:100;height:100'&gt;&lt;b&gt;Tim Heuer&lt;/b&gt;&lt;/div&gt;"</span>);</pre>
<!--CRLF--></div>
</div>
<p>As an example, here’s a Silverlight application hosting an embedded YouTube Flash video:</p>
<p><img style="display: block; float: none; margin-left: auto; margin-right: auto;" title="Hosting HTML YouTube video in Silverlight" alt="Hosting HTML YouTube video in Silverlight" src="http://storage.timheuer.com/sl4-htmlhosting.png" /></p>
<p>Hopefully this will be helpful in developing your Silverlight applications.  Additionally, you can also use the HtmlBrush to fill elements using HTML content.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/Hosting-HTML-Content"><strong>Hosting HTML Content in Silverlight</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="elevated"></a>Elevated trust applications</em></u></p>
<p>One thing users have been asking for is to enable Silverlight out-of-browser (OOB) applications to have more privileges.  You can now alter the OOB manifest to request more elevated permissions for your application.  Using Visual Studio you can look at the project properties and enable the checkbox to add this request:</p>
<p><img style="display: block; float: none; margin-left: auto; margin-right: auto;" title="Elevated trust manifest setting" alt="Elevated trust manifest setting" src="http://storage.timheuer.com/sl4-elevatedpermsetting.png" /></p>
<p>The result is that the OOB install dialog now looks a little different and warns the user of these elevated privileges:</p>
<p><img style="display: block; float: none; margin-left: auto; margin-right: auto;" title="Trusted application install prompt" alt="Trusted application install prompt" src="http://storage.timheuer.com/sl4-elevatedinstallprompt.png" /></p>
<p>See the next sections for things that you can do in OOB mode now while in a trusted application (aka elevated mode).  It is important to note that this trusted application request still does not involve installing any additional runtime for the user…it is a part of the Silverlight 4 runtime – no additional download/framework would be required.</p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="localfiles"></a>Access local files on user’s machine</em></u></p>
<p>In order to read/write data to the user’s machine, you normally have to do it through a mechanism like OpenFileDialog (read) and SaveFileDialog (write).  In Silverlight 4 you can now have direct local file access to the users’ "My” folders in their profile.  These are things like MyDocuments, MyVideos, MyMusic, etc.  On OSX platform these map to the same user-level profile folders like /users/timheuer/Videos.  </p>
<p>You use the Environment namespace to get the path locations for the operation you are wishing to do. </p>
<p>Sample Code:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">void</span> EnumerateFiles(<span style="color: rgb(0, 0, 255);">object</span> sender, RoutedEventArgs e)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>     <span style="color: rgb(0, 128, 0);">// create a collection to hold the file enumeration</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>     List&lt;<span style="color: rgb(0, 0, 255);">string</span>&gt; videosInFolder = <span style="color: rgb(0, 0, 255);">new</span> List&lt;<span style="color: rgb(0, 0, 255);">string</span>&gt;();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span>     <span style="color: rgb(0, 128, 0);">// using the file api to enumerate</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span>     <span style="color: rgb(0, 128, 0);">// use the SpecialFolder API to get the users low trust "My Document" type folders</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>     var videos = Directory.EnumerateFiles(Environment.GetFolderPath(Environment.SpecialFolder.MyVideos));</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum9">   9:</span>     </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum10">  10:</span>     <span style="color: rgb(0, 128, 0);">// enumerate the folder</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum11">  11:</span>     <span style="color: rgb(0, 0, 255);">foreach</span> (var item <span style="color: rgb(0, 0, 255);">in</span> videos)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum12">  12:</span>     {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum13">  13:</span>         videosInFolder.Add(item);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum14">  14:</span>     }</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum15">  15:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum16">  16:</span>     <span style="color: rgb(0, 128, 0);">// bind the data</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum17">  17:</span>     VideoFileListing.ItemsSource = videosInFolder;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum18">  18:</span> }</pre>
<!--CRLF--></div>
</div>
<p>This feature requires a trusted application (elevated permissions).</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/Local-File-Access"><strong>Local File Access</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="com"></a>COM interoperability</em></u></p>
<p>Have you had the need to interoperate with device peripherals that only expose a COM interface?  What about having your Silverlight application talk with Office applications?  Using the ComAutomationFactory API, you can now have your Silverlight application instantiate and interact with COM applications on the Windows client.</p>
<p>Sample Code (interacting with Excel):</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 128, 0);">// create an instance of excel</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> dynamic excel = ComAutomationFactory.CreateObject(<span style="color: rgb(0, 96, 128);">"Excel.Application"</span>);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span> excel.Visible = <span style="color: rgb(0, 0, 255);">true</span>;  <span style="color: rgb(0, 128, 0);">// make it visible to the user.</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span> <span style="color: rgb(0, 128, 0);">// add a workbook to the instance </span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span> dynamic workbook = excel.workbooks;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span> workbook.Add();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum9">   9:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum10">  10:</span> dynamic sheet = excel.ActiveSheet; // get the active sheet</pre>
<!--CRLF--></div>
</div>
<p>This feature requires a trusted application (elevated permissions).  Notice that this is done via the dynamic keyword in C# 4.0.  One thing to also note that in the tooling you will not get IntelliSense support for your COM created objects.  Keep that documentation for that API handy!</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/COM-Object-Access-Trusted-Applications"><strong>COM Object Access in Trusted Applications</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="toast"></a>Notification (aka “toast”) API</em></u></p>
<p>Ever want your application to provide a notification mechanism to the user?  This is often referred to as “toast” where a subtle notification temporarily displays in the user’s screen providing some information provided by the application.  Perhaps one of the more common uses of this is in mail applications, like Outlook, where new mail notifications pop-up message notification windows near the system tray in Windows.</p>
<p>By using the NotificationWindow in Silverlight, you can provide a simple or customized notification mechanism for your application.</p>
<p>Sample Code:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">void</span> CustomNotificationButton_Click(<span style="color: rgb(0, 0, 255);">object</span> sender, RoutedEventArgs e)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>     <span style="color: rgb(0, 128, 0);">// create the nofitication window API</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>     NotificationWindow notify = <span style="color: rgb(0, 0, 255);">new</span> NotificationWindow();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>     notify.Height = 74;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span>     notify.Width = 329;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>     <span style="color: rgb(0, 128, 0);">// creating the content to be in the window</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum9">   9:</span>     CustomNotification custom = <span style="color: rgb(0, 0, 255);">new</span> CustomNotification();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum10">  10:</span>     custom.Header = <span style="color: rgb(0, 96, 128);">"Sample Header"</span>;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum11">  11:</span>     custom.Text = <span style="color: rgb(0, 96, 128);">"Hey this is a better looking notification!"</span>;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum12">  12:</span>     custom.Width = notify.Width;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum13">  13:</span>     custom.Height = notify.Height;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum14">  14:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum15">  15:</span>     <span style="color: rgb(0, 128, 0);">// set the window content</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum16">  16:</span>     notify.Content = custom;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum17">  17:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum18">  18:</span>     <span style="color: rgb(0, 128, 0);">// displaying the notification</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum19">  19:</span>     notify.Show(4000);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum20">  20:</span> }</pre>
<!--CRLF--></div>
</div>
<p>Here’s an example of a styled NotificationWindow content:</p>
<p><img style="display: block; float: none; margin-left: auto; margin-right: auto;" title="Sample NotificationWindow" alt="Sample NotificationWindow" src="http://storage.timheuer.com/sl4-notificationsample.png" /></p>
<p>Notifications can only be done in Silverlight out-of-browser applications, and are simple to implement in few lines of code.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/Notification-API"><strong>Notification Window API</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="netauth"></a>Network authentication in web requests</em></u></p>
<p>At times, you may be interacting with 3rd party (or perhaps your own) services that require authentication information to be passed into the service call.  This authentication information may be different than the logged-on user’s current information.</p>
<p>We have enabled providing NetworkCredential information via the ClientHttp networking stack that was introduced in Silverlight 3.  For example, to pass a username/password (basic auth) to a service call using this method would be something like this:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 128, 0);">// NetworkCredential passing is available in ClientHttp networking stack</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> WebRequest.RegisterPrefix(<span style="color: rgb(0, 96, 128);">"http://"</span>, System.Net.Browser.WebRequestCreator.ClientHttp);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span> WebClient myService = <span style="color: rgb(0, 0, 255);">new</span> WebClient();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span> myService.Credentials = <span style="color: rgb(0, 0, 255);">new</span> NetworkCredential(<span style="color: rgb(0, 96, 128);">"someusername"</span>, <span style="color: rgb(0, 96, 128);">"somepassword"</span>);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span> myService.UseDefaultCredentials = <span style="color: rgb(0, 0, 255);">false</span>; <span style="color: rgb(0, 128, 0);">// must be set to false if providing your own credentials</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span> myService.DownloadStringCompleted += <span style="color: rgb(0, 0, 255);">new</span> DownloadStringCompletedEventHandler(OnResultCompleted);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span> myService.DownloadStringAsync(<span style="color: rgb(0, 0, 255);">new</span> Uri(<span style="color: rgb(0, 96, 128);"><a href="http://somewebsite.com/authenticatedservice">http://somewebsite.com/authenticatedservice</a></span>));</pre>
<!--CRLF--></div>
</div>
<p>Note that we first register the prefix to use the ClientHttp networking stack.  The second thing to note is that in WebClient, you still must specify UseDefaultCredentials=”false” even though you are providing new credentials.  If you don’t, the default credentials will still be used.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/Network-Authentication-Trusted-Network-Access"><strong>Network Authentication in Web Requests</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="xdomain"></a>Cross-domain Networking changes</em></u></p>
<p>One of the more significant changes to cross-domain networking comes when you have a trusted application.  For services that have a closed cross-domain policy file (via clientaccesspolicy.xml or crossdomain.xml), if your application is a trusted application (elevated permissions), then the requirement for a cross-domain policy file is no longer required.</p>
<p>This only applies to trusted applications.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/Network-Authentication-Trusted-Network-Access"><strong>Network Cross-domain Request in Trusted Application</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="fullscreen"></a>Full keyboard access in full screen</em></u></p>
<p>If you are developing kiosk applications or other Silverlight applications that run in full-screen mode (IsFullScreen=”true”), you have noticed that only a limited set of keyboard input was enabled.  In Silverlight 4 trusted applications, any application in full-screen mode can have full keyboard input for things like TextBox or other input controls.</p>
<p>This only applies to trusted applications.</p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="texttrim"></a>TextTrimming</em></u></p>
<p>The TextBlock control has a new property called TextTrimming that enables you to use the WordElipse trimming value.  When the property is set, any text exceeding the visible limit of the control will be truncated and an ellipsis will be displayed to the user indicating more content.</p>
<p>Sample Code:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">TextBlock</span> <span style="color: rgb(255, 0, 0);">HorizontalAlignment</span><span style="color: rgb(0, 0, 255);">="Left"</span> <span style="color: rgb(255, 0, 0);">VerticalAlignment</span><span style="color: rgb(0, 0, 255);">="Top"</span> </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span>     <span style="color: rgb(255, 0, 0);">Text</span><span style="color: rgb(0, 0, 255);">="The quick brown fox jumped over the tall white fence"</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>     <span style="color: rgb(255, 0, 0);">TextTrimming</span><span style="color: rgb(0, 0, 255);">="WordEllipsis"</span> <span style="color: rgb(255, 0, 0);">Width</span><span style="color: rgb(0, 0, 255);">="120"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Sample Output:</p>
<p><img style="display: block; float: none; margin-left: auto; margin-right: auto;" title="TextTrimming output sample" alt="TextTrimming output sample" src="http://storage.timheuer.com/sl4-texttrimming.png" /></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="viewbox"></a>ViewBox control</em></u></p>
<p>As items in the Silverlight Toolkit mature in the codebase, these controls move into the core for Silverlight.  In this release, ViewBox has reached that level and is now provided in the core.  A ViewBox is a container control that aims to help constrain the contents of the ViewBox to a specific size or area and automatically handle scaling, etc.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/Using-the-ViewBox-Control"><strong>Using the ViewBox Control</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="bidi-rtl"></a>Bi-directional and complext text, Right-to-left support in controls</em></u></p>
<p>If you are writing an application that requires right-to-left (RTL) support in either text and/or controls, a new attribute for UIElement is now provided for you.  The FlowDirection attribute can be applied to represent the element in RTL format.  </p>
<p>Sample Code:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> &lt;StackPanel HorizontalAlignment=<span style="color: rgb(0, 96, 128);">"Center"</span> VerticalAlignment=<span style="color: rgb(0, 96, 128);">"Center"</span> x:Name=<span style="color: rgb(0, 96, 128);">"ControlSamples"</span>&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span>     &lt;TextBlock FlowDirection=<span style="color: rgb(0, 96, 128);">"LeftToRight"</span> Foreground=<span style="color: rgb(0, 96, 128);">"White"</span> Text=<span style="color: rgb(0, 96, 128);">"BiDi and RTL Sample"</span> FontSize=<span style="color: rgb(0, 96, 128);">"20"</span> Margin=<span style="color: rgb(0, 96, 128);">"20"</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>     &lt;RichTextArea TextWrapping=<span style="color: rgb(0, 96, 128);">"Wrap"</span> Width=<span style="color: rgb(0, 96, 128);">"600"</span> Height=<span style="color: rgb(0, 96, 128);">"150"</span>&gt;&lt;/RichTextArea&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>     &lt;TextBlock FontSize=<span style="color: rgb(0, 96, 128);">"24"</span> Foreground=<span style="color: rgb(0, 96, 128);">"White"</span> Text=<span style="color: rgb(0, 96, 128);">"قفز الثعلب البني السريع فوق الكلب الكسول."</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>     &lt;ListBox&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span>         &lt;ListBox.Items&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span>             &lt;ListBoxItem Content=<span style="color: rgb(0, 96, 128);">"قفز الثعلب البني السريع فوق الكلب الكسول."</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>             &lt;ListBoxItem Content=<span style="color: rgb(0, 96, 128);">"Option 1"</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum9">   9:</span>             &lt;ListBoxItem Content=<span style="color: rgb(0, 96, 128);">"Option 2"</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum10">  10:</span>             &lt;ListBoxItem Content=<span style="color: rgb(0, 96, 128);">"Option 3"</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum11">  11:</span>             &lt;ListBoxItem Content=<span style="color: rgb(0, 96, 128);">"Option 4"</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum12">  12:</span>         &lt;/ListBox.Items&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum13">  13:</span>     &lt;/ListBox&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum14">  14:</span> &lt;/StackPanel&gt;</pre>
<!--CRLF--></div>
</div>
<p>This can be applied to a higher level in the visual tree and gets automatically applied to child levels.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/BiDi-Right-to-Left"><strong>BiDi and Right-to-left Support</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p>  </p>
<p><a href="#top"></a></p>
<u><em><a name="offlinedrm"></a>Offline DRM for media playback</em></u>
<p>  </p>
<p>The next major wave of PlayReady innovation being built into Silverlight focuses on meeting the top media customer ask for the Silverlight DRM client – support for Offline scenarios.  The three key business models targeted for this release of the Silverlight DRM client are Rental, Subscription, and Purchase.  The Silverlight PlayReady ecosystem has several features that are valuable for these business models.</p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="h264drm"></a>H.264 protected content via PlayReady</em></u></p>
<p>PlayReady content protection for Silverlight and VC-1 encoded media has already proven to be a reliable and seamless experience to the user.  With Silverlight 4, this content protection is extended to H.264 encoded media assets.</p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="droptarget"></a>Using Silverlight application as a drop target from your desktop</em></u></p>
<p>For some scenarios, you may have wanted to be able to drag a file from your desktop or file explorer on to your Silverlight application.  By enabling the <em>AllowDrop</em> attribute on UIElement in this release, you can now accommodate those scenarios.</p>
<p>Sample Code:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">public</span> MainPage()</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>     InitializeComponent();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>     Loaded += <span style="color: rgb(0, 0, 255);">new</span> RoutedEventHandler(MainPage_Loaded);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>     </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span>     <span style="color: rgb(0, 128, 0);">// wire up the various Drop events</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span>     InstallButton.Drop += <span style="color: rgb(0, 0, 255);">new</span> DragEventHandler(InstallButton_Drop);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>     InstallButton.DragOver += <span style="color: rgb(0, 0, 255);">new</span> DragEventHandler(InstallButton_DragOver);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum9">   9:</span>     InstallButton.DragEnter += <span style="color: rgb(0, 0, 255);">new</span> DragEventHandler(InstallButton_DragEnter);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum10">  10:</span>     InstallButton.DragLeave += <span style="color: rgb(0, 0, 255);">new</span> DragEventHandler(InstallButton_DragLeave);</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum11">  11:</span> }</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum12">  12:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum13">  13:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum14">  14:</span> <span style="color: rgb(0, 0, 255);">void</span> InstallButton_Drop(<span style="color: rgb(0, 0, 255);">object</span> sender, DragEventArgs e)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum15">  15:</span> {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum16">  16:</span>     IDataObject foo = e.Data; <span style="color: rgb(0, 128, 0);">// do something with data</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum17">  17:</span> }</pre>
<!--CRLF--></div>
</div>
<p>This will be most helpful in file upload applications.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/Silverlight-Controls-Drop-Targets"><strong>Using Silverlight as a Drop Target</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="idataerrorinfo"></a>IDataErrorInfo and asynchronous validation</em></u></p>
<p>Silverlight adds the IDataErrorInfo interface enables the reporting of validation errors that a user interface can bind to.  When an entity implements this interface and the entity is involved in a binding operation, it invokes the indexer to validate the properties.  The bound target properties in the UI will receive the error messages and display the validation states if the ValidatesOnDataErrors property is set to true.</p>
<p>IDataErrorInfo is limited to validating on a per property basis. However, Silverlight 4 also adds the INotifyDataErrorInfo interface that allows validation across properties of an entity. It also allows entity objects to enable notification of data errors in the UI. INotifyDataErrorInfo allows developers to provide custom, asynchronous validation support to access server-side validation logic.  It exposes a HasErrors property to indicate if there are any errors and has a GetErrors method to retrieve the errors.  The ErrorsChanged event is raised when new errors are added. If the binding property ValidatesOnNotifyDataErrors is set to true and the source object implements the interface, the binding engine in Silverlight will listen for the ErrorsChanged event.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/Asynchronous-Data-Validation"><strong>Data Validation</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="dobind"></a>DependencyObject Binding</em></u></p>
<p>Silverlight introduces the ability to bind properties on a DependencyObject (DO) and not just on FrameworkElements.  For example, in Silverlight you can bind the rotation angle of a RotateTransform to a Slider control.</p>
<p>Sample Code:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Rectangle</span> <span style="color: rgb(255, 0, 0);">Width</span><span style="color: rgb(0, 0, 255);">="100"</span> <span style="color: rgb(255, 0, 0);">Height</span><span style="color: rgb(0, 0, 255);">="100"</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span>         <span style="color: rgb(255, 0, 0);">RenderTransformOrigin</span><span style="color: rgb(0, 0, 255);">="0.5, 0.5"</span> <span style="color: rgb(255, 0, 0);">Background</span><span style="color: rgb(0, 0, 255);">="#FF2B6092"</span><span style="color: rgb(0, 0, 255);">&gt;</span> </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Rectangle</span> .<span style="color: rgb(255, 0, 0);">RenderTransform</span><span style="color: rgb(0, 0, 255);">&gt;</span> </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">RotateTransform</span> <span style="color: rgb(255, 0, 0);">Angle</span><span style="color: rgb(0, 0, 255);">="{Binding ElementName=slider, Path=Value}"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span> </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>     <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Rectangle</span> .<span style="color: rgb(255, 0, 0);">RenderTransform</span><span style="color: rgb(0, 0, 255);">&gt;</span> </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span> <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Rectangle</span> <span style="color: rgb(0, 0, 255);">&gt;</span> </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Slider</span> <span style="color: rgb(255, 0, 0);">x:Name</span><span style="color: rgb(0, 0, 255);">="slider"</span> <span style="color: rgb(255, 0, 0);">Height</span><span style="color: rgb(0, 0, 255);">="20"</span> <span style="color: rgb(255, 0, 0);">Margin</span><span style="color: rgb(0, 0, 255);">="0,225,0,55"</span> <span style="color: rgb(255, 0, 0);">Minimum</span><span style="color: rgb(0, 0, 255);">="0"</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>         <span style="color: rgb(255, 0, 0);">Maximum</span><span style="color: rgb(0, 0, 255);">="360"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>This is a highly requested data binding enhancement that should be useful to designers and developers.</p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="stringformat"></a>StringFormat, TargetNullValue, FallbackValue</em></u></p>
<p>If you’ve ever done databinding in XAML using simple things like currency, dates, etc. then you have likely created a ValueConverter.  While for simple things it is not difficult, it was often a tedious and repetitive task.</p>
<p>StringFormat is now available to you for a simpler solution for XAML databinding and formatting the output.</p>
<p>Sample Code:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">TextBox</span> <span style="color: rgb(255, 0, 0);">Text</span><span style="color: rgb(0, 0, 255);">="{Binding Path=PublishedDate, Mode=OneWay, StringFormat='MM-dd-yyyy'}"</span><span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Additionally, you can also specify Fallback and TargetNull values in your binding syntax:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">TextBox</span> <span style="color: rgb(255, 0, 0);">Text</span><span style="color: rgb(0, 0, 255);">="{Binding Path=SomeBindingValue, Mode=TwoWay, FallbackValue=N/A}"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span> </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">TextBox</span> <span style="color: rgb(255, 0, 0);">Text</span><span style="color: rgb(0, 0, 255);">="{Binding Path=QuantityOnHand, Mode=TwoWay, TargetNullValue=0}"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>The FallbackValue displays a value when the binding operation is unsuccessful, where the TargetNullValue helps provide a value when the result of the binding value is NULL.</p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="mef"></a>Managed Extensibility Framework (MEF)</em></u></p>
<p>This release of Silverlight 4 brings support for the Managed Extensibility Framework (MEF) in the SDK.  This is far to important of a topic (and too broad of a topic) to cover in a simple paragraph.  Take a look at <a href="http://microsoftpdc.com/Sessions/FT24">Glenn Block’s session at PDC</a> (when available) for an in-depth look at this support for MEF in Silverlight.</p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="datagrid"></a>DataGrid enhancements</em></u></p>
<p>DataGrid is a commonly used control for building line-of-business applications.  Over time, the DataGrid has continually undergone improvement and this release is no different.  Take a look at the video for the improvements in the DataGrid control.</p>
<p><strong>Video and Sample Code: </strong><a href="http://www.silverlight.net/learn/videos/Silverlight-4-Beta-Videos/DataGrid-Enhancements"><strong>DataGrid Improvements</strong></a></p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="fluidui"></a>Fluid user interface support</em></u></p>
<p>In order to support more fluid user interface experiences, new states have been added to ItemsControl.  These new states: BeforeLoaded, Loaded and Unloaded help animate the transition of contents between states in an ItemsControl and provide a more interactive and “fluid” experience to the user.</p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="implicit-style"></a>Implicit theming for controls</em></u></p>
<p>Silverlight 4 introduces new styling features that allow you to create a style as a resource that can be used implicitly by all elements of a target type. This allows application developers to customize the look across multiple instances of a control and modify the appearance of these control instances by changing the implicit style. </p>
<p>Sample Code:</p>
<div style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;" id="codeSnippet">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">UserControl.Resources</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Style</span> <span style="color: rgb(255, 0, 0);">TargetType</span><span style="color: rgb(0, 0, 255);">="Button"</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Setter</span> <span style="color: rgb(255, 0, 0);">Property</span><span style="color: rgb(0, 0, 255);">="Foreground"</span> <span style="color: rgb(255, 0, 0);">Value</span><span style="color: rgb(0, 0, 255);">="Red"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Setter</span> <span style="color: rgb(255, 0, 0);">Property</span><span style="color: rgb(0, 0, 255);">="FontSize"</span> <span style="color: rgb(255, 0, 0);">Value</span><span style="color: rgb(0, 0, 255);">="24"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>     <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Style</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span> <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">UserControl.Resources</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Would result in any &lt;Button&gt; element having a FontSize of 24 and red foreground text.</p>
<p><a href="#top">^ back to top</a></p>
<p><u><em><a name="google-chrome"></a>Google Chrome support</em></u></p>
<p>As browser markets evolve, so must we.  During this release cycle we will be <em>officially</em> providing support for the Google Chrome browser.  To date, Silverlight has generally worked in Chrome, but we’ll be adding Chrome to our official test/support matrix with this release.  We’ve had a working communication group with Chrome to ensure that any questions we’ve had to make sure Silverlight runs well within Chrome are answered.</p>
<p><a href="#top">^ back to top</a></p>
<h2>Summary and Feedback</h2>
<p>So there you have it.  Some new toys to play around with.  What do you think?  Please be sure that if you find any issues or compatibility with existing compiled Silverlight applications that you report them in the <a href="http://forums.silverlight.net/forums/59.aspx">forum for Silverlight 4 beta</a>.</p>
<p>  </p>
<p>  </p>
<p>  </p>
<p>  </p>
<p>  </p>
<p>  </p>
<p>  </p>
<p>  </p>
<p>There are a few other items in the build, so be sure to read the <a href="http://silverlight.net/getstarted/silverlight-4-beta/">Silverlight 4 Beta information</a> as well as the what’s new documentation and breaking changes documentation provided.</p>
<p>I’m very excited about this release and hope you are as well.  I can’t wait to see what you guys and gals do with these new features!</p>
<div style="padding: 0px; margin: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:a37bab3a-c7cc-4902-9fac-6bd35ad8e90e" class="wlWriterEditableSmartContent"></div>

