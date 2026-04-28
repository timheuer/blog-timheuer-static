---
title: "silverlight hosting and linux hosting"
slug: "silverlight-hosting-on-linux-apache-osx-streaming"
pubDate: 2007-08-23T20:22:02.000Z
lastModified: 2019-10-23T04:20:08.000Z
categories:
  - "silverlight streaming"
  - "silverlight"
  - "silverlight hosting"
  - ".net rocks"
  - "carl franklin"
  - "shawn wildermuth"
draft: false
---

<p><strong>UPDATE</strong>: <a href="http://rrelyea.spaces.live.com/blog/cns!167AD7A5AB58D5FE!1661.entry">visit rob relyea's post</a> on more mime types for all xaml supported apps including xaml browser apps as well.</p>
<p>i've been seeing some discussion lately about hosting <a rel="tag" href="http://silverlight.net">silverlight</a>.  maybe i can take a moment here to help clarify some things and show some options.</p>
<p>there are hosters out there that are <a href="http://blogs.msdn.com/brada/archive/2007/06/01/silverlight-hosting.aspx">promoting as silverlight hosters</a>.  while i think that is great, i think some of the messaging has confused others.  for example, if you go to a hoster that doesn't list silverlight support, are they incapable of hosting silverlight?  no.</p>
<p>in fact, a windows server isn't even required for straight-up silverlight hosting.  of course the caveat here being if your silverlight application is embedded within an asp.net application, then yes, of course, windows would be needed.  but lets assume simple lame examples here.  i took 10 minutes (longer to find a good rated one) and setup a free linux host account.  the particular host i selected is running apache 1.3.37 on some unix blend (read: no windows).  i created a silverlight 1.0 application and a silverlight 1.1 application.  i logged in to my free account, uploaded the files, and voila.</p>
<ul>
    <ul>
        <li>sample 1: <a href="http://www.zendurl.com/t/timheuer/v1_0/Default.html">silverlight 1.0 lame application served via apache</a> </li>
        <li>sample 2: <a href="http://www.zendurl.com/t/timheuer/v1_1/Default.html">silverlight 1.1 lame application served via apache with c# code</a> </li>
        <li>sample 3: <a href="http://www.zendurl.com/t/timheuer/media/Default.html">silverlight application media player served via apache</a> (<a href="http://s3.amazonaws.com/timheuer-img/SamplePlayer.zip">sample code here</a>) </li>
    </ul>
</ul>
<p>so there you have it, no windows and still silverlight.  why?  well the server just needs to deliver the assets to the browser (where the plugin is) -- as silverlight is a client technology.  apache is even just serving up the windows media file as a progressive download.</p>
<p>so in 10-15 minutes i created 3 lame applications, a totally free *nix/apache host and put up some silverlight.  proof enough?</p>
<p>now what about windows you ask?  some of you may have listen to the most excellent <a href="http://www.dotnetrocks.com">.NET Rocks!</a> podcast.  some of you may have even heard the <a href="http://www.dotnetrocks.com/default.aspx?showNum=258">recent silverlight discussion with shawn wildermuth</a>.  in that show carl mentioned to shawn that he had to install .net 3.0 on his windows server to get silverlight to work.  as i was listening to this (as i'm sure shawn was) i was confused.  it was a time i wish .NET Rocks! was live so i could call in talk some smack.  but carl's not a dumb guy and although they didn't debug the situation on his show, he did bring out a point.</p>
<p>you see, your typicall windows server installation these days with iis6 is pretty locked down.  so much to the point that unknown file types are served 404 style from the server (which i believe what was happening to carl).  it's been pointed out a few times in the forums as well.  what is going on you ask?  well, likely it is the .xaml file.  iis6 doesn't know this file type and there is no wildcard mime types set up to just allow freestyle.  if you find yourself in this situation, don't panic.  simply add the mime type (file: .xaml; type: application/xaml+xml -- or you can even use text/xml -- there are reasons you might want xaml+xml for XAML browser apps, etc.) and you are fine.  in fact if you are in a shared host environment and they don't have that setup, you can't get to it, whatever then guess what: just rename your xaml files to .xml -- or heck .txt.  now this may pose some annoyances in your dev toolset, but it is a workaround.  where do you change MIME types you ask?  when you start the iis manager, you can right click on the server name, choose properties and you'll see a mime types button -- go there.  this will change it globally.  you can also just add on a per site basis if desired, just look in the site properties.</p>
<p>so why did carl think .net 3 was required and it was working after he installed it?  well, .net 3 supports XAML browser apps (xbaps).  the installation of the framework adds the supported types for you if iis exists.</p>
<p>what about other hosting options.  well, there is also <a href="http://silverlight.live.com">silverlight streaming services</a>, a free service from microsoft enabling you (currently) 4GB of space and will essentially host your silverlight application for you and enable various ways of streaming it out via code or through simple iframe calls as well.  this requires no server on your part :-).</p>
<p>so let's replay our options here for silverlight hosting:</p>
<ul>
    <ul>
        <li>windows required: no </li>
        <li>must be silverlight enabled: depends on how locked down the server was, possible mime type change is all that is needed </li>
        <li>*nix/osx/pick-your-os: yes as long as a web server can respond to HTTP GET </li>
        <li><a href="http://silverlight.live.com">silverlight streaming services</a> </li>
    </ul>
</ul>
<p>i hope this helps clear things up and at least not make them more murky waters for you.  if so, drop a comment and lets clear it up.  i think it is great hosters are recognizing silverlight and are noting it as a feature for their customers to look for, but just remember that any web server can serve up silverlight content.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:9c0dbc48-e320-4768-b583-12eef73151af" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
