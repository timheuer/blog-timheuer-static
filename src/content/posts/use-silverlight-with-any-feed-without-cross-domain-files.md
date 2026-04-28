---
title: "Reading data and RSS with Silverlight and no cross-domain policy"
slug: "use-silverlight-with-any-feed-without-cross-domain-files"
pubDate: 2008-06-03T22:32:24.000Z
lastModified: 2019-10-23T04:20:19.000Z
categories:
  - "silverlight"
  - "rss"
  - "popfly"
  - "atom"
  - "syndication"
  - "cross domain"
  - "pipes"
  - "feedburner"
  - "cross-domain"
  - "feed"
draft: false
---

<p>So you want to read an RSS/Atom feed on the interwebs and saw the SyndicationFeed class you could use in <a href="http://silverlight.net">Silverlight</a> to give a nice RIA display of the syndicated data.  Great, no problem right, just wire up an WebClient, point it to the RSS feed on something like <a href="http://silverlight.net">http://silverlight.net</a> or something and boom, done.  Wait, what’s this 404 Not Found error?  In most cases this is going to be a result of a cross-domain issue.  If you haven’t started working with services yet, Silverlight requires a cross-domain policy file to be in place to access remote data not on the same site-of-origin of the Silverlight application.</p>
<p>If you want to learn more about this in further detail you can <a href="http://timheuer.com/blog/archive/2008/04/06/silverlight-cross-domain-policy-file-snippet-intellisense.aspx">read this</a> and <a href="http://silverlight.net/learn/learnvideo.aspx?video=47174">view this</a>.</p>
<p>Crap.  So now what do you do?  You don’t have a server that would enable you to write a proxy service and you don’t really have the time to do that.  Aha, enter some free services for you!</p>
<p style="text-decoration: line-through;"><strong><u>Popfly</u></strong></p>
<p style="text-decoration: line-through;">First, depending on what you are trying to do with the data, give <a href="http://www.popfly.com/">Popfly</a> a look.  Popfly contains several templates for importing syndicated information and displaying it in different visualizations.  For instance in about 4 clicks I can import an RSS feed, connect it to a visualizer and have this:</p>
<p>Popfly is no longer available as a service from Microsoft.<br />
</p>
<p><strong><u>Feedburner and </u></strong><strong><u>Yahoo! Pipes</u></strong></p>
<p><a href="http://pipes.yahoo.com">Pipes</a> is similar to Popfly but doesn’t really provide a breadth of possibilities of visualizations and ease of mashup of way different types of sources, but for this purpose I think it works well.  In Pipes, you can create an input feed and map it to an output, even merging various sources together.  The end result can be a <strong>new</strong> RSS feed for you.  And Yahoo Pipes already has a cross-domain policy file in place for Flash (which Silverlight supports).  You have to change your endpoint URI a little bit and it wasn’t clear until I searched, but for example, <a href="http://pipes.yahooapis.com/pipes/pipe.run?_id=ZkdW6_Ux3RGeUgLk8ivLAg&amp;_render=rss">here is a RSS feed URL</a> you could use for combining my blog and the Silverlight community blogs in one. <br />
</p>
<p><a href="http://www.feedburner.com">Feedburner</a> is a syndication service that does a lot of statistics of your feed, helps you manage subscriber data and can save you some bandwidth as well.   It does RSS really well (and enclosure support, etc).  Best of all, it also supports cross-domain policies via the Flash format (again, which Silverlight supports).  </p>
<p>So if you find a feed that is on a site without cross-domain policy support, you can create a new Feedburner feed, Yahoo Pipe or Popfly mashup and be good to go!</p>
<p>A subtle workaround for getting data from sites that aren’t providing the policy files :-)</p>
<p>Hope this helps!</p>
<div style="margin: 0px; padding: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:6fc7a0ba-332f-4244-9503-a16708de870c" class="wlWriterSmartContent"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
