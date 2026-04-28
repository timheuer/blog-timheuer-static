---
title: "Silverlight 4 enables Authorization header modification"
slug: "silverlight-authorization-header-access"
pubDate: 2010-04-23T12:54:40.000Z
lastModified: 2019-10-23T04:20:35.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "authentication"
  - "clientaccesspolicy"
  - "riaservices"
  - "authorization"
  - "credentials"
draft: false
---

<p>A little bit of hidden gem in the <a href="http://www.silverlight.net">Silverlight</a> 4 release is the ability to modify the Authorization header in network calls.  For most, the sheer ability to leverage network credentials in the networking stack will be enough.  But there are times when you may be working with an API that requires something other than basic authentication, but uses the Authorization HTTP header.</p>  <h2>The Details</h2>  <p>Basically you just set the header value.  How’s that for details :-).  </p>  <p>Seriously though, here’s a snippet of code:</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> WebClient c = <span class="kwrd">new</span> WebClient();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> c.Headers[HttpRequestHeader.Authorization] = <span class="str">"Auth header from same domain-browser stack"</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span> c.DownloadStringCompleted += ((s, args) =&gt;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>         <span class="kwrd">if</span> (args.Error != <span class="kwrd">null</span>)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>         {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>             response.Text = args.Error.Message;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>         }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>         response.Text = args.Result;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>     });</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span> c.DownloadStringAsync(<span class="kwrd">new</span> Uri(<span class="str"><a href="http://localhost:4469/handler.ashx">http://localhost:4469/handler.ashx</a></span>));</pre>
<!--CRLF--></div>
</div>

<p>As you can see in the code is rather simple.  Prior to Silverlight 4 you’d receive an exception that setting the header isn’t possible…but now it is.  If you are using HttpWebRequest instead it would be just as simple:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> HttpWebRequest req = (HttpWebRequest)WebRequest.CreateHttp(<span class="str">"http://localhost:4469/handler.ashx"</span>);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> req.Headers[HttpRequestHeader.Authorization] = <span class="str">"Auth header from same domain using HWR"</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span> req.BeginGetResponse((cb) =&gt;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>         HttpWebRequest rq = cb.AsyncState <span class="kwrd">as</span> HttpWebRequest;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>         HttpWebResponse resp = rq.EndGetResponse(cb) <span class="kwrd">as</span> HttpWebResponse;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>         StreamReader rdr = <span class="kwrd">new</span> StreamReader(resp.GetResponseStream());</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>         <span class="kwrd">string</span> foo = rdr.ReadToEnd();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>         Dispatcher.BeginInvoke(() =&gt;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>             {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>                 response.Text = foo;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span>             });</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum14" class="lnum">  14:</span>         rdr.Close();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum15" class="lnum">  15:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum16" class="lnum">  16:</span>     }, req);</pre>
<!--CRLF--></div>
</div>

<p>That’s it.</p>

<h2>The Support Matrix</h2>

<p>As such this feature does have some restrictions for security reasons.  Basically the difference has to do with cross-domain calls.  Here’s the feature support matrix in the simplest terms:</p>

<table border="1" cellspacing="0" cellpadding="2" width="650"><tbody>
    <tr>
      <td valign="top" width="216"><strong>Network Stack Used</strong></td>

      <td valign="top" width="216"><strong>Domain Type</strong></td>

      <td valign="top" width="216"><strong>Authorization Header Allowed</strong></td>
    </tr>

    <tr>
      <td valign="top" width="216">Browser (default)</td>

      <td valign="top" width="216">same domain</td>

      <td valign="top" width="216">Yes</td>
    </tr>

    <tr>
      <td valign="top" width="216">ClientHttp</td>

      <td valign="top" width="216">same domain</td>

      <td valign="top" width="216">Yes</td>
    </tr>

    <tr>
      <td valign="top" width="216">Browser (default)</td>

      <td valign="top" width="216">cross-domain</td>

      <td valign="top" width="216">Yes with policy</td>
    </tr>

    <tr>
      <td valign="top" width="216">ClientHttp</td>

      <td valign="top" width="216">cross-domain</td>

      <td valign="top" width="216">Yes with policy</td>
    </tr>
  </tbody></table>

<p>As you can see a cross-domain call of this (i.e., setting an Authorization header on a 3rd party site) would require that a valid clientaccesspolicy.xml be in place.  Here’s an example of a pretty liberal one:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;?</span><span class="html">xml</span> <span class="attr">version</span><span class="kwrd">="1.0"</span> <span class="attr">encoding</span><span class="kwrd">="utf-8"</span> ?<span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> <span class="kwrd">&lt;</span><span class="html">access-policy</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="kwrd">&lt;</span><span class="html">cross-domain-access</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>         <span class="kwrd">&lt;</span><span class="html">policy</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>             <span class="kwrd">&lt;</span><span class="html">allow-from</span> <span class="attr">http-request-headers</span><span class="kwrd">="Content-Type,Authorization"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>                 <span class="kwrd">&lt;</span><span class="html">domain</span> <span class="attr">uri</span><span class="kwrd">="*"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>             <span class="kwrd">&lt;/</span><span class="html">allow-from</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>             <span class="kwrd">&lt;</span><span class="html">grant-to</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>                 <span class="kwrd">&lt;</span><span class="html">resource</span> <span class="attr">include-subpaths</span><span class="kwrd">="true"</span> <span class="attr">path</span><span class="kwrd">="/"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>             <span class="kwrd">&lt;/</span><span class="html">grant-to</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>         <span class="kwrd">&lt;/</span><span class="html">policy</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>     <span class="kwrd">&lt;/</span><span class="html">cross-domain-access</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span> <span class="kwrd">&lt;/</span><span class="html">access-policy</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>I should note that when I mean ‘pretty liberal’ this means that the above makes all your resources available to all Silverlight clients.  But pay attention to the <em>http-request-headers</em> section.  Notice the addition of the Authorization header (Content-Type is default always).  By adding this you would be able to have a cross-domain Authorization header writing ability.  Without it you’d see a security exception.  And remember, the policy files exist <strong><em>on the destination endpoint</em></strong> and not in your app.  To demonstrate this, here’s my quick sample application output:</p>

<p><img style="margin: 0px auto; display: block; float: none" title="Auth header sample app output" alt="Auth header sample app output" src="http://storage.timheuer.com/authheader-1.png" /></p>

<p>You can download the code for this sample tester application here: <a href="http://storage.timheuer.com/Authheaders.zip">Authheaders.zip</a></p>

<h2>Summary</h2>

<p>Hopefully this is good news to some developers.  Now with Silverlight 4 we have network credentials support <em>and</em> the ability to use the Authorization header when needed for other purposes.  It’s a little hidden gem that frankly could have been better called out in the docs a bit.</p>
Hope this helps!

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:0ddd6d50-5f1c-4f20-87f4-3d018af69fb3" class="wlWriterEditableSmartContent"></div>

<br />
