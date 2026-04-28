---
title: "Using Silverlight Media Framework for simple playback"
slug: "extending-silverlight-media-framework"
pubDate: 2010-02-10T11:09:06.000Z
lastModified: 2019-10-23T04:20:33.000Z
categories:
  - "silverlight"
  - "xaml"
  - "codeplex"
  - "ria"
  - "open source"
  - "vertigo"
  - "smf"
  - "silverlight media framework"
  - "slvideoplayer"
draft: false
---

<p>If you aren’t aware of the<strong> </strong><a href="http://smf.codeplex.com"><strong>Silverlight Media Framework</strong></a>, you should take a look.  This is a media playback framework for Silverlight that is based off of a lot of best practices from such implementations as the NBC Olympics, Sunday Night Football and others.  </p>
<p><img src="http://i3.codeplex.com/Project/Download/FileDownload.aspx?ProjectName=smf&amp;DownloadId=93357" alt="Silverlight Media Framework screenshot" title="" style="margin: 0px auto; display: block; float: none;" /></p>
<p>It has a lot of features built-in to the framework such as:</p>
<ul>
    <li>Logging </li>
    <li>DVR-style features </li>
    <li>Fast forward </li>
    <li>Slow motion </li>
    <li>Media Markers </li>
    <li>etc </li>
</ul>
<p>Basic stuff plus some great included features and extensibility points.</p>
<h2>Missing Features – Part 1</h2>
<p>What I didn’t like in v1 was two things: it was only for Smooth Streaming and it was a framework versus just a XAP I could use in a web application.  After some successful complaining :-) and an opportunity to get into a milestone build, the progressive download feature was added which enabled non-Smooth Streaming people to use it.</p>
<p>I’m wanting to standardize on what our teams are providing for best practices, so I’ve started using this player.  </p>
<blockquote>
<p>NOTE: Does <a href="http://slvideoplayer.codeplex.com">SL Video Player</a> still live?  Yes, and it has VERY basic features.  It is super small and simple, but may not be for everyone’s liking.</p>
</blockquote>
<p>So I started to solve the other problem, primarily for my use, of having essentially a stand-alone player using this framework.  </p>
<h2>Extending the Silverlight Media Framework</h2>
<p>You see, the SMF itself is essentially a set of controls…but not an ‘app’ itself that you can just consume the binary.  What I did was basically create a new <a href="http://silverlight.net">Silverlight</a> application myself with one simple element: Player.  This way I could implement what I needed for my use.  The first thing I wanted was to have a simple XAP that I’d be able to load parameters in…very much like we did for SL Video Player on codeplex.  To make essentially the player have a flexible use model.  I could host the player anywhere and just feed it media to play.</p>
<p>I used the <a href="http://silverlight.net/learn/videos/all/using-startup-parameters-with-silverlight/">InitParams feature</a> of the Silverlight plugin model to enable me to pass in parameters to the application.  I wanted a simple parameter ‘media’ that basically was a URI to my media.  For most of my needs this would be a progressive download situation.  I added the simple feature using InitParams, and passed that URI to the MediaElement of the player framework.  All was well.</p>
<h2>Missing Features – Part 2</h2>
<p>I then realized two features that I love about the Expression Encoder templates: AutoLoad and ThumbnailImage.  These two features are pretty much essential for a bandwidth saving playback experience.  AutoLoad basically disables the media from starting to be fetched until the user clicks play.  The ThumbnailImage enables a static screenshot view to be displayed until a media frame could be captured.  These two features work well together.</p>
<p>The AutoLoad (cueing) was critical for me.  I didn’t want media to start downloading until the user said so.  This saves me bandwidth as well as doesn’t annoy the user if there is a ton of media on one page (which might not be a good UX to begin with, but I digress).</p>
<p>I saw an event <em>PlayControlClicked</em> in the framework that I felt I could tap into.  I figured I’d just wire up to that event and set the MediaElement.Source when the user clicked that.  FAIL.  The problem was that the play control in the current framework isn’t even enabled until the media source is set.  This defeated my whole purpose.</p>
<p>After some spelunking in the source – did I mention that SMF is Open Source? – I found the culprit functions.  Disabling them made everything work but it just didn’t feel right.  Luckily one of the developers of the framework, <a href="http://twitter.com/sundriedcoder">Kevin</a> from <a href="http://www.vertigo.com">Vertigo</a>, and I start chatting (virtually of course, after all nobody ‘talks’ anymore for real right?).  I told him of my findings and hacks and he educated me that I didn’t even need to mess with the source, but could accomplish my needs by subclassing the Player.  Kevin sent me some sample code for what he called a DeferredSource, which is what I wanted.</p>
<p>After some quick tests, I realized that I should keep all scenarios enabled:</p>
<ul>
    <li>Deferred loading (AutoLoad=false) </li>
    <li>Normal progressive playback (AutoLoad=true) </li>
    <li>Windows Streaming </li>
    <li>IIS Smooth Streaming </li>
