---
title: "Silverlight 5 Beta&ndash;A guide to the new features"
slug: "whats-new-in-silverlight-5-a-guide"
pubDate: 2011-04-13T10:09:22.000Z
lastModified: 2019-10-23T04:20:38.000Z
categories:
  - "silverlight"
  - "silverlight 5"
  - "sl5"
  - "mix11"
draft: false
---

<p><img title="Silverlight Logo" align="left" style="margin: 0px 10px 0px 0px; float: left; display: inline;" alt="Silverlight Logo" src="http://storage2.timheuer.com/sl5bloglogo.png" />At the MIX11 conference <strong><a href="http://weblogs.asp.net/scottgu">Scott Guthrie</a></strong> announced the availability of <a href="http://silverlight.net"><strong><font size="4">Silverlight</font></strong></a><strong> 5 Beta</strong>.  I suppose this doesn’t come at a surprise to most as this is now a regular annual occurrence.  In fact it is almost exactly a year ago when Silverlight 4 was released.</p>
<p>The team has been working very hard to deliver on the features we discussed at the <a href="http://www.silverlight.net/news/events/firestarter/">Silverlight Firestarter</a> event last December 2010.  That was a flurry of revealing that happened in December showing the world what the Silverlight team has been working on.  There was no rest for them of course and they continued to complete this initial version of Silverlight 5 to release at MIX11.  </p>
<p>As always with Silverlight betas, this is a developer release.  This means that this is a preview for software developers to understand and appreciate (and give feedback) the new features provided.  There is no “end-user” runtime available for the release nor a “go-live” license for you to develop applications into production.  </p>
<p>So enough with the pleasantries…</p>
<h2>Download Silverlight 5 and Tools</h2>
<p>To get started with the Silverlight 5 beta you are going to need some tools.  Here’s the link dump (be patient as some link caches get updated):</p>
<ul>
    <li><a href="http://go.microsoft.com/fwlink/?LinkID=186892">Visual Studio 2010 SP1</a> or <a href="http://www.microsoft.com/express/Web/">Visual Web Developer Express 2010 SP1</a> (yes, SP1 is required and if you don’t have it you’ll have to install it and can <a href="http://go.microsoft.com/fwlink/?LinkId=209902">get it from here</a>.) </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkID=214309">Silverlight 5 Tools for Visual Studio</a> </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkID=215203">Expression Blend Preview for Silverlight 5</a> </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkId=214345">Silverlight 5 SDK CHM</a> </li>
    <li>Developer runtimes: <a href="http://silverlight.dlservice.microsoft.com/download/5/8/8/58897679-D9BC-4F58-BFC4-E999C9E32DD1/runtime/Silverlight_Developer.exe">Windows</a> and <a href="http://silverlight.dlservice.microsoft.com/download/5/8/8/58897679-D9BC-4F58-BFC4-E999C9E32DD1/runtime/Silverlight_Developer.dmg">Mac</a> platforms – not needed if you install the tools above but some like to know where they can get these just for test/debug </li>
    <li><a href="http://silverlight.dlservice.microsoft.com/download/3/3/E/33EE735F-B82B-42AF-A62B-3ABF0F47D142/silverlight_sdk.exe">Silverlight 5 SDK only</a> – not needed if you install the tools above </li>
    <li><a href="http://go.microsoft.com/fwlink/?LinkId=214346">Breaking changes doc</a> </li>
</ul>
<p>These are the full set of tools to help you evaluate <strong>Silverlight 5.</strong>  At a bare minimum for a developer you’ll need/want the Visual Studio 2010 and the Silverlight 5 Tools for VS.</p>
<blockquote>
<p><strong>NOTE:</strong> In case you are like me and don’t like to read the finer details you may have missed the note that you don’t need to install the developer runtime/SDK separately if you are installing the Silverlight 5 Tools.  Again, <em>it is not necessary to install the SDK and developer runtimes *again* if you have already installed the Silverlight 5 Tools for Visual Studio</em>.  The links to the developer runtimes are provided for convenience as some use these to put on test machines without developer tools to test things out and debug.</p>
</blockquote>
<p>Go ahead and start downloading the tools now…here’s some information on the release for you as you download!</p>
<h2>Silverlight 5 Resources</h2>
<p>There are a few places you can go to get more information and quick learning on Silverlight 5:</p>
<ul>
    <li>hey this blog :-) -- you can <a href="http://feeds.timheuer.com/timheuer">subscribe to my feed</a> as well as follow me on <a href="http://twitter.com/timheuer">Twitter</a> for some casual updates/sharing </li>
    <li><a href="http://www.johnpapa.net">John Papa</a> and <a href="http://10rem.net">Pete Brown</a> blogs </li>
    <li>View some <a href="http://silverlight.net/getstarted/silverlight-5/">initial Silverlight 5 learning videos</a> with sample code </li>
