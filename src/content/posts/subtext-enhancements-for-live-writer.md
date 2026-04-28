---
title: "Some minor Subtext enhancements"
slug: "subtext-enhancements-for-live-writer"
pubDate: 2008-04-28T16:00:25.000Z
lastModified: 2019-10-23T04:20:18.000Z
categories:
  - "subtext"
  - "live writer"
  - "windows live writer"
  - "writer"
  - "blog"
  - "blogging"
  - "wordpress"
  - "slug"
  - "wlwmanifest"
draft: false
---

<p>This blog runs on <strong><a href="http://www.subtextproject.com">SubText</a></strong>.  I <strong><u>heart</u></strong> SubText.  I know there are others out there but for me SubText has met <strong>most</strong> of my needs.  And when it hasn’t I modify it.  Which brings me to this post.  There was a thread on an email list I belong to about <strong><a href="http://writer.live.com">Windows Live Writer</a></strong> (I heart Live Writer too :-)) and categories (adding new categories on the fly).  This got me to crack open the source and hunt.  Alas, there was no support for this.  I’ve been ranting about <strong>WordPress API</strong> support for SubText on the developer list and I think if I rant one more time it will probably get assigned to me.  Please keep in mind that my modifications were solely intended to make Live Writer the best tool for me…these are targeted at Live Writer functionality and may/may not add value to other areas of functionality.  So on with the show…</p>  <p><strong><u>The Slug</u></strong></p>  <p>One of the features in SubText is the ability to auto generate URLs based on the title of the blog post.  Well, I didn’t like that.  I usually want my URLs to be a slight derivative of the URL.  My workflow, then, has been to post as draft, go to the web interface, change and then enable the <strong>syndication</strong>.  I am sick of doing that.  So let’s start with that first.  You see in blog terms the end part of your URL in called a “slug.”  SubText calls this a ‘friendly url’ and other engines may call it something else.  Here I’m going to call it a slug.  My colleague <a href="http://www.jasonmauer.com">Jason Mauer</a> has a custom blog engine he uses where he’s implemented almost every blogging API in his set.  I’ve been geekly jealous of his API for some time…now it is time to change that.</p>  <blockquote>   <p>I’m not going to go into the philosophical reasons <em>why</em> I want a different URL slug and why I want different ones.  We can debate that over a Mt. Dew some time if you’d like.</p> </blockquote>  <p>SubText uses the <strong>MetaWeblog</strong> API by default.  The developers chose to implement the spec of MetaWeblog (as they should have) and thus the slug is not a part of the <strong>newPost</strong> spec and the Post struct used to identify the structure of a post.  So my modification was a few steps.  If you are familiar with the latest source (1.9.5b) of SubText, I’ll be referring to line numbers in there.  First, I had to modify that Post struct for the MetaWeblogAPI implementation.  Now some may shirk that this is a no-no…and I might agree…so if modifying something that isn’t going to conform to a spec that really isn’t full anymore, then move along.  I modified about line 63 and added the following:</p>  <pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">string</span> wp_slug;</pre>

<p>I actually could have used <strong>wp_slug</strong> or mt_basename, both of which mean the same thing and both of which are sent to the API by Live Writer…so I just picked one.  Now my struct has the information when it passes it along for creation/edit of the post via Live Writer.</p>

<p>The next step was to modify the implementation of the post.  In MetaWeblog.cs at about line 234 I added:</p>

<pre class="csharpcode"><span class="kwrd">if</span> (!<span class="kwrd">string</span>.IsNullOrEmpty(post.wp_slug))
{
    entry.EntryName = post.wp_slug;
}</pre>

<p>I also added this to the editPost method to ensure compatibility on edit.</p>

<p>The final step was to modify my <strong>wlwmanifest.xml</strong> file to announce to Live Writer that I now support this feature.  This is done by adding to the &lt;options&gt; node of this manifest:</p>

<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">supportsSlug</span><span class="kwrd">&gt;</span>Yes<span class="kwrd">&lt;/</span><span class="html">supportsSlug</span><span class="kwrd">&gt;</span></pre>

<p>Then do a refresh of the account settings in <strong>Live Writer</strong>.  When you do that, in a new post click the little ‘up’ arrow just underneath the editing area and you should now see a Slug field:</p>

<p><img src="http://s3.amazonaws.com:80/timheuer-img/wlw-slug.png" /></p>

<p>Now I don’t have to post a draft and login to change!</p>

