---
title: "My Silverlight application cannot access my service!"
slug: "silverlight-cannot-access-web-service"
pubDate: 2008-04-09T21:32:01.000Z
lastModified: 2019-10-23T04:20:18.000Z
categories:
  - "silverlight"
  - "aspnet"
  - "wcf"
  - "web services"
  - "asmx"
  - "clientaccesspolicy"
  - "crossdomain"
  - "asp.net web service"
draft: false
---

<p>I’ve started a dialog with a few of you about getting <a target="_blank" href="http://silverlight.net/"><strong>Silverlight</strong></a> and service integration working, specifically with <strong>ASP.NET web services</strong> (and even WCF ones).  A few have downloaded some of my samples, but others have started from scratch.  A few have reported getting some interesting errors, ASYNC_blahblah and NotFound errors specifically.  While this was boggling my mind (as I wasn’t getting them), a reader’s comments pointed me along the lines of something…he mentioned “maybe it is because my web service is ASP.NET 2.0 and not 3.5” – of which that shouldn’t be the case, so I went to test that.</p>
<p><strong><u>The Situation</u></strong></p>
<p>Most of the samples you are likely seeing (including mine) are implementing web services within the same project that the Silverlight host is implementing.  What I mean to say is probably you are doing File…New…Silverlight Project and then incorporating the web service into the web site project that comes with that template.  If you do so, you probably aren’t running into problems.  Also note that the target framework of that default web site project is .NET 3.5.  This doesn’t make a difference, but I’m just noting it here.</p>
<p>But what if you have an existing service, or you have an existing web site project that you are running in Visual Studio and running into problems…and l <em>think</em> I know why…let’s investigate by doing this step-by-step.</p>
<p><strong><u>The Web Service</u></strong></p>
<p>First open an instance of Visual Studio 2008 and choose to create a new ASP.NET Web Service (I’m calling mine ‘FooService’).  Be sure to select .NET Framework 2.0 for this experiment:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/svc-new-project.png" /></p>
<p>Do nothing more to the service.  We’re just going to use the HelloWorld stub for this experiment.  We know we’re going to simulate a cross-domain situation so create a clientaccesspolicy.xml file at the root of this project.  You can use <a href="http://timheuer.com/blog/archive/2008/04/06/silverlight-cross-domain-policy-file-snippet-intellisense.aspx">my snippet to do the default public policy quickly</a> if you’d like, it’s wickedly cool and awesomely awesome.  I recommend it ;-).  Moving on… We are done here.  CTRL+F5 this bad boy to start it running (or select Service.asmx and view in browser) – we just need to get the service running.  Make note of the URL, it is likely http://localhost:XXXXX/FooService/Service.asmx where “XXXXX” is the random port assigned by VS.  Just note that URL.  Obviously if you didn’t call yours FooService, then it will be different.</p>
<p><strong><u>The Silverlight Application</u></strong></p>
<p>Start another instance of VS2008 and choose File…New…Project…Silverlight Application.  I’m calling mine FooApp.  Now, if you don’t see any of the Silverlight templates, just change the target framework back to .NET Framework 3.5 if you haven’t done so already.  Accept the default for creating the FooApp_Web project for you, we’ll need a host here anyway under HTTP.</p>
<p>Modify nothing in the Page.xaml file but add a service reference to the Silverlight application by right-clicking on the app and choosing ‘Add Service Reference.’  Put the URL of the ASP.NET 2.0 service (from previous step) in the box and click GO.  You should get it discovered and have ‘ServiceReference1’ as the name:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/svc-add-ref.png" /></p>
<p>Just keep the lame name because we’re just playing around remember?  Now, go to Page.xaml.cs and add the following code:</p>
<pre class="csharpcode"><span class="kwrd">public</span> Page()
{
    InitializeComponent();
    Loaded += <span class="kwrd">new</span> RoutedEventHandler(Page_Loaded);
}

<span class="kwrd">void</span> Page_Loaded(<span class="kwrd">object</span> sender, RoutedEventArgs e)
{
    ServiceReference1.ServiceSoapClient proxy = <span class="kwrd">new</span> FooApp.ServiceReference1.ServiceSoapClient();
    proxy.HelloWorldCompleted += <span class="kwrd">new</span> EventHandler&lt;FooApp.ServiceReference1.HelloWorldCompletedEventArgs&gt;(proxy_HelloWorldCompleted);
    proxy.HelloWorldAsync();
}

