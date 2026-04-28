---
title: "Moonlight 1.0 Released, Silverlight script updated &ndash; and a Chrome hack"
slug: "moonlight-and-silverlight-detection-google-chrome-user-agent"
pubDate: 2009-02-11T17:32:49.000Z
lastModified: 2019-10-23T04:20:27.000Z
categories:
  - "silverlight"
  - "xaml"
  - "moonlight"
  - "mono"
  - "silverlightjs"
  - "chrome"
draft: false
---

<p>First a congratulations to the Moonlight team for reaching their <a href="http://tirania.org/blog/archive/2009/Feb-11.html">official release of 1.0</a>!  Miguel and team have done a great job providing parity with <a href="http://silverlight.net">Silverlight</a> 1.0 and should be proud of their accomplishments.  Miguel, when is Moonlight 2 coming out :-) -- no rest!!</p>  <p>But seriously, this is a good accomplishment for the ecosystem.  Last month I wrote and <a href="http://timheuer.com/blog/archive/2009/01/06/silverlight-install-on-linux-moonlight.aspx">recorded my experience of the Moonlight installer/rendering on an OpenSUSE environment</a>.  What this demonstrated was that we’d integrated the Moonlight redirection/installer into the server-side installer detection from Microsoft.  Users on Linux visiting a Silverlight 1.0 application and not having the plugin would be directed to the Moonlight installer, using the same install link that other Silverlight applications currently leverage.  I think this shows great partnership to both teams to acknowledge and integrate that process.</p>  <p>Today, I updated the user agent detection script for Silverlight to also accommodate this release.  For those who don’t know, there are two helper scripts for Silverlight developers you can leverage:</p>  <ul>   <li><a href="http://code.msdn.microsoft.com/silverlightjs">Silverlight.js</a> – this script helps to detect if the plugin is <em>installed</em> and if so, create’s the appropriate &lt;object&gt; tag representation.</li>    <li><a href="http://code.msdn.microsoft.com/SLsupportedUA">Silverlight.supportedUserAgent.js</a> – this script is also a helper script that can be used with Silverlight.js or alone.  The purpose of this script is to do some pre-checking to see if the browser/platform combination (based on the reporting User Agent string of the browser) will support Silverlight.</li> </ul>  <p>It is the second script that I’m referring to.  The updated release on the <a href="http://code.msdn.microsoft.com/SLsupportedUA">release site for the script</a> (2.0.40211.0) now includes checking for Linux and reporting correctly.  Using this script is as simple as:</p>  <div style="border-bottom: gray 1px solid; border-left: gray 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: consolas, 'Courier New', courier, monospace; max-height: 200px; font-size: 8pt; overflow: auto; border-top: gray 1px solid; cursor: text; border-right: gray 1px solid; padding-top: 4px">   <div style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px">     <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   1:</span> <span style="color: #0000ff">var</span> canSilverlightRun = Silverlight.supportedUserAgent(<span style="color: #006080">"2.0"</span>);</pre>
  </div>
</div>

<p>This code above is basically asking: <em>I’ve got this combination, is this version of Silverlight going to be supported?</em>  This helper can be used by developers to pre-check if Silverlight can run on the platform of the user.  </p>

<p>If you are using the UA detection script, you’ll want to update it to the latest version if you have a Silverlight 1.0 solution and want to expand to Linux users.  That is the only change in this update.  No changes to Silverlight.js have occurred as a result of this, as remember, that only checks if the desired version <em>is installed</em> on the user machine.</p>

<p>If you want to play around with some settings, you can <a href="http://timheuer.com/wpfe/versiontest/script.htm">visit a quick-and-dirty page I created that uses both scripts</a> and reports the results (Version Supported reports Silverlight.isInstalled, and UA Supported reports Silverlight.supportedUserAgent).  Hope this may help.</p>

<p><em>Hey what about this Google Chrome hack you mentioned?</em></p>

<p>Officially Google Chrome is not a supported browser, but most (your mileage may vary) Silverlight applications run.  Since the detection scripts are <a href="http://www.opensource.org/licenses/ms-pl.html">Ms-PL</a> licensed, you’re welcome to change them to fit your needs.  The official copy on the release site will map to the supported matrix for Silverlight for now.  If you want to add support for Google Chrome, here’s what you’d do.</p>

<p>On line 93 in Silverlight.supportedUserAgent.js, insert this line:</p>

<div style="border-bottom: gray 1px solid; border-left: gray 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: consolas, 'Courier New', courier, monospace; max-height: 200px; font-size: 8pt; overflow: auto; border-top: gray 1px solid; cursor: text; border-right: gray 1px solid; padding-top: 4px">
  <div style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px">
    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   1:</span> <span style="color: #0000ff">else</span> <span style="color: #0000ff">if</span> (ua.indexOf(<span style="color: #006080">'Chrome'</span>) &gt;= 0) {</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   2:</span>     slua.Browser = <span style="color: #006080">'Chrome'</span>;</pre>

    <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   3:</span> }</pre>
  </div>
</div>

<p>Before the Safari check is important because Chrome’s user agent reports Safari in it as well as Chrome.  Then you will have Chrome detection working in your script.  Again, only if you need/want it.  We continue to evaluate the browser support matrix for Silverlight and before you ask – no decisions have been made just yet to change the current supported matrix.</p>

<p>Hope this helps!  Congratulations Moonlight team!</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:18ae5e37-1964-4e6b-a7e2-e80bbba4662e" class="wlWriterEditableSmartContent"></div>
