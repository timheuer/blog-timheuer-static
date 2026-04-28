---
title: "Debugging Silverlight with Visual Studio and Firefox"
slug: "enable-silverlight-debugging-in-firefox-visual-studio"
pubDate: 2010-08-16T10:27:10.000Z
lastModified: 2019-10-23T04:20:36.000Z
categories:
  - "silverlight"
  - "xaml"
  - "firefox"
  - "visual studio"
  - "debugging"
draft: false
---

<p>Suppose you use Firefox as your default web browser and you are a <a href="http://www.silverlight.net">Silverlight</a> developer using Visual Studio.  You may have been frustrated at times in being able to get the debugger to attach to your breakpoints.  You’ve triple-checked that you are in debug mode, that the Silverlight checkbox is marked in the hosting web application’s property pages and it still is not breaking for you.  You stare at the dreaded empty red circle in Visual Studio reading the tooltip of “No debug symbols have been loaded…” a thousand times.</p>  <p>But it works in Internet Explorer.</p>  <p>I’ve faced this a few times and always forget the tip.  I’m recording it for my own posterity, but hopefully it will help others as well.</p>  <p>Here’s how to ensure the VS debugger attaches to the Silverlight app for debugging:</p>  <ul>   <li>In Firefox address bar type <strong>about:config</strong></li>    <li>Read the warning, choose your preference to always remind you or not and accept</li>    <li>In the search bar of the config options now type: <strong>npctrl</strong></li>    <li>You should then see the entry: <strong>dom.ipc.plugins.enabled.npctrl.dll</strong></li>    <li>Change the value from <strong>true</strong> to <strong>false</strong> (simply double-clicking will change this for you)</li>    <li>Restart Firefox</li> </ul>  <p>And your debugging should come back to normal.  It has frustrated me more than once.  Hopefully it helps some others.   </p><div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:854a0596-66ba-4e9d-9965-2955ba24856a" class="wlWriterEditableSmartContent"></div>
