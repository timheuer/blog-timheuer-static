---
title: "Simulate Geo Location in Silverlight Windows Phone 7 emulator"
slug: "geo-location-services-in-windows-phone-7-developer-emulator"
pubDate: 2010-03-22T09:17:20.000Z
lastModified: 2019-10-23T04:20:34.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "gps"
  - "wp7dev"
  - "wp7"
  - "windows-phone"
  - "location"
draft: false
---

<p>If you’ve been excited about Windows Phone 7 development and the platform being <a href="http://silverlight.net">Silverlight</a> for application development, you probably <a href="http://silverlight.net/getstarted/devices/windows-phone">rushed and downloaded all the tools</a> (which are free by the way).  You may have even got the samples from the SDK and noticed the Location services example…but wondered why it doesn’t work.</p>
<blockquote>
<p>If you are just getting started, I created some quickstart videos to help you through some of the basics.  You can <a href="http://www.silverlight.net/learn/videos/windows-phone/">view them here</a>.</p>
</blockquote>
<p>In case you haven’t figured it out: Location services (aka, GPS) is not emulated in the developer tools CTP.  </p>
<p>As you might expect, this makes it difficult to play around with location-based applications.</p>
<p>The API in Windows Phone 7 revolves around the <a href="http://msdn.microsoft.com/en-us/library/system.device.location.geocoordinatewatcher%28VS.92%29.aspx">GeoCoordinateWatcher</a> class.  This class is what you would initialize to start listening for events:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> GeoCoordinateWatcher watcher = <span class="kwrd">new</span> GeoCoordinateWatcher(GeoPositionAccuracy.Low);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span> watcher.StatusChanged += <span class="kwrd">new</span> EventHandler&lt;GeoPositionStatusChangedEventArgs&gt;(watcher_StatusChanged);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span> watcher.PositionChanged += <span class="kwrd">new</span> EventHandler&lt;GeoPositionChangedEventArgs&lt;GeoCoordinate&gt;&gt;(watcher_PositionChanged);</pre>
<!--CRLF--></div>
</div>
<p>As you can see, this watcher class looks for Status and Position changes.  The status is about the device peripheral itself (initializing, reading, etc.).  Position is more likely what you are interested in and would give you the details of where the device is reading the current location (longitude and latitude).  In the emulator right now the status will always return Disabled.</p>
<p>It’s relatively simple to simulate this, and here’s a <em>really simple</em> mock class for doing so.  Now, note this is not a complete emulation of the Location services APIs for Windows Phone 7 SDK.  This mock is to simply simulate a coordinate location and position changing.  The GeoLocationMock class implements the IGeoPositionWatcher&lt;GeoCordinate&gt; interface for mocking the location service.  There is a Start, Stop, PositionChanged and StatusChanged methods and events (TryStart is implemented, but simply calls Start).  To implement the mock in your application you would instantiate watcher (using above sample) as IGeoPositionWatcher&lt;GeoCoordinate&gt; instead of the GeoCoordinateWatcher specifically.  Here is a sample, and then an explanation:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span> MainPage : PhoneApplicationPage</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     IGeoPositionWatcher&lt;GeoCoordinate&gt; watcher;</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span> }</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> StartLocationService(GeoPositionAccuracy accuracy)</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span> {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum8">   8:</span>     <span class="kwrd">if</span> (watcher == <span class="kwrd">null</span>)</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum9">   9:</span>     {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum10">  10:</span>         GeoCoordinateEventMock[] events = <span class="kwrd">new</span> GeoCoordinateEventMock[] {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum11">  11:</span>             <span class="kwrd">new</span>  GeoCoordinateEventMock { Latitude=34.4, Longitude=11.2, Time=<span class="kwrd">new</span> TimeSpan(0,0,5) },</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum12">  12:</span>             <span class="kwrd">new</span>  GeoCoordinateEventMock { Latitude=31.4, Longitude=21.2, Time=<span class="kwrd">new</span> TimeSpan(0,0,1) },</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum13">  13:</span>             <span class="kwrd">new</span>  GeoCoordinateEventMock { Latitude=34.3, Longitude=28.2, Time=<span class="kwrd">new</span> TimeSpan(0,0,2) },</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum14">  14:</span>             <span class="kwrd">new</span>  GeoCoordinateEventMock { Latitude=32.4, Longitude=34.2, Time=<span class="kwrd">new</span> TimeSpan(0,0,3) },</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum15">  15:</span>             <span class="kwrd">new</span>  GeoCoordinateEventMock { Latitude=31.2, Longitude=37.2, Time=<span class="kwrd">new</span> TimeSpan(0,0,4) },</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum16">  16:</span>             <span class="kwrd">new</span>  GeoCoordinateEventMock { Latitude=33.73, Longitude=39.2, Time=<span class="kwrd">new</span> TimeSpan(0,0,5) },</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum17">  17:</span>             <span class="kwrd">new</span>  GeoCoordinateEventMock { Latitude=31.87, Longitude=41.2, Time=<span class="kwrd">new</span> TimeSpan(0,0,6) },</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum18">  18:</span>             <span class="kwrd">new</span>  GeoCoordinateEventMock { Latitude=11.81, Longitude=42.2, Time=<span class="kwrd">new</span> TimeSpan(0,0,7) }</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum19">  19:</span>         };</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum20">  20:</span>     </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum21">  21:</span>         watcher = <span class="kwrd">new</span> EventListGeoLocationMock(events);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum22">  22:</span>         watcher.StatusChanged += <span class="kwrd">new</span> EventHandler&lt;GeoPositionStatusChangedEventArgs&gt;(watcher_StatusChanged);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum23">  23:</span>         watcher.PositionChanged += <span class="kwrd">new</span> EventHandler&lt;GeoPositionChangedEventArgs&lt;GeoCoordinate&gt;&gt;(watcher_PositionChanged);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum24">  24:</span>     }</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum25">  25:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum26">  26:</span>     watcher.Start();</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum27">  27:</span> }</pre>
<!--CRLF--></div>
</div>
<p>The ‘watcher’ is created using a list of geo location points in this sample above.  Now this could be some web service that does IP address reverse lookup or use hard-coded examples as well like I’ve done above.  Using this mock above and replacing it in the LocationServiceSample in the SDK, here’s what my screenshot shows:</p>
<p><img src="http://storage.timheuer.com/WP7-GeoMock.gif" alt="Geo location services mock for Windows Phone 7" title="Geo location services mock for Windows Phone 7" style="margin: 0px auto; display: block; float: none;" /></p>
<p>So you can see I can start the GPS emulation and simulate subtle position changes (or drastic ones if I wanted, aka maybe a social network map application of sorts).</p>
<p>Hopefully this little snippet will be valuable to play around with or expand upon for your needs.  If anything, you can create some emulation of the behavior temporarily.  The mock object used in a modified LocationServiceSample project can be downloaded here: <a href="http://storage.timheuer.com/LocationServiceSampleWithMock.zip">LocationServiceSampleWithMock.zip</a>.</p>
<p>Hope this helps! <br />
</p>
<p><strong>UPDATE:</strong> <a href="http://live.visitmix.com/MIX10/Sessions/CL17">Peter Torr</a> actually had another geo location mock in his MIX10 talk which his code is now available for download.  It is much more comprehensive emulating accuracy, etc.  The above is a simpler approach, but both will get the job done depending on what you really need/want to emulate.<br />
</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:e1c7096d-9010-443e-ad20-aea3cf708e56" style="padding: 0px; margin: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
