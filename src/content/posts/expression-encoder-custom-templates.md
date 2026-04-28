---
title: "expression encoder and custom templates"
slug: "expression-encoder-custom-templates"
pubDate: 2007-09-11T13:18:46.000Z
lastModified: 2019-10-23T04:20:09.000Z
categories:
  - "silverlight"
  - "expression media encoder"
  - "download.aspx"
  - "expression encoder"
  - "encoder template"
  - "expression template. media"
  - "mediaelement"
  - "media player"
draft: false
---

<p>i've been asked recently why i use the <a rel="tag" href="http://www.microsoft.com/expression/products/download.aspx?key=encoder">expression encoder</a> template code in my samples for media playback in <a rel="tag" href="http://silverlight.net">silverlight</a>.  simple: free code :-).  the templates in expression encoder provide very interesting stub code handling the simple and advanced media playback capabilities already for you.  if all you need is a simple mediaelement in your silverlight application, then sure, it's a bit heavy.  but if you are developing a media playback integration with end-user controls, you may want to consider it.  it provides all the simple play/pause/etc functionality, but also the glitz of volume slider handlers, time thumb handlers, fullscreen view, etc.  very slick.</p>
<p>anyhow, maybe you decide to go this route and create your killer player with your own xaml (you can see a screencast of this here).  you decide you are sick with cut/paste every time and using the stub and having to replace.  no problem, create your experience as a custom template!  here's how.</p>
<p>first, take a look at the template files in the expression encoder template folder (&lt;installdir&gt;\Microsoft Expression\Encoder 1.0\Templates\en).  you'll see all sorts of replacement code in there.  if you like all of the functionality, then don't change a thing (except your xaml).  if you have special code in your implementation then spend some more time looking at the replacement values and see what you have to modify.  for our purposes here, let's assume we are only modifying the xaml UI.  </p>
<p>create a new folder in the Templates\en (or your language) directory.  it doesn't matter what you name it here...<strong>this is not what shows up in the output options</strong>.  i've named mine 'TimHeuerSimple' just to be clean and, well simple.</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/eme-custom1.png" /></p>
<p>then what i do (remember in this sample here we are only replacing the xaml ui) is copy the contents of a previous template (i use corporate silver) and put it in my new folder.  done.  now you have (or should) make three changes:</p>
<ol>
    <ol>
        <li>edit the player.xaml file in the new folder to be <strong>your</strong> desired xaml.  should be a simple open, select all, paste, save operation for most. </li>
        <li>create a new preview image so the user can get a glimpse of the preview.  it doesn't have to be named preview.jpg, but as long as it is, you'll save yourself one more change :-).  the other preview images are 649x487 so i just stuck with those sizes as well. </li>
        <li>open the Default.html file.  look at line 2.  <strong>here</strong> is where you'll change to the template name you want the user to see.  your templates are always added to the bottom of the other template listings, so no need to get trickery here with the name.  NOTE: if you created your preview image as something other than 'preview.jpg' line 3 in this file is also where you will change the pointer to that preview. </li>
    </ol>
</ol>
<p>boom, you are done.  now next time you start expression encoder, you'll see your template as an output option:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/eme-custom2.png" /></p>
<p>there you have it...now when you want to encode your media and have the output into your custom player (or perhaps a corporate/departmental standard look and functionality) you have it.</p>
<p>hope this helps!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:3d7d089e-120f-4ace-9beb-d073129e6c98" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
