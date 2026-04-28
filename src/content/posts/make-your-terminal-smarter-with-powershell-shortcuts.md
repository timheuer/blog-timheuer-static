---
title: "Make your terminal smarter with PowerShell and Set-Location"
slug: "make-your-terminal-smarter-with-powershell-shortcuts"
pubDate: 2019-10-20T10:02:24.000Z
lastModified: 2019-10-23T17:21:57.000Z
description: "Spice up your Windows Terminal"
categories:
  - "terminal"
  - "win10"
draft: false
---

<p>On this lazy Sunday morning I was catching up among the feeds and saw Scott Hanselman’s post about <a href="https://www.hanselman.com/blog/HowToMakeAPrettyPromptInWindowsTerminalWithPowerlineNerdFontsCascadiaCodeWSLAndOhmyposh.aspx">customizing Windows Terminal</a> a bit more.  I had already done this a while back and got my terminal all fancy looking with those cool Powerline fonts and such.  </p><p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Screenshot of Windows Terminal" src="https://storage2.timheuer.com/sroot-static.png" /></p><p>It’s a simple thing, but actually does make my experience a bit nicer to work in the terminal environment.  I’m not really a CLI kind of person – it’s growing on me though – so these customizations help make it more pleasing to me.  I use <strong>PowerShell</strong> (<a href="https://docs.microsoft.com/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-6&amp;WT.mc_id=timheuer-blog-timheuer"><strong>PowerShell Core</strong></a> to be specific) as my default shell.  I use it because I like the ability of some of the modules from time to time that enable me to do some quick things working with Azure.  Scott’s post had a step to customize basically your startup script for PowerShell.  You can get to this from your shell by typing:</p><p /><pre class="brush: ps; toolbar: false;">notepad $PROFILE
</pre><p>from a PowerShell prompt.</p><blockquote><p><strong>NOTE</strong>: PowerShell and PowerShell Core do NOT share the same profile script, so if you want similar customizations for both, you need to edit both profiles.  The $PROFILE trick above will take you to the right startup profile script for each shell.</p></blockquote><p>As I inspected mine, I was reminded of my favorite command: <a href="https://docs.microsoft.com/powershell/module/microsoft.powershell.management/set-location?view=powershell-6&amp;WT.mc_id=timheuer-blog-timheuer"><strong>Set-Location</strong></a>.  It’s simple but it will let you basically create aliases to quickly move to directories.  Take a look in action for me.  While I do have a startup directory configured for <a href="https://devblogs.microsoft.com/commandline/introducing-windows-terminal/?WT.mc_id=timheuer-blog-timheuer"><strong>Windows Terminal</strong></a>, it’s nice to quickly navigate around.</p><p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Animated GIF image of using Windows Terminal shortcuts" src="https://storage2.timheuer.com/sroot-animated.gif" /></p><p>So for me I’ve got a few quick shortcuts to get to some most-used directories while working in Terminal.  Here’s mine that I have:</p><p /><pre class="brush: ps; toolbar: false;"># Helper function to change directory to my development workspace
function source { Set-Location c:\\users\\timheuer\\documents\\github }
function ghroot { Set-Location c:\\users\\timheuer\\documents\\github }
function sroot { Set-Location c:\\users\timheuer\\source\\repos }
function dl { Set-Location c:\\users\\timheuer\\downloads }
function desk { Set-Location c:\\users\\timheuer\\desktop }
function od { Set-Location c:\\users\\timheuer\\OneDrive }
</pre><p>It’s dumb simple, but it saves me keystrokes when I’m working in Terminal and moving back and forth.  What’s your favorite tips to use in Terminal?</p>
