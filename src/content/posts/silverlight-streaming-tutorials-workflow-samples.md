---
title: "silverlight: return of the clean and my toolbox"
slug: "silverlight-streaming-tutorials-workflow-samples"
pubDate: 2007-08-09T22:26:29.000Z
lastModified: 2019-10-23T04:20:07.000Z
categories:
  - "silverlight streaming"
  - "silverlight"
  - "expression"
  - "expression design"
  - "blend"
  - "expression blend"
  - "xaml"
  - "atlas"
  - "asp.net"
  - "ajax"
  - "visual studio"
  - "design"
  - "asp.net ajax"
  - "vector"
draft: false
---

<p>you can tell when a new fiscal year has started (or at least the month after a new fiscal year).  people are back from vacations, meetings are more frequent, last-minute trips are planned, you get the picture.  all of this has been counterproductive to me being able to really sit down and do some fun things with <a rel="tag" href="http://silverlight.net">silverlight</a>.  not to feat though, some great things have been going on.</p>
<p>after i had helped "<a href="http://hanselman.com/blog">bcl man</a>" :-) upload some videos of <a href="http://www.hanselman.com/blog/SilverlightVideoOfJohnLamOnIronRubyAtPADNUG.aspx">ironruby</a>, i decided it did not do him justice to use one of the vanilla templates and altered it a bit to match the current style of his site.  it took all of 10 minutes to do it.  how?  well, i'm working on a screencast to demonstrate just how easy it is to cheat :-).  in the meantime, <a href="http://hanselman.com/blog">scott</a> did notice <a href="http://www.hanselman.com/blog/CommentView.aspx?guid=ec7f7827-8073-4835-ab15-516048071c89">that one of the minimalist templates was <strike>removed</strike> missing from the expression media encoder update</a>.  what is great is that the <a href="http://www.clarkezone.net/default.aspx?id=f5e234ff-dbc7-4223-95d0-12ef8319d8f6">team listened to the feedback (wait, aren't they listening to a fellow employee now?) and put it back in</a>.  very cool.  although i'm not a huge fan of 'clean' i think it represents a good start for using silverlight to render media in a custom player.  to use 'clean' simply extract it into your &lt;installdir&gt;\Microsoft Expression\Media Encoder 1.0\Templates\en\ folder and it will show up in the output options.</p>
<p>which brings me to my next thoughts...there is a lot of options to learn silverlight out there.  i've been trying to provide some quick hits myself.  in doing so i think there have been a lot of assumptions made to our users/developers.  if you troll the forums, you'll notice people are struggling at times with simply getting started.  i've been asked a few times and helped a few of 'what do i need' to do silverlight.  well, here's my toolbox (in install order).</p>
<ul>
    <ul>
        <li>windows vista ultimate (hey, i'm a windows guy...and it has ultimate in the title...c'mon tell me you don't want that over premium :-)) </li>
        <li>expression design -- not using too much, but that's because i'm working in simple art now. </li>
        <li>blend 2 august preview -- note that you can install this on top of blend v1 rtm and they run side-by-side if needed.  when you install blend2 you'll notice that there is only one silverlight project type (javascript)...standby and keep installing... </li>
        <li>visual studio 2008 beta 2 -- why beta 2?  well, up until beta 2 dropped, i'd been using visual studio 2005 to do silverlight...which is perfectly fine actually (some subtle nuances, but okay if you don't want to install beta), but then with the beta 2 drop i noticed that it is now my single ide.  why?  multi-targeting baby.  i can start a new project and tell the ide what fx version to use...wicked, wicked cool -- this has been needed for some time! </li>
        <li>silverlight 1.1 alpha refresh -- now why not just v1?  well, here's the deal...installing v1.1 alpha refresh *gives you 1.0 already* -- i've seen people install both...you don't need to.  installing 1.1 gives you both my friend.  now, the plugin for 1.1 doesn't auto update right now so you'll have to update yourself, but for me as a developer, i recommend using v1.1 to get your chops going. </li>
        <li>silverlight tools for alpha -- this gives you the orcas project templates, intellisense, project linking, etc.  when you are in vs2008, these help. </li>
    </ul>
