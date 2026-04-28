---
title: "A guide to Silverlight 3 new features"
slug: "silverlight-3-whats-new-a-guide"
pubDate: 2009-03-18T11:08:20.000Z
lastModified: 2019-10-23T04:20:28.000Z
categories:
  - "silverlight"
  - "wpf"
  - "expression"
  - "blend"
  - "xaml"
  - "ria"
  - "toolkit"
  - "mix09"
draft: false
---

<p><img align="left" style="margin: 0px 10px 10px 0px; display: inline;" title="Silverlight 3" alt="Silverlight 3" src="http://storage.timheuer.com/timsl3mock.png" />Well, by now the interwebs are getting busy with the news about <a href="http://silverlight.net/"><strong>Silverlight</strong></a><strong> 3 </strong>details announced at <strong><a href="http://live.visitmix.com">MIX09</a></strong>.  The team has been hard at work (and still aren’t resting) pushing out this beta release.  Over the next week you’ll see lots of blog posts by team members and Silverlight MVPs who have been enthusiastically waiting to share what we’ve been working on and show you some sample applications they’ve been working on.  Quite frankly, so will I :-).</p>
<p>But in the meantime, allow me to share my thoughts and perhaps some deeper details with you if you can’t discern them in updated API documentation or marketing messages.  The high level feature updates and what they mean to the platform are great and can be found on the <a href="http://silverlight.net/getstarted/silverlight3/default.aspx">Silverlight 3 Beta information</a> section of the <a href="http://silverlight.net/">Silverlight community site</a>.  I’ll try to boil it down at the developer level here though to articulate some of the core changes and what I think are relevant for you to know.</p>
<p>UPDATE: 10 July 2009: Silverlight is released, <a href="http://timheuer.com/blog/archive/2009/07/10/silverlight-3-released-what-is-new-and-changed.aspx">check out the details!</a><br />
</p>
<h2>The Tools</h2>
<p>First, to be successful and have fun, you’ll need some tools.  Here’s where you can get them:</p>
<ul>
    <li><a href="http://go.microsoft.com/fwlink/?LinkID=143571">Silverlight 3 Tools for Visual Studio</a> </li>
    <li><a href="http://www.microsoft.com/expression/blendpreview">Expression Blend 3 Preview</a> </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkId=144609">.NET RIA Services</a> </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkId=144350">Silverlight 3 SDK CHM File</a> </li>
    <li>Updated <a href="http://codeplex.com/Silverlight">Silverlight Toolkit</a> </li>
</ul>
<p>Those would be my opinion of the bare minimum to fully evaluate Silverlight 3.  </p>
<blockquote>
<p>NOTE: The Silverlight Tools installer performs one first step that requires an internet connection to download the <em>developer</em> runtime to install.  If you are behind a proxy server or if it fails early it is likely because it cannot retrieve that runtime because of your network configuration.  In that case, download the runtime separately and extract the tools bits (silverlight3_tools.exe /x) and then copy the downloaded developer runtime (Silverlight.3.0_developer.exe) in that directory, then run SPInstaller.exe.  Yeah, not terribly intuitive, but it works.</p>
</blockquote>
<p>This should get you started on getting your environment up and running.  <strong>Before you install</strong> please know that once you do, your machine now becomes a Silverlight 3 dev machine.  You cannot down-level target to Silverlight 2.  If you still need to develop Silverlight 2 applications easily, ensure you are installing Silverlight 3 beta on a separate machine.  You’ve been warned :-).</p>
<h2>The Resources</h2>
<p>There will be a few places you can go to learn about things.  Here’s what I’d recommend:</p>
<ul>
    <li>this blog :-) -- you can <a href="http://feeds.timheuer.com/timheuer">subscribe</a> as well as <a href="http://twitter.com/timheuer">follow on Twitter</a> </li>
    <li><a href="http://silverlight.net/blogs/jesseliberty">Jesse Liberty</a> and <a href="http://blogs.msdn.com/webnext">Laurence Moroney</a> blogs, my partners in Silverlight </li>
    <li><a href="http://silverlight.net/forums/51.aspx">Silverlight 3 Beta</a> and <a href="http://silverlight.net/forums/53.aspx">.NET RIA Services</a> forums on the Silverlight community site </li>
    <li>View the <a href="http://silverlight.net/learn/labs.aspx">.NET RIA Services guide</a> </li>
    <li>View some initial <a href="http://silverlight.net/learn/videocat.aspx?cat=12#sl3">12 Silverlight 3 developer videos</a> with sample code with more to come </li>
