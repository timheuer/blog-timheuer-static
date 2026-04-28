---
title: "Silverlight Flickr Badge"
slug: "silverlight-flickr-badge"
pubDate: 2008-05-19T12:03:03.000Z
lastModified: 2019-10-23T04:20:18.000Z
categories:
  - "silverlight streaming"
  - "silverlight"
  - "flickr"
  - "ria"
  - "rest"
  - "joel"
  - "joel neubeck"
  - "webclient"
draft: false
---

<p>Taking another cue from some great stuff <a href="http://joel.neubeck.net">Joel</a> is doing, I liked his implementation of the ‘Leopard Screen Saver’ but wanted to make it more ‘real’ for me.  So I wired it up to my Flickr account.  Result here (using <a href="http://silverlight.live.com">Silverlight Streaming</a>):</p>
<p><iframe style="WIDTH: 400px; HEIGHT: 400px" src="http://silverlight.services.live.com/invoke/217/FlickrBadge/iframe.html?u=timheuer&amp;n=100" frameborder="0" scrolling="no"></iframe></p>
<p>I only had to change a few things.</p>
<p>First, in the Page_Loaded event, I removed the timer start function.  This was because with interacting with Flickr it was going to be async.  I didn’t want the timer to start until I knew the image collection was built.</p>
<p>My BuildCollection function now looks like this:</p>
<pre class="csharpcode"><span class="kwrd">private</span> <span class="kwrd">void</span> BuildCollection()
{
    <span class="rem">// get Flickr NSID</span>
    WebClient fu = <span class="kwrd">new</span> WebClient();
    fu.DownloadStringCompleted += <span class="kwrd">new</span> DownloadStringCompletedEventHandler(fu_DownloadStringCompleted);
    fu.DownloadStringAsync(<span class="kwrd">new</span> Uri(<span class="kwrd">string</span>.Format(FLICKR_USER_SEARCH, App.FlickrUser)));
}</pre>
<style type="text/css"><![CDATA[

.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }]]></style>
<p>This is a first call to get the NSID (internal Flickr user_id parameter) based on an initParam the user sends in.  The FLICKR_USER_SEARCH is just a const string parameter to the Flickr API rest call (with my API key in it) which looks like this:</p>
<pre class="csharpcode"><span class="kwrd">const</span> <span class="kwrd">string</span> FLICKR_USER_SEARCH = <span class="str">"http://api.flickr.com/services/rest/?method=flickr.urls.lookupuser
    &amp;api_key=[yours]
    &amp;url=http://flickr.com/photos/{0}"</span>;</pre>
<style type="text/css"><![CDATA[

.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }]]></style>
<p>I also use a FLICKR_USER_PHOTOS const which is like this:</p>
<pre class="csharpcode"><span class="kwrd">const</span> <span class="kwrd">string</span> FLICKR_USER_PHOTOS = <span class="str">"http://api.flickr.com/services/rest/?method=flickr.photos.search
    &amp;user_id={0}
    &amp;api_key=[yours]"</span>;</pre>
