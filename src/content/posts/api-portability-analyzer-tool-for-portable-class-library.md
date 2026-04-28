---
title: "Determining Portable Class Library compatibility"
slug: "api-portability-analyzer-tool-for-portable-class-library"
pubDate: 2014-05-27T01:02:31.000Z
lastModified: 2019-10-23T04:20:41.000Z
categories:
  - "silverlight"
  - ".net"
  - "portable"
  - "winrt"
  - "wpdev"
  - "taglib"
  - "pcl"
  - "apiport"
  - "framework"
draft: false
---

<p>Recently I <a href="http://timheuer.com/blog/archive/2014/05/23/porting-taglib-sharp-to-portable-class-library.aspx">embarked on porting the TagLib# library to a Portable Class Library</a> (PCL).  In my efforts I noted some frustration I had of the “convert and compile” flow to find issues.  Well, turns out I didn’t have to do that much pain as pointed out by <a href="https://twitter.com/dsplaisted">Daniel</a> in the comments!  The .NET team has released a tool to help out us developers called the <a href="http://www.microsoft.com/en-us/download/details.aspx?id=42678">API Portability Analyzer</a> (currently in Alpha).  This tool basically looks at any existing .NET assembly and gives you a report to help you see where the APIs used are supported in the various .NET profiles available.</p>  <p>The tool is a single command-line exe and is as simple as launching:</p>  <pre class="brush: ps;">ApiPort.exe path-to-your-assembly-file.dll</pre>

<p>I recommend putting this in your path somewhere so you don’t have to remember the full path to launch.  The output from the console tells you very little and only really about what you it is doing:</p>

<pre class="brush: ps; highlight: [8];">Microsoft (R) API Portability Analyzer version 1.0 (alpha)
Copyright (C) Microsoft Corporation. All rights reserved.

To learn more about how this tool works, including the data we are collecting, go here - http://go.microsoft.com/fwlink/?LinkId=397652

Identifying assemblies to scan. Done in 0.01s.
Detecting assembly references. Processed 1/1 files.Done in 0.23s.
Sending data to service. Done in 2.88s.
Computing report. Processed 508 items.Done in 0.02s.
Writing report. Done in 0.17s.

Replaced output file "c:\ApiPortAnalysis.xlsx"</pre>

<p>You may notice that the tool says ‘sending’ and yes, it is communicating with a public service.  The team notes this in the download:</p>

<blockquote>
  <p><strong>NOTE</strong>: During the process of identifying the .NET APIs used by a binary Microsoft collects the list of .NET APIs used by the user submitted binaries. Microsoft also collects the names of various user created APIs. The tool does not collect the binary code, only names of APIs are collected. Microsoft will also collect assembly information such as assembly references for the binary &amp; the Target Framework Moniker (TFM). </p>
</blockquote>

<p>The real value is in the output data conveniently formatted into a pre-filterable Excel document.  The process was fairly fast for me, but I suspect might take longer for larger libraries (duh).  An example of the output is like the one here directly showing the TagLib# data that I used above.</p>

<p align="center"><iframe src="https://onedrive.live.com/embed?cid=A737583042956228&amp;resid=A737583042956228%2144520&amp;authkey=AC49KMgeRWAhh9Y&amp;em=2" width="650" height="346" frameborder="0" scrolling="no"></iframe></p>

<p>If you read my previous post you will see that the areas I had frustrations about are clearly identified in the <em>Unsupported</em> columns for my target platform.  The tool attempts to recommend some alternatives when it can.  I can imagine this gets better over time as the recommendations for TagLib# were only two, whereas it should have provided recommendations for XmlDocument/XmlElement/etc. to the XLINQ equivalent areas.</p>

<p>In the end though, this is a helpful tool for those looking to convert.  I wish I had known about it in advance, but now that I know it is in my toolbox and my PATH!</p>

<p>Hope this helps!</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:7382cf37-d942-4beb-8ba3-733d509c8327" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>