</ul>
<p>These are some great starting points for resources.  As more samples and end-to-end applications come on board, I’ll be sure to point them out.</p>
<a name="top"></a>
<h2>What’s New in Silverlight 3</h2>
<p>Now on to the deeper dive stuff.  Saddle up, because this will be some long information in hopes to be as transparent as I can with the updates to the framework.  In each area I’ll be sure to point out if there are existing specific resources (labs, videos, etc.) for that specific feature.  This section represents where we are currently at with Silverlight 3.</p>
<table width="600" cellspacing="0" cellpadding="2" border="0">
    <tbody>
        <tr>
            <td width="300" valign="top">
            <ul>
                <li><a href="#tools">Tooling</a> </li>
                <li>Controls
                <ul>
                    <li><a href="#dataform">DataForm</a> </li>
                    <li><a href="#datapager">DataPager</a> </li>
                    <li><a href="#nav">Navigation</a> (SEO, deep linking) </li>
                    <li><a href="#toolkit">New Toolkit Controls</a> </li>
                </ul>
                </li>
                <li><a href="#media">Media</a> </li>
                <li><a href="#graphics">Graphics</a>
                <ul>
                    <li><a href="#3d">3D</a> </li>
                    <li><a href="#pixel">Pixel Effects</a> </li>
                    <li><a href="#easing">Animation Easing</a> </li>
                    <li><a href="#bitmap">Bitmap API</a> </li>
                    <li><a href="#gpu">GPU Acceleration</a> </li>
                    <li><a href="#textimage">Text/Image Improvements</a> </li>
                </ul>
                </li>
            </ul>
            </td>
            <td width="300" valign="top">
            <ul>
                <li><a href="#element">Element-to-Element Binding</a> </li>
                <li><a href="#local">LocalConnection API</a> </li>
                <li><a href="#bindingvalidation">Binding Validation UI</a> </li>
                <li><a href="#savefiledialog">SaveFileDialog</a> </li>
                <li><a href="#styling">Dynamic Styling and BasedOn</a> </li>
                <li><a href="#caret">CaretBrush</a> </li>
                <li><a href="#merged">Merged ResourceDictionary</a> </li>
                <li><a href="#asmcache">Assembly Caching</a> </li>
                <li><a href="#net">Network monitoring API</a> </li>
                <li><a href="#oob">Out-of-browser and Offline</a> </li>
                <li><a href="#ria">.NET RIA Services</a> </li>
                <li><a href="#binaryxml">Binary XML</a> </li>
                <li><a href="#slsvc">Web Service Utility</a> </li>
            </ul>
            </td>
        </tr>
    </tbody>
</table>
<p><a name="tools"></a><em><u>Tooling</u></em></p>
<p>Besides the updates in <a href="http://www.microsoft.com/expression/blendpreview">Expression Blend 3</a>, we’ve made improvements to the XAP compression within the Silverlight tools when creating XAP files.  We’ve seen our own application benchmarks but it is best to have you take a look at your own applications since content/resources vary across different applications.</p>
<p>The <a href="http://eclipse4sl.org/download/mac">Eclipse for Silverlight project also announced Mac platform availability</a> for Silverlight development (Silverlight 2).  That’s right.  <strong>Silverlight development on the Mac</strong>.</p>
<p><a href="#top">back to top</a></p>
<p><a name="tools"></a><em><u>Controls</u></em></p>
<p>A great number of controls were added, including fulfilling some promises from the <a href="http://codeplex.com/Silverlight">Silverlight Toolkit</a> on bringing <em>Mature</em> band controls into the runtime.  Those include:</p>
<table width="600" cellspacing="0" cellpadding="2" border="0">
    <tbody>
        <tr>
            <td width="300" valign="top">
            <ul>
                <li>DockPanel </li>
                <li>WrapPanel </li>
                <li>Label </li>
                <li>ViewBox </li>
                <li>AutoCompleteBox </li>
            </ul>
            </td>
            <td width="300" valign="top">
            <ul>
                <li>DataGrid </li>
                <li>TreeView </li>
                <li>Expander </li>
                <li>HeaderedItemsControl </li>
                <li>HeaderedContentControl </li>
            </ul>
            </td>
        </tr>
    </tbody>
