---
title: "Calling web services with Silverlight 2"
slug: "calling-web-services-with-silverlight-2"
pubDate: 2008-03-14T18:37:48.000Z
lastModified: 2019-10-23T04:20:17.000Z
categories:
  - "silverlight"
  - "flickr"
  - "linq"
  - "wcf"
  - "rest"
  - "asmx"
  - "web service"
  - "crossdomainxml"
  - "cross domain"
draft: false
---

<p><strong>UPDATE: Source code posted <a href="http://timheuer-img.s3.amazonaws.com/CallingServices.zip">here</a>.</strong></p>
<p>Now that <strong><a href="http://silverlight.net/">Silverlight</a></strong> 2 is out to the masses (even in beta form), there are likely a lot of developers looking to wire-up web services with their applications in .NET rather than the Silverlight 1.0 method of Javascript.  I thought I'd give you some quick examples of how to do this using some different methods: <strong>ASP.NET</strong> Web Services (ASMX), <strong>Windows Communication Foundation</strong> (WCF), <strong>REST</strong> service, and talk about cross-domain calls.  These are meant to be examples using very much 'hello world' style services, but demonstrating at least how to execute the call.</p>
<p>If you are an ASP.NET developer, you likely are familiar with ASMX web services and the fact that they generate WSDL for anyone looking at their endpoint.  Basically you write some code, host it some where and anyone can call it.  Most of the time, the caller will be using <strong>SOAP</strong> to connect unless you also enabled other methods on that service.  When consuming the ASMX service you probably used Add Web Reference in Visual Studio and then did something like this:</p>
<pre class="csharpcode">SimpleWebServiceSoapClient svc = <span class="kwrd">new</span> SimpleWebServiceSoapClient();
<span class="kwrd">string</span> returnValue = svc.HelloWorld();</pre>
<p>Fine and simple.  A few lines of code and you are calling your service getting it back value data.  This is a synchronous call.  Of course there are ways to make async calls with ASMX services, but my point is that most typical implementations of ASMX services aren't like that from what I've seen in casual use.  This is where Silverlight may differ for these developers.  In Silverlight 2, all service calls are asynchronous.  Let's take a look at how this is accomplished.</p>
<p>I'm going to use the same application throughout this sample.  The user interface is quite lame, but that's not what this is about.  I'm using a TextBox, TextBlock, and three Buttons all in a <strong>StackPanel</strong> layout.  =Hhere's what it looks like:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/slsvc-1.png" /></p>
<p>That represents the Silverlight application.  In the web project hosting the Silverlight app, I have 2 services: "SimpleAsmx" and "WcfService" -- aptly named so that they clearly represent the implementing technology.  They are both simple services that expose a method that takes a single string param and basically outputs it back out.  Again, the service portion is not what I'm concentrating on here -- I'm looking at the calling of the service.</p>
<p>Now that we have our layout and our web services, let's start tying them together.  My project looks like this for reference:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/slsvc-2.png" /></p>
<p><strong><u>ASMX Web Service</u></strong></p>
<p>In our Silverlight application, I'm going to choose to 'Add Service Reference' from Visual Studio.  This is the same method of previous 'Add Web Reference' but renamed essentially.  When I do that I click Discover and it finds my ASMX service which I select (and rename to AsmxService):</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/slsvc-3.png" /></p>
<p>Once I have done that, Visual Studio has wired up a proxy object for me to use in my code.  In my Silverlight application I wire up the Click event in my ASMX Button to an event handler and start writing code.  The first thing you will notice is that implementing the service isn't the same as previously like noted above.  Using ASMX services in Silverlight still uses SOAP, but it also uses the same model of calling a WCF service, which means you have to define a binding and endpoint.  For our ASMX service our binding will be a BasicHttpBinding and our endpoint is our URI to the .asmx file):</p>
<p><strong><font color="#ff0000">UPDATE 19-MAR</font>: The code below will absolutely work (specifying the binding and endpoint information).  However, you can also choose not to specify the binding/endpoint and it should still work.  For the WCF service code below, if you don't change the wsHttpBinding to basicHttpBinding BEFORE you make the service reference in your Silverlight application, then you will have to update your service reference in your Silverlight app (simply right-click on the service and choose 'update service reference').  Doing this will generate the correct proxy code for basicHttpBinding and enable you to just call the code using proxy.YourService() as a constructor rather than using a binding and endpoint.</strong></p>
<pre class="csharpcode">BasicHttpBinding bind = <span class="kwrd">new</span> BasicHttpBinding();
EndpointAddress endpoint = <span class="kwrd">new</span> EndpointAddress(<span class="str"><a href="http://localhost/SimpleAsmx.asmx">http://localhost/SimpleAsmx.asmx</a></span>);</pre>
<p>Now that we have those lines, we can new up our service, noticing that the constructor accepts a binding/endpoint for us, so we pass those in:</p>
<pre class="csharpcode">SimpleAsmxSoapClient asmx = <span class="kwrd">new</span> SimpleAsmxSoapClient(bind, endpoint);</pre>
<p>The next step is to call our service.  Remember, we are doing things asynchronously.  So first, we wire up the async handler for when the service is called:</p>
<pre class="csharpcode">asmx.HelloWorldWithAsmxCompleted += 
   <span class="kwrd">new</span> EventHandler&lt;HelloWorldWithAsmxCompletedEventArgs&gt;(asmx_HelloWorldWithAsmxCompleted);</pre>
<p>After that we can now call the service.  The resulting full code looks something like this:</p>
<pre class="csharpcode"><span class="kwrd">private</span> <span class="kwrd">void</span> AsmxServiceButton_Click(<span class="kwrd">object</span> sender, RoutedEventArgs e)
{
    BasicHttpBinding bind = <span class="kwrd">new</span> BasicHttpBinding();
    EndpointAddress endpoint = <span class="kwrd">new</span> EndpointAddress(<span class="str">"http://localhost/SimpleAsmx.asmx"</span>);

    SimpleAsmxSoapClient asmx = <span class="kwrd">new</span> SimpleAsmxSoapClient(bind, endpoint);
    asmx.HelloWorldWithAsmxCompleted += 
       <span class="kwrd">new</span> EventHandler&lt;HelloWorldWithAsmxCompletedEventArgs&gt;(asmx_HelloWorldWithAsmxCompleted);
    asmx.HelloWorldWithAsmxAsync(StringToEmit.Text);
}</pre>
<p>The event handler for our Completed event looks like this:</p>
<pre class="csharpcode"><span class="kwrd">void</span> asmx_HelloWorldWithAsmxCompleted(<span class="kwrd">object</span> sender, HelloWorldWithAsmxCompletedEventArgs e)
{
    OutputString.Text = <span class="kwrd">string</span>.Format(<span class="str">"Output from ASMX: {0}"</span>, e.Result.ToString());
}</pre>
<p>Basically when the event completes, the arguments provide us a Result object that represents the return type, in this case a String.  I can then put that string in my TextBlock as output.  And there you have it...we've called a simple ASMX web service.</p>
<p><strong><u>WCF Services</u></strong></p>
<p>Calling a WCF service isn't much different (in fact any different).  There is a couple config differences that you have to be aware of which I'll point out here.  But since ASMX services in Silverlight are implemented using the WCF constructs.  Here's the full implemented service with event handler using the same concept:</p>
<pre class="csharpcode"><span class="kwrd">private</span> <span class="kwrd">void</span> WcfServiceButton_Click(<span class="kwrd">object</span> sender, RoutedEventArgs e)
{
    BasicHttpBinding bind = <span class="kwrd">new</span> BasicHttpBinding();
    EndpointAddress endpoint = <span class="kwrd">new</span> EndpointAddress(<span class="str">"http://localhost/WcfService.svc"</span>);

    WcfServiceClient wcf = <span class="kwrd">new</span> WcfServiceClient(bind, endpoint);
    wcf.HelloWorldFromWcfCompleted += 
      <span class="kwrd">new</span> EventHandler&lt;HelloWorldFromWcfCompletedEventArgs&gt;(wcf_HelloWorldFromWcfCompleted);
    <span class="kwrd">try</span>
    {
        wcf.HelloWorldFromWcfAsync(StringToEmit.Text);
    }
    <span class="kwrd">catch</span> (Exception ex)
    {
        OutputString.Text = ex.Message;
    }
}

<span class="kwrd">void</span> wcf_HelloWorldFromWcfCompleted(<span class="kwrd">object</span> sender, HelloWorldFromWcfCompletedEventArgs e)
{
    <span class="kwrd">try</span>
    {
        OutputString.Text = <span class="kwrd">string</span>.Format(<span class="str">"Output from WCF: {0}"</span>, e.Result.ToString());
    }
    <span class="kwrd">catch</span> (Exception ex)
    {
        OutputString.Text = ex.Message;
    }
}</pre>
<p>I mentioned a config change that you have to do.  When you add a WCF service to an ASP.NET application, it alters the web.config to add some binding information.  By default it adds an endpoint configuration but adds it like this:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">endpoint</span> <span class="attr">address</span><span class="kwrd">=""</span> <span class="attr">binding</span><span class="kwrd">="wsHttpBinding"</span> <span class="attr">contract</span><span class="kwrd">="IWcfService"</span><span class="kwrd">&gt;</span></pre>
<p>Silverlight communicates using the BasicHttpBinding for WCF, so you have to change it to this (or add another endpoint with this binding):</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">endpoint</span> <span class="attr">address</span><span class="kwrd">=""</span> <span class="attr">binding</span><span class="kwrd">="basicHttpBinding"</span> <span class="attr">contract</span><span class="kwrd">="IWcfService"</span><span class="kwrd">&gt;</span></pre>
<p>And then you are done and the code should work.</p>
<p><strong><u>REST S</u></strong></p>
<p>Now let's talk about REST.  What is REST?  Representational State Transformation...<a href="http://en.wikipedia.org/wiki/Representational_State_Transfer">read about it here</a>.  REST basically takes advantage of existing HTTP verbs (GET, PUT, POST, DELETE) and enables access to actions based on those.  Because of this there is no real "contract" as you may be expecting, or WSDL definitions.  You execute a verb and you'll get a response, usually in XML.  Because there is not contract essentially, the 'Add Service Reference' won't work well for you.  Instead in Silverlight you'll want to use WebClient or HttpWebRequest.  What's the difference?  Here's the timheuer version.  WebClient is a simpler implementation doing GET requests really easily and get a response stream.  HttpWebRequest is great for when you need a bit more granular control over the request, need to send headers or other customizations.  For my sample here, I'm using WebClient because that is all I need.</p>
<p>First a note on remote web services, aka cross-domain services.  In Silverlight 1.0 you couldn't directly access cross-domain services.  In Silverlight 2, we are enabling support for doing that.  The approach we've taken so far is one where we have put the control of the access to the service to the owner of the service.  What that means is that you can't call *any* service on the web, but rather ones that have enabled permission to sites (or everyone) to call their services via rich internet applications.  Flash has enabled the same procedure for a while.  They use a policy access file called <strong>crossdomain.xml</strong>.  You can read more about this format at <strong>crossdomainxml.org</strong>.  Silverlight 2 currently supports the exact same policy file.  In addition, Silverlight has a policy file format, but in the end, both are supported, which is cool.  So if you have a web service on a domain separate from your Silverlight application, you'll have to create the policy file at the endpoint root of your web service to enable rich internet platforms to support it.</p>
<p>Once that policy file is in place you are good to go.  For demonstrating REST I am choosing to show you one that is a public API and has a policy file...Flickr.  My sample basically calls Flickr's REST API to search for photos based on a tag and then the result is to add Image elements to my Silverlight DOM in a StackPanel.  Here's what it looks like (after the wire-up button is hooked up).  In my click event handler it looks like this:</p>
<pre class="csharpcode">WebClient rest = <span class="kwrd">new</span> WebClient();
rest.DownloadStringCompleted += <span class="kwrd">new</span> DownloadStringCompletedEventHandler(rest_DownloadStringCompleted);
 rest.DownloadStringAsync(<span class="kwrd">new</span> Uri(flickrApi));</pre>
<blockquote>
<p>The "flickrApi" variable represents the <a href="http://www.flickr.com/services/api/flickr.photos.search.html">REST api call to search photos for Flickr</a>.</p>
</blockquote>
<p>The async callback basically gets the Flickr REST response (XML) and parses it using <strong>LINQ</strong>, then adding a new Image element to the Silverlight tree:</p>
<pre class="csharpcode"><span class="kwrd">string</span> data = e.Result;
<span class="kwrd">string</span> url = <span class="kwrd">string</span>.Empty;

FlickrImages.Children.Clear();

XDocument doc = XDocument.Parse(e.Result);
var photos = from results <span class="kwrd">in</span> doc.Descendants(<span class="str">"photo"</span>)
            select <span class="kwrd">new</span>
            {
                id = results.Attribute(<span class="str">"id"</span>).Value.ToString(),
                farm = results.Attribute(<span class="str">"farm"</span>).Value.ToString(),
                server = results.Attribute(<span class="str">"server"</span>).Value.ToString(),
                secret = results.Attribute(<span class="str">"secret"</span>).Value.ToString()
            };

<span class="kwrd">foreach</span> (var photo <span class="kwrd">in</span> photos)
{
    url = <span class="kwrd">string</span>.Format(<span class="str">"http://farm{0}.static.flickr.com/{1}/{2}_{3}_m.jpg"</span>, 
      photo.farm, photo.server, photo.id, photo.secret);
    Image img = <span class="kwrd">new</span> Image();
    img.Stretch = Stretch.Fill;
    img.Margin = <span class="kwrd">new</span> Thickness(10);
    img.Source = <span class="kwrd">new</span> BitmapImage(<span class="kwrd">new</span> Uri(url));
    FlickrImages.Children.Add(img);
}</pre>
<p>The result of which is 5 pictures added to my Silverlight application, and looks horrible like this: </p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/slsvc-4.png" /></p>
<p>So that's it, web services (hopefully) made simple.  I hope this helps.  What did I miss?</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:6da1d12b-29b2-47d6-a79c-a021d3ec0dfe" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
