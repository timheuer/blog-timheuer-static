---
title: "Silverlight for WordPress"
slug: "silverlight-for-wordpress-plugin"
pubDate: 2009-03-28T17:06:36.000Z
lastModified: 2019-10-23T04:20:28.000Z
categories:
  - "silverlight"
  - "xaml"
  - "blog"
  - "blogging"
  - "wordpress"
  - "wordpress plugin"
  - "blogger"
  - "cms"
draft: false
---

<p>I’ve made no hiding the fact that my blog is build on Subtext and that I’m very happy with it right now.  Lately though my wife has been blogging more (that’s another story) and she also started her own business.  Being curious about all the <strong>WordPress</strong> love, I decided to start checking it out.</p>
<p>Thankfully, the <a href="http://timheuer.com/blog/archive/2009/03/25/wordpress-installed-in-5-minutes-web-platform-installer.aspx">Web Platform Installer helped me get started</a> on WordPress without any troubles at all and I was up and running on my Windows server (I didn’t want to start another hosting account anywhere).  I have to say, I really like what WordPress has done, especially with the extensibility points and the administration options.  </p>
<p>That being said, I started looking at the various plugins available and was curious about anything for <a href="http://silverlight.net/">Silverlight</a>…to be able to easily put Silverlight content within a post like other plugins have enabled.  Sure, it isn’t a difficult task to begin with, but sometimes different hosts/tools make it difficult for us to add &lt;object&gt; type content.  After some searching in the WordPress plugin library, I found one that was built back in the Silverlight 2 beta days.  The link to the author was no longer valid so I decided to create one using that as a base.</p>
<blockquote>
<p>NOTE: I totally failed my Internet duties to look via any search for one…I kept my searching to the official plugin directory.  Apologies to Peter Loebel for not recognizing he also did some work, but admittedly it was also during the beta days.  I’ve credited both Peter and Juergen Oberngruberin my readme.txt for the plugin as contributors.</p>
</blockquote>
<p>So after a few minutes, I was able to get it working and created the <em><strong>Silverlight for WordPress</strong></em> plugin.  It’s simple and you basically can input into your post data:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> [silverlight: &lt;app&gt;, &lt;width&gt;, &lt;height&gt;, &lt;initParams&gt;, &lt;minVer&gt;]</pre>
<!--CRLF--></div>
</div>
<p>Where:</p>
<ul>
    <li>app is the URI to your Silverlight application (XAP) </li>
    <li>width/height should be obvious </li>
    <li>initParams will map to the initParams of your application </li>
    <li>minVer maps to the minRuntimeVersion required for your app </li>
</ul>
<p>The only parameter required is &lt;app&gt; and all others are optional and have defaults which you can change via the plugin settings:</p>
<p><img src="http://storage.timheuer.com/slwp-settings.png" alt="Silverlight for WordPress default settings" title="Silverlight for WordPress default settings" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p><strike>I’ve applied yesterday to put the plugin in the official WordPress plugin directory, but haven’t heard back yet and they don’t really have any SLA.  I’m hoping to get it in soon, because they have a good discovery model for updates, etc. and authors can install in one click.  For now, I’m also going to maintain a link to the current version with release notes on my site here: <strong><a href="http://timheuer.com/silverlight-for-wordpress">Silverlight for WordPress</a></strong>.</strike></p>
<p>UPDATE: Silverlight for WordPress is now available in the plugins directory…just search on Silverlight.</p>
<p>Like I said, it’s simple (and perhaps dumb to some), but I look to your input.  Hopefully some WordPress authors may be able to use it.  I know my wife’s new photography site will :-).</p>
<p>Hope this helps!</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:d244e989-f1bf-44ea-a8d2-786e65aa99b0" style="margin: 0px; padding: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
