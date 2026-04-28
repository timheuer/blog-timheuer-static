---
title: "svn commit my_contribution_to_OSS"
slug: "first-contribution-made-to-open-source-subtext"
pubDate: 2008-06-25T21:24:27.000Z
lastModified: 2019-10-23T04:20:20.000Z
categories:
  - "subtext"
  - "open source"
  - "oss"
  - "svn"
  - "sourceforge"
  - "haack"
draft: false
---

<p>As I patiently awaited, here’s what was presented to my browser:</p>
<p><img title="Build successful image" alt="Build successful image" src="http://s3.amazonaws.com:80/timheuer-img/subtextbuildimage.png" /></p>
<p>I’ve made my first official “commit” to an open source project that I didn’t start.  I feel good.  I feel like cracking open a Mt. Dew and going crazy.  Honestly though it does feel good (and fun).  </p>
<p>My blog engine I use is <a rel="tag" href="http://www.subtextproject.com/">Subtext</a>.  It’s the blog engine I’ve used almost exclusively (I actually started with .Text before scottw <strike>sold out</strike> went to <strong>Telligent</strong> to make Community Server.  I kid of course, Scott is a great guy, and very smart.  But when .Text was seemingly going to get stale, others stepped in.  Notably <strong>Phil Haack</strong> started <strong>Subtext</strong> which was an initial fork of .Text.  I’ve used it ever since and haven’t looked back.</p>
<p><img title="SubText logo" style="MARGIN: 0px 10px 0px 0px" alt="SubText logo" align="left" src="http://s3.amazonaws.com:80/timheuer-img/subtextwlw.png" />Subtext has a great community of developers that communicate regularly, share ideas, get feedback…all the things you’d expect out of an <strong>OSS</strong> project but don’t always get.  As I mentioned this was the first project I really got dirty in that wasn’t mine in the OSS world.  Over the past year or so I’ve been giving feedback, making some modifications to fit my needs, etc. but hadn’t really contributed much literally beyond “you guys should do this” comments.  Most of that was because of time and because I had fixed things for my own needs.</p>
<p>Until today.  This past week I had been submitting patches to the team with feedback and things that I really felt valuable and used in my custom build.  Yesterday I got an email from Phil asking if I wanted commit rights to the SVN repository.  I admitted my nervousness, but he let me in anyway :-).  I have to admit that the image above wasn’t the first one I received :-).  I was quickly met after my first commit with a failed build.</p>
<p>Sunofa...I broke the build.  Well, I will go to my grave saying that I didn’t, but something did.  I believe the popular thing is to blame Vista…so I do that too.</p>
<p>At any rate, with some hand holding I figured out the error of my way (had one file wrong) and got my changes into Subtext 2.0 trunk.  I'm really excited to be a part of this community with Subext even on the smallest scale compared to all the others who do the <strong>real</strong> work.  I'd encourage you all to find an OSS project and help out...with feedback and resolutions.</p>
<p>I'm not sure when my stuff will make it into the next Subtext build for release but I've previously written about what modifications I've made, but here's what I committed today:</p>
<ul>
    <ul>
        <li>Enhanced MetaWeblog API implementation to support providing a "slug" URL name for the post.  This gives the user the option to use the default URL naming, the "auto-friendly" or now to override that with your own slug name. </li>
        <li>Fixed a bug in the SiteMap handler for blogs not hosted at root domains.  Would love people to test this out. </li>
        <li>Added support for WordPress API functions of: newPage, editPage, getPages, newCategory </li>
        <li>Simple modification to the Windows Live Writer manifest to prevent those who think they can future post :-) </li>
        <li>Tag-based RSS syndicator </li>
    </ul>
</ul>
<p>In all honest, most of my submissions were self-motivated.  I think that is really what starts getting people involved in OSS projects...not an interest, but selfishness.  All the changes I made are there to make Subtext+Live Writer the best experience it can be.  With the WordPress API implementation you can now create new "pages" in Writer that are Articles in Subtext.  It also supports adding new categories on the fly within the API.  It may not affect many who use Subtext, but I was happy to contribute and hopefully add some small value to the project!</p>
<p>Related Post:</p>
<ul>
    <ul>
        <li><a href="http://timheuer.com/blog/archive/2008/04/28/subtext-enhancements-for-live-writer.aspx">Some minor Subtext enhancements</a> </li>
    </ul>
</ul>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:da5760bd-e968-4a44-a07a-f6ac431740d4" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; FLOAT: none; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>

