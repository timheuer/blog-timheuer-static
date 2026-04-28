---
title: "holy regex batman"
slug: "regex-patterns-advanced"
pubDate: 2007-08-13T09:53:16.000Z
lastModified: 2019-10-23T04:20:07.000Z
categories:
  - "regex"
draft: false
---

<p>last week i was getting real frustrated with some regex madness.  i had a string here:</p>
<blockquote>
<pre class="csharpcode"><span class="kwrd">&gt;</span>Status Updates<span class="kwrd">&lt;/</span><span class="html">b</span><span class="kwrd">&gt;&lt;</span><span class="html">br</span> <span class="kwrd">/&gt;&lt;</span><span class="html">form</span> <span class="attr">action</span><span class="kwrd">="home.aspx"</span> <span class="attr">method</span><span class="kwrd">="post"</span><span class="kwrd">&gt;<br />&lt;</span><span class="html">input</span> <span class="attr">type</span><span class="kwrd">="hidden"</span> <span class="attr">name</span><span class="kwrd">="post_form_id"</span> <span class="attr">value</span><span class="kwrd">="blah"</span> <span class="kwrd">/&gt;</span>Tim is testing....</pre>
</blockquote>
<p>and was needing to get the value attribute out.  i was using the regex pattern of:</p>
<blockquote>
<pre class="csharpcode">\"post_form_id\"\svalue=\"(?<span class="kwrd">&lt;</span><span class="html">formId</span><span class="kwrd">&gt;</span>(.*))\"</pre>
</blockquote>
<p>and it was giving me the starting point but also the rest of the string at the end.  argh!  i am not an advanced regex guru and was getting pretty frustrated about the solution.  luckily some other people with mad skillz came to my rescue (thanks dino and <a href="http://blogs.msdn.com/zainnab">zain</a>). </p>
<p>taking the modified pattern to:</p>
<blockquote>
<pre class="csharpcode">"\"post_form_id\"\\svalue=\"(?<span class="kwrd">&lt;</span><span class="html">formId</span><span class="kwrd">&gt;</span>(?:[^\"]*))\""</pre>
</blockquote>
<p>gave me the specific outcome i expected and the capture into my group that i needed.  so i was happy.  the explanation of why the first pattern wasn't working was because my ".*" was slurping up all the good stuff including all text until the last double-quote.  to my feeble brain it didn't make too much sense as when i look at the pattern it looked good, but i digress.</p>
<p>anyhow, in this exercise i learned that zain had a webcast series on regex.  so if you want to be immersed in a series of non-readible characters with all sorts of brackets, head on over to <a href="http://blogs.msdn.com/zainnab/pages/webcasts-page.aspx">zain's world for his webcast series all about regex</a>.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:928c92c5-6330-4818-aa7b-694944877872" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