</table>
<p>Additionally (and using some of these above as bases in some cases, new controls were added):</p>
<p><a name="dataform"></a><strong>DataForm </strong>– The DataForm serves as a flexible control for displaying data representing a single entity definition.  This control enables various methods for display, edit/update and navigation through data.  When combined with other controls, DataForm provides a simple method for attaching to data contexts and having a quick or highly customized UI for displaying entity data.</p>
<p>Video: <a href="http://silverlight.net/learn/learnvideo.aspx?video=187317">DataForm Reviewed</a></p>
<p><a href="#top">back to top</a></p>
<p><a name="datapager"></a><strong>DataPager </strong>– The DataPager serves as a simple control to provide next/previous and numeric paging capabilities for data sets which implement the IPagedViewCollection interface.  When combined with .NET RIA Services (which ObjectDataSource automatically implements this collection), DataPager provides a quick and efficient mechanism for paging data without having to bring entire data sets to the client and page though them there.</p>
<p><a href="#top">back to top</a></p>
<p><a name="nav"></a><strong>Navigation Framework </strong>– A new navigation framework is introduced and implements two controls: Frame and Page.  Using this framework you can partition your views into separate XAML files and navigate to each view as simple as you would previously a web page.  This framework also integrates with the browser’s history journal to provide back/forward capabilities.  </p>
<p>By enabling this framework you can implement <strong>deep linking support in your Silverlight </strong>application easily.  This will help also with enabling certain SEO enhancements for your Silverlight application.  Watch the video to see how you can implement this as well as implement custom routing for friendly URIs without exposing your XAML location definitions.</p>
<p>Video: <a href="http://silverlight.net/learn/learnvideo.aspx?video=187319">Navigation Framework</a></p>
<p><a href="#top">back to top</a></p>
<p><a name="toolkit"></a><strong>New Toolkit Controls</strong> – Several new controls were also introduced as a part of the Silverlight Toolkit.  Click on the links of those enabled here to view a video tutorial of the control.</p>
<ul>
    <li><a href="http://silverlight.net/learn/learnvideo.aspx?video=187310">DomainUpDown</a> </li>
    <li><a href="http://silverlight.net/learn/learnvideo.aspx?video=187314">TimePicker</a> </li>
    <li>Accordion </li>
    <li>ChildWindow (modal-type dialog scenarios) </li>
    <li>Charting improvements </li>
