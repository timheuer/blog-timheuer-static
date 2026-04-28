---
title: "Seesmic Desktop Platform Plugins"
slug: "seesmic-desktop-plugins"
pubDate: 2010-04-16T11:52:38.000Z
lastModified: 2019-10-23T04:20:35.000Z
categories: []
draft: false
---

<p>I use <strong><a href="http://www.seesmic.com">Seesmic</a></strong> for my social media stuff (<a href="http://twitter.com/timheuer">Twitter</a>, Facebook, etc.).  Recently they created the <strong><a href="http://platform.seesmic.com/">Seesmic Desktop Platform</a></strong> which enables software developers to enhance, change or extend their Seesmic Desktop application.  This platform is built upon <a href="http://www.silverlight.net">Silverlight</a> 4 and is quite simple to extend.  To learn more about the Seesmic Desktop Platform, view the <a href="http://devwiki.seesmic.com">developer wiki</a>.</p>
<p>I’ve created some plugins for my use and post them here to share with you.  Use them as you’d like, they imply no warranties :-).  For installation of the XAP files, see the developer wiki above.  In the future I’ll provide easy installers for these (or I think Seesmic may enable easier consumption as well).  Here are the ones I have:</p>
<ul>
    <li><a href="#translate">Translate</a> </li>
    <li><a href="#foursquare">Foursquare</a> </li>
    <li><a href="#pictures">Image Previewer</a> (Twitpic, yFrog, Tweetphoto, Flickr, Twitgoo, Twitrpix, img.ur, img.ly, Instagram) </li>
    <li><a href="#migre">Migre.me</a> </li>
    <li><a href="#twitlonger">Twitlonger</a> </li>
    <li><a href="#imgly">Img.ly Provider</a></li>
    <li><a href="#googl">Goo.gl URL Shortener</a></li>
    <li><a href="#uberfilter">UberFilter</a></li>
</ul>
<h2>How to develop plugins for Seesmic Desktop 2</h2>
Interested in developing plugins?  You can start by <a href="http://timh.me/seesmic-templates">installing my helpful Visual Studio Seesmic Templates</a> and then visit http://devwiki.seesmic.com for details on how to write plugins!
<h2>How to Install plugins for Seesmic Desktop 2</h2>
<p>While I firmly believe this process will improve, here is the simply way to install these (or other plugins) for Seesmic Desktop 2.  It’s as simple as copy/paste.</p>
<ul>
    <li><strong>Windows</strong>: "My Documents\Seesmic\Seesmic Desktop 2\Plugins" (or Documents if you are on Windows 7) </li>
    <li><strong>Mac</strong>: "$HOME\Documents\Seesmic\Seesmic Desktop 2\Plugins" </li>
