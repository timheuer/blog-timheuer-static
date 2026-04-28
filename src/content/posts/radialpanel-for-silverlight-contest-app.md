---
title: "Silverlight Contest app updated with new RadialPanel"
slug: "radialpanel-for-silverlight-contest-app"
pubDate: 2009-05-05T14:20:43.000Z
lastModified: 2019-10-23T04:20:29.000Z
categories:
  - "silverlight"
  - "expression"
  - "expression blend"
  - "template"
  - "radialpanel"
  - "circularpanel"
draft: false
---

<p>Isn’t RSS great!?  Today I saw something wonderful pop in the feed from <strong>Jeff Prosise</strong>.  One of the problems with the ‘contest wheel’ app that Arturo and I did, was the CircularPanel we were using really at the time was only built for demo purposes.  There were issues in the spacing when different data items were bound to it.</p>  <p>This morning, <a href="http://www.wintellect.com/CS/blogs/jprosise/archive/2009/05/04/radial-layout-in-silverlight.aspx">Jeff released some code for a <strong>RadialPanel</strong></a> (same concept).  It’s wonderful.  I just swapped it out for the contest app quickly and got it working.  I’ve updated the code:</p>  <ul>   <li>Replaced panel with Jeff’s code </li>    <li>Added an audio toggle button (after debugging, the music was getting annoying :-)) </li>    <li>Fixed some highlighting </li>    <li>Configured for out-of-browser </li> </ul>  <p>Issues if anyone wants to fix :-) -- some highlighting off on selected item because of timer math conflicts as well as just general sizing of the app (configured for full 1024x768 right now without browser toolbars, hence the OOB app).</p>  <p>Anyhow, you can <a href="http://timheuer.com/contest">visit the app here</a> (and install offline).  Again, it’s just a fun little app that was written in &lt; 1 hour for fun.</p>  <p>Thanks Jeff for the RadialPanel code!</p>  <div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:3474372b-2e4e-477c-9868-e974c98e9e7b" class="wlWriterEditableSmartContent"></div>
