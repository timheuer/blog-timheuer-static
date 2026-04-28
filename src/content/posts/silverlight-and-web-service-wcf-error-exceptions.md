---
title: "Silverlight and Web Service Errors"
slug: "silverlight-and-web-service-wcf-error-exceptions"
pubDate: 2008-10-01T12:29:48.000Z
lastModified: 2019-10-23T04:20:23.000Z
categories:
  - "silverlight"
  - "xaml"
  - "web dev helper"
  - "wcf"
  - "rest"
  - "xml"
  - "services"
  - "web services"
  - "fiddler"
  - "eugeneos"
draft: false
---

<p>When working with data and <a href="http://silverlight.net">Silverlight</a> there has often been the questions of wondering why when a service call fails that Silverlight returns the HTTP 404 status code.  In fact I’ve <a href="http://timheuer.com/blog/archive/2008/06/10/silverlight-services-cross-domain-404-not-found.aspx">written about troubleshooting those types of issues in the past</a> and tools you can use to help investigate some problems.</p>  <p>Still people mostly ask "<em>if there is an exception, why is Silverlight telling me ‘not found’ instead of sending me the exception?'”</em>  Eugene Osovetsky from the connected systems team aims to <a href="http://eugeneos.blogspot.com/2008/09/faults-and-exceptions-when-using-web.html">answer those questions in a recent post</a> with a little more detail than has been provided in the past as well as offering some suggestions.  From his post, this is one of the main reasons which I’ve echoed in discussions, webcasts, forums in the past as well:</p>  <blockquote>   <p><em>“Unfortunately, web browsers have a limitation with regards to status codes: When a browser plugin (such as Silverlight) makes an HTTP request, and the response status code is not 200, the browser hides the actual status code and the message body from the plugin. All Silverlight knows is that "something went wrong", but it has no way of discovering any details.”</em></p> </blockquote>  <p>Take a look at <a href="http://eugeneos.blogspot.com/2008/09/faults-and-exceptions-when-using-web.html">Eugene’s post</a> for some other helpful suggestions.</p>  <div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:b490e392-5aa9-483f-b25a-b179bf5b8c26" class="wlWriterEditableSmartContent"></div>
