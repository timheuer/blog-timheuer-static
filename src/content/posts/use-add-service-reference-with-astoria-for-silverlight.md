---
title: "Silverlight and ADO.NET Data Service proxy generation"
slug: "use-add-service-reference-with-astoria-for-silverlight"
pubDate: 2008-10-14T19:33:22.000Z
lastModified: 2019-10-23T04:20:24.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "asp.net"
  - "aspnet"
  - "wcf"
  - "svc"
  - "astoria"
  - "ado.net"
draft: false
---

<p>One of the nice little additions to the data client services in <a href="http://silverlight.net">Silverlight</a> 2 is the removal of the need to drop out of Visual Studio to do some proxy code generation.  Prior to Silverlight 2 release, if you wanted to consume an ADO.NET Data Service (the artist formerly known as Astoria), you had to drop into a command line and execute something like:</p>  <div style="border-bottom: gray 1px solid; border-left: gray 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: consolas, 'Courier New', courier, monospace; max-height: 200px; font-size: 8pt; overflow: auto; border-top: gray 1px solid; cursor: text; border-right: gray 1px solid; padding-top: 4px">   <div style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px">     <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   1:</span> datasvcutil.exe /out:<span style="color: #006080">"MyDataService.cs"</span> /uri:<span style="color: #006080">"http://foo.com/MyDataServiceEndpoint.svc"</span></pre>
  </div>
</div>

<p>While that isn’t difficult, it just wasn’t convenient as a developer productivity workflow.  I mean who wants to have to click and type more than you have to, right?  After all, ADO.NET Data Service (alright forget it, I’m calling it Astoria) endpoints <strong><em>are</em></strong> services right?  And Visual Studio <strong><em>does</em></strong> have this thing called <em>Add Service Reference</em>?</p>

<p>Alas, now we don’t have to use a command-line anymore.  With Silverlight 2 and Visual Studio tools, you now <strong>can</strong> use the service reference capability I’d like to show you a screenshot, but it’s not like the dialog window is any different than other service references, so I’ll save me and you the bandwidth.  But try it out.  Take your project, add a reference to your Astoria service.</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:e8c07c48-4d8d-4706-a4e8-1db5134fee12" class="wlWriterEditableSmartContent"></div>
