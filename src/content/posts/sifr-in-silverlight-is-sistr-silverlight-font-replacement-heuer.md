---
title: "sIFR and silverlight = sistr"
slug: "sifr-in-silverlight-is-sistr-silverlight-font-replacement-heuer"
pubDate: 2007-09-19T19:53:19.000Z
lastModified: 2019-10-23T04:20:09.000Z
categories:
  - "silverlight"
  - "sifr"
  - "sistr"
  - "filipe fortes"
  - "adam kinney"
  - "timheuer"
  - "tim heuer"
  - "typography"
  - "font"
  - "type"
draft: false
---

<p>i saw over in the <a href="http://www.adamkinney.com/">township of adam kinney</a> that someone came up with a <a rel="tag" href="http://silverlight.net">silverlight</a> version of the sIFR concept.</p>
<p>for those who don't know, <a rel="tag" href="http://www.mikeindustries.com/sifr">sIFR</a> (scalable inman flash replacement) in simplest forms is a method for using css to annotate elements of text that you might want replaced with higher-quality/different/pick-your-word-of-choice typography.  it provided a method on sites to essentially say "hey if javascript is enabled and flash is installed, replace this plain text header with some whiz-bang custom font to make the user say ooooooooohhhh yea" or something like that.</p>
<p><a href="http://fortes.com/">filipe fortes</a>, who apparently used to work on the wpf team himself, <a href="http://fortes.com/2007/09/17/introducing-sistr/">wrote a silverlight version</a> of that methodology as a test of sorts i guess...turns out it looks pretty good.  he calls it <a href="http://fortes.com/2007/09/17/introducing-sistr/">sistr</a> and is implemented by including one javascript file and a css class name.  looks like it is implemented using the downloader object in silverlight as well so it provides an "as needed" approach.</p>
<p>why should you care?  well, that's up to you.  but one thing sIFR solved (or attempts to) is those questions on accessibility with rich content.  since the text you are replacing is still there, it should present a more accessible site in the event you needed that (i.e., text readers, etc.).  of course <a href="http://en.wiktionary.org/wiki/your_mileage_may_vary">ymmv</a> on your particular implementation.</p>
<p><a title="Sistr: Rich accessible typography in Silverlight" href="http://www.flickr.com/photos/83775906@N00/1409086311/"><img alt="Sistr: Rich accessible typography in Silverlight" border="0" src="http://static.flickr.com/1389/1409086311_e9ff1eead5.jpg" /></a></p>
<p>pretty cool.  the sample indicates that hyperlinks work, but i didn't see it working in the sample...maybe a slight bug, but great start nonetheless.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:a5e7e2a4-9e72-4e2e-b783-0b1f788c0486" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
