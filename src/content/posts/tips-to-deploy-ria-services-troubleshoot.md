---
title: "Deploying your Silverlight and WCF RIA Services application"
slug: "tips-to-deploy-ria-services-troubleshoot"
pubDate: 2009-12-10T13:42:09.000Z
lastModified: 2019-10-23T04:20:33.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "wcf"
  - "services"
  - "riaservices"
  - "wcf ria services"
draft: false
---

<p><span style="color: rgb(255, 0, 0); font-weight: bold;">UPDATE: Please </span><a style="color: rgb(255, 0, 0); font-weight: bold;" href="http://msdn.microsoft.com/en-us/library/ff426913(v=VS.91).aspx">read the updated information on RIA Services deployment and troubleshooting on MSDN.</a><span style="color: rgb(255, 0, 0); font-weight: bold;">.</span><br />
</p>
<p>So you’ve been playing around with<strong> </strong><a href="http://silverlight.net"><strong>Silverlight</strong></a> and <a href="http://silverlight.net/riaservices"><strong>WCF RIA Services</strong></a> (the artist formerly known as .NET RIA Services) and you are ready to deploy.  You’ve been living in your happy Visual Studio environment, perhaps even relying on the built-in web server (a.k.a. Cassini) to serve up your pages/XAP to test.  All has been well, you’ve done your testing and you are ready to publish to your server.  You compile one last time and then right-click in Visual Studio on the web project and click Publish.  You push to your IIS endpoint or via FTP and the files deploy.  Sweet!  Now you go visit your site.  And it doesn’t work.  WTF?</p>
<p>I’ve been getting some emails on <strong>RIA Services deployment</strong> gotchas and thought I’d take a stab at explaining some of the deployment nuances.  </p>
<p>First it should be said that there is no greater supplement than having your dev environment match as close as possible to your ending target production environment.  If you are using IIS6 to host your final application, then it would be ideal that it is also your development/test environment.  I know this isn’t always possible for everyone, but if it is, make the effort and save yourself some time in the long run.</p>
<p>What is described below are some things you <em>might</em> run into.  Not everyone will…some will not hit any of these.  But hopefully if you do, this will be some insight.</p>
<h2>Deploying the RIA libraries – to bin or not to bin</h2>
<p>Your first error you may run into is assembly loading errors in your ASP.NET application.  Perhaps it says that it cannot locate or load System.Web.Ria assembly?  And here you thought the Publish command was going to deploy those for you, didn’t you (note: so did I).  Well, they aren’t.  You can do two things here.</p>
<p>First, you can “bin deploy” if you want.  That term means that you would deploy any non-core framework assemblies in your web applications <em>/bin</em> directory, making them locally available to the web application.  If you want to go this route, you can.  You have to manually go into your references in your web application and change the Copy Local property on some assemblies:</p>
<p><img title="Change Copy Local Property image" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Change Copy Local Property image" src="http://storage.timheuer.com/riadeploy1.png" /></p>
<p>The assemblies you would want to do this on (depending on what you have referenced) would be:</p>
<ul>
    <li>System.Web.Ria </li>
    <li>System.Web.DomainServices.* (there 4 of them depending on what you are using) </li>
    <li><span style="text-decoration: line-through;">Microsoft.RiaServices.Tools</span> UPDATE: this assembly only required for design-time experiences<br />
    </li>
