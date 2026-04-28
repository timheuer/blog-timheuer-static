---
title: "Providing startup parameters for Silverlight"
slug: "setting-startup-parameters-for-silverlight"
pubDate: 2008-07-17T23:12:19.000Z
lastModified: 2019-10-23T04:20:21.000Z
categories:
  - "silverlight"
  - "embed"
  - "initParams"
  - "silverlightjs"
  - "sl2videoplayer"
  - "initparameters"
draft: false
---

<p>One of the things that makes <a href="http://silverlight.net"><strong>Silverlight</strong></a> 2 great is the ability to create a very flexible framework application that others can use and can be embeddable with some dynamic properties.  This is the method used in the <a href="http://www.codeplex.com/sl2videoplayer">SL2 Video Player</a> to provide a completely dynamic player that is portable.</p>  <p>How?  Using the <em>initParams</em> property of the plugin.  There are a few ways you can do this.  I’ve just uploaded a video demonstrating three of them:</p>  <ul>   <ul>     <li>Creating App Resources</li>      <li>Passing into the root visual constructor</li>      <li>Using URI query string parameters</li>   </ul> </ul>  <p>What?  Query string params?  Yep, the HTML bridge gives us a nice object model actually to inspect those parameters too.  Take a look at the <a href="http://silverlight.net/learn/learnvideo.aspx?video=72312">latest video on the Silverlight community site</a>!</p>  <div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:154e0584-1215-4263-b32f-c7763c93a513" style="padding-right: 0px; display: inline; padding-left: 0px; float: none; padding-bottom: 0px; margin: 0px; padding-top: 0px"></div>
