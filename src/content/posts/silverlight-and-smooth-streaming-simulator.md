---
title: "Silverlight Smooth Streaming: UX Simulator"
slug: "silverlight-and-smooth-streaming-simulator"
pubDate: 2009-03-17T23:58:27.000Z
lastModified: 2019-10-23T04:20:28.000Z
categories:
  - "silverlight"
  - "expression"
  - "xaml"
  - "iis7"
  - "expression encoder"
  - "encoder"
  - "smoothhd"
  - "smooth streaming"
  - "webpi"
draft: false
---

<p>I’m sure you’ve heard of the <strong>IIS7 Smooth Streaming </strong>information and perhaps even experienced it if you watched some of the NBC Olympics streams last year or the Presidential Inauguration this past January.  It’s a great experience for online media being able to <em>seamlessly</em> deliver quality media online without constant buffering when latency occurs in networks you don’t control, such as your customers’ ISP accounts.</p>  <p>You may have wanted to try out this experience yourself to see exactly what it does and how it works…as well as to simulate bad/good bandwidth.  Well, you can.  Here’s what you do:</p>  <ol>   <li>Ensure you have an IIS7 environment </li>    <li>Download and install the <a href="http://www.microsoft.com/web/downloads/platform.aspx"><strong>Web Platform Installer</strong></a> which is an easy way to pick the package and have it (and any dependencies) installed for you </li>    <li><a href="http://go.microsoft.com/?linkid=9656606">Download the sample content</a> (Big Buck Bunny – an digital cartoon rendered in various bitrates to simulate the experience). </li>    <li><a href="http://go.microsoft.com/?linkid=9656616">Download the <strong>UX Simulator</strong></a><strong> player starter kit</strong> (this is the player shown below to simulate the experience) </li> </ol>  <p>Once you have all that installed and working, the sample content also installs a <em>UX Simulator</em> application which is a <a href="http://silverlight.net/">Silverlight</a> application that uses one of the Expression Encoder player templates and also adds some nice features to simulate latent/changing network bandwidth speeds.  </p>  <blockquote>   <p>NOTE: If you don’t have access to a server and want to try out this simulator yourself you can visit <a href="http://www.iis.net/media">http://www.iis.net/media</a> to see it live.</p> </blockquote>  <p>Here’s a screenshot of my session running.  The graph below shows what bitrate is being delivered.  Notice the marks where I indicate where I was seeking the media.  It drops down to that the user doesn’t get the dreaded buffering pause, but still continues <em>immediately</em> and then scales back to the highest quality media it can deliver.  The slider on the top right allow you to simulate a drop/increase in available bandwidth:</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Smooth Streaming UX Simulator" alt="Smooth Streaming UX Simulator" src="http://storage.timheuer.com/uxsim2.png" /></p>  <p>Try this out if you are interested.  It’s a very high quality sample content, but you can also try out the UX Simulator on your own content if you use Expression Encoder and choose the adaptive profile to generate the Smooth Streaming files.  Watching the content via this simulator is a very cool experience to see it happen as it really does seamlessly change bitrates without impact to the user and without using a new stream.</p>  <div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:bbe38568-01f8-4f21-8314-84d2ca414495" class="wlWriterEditableSmartContent"></div>
