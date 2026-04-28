---
title: "trouble with vista and asp.net installs?"
slug: "trouble_with_vista_and_asp.net_installs"
pubDate: 2006-06-27T10:38:57.000Z
lastModified: 2019-10-23T04:19:49.000Z
categories: []
draft: false
---

<p>are you running windows vista beta 2 or later?  i am.  more about that some other time and my frustrations as a developer workstation!</p>
<p>at any result, one of the problems i’ve been having is getting use to the user access control features (basically run as a least privelege user).  i couldn’t take it anymore and made myself an administrator.  guess what, still didn’t help, imo (again, more about that when i have time to document the scenarios fully — after all, i’m giving the team a chance…it is beta ;-)).</p>
<p>UPDATE: <a href="http://weblogs.asp.net/scottgu" rel="tag">scottgu</a> pointed me to <a href="http://www.petri.co.il/disable_uac_in_windows_vista.htm">this post on how to turn off UAC</a></p>
<p>well, some of the MSI packages (namely the <a href="http://webproject.scottgu.com/" rel="tag">web application project</a> msi) distributed from the asp.net team will fail when installing on vista even if you are an admin.  why?  seriously, i’m trying to understand that myself.  but nonetheless, i know *where* they are failing — and it is essentially in some areas of installers and log files…minor, but important seeing how any failure in the process of the msi setup will rollback the setup!!!</p>
<p>so, in order to get around it, do this:</p>
<ul>
<li>run a command prompt in elevated mode (right click on command prompt and choose run as administrator)…yeah, i know even if you are an administrator</li>
<li>in a command prompt use msiexec to start the install..like this:</li></ul>
<blockquote><pre>msiexec /i &lt;path-to-msi-package&gt;</pre><br /></blockquote>
<p></p>
<p>i’ve found that worked without error for me…good luck!</p>
<p>tags: <a href="http://technorati.com/tag/asp.net" rel="tag">asp.net</a>, <a href="http://technorati.com/tag/wap" rel="tag">wap</a>, <a href="http://technorati.com/tag/web+application+project" rel="tag">web application project</a>, <a href="http://technorati.com/tag/atlas" rel="tag">atlas</a>, <a href="http://technorati.com/tag/vista" rel="tag">vista</a></p>