</ul>
<p>I modified Kevin’s source a bit and got everything working.  Now I have 3 parameters: </p>
<ul>
    <li>media – the URI of the stream, IIS Smooth Streaming manifest, or media file for progressive download </li>
    <li>autoload – used really only for progressive download, would enable/disable cueing of the video upon load </li>
    <li>ss – to specify if the URI indicated in ‘media’ is an IIS Smooth Streaming implementation </li>
</ul>
<p>With this done I can now do something as simple as:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">&lt;</span><span class="html">object</span> <span class="attr">data</span><span class="kwrd">="data:application/x-silverlight-2,"</span> <span class="attr">type</span><span class="kwrd">="application/x-silverlight-2"</span> <span class="attr">width</span><span class="kwrd">="320"</span> <span class="attr">height</span><span class="kwrd">="240"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="source"</span> <span class="attr">value</span><span class="kwrd">="/ClientBin/SmfSimplePlayer.xap"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="background"</span> <span class="attr">value</span><span class="kwrd">="white"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="minRuntimeVersion"</span> <span class="attr">value</span><span class="kwrd">="3.0.40818.0"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="initParams"</span> <span class="attr">value</span><span class="kwrd">="media=URL_TO_YOUR_VIDEO"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="autoUpgrade"</span> <span class="attr">value</span><span class="kwrd">="true"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span>   <span class="kwrd">&lt;</span><span class="html">a</span> <span class="attr">href</span><span class="kwrd">="http://go.microsoft.com/fwlink/?LinkID=149156&amp;v=3.0.40818.0"</span> <span class="attr">style</span><span class="kwrd">="text-decoration:none"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum8">   8:</span>           <span class="kwrd">&lt;</span><span class="html">img</span> <span class="attr">src</span><span class="kwrd">="http://go.microsoft.com/fwlink/?LinkId=161376"</span> <span class="attr">alt</span><span class="kwrd">="Get Microsoft Silverlight"</span> <span class="attr">style</span><span class="kwrd">="border-style:none"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum9">   9:</span>   <span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum10">  10:</span> <span class="kwrd">&lt;/</span><span class="html">object</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Boom, done.  Now I had a player based on SMF that served my needs.</p>
<h2>Wishlist</h2>
<p>I still didn’t implement the ThumbnailImage in my player.  This is a wishlist item for me…it isn’t critical but nice for when AutoLoad=false so it isn’t just a blank screen!  Additionally, the one thing I have to admit I’m not wild about is the overall size.  The compiled XAP is 230K.  In contrast my SL Video Player is 16K.  Why the big size?  Well, the SMF <em>today</em> is intended for someone who really wants to implement all the features it provides, including Smooth Streaming.  If you aren’t using Smooth Streaming, then you still have those dependencies with you…not ideal.</p>
<p>In talking with the dev team and framework team, I know their plans for updated milestones of SMF and am pleased with the roadmap.  They have taken a lot of feedback of how mainstream uses might be implemented and will make it continue to be awesome with a bit more flexibility of taking what you need!</p>
<h2>Summary</h2>
<p>If you need a solid, basic player take a look at <a href="http://smf.codeplex.com">SMF</a>.  There are other players out there of course, but this one is based on proven best practices in the toughest situations.  And it is only getting better.  There is a lot of room for improvement for the ‘YouTube’ style simplicity of playback for medium-low quality video playback for your personal sites showing home movies, etc. – and I know that scenario will improve, because I’m pushing for it as well.</p>
<p>If you want to use what I’ve done here, feel free – here are the files:</p>
<ul>
    <li><a href="http://video.timheuer.com/players/smf1-sl4/SmfSimplePlayer.xap">Compiled XAP (Updated 29-APR-2010 for SL4 for full-screen pinning)</a> </li>
    <li><a href="http://storage.timheuer.com/SmfSimplePlayer-source.zip">Source code for my modified stand-alone player</a> – note that you will need the SMF and the dependencies for that before this will compile.  This source contains only my modifications </li>
</ul>
<p>There are also a <a href="http://www.silverlight.net/learn/videos/silverlight-media-framework/">bunch of videos for working with the Silverlight Media Framework</a> beyond the basics.  Be sure to check them out!</p>
<p>Hope this helps!</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:2b4c0eb7-ab07-41e3-b37c-882a2a8af3d2" style="margin: 0px; padding: 0px; display: inline; float: none;"></div>
<br />
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
