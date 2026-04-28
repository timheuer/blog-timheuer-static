---
title: "silverlight and php"
slug: "silverlight-and-php-silverlight-anywhere-flickr"
pubDate: 2007-08-24T23:48:14.000Z
lastModified: 2019-10-23T04:20:08.000Z
categories:
  - "silverlight"
  - "flickr"
  - "php"
  - "phpflickr"
draft: false
---

<p>i saw a <a href="http://rawrrawr.com/?p=10">post over in russell myers'</a> land seemingly acknowledging the confusion that might be out there of hosting <a href="http://silverlight.net" rel="tag">silverlight</a>.  he noted <a href="http://timheuer.com/blog/archive/2007/08/23/silverlight-hosting-on-linux-apache-osx-streaming.aspx">my previous post</a> about the topic.  in his note though, russell mentions:</p>  <blockquote>   <p>...it seems entirely possible to take a Silverlight application and integrate it on an existing Apache server to create a Silverlight experience within PHP or any other language that can embed the XAML content.</p> </blockquote>  <p>he's right on here, in fact, i'm not sure even samples will do it justice, but i tried anyway :-).  take for example another quick swag sample using flickr.  how can i use flickr services via php, get some images and display them in a silverlight application?  simple.</p>  <p>first, let me stress again 2 things: i'm not a php developer (so be kind on my code) and i'm not saying this is the end-all-be-all of samples...just merely making a point.</p>  <p>in this example my goal is to have a form that accepts user input, which in turn does a tag search on flickr for some images using their REST api's via PHP.  those images are then referenced in a silverlight control that creates a simple little control displaying the image and then for completely gratuitous reasons adds a web 2.0 reflection on the bottom of them :-).</p>  <p>here's what we are doing...first, the php application.  now, in my sample here that i'll provide a link to (btw, i'm using a free host that appears to be having issues, so unless someone can point me to a free, reliable PHP host that is what i'm stuck with) we are using flickr's REST apis.  i'm using a pre-packaged PHP library for flickr called phpFlickr oddly enough.</p>  <p>step one is creating the php interaction (did i already say i wasn't a php developer?).  here's my basic code:</p>  <pre class="csharpcode"><span class="kwrd">&lt;?</span><span class="html">php</span><span class="attr">require_once</span>(<span class="kwrd">"phpFlickr/phpFlickr.php"</span>); $<span class="attr">flickr</span> = <span class="attr">new</span> <span class="attr">phpFlickr</span>(<span class="kwrd">"YOUR API KEY HERE"</span>); $<span class="attr">i</span> = <span class="attr">0</span>; $<span class="attr">tagName</span> = $<span class="attr">_POST</span>[<span class="kwrd">"flickrTag"</span>];<span class="attr">if</span> ($<span class="attr">tagName</span> == <span class="kwrd">""</span>) { $<span class="attr">tagName</span> = <span class="kwrd">"silverlight"</span>; } $<span class="attr">photos</span> = $<span class="attr">flickr-</span><span class="kwrd">&gt;</span>photos_search(array("tags"=<span class="kwrd">&gt;</span>$tagName, "tag_mode"=<span class="kwrd">&gt;</span>"any", "per_page"=<span class="kwrd">&gt;</span>"6", "page"=<span class="kwrd">&gt;</span>"1")); ?<span class="kwrd">&gt;</span><span class="kwrd">&lt;</span><span class="html">script</span> <span class="attr">type</span><span class="kwrd">="text/javascript"</span><span class="kwrd">&gt;</span> &lt;?<span class="kwrd">foreach</span>($photos[<span class="str">"photo"</span>] <span class="kwrd">as</span> $photo) { $purl = $flickr-&gt;buildPhotoUrl($photo, <span class="str">"Square"</span>); echo <span class="str">"photoArray.push(\"$purl\");"</span>; } ?&gt;<span class="kwrd">&lt;/</span><span class="html">script</span><span class="kwrd">&gt;</span></pre>

<p>so we are essentially calling out to flickr and getting a search result back.  now when you look at the foreach loop here's where you'll see the silverlight 'integration' part 1.  in another javascript file i have declared a global javascript array called photoArray.  in my loop here, i'm essentially building out the URL to the flickr photo and then jamming that into the array object. </p>

<p>once the content i need to manipulate for silverlight is in my javascript (or .NET code for v1.1) objects, they <strong>are on the client</strong>.  read: no more server stuff... so really in this sample and others, PHP is simply providing some data, whether directly itself emitting XAML that will be consumed (<a href="http://silverlight.net/learn/learnvideo.aspx?video=114">as in this screencast</a>), or providing data for the client to iterate through and create XAML elements on the fly in my sample here.  in my example, with this new photoArray i'm instantiating a simple little control i had added (this is the ThumbnailImage.xaml file in the download) -- essentially a pre-build glob of XAML representing my end result.  </p>

<p>i iterate through the array and create those elements:</p>

<pre class="csharpcode"><span class="kwrd">for</span> (<span class="kwrd">var</span> i=0; i &lt; photoArray.length; i++) { <span class="kwrd">var</span> rimg = <span class="kwrd">this</span>.control.content.createFromXaml(xamlFrag, <span class="kwrd">true</span>); <span class="kwrd">this</span>.root.children.add(rimg); <span class="kwrd">new</span> PhpFlickr.Thumbnail(<span class="kwrd">this</span>.control, rimg, photoArray[i], left, top); left += 80; }</pre>

<p>the PhpFlickr.Thumbnail object is a javascript prototype class that sets the canvas' inner elements to the image reference.  you can learn about creating these little user controls for silverlight <a href="http://timheuer.com/blog/archive/2007/08/19/implement-user-control-in-silverlight-user-controls.aspx">here</a> (v1) and <a href="http://timheuer.com/blog/archive/2007/08/20/silverlight-user-controls-silverlight-1_1.aspx">here</a> (v1.1):</p>

<pre class="csharpcode">PhpFlickr.Thumbnail = <span class="kwrd">function</span>(control, target, imageSource, x, y) { <span class="kwrd">this</span>.target = target; <span class="kwrd">this</span>.thumb_image = target.findName(<span class="str">"Thumbnail"</span>); <span class="kwrd">this</span>.thumb_reflex = target.findName(<span class="str">"ThumbnailReflect"</span>); <span class="kwrd">this</span>.thumb_image.Source = imageSource; <span class="kwrd">this</span>.thumb_reflex.Source = imageSource; <span class="kwrd">this</span>.target[<span class="str">"Canvas.Top"</span>] = y; <span class="kwrd">this</span>.target[<span class="str">"Canvas.Left"</span>] = x; }</pre>

<p>the end result of this sample looks something like this:</p>

<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/silverphp.png" /></p>

<p>so as you can see, very little php code happening here...and that is kind of the point!  yes, silverlight can be served up via any web server, and yes, silverlight can be used with any technology.  again, my sample may not resonate to "get it" for you, but hopefully you will see the point that the interaction is on the client.  so if you have php web services, great, silverlight can use them.  if you want php to dynamically generate xaml and deliver it to the silverlight control, yes that can be done.</p>

<p>the sample is online here (again, shared/free host so don't hate me if it isn't up/working), and the sample code is below at the end of this post.  i hope this helps clear some things up again, if not, please let me know.</p>

<p>Sample Code: <a href="http://s3.amazonaws.com/timheuer-img/SilverPhp.zip">SilverPhp.zip</a></p>

<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:22ebf45e-c849-455c-b554-e7d6f3ec2866" style="padding-right: 0px; display: inline; padding-left: 0px; padding-bottom: 0px; margin: 0px; padding-top: 0px"><span class="tags">tags: 
		<a href="http://technorati.com/tags/silverlight/" rel="tag">silverlight</a>
		, 
		<a href="http://technorati.com/tags/phpflickr/" rel="tag">phpflickr</a>
		, 
		<a href="http://technorati.com/tags/php/" rel="tag">php</a>
		, 
		<a href="http://technorati.com/tags/flickr/" rel="tag">flickr</a>
		</span></div>