<p><strong><u>New Categories</u></strong></p>

<p>The thread actually started with wanting to create new categories during a post.  SubText is one of the engines that doesn’t expose this API directly just yet, so some altering had to be done.  Here’s what I did.  I chose to mirror the WordPress newCategory method to do this.  </p>

<p>First I added IWordPressApi.cs to Subtext.Framework.XmlRpc.  The complete code within it is:</p>

<pre class="csharpcode"><span class="kwrd">using</span> System;
<span class="kwrd">using</span> CookComputing.XmlRpc;

<span class="kwrd">namespace</span> Subtext.Framework.XmlRpc
{

    <span class="kwrd">public</span> <span class="kwrd">struct</span> WordpressCategory
    {
        <span class="kwrd">public</span> <span class="kwrd">string</span> name;
    }

    <span class="kwrd">public</span> <span class="kwrd">interface</span> IWordPressApi
    {
        [XmlRpcMethod(<span class="str">"wp.newCategory"</span>, 
            Description = <span class="str">"Adds a new category to the blog engine."</span>)]
        <span class="kwrd">int</span> newCategory(
          <span class="kwrd">string</span> blogid,
          <span class="kwrd">string</span> username,
          <span class="kwrd">string</span> password,
          WordpressCategory category);
    }
}</pre>

<p>I then went into MetaWeblog.cs and implemented that interface with:</p>

<pre class="csharpcode"><span class="kwrd">public</span> <span class="kwrd">int</span> newCategory(<span class="kwrd">string</span> blogid, <span class="kwrd">string</span> username, <span class="kwrd">string</span> password, WordpressCategory category)
{
    LinkCategory newCategory = <span class="kwrd">new</span> LinkCategory();
    newCategory.CategoryType = CategoryType.PostCollection;
    newCategory.Title = category.name;
    newCategory.IsActive = <span class="kwrd">true</span>;
    newCategory.Description = category.name;

    newCategory.Id = Links.CreateLinkCategory(newCategory);

    <span class="kwrd">return</span> newCategory.Id;
}</pre>

<p>I chose to ignore the slug/description fields (again, thus ignoring the spec which isn’t ideal) at this time, partly because I was getting errors and partly because I decided that I didn’t need them anyway.  I don’t use the description field in categories in SubText, so I just set the description to also be the title.  I also had to modify the wlwmanifest.xml file with:</p>

<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">supportsNewCategories</span><span class="kwrd">&gt;</span>Yes<span class="kwrd">&lt;/</span><span class="html">supportsNewCategories</span><span class="kwrd">&gt;</span></pre>

<p>and refresh my Live Writer account profile to pick up the changes.  The result is now my category options in Live Writer include an “add” feature:</p>

<p><img src="http://s3.amazonaws.com:80/timheuer-img/wlw-cats.png" /></p>

<p>Done with both of those.</p>

<p><strong><u>Future Posting</u></strong></p>

<p>This is something I started to look at and added the information to the MetaWeblog API, but it seems that SubText doesn’t filter out future posts in the UI – or at least my quick scan didn’t reveal it did.  I’ve moved on away from this one since I don’t future post right now, but I’ll come back to it in a while.  What I did do, however, to prevent me from thinking SubText supported this was modify my wlwmanifest.xml file to include this definition in the options:</p>

<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">futurePublishDateWarning</span><span class="kwrd">&gt;</span>Yes<span class="kwrd">&lt;/</span><span class="html">futurePublishDateWarning</span><span class="kwrd">&gt;</span></pre>

<p>This way at least if the idiot in me *thinks* I can do it, Live Writer will warn me.</p>

<p><img src="http://s3.amazonaws.com:80/timheuer-img/wlw-warning.png" /></p>

<p>So that’s it!  These little adjustments make my <strong>Live Writer + SubText</strong> experience AWESOME.  Live Writer truly is one of the best tools Microsoft puts out (aside from <a href="http://silverlight.net/">Silverlight</a> of course).  I’m going to submit these modifications to the SubText team and see what sticks.  I assume none will since they are admittedly partial.  But I’ve been suggesting on the dev list that SubText expose a WordPress API and I have a feeling I’ll need to start working on that for the team.</p>

<p>Hope this helps some of you!</p>

<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:53506492-c1d0-4ac2-b158-d46e01ee6693" style="padding-right: 0px; display: inline; padding-left: 0px; float: none; padding-bottom: 0px; margin: 0px; padding-top: 0px"></div>