</ul>
<p>For more information on the Silverlight Toolkit, <a href="http://codeplex.com/Silverlight">visit their project page</a> and get the updates for both Silverlight 2 and Silverlight 3 Beta.</p>
<p><a href="#top">back to top</a></p>
<p><a name="media"></a><em><u>Media</u></em></p>
<p>Media has been a strong point in Silverlight since day 1, but we’ve added some features based on customer feedback including support for new media types like H.264 and AAC encoding.  Additionally we’ve added support for RAW audio/video pipeline support, which will enable developers to provide audio/video decoding outside the runtime and render in Silverlight – opening up some new areas for wide support for 3rd party codecs.</p>
<p><a href="#top">back to top</a></p>
<p><a name="graphics"></a><em><u>Graphics</u></em></p>
<p><a name="3d"></a><strong>Perspective 3D</strong> transform support was added to enable 3D scenarios and putting objects on a plane for various user experience scenarios.  It’s fairly simple and no different than how you already interact with transforms (and of course, Expression Blend makes this easier), by manipulating the PlaneProjection:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Button</span> <span style="color: rgb(255, 0, 0);">Height</span><span style="color: rgb(0, 0, 255);">="56"</span> <span style="color: rgb(255, 0, 0);">HorizontalAlignment</span><span style="color: rgb(0, 0, 255);">="Left"</span> <span style="color: rgb(255, 0, 0);">Margin</span><span style="color: rgb(0, 0, 255);">="66,73,0,0"</span> <span style="color: rgb(255, 0, 0);">VerticalAlignment</span><span style="color: rgb(0, 0, 255);">="Top"</span> <span style="color: rgb(255, 0, 0);">Width</span><span style="color: rgb(0, 0, 255);">="200"</span> <span style="color: rgb(255, 0, 0);">Content</span><span style="color: rgb(0, 0, 255);">="Button"</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Button.Projection</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">PlaneProjection</span> <span style="color: rgb(255, 0, 0);">RotationZ</span><span style="color: rgb(0, 0, 255);">="-53"</span> <span style="color: rgb(255, 0, 0);">RotationY</span><span style="color: rgb(0, 0, 255);">="56"</span> <span style="color: rgb(255, 0, 0);">RotationX</span><span style="color: rgb(0, 0, 255);">="20"</span><span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>     <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Button.Projection</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span> <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Button</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>This will enable various 3D scenarios (like CoverFlow type user interfaces, for example) and make for some type of transitions a lot easier (like front/back ‘flipping’ animations).</p>
<p>Video: <a href="http://silverlight.net/learn/learnvideo.aspx?video=187308">Perspective 3D in Silverlight</a></p>
<p><a href="#top">back to top</a></p>
<p><a name="pixel"></a><strong>Pixel Shader APIs </strong>were added to allow developers to create effects like blur and drop shadow effects (included) but also enable developers to create their own effects.  As an example of using the included Blur effect you could implement the effect on any UIElement (pictures and any UI XAML element).  The code below:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Button</span> <span style="color: rgb(255, 0, 0);">Content</span><span style="color: rgb(0, 0, 255);">="Tim Heuer"</span> <span style="color: rgb(255, 0, 0);">FontSize</span><span style="color: rgb(0, 0, 255);">="24"</span> <span style="color: rgb(255, 0, 0);">Width</span><span style="color: rgb(0, 0, 255);">="150"</span> <span style="color: rgb(255, 0, 0);">Height</span><span style="color: rgb(0, 0, 255);">="100"</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Button.Effect</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">BlurEffect</span> <span style="color: rgb(255, 0, 0);">Radius</span><span style="color: rgb(0, 0, 255);">="10"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>     <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Button.Effect</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span> <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Button</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>would result in the UI here:</p>
<p><img alt="" src="http://storage.timheuer.com/blureffect.png" /></p>
<p>Additionally as mentioned you can create your own effects.  Check out the video link for an example of how to use some existing DirectX type effect code and create your own Silverlight effects based on them.</p>
<p>Video: <a href="http://silverlight.net/learn/learnvideo.aspx?video=187303">Silverlight 3 Effects</a></p>
<p><a href="#top">back to top</a></p>
<p><a name="easing"></a><strong>Animation Easing effects </strong>are now a part of Silverlight providing you with a set of easing animations such as bounce, elastic effects, etc.  These interpolators will help with smoother animation transitions and other visual effects you are trying to accomplish.</p>
<p><a href="#top">back to top</a></p>
<p><a name="gpu"></a><strong>Cached Composition (GPU support) </strong>support enables leveraging the GPU for rendering which then frees up normal CPU processing for other things.  This will be a helpful API for having the ability to cache a visual tree for using for simple transforms or for offloading certain scenarios (media) to hardware versus having the software handle those tasks.</p>
<p><a href="#top">back to top</a></p>
<p>A <strong>new Bitmap API</strong> will enable developers to build applications that do more granular manipulation like a red-eye correction editor for photos being able to correct specific pixels writing them back to the bitmap.</p>
<p><a href="#top">back to top</a></p>
<p><a name="textimage"></a><strong>Text improvements </strong>including more efficient rendering and animation of text within an application.  Additionally, making use of the JavaScript API for local font support would accelerate application load time when local fonts can be used.  While not in the beta, <strong>we will be adding ClearType support for text rendering in the final version of Silverlight 3</strong>.</p>
<p><strong>Image Improvements</strong> including the decoding of image data before it is added to the visual tree and enabling control over the image cache.</p>
<p><a href="#top">back to top</a></p>
<p><em><u>UI Framework Enhancements</u></em></p>
<p><a name="element"></a><strong>Element-to-Element Binding</strong> is now available in Silverlight 3.  This enables your UI elements to have binding toward properties of each other.  For instance:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Grid</span> <span style="color: rgb(255, 0, 0);">x:Name</span><span style="color: rgb(0, 0, 255);">="LayoutRoot"</span> <span style="color: rgb(255, 0, 0);">Background</span><span style="color: rgb(0, 0, 255);">="White"</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">StackPanel</span> <span style="color: rgb(255, 0, 0);">Orientation</span><span style="color: rgb(0, 0, 255);">="Vertical"</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Slider</span> <span style="color: rgb(255, 0, 0);">x:Name</span><span style="color: rgb(0, 0, 255);">="myslider"</span> <span style="color: rgb(255, 0, 0);">Minimum</span><span style="color: rgb(0, 0, 255);">="0"</span> <span style="color: rgb(255, 0, 0);">Maximum</span><span style="color: rgb(0, 0, 255);">="100"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">TextBlock</span> <span style="color: rgb(255, 0, 0);">Text</span><span style="color: rgb(0, 0, 255);">="{Binding Value, ElementName=myslider}"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>     <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">StackPanel</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span> <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Grid</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Would enable the value of the TextBlock to automatically update based on the position of the Slider’s thumb that the user moves in the Slider.  This is accomplished through this UI update and no code is required.</p>
<p>Video: <a href="http://silverlight.net/learn/learnvideo.aspx?video=187309">Element-to-Element Binding</a></p>
<p><a href="#top">back to top</a></p>
<p><a name="styling"></a>Styling improvements including <strong>dynamic changes and BasedOn styling</strong>.  This first enables you to change a style at runtime or to also mark a control’s style to be based upon an existing style definition.  This is helpful in dynamic control scenarios as well as providing user customizable user interfaces without the developer having to manage the visual tree re-rendering as an intense task now.</p>
<p><a href="#top">back to top</a></p>
<p><a name="caret"></a>You now have the ability to style the <strong>CaretBrush</strong> for input controls.  This is helpful for high-contrast situations so that the Caret (cursor marker) is visible in contrast situations or however else you want to present the caret to the user.  You can do something as simple as:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">TextBox</span> <span style="color: rgb(255, 0, 0);">CaretBrush</span><span style="color: rgb(0, 0, 255);">="Blue"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>or as crazy as:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">TextBox</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">TextBox.CaretBrush</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">VideoBrush</span> <span style="color: rgb(255, 0, 0);">SourceName</span><span style="color: rgb(0, 0, 255);">="MyMovie"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>     <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">TextBox.CaretBrush</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span> <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">TextBox</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Why you’d want your input cursor to be a video, I have no idea (and hopefully you wouldn’t)…but just know that you can do that now :-).</p>
<p><a href="#top">back to top</a></p>
<p><a name="validation"></a>With a built-in mechanism now for <strong>binding validation</strong> (and UI templates for validation), your application in XAML will now honor your data source’s exception layer for data binding.  </p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">TextBox</span> <span style="color: rgb(255, 0, 0);">Text</span><span style="color: rgb(0, 0, 255);">="{Binding Text, Mode=TwoWay, ValidatesOnExceptions=true}"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>For example, if your data has a requirement for a field to have data and the user tries to perform an action without entering the required data, your application will show default validation UI which you can change/customize if you’d like.</p>
<p><a href="#top">back to top</a></p>
<p><a name="local"></a><u><em>LocalConnection API</em></u></p>
<p>The <strong>LocalConnection</strong> API enables the scenarios for Silverlight applications to communicate with each other through an asynchronous messaging system.  This is helpful in advertising scenarios as well as when you have islands of Silverlight functionality mixed with standard HTML content as well.  The LocalConnection APIs have a LocalMessageSender and LocalMessageReceiver that operate as sort of a pub-sub model.  Silverlight applications across domains can also communicate with each other given the sender/receivers enable that via the code (default is not global communication).</p>
<p>Video: <a href="http://silverlight.net/learn/learnvideo.aspx?video=187320">LocalConnection API in Action</a></p>
<p><a href="#top">back to top</a></p>
<p><em><u>Application Model Enhancements</u></em></p>
<p><a name="savefile"></a>The introduction of the complimentary API to OpenFileDialog, we now have the <strong>SaveFileDialog</strong>.  Guess what, it does exactly what you’d think it does by providing a mechanism to write content out to the client machine, prompting the user where to place that content via the standard OS-specific save dialog boxes.</p>
<p>Video: <a href="http://silverlight.net/learn/learnvideo.aspx?video=187316">SaveFileDialog API</a></p>
<p><a href="#top">back to top</a></p>
<p><a name="merged"></a><strong>Merged ResourceDictionary</strong> support is now available!  This enables you to manage ResourceDictionary files in separate files and simply reference them in your XAML like:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Grid</span> <span style="color: rgb(255, 0, 0);">x:Name</span><span style="color: rgb(0, 0, 255);">="LayoutRoot"</span> <span style="color: rgb(255, 0, 0);">Loaded</span><span style="color: rgb(0, 0, 255);">="LayoutRoot_Loaded"</span> <span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span>    <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Grid.Resources</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>        <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">ResourceDictionary</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>            <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">ResourceDictionary.MergedDictionaries</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>                <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">ResourceDictionary</span> <span style="color: rgb(255, 0, 0);">Source</span><span style="color: rgb(0, 0, 255);">="/myexternalresources.xaml"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span>            <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">ResourceDictionary.MergedDictionaries</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span>         <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">ResourceDictionary</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>     <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Grid.Resources</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum9">   9:</span> <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Grid</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Very helpful in managing external dictionary files and maintainability of an application.</p>
<p><a href="#top">back to top</a></p>
<p><a name="asmcache"></a><strong>Assembly caching </strong>enables extensions to Silverlight that are not a part of the core runtime, but can be managed by the runtime to be cached, thus saving your application from having to download extension assemblies each time the application loads.  For example a reference to System.Windows.Controls.Data at compile time will result in a smaller XAP and in the AppManifest.xaml having this notation:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Deployment.ExternalParts</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span>   <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">ExtensionPart</span> <span style="color: rgb(255, 0, 0);">Source</span><span style="color: rgb(0, 0, 255);">="http://go.microsoft.com/fwlink/?LinkID=XXXXXX"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span> <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Deployment.ExternalParts</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Which at runtime would result in your application loading and then the external parts being requested/downloaded and cached.  Each extension assembly that can have this enabled would be represented as a separate ExternalPart in the manifest.  This is not turned on by default and you can enable this in your Visual Studio project properties.</p>
<p><a href="#top">back to top</a></p>
<p><a name="net"></a>A new <strong>Network monitoring API </strong>is introduced to enable the scenarios of checking when the network status changes (i.e., connected/disconnected) as well as simple checking if the network is available.  To hook up to the NetworkChange event:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> NetworkChange.NetworkAddressChanged += <span style="color: rgb(0, 0, 255);">new</span> NetworkAddressChangedEventHandler(NetworkChange_NetworkAddressChanged);</pre>
<!--CRLF--></div>
</div>
<p>and to query if the network is available:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">bool</span> connected = NetworkInterface.GetIsNetworkAvailable();</pre>
<!--CRLF--></div>
</div>
<p>These are both helpful in the following scenario and biggest addition to the application model framework.</p>
<p><a href="#top">back to top</a></p>
<p><a name="oob"></a><strong>Out-of-browser Experiences </strong>have now come to Silverlight!  This is a highly requested featured and is enabled with <strong>no additional download/plugin</strong>.  Each and every Silverlight 3 application can be enabled to run as a desktop application (yes, cross-platform with Windows/Mac) by subscribing to a series of APIs and defining the application in the manifest.  By defining the application in the manifest like:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Deployment.ApplicationIdentity</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum2">   2:</span>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">ApplicationIdentity</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum3">   3:</span>             <span style="color: rgb(255, 0, 0);">ShortName</span><span style="color: rgb(0, 0, 255);">="MyTasks"</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum4">   4:</span>             <span style="color: rgb(255, 0, 0);">Title</span><span style="color: rgb(0, 0, 255);">="MyTasks -- Get-r-done"</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum5">   5:</span>             <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">ApplicationIdentity.Blurb</span><span style="color: rgb(0, 0, 255);">&gt;</span>A simple tasks list you can take with you on the go.<span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">ApplicationIdentity.Blurb</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum6">   6:</span>             <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">ApplicationIdentity.Icons</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum7">   7:</span>                 <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Icon</span> <span style="color: rgb(255, 0, 0);">Size</span><span style="color: rgb(0, 0, 255);">="16x16"</span><span style="color: rgb(0, 0, 255);">&gt;</span>AppIcons/task16.png<span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Icon</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum8">   8:</span>                 <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Icon</span> <span style="color: rgb(255, 0, 0);">Size</span><span style="color: rgb(0, 0, 255);">="32x32"</span><span style="color: rgb(0, 0, 255);">&gt;</span>AppIcons/task32.png<span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Icon</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum9">   9:</span>                 <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Icon</span> <span style="color: rgb(255, 0, 0);">Size</span><span style="color: rgb(0, 0, 255);">="48x48"</span><span style="color: rgb(0, 0, 255);">&gt;</span>AppIcons/task48.png<span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Icon</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum10">  10:</span>                 <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">Icon</span> <span style="color: rgb(255, 0, 0);">Size</span><span style="color: rgb(0, 0, 255);">="128x128"</span><span style="color: rgb(0, 0, 255);">&gt;</span>AppIcons/task128.png<span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Icon</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum11">  11:</span>             <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">ApplicationIdentity.Icons</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum12">  12:</span>         <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">ApplicationIdentity</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum13">  13:</span>     <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">Deployment.ApplicationIdentity</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>The application would now be enabled to be installed onto the desktop via a simple right-click context menu, or via an API like:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> Application.Current.Detach();</pre>
<!--CRLF--></div>
</div>
<p>This is a really great scenario and in combination with the network detection can enable occaisionally connected applications.  See the video for a demonstration on the fundamentals of this feature.</p>
<p>Video: <a href="http://silverlight.net/learn/learnvideo.aspx?video=187318">Out-of-browser Experiences</a></p>
<p><a href="#top">back to top</a></p>
<p><em><u>Application Frameworks</u></em></p>
<p><a name="riasvc"></a>Alongside Silverlight 3 Beta, the team is releasing .NET RIA Services.  .NET RIA Services simplifies the traditional n-tier application pattern by bringing together the ASP.NET and Silverlight platforms. The RIA Services provides a pattern to write application logic that runs on the mid-tier and controls access to data for queries, changes and custom operations. It also provides end-to-end support for common tasks such as data validation, authentication and roles by integrating with Silverlight components on the client and ASP.NET on the mid-tier.</p>
<p>One paragraph cannot do this framework justice, so be sure to download the .NET RIA Services bits and go through the walk-through lab that is included with the install.</p>
<p>View the Guide: <a href="http://silverlight.net/learn/labs.aspx">.NET RIA Services User Guide</a></p>
<p><a href="#top">back to top</a></p>
<p><em><u>Connected Systems Enhancements</u></em></p>
<p>Various improvements in ‘connected systems’ (web services, etc.) framework areas have been introduced to help faster and more secure scenarios for communication.</p>
<p><a name="binaryxml"></a><strong>Binary XML</strong> support is introduced which enables Silverlight to communicate with Windows Communication (WCF) services using the Binary XML data format in addition to regular text XML.  The use of the Binary XML format results in smaller message sizes and better performance in the messaging with the service.</p>
<p><a href="#top">back to top</a></p>
<p><a name="slsvc"></a>A command-line utility (slsvcutil.exe) is a part of the SDK tools to enable proxy code generation via command-line instead of just the <em>Add Service Reference</em> feature in the Visual Studio tools.  Using this feature is as simple as:</p>
<div style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;" id="codeSnippetWrapper">
<div style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;" id="codeSnippet">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span style="color: rgb(96, 96, 96);" id="lnum1">   1:</span> slsvcutil.exe http://myservice.com/myendpoint.svc?WSDL</pre>
<!--CRLF--></div>
</div>
<p>and can be as enhanced as emulating exactly the <em>Add Service Reference</em> feature for automated builds, etc.</p>
<p><a href="#top">back to top</a></p>
<p><em><u>Additional Improvements</u></em></p>
<p>Some other additional improvements in other areas include:</p>
<ul>
    <li>Better support for high contrast screen situations for colors/text by recognizing all the system colors </li>
    <li>Deep Zoom additional APIs and improvements on the use of multiple MultiScaleImages </li>
</ul>
<p>Over the next few weeks keep an eye on the Silverlight community site resources are for more video tutorials on these features and more.  </p>
<p>What do you think of some of what we’ve implemented in Silverlight 3?</p>
<div style="margin: 0px; padding: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:18586cbc-8c83-4fb4-a4fa-fedc6d2ac656" class="wlWriterEditableSmartContent"></div>

