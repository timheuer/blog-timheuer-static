---
title: "Silverlight 3 Out-of-browser Update Model"
slug: "silverlight-3-offline-update-framework"
pubDate: 2009-03-18T22:24:27.000Z
lastModified: 2019-10-23T04:20:28.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "mix09"
  - "air"
  - "adobe air"
  - "oob"
  - "sloob"
  - "offline"
  - "detach"
draft: false
---

<p><span style="font-weight: bold; color: rgb(255, 0, 0);">PLEASE READ UPDATE: While the API for checking for updates has changed, the update model *after* that method call to CheckAndDownloadUpdateAsync is the same as described below.  <a href="http://timheuer.com/blog/archive/2009/07/10/silverlight-3-released-what-is-new-and-changed.aspx#oob">See this note for updates</a> since this article to the Out-of-browser experiences.</span><br />
</p>
<p>Wednesday at <strong><a href="http://live.visitmix.com">MIX09</a></strong> was a great day.  I was exhausted, but after the keynote I was so high on excitement it was great.  Throughout the day <a href="http://twitter.com/timheuer">Twitter</a> was buzzing (or is it fizzing?) about all the news around <a href="http://silverlight.net/"><strong>Silverlight</strong></a><strong> 3</strong>.  In one conversation around the out-of-browser experiences with Silverlight, I caught a conversation on Twitter about it with questions about the update model.  I jumped in which resulted in this twittersation (sorry, couldn’t resist):</p>
<p><img src="http://storage.timheuer.com/oobtwittersation.png" alt="Twitter conversation" title="Twitter conversation" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>So, instead of trying to cram it in 140 characters, I’ll explain here how it works, and take the liberty of using just slightly more than 140 characters. </p>
<blockquote>
<p>If you aren’t familiar with the Silverlight Out-of-browser experiences (lovingly referred to as a SLOOB – nod to <a href="http://twitter.com/bryantlikes">@bryantlikes</a>), you may want to read my previous post which is <a href="http://timheuer.com/blog/archive/2009/03/18/silverlight-3-whats-new-a-guide.aspx#oob">a guide to the new features in Silverlight 3</a> as well as <a href="http://silverlight.net/learn/learnvideo.aspx?video=187318">view this video</a> demonstrating the feature.</p>
</blockquote>
<h2>Detaching the application</h2>
<p>The first time your users will view your application it will be in the web context in a page somewhere.  If your application is enabled for out-of-browser (OOB) experiences, then the user can detach the application via a user-initiated action (context menu or some function in your application that calls Detach()).  That process then immediately does a few things:</p>
<p><img src="http://storage.timheuer.com/detach.png" alt="SLOOB Detach" title="SLOOB Detach" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>This action takes the browser (for our example let’s say being served up at http://foo.com/mysloob.xap) and creates an OOB application.  What happens here is the following:</p>
<ul>
    <li>The application (XAP) is requested again via the browser </li>
    <li>The XAP gets stored locally in a low trust location along with metadata which includes the origin URI of the XAP as well as metadata, most importantly for this discussion the ETag information of when it was downloaded (timestamp essentially) </li>
</ul>
<h2>The first OOB launch</h2>
<p>Now we are all good.  If we close the application and launch it again from the desktop now we’d initiate a startup of the application:</p>
<p><img src="http://storage.timheuer.com/launch1.png" alt="SLOOB Launch 1" title="SLOOB Launch 1" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>What happens in this instance is basically the application looks at it’s metadata for the origin URI of the XAP and makes a request there with.  It compares the HTTP response data (code and ETag) for comparison.  If the app wasn’t updated, then the app launches and all is well.  In fact inspecting the request it would look something like this for our app:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> GET /silverlight/oob/ClientBin/OutOfBrowser.xap HTTP/1.1</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> If-Modified-Since: Thu, 19 Mar 2009 03:52:35 GMT</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span> User-Agent: Silverlight</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span> Host: timheuer.com</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span> X-P2P-PeerDist: Version=1.0</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span> Accept-Encoding: peerdist</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum9" style="color: rgb(96, 96, 96);">   9:</span> HTTP/1.1 304 Not Modified</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum10" style="color: rgb(96, 96, 96);">  10:</span> Last-Modified: Thu, 19 Mar 2009 03:52:15 GMT</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum11" style="color: rgb(96, 96, 96);">  11:</span> Accept-Ranges: bytes</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum12" style="color: rgb(96, 96, 96);">  12:</span> ETag: <span style="color: rgb(0, 96, 128);">"f2e3a81746a8c91:445"</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum13" style="color: rgb(96, 96, 96);">  13:</span> X-Powered-By: ASP.NET</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum14" style="color: rgb(96, 96, 96);">  14:</span> Date: Thu, 19 Mar 2009 03:55:18 GMT</pre>
<!--CRLF--></div>
</div>
<p>Notice the HTTP 304 Not Modified response.  No further information is sent and we can see that no content was even delivered.  The app hasn’t changed.  At the API level, Application.Current.ExecutionState is not triggered for a DetachedUpdatesAvailable state change.</p>
<h2>Application updated, user launches from desktop</h2>
<p>Now let’s update the application and upload to our server.  The next time the user launches the application, the same requests happen:</p>
<p><img src="http://storage.timheuer.com/launch2.png" alt="SLOOB Launch 2" title="SLOOB Launch 2" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>  </p>
<p>Again, the requests are made sending the metadata information.  In this case though, there is an update.  What happens next is two fold.  Along with the response being sent with a new timestamp/ETag, the request also includes the bits of the updated application.  Looking at the request it would look like:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> GET /silverlight/oob/ClientBin/OutOfBrowser.xap HTTP/1.1</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> If-Modified-Since: Thu, 19 Mar 2009 03:52:35 GMT</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span> User-Agent: Silverlight</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span> Host: timheuer.com</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span> X-P2P-PeerDist: Version=1.0</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span> Accept-Encoding: peerdist</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum9" style="color: rgb(96, 96, 96);">   9:</span> HTTP/1.1 200 OK</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum10" style="color: rgb(96, 96, 96);">  10:</span> Content-Length: 15557</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum11" style="color: rgb(96, 96, 96);">  11:</span> Content-Type: application/x-silverlight-app</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum12" style="color: rgb(96, 96, 96);">  12:</span> Last-Modified: Thu, 19 Mar 2009 03:56:29 GMT</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum13" style="color: rgb(96, 96, 96);">  13:</span> Accept-Ranges: bytes</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum14" style="color: rgb(96, 96, 96);">  14:</span> ETag: <span style="color: rgb(0, 96, 128);">"ce39d0ae46a8c91:445"</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum15" style="color: rgb(96, 96, 96);">  15:</span> X-Powered-By: ASP.NET</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum16" style="color: rgb(96, 96, 96);">  16:</span> Date: Thu, 19 Mar 2009 03:56:45 GMT</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum17" style="color: rgb(96, 96, 96);">  17:</span> &lt;data&gt;</pre>
<!--CRLF--></div>
</div>
<p>Where “&lt;data&gt;” in the snippet above would actually be the bytes (notice the Content-Length and Content-Type headers) of the updated XAP.  Two things happen now:</p>
<ul>
    <li>Application.Current.ExecutionState changes to a DetachedUpdatesAvailable state.  </li>
    <li>The XAP in the local storage location is updated to the new bits. </li>
</ul>
<p>Now right now there is no option to <em>decline</em> the updated bits.  If the app is updated, your users will get them.  This is something the team is considering understanding different scenarios.  Also, there is no way to <em>force</em> the user to shutdown the app or prevent them from continuing.  You should build your app in a manner that if an update occurs that perhaps you block the UI until the update is launched.  Re-launching the application (from the local machine) would startup again with the newly downloaded bits and the updated request would look again similar to the first:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> GET /silverlight/oob/ClientBin/OutOfBrowser.xap HTTP/1.1</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> If-Modified-Since: Thu, 19 Mar 2009 03:56:49 GMT</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span> User-Agent: Silverlight</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span> Host: timheuer.com</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span> X-P2P-PeerDist: Version=1.0</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span> Accept-Encoding: peerdist</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum9" style="color: rgb(96, 96, 96);">   9:</span> HTTP/1.1 304 Not Modified</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum10" style="color: rgb(96, 96, 96);">  10:</span> Last-Modified: Thu, 19 Mar 2009 03:56:29 GMT</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum11" style="color: rgb(96, 96, 96);">  11:</span> Accept-Ranges: bytes</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum12" style="color: rgb(96, 96, 96);">  12:</span> ETag: <span style="color: rgb(0, 96, 128);">"ce39d0ae46a8c91:445"</span></pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum13" style="color: rgb(96, 96, 96);">  13:</span> X-Powered-By: ASP.NET</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum14" style="color: rgb(96, 96, 96);">  14:</span> Date: Thu, 19 Mar 2009 03:57:12 GMT</pre>
<!--CRLF--></div>
</div>
<p>And that’s the basic mechanism of it.  When an application is detached, metadata is stored about that app.  Each launch it does a check against that metadata to see if an update is visible.  If the app is offline, that’s fine, it won’t block the app from launching.  This is very similar to the .NET Framework’s ClickOnce concept in deployment.</p>
<h2>Contrast with Adobe AIR Update Framework</h2>
<p>Kevin asked me to contrast that with how AIR does it because he felt that “<em>in AIR, very straightforward</em>.”  Now, as you can also see in the initial conversation, I admitted not knowing how AIR worked.  I’m basing the following (and I won’t go deep to get myself into “you’re an idiot” trouble) off of my research in the Adobe AIR developer tutorial on <em><a href="http://www.adobe.com/devnet/air/articles/air_update_framework.html">Using the Adobe AIR Update Framework</a></em>.  </p>
<p>Now as far as I can tell, first the update framework is not a part of the core AIR runtime and [UPDATE] is avialable in the AIR 1.5 SDK (thanks David for the note) <strike>is a separate plugin/module/whatever-term-would-be-appropriate-for-the-runtime for AIR</strike>.  Mihai in the tutorial points to needing to download the update framework which apparently is a lab framework (I’m not sure if that means beta, supported or what – if someone knows please comment)?</p>
<p>Once the framework is included the next step is that the developer has to create an update manifest which is described as:</p>
<blockquote>
<p><em>This is a small XML file that keeps information needed by the updater (for example, what version is available, from where to take it, and what info to display). This file sits on your server, and when the application starts up it loads this file to see if any updates are available.</em></p>
</blockquote>
<p>Essentially a file sitting on some location that the app can retrieve (presumably a web server).  The developer then implements an event handler on the AIR WindowApplication.creationComplete event to check for an update.  This includes about 10-15 lines of code to tell the update framework where the manifest file is and to attach to some additional event handlers and code.  When the update is noticed and needed a prompt will occur and AIR has a default UI that would be shown:</p>
<p><img src="http://www.adobe.com/devnet/air/articles/air_update_framework/fig05.jpg" alt="Adobe AIR Update Dialog" title="Adobe AIR Update Dialog" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>I like the default UI, it’s informative.  Notice the <em>Release Notes</em> information.  This information comes from the manifest file.  I like that too…good idea.</p>
<p>What it appears to me though is that when the developer has an update the manifest needs to be manually updated or no update events would be triggered.  Perhaps that’s a good thing for granular control over optional events.  I couldn’t find information if you can modify whether “Download Later” was an option or not (thus forcing an update). </p>
<h2>Summary</h2>
<p>So there you have it.  In Silverlight 3 you have a framework to enable you to auto update your bits.  We’re still in beta so things may change and we know there are questions that you may have on our model (if you have those questions, please leave a comment here).  In AIR you have a framework <strike>that doesn’t appear to be a part of the core runtime but</strike> that provides the same methods for providing notification to your users.  If I’ve gotten my interpretation of the AIR tutorial wrong, please someone kindly correct me as it wouldn’t have been my intent to do so.</p>
<p>I hope this helps understand the model.  If it didn’t, then perhaps I should have just used 140 characters.</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:87490d42-df0f-4e29-b0f4-6e661a1cc221" style="margin: 0px; padding: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