</ul>
<p>Once you do that, on your next compile, these assemblies would be copied to your bin directory and then the subsequent Publish action would also push those to your server.</p>
<p>The second option you have is to install the RIA Services server libraries on the server in the Global Assembly Cache (GAC).  You may have tried this already and run the RiaServices.msi installer on your server and received the warning that you are missing Visual Studio and all sorts of tools.</p>
<p>And then you walked away and went the bin-deploy route.  Well open up a command prompt and run this instead:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> msiexec /i RiaServices.msi SERVER=TRUE</pre>
<!--CRLF--></div>
</div>
<p>And the server assemblies for RIA Services will be installed into the GAC for all to enjoy.  The advantage this has is that it becomes easier to service if you have one set of assemblies to update versus a few /bin deployed applications scurried all over the place.</p>
<p>  </p>
<h2>HTTP Scheme violation and IIS host-headers</h2>
<p>Now you run your application and you get this exception:</p>
<blockquote>
<p><em>This collection already contains an address with scheme http.  There can be at most one address per scheme in this collection.        <br />
Parameter name: item</em> </p>
</blockquote>
<p>Now you’re starting to wish your development environment mirrored your deployment environment aren’t you? :-)  This lovely error message will leave you wondering what is going on for a while if you didn’t know what it meant.  I mean, it’s completely descriptive isn’t it?  Of course not.</p>
<p>If you are getting this, you are likely running Windows 2003 server (IIS6) and are using host-headers in IIS.  </p>
<blockquote>
<p>NOTE: Host headers in IIS allow you to leverage a single IP address, but have separate web sites that respond to different hostname requests.  This information is usually provided in the IIS management console and is stored in the IIS metabase.</p>
</blockquote>
<p>If this isn’t you, or you aren’t controlling your server, I’m guessing you are in a shared hosting environment.</p>
<blockquote>
<p>NOTE: Full trust is required for RIA Services.  <span style="font-weight: bold;">UPDATE: Partial trust is supported for .NET4/VS2010, full trust requirement is only for .NET 3.5/VS2008.</span><br />
</p>
</blockquote>
<p>Either way, what you are seeing is a limitation of Windows Communication Foundation (WCF) under .NET 3.x.  There are a few things you can do here.</p>
<p>If you are running .NET 3.0 (well, you likely aren’t running RIA Services then are you) – but <a href="http://blogs.msdn.com/rampo/archive/2007/06/15/supporting-multiple-iis-bindings-per-site.aspx">here’s some information on creating your own ServiceHostFactory</a>…which isn’t really an option here.</p>
<p>If you are running .NET 3.5 (more likely), and can get to your web.config setting, you can add this setting:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">&lt;</span><span class="html">system.serviceModel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>     <span class="kwrd">&lt;</span><span class="html">serviceHostingEnvironment</span> <span class="attr">aspNetCompatibilityEnabled</span><span class="kwrd">="true"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>         <span class="kwrd">&lt;</span><span class="html">baseAddressPrefixFilters</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>             <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">prefix</span><span class="kwrd">="http://some.url.here.that.matches.a.host.header"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>         <span class="kwrd">&lt;/</span><span class="html">baseAddressPrefixFilters</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span>     <span class="kwrd">&lt;/</span><span class="html">serviceHostingEnvironment</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span> <span class="kwrd">&lt;/</span><span class="html">system.serviceModel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Note that the prefix you are using must match the base URI of where your DomainService will be at as well as it must exist as a mapped host-header for the site.  More information available <a href="http://blogs.msdn.com/rampo/archive/2008/02/11/how-can-wcf-support-multiple-iis-binding-specified-per-site.aspx">here</a>.</p>
<p>if you are running .NET 4, you may not run into this issue, but there may be an optional opt-in configuration you will have to do when .NET 4 releases.</p>
<h2>UPDATE: HttpModule for DomainService</h2>
<p>Perhaps one thing that I assumed was that you’d be pushing the web app completely.  But what if you already have a web.config and you aren’t pushing that over there.  Well, pay attention to the web.config of a RIA Services created project.  You’ll see an HttpModule set up (this one is from VS2010, but will be similar, just version numbers different):</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">&lt;</span><span class="html">httpModules</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>     <span class="kwrd">&lt;</span><span class="html">add</span> <span class="attr">name</span><span class="kwrd">="DomainServiceModule"</span> <span class="attr">type</span><span class="kwrd">="System.Web.Ria.Services.DomainServiceHttpModule, </span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>         System.Web.Ria, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35" <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span> <span class="kwrd">&lt;/</span><span class="html">httpModules</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>If you don’t have this, then you might see some weirdness.  You see, for the default deployment, the service is handled through this module.  You may have noticed that there are no physical .SVC files in your web app.  If you look with Fiddler at your Silverlight/RIA Services application in action you’ll see something like <em>/ClientBin/Your-Namespace-Here-Method.svc/binary</em>.  This is actually interpreted by the module to map the request.</p>
<p>If you wanted to generate a physical file yourself, you can do that and the request would be processed there versus through the virtual SVC file generated.  You can read about this in <a href="http://blogs.msdn.com/saurabh/archive/2009/11/23/understanding-the-wcf-in-wcf-ria-services.aspx">Saurabh’s post</a>.</p>
<h2>Multiple Authentication Schemes</h2>
<p>Okay, now you run it again and you get a message about it not supporting multiple authentication schemes and that you may have.  The message may look like this:</p>
<blockquote>
<p><em>IIS specified authentication schemes 'IntegratedWindowsAuthentication, Anonymous', but the binding only supports specification of exactly one authentication scheme. Valid authentication schemes are Digest, Negotiate, NTLM, Basic, or Anonymous. Change the IIS settings so that only a single authentication scheme is used.</em></p>
</blockquote>
<p>This can be a result of your &lt;authentication&gt; node in your ASPNET application being set to Windows, but your site being set to Anonymous in IIS.  For most, simply changing &lt;authentication&gt; node to mode=”Forms” will remove this error and allow you to continue.  For others, if your IIS configuration is set to use both Integrated Auth as well as Anonymous, you’ll want to uncheck one of them in the Directory Security setting for the site in IIS management console.</p>
<h2>Install the Hotfix (XP, Vista, Windows 2003)</h2>
<p>As noted on the <a href="http://silverlight.net/riaservices">RIA Services information page</a>, if you are not running Windows 7 or Windows 2008 R2, you need to install a Hotfix.  Some people haven’t seen this note, so be sure if you fall in that category that you grab the appropriate hotfix for your architecture and run it.  <span style="font-weight: bold;">UPDATE: This hotfix is only needed if you are using VS2008.</span><br />
</p>
<h2>Essential Tools</h2>
<p>So how can you troubleshoot all these things?  Some wondered where I was able to get the error messages, when their response errors in Silverlight were just showing <em>NotFound</em>.  I’ve said this again with <a href="http://timheuer.com/blog/archive/2008/06/10/silverlight-services-cross-domain-404-not-found.aspx">regard to debugging services, especially cross-domain stuff</a>, that <strong>if you aren’t using an HTTP diagnostic tool you are hurting your productivity</strong> in debugging.  I use <a href="http://www.fiddlertool.com">Fiddler</a>.  I used to use Web Development Helper a lot more, but have run into some problems with it registering in IE and Fiddler has finally got rid of all nuances that bothered me with it.  Some others have used Charles proxy which I’ve heard is really great, but requires Java if you don’t have it.  Any one of these tools can provide invaluable debugging information to help triage your issue.  Sometimes the HTTP response code isn’t the full story and the response body will help tremendously.</p>
<blockquote>
<p>NOTE: If you are using Fiddler for http://localhost debugging, you may have seen some challenges.  In the URL, change to http://127.0.0.1./site – noting the trailing “.” after the IP address.  Example: http://127.0.0.1.:12345/MyApp – this will trigger Fiddler to monitor those requests as well.</p>
</blockquote>
<p>For WCF binary encoding messages, be sure to download <a href="http://code.msdn.microsoft.com/wcfbinaryinspector"><strong>WCF Binary-encoded message inspector</strong></a> if you are using Fiddler…it’s awesome (hat tip to <a href="http://twitter.com/DanWahlin/">Dan Wahlin</a> for the tip).</p>
<h2>Summary</h2>
<p>I suspect anyone running into these issues above is likely using Silverlight 3/VS2008 and deploying to an IIS6 instance.  Truly this is where the issues might manifest themselves.  When WCF RIA Services comes out of beta/ctp status and releases next year, the development story will be that of Silverlight 4 and .NET 4 on the server.  As noted above, these WCF issues (with host-headers) are solved with .NET 4 on the server, so this post will be useless when the bits release.</p>
<p>I hoped by posting this though, that some in the interim might find some better troubleshooting tips with regard to the shared hosting scenario mostly.  I personally ran into a few of these myself on my own dedicated server that uses host-headers (but is still full trust), so I thought others might benefit from the steps that I went through to get my RIA Services application deployed on a server.</p>
<p>Hope this helps.</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:4fc4ecad-f737-42ae-ba6b-f3198012e0e2" style="margin: 0px; padding: 0px; float: none; display: inline;"></div>

