---
title: "Shared project templates and ASP.NET Empty Web Site"
slug: "web-site-shared-web-form-templates"
pubDate: 2008-03-15T18:07:07.000Z
lastModified: 2019-10-23T04:20:17.000Z
categories:
  - "asp.net"
  - "aspnet"
  - "visual studio"
  - "orcas"
  - "linq"
  - "webforms"
draft: false
---

<p>If you are like me, you probably create a lot of projects in Visual Studio that end up getting thrown away and are intended just to test out a theory you have, double-check yourself when you are going mad because you can't find a bug, testing out something you read on a blog post, whatever.</p> <p>Most of the projects I create are web projects.  I've started to adopt the "_Delete" mechanism to help me identify what I can truly delete in my folders later.  But is not the point here.  One thing that I do when creating web projects is use the <em>Empty Web Site</em> template:</p> <p><img src="http://s3.amazonaws.com:80/timheuer-img/webtemps-1.png" /></p> <p>I choose this template because it is the cleanest...it's actually what it says it is: empty.  It allows me to really isolate things as <strong>I'm</strong> the one adding things in, not the IDE.  So I usually follow that up with a new WebForm to get an ASP.NET page in there.  I write some code then CTRL+F5 it to run.  The first thing I hit is a build error.  Can you guess what it is?</p> <p>Here's the thing.  When you choose the <em>Empty Web Site</em> template, you literally get nothing...no web.config, no default pages, no references, nada.  Like I said, it is what it is: empty.  But herein lies the problem.  The WebForm <strong>item</strong> template doesn't know that.  The WebForm item template is shared with all the web template types, which generally would be fine.  Let's do some digging to find out why I get a build error.</p> <p>The WebForm item template is located in %ProgramFiles%\Microsoft Visual Studio 9.0\Common7\IDE\ItemTemplates\CSharp\Web\1033\WebForm.zip.  This file contains the WebForm.aspx and code beside templates.  If you look at the CodeBeside.cs template within there you will see this line:</p><pre class="csharpcode">$<span class="kwrd">if</span>$ ($targetframeworkversion$ == 3.5)<span class="kwrd">using</span> System.Linq;</pre>
<p>And there is the problem!  When I create a new web site, i'm using the .NET Framework 3.5 setting:</p>
<p><img src="http://s3.amazonaws.com:80/timheuer-img/webtemps-2.png" /></p>
<p>instead of any other target.  It makes sense because I'm doing 3.5 stuff anyway and I don't want to have to change it later.  But the problem is that the WebForm template now thinks that I already have web.config settings for <strong>LINQ</strong>, a reference, etc. and that is why I can't run...no references to System.Linq assemblies anywhere.</p>
<p>It's quite annoying for me, but I would imagine not most.  In talking with some product team folks, and I concur, people who choose the empty template are usually likely going to know what is up and make whatever changes needed.  Fair enough, but still slightly annoying only because I keep forgetting about it!</p>
<p>So since I find myself removing those using statements a lot, I decided to just change the template.  This, of course, is completely going to get overwritten any update in the future.  But for me, I think it made sense to remove them rather than to assume that I, the developer, will always be using LINQ in my web forms...which I'm not.  I'll choose to add it back in when I need!  So I simply removed the $if$ statements and I'm good to go.  I wish there was a way to say $if$ (3.5 &amp;&amp; !empty)using System.Linq, but I'm okay with my minor change for me.</p>
<p>Anyhow, I thought I'd share this useless piece of knowledge as you might have come across it while checking out new development, tinkering with ASP.NET, creating shell <a href="http://silverlight.net/" rel="tag">Silverlight</a> web hosts, etc.  Hope it helps.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:fb90cfff-0f1e-45d9-b6e1-efe56b6164cf" style="padding-right: 0px; display: inline; padding-left: 0px; padding-bottom: 0px; margin: 0px; padding-top: 0px"></div>
