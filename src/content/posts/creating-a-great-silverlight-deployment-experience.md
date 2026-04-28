---
title: "Providing a great Silverlight deployment experience"
slug: "creating-a-great-silverlight-deployment-experience"
pubDate: 2008-03-25T21:29:06.000Z
lastModified: 2019-10-23T04:20:17.000Z
categories:
  - "silverlight"
  - "plugin"
  - "firefox"
  - "silverlight.js"
  - "swfobject"
  - "internet explorer"
  - "ie"
  - "object"
  - "ie8"
  - "deployment"
  - "no silverlight"
  - "add-ins"
  - "add-ons"
draft: false
---

<p>If you are doing <strong><a href="http://silverlight.net/">Silverlight</a> </strong>development, you are no doubt slapping in the &lt;object&gt; tag or using the &lt;asp:silverlight&gt; control (if in ASP.NET) to host your Silverlight content/application.  This is all great, but don't forget about deployment!</p>
<p>When I talk about Silverlight I like to relay a story I heard from one of the Silverlight program managers (PM) a while back.  The PM was pretty excited about a feature just completed in Silverlight and one of the samples that had been created.  He went home to show his wife and told her to 'go to 'dub-dub-dub-dot-something-dot-com' (yelling from the other room of course) and to tell him what she thought.  After a long pause of a few minutes he shouted back 'what do you think?'  Her response: 'It's lame.'  He was no doubt offended until he walked up to her machine and on the screen saw this:</p>
<p><img alt="Silverlight Install Image" src="http://go.microsoft.com/fwlink/?LinkID=92801&amp;clcid=0x409" /> </p>
<p><strong><u>The Problem</u></strong></p>
<p>You see, 'Get Silverlight' means nothing to your <a href="http://timheuer.com/blog/articles/motherinlawfactor.aspx">mother-in-law</a> (or wife in this matter).  Technology means nothing to non-geek users.  Content is king.  And to your non-savvy users (and even your savvy ones), leaving this default experience isn't a wise one.  It doesn't convey that there is anything of value by installing something they might not have.  It doesn't even convey what the action is going to be when they 'Get Microsoft Silverlight.'  Leaving this experience unchecked leaves your users in the dark as well as a reputation rank downward in my opinion.</p>
<blockquote>
<p>NOTE: This site is likely riddled with these badges as seen above.  I'm claiming exempt status because they are samples :-).</p>
</blockquote>
<p>While in Silverlight 1.0 <a href="http://timheuer.com/blog/archive/2007/10/29/whitepaper-on-optimizing-silverlight-install-experience-with-samples.aspx">creating a great install experience was possible</a>, Silverlight 2 makes that process so much easier.  In Silverlight 1.0, the use of the silverlight.js file could aid in detection and direction to an alternate experience.  This method is still possible in Silverlight 2, and in fact might be a best practice still.  Most interactive developers using Flash use some <a href="http://blog.deconcept.com/swfobject/">method of script creation</a> in instantiating the Flash host.  This is mostly due to the IE EOLAS "click to activate" issue that has been resolved and will remedy in an <a href="http://blogs.msdn.com/ie/archive/2007/11/08/ie-automatic-component-activation-changes-to-ie-activex-update.aspx">upcoming IE update</a>.</p>
<p><strong><u>Some Solutions</u></strong></p>
<p>So that brings a few methods for instantiating the Silverlight control host.  You can still use a script method to do the check for you and provide alternate content or redirect to something.  You can also still simply include the &lt;object&gt; tag itself.  My favorite is using the simple &lt;object&gt; tag and tricking the HTML.  You see an object tag might look like this:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">object</span> <span class="attr">type</span><span class="kwrd">="application/x-silverlight-2-b1"</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="source"</span> <span class="attr">value</span><span class="kwrd">="ClientBin/CallingServices.xap"</span><span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="onerror"</span> <span class="attr">value</span><span class="kwrd">="onSilverlightError"</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="background"</span> <span class="attr">value</span><span class="kwrd">="white"</span> <span class="kwrd">/&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">div</span> <span class="attr">id</span><span class="kwrd">="no-sl"</span> <span class="attr">class</span><span class="kwrd">="install-badge"</span><span class="kwrd">&gt;</span>Some descriptive information<span class="kwrd">&lt;/</span><span class="html">div</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">object</span><span class="kwrd">&gt;</span></pre>
<p>Notice the random HTML after all the params?  Browsers will read the HTML like a book (US-English) from top to bottom.  They get to the object tag and can't understand it, so will look at the next part of the DOM.  Param tags...nope don't get it.  Next part.  Oh, a &lt;div&gt; element...yep I understand...begin render.</p>
<p>Within here you can put an image or some element with a CSS class that is absolutely positioned, etc.  Bottom line is you own that experience.  It is now on <strong>you</strong>, the developer, to ensure that your users aren't just seeing 'Get Silverlight' but are being provided at least some explanation of what they are about to see, why they should install this plugin, etc.</p>
<p><strong><u>Some Examples</u></strong></p>
<p>Perhaps you need some inspiration?  Here's some examples from some recent sites...</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/nosl-gallery.png" /><br />
<em><a href="http://silverlight.net/showcase">Silverlight.net Gallery</a> </em></p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/nosl-zombomatic.png" /><br />
<em><a href="http://www.miniclip.com/games/zombomatic/en">Zombomatic Game on Miniclip.com</a></em></p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/nosl-wwe.png" /><br />
<em><a href="http://www.wwe.com/inside/silverlight/launch/">WWE Insider Video</a></em></p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/nosl-hardrock.png" /><br />
<em><a href="http://memorabilia.hardrock.com/">Hard Rock Memorabilia Site</a></em></p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/nosl-goldenglobes.png" /><br />
<em><a href="http://www.etonline.com/silverlight/globes65/">65th Annual Golden Globes</a></em></p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/nosl-mlb.png" /><br />
<em>Major League Baseball Video</em></p>
<p>As you can see, the options are endless from very simple, to heavily branded.  </p>
<p><strong><u>Testing your deployment experience</u></strong></p>
<p>So now that you've decided you are going to optimized that "no Silverlight" experience, how do you go about testing it?  Well, here's a simple trick that I employ to do this.  There is no need to uninstall/re-install the runtime on your machine.  In fact, this will likely give you headaches in doing so and waste endless minutes :-).  Here's a simpler way.</p>
<p>In Internet Explorer you have the ability to manage your add-on experience.  To test your "no Silverlight" experience, simply do the following.</p>
<p>To make it easier go to a page with Silverlight content.  You can do this without this step, but it will cost you 2 extra clicks and I'm trying to save you time.</p>
<p>Next, go to Tools...Manage Add-ons...Enable or Disable Add-ons:</p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/nosl-step1.png" /></p>
<p>Now, find Microsoft Silverlight in the Enabled section and change the radio button to 'Disable' and click OK.  </p>
<p><img alt="" src="http://s3.amazonaws.com:80/timheuer-img/nosl-step2.png" /></p>
<p>You will be prompted with a message which you can just click OK through.  The page will be refreshed and the Silverlight plug-in no longer enabled.  Now any site you visit will give you the "no Silverlight" experience for you to test your deployment experience.  When you want to re-enable, simply repeat the process and choose 'Enable' and you are back in business.  No messy control panel uninstall/re-install mess.</p>
<p>I'm not a Firefox power user and couldn't find an easy way to do this rapidly without installing another plugin, so if anyone knows the similar method in Firefox, please enlighten me (or Safari for that matter).  I tried searching and found solutions of moving the plugin out of the /plugins folder in Firefox so I'd imagine you could batch script this out.  I really like the ease that Internet Explorer provides in managing my own preferences for each add-in running.  Looks like this gets even better in IE8.  I'm actually surprised it isn't a part of Firefox.</p>
<p><strong><u>Summary</u></strong></p>
<p>The bottom line is: don't ignore this experience.  This is your chance to explain that the user is about to see premium content, a better user experience, a fun game, whatever it is you are trying to convey.  I hope this has helped at least some be enlightened on ensuring you make that a work item in your task list and the tip of disabling the add-in is helpful to some.  </p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:3561c339-92dd-4cb6-bf7b-856cbdf472d4" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
