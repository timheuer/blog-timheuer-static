---
title: "Troubleshooting data/service access in Silverlight"
slug: "fixing-troubleshooting-debugging-silverlight-and-data-services"
pubDate: 2008-08-20T13:54:21.000Z
lastModified: 2019-10-23T04:20:22.000Z
categories:
  - "silverlight"
  - "web dev helper"
  - "linq"
  - "wcf"
  - "astoria"
  - "web services"
  - "asmx"
  - "404"
  - "data access"
  - "fiddler"
  - "data binding"
  - "binding"
draft: false
---

<p>A while back <a href="http://timheuer.com/blog/archive/2008/07/10/feedback-on-live-silverlight-debugging-sessions.aspx">I pondered</a> doing a “live” debug session with people who were/are working with <a href="http://silverlight.net"><strong>Silverlight</strong></a><strong> 2</strong> and data access via services, etc.  I really like a live concept because it allows people to ask real questions and feels more conversational than a one-way presentation.  After some consideration, I’m not sure I could quite guarantee the environment I was looking for to accomplish this type of style.</p>
<p><img align="right" src="http://s3.amazonaws.com:80/timheuer-img/confused.png" alt="confused man image" style="margin: 0px 0px 0px 10px;" title="confused man image" />So as a second best, I’ve set up a <a href="http://msevents.microsoft.com/CUI/EventDetail.aspx?EventID=1032386656&amp;Culture=en-US">webcast</a>: <strong><a href="http://msevents.microsoft.com/CUI/EventDetail.aspx?EventID=1032386656&amp;Culture=en-US">Troubleshooting Silverlight Data Access</a></strong>.  I hope to keep the question channel open during the webcast though and answer as many questions as possible.  I’ve seen many questions on forums, through emails, and all over the interwebs about people hitting certain pitfalls with Silverlight and data access.  Most of these are common scenarios and you need just a bit of “a-ha!” help to get you over the confusion stump.  That’s my aim.  I have set aside an hour (would have liked to do it sooner, but just time doesn’t permit right now) to tackle the most common things I’m seeing with data and Silverlight.  <strong>I’ll create the scenarios that get you stuck and show you what I do to help get you un-stuck from those moments</strong>.  Stop scratching your head any longer!</p>
<p><span style="font-weight: bold;">UPDATE: The webcast is now <a href="javascript:void(0);/*1222095205306*/">available online for playback</a>.</span><br />
</p>
<p>We’ll look at tools you can use, how you can dig deeper into error messages, working with different types of data, etc.  I want to help!  Please leave your questions here on this blog post as a comment so that I can be sure to address the scenarios.  This isn’t a 1:1 debug session, so it will be hard to tackle the “hey, I’ve got this service from my AS/400 server exposed as a fitzer-valve service bus, which is able to be called from my Java front-end but doesn’t work in Silverlight: why not Tim?" questions, but I hope to help get you along the path of what to look for and to avoid the common mistakes.</p>
<p>Sound good?  I’m looking forward to it.  Again, <strong><em>please leave comments on this post</em></strong> so we can have the best possible session.  You can <a href="http://msevents.microsoft.com/CUI/EventDetail.aspx?EventID=1032386656&amp;Culture=en-US">register for the webcast here</a>.  I look forward to our time together :-).</p>
<p>Related Posts:</p>
<ul>
    <ul>
        <li><a href="http://timheuer.com/blog/archive/2008/06/10/silverlight-services-cross-domain-404-not-found.aspx">Silverlight cross domain and a helpful tool</a></li>
        <li><a href="http://timheuer.com/blog/archive/2008/04/09/silverlight-cannot-access-web-service.aspx">My app cannot access my service!</a></li>
        <li><a href="http://timheuer.com/blog/archive/2008/06/06/changes-to-accessing-services-in-silverlight-2-beta-2.aspx">Silverlight 2 Beta 2 updates for services</a></li>
    </ul>
</ul>
<div style="margin: 0px; padding: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:efade67c-32c2-44cb-a85b-5b1247c0959f" class="wlWriterSmartContent"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
