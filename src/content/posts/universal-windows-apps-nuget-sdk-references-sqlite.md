---
title: "Using SDK/library references in Universal Windows Apps"
slug: "universal-windows-apps-nuget-sdk-references-sqlite"
pubDate: 2014-04-17T14:43:23.000Z
lastModified: 2019-10-23T04:20:41.000Z
categories:
  - "windows"
  - "windows phone"
  - "winrt"
  - "windows 8.1"
  - "universal apps"
  - "winphone"
  - "wpdev"
draft: false
---

<p>I’m just coming back from <strong><a href="http://channel9.msdn.com/Events/Build/2014">Build 2014</a> </strong>and it was a great pleasure to talk to customers/developers.  It is one of the best parts of my job right now in seeing how customers use the technology our team represents.  If you are a XAML developer and didn’t have a chance to go to <strong>Build</strong> or haven’t watched all the sessions, here’s a quick short list of recommendations I’d have:</p>  <ul>   <li><a href="http://channel9.msdn.com/Events/Build/2014/2-507">Common XAML UI Platform overview</a> (<a href="http://twitter.com/timheuer">Tim Heuer</a>) </li>    <li><a href="http://channel9.msdn.com/Events/Build/2014/2-516">XAML UI Controls</a> (<a href="http://twitter.com/shawnoster">Shawn Oster</a>) </li>    <li><a href="http://channel9.msdn.com/Events/Build/2014/3-541">Developing across multiple form factors</a> (Peter Torr) </li>    <li><a href="http://channel9.msdn.com/Events/Build/2014/2-517">What’s new with Windows Phone Silverlight apps</a> (<a href="http://twitter.com/sjarawan">Sam Jarawan</a> and <a href="http://twitter.com/Harini_Kannan">Harini Kannan</a>) </li>    <li><a href="http://channel9.msdn.com/Events/Build/2014/3-591">Using VS to build universal Windows apps</a> (<a href="http://twitter.com/saxenanavit">Navit Saxena</a>) </li> </ul>  <p>There are many more (app model, localization, accessibility, tiles, notifications, etc.) so please do look at the event site and download/watch your favorites.  I think the list above gives you a good intro to the UI area changes and introduction to the concepts of Universal Windows apps.  If you haven’t heard of that concept yet, you can jump to the Keynote from Day 1 for the quick demo.</p>  <h2 />  <h2 align="left">Add Reference</h2>  <p align="left">The last session above is one that I want to write about today in this post.  In current form, a Universal Windows app in <a href="http://go.microsoft.com/fwlink/?LinkId=393540"><strong>Visual Studio Update 2</strong></a> allows you to maximize your sharing of code/assets across your Windows Store and Windows Phone app.  If you are like most developers, you rely on a great ecosystem of libraries and SDKs to augment your app and add functionality, UI or make things easier to develop.  In our keynote sample, the app we migrated (SportsLeague app) used <strong><a href="http://www.nuget.org/packages/Newtonsoft.Json">JSON.NET</a></strong> and we showed that we are able to re-use the same library (which in this case happened to be a Portable Class Library, aka PCL) across the different endpoints.</p>  <p align="left">One thing that is important is that you will need to add these references to each of your project ‘heads’ (the term we use to describe each endpoint in a shared project solution).  For some that are using direct binary DLL references to PCL libraries should be okay.  For others that are using Extension SDKs and/or NuGet packages, you may find yourself into some scenarios where either the SDK is different or the NuGet package isn’t updated yet to understand the Windows Phone 8.1 project type.  There are a number of these that are already updated like <a href="http://www.nuget.org/packages/Newtonsoft.Json">JSON.NET</a>, <a href="http://www.nuget.org/packages/Caliburn.Micro/"><strong>Caliburn.Micro</strong></a>, etc.  If you find yourself using a library that isn’t updated yet, you may want/need to prod the author to update.  Better yet, if it is Open Source, submit a pull request with the update yourself!</p>  <h2 align="left">SQLite or other native Extension SDKs</h2>  <p align="left">The other category are things that might be platform-specific and/or native.  These things are generally more complex than something that might work in a PCL and have dependencies on various native compiler/linker options or have been compiled in such a way that are different for the Phone device versus a tablet device.  One such example is <strong><a href="http://www.sqlite.org">SQLite</a></strong>. </p>  <blockquote>   <p align="left">SQLite is an in-process library that implements a <a href="http://sqlite.org/selfcontained.html">self-contained</a>, <a href="http://sqlite.org/serverless.html">serverless</a>, <a href="http://sqlite.org/zeroconf.html">zero-configuration</a>, <a href="http://sqlite.org/transactional.html">transactional</a> SQL database engine. The code for SQLite is in the <a href="http://sqlite.org/copyright.html">public domain</a> and is thus free for use for any purpose, commercial or private. SQLite is currently found in more applications than we can count, including several <a href="http://sqlite.org/famous.html">high-profile projects.</a></p> </blockquote>  <p align="left">SQLite links against the C++ Runtime and as such needs to make sure the right linking happens for the phone and tablet CRT profiles.  Right now, the SQLite for Windows Phone Runtime 8.1 is in some testing, but since a lot of people have been asking me about it, I’ll share my private build from source of the SDK.  This comes with a “works on my machine” guarantee :-).  This is a build of SQLite from their source, which is Open Source, and modified to compile/link against the Windows Phone 8.1 SDK.  When the official version comes out you should update to that version from their site.  <strike>For now, you can download my build of</strike>  <strong><font color="#ff0000">UPDATE (12-MAY-2014): SQLite team put out their official build for Windows Phone 8.1</font></strong>: <strong><a href="http://aka.ms/Edr9zm">SQLite for Windows Phone 8.1 here</a></strong>.</p>  <h2 align="left">Updating your Extension SDKs and NuGet packages</h2>  <p align="left">If you are an author of one of these SDKs that people use, please consider doing an update to make your customers happy.  If you are an Extension SDK provider you will want to produces an Extension SDK for Windows Phone 8.1.  If you already have a WinRT SDK, then you may just be able to copy the manifest, etc. and just produce changes to your manifest so it installs to the right location.  Here is an example:</p>  <pre class="brush: xml; highlight: [3,4];">&lt;Installation AllUsers="true" Scope="Global"&gt;
  &lt;InstallationTarget Id="Microsoft.ExtensionSDK" 
    TargetPlatformIdentifier="WindowsPhoneApp" 
    TargetPlatformVersion="v8.1" 
    SdkName="SQLite.WinRTPhone81" SdkVersion="3.8.4.1" /&gt;
