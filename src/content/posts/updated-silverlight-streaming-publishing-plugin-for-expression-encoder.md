---
title: "Updated SLS Plugin for Encoder Available"
slug: "updated-silverlight-streaming-publishing-plugin-for-expression-encoder"
pubDate: 2009-01-15T15:53:26.000Z
lastModified: 2019-10-23T04:20:26.000Z
categories:
  - "silverlight streaming"
  - "silverlight"
  - "expression"
  - "expression encoder"
  - "encoder"
  - "sls"
draft: false
---

<p>The Encoder team has updated their <a href="http://silverlight.live.com">Silverlight Streaming</a> (SLS) plugin for Expression <a href="http://www.microsoft.com/expression/products/Overview.aspx?key=encoder">Encoder 2</a>.  On the surface pretty much nothing has changed, but it essentially updates the ability to use the plugin to publish <a href="http://silverlight.net">Silverlight</a> 2 templates to SLS automatically without getting the random error that you’ve probably seen if you tried.</p>  <p>Since the new Silverlight 2 player templates are completely parameter-driven, which is awesome, it did present a small challenge for the plugin.  When you use the new plugin with a Silverlight 2 player template, you’ll notice that the resulting application uses a bootstrapping method to launch with initialization parameters.  This models (in fact I modeled my information) the <a href="http://timheuer.com/blog/archive/2009/01/12/14549.aspx#bootstrap">bootstrap method I outlined in a previous post</a>.</p>  <p>With the new plugin, for media applications at least, you don’t have to mess with creating your Javascript files or manifest files…the plugin does all that for you now in the pre-processing before uploading to the SLS service.  Because all of this is in there now, my process of making the <a href="http://sl2videoplayer.codeplex.com">SL2VideoPlayer</a> a one-click template in Expression Encoder is now complete!  I’ve chosen to stick with my “minimum” fork of the template (no markers or caption support) because that’s the scenario I use mostly, just a player.  You can get the template files <a href="http://storage.timheuer.com/SL2VideoPlayer-min-ex.zip">here</a>.  Just unzip into the Encoder templates directory and it will show up as an option.  When used, the SLS plugin correctly translates all the settings into initParams for you.</p>  <p>Here’s the download links:</p>  <ul>   <ul>     <li><a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=702f130c-f783-44bd-bc95-8141a8d3e90e&amp;DisplayLang=en">Updated Silverlight Streaming Publishing plugin for Encoder 2</a> </li>      <li>SL2VideoPlayer template files for Encoder 2 SP1 (<a href="http://storage.timheuer.com/SL2VideoPlayer-full.zip">full version</a>, and <a href="http://storage.timheuer.com/SL2VideoPlayer-min.zip">minimum</a>) </li>   </ul>    <ul>Enjoy! Hope this helps!</ul>    <div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:85107031-65a3-4221-8265-e6f83b74d6ef" class="wlWriterEditableSmartContent"></div> </ul>
