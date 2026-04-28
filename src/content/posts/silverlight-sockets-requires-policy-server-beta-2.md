---
title: "Important change to Sockets in Silverlight 2"
slug: "silverlight-sockets-requires-policy-server-beta-2"
pubDate: 2008-06-06T21:06:41.000Z
lastModified: 2019-10-23T04:20:19.000Z
categories:
  - "silverlight"
  - "crossdomain"
  - "cross-domain"
  - "sockets"
  - "policy"
  - "network"
  - "peer-to-peer"
  - "peer"
draft: false
---

<p>An important note for those using <strong>Sockets </strong>in <a href="http://silverlight.net"><strong>Silverlight</strong></a><strong> </strong>2.  In beta 1, Sockets were limited to site-of-origin (meaning you could only connect back to the same host that served up the Silverlight application).  This has changed in beta 2 to allow your Silverlight application to connect to any server exposing some Socket connections.</p>
<p>One important note, however, is that a policy implementation has been added.  This policy implementation affects not only cross-domain Socket calls, but site-of-origin ones as well.  So if you are using Sockets, you <strong>must</strong> have a policy implementation in place.</p>
<p>The policy implementation is done via a similar file mechanism as HTTP-based cross-domain requests.  The policy file looks similar and here is a basic example:</p>
<pre class="csharpcode"><span class="kwrd">&lt;?</span><span class="html">xml</span> <span class="attr">version</span><span class="kwrd">="1.0"</span> <span class="attr">encoding</span> <span class="kwrd">="utf-8"</span>?<span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">access-policy</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;</span><span class="html">cross-domain-access</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">policy</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">allow-from</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">domain</span> <span class="attr">uri</span><span class="kwrd">="file:///"</span> <span class="kwrd">/&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">allow-from</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">grant-to</span><span class="kwrd">&gt;</span>
        <span class="kwrd">&lt;</span><span class="html">socket-resource</span> <span class="attr">port</span><span class="kwrd">="4502-4506"</span> <span class="attr">protocol</span><span class="kwrd">="tcp"</span> <span class="kwrd">/&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">grant-to</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;/</span><span class="html">policy</span><span class="kwrd">&gt;</span>
  <span class="kwrd">&lt;/</span><span class="html">cross-domain-access</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">access-policy</span><span class="kwrd">&gt;</span></pre>
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
.csharpcode .lnum { color: #606060; }]]></style>Notice how you can restrict the ports here (note: Sockets in general in Silverlight are limited to ports 4502-4534).
<p>This policy information must be made available on a TCP port request on port 943.  Any Socket request will first look for that policy information to respond on this port 934 request.  If successful, the remaining communication will be allowed.  If not, the communication will fail.</p>
<blockquote dir="ltr" style="MARGIN-RIGHT: 0px">
<p><strong>UPDATE: I accidentally typed "934" originally as the port -- it is 943.</strong></p>
</blockquote>
<p>There is no code change you need to have in your current Socket implementation other than implementing a Socket policy server to respond to the policy request.  I’ll be covering the basics of sockets on a video over on the <a href="http://silverlight.net/learn">Silverlight community site</a> which will demonstrate and provide code on doing this implementation.  Stay tuned for that one.</p>
<p>Hope this helps.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:9539abe6-18a8-4a60-89d7-aee5b5872f2b" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>