<span class="kwrd">void</span> proxy_HelloWorldCompleted(<span class="kwrd">object</span> sender, FooApp.ServiceReference1.HelloWorldCompletedEventArgs e)
{
    <span class="kwrd">try</span>
    {
        TextBlock tb = <span class="kwrd">new</span> TextBlock();
        tb.Text = e.Result;
        LayoutRoot.Children.Add(tb);
    }
    <span class="kwrd">catch</span> (Exception ex)
    {
        <span class="kwrd">string</span> wtf = ex.Message;
    }
}</pre>
<p>What we are doing here is calling the service (asynchronously of course) and wiring up the completion event to emit a new TextBlock with the result of the web service.  The Page() constructor just adds a Loaded event so we aren’t doing anything in the constructor to the XAML before it is done loading.</p>
<p>Okay, so we are done.  We have our web service with an appropriate clientaccesspolicy.xml file and it is running.  We have our Silverlight application with a service reference to that and proxy code generated.  We are using that proxy code to call the service, and use the result in a new TextBlock in our root layout element.  Sweet.  Put a breakpoint on the exception catch (should be line 37) and hit F5 (choose yes to enable debugging in web.config).</p>
<p>WTF?</p>
<p>Did you get ‘<strong>Async_ExceptionOccurred</strong>’ like I did?  Sonofa…  Maybe it is because I’m accessing an ASP.NET 2.0 service? No.  Maybe it is because my app is on port YYYY and my service is on port XXXX?  Nope.  Ah, cross-domain issues?  Try again.</p>
<p><strong><u>Investigating the Problem</u></strong></p>
<p>Okay, on to figuring out what is going on.  </p>
<p>If you are a web developer and you aren’t using an HTTP sniffing tool, shame on you.  This should be one of your biggest assets when doing web client development like Flash, Silverlight, AJAX, whatever.  For Microsoft developers there are usually 2 tools (both free) that come to the top: <a href="http://www.fiddlertool.com">Fiddler</a> and <a href="http://projects.nikhilk.net/webdevhelper/">Web Development Helper</a>.  I’m a HUGE fan of WebDevHelper (which I just noticed is on <a target="_blank" href="http://www.codeplex.com">CodePlex</a> now, cool Nikhil!) for 2 reasons.  First, it doesn’t require me to change my proxy settings or anything, which is a pain when using Fiddler and the built-in web server with VS because of the dynamic ports it uses.  Second, it is IN THE BROWSER!  I turn it on and I get an explorer bar at the bottom that shows me everything.  Me likey.</p>
<p>Ok, so using WebDevHelper I turn it on and spot the problem:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/svc-webdevhelper.png" /></p>
<p>Spot it?  Remember our service was created on http://localhost:XXXX/FooService/Service.asmx?  If you read my previous post on cross-domain access (and soon a how-do-I video will be posted on this topic), you’ll note that the client access policy file must be at the ROOT of the service site.  </p>
<p><em>But Tim, it <strong>is</strong>!</em></p>
<p>Well, it is according to the file system, but look at the request Silverlight is making.  The problem here is the web development server in VS.  By default it not only grabs a random port, but also serves things up under a virtual directory (i.e., /FooService/Service.asmx instead of /Service.asmx).  So even though we have our policy file in the root, the web server isn’t treating our app like a root.  Notice the web service project properties:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/svc-webproperties.png" /></p>
<p>The core problem was that it couldn’t find the clientaccesspolicy.xml file and thus denying the request to the service.</p>
<p><strong><u>The Solution</u></strong></p>
<p>For *this* scenario, the solution (or one of them, easiest in my opinion) is to change the <strong>service</strong> properties and just change the /FooService to “/” only.  This will restart the server for that project (browser to Service.asmx again just to make sure) and will then be operating under <a href="http://localhost:XXXX/Service.asmx">http://localhost:XXXX/Service.asmx</a>.  </p>
<p>The next thing we need to do is go back to our Silverlight application and remove the service reference (as it is now invalid because the endpoint is no longer there).  Just select it and delete.  Choose ‘Add Service Reference’ again and point to the newly updated URL.  No need to change/delete the actual code in Page.xaml.cs because it will stay the same as long as you keep the SericeReference1 default name for this example.</p>
<p>Once you have that, F5 your Silverlight application again and you should see:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/svc-helloworld.png" /></p>
<p>If we turn on WebDevHelper again we can see the policy file being requested and found, then the service call allowed through:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/svc-goodservice.png" /></p>
<p>Again for this scenario (if you are playing around with Silverlight and just messing with services), this may be one of the issues you are running into.  A lot of the time cross-domain policy files may be the issue and that is why an HTTP sniffer is going to be your best friend to see what request is failing and why.  Even though this is an ASMX sample, if you were testing with a WCF service hosted in an ASPNET web site and running under VS2008 web development server, you'd likely run into the same issue.</p>
<p>Hope this helps!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:cd604f2b-9b8c-4eaf-bb1d-f5dc49b89038" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