</ul>
<p>that's it -- when you have that, you have a great environment to develop silverlight apps.  now there are a few other things you can put on (like media encoder), but i'm just talking basics here that make me productive.  now when you launch blend2 you'll see the 1.1 project templates as well.</p>
<p>now, here's my workflow when doing a silverlight app.</p>
<ol>
    <ol>
        <ol>
            <li>i start in blend.  why?  it really is a fun tool to work in.  for what i've been doing it makes sense to start there.  honestly i don't want to do xaml by hand...forgive me.  blend is an intuitive tool even for non-professional interactive folks like myself.  i make sure the xaml i need is there, tight, etc.  i create my xaml controls, etc.  if i'm using javascript for v1, sometimes i just stay in there and use notepad for javascript. </li>
            <li>once i've gotten it to a certain point (and assuming i'm doing 1.1 development) i right click on the project in blend and say "edit in visual studio" -- boom vs2008 launches and i can get to some geek code. </li>
            <li>at this point it is iterative for me.  i'll inevitably find something that wasn't right in my thoughts in deisgn and move back and forth -- i keep both tools open at this point. </li>
        </ol>
    </ol>
</ol>
<p>one note i've found is that when you "F5" your project (that's keyboard-shortcut-lingo for 'run') in vs2008 it launches it as a file system.  this could be frustrating for some if you are using downloader objects as the RC doesn't allow the file:/// protocol anymore (which by default launching as a file system project it would be using).  if i <strong>know</strong> i'll be doing this, i simply open the blend project as a web site (file, open web site) and then it runs under cassini, problem solved.</p>
<p>so that's my quick and dirty on my environment and my workflow.  simple enough i think.</p>
<p>off to samples.  so here's my plan on what i'd like to create and stuff i'm working on:</p>
<ul>
    <ul>
        <li><a href="http://timheuer.com/blog/archive/2007/08/31/cheating-creating-silverlight-media-player.aspx">cheating at building a custom media player</a> </li>
        <li>consuming web services in silverlight </li>
        <li>writing a custom control for silverlight: <a href="http://timheuer.com/blog/archive/2007/08/19/implement-user-control-in-silverlight-user-controls.aspx">part 1</a> and <a href="http://timheuer.com/blog/archive/2007/08/20/silverlight-user-controls-silverlight-1_1.aspx">part 2</a>  </li>
        <li>end-to-end using silverlight streaming </li>
        <li><a href="http://timheuer.com/blog/archive/2007/08/30/convert-vector-svg-to-xaml-for-silverlight.aspx">part 1: getting vector art for a starting point</a> (using expression design and files you find on the internet) </li>
        <li>part 2: leveraging the vector art in silverlight in combination with asp.net ajax for a compliementary interaction </li>
        <li>part 3: using asp.net ajax to create a silverlight control and create some dynamic interaction with both (for this series, my comrade <a rel="tag" href="http://www.robbagby.com">rob bagby</a> is coming to the rescue to demonstrate a pattern on doing this). </li>
        <li>integrating windows live services with silverlight </li>
        <li>integrating 3rd party api's (yelp, facebook) with silverlight </li>
    </ul>
</ul>
<p>i noticed that <a href="http://blogs.msdn.com/webnext/archive/2007/08/10/zero-to-hero-getting-started-with-silverlight.aspx">laurence</a> also is working on some good things and sees the need as well for some back-to-basics starting points.</p>
<p>so what do you think?  what would you like to see from all of us?  seriously, please comment and suggest.  i really want to make people more productive in their use of our tools and frameworks...give some thought and make some suggestions on what you'd like to see or what from the above would be lame (i might do it anyway, but just want a pre-opinion i guess).</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:86e7d8d9-0426-49ca-92a1-b077b71348ee" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