<style type="text/css"><![CDATA[

.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }]]></style>
<p>The completed event handler for the user search call looks like:</p>
<pre class="csharpcode"><span class="kwrd">void</span> fu_DownloadStringCompleted(<span class="kwrd">object</span> sender, DownloadStringCompletedEventArgs e)
{
    XDocument resp = XDocument.Parse(e.Result);

    <span class="kwrd">string</span> nsid = resp.Element(<span class="str">"rsp"</span>).Element(<span class="str">"user"</span>).Attribute(<span class="str">"id"</span>).Value;

    WebClient p = <span class="kwrd">new</span> WebClient();
    p.DownloadStringCompleted += <span class="kwrd">new</span> DownloadStringCompletedEventHandler(p_DownloadStringCompleted);
    p.DownloadStringAsync(<span class="kwrd">new</span> Uri(<span class="kwrd">string</span>.Format(FLICKR_USER_PHOTOS, nsid)));
}</pre>
<style type="text/css"><![CDATA[

.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }]]></style>
<p>to retrieve the NSID.  With that I then start the search photos call to retrieve 42 photos.  The sample is a little hard-coded with count values, but this is just a quick change to see if it would work.  When the async operation to search the photos returns, I use some LINQ to mash them into FlickrImage object types using a custom class I put in my <a href="http://silverlight.net">Silverlight</a> application.</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> FlickrImage
{
    <span class="kwrd">public</span> <span class="kwrd">string</span> id { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">string</span> farm { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">string</span> server { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">string</span> secret { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">string</span> title { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">int</span> tagid { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">string</span> url
    {
        get
        {
            <span class="kwrd">return</span> <span class="kwrd">string</span>.Format(<span class="str">"http://farm{0}.static.flickr.com/{1}/{2}_{3}_m.jpg"</span>,
               farm, server, id, secret);
        }
    }
}</pre>
<style type="text/css"><![CDATA[

.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }]]></style>
<p>and then the LINQ query:</p>
<pre class="csharpcode">XDocument xml = XDocument.Parse(e.Result);

var photos = from results <span class="kwrd">in</span> xml.Descendants(<span class="str">"photo"</span>)
             select <span class="kwrd">new</span> FlickrImage
             {
                 id = results.Attribute(<span class="str">"id"</span>).Value.ToString(),
                 farm = results.Attribute(<span class="str">"farm"</span>).Value.ToString(),
                 server = results.Attribute(<span class="str">"server"</span>).Value.ToString(),
                 secret = results.Attribute(<span class="str">"secret"</span>).Value.ToString(),
                 title = results.Attribute(<span class="str">"title"</span>).Value.ToString()
             };</pre>
<style type="text/css"><![CDATA[

.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }]]></style>
<p>Once I have these, I essentially moved the iteration code Joel had into a foreach loop for my images and <strong>then</strong> started the timer.</p>
<pre class="csharpcode"><span class="kwrd">foreach</span> (FlickrImage photo <span class="kwrd">in</span> photos)
{
    Uri imageUri = <span class="kwrd">new</span> Uri(photo.url, UriKind.Absolute);

    <span class="kwrd">if</span> (i &lt;= 16)
    {
        Tile tile = <span class="kwrd">new</span> Tile();
        Media media = <span class="kwrd">new</span> Media(imageUri, <span class="kwrd">true</span>);
        tile.Media = media;

        <span class="kwrd">if</span> (col % 4 == 0)
        {
            row++;
            col = 0;
        }
        tile.SetValue(Grid.ColumnProperty, col.ToString());
        tile.SetValue(Grid.RowProperty, row.ToString());
        <span class="kwrd">this</span>.LayoutRoot.Children.Add(tile);

        col++;
        _tiles.Add(tile);
        _images.Add(media);

    }
    <span class="kwrd">else</span>
        _images.Add(<span class="kwrd">new</span> Media(imageUri, <span class="kwrd">false</span>));

    i++;
}

_timer.Start();</pre>
<style type="text/css"><![CDATA[

.csharpcode, .csharpcode pre
{
	font-size: small;
	color: black;
	font-family: consolas, "Courier New", courier, monospace;
	background-color: #ffffff;
	/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt 
{
	background-color: #f4f4f4;
	width: 100%;
	margin: 0em;
}
.csharpcode .lnum { color: #606060; }]]></style>
<p>The result is the same visual sample Joel had, but using my live Flickr photos from my gallery.  This is made possible because Flickr has a) a REST api and b) a valid cross-domain policy file.  Both of these enable Silverlight to be a great client for consuming this data.  The visualization could be enhanced to provide mouse-over effects to zoom the picture I suppose, but I’ll get to that later.  Pretty fun that just a few changes (and none to XAML) enabled me to make this real for me.</p>
<p>The <a href="http://s3.amazonaws.com:80/timheuer-img/LeopardSreenSaver-timheuer.zip">code for my changes is here</a> but note you must have your own Flickr API key from their site.  I also implemented supporting an initParams value so you can pass in the Flickr user name dynamically.  </p>
<p><strong>UPDATE: To use the initParams capability and display a badge for your Flickr account, you can use an &lt;iframe&gt; tag and point to <font face="Arial">http://silverlight.services.live.com/invoke/217/FlickrBadge/iframe.html?u=[yourflickrname] where the [yourflickrname] is the last part of your Flickr photos url.  For example if your account is at http://flickr.com/photos/<font style="BACKGROUND-COLOR: #ffff00">uhoh_over</font> than you would use <font face="Arial">http://silverlight.services.live.com/invoke/217/FlickrBadge/iframe.html?u=<font style="BACKGROUND-COLOR: #ffff00">uhoh_over</font>.</font></font></strong></p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:cf3cc8f4-9899-4cdb-8186-04eacdc35dac" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
<p> </p>

