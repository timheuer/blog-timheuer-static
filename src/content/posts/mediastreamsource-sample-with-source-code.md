---
title: "MediaStreamSource sample for Silverlight"
slug: "mediastreamsource-sample-with-source-code"
pubDate: 2008-10-01T10:29:58.000Z
lastModified: 2019-10-23T04:20:23.000Z
categories:
  - "silverlight"
  - "xaml"
  - "mp3"
  - "media"
  - "mediaelement"
  - "mediastreamsource"
  - "managedmediahelpers"
  - "adaptive streaming"
  - "mbr"
  - "shoutcast"
draft: false
---

<p>You may be reading the title and wondering <em>what is MediaStreamSource</em>?  <strong><a href="http://msdn.microsoft.com/en-us/library/system.windows.media.mediastreamsource(VS.95).aspx">MediaStreamSource</a></strong> is a piece of the <strong><a href="http://silverlight.net">Silverlight</a> </strong>runtime that removes a the influence of a media file's container, giving developers direct access to APIs for manipulating encoded elementary audio and video streams.</p>  <p>Huh?</p>  <p>Basically it can enable you as the developer to implement file parsers/etc. in managed code instead of Silverlight, enabling support beyond the native built-in formats for media.  There hasn’t been much information about these types of topics, and I’d agree that for the mainstream, they may be a bit more advanced media scenarios for when the default containers and formats aren’t enough for your use.  Outside of the MSDN documentation there hasn’t really been any good samples of this use either.</p>  <p>Until now.</p>  <p>One of the program managers on the Silverlight media team, <strong><a href="http://www.letstakeovertheworld.com/blog/">Larry Olson</a></strong>, has just provided a detailed public sample of the MediaStreamSource in action on the MSDN Code Gallery site.  He calls the effort <strong><a href="http://code.msdn.microsoft.com/ManagedMediaHelpers">ManagedMediaHelpers</a></strong>.  The project contains:</p>  <ul>   <ul>     <li>Silverlight class library (MediaParsers) which has helper classes for working with MP3 files, including being able to find the right point in an MP3 to begin playback.</li>      <li>Silverlight test project for NUnit</li>      <li>Silverlight class library (Mp3MediaStreamSource) which has logic for using MP3 file streams</li>      <li>Silverlight Application Demo which shows the <strong>interaction between a MediaElement and a MediaStreamSource</strong></li>   </ul> </ul>  <p>Why would you want this?  Larry outlines in the project:</p>  <blockquote>   <p><em>“For one thing, having access to elementary streams means that developers can now implement scenarios that other solutions haven't necessarily provided thus far. One example of this is adaptive streaming or multi-bitrate support as was seen during the 2008 Olympics. </em></p>    <p><em>For another reason, having access to elementary streams allows developers to implement scenarios that the Silverlight runtime hasn't had a chance to implement yet or that the runtime might not be able to implement in the same timeframe that a developer wants it. Examples of this could be, RTSP:T protocol support, SHOUTcast protocol support, seamless audio looping, ID3 v1 and ID3 v2 metadata support, and many other scenarios.”</em></p> </blockquote>  <p>This is a great sample <strong>and source</strong> for those working with media within Silverlight.  Right now it is audio only, MP3 support, but gives you an idea of the MediaStreamSource API and functionality you could implement.</p>  <div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:18a8703a-059a-40e8-950f-7e03db19aaad" class="wlWriterEditableSmartContent"></div>