</ul>
<p>You should also subscribe/bookmark those links as they’ll likely to be continually updated with good nuggets of information!</p>
<h2><a name="top"></a>What’s new in Silverlight 5 – feature review</h2>
<p>Here’s more of the details on what is new in this release.  This shouldn’t come of any surprise if you watched the Silverlight Firestarter event and saw all the new stuff.  This is a little long in description here, but hopefully for your benefit.</p>
<table width="629" border="0" cellspacing="0" cellpadding="2">
    <tbody>
        <tr>
            <td width="316" valign="top">
            <ul>
                <li><a href="#tooling">Tooling</a> </li>
                <li><a href="#media">Media</a> </li>
                <li><a href="#text">Text</a> </li>
                <li><a href="#databinding">Data binding</a> </li>
                <li><a href="#controls">Controls</a> </li>
            </ul>
            </td>
            <td width="311" valign="top">
            <ul>
                <li><a href="#3d">3D Graphics</a>  </li>
                <li><a href="#trustinbrowser">Trusted Applications in Browser</a> </li>
                <li><a href="#trusted">Trusted Applications</a> </li>
                <li><a href="#general">General “stuff”</a> </li>
            </ul>
            </td>
        </tr>
    </tbody>
</table>
<p><u><em><a name="tooling"></a>Tooling</em></u></p>
<p>How could we have a release without improved tools?  Visual Studio 2010 has proved to me to be a great platform (have you seen the Extension Manager and how you can grab all the great things online?  <a href="http://visualstudiogallery.msdn.microsoft.com/d491911d-97f3-4cf6-87b0-6a2882120acf">VSCommands</a> is my favorite) for productive development on the Microsoft platforms.</p>
<p>You would expect to have the Silverlight 5 support in the tools and it is in there, all what you want.  The cool thing is that adding the tools on your existing SP1 installation gives you ultimate Silverlight multi-targeting support:</p>
<p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Silverlight Multi-targeting" src="http://storage2.timheuer.com/sl5multitarget2.png" /></p>
<p>In addition to the basics and supporting the new features, we’ve added one of my favorite tooling features that folks have been asking for: XAML debugging.  Now right now it is for Binding expressions only, but let’s be honest, that’s what you care most about right!  So what does this feature mean?  Well you can set a breakpoint in your editor on XAML lines that have the <em>{Binding}</em> syntax in them:</p>
<p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="XAML Breakpoint Editor" src="http://storage2.timheuer.com/xamlbreakpoint1.png" /></p>
<p>When that binding is evaluated you’ll get information about the binding evaluation:</p>
<p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="XAML Breakpoint Watch Window" src="http://storage2.timheuer.com/xamlbreakpoint2.png" /></p>
<p>Pretty helpful huh?  We hope so.  For now it is supported for Binding only.</p>
<p>Video: <a href="http://www.silverlight.net/learn/videos/all/silverlight-5-beta-debugging-binding">Pete Brown demonstrates XAML debugging</a></p>
<p><em><u><a name="media"></a>Media</u></em></p>
<p>A few things improved on the media front based on some feedback from our customers.  First, when having the need for low-latency sound (for things like audio loops, etc.) the MediaElement wasn’t doing the trick.  There were a few hacks you could do, but overall not ideal.  So remember how we did some fun things on the phone that allowed you to use XNA?  Well, now we have SoundEffect for Silverlight 5 as well.  This should look familiar if you are a Windows Phone developer:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">using</span> Microsoft.Xna.Framework.Audio;</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span> <span class="rem">// theStream is some audio stream you've retrieved</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span> <span class="rem">// from a source</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span> SoundEffect se = SoundEffect.FromStream(theStream.Stream);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span> se.Play();</pre>
<!--CRLF--></div>
</div>
<p>Hopefully this will be a welcome addition for those working with audio.  You can also control the volume, pitch, etc. in the SoundEffect class.</p>
<p>Video: <a href="http://www.silverlight.net/learn/videos/all/silverlight-5-low-latency-sound-effects">Pete Brown demonstrates low-latency sound</a></p>
<p>We also introduced a new feature that some affectionately call the “training video” feature.  Technically it’s called <em>TrickPlay</em> or variable speed playback.  This allows you to set a playback speed/rate on your MediaElement from 0.5-2 (where 1 is the normal playback of your media).  The idea is that you’d get media playback at your chosen speed but also proper audio pitch correction.  The code couldn’t be simpler:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">protected</span> <span class="kwrd">void</span> SpeedUpTrainingButtonClicked(<span class="kwrd">object</span> sender, RoutedEventArgs args)</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     trainingVideoMediaElement.PlaybackRate = 1.8;</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span> }</pre>
<!--CRLF--></div>
</div>
<p>For the beta, the audio pitch correction isn’t yet available so when setting the PlaybackRate you’ll only see the video effect right now.</p>
<p>We have also enabled hardware decode for H.264 playback in this release!</p>
<p><a href="#top">^ back to top</a></p>
<p><em><u><a name="text"></a>Text</u></em></p>
<p>We’ve made a few improvements to the Text stack.  We’re introducing a <em>RichTextBoxOverflow</em> element that will allow you to have linked text containers where the text flows to another element.  This will help with automatically laying out text in situations like mulit-column.  Here’s a snippet of what it might look like using element binding:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Width</span><span class="kwrd">="200"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>     <span class="kwrd">&lt;</span><span class="html">RichTextBox</span> <span class="attr">Width</span><span class="kwrd">="50"</span> <span class="attr">Height</span><span class="kwrd">="50"</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>         <span class="attr">OverflowContentTarget</span><span class="kwrd">="{Binding ElementName=OverflowArea}"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>         <span class="kwrd">&lt;</span><span class="html">Paragraph</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>             This is some really long text that won't fit right into the main RTB control and should overflow into the area that I've defined in my XAML to be the other section.</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span>         <span class="kwrd">&lt;/</span><span class="html">Paragraph</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span>     <span class="kwrd">&lt;/</span><span class="html">RichTextBox</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum8">   8:</span>     <span class="kwrd">&lt;</span><span class="html">RichTextBoxOverflow</span> <span class="attr">x:Name</span><span class="kwrd">="OverflowArea"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum9">   9:</span> <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>This would render:</p>
<p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Linked Text Container" src="http://storage2.timheuer.com/overflowtext.png" /></p>
<p>For the typography-philes in the Silverlight world, we’re adding tracking and leading support.  If those terms are foreign to you, you are not alone!  They basically provide more control over character spacing when text is rendered.  Example:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">&lt;</span><span class="html">RichTextBox</span> <span class="attr">FontSize</span><span class="kwrd">="12"</span> <span class="attr">CharacterSpacing</span><span class="kwrd">="300"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Would look like:</p>
<p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Text Tracking and Leading" src="http://storage2.timheuer.com/trackingtext.png" /></p>
<p>A few things that we’re working on that aren’t in in the beta right now but we’re working on are improving text clarity using pixel-snapping and enhanced OpenType support.  Some of these were demonstrated at MIX so be sure to watch the keynote and session videos!</p>
<p>Video: <a href="http://www.silverlight.net/learn/videos/all/silverlight-5-multi-column-linked-text">Pete Brown demonstrates text in Silverlight 5</a></p>
<p><a href="#top">^ back to top</a></p>
<p><em><u><a name="databinding"></a>Data Binding</u></em></p>
<p>There are a few features that I categorize in this area of data binding.  They may all not directly be related, but I mentally put them in this category.  First we now support Implicit DataTemplates.  What this means is that you can specify a DataTemplate for a specific type in your binding.  Let’s use a simple example.  Let’s say I have an object Person which has FirstName, LastName, Title.  I now have another object called Manager, which inherits from Person and Employee which also inherits from Person.  If I was binding to a list box and wanted to list these people I could do something like this:</p>
<p>Class Code:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">void</span> MainPage_Loaded(<span class="kwrd">object</span> sender, RoutedEventArgs e)</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     List&lt;Person&gt; people = <span class="kwrd">new</span> List&lt;Person&gt;();</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>     people.Add(<span class="kwrd">new</span> Manager() { FirstName = <span class="str">"Scott"</span>, LastName = <span class="str">"Guthrie"</span>, Title = <span class="str">"VP"</span> });</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span>     people.Add(<span class="kwrd">new</span> Employee() { FirstName = <span class="str">"Tim"</span>, LastName = <span class="str">"Heuer"</span>, Title = <span class="str">"Minion"</span> });</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span>     people.Add(<span class="kwrd">new</span> Manager() { FirstName = <span class="str">"Steve"</span>, LastName = <span class="str">"Ballmer"</span>, Title = <span class="str">"CEO"</span> });</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum8">   8:</span>     people.Add(<span class="kwrd">new</span> Employee() { FirstName = <span class="str">"Scott"</span>, LastName = <span class="str">"Hanselman"</span>, Title = <span class="str">"Open Source Fanatic"</span> });</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum9">   9:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum10">  10:</span>     PeopleList.ItemsSource = people;</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum11">  11:</span> }</pre>
<!--CRLF--></div>
</div>
<p>XAML:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">&lt;</span><span class="html">ListBox</span> <span class="attr">x:Name</span><span class="kwrd">="PeopleList"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>     <span class="kwrd">&lt;</span><span class="html">ListBox.Resources</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>         <span class="kwrd">&lt;</span><span class="html">DataTemplate</span> <span class="attr">DataType</span><span class="kwrd">="local:Manager"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>             <span class="kwrd">&lt;</span><span class="html">Border</span> <span class="attr">Background</span><span class="kwrd">="LightBlue"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>                 <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Orientation</span><span class="kwrd">="Horizontal"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span>                     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="{Binding FirstName}"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span>                     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="{Binding LastName}"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum8">   8:</span>                 <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum9">   9:</span>             <span class="kwrd">&lt;/</span><span class="html">Border</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum10">  10:</span>         <span class="kwrd">&lt;/</span><span class="html">DataTemplate</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum11">  11:</span>         <span class="kwrd">&lt;</span><span class="html">DataTemplate</span> <span class="attr">DataType</span><span class="kwrd">="local:Employee"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum12">  12:</span>             <span class="kwrd">&lt;</span><span class="html">Border</span> <span class="attr">Background</span><span class="kwrd">="Bisque"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum13">  13:</span>                 <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Orientation</span><span class="kwrd">="Horizontal"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum14">  14:</span>                     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="{Binding FirstName}"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum15">  15:</span>                     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="{Binding LastName}"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum16">  16:</span>                 <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum17">  17:</span>             <span class="kwrd">&lt;/</span><span class="html">Border</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum18">  18:</span>         <span class="kwrd">&lt;/</span><span class="html">DataTemplate</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum19">  19:</span>     <span class="kwrd">&lt;/</span><span class="html">ListBox.Resources</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum20">  20:</span> <span class="kwrd">&lt;/</span><span class="html">ListBox</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>which would render:</p>
<p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Implicit DataType Binding" src="http://storage2.timheuer.com/implicitbinding.png" /></p>
<p>This flexibility allows me to use binding on same shaped objects, but provide unique characteristics in my template where appropriate.</p>
<p>Video: <a href="http://www.silverlight.net/learn/videos/all/implicit-data-templates-in-silverlight-5-beta">Pete Brown demonstrates Implicit DataTemplates</a></p>
<p>Ancestor RelativeSource binding is also now supported which allows a DataTemplate to bind to a property of the element that contains it, like:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">&lt;</span><span class="html">UserControl</span> <span class="attr">x:Class</span>=”<span class="attr">MyApplication1</span>.<span class="attr">UserControl1</span>”</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>             <span class="attr">xmlns</span>=”<span class="attr">http:</span>//<span class="attr">schemas</span>.<span class="attr">microsoft</span>.<span class="attr">com</span>/<span class="attr">winfx</span>/<span class="attr">2006</span>/<span class="attr">xaml</span>/<span class="attr">presentation</span>”</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>             <span class="attr">xmlns:x</span>=”<span class="attr">http:</span>//<span class="attr">schemas</span>.<span class="attr">microsoft</span>.<span class="attr">com</span>/<span class="attr">winfx</span>/<span class="attr">2006</span>/<span class="attr">xaml</span>”<span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>     <span class="kwrd">&lt;</span><span class="html">ContentControl</span> <span class="attr">Tag</span>=”<span class="attr">SomeValue</span>”<span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>         <span class="kwrd">&lt;</span><span class="html">HeaderdContentControl</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span>             <span class="kwrd">&lt;</span><span class="html">HeaderedContentControl.Header</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span>                 <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span>=”{<span class="attr">Binding</span> <span class="attr">Tag</span>, <span class="attr">RelativeSource</span>=</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum8">   8:</span> {<span class="attr">RelativeSource</span>,<span class="attr">AncestorType</span>=<span class="attr">ContentControl</span>, <span class="attr">AncestorLevel</span>=<span class="attr">2</span>}}” <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum9">   9:</span>             <span class="kwrd">&lt;/</span><span class="html">HeaderedContentControl.Header</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum10">  10:</span>             <span class="kwrd">&lt;</span><span class="html">Button</span><span class="kwrd">&gt;</span>Click Me!<span class="kwrd">&lt;/</span><span class="html">Button</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum11">  11:</span>         <span class="kwrd">&lt;/</span><span class="html">HeaderdContentControl</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum12">  12:</span>     <span class="kwrd">&lt;/</span><span class="html">ContentControl</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum13">  13:</span> <span class="kwrd">&lt;/</span><span class="html">UserControl</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>This has been a highly requested feature as well!</p>
<p>How about some custom MarkupExtensions?  Yes, that’s available now as well!  This will help with those who follow the MVVM pattern of development as well as those who have been yearning to be able to have their own expressions run on markup.  I’ve also thought people could use this to scaffold localization efforts as well around a MarkupExtension.  Maybe something like:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="{local:ResourceLookup Path=MyResourceKey}"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>I think this will be a useful feature.  Of course you are required to actually write code for your extension!</p>
<p>Also in the beta is the ability to perform binding in Style setters.  These are some great improvements to our markup/binding story and features which you have been asking for so I can’t wait to see how they are used!</p>
<p><a href="#top">^ back to top</a></p>
<p><em><u><a name="controls"></a>Controls</u></em></p>
<p>This is another general category I am including some features which are available in Silverlight 5.</p>
<p>First is what we call ClickCount.  This will help with basically doing the double-click tracking on elements in your application:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> CheckClick(<span class="kwrd">object</span> sender, MouseButtonEventArgs e)</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     <span class="kwrd">if</span> (e.ClickCount == 2)</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>     {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>         <span class="rem">// double-click happened</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span>     }</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span> }</pre>
<!--CRLF--></div>
</div>
<p>Video: <a href="http://www.silverlight.net/learn/videos/all/silverlight-5-mouse-button-double-and-multi-click">Pete Brown demonstrates ClickCount usage</a></p>
<p>Next is multiple-window support.  This is the same Window element that the MainWindow shares and you are able to create numerous Windows that your application can interact with and show as separate windows in the OS.  This is not a ChildWindow implementation where they are all within the main object.  This feature is available to out-of-browser applications.  Once the main application is closed, all the Windows created from that will close as well.</p>
<p>Video: <a href="http://www.silverlight.net/learn/videos/all/silverlight-5-native-operating-system">Pete Brown demonstrates multiple Windows</a></p>
<p><a href="#top">^ back to top</a></p>
<p><em><u><a name="3d"></a>3D Graphics API</u></em></p>
<p>One of the coolest demos at the Silverlight Firestarter was the 3D demonstrations.  I don’t even claim to be close to a novice on 3D graphics, but I can’t wait to see what people do with the 3D APIs.  I would keep a watch on <a href="http://kodierer.blogspot.com/">Rene Schulte</a> as I’m positive he’ll have some cool stuff come out!  It’s hard to show a short snippet of 3D but here’s some effects you’ll be able to do:</p>
<p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Silverlight 3D Example" src="http://storage2.timheuer.com/3dhouse2.png" /></p>
<p>Be sure to watch out for more examples here to understand the capabilities.</p>
<p>Check out <a href="http://kodierer.blogspot.com/">Rene Schulte</a> and <a href="http://www.andybeaulieu.com/Home/tabid/67/EntryID/216/Default.aspx">Andy Beaulieu</a> for some good examples.  Here are some teasers:</p>
<ul>
    <li><a href="http://www.youtube.com/watch?v=VGzwJ9NnHKk&amp;feature=player_embedded">Simple 3D Test game</a> </li>
    <li><a href="http://3dphysics.codeplex.com/">Silverlight 5 3D Physics</a> </li>
    <li><a href="http://vimeo.com/22168601">Silverlight 5 3D with Silverlight Augmented Reality Toolkit</a> </li>
</ul>
<p><a href="#top">^ back to top</a></p>
<p><em><u><a name="trustinbrowser"></a>Trusted Applications in Browser</u></em></p>
<p>A new feature we are bringing is the ability to do some of the “trusted” features in Silverlight <em>in the browser</em>.  This brings the current functionality of trusted applications in current form to be used in the browser context without having to be installed.  This still requires the XAP to have the ElevatedPermissions security setting in the manifest as it would exist with out-of-browser applications as well as the XAP being signed (and the certificate in the user’s trusted publisher store).</p>
<p>Additionally the requirement would be that a registry key be set on the machine to enable this.  This could be deployed via Group Policy or other desktop-management techniques.  Once these are in place, the application can take advantage of the elevated permissions feature set introduced in Silverlight 4, including things like full keyboard access in full-screen mode.</p>
<p><a href="#top">^ back to top</a></p>
<p><em><u><a name="trusted"></a>Trusted Applications Out-of-browser Enhancements</u></em></p>
<p>In addition to the new multiple Window support, trusted out-of-browser applications can now access the broader file system outside of the user’s “My Documents” type areas on the disk.  We hope this provides greater flexibility in the most trusted application area.</p>
<p><a href="#top">^ back to top</a></p>
<p><em><u><a name="general"></a>General “stuff”</u></em></p>
<p>In addition to the features noted above, here’s some things that are also included that I chose not to put in one of these categories and are implemented in the Silverlight 5 beta:</p>
<ul>
    <li>Startup performance improvements on multi-core systems (multi-core JIT) </li>
    <li>ComboBox with type-ahead searching </li>
    <li>DefaultFileName in SaveFileDialog!!! </li>
    <li>Improvements in the graphics stack brought over from the Windows Phone codebase </li>
    <li>Hardware acceleration in Windowless mode in Internet Explorer 9 </li>
</ul>
<p>You may be realizing there was a lot more shown at MIX keynote and will be discussed.  You’d be right.  There are a number of things we are still refining that aren’t in the current beta such as:</p>
<ul>
    <li>Vector printing </li>
    <li>Power awareness for things like full-screen apps (i.e., don’t put me to sleep if I’m watching an awesome movie) </li>
    <li>Remote control support allowing users to control media playback </li>
    <li>OpenType support as previously mentioned </li>
    <li>Text clarity improvements with pixel snapping as previously mentioned </li>
    <li>A new DataContextChanged event </li>
    <li>WS-Trust support for services </li>
    <li>64-bit support for the plugin </li>
    <li>COM interop for trusted in-browser applications </li>
    <li>P/Invoke for trusted applications </li>
    <li>PivotViewer control improvements and distributed in the SDK </li>
</ul>
<p>As you can see we’re still going to be busy and hope that you like what you see so far!</p>
<p><a href="#top">^ back to top</a></p>
<h2>Summary and Feedback</h2>
<p>Now you have some new toys to play with.  If you’ve read all this post then your tools should have been done downloading now, so go install them, watch some of Pete’s videos linked here and learn about the new features.  If you find issues please be sure to report the feedback (it is better to report bugs/issues via the official channels than as a comment here).  Also be sure to read the <a href="http://go.microsoft.com/fwlink/?LinkId=214346">changes document</a> to get an idea of how any changes may affect your applications.</p>
<p>Congratulations to the Silverlight 5 team (be sure to say hello to them at MIX if you are there) and we hope you like what you see and the direction we’re going to enable features you’ve been asking for in the platform.</p>
<p>Hope this helps! </p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:7f1576a9-e72a-490d-94d7-4fdc048bca99" style="margin: 0px; padding: 0px; float: none; display: inline;"></div>

