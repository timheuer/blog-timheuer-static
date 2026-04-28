---
title: "creating silverlight player templates part 2"
slug: "creating-silverlight-media-player-skins-expression-encoder"
pubDate: 2007-12-18T11:57:32.000Z
lastModified: 2019-10-23T04:20:13.000Z
categories:
  - "silverlight"
  - "expression"
  - "templates"
  - "expression encoder"
  - "encoder template"
  - "media player"
  - "encoder"
  - "baseplayer"
  - "expression templates"
draft: false
---

<p>i had <a href="http://timheuer.com/blog/archive/2007/09/11/expression-encoder-custom-templates.aspx">previously written about creating <strong>custom expression encoder templates</strong></a> and integrating them into the encoder workflow (if you haven't read that, check it out, very simple process).  my process was simple and followed the "CASE" methodology*.</p>
<p><strong>C</strong>opy <br />
<strong>A</strong>lways <br />
<strong>S</strong>teal <br />
<strong>E</strong>verything</p>
<p>basically i would encode a video file to get the output of the encoder template, then blast away all the xaml in player.xaml, and create your own <strong><a rel="tag" href="http://silverlight.net">silverlight</a></strong> media player skin.  really the only thing you need to know is the 'well known names' for certain controls (the most common of which i outline in <a href="http://timheuer.com/blog/archive/2007/09/11/expression-encoder-custom-templates.aspx">my blog post</a>.  i've received comments and questions about how to get more into the code and curiosities of what else could be done and what is going on under the hoods to the bindings of the well known names.  all this magic happens in baseplayer.js -- a file included in the encoder templates.</p>
<p>problem is that baseplayer.js is a crunched/optimized javascript file and really not human readable in a short time at least.</p>
<p>now the <strong>expression encoder</strong> team has went one step further.  they've released a 22-page document outlining the process for creating a custom template that is bit more 'official' than my simple steps, but essentially encompasses the ideas.  what is great is this document includes all the well known names that you might want to implement as well as descriptions on how to override default behaviors as well -- i've included a direct link to the document at the end of this post.  one of the most valuable things i like in the document is a visual layout of a player and the well known names mapped so you can see them:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/encoder-expl.png" /></p>
<p>in addition to that, the team has provided a debug version of <strong>baseplayer.js</strong> as a supplement to expression encoder (the debug version <a href="http://download.microsoft.com/download/4/2/3/4230db51-6eba-461b-8da3-4289ae2c9b6e/EULA - Expression Encoder Debugging Templates Supplemental.rtf">comes with a EULA so be sure to read it</a> -- only licensed users of expression encoder may use this debug version.  this means it is human readable :-).  this should help you understand the bindings more and determine what (if anything) else you would want to do.</p>
<p>so take a look at <a href="http://timheuer.com/blog/archive/2007/09/11/expression-encoder-custom-templates.aspx">my previous post</a> if you haven't, then download the docs and debug version if you have expression encoder to start building your templates today!</p>
<p>File: <a href="http://download.microsoft.com/download/0/6/b/06b97375-6594-402d-b627-ab561d0859b2/Creating%20silverlight%20player%20templates.docx">Developing Silverlight Media Player Skins</a> <br />
File: <a href="http://download.microsoft.com/download/4/2/3/4230db51-6eba-461b-8da3-4289ae2c9b6e/BasePlayer.zip">BasePlayer.js debug version</a></p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:88411c75-edb5-4af0-8274-b91347159efa" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
