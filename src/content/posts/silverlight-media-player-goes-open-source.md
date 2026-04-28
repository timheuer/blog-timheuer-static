---
title: "Silverlight 2 Media Player project now open source"
slug: "silverlight-media-player-goes-open-source"
pubDate: 2008-06-24T13:31:18.000Z
lastModified: 2019-10-23T04:20:20.000Z
categories:
  - "silverlight"
  - "expression"
  - "codeplex"
  - "ria"
  - "open source"
  - "osi"
  - "ms-pl"
  - "media"
  - "vsm"
  - "visual state manager"
  - "cddl"
draft: false
---

<p>Over the past few months <a href="http://joel.neubeck.net/">Joel</a> and I have been back-and-forthing modifications to his original great idea and goal <em>“build a re-sizable video player using no custom user controls, but instead leveraging controls styles and templates.”</em>  Joel started in <a href="http://silverlight.net">Silverlight</a> 2 Beta 1 and implemented using the style method (aka ‘the MIX model’) available at that time.  </p>
<p>I took it <a href="http://www.timheuer.com/blog/archive/2008/05/02/creating-a-skinnable-silverlight-media-player.aspx">and added some functionality</a> of scaling and startup parameters.  After the VisualStateManager model for styling was released, this project made perfect sense to demonstrate those abilities and thus I <a href="http://timheuer.com/blog/archive/2008/06/10/updating-skinnable-media-player-using-visualstatemanager.aspx">transformed the great styling work that Joel did into the VSM model</a>.</p>
<p>Joel has since gone back into the project and <a href="http://joel.neubeck.net/2008/06/sl2b2-media-player-markers/">implemented media marker support</a> and an enhanced user interface to display them.  I found one issue in his marker implementation and emailed him about it with a suggestion that (reading between the lines) loosely translated was: <em>how about we stop emailing this project and open source it?</em></p>
<p>The next day Joel has pushed the project to Codeplex.  Introducing <a href="http://www.codeplex.com/sl2videoplayer">Silverlight 2 – Video Player</a>.  </p>
<p><a href="http://www.codeplex.com/sl2videoplayer"><img alt="" border="0" src="http://s3.amazonaws.com:80/timheuer-img/sl2codeplexplayer2.png" /></a></p>
<p>Here's a running sample:</p>
<p><iframe src="http://joel.neubeck.net/wp-content/uploads/2008/06/VideoPlayerMarkers/default.html" frameborder="0" width="500" height="240"></iframe></p>
<p>The current implementation is up there (with an already work item suggested by me :-)).  Awesome!  <strike>Joel chose the </strike><a href="http://www.opensource.org/licenses/cddl1.php"><strike>Common Development and Distribution License</strike></a><strike> which I think is very similar to the less wordy (by 2,153 words) </strike><a href="http://www.opensource.org/licenses/ms-pl.html"><strike>Microsoft Public License</strike></a><strike>, both of which are approved OSI licenses for open source.</strike></p>
<p><strong>UPDATE: Joel has changed to use the Ms-Pl license on the project!</strong></p>
<p>Thanks to Joel for putting it out there as an open source project.  Some simple code but hopefully will help those using Silverlight and media create quick experiences with an embeddable, skinnable solution!</p>
<p>Related posts:</p>
<ul>
    <ul>
        <li><a href="http://www.timheuer.com/blog/archive/2008/05/02/creating-a-skinnable-silverlight-media-player.aspx">Skinning an embeddable Silverlight 2 media player</a> </li>
        <li><a href="http://timheuer.com/blog/archive/2008/06/10/updating-skinnable-media-player-using-visualstatemanager.aspx">Updated Silverlight media player using VisualStateManager</a> </li>
        <li><a href="http://timheuer.com/blog/archive/2008/06/04/silverlight-introduces-visual-state-manager-vsm.aspx">Silverlight and the VisualStateManager</a> </li>
        <li><a href="http://timheuer.com/blog/archive/2008/06/04/skinning-silverlight-controls-made-easier.aspx">Skinning Silverlight controls just got easier</a> </li>
    </ul>
</ul>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:a6ddf185-69ef-446a-b1bf-0a6c0c14e702" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>

