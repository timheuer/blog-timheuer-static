---
title: "Making use of your JSON data in Silverlight"
slug: "use-json-data-in-silverlight"
pubDate: 2008-05-06T13:40:14.000Z
lastModified: 2019-10-23T04:20:18.000Z
categories:
  - "silverlight"
  - "json"
  - "ajax"
  - "wcf"
  - "rest"
  - "services"
  - "web services"
  - "webget"
  - "enablescriptmethod"
  - "webhttpbinding"
draft: false
---

<p>Wait! Don’t throw out your JSON services!</p>
<p><strong><u>The Situation</u></strong></p>
<p>You’ve made an investment in exposing some services for client script consumption.  Most likely if you did it in the past 2 years, that involved exposing your data as <a href="http://en.wikipedia.org/wiki/JSON">JSON</a> formatted objects.</p>
<blockquote>
<p><em>What is JSON?</em> <br />
It is a text-based, human-readable format for representing simple data structures and associative arrays (called objects)</p>
</blockquote>
<p>Perhaps a search service returns a list of people formatted using your custom “Person” object and you’ve been using this in your AJAX applications for a while now.  Maybe your JSON data looks something like this:</p>
<pre class="csharpcode">[{<span class="str">"City"</span>:<span class="str">"Queen Creek"</span>,<span class="str">"FirstName"</span>:<span class="str">"Tim"</span>,<span class="str">"LastName"</span>:<span class="str">"Heuer"</span>,
<span class="str">"Website"</span>:<span class="str">"http:\/\/timheuer.com\/blog\/"</span>},
{<span class="str">"City"</span>:<span class="str">"Portland"</span>,<span class="str">"FirstName"</span>:<span class="str">"Scott"</span>,<span class="str">"LastName"</span>:<span class="str">"Hanselman"</span>,
<span class="str">"Website"</span>:<span class="str">"http:\/\/hanselman.com\/blog\/"</span>},
{<span class="str">"City"</span>:<span class="str">"Redmond"</span>,<span class="str">"FirstName"</span>:<span class="str">"Scott"</span>,<span class="str">"LastName"</span>:<span class="str">"Guthrie"</span>,
<span class="str">"Website"</span>:<span class="str">"http:\/\/weblogs.asp.net\/scottgu"</span>},
{<span class="str">"City"</span>:<span class="str">"New Hampshire"</span>,<span class="str">"FirstName"</span>:<span class="str">"Joe"</span>,<span class="str">"LastName"</span>:<span class="str">"Stagner"</span>,
<span class="str">"Website"</span>:<span class="str">"http:\/\/joestagner.net"</span>},
{<span class="str">"City"</span>:<span class="str">"Boston"</span>,<span class="str">"FirstName"</span>:<span class="str">"Jesse"</span>,<span class="str">"LastName"</span>:<span class="str">"Liberty"</span>,
<span class="str">"Website"</span>:<span class="str">"http:\/\/silverlight.net\/blogs\/jesseliberty"</span>}]</pre>
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
<p>If you squint long enough you can see that this represents what looks like an object that would have this structure:</p>
<p><em>FirstName, LastName, City, Website</em></p>
<p>You could consume this in a Javascript function or something in the client script of your web application and nicely iterate through the array of ‘Person’ types, using some human-readable code.</p>
<p>But now you want <a href="http://silverlight.net/">Silverlight</a>!  And you think to yourself that you need to <strong>completely</strong> re-write everything to return .NET objects, etc.  Well, not so fast.</p>
<p><strong><u>JSON Serialization</u></strong></p>
<p><strong>Because</strong> Silverlight 2 supports managed code development, you have some tricks in your bag to leverage existing services that you might not want (or need) to re-write entirely or just right away.  Let’s use the simple example above and assume I now want to use that same service and the same data result in my Silverlight application.  For now let’s assume the endpoint to that service is something like <a href="http://foo/mypeople/js">http://foo/mypeople/js</a>.  Most JSON services were a result of using some type of RESTful query model, so essentially your request would likely be a simple GET or POST.</p>
<p>Using Silverlight 2 and the simple WebClient, we can easily get that information from that REST endpoint.</p>
<pre class="csharpcode">WebClient proxy = <span class="kwrd">new</span> WebClient();
proxy.OpenReadCompleted += <span class="kwrd">new</span> OpenReadCompletedEventHandler(proxy_OpenReadCompleted); 
proxy.OpenReadAsync(<span class="kwrd">new</span> Uri(<span class="str">"http://foo/mypeople/js"</span>));</pre>
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
<p>Using WebClient, we essentially open a Stream (which is our endpoint) and get the data back.  You can learn more about WebClient and other services with Silverlight by watching my videos about <a href="http://silverlight.net/learn/learnvideo.aspx?video=47177">web services</a> and other <a href="http://silverlight.net/learn/learnvideo.aspx?video=50557">HTTP-based communication</a>.  Remembering that service calls in Silverlight 2 are asynchronous, we look at our ‘proxy_OpenReadCompleted’ event and could first get our result (with proper error checking of course) which is of type Stream:</p>
<pre class="csharpcode">Stream strm = e.Result;</pre>
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
<p>Now with that stream (which is essentially the JSON data now), what do we do?  Enter <a href="http://msdn.microsoft.com/en-us/library/system.runtime.serialization.json.datacontractjsonserializer.aspx">DataContractJsonSerializer</a>.  Remember, we have this available to us thanks to the CLR being in Silverlight 2.  Before we start to use this, however, our client application must be aware of the Type we plan to de-serialize it back into.  So in our Silverlight application we need to have that type defined as such:</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">class</span> Person
{
    <span class="kwrd">public</span> <span class="kwrd">string</span> FirstName { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">string</span> LastName { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">string</span> City { get; set; }
    <span class="kwrd">public</span> <span class="kwrd">string</span> Website { get; set; }
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
<p>Simple enough.  Now we can complete our asynch handler like this and our Stream is now converted into an enumerable type that we can bind, iterate or do whatever we need to with our data.</p>
<pre class="csharpcode"><span class="kwrd">void</span> proxy_OpenReadCompleted(<span class="kwrd">object</span> sender, OpenReadCompletedEventArgs e)
{
    Stream strm = e.Result;
    DataContractJsonSerializer ser = <span class="kwrd">new</span> DataContractJsonSerializer(<span class="kwrd">typeof</span>(Person[]));
    Person[] ppl = (Person[])ser.ReadObject(strm);

    <span class="kwrd">if</span> (ppl.Length &gt; 0)
    {
        <span class="rem">// do something with the data</span>
        <span class="rem">// bind, interate, whatever</span>
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
<p>That’s it!  With a few lines of code we’ve been able to re-use our JSON service and data from Silverlight.  This might not be the best idea in all of your scenarios but it is possible if you want to transition to other services or make re-use out of your investments already.</p>
<p><strong><u>A Word About WCF Script-enabled Services</u></strong></p>
<p>For some of you, if you were already a part of the WCF wave when you created your services, you may have already exposed them as scriptable services using an endpoint behavior that was <a href="http://msdn.microsoft.com/en-us/library/bb675191.aspx">enableWebScript</a>.  This may have been working fine for you but if you look at the output of that, it might be adding some things that you may not need.  This is because it was intended for ASP.NET AJAX consumption (i.e., it adds “_type” and “_d” stuff).  This is easily rectified to make it a cleaner JSON result as well as make the messages smaller.</p>
<p>By implementing the <a href="http://msdn.microsoft.com/en-us/library/system.servicemodel.description.webhttpbehavior.aspx">webHttpBehavior</a> in conjunction with the <a href="http://msdn.microsoft.com/en-us/library/system.servicemodel.webhttpbinding.aspx">webHttpBinding</a> type for WCF, you will get a much cleaner/smaller JSON payload for your service.  When implementing this, you’ll want to decorate your service methods accordingly using the WebGet attributes:</p>
<pre class="csharpcode">[OperationContract]
[WebGet(UriTemplate=<span class="str">"people"</span>, ResponseFormat=WebMessageFormat.Json)]
Person[] GetListOfPeople();</pre>
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
<p>While I’d argue this isn’t <em>completely</em> necessary to use your existing services, it might make your type parsing a little cleaner and as noted, the message size smaller.  So using this (in fact my endpoint this whole time actually is a WCF webHttpBinding endpoint) the entire code looks something like this:</p>
<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span> Page : UserControl
{
    <span class="kwrd">public</span> Page()
    {
        InitializeComponent();
        Loaded += <span class="kwrd">new</span> RoutedEventHandler(Page_Loaded);
    }

    <span class="kwrd">void</span> Page_Loaded(<span class="kwrd">object</span> sender, RoutedEventArgs e)
    {
        WebClient proxy = <span class="kwrd">new</span> WebClient();
        proxy.OpenReadCompleted += <span class="kwrd">new</span> OpenReadCompletedEventHandler(proxy_OpenReadCompleted); 
        proxy.OpenReadAsync(<span class="kwrd">new</span> Uri(<span class="str">"http://localhost:34907/JsonData_Web/People.svc/people"</span>));
    }

    <span class="kwrd">void</span> proxy_OpenReadCompleted(<span class="kwrd">object</span> sender, OpenReadCompletedEventArgs e)
    {
        Stream strm = e.Result;
        DataContractJsonSerializer ser = <span class="kwrd">new</span> DataContractJsonSerializer(<span class="kwrd">typeof</span>(Person[]));
        Person[] ppl = (Person[])ser.ReadObject(strm);

        <span class="kwrd">if</span> (ppl.Length &gt; 0)
        {
            
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
<p>Easy enough.  If you want to know more about the WCF binding types and implementing full REST services in WCF, check out <a href="http://www.robbagby.com">Rob Bagby’s blog</a>…he has a lot of good material there.</p>
<p><strong><u>Summary</u></strong></p>
<p>If you have existing services that you’ve enabled JSON responses for already for use in AJAX applications, consider making re-use of them where appropriate.  This may bridge a transition to other WCF endpoints or other service-types while you are writing your Silverlight applications.</p>
<p>I’ve included my sample project used here so you can tinker and you can download the code <a href="http://s3.amazonaws.com:80/timheuer-img/JsonData.zip">here</a>.</p>
<p>Hope this helps!</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:7fbe798c-aed6-40d6-81e6-fb0ce442fb29" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>

