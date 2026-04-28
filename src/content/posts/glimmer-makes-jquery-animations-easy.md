---
title: "Adding jQuery to your site with Glimmer"
slug: "glimmer-makes-jquery-animations-easy"
pubDate: 2009-04-29T07:16:52.000Z
lastModified: 2019-10-23T04:20:29.000Z
categories:
  - "animation"
  - "ria"
  - "javascript"
  - "mix09"
  - "glimmer"
  - "jquery"
draft: false
---

<p>Last week I was wanting to do something on my site sort of a ‘breaking news’ style banner that would span the entire site width but only when I wanted it too – based on a cookie or something else.  And I didn’t want to do something server side, because I was sick of doing stuff like that.</p>  <p>Not having played with <strong><a href="http://jquery.com">jQuery</a></strong>, I thought I’d take a dive.  Prior to MIX09, I’d been testing something that the MIXOnline team had been toying with, which has just been released: <strong><a href="http://code.msdn.microsoft.com/glimmer/">Glimmer</a></strong>.  Glimmer is described as a <em>jQuery Interactive Design Tool</em>.  A helper for those like me who know nothing about it.  Sure, jQuery has a ton of resources, and my <a href="http://twitter.com/timheuer">Twitter</a> peeps came through helping me navigate some of the things that aren’t glaringly obvious for noobs like me :-).</p>  <p>But Glimmer got me started, and I think that’s the point.  I had an overall HTML structure already and had the div element that I wanted to work with in jQuery – my goal was to animate it in a ‘breaking news’ sort of manner (or at least what’s in my head when I think of that concept).  I opened up my HTML in Glimmer and went to work.  I simply added the action (the function I wanted to trigger), then pointed it to the element to target.  Here’s what my simple Glimmer UI action setup looked like:</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Glimmer UI" alt="Glimmer UI" src="http://s3.amazonaws.com:80/storage.timheuer.com/glimmer-1.png" /></p>  <p>I clicked save and it created a JavaScript file for me with the completed code:</p>  <div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">   <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">     <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> jQuery(<span style="color: #0000ff">function</span>($) {</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>  </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span> <span style="color: #0000ff">function</span> loadBreakingNews(<span style="color: #0000ff">event</span>)</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span> {</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span>      $(<span style="color: #006080">"#info"</span>).css(<span style="color: #006080">"top"</span>,<span style="color: #006080">"-50px"</span>);</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum6">   6:</span>     $(<span style="color: #006080">"#info"</span>).animate({<span style="color: #006080">"top"</span>:0}, 894, <span style="color: #006080">"easeOutBounce"</span>, <span style="color: #0000ff">null</span>);</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum7">   7:</span> }</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum8">   8:</span>  </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum9">   9:</span> loadBreakingNews();</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum10">  10:</span>  </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum11">  11:</span> });</pre>
<!--CRLF--></div>
</div>

<p>Sure, to you jQuery pros, this looks simple, but this tool helped me quickly use a design-time tool to generate this without previous knowledge of jQuery.  Now, I’ve learned a few things about jQuery since my first incarnation – all of which took 2 seconds with Glimmer.  I decided I wanted to use the built-in “slideDown” feature in jQuery.  Some things like this aren’t supported in Glimmer yet, but simple things are…and quite frankly, the combination of Y position animation and an easing function accomplished the same goal.</p>

<p>I made a few hand-modifications to fit my needs (checking for cookies to trigger the banner, etc), but Glimmer got me started right away figuring things out quickly…it was awesome.  I think it comes with a free ShamWow as well, I’m not sure, but I swear Karsten told me that. :-)  Check out Glimmer today if you are new (or even seasoned) to jQuery.  There is a plugin model I haven’t explored, but check out the <a href="http://code.msdn.microsoft.com/glimmer/">Glimmer project site for more information</a>.</p>

<p>Next maybe I should explore working with jQuery and <a href="http://silverlight.net/">Silverlight</a> as I know there is more to jQuery than animations and I think it would make a helpful library for the HTML interop layer.</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:339eaa20-25a5-44f7-b6a7-f8357f987a5b" class="wlWriterEditableSmartContent"></div>