</ul>
<h2><a name="translate"></a>Translate Plugin</h2>
<p>This attaches a <em>Translate this item</em> action menu to any timeline item.  It takes the contents of the timeline item and attempts to translate it to the user’s chosen machine language using Microsoft Translator.</p>
<p><img src="http://storage.timheuer.com/seesmic-translate-1.png" alt="Seesmic Translate Plugin" title="Seesmic Translate Plugin" style="margin: 0px auto; display: block; float: none;" /></p>
<p>This will also allow you to translate text from your current language to a supported language BEFORE you post the message to the service like Facebook, Twitter, whatever.</p>
<p><img src="http://storage.timheuer.com/translate-postaction.png" alt="Seesmic Translate Plugin" title="Seesmic Translate Plugin" style="margin: 0px auto; display: block; float: none;" /></p>
<p>Download: <a href="http://seesmic.timheuer.com/plugins/translate/1.0.50906.0/TimHeuer.Seesmic.Translate.xap">TimHeuer.Seesmic.Translate.xap</a> (06-SEP-2010)</p>
<h2><a name="foursquare"></a>Foursquare Venue Plugin</h2>
<p>This looks in your timeline items for Foursquare URLs and attaches an adorner for you to be able to expand the Foursquare short URL format into the details of the venue and see them presented in the timeline view.</p>
<p><img src="http://storage.timheuer.com/fsquareseesmic-0520.png" alt="Seesmic Foursquare Plugin" title="Seesmic Foursquare Plugin" style="margin: 0px auto; display: block; float: none;" /></p>
<p>Download: <a href="http://seesmic.timheuer.com/plugins/foursquare/1.0.50906.0/TimHeuer.Seesmic.Foursquare.VenueFilter.xap">TimHeuer.Seesmic.Foursquare.VenueFilter.xap</a> (06-SEP-2010)</p>
<h2><a name="pictures"></a>Image Previewer Plugin for Twitpic, yFrog, Twitgoo, Flickr, Instagram and Tweetphoto</h2>
<p>This looks in your timeline items for Twitpic, yFrog, Instagram or Tweetphoto URLs and attaches a preview of the image with a link to the direct image again (per the terms of the APIs).</p>
<p><img src="http://storage.timheuer.com/picpreviewer-1.png" alt="Seesmic Picture Previewer" title="Seesmic Image Previewer" style="margin: 0px auto; display: block; float: none;" /></p>
<p>Download: <a href="http://seesmic.timheuer.com/plugins/picture-preview/1.0.50906.0/TimHeuer.Seesmic.PicturePreviewer.xap">TimHeuer.Seesmic.PicturePreviewer.xap (06-SEP-2010)</a></p>
<h2><a name="migre"></a>Migre.me URL Shortener</h2>
<p>Per a user suggestion on the desktop platform plugins forum, I created this Migre.me URL shortener add-in.  These are perhaps the easiest to create.  No screenshot but it adds the Migre.me option to the URL shortening toolbar.</p>
<p>Download: <a href="http://seesmic.timheuer.com/plugins/migre/1.0.50906.0/TimHeuer.Seesmic.Migre.xap">TimHeuer.Seesmic.Migre.xap</a> (06-SEP-2010)</p>
<h2><a name="twitlonger"></a>Twitlonger</h2>
<p>While not a service that I frequent, it is handy to have.  <a href="http://www.twitlonger.com">Twitlonger</a> was developed to shrink longer messages to the standard Twitter 140-character limit and provide a link to the full text.  This plugin puts a button <em>Shorten with Twitlonger</em> in the posting area and shrinks the content for you automatically.</p>
<p>Download: <a href="http://seesmic.timheuer.com/plugins/twitlonger/1.0.50906.0/TimHeuer.Seesmic.Twitlonger.xap">TimHeuer.Seesmic.Twitlonger.xap</a> (06-SEP-2010)</p>
<h2><a name="imgly"></a>img.ly Image Posting Provider</h2>
<p>This plugin lets you choose the <a href="http://img.ly">http://img.ly</a> service to post and host your images in your messages.  Use this in conjunction with my Image Previewer plugin to get posting *and* previewing of images from img.ly!</p>
<p>Download: <a href="http://seesmic.timheuer.com/plugins/imgly/1.0.50921.0/TimHeuer.Seesmic.ImglyProvider.xap">TimHeuer.Seesmic.ImglyProvider.xap</a> (21-SEP-2010)</p>
<h2><a name="googl"></a>Goo.gl URL Shortener</h2>
<p>Enable Google as your URL shortening service within Seesmic Desktop.  No screenshot but it adds the goo.gl option to the URL shortening toolbar.</p>
<p>Download: <a href="http://seesmic.timheuer.com/plugins/googl/1.0.60111.0/TimHeuer.Seesmic.Googl.xap">TimHeuer.Seesmic.Googl.xap</a> (11-JAN-2011)</p>
<h2><a name="uberfilter"></a>UberFilter</h2>
<p>Sick of seeing all the Foursquare, Gowalla or Paper.li postings flood your feed?  Install this plugin to choose what to filter out (none by default).  After installing, view the settings section of this plugin to choose what noise to turn off.  Version 1 is limited to Foursquare, Gowalla and Paper.li but next version will add more known noise and allow for custom filters.  Updates will come automatic after installing this one.</p>
<p>Download: <a href="http://seesmic.timheuer.com/plugins/uberfilter/1.0.60116.2/TimHeuer.Seesmic.UberFilter.xap">TimHeuer.Seesmic.UberFilter.xap</a> (16-JAN-2011)</p>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