&lt;/Installation&gt;</pre>

<p align="left">As you can see in lines 3,4 above the TPI/V values are different than your existing SDK which tell the SDK where to install.</p>

<p align="left">If you are an author of a NuGet package, you also will want to make your package Windows Phone 8.1 aware.  Again, if you have an existing package that works with Windows 8.1, then you may just be able to duplicate the content/lib/tools to a folder labeled ‘wpa81’ and test that out.  Example NuSpec:</p>

<pre class="brush: xml; highlight: [11];">&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd"&gt;
    &lt;metadata&gt;
        &lt;id&gt;Callisto&lt;/id&gt;
        &lt;version&gt;1.5.0&lt;/version&gt;
        &lt;title&gt;Callisto&lt;/title&gt;
        &lt;authors&gt;Tim Heuer&lt;/authors&gt;
        &lt;owners&gt;Tim Heuer&lt;/owners&gt;
    &lt;/metadata&gt;
    &lt;files&gt;
        &lt;file src="lib\portable-win81+wpa81" target="lib\portable-win81+wpa81" /&gt;
    &lt;/files&gt;
&lt;/package&gt;</pre>

<p align="left">If you see at line 11 the ‘portable-win81+wpa81’ it allows me to combine the two targets telling NuGet this applies to either.  Of course if I had any nuanced differences I could also just use ‘wpa81’ and put the phone-specific lib (or assets) there.</p>

<p align="left">In both cases if you have any UI aspects, most likely you may want to do some work here to make sure that any UI assets are tailored to the device targets for a great experience.</p>

<p align="left">I hope this helps clarify some of the reference questions that I’ve received and I hope that if you are an SDK author you will work quickly to help your customers realize their goals of a universal Windows app!</p>

<p align="left">Hope this helps!</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:ff32add0-d8d3-4f05-88f8-6f029a594703" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>
