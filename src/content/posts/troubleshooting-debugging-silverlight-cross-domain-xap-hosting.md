---
title: "Hosting cross-domain Silverlight applications (XAP)"
slug: "troubleshooting-debugging-silverlight-cross-domain-xap-hosting"
pubDate: 2010-06-10T16:04:58.000Z
lastModified: 2019-10-23T04:20:36.000Z
categories:
  - "silverlight"
  - "xaml"
  - "crossdomain"
  - "cross-domain"
  - "xap"
draft: false
---

<p>In the <a href="http://www.silverlight.net">Silverlight</a> world, there are two types of “cross-domain” things that may leave some banging their head against a wall for a while.  The first involves making network-based calls (WebClient, HttpWebRequest, etc) to <strong>services</strong> hosted on a domain other than the one that is the <em>site of origin</em> for the XAP.  This is solved by ensuring the service provider enables a clientaccesspolicy.xml file for their service.  More information here: <a href="http://www.silverlight.net/learn/videos/all/how-to-use-cross-domain-policy-files-with-silverlight/">Cross Domain Policy Files with Silverlight</a>.</p>
<blockquote>
<p>NOTE: “site of origin” is a term you might see a lot with regard to Silverlight.  This refers to the URI domain of the Silverlight XAP file.  For example: http://apps.mysite.com/sources/coolapp.xap might be a URI that you have for an app.  The site of origin in this is apps.mysite.com (more specifically it is actually the entire URI usually when people refer to this term).  This might help when you read things about cross-domain issues.</p>
</blockquote>
<p>The second issues is one of <strong>hosting</strong> Silverlight applications (XAPs) on your site that are from a different domain.  What I mean here is that your site (www.coolwebapp.com) has an &lt;object&gt; tag for Silverlight plugin that has the Source parameter set to apps.anothersite.com/foo.xap.  This is essentially the cross-domain hosting situation.  What happens in this situation is that the plugin loads but the app does not, presenting in just a big blank space where the app should be.</p>
<p>A recent head-banger sent me a note and I sent him my items to check on how to solve this.  I thought I’d share.  When I see issues with this, I normally tell people to check for one (or more) of three things:</p>
<h2>HTML Access</h2>
<p>If the Silverlight application is doing anything to work with the HTML DOM of your hosting page, this is the first place to look.  Don’t know if this is happening?  If the Silverlight application uses System.Windows.Browser anywhere it likely does.  By default the tools and templates from Visual Studio generate the bar minimum &lt;object&gt; tag.  There is one property of the plugin, <a href="http://msdn.microsoft.com/en-us/library/cc838264%28VS.95%29.aspx">EnableHtmlAccess</a>, that is set (essentially) to true for same-domain applications.  However, for cross-domain applications, you will need to opt-in for this adding this parameter to the &lt;object&gt; tag:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">&lt;</span><span class="html">object</span> <span class="attr">data</span><span class="kwrd">="data:application/x-silverlight-2,"</span> <span class="attr">type</span><span class="kwrd">="application/x-silverlight-2"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="source"</span> <span class="attr">value</span><span class="kwrd">="http://apps.somesite.com/foo.xap"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>   ...</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>   ...</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="enableHtmlAccess"</span> <span class="attr">value</span><span class="kwrd">="true"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span> <span class="kwrd">&lt;/</span><span class="html">object</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>By doing this, you are granting the XAP access to the HTML DOM of the hosting page.  Don’t say I didn’t warn you.</p>
<h2>XAP MIME type</h2>
<p>When the plugin loads a XAP from another domain, it checks what the MIME type is.  If it is not a valid Silverlight type, it won’t load the app.  This is a security mitigation.</p>
<p>If you are loading a cross-domain XAP, make sure the <strong>site delivering the XAP</strong> is delivering it with the appropriate MIME type: application/x-silverlight-app.  By default this is set in IIS7/Windows 2008, but not in IIS6/Windows 2003.  You can put this on the server level or the application level…wherever you feel comfortable, just as long as it is delivering it with the XAP.  </p>
<p>Obviously on non-Windows servers, this will not be set at all regardless of the version.  If you are getting a XAP from a Linux/Apache server for instance, the server administrator will want to add the type.  This is simple and you can do it at the global level in the mime.types file.  Or on a per-site basis you can do it by editing the .htaccess (or creating one) in the directory level that will serve the XAP and add:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> AddType application/x-silverlight-app xap</pre>
<!--CRLF--></div>
</div>
<p>If you are using a CDN like Azure or Amazon S3 or something else and they don’t have the type associated, you will need to be creative.  Most CDNs enable you to set the MIME type (or Content-Type) on the file during upload.  For Azure, Silverlight should already be there.  For something like S3, tools like CloudBerry Explorer enable this feature for you (and actually already have a list of types built-in to their tool).</p>
<p>This situation (identifying the MIME type) can be quickly tested using a tool like <a href="http://www.fiddlertool.com">Fiddler</a> to see what the response and Content-Type are being delivered.  Fiddler is an indispensable tool…go get it, it’s free.</p>
<h2>ExternalCallersFromCrossDomain</h2>
<p>This is the black hole property right here.  This one is probably a last resort for most.  This property, in the Deployment node of your AppManifest.xaml file controls Javascript and HTML DOM access to scriptable objects defined in the XAP.  Like EnableHtmlAccess, for same-domain situations the setting is irrelevant, but in cross-domain hosted XAPs, the default is the NoAccess option.</p>
<p>To enable this you’ll need to manually edit the AppManifest.xaml file to add the <a href="http://msdn.microsoft.com/en-us/library/system.windows.deployment.externalcallersfromcrossdomain%28VS.95%29.aspx">ExternalCallersFromCrossDomain</a> attribute.  There are two properties: NoAccess (default) and ScriptableOnly.  You’d want to *add* the attribute and set it to ScriptOnly.</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">&lt;</span><span class="html">Deployment</span> <span class="attr">xmlns</span><span class="kwrd">="http://schemas.microsoft.com/client/2007/deployment"</span> </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span>             <span class="attr">ExternalCallersFromCrossDomain</span><span class="kwrd">="CrossDomainAccess"</span> ...<span class="kwrd">/&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>REMEMBER: This is is only if you need to.  Read the documentation to see if this applies to your scenario.</p>
<h2>Summary</h2>
<p>Sometimes debugging this stuff can be tricky.  Having the tools and knowledge makes this easier to track down.  Not all situations involve multiple of the above and if none of them fix it, then you might have another issue.  Hopefully this helps provide some places to look.   </p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:762f8bf8-6e16-41a8-aafe-3bc16db04066" style="padding: 0px; margin: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
