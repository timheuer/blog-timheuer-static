---
title: "silverlight streaming news - please read"
slug: "silverlight-streaming-service-interruption-update"
pubDate: 2008-01-08T14:17:43.000Z
lastModified: 2019-10-23T04:20:14.000Z
categories:
  - "silverlight streaming"
  - "silverlight"
  - "windows live"
  - "streaming"
draft: false
---

<p>there is an important announcement from the <a href="http://silverlight.net/">silverlight</a> streaming team.  looks like they are moving to some newer/better hardware infrastructure.  please see the <a href="http://dev.live.com/blogs/sls/archive/2008/01/08/189.aspx">full announcement</a>.</p>
<p>here's the gist as well:</p>
<p><strong>Tonight (Tuesday, Jan. 8th) </strong>we’ll move the Microsoft Silverlight Streaming by Windows Live service from its current hardware in Sandbox to a more permanent home on new hardware in the Production environment. Note that this doesn’t change anything to the fact that it is still provided as an Alpha version with no associated SLA. </p>
<p><strong>At 9:00 pm PST the admin site front door (<a href="http://silverlight.live.com/">Silverlight.live.com</a>) will be set to read-only.</strong> This means that your existing apps will still be able to function normally, whether hosted in SLS or hosted locally and fetching video content only from SLS. However you will not be able to provision new accounts and you will not be able to delete/change/upload content to the service, whether via the admin site or the API. </p>
<p><strong>At 10:00 pm PST the DNS change will come into effect and all the traffic will be redirected to the new boxes in Production.</strong> There is a one-hour TTL on the old DNS so you may see some funkiness if you try to access some apps between 10:00 pm PST and 11:00 pm PST depending on what piece of the overall path (origin server, cached content in the CDN, etc.) to delivering your app and its content is still from the old config or already swapped to the new one. </p>
<p><strong>At 11:00 pm PST everything should be back to normal.</strong> The old DNS will be inactive. The new hardware and new DNS will be the only one in operation in the Production environment. If you see any issues with your apps after that time, please report it to the dev forum on Silverlight.net or reply to this post.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:bcefd1fb-6b2e-4dd1-b4e6-04534c31e2b8" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
