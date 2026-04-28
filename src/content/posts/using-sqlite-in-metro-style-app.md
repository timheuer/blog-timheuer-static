---
title: "Using SQLite in a Metro style app"
slug: "using-sqlite-in-metro-style-app"
pubDate: 2012-05-20T16:10:51.000Z
lastModified: 2019-10-23T04:20:39.000Z
categories:
  - "xaml"
  - "sql"
  - "windows"
  - "metro"
  - "windows 8"
  - "winrt"
  - "sqlite"
  - "sqlce"
draft: false
---

<p>At the “Developing Windows 8 Metro style apps with C++” event that happened on 18-May-2012, we saw and heard some very interesting things.  If you were watching live then hopefully you didn’t see how I tried to work through my presentation while my disk was suspiciously guzzling every last byte until it eventually ran out of space!  But I digress…</p>
<p>During the <a href="http://channel9.msdn.com/Events/Windows-Camp/Developing-Windows-8-Metro-style-apps-in-Cpp/Cpp-for-the-Windows-Runtime">keynote presentation by <strong>Herb Sutter</strong></a>, we brought up several customers that are well-known in the native code world to talk about their experiences with Metro style apps and C++/Cx.  In particular hopefully this one caught your eye:</p>
<p><img width="640" height="399" title="SQLite case study slide" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="SQLite case study slide" src="http://storage2.timheuer.com/sqlitedemo.PNG" /></p>
<p>That’s right, the team for <strong><a href="http://www.sqlite.org/">SQLite</a></strong> was there to discuss how they were able to take their existing Win32 codebase and ensure that it worked well on Windows 8 as well as for Metro style apps.</p>
<blockquote>
<p>SQLite is a in-process library that implements a self-contained, serverless, zero-configuration, transactional SQL database engine. The code for SQLite is in the public domain and is thus free for use for any purpose, commercial or private. SQLite is currently found in more applications than we can count, including several high-profile projects.</p>
<p> </p>
<p>SQLite is an embedded SQL database engine. Unlike most other SQL databases, SQLite does not have a separate server process. SQLite reads and writes directly to ordinary disk files. A complete SQL database with multiple tables, indices, triggers, and views, is contained in a single disk file. The database file format is cross-platform - you can freely copy a database between 32-bit and 64-bit systems or between big-endian and little-endian architectures. These features make SQLite a popular choice as an Application File Format. Think of SQLite not as a replacement for Oracle but as a replacement for fopen().– Source: <a title="http://www.sqlite.org/about.html" href="http://www.sqlite.org/about.html">http://www.sqlite.org/about.html</a></p>
</blockquote>
<p><strong><a href="http://www.sqlite.org/crew.html">Dr. Richard Hipp</a></strong>, the founder of SQLite, was on hand to announce the availability of the experimental branch they’ve been working on as well as that when the Release Preview of Windows 8 is made public that he will merge this code to the main trunk for SQLite, making it supported by them.  This is a really great thing for developers as SQLite has been a proven embedded database for numerous platforms and many, many customers.  The team prides themselves on testing and has millions of test cases that are validated each release.</p>
<p>As a Windows (and perhaps more specifically .NET) developer, you may not have had to build any lib from Open Source before of this type (i.e., native code) and since a binary is not being provided yet until Release Preview for Windows 8, I thought I’d share my tips on building the experimental bits, adding them to your projects and then using them with a client library.</p>
<p><strong><font color="#ff0000">UPDATE</font></strong>: I created a <a href="http://timheuer.com/blog/archive/2012/06/05/howto-video-using-sqlite-in-metro-style-app.aspx">HOWTO video demonstrating the following steps of building and using from a C# Metro style app</a>.</p>
<h2>Building SQLite from source</h2>
<p><strike>If you are looking for the sqlite3.dll with this WinRT support anywhere on the sqlite.org site, you won’t find it.  You will have to build the source yourself. </strike><strong>UPDATE:</strong>Since the origination of this post the SQLite team has released a version already compiled for 32/64-bit.  I highly recommend you get the code from the source rather than from any third party site.  Microsoft has worked with the team at SQLite to ensure compatibility and store certification.  For most .NET developers who have never grabbed native code source from an Open Source project and had to build it before, the maze of knowing what you should do can be confusing.  I’ve put together a cheat sheet on building SQLite from source for a Windows (and .NET developer) and put it on my SkyDrive: <a href="http://sdrv.ms/Kz8XKV"><strong>Building SQLite from source</strong></a>.  The OneNote I have has the details you need for the tools that will be required.  </p>
<p><iframe width="98" height="120" src="https://skydrive.live.com/embed?cid=A737583042956228&amp;resid=A737583042956228%211940&amp;authkey=APxp6l-7lsdLBsY" frameborder="0" scrolling="no"></iframe></p>
<p>In a nutshell you’ll need:</p>
<ul>
    <li>Visual Studio (easiest way to get the C++ compiler) </li>
    <li>ActiveTcl </li>
    <li>Update for gawk.exe </li>
    <li>Fossil (the source control system used by SQLite) </li>
</ul>
<p>Once you have these, you are ready to build SQLite.  Again, I’ll defer to my instructions on the details of setup.  Once your setup is complete, from a developer command prompt you’d run:</p>
<div id="codeSnippetWrapper" style="margin: 20px 0px 10px; padding: 4px; border: 1px solid silver; width: 97.5%; text-align: left; line-height: 12pt; overflow: auto; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; cursor: text; direction: ltr; max-height: 200px; background-color: rgb(244, 244, 244);">
<div id="codeSnippet" style="padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);">
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> nmake -f Makefile.msc sqlite3.dll FOR_WINRT=1</pre>
<!--CRLF--></div>
</div>
<p>The result of this will give you basically 4 files that are of likely most importance to you: sqlite3.c, sqlite3.h, sqlite3.dll, sqlite3.pdb.</p>
<blockquote>
<p>NOTE: The resulting pdb/dll that is built will be architecture specific.  If you used an x86 command prompt then that is what you have.  Be aware of this (as noted later in this post).</p>
</blockquote>
<p>At a minimum you’ll want sqlite3.dll if you are a .NET developer, but as a native code developer you will likely be more interested in the others as well.  After this step, you now have a Windows Store compliant version of SQLite to include in your applications.</p>
<h2>Runtime versus client access</h2>
<p>Now at this point is where I’ve seen some confusion.  Folks are asking <em>How do I include this, don’t I need a WinMD file to reference?</em>  Let me diverge a bit and explain a few things.</p>
<p>The result of compiling the binary above produces primarily one thing…which I will call the “Engine” in this post.  This is the SQLite runtime and logic required to create/interact with SQLite database files.  This is NOT, however, an access library, which I will call the “Client” in this post.  If you are a managed code or JavaScript developer, at this point, all you have is the Engine, the database runtime.  You have no Client to access it.</p>
<p>Now, if you are a C++ developer you are probably okay at this point and don’t care much about what I have to say.  You have the header and are likely saying <em>I’ve got the header, get out of my way.</em>  And that is okay.  For C++ developers I think you’ll likely be accessing the database more directly through the SQLite APIs provided in the header.</p>
<p>I call out this distinction because this step provides you with the database engine you need to create a database and have it be store-compliant.  So if you are a JavaScript or .NET developer, what are you to do?  Stay tuned…let’s first get the Engine included in our app package.</p>
<h2>Including SQLite in your app package</h2>
<p>As I noted above, as a native code developer, having the header, lib and c file you may be okay and don’t care to read this.  I  <strong>personally</strong> think, however that I’d always just want the binary from my vendor rather than always include source in my files.  That said, the SQLite build process does product the amalgamation (sqlite3.c) you can just include in your native code app.</p>
<p>If you choose to go the binary file route (sqlite3.dll) then you need to simply follow a few principles to ensure that it is included in your package when you build your app/package.  These principles are simple:</p>
<ul>
    <li>include the architecture-specific binary </li>
    <li>ensure the sqlite3.dll is marked as Content in your project </li>
    <li>ensure you note that you now have a native code dependency (not needed if you are already a C++ Metro style app) </li>
</ul>
<p>These two items will ensure that when you build (even for debug via F5) or when you package for the store, that the Engine is included in your package.  Marking as content is simply ensuring that after you add the file to your project, ensure the file properties note that it is content.  In .NET apps this is making the <em>Build Action</em> property Content.  In JavaScript applications ensure the <em>Package Action</em> is marked Content.</p>
<p>Declaring the native code dependency means you simply add a reference to the Microsoft C++ Runtime Library via the <em>Add Reference</em> mechanisms in .NET and JavaScript applications.  By doing this (and again, this is a requirement of including SQLite in your app) you now cannot be architecture-neutral. This means no more AnyCPU for .NET.  When producing a package you’ll have to produce architecture-specific packages before uploading to the store.  Not to worry though as Visual Studio makes this incredibly easy.  The one thing you’ll have to remember though is that you’ll have to change the sqlite3.dll before building the packages as the DLL is architecture-specific itself.</p>
<p>Now this all should be easier right?  Wouldn’t it be nice if you could just <em>Add Reference</em> to the Engine?  I personally think so.  I’ll be working with the SQLite team to see if they will adopt this method to make it as easy as this:</p>
<p><img title="SQLite Extension SDK" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="SQLite Extension SDK" src="http://storage2.timheuer.com/sqlitesdk.PNG" /></p>
<p>In doing so, you as a developer would just add a reference to the Engine and then during build time Visual Studio (well MSBuild actually) will do all the right things in picking up the architecture-specific binary for your app.  No fiddling on your part.  This method also makes it easier for C++ developers as well as a props file would automatically be merged to include the .lib for linking and the header file for development.  This method uses the <a href="http://go.microsoft.com/fwlink/?LinkID=235409">Visual Studio Extension SDK</a> mechanism that was introduced in Visual Studio 11.</p>
<blockquote>
<p>NOTE: Again note that as a managed (.NET) app I’d also have to ensure that my package includes the Microsoft C++ Runtime package in order for this to work and pass store certification.</p>
</blockquote>
<p>Native code developers may scoff at this approach, but I could get started in 2 steps: Add Reference, #include.  No tweaking of my project files at all because the Extension SDK mechanism in VS does all this for me behind the scenes.</p>
<p>So why don’t I just give you the VSIX to install and accomplish the above?  Well simply, because SQLite is not my product and we’ve had a good relationship with their team and I want to make sure they understand the benefits of this method before jumping right in.  I hope that they will like it as I think it makes it *really* simple for developers.</p>
<h2>Accessing the Engine from your app</h2>
<p>Great, you’ve compiled the bits, you’ve understood how to ensure sqlite3.dll gets packaged in your application…now <strong>how do you use it!!!</strong>  Here’s the assessment of where we are at for Metro style apps as of the writing of this post.</p>
<p><strong>C++ app developers</strong>: I think most C++ developers will get the header file (sqlite3.h) and be okay on their own with SQLite.  At this stage for them there doesn’t appear to be a real huge benefit of a WinRT wrapper to use the Engine.</p>
<p><strong>.NET developers</strong>: I’ve messed around with a few libraries and believe the <strong><a href="https://github.com/praeclarum/sqlite-net">sqlite-net</a></strong> project to be the most favorable for what I believe most use cases will be for SQLite and Metro style apps.  This is a .NET-only library (not WinRT) but is basically a “LINQ to SQLite” approach.  The Mono team uses this one as well.  The necessary .NET 4.5 Core changes are already included in the project on github.  So you just need to get the SQLite.cs file and include it in your project.  Using this library allows you to write code like this:</p>
<div id="codeSnippetWrapper" style="margin: 20px 0px 10px; padding: 4px; border: 1px solid silver; width: 97.5%; text-align: left; line-height: 12pt; overflow: auto; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; cursor: text; direction: ltr; max-height: 200px; background-color: rgb(244, 244, 244);">
<div id="codeSnippet" style="padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);">
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">sealed</span> <span style="color: rgb(0, 0, 255);">partial</span> <span style="color: rgb(0, 0, 255);">class</span> BlankPage : Page</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span>     <span style="color: rgb(0, 0, 255);">public</span> BlankPage()</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>     {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>         <span style="color: rgb(0, 0, 255);">this</span>.InitializeComponent();</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span>  </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>         <span style="color: rgb(0, 0, 255);">string</span> dbRootPath = Windows.Storage.ApplicationData.Current.LocalFolder.Path;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span>         <span style="color: rgb(0, 0, 255);">using</span> (SQLiteConnection db = <span style="color: rgb(0, 0, 255);">new</span> SQLiteConnection(Path.Combine(dbRootPath, <span style="color: rgb(0, 96, 128);">"mypeople.sqlite"</span>)))</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum9" style="color: rgb(96, 96, 96);">   9:</span>         {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum10" style="color: rgb(96, 96, 96);">  10:</span>             db.CreateTable&lt;Person&gt;();</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum11" style="color: rgb(96, 96, 96);">  11:</span>  </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum12" style="color: rgb(96, 96, 96);">  12:</span>             db.RunInTransaction(() =&gt;</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum13" style="color: rgb(96, 96, 96);">  13:</span>                 {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum14" style="color: rgb(96, 96, 96);">  14:</span>                     <span style="color: rgb(0, 0, 255);">for</span> (<span style="color: rgb(0, 0, 255);">int</span> i = 0; i &lt; 10; i++)</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum15" style="color: rgb(96, 96, 96);">  15:</span>                     {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum16" style="color: rgb(96, 96, 96);">  16:</span>                         db.Insert(<span style="color: rgb(0, 0, 255);">new</span> Person() { FullName = <span style="color: rgb(0, 96, 128);">"Person "</span> + i.ToString() });</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum17" style="color: rgb(96, 96, 96);">  17:</span>                     }</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum18" style="color: rgb(96, 96, 96);">  18:</span>                 });</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum19" style="color: rgb(96, 96, 96);">  19:</span>         }</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum20" style="color: rgb(96, 96, 96);">  20:</span>     }</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum21" style="color: rgb(96, 96, 96);">  21:</span> }</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum22" style="color: rgb(96, 96, 96);">  22:</span>  </pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum23" style="color: rgb(96, 96, 96);">  23:</span> <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">class</span> Person</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum24" style="color: rgb(96, 96, 96);">  24:</span> {</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum25" style="color: rgb(96, 96, 96);">  25:</span>     [AutoIncrement, PrimaryKey]</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum26" style="color: rgb(96, 96, 96);">  26:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">int</span> ID { get; set; }</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum27" style="color: rgb(96, 96, 96);">  27:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">string</span> FullName { get; set; }</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum28" style="color: rgb(96, 96, 96);">  28:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">string</span> EmailAddress { get; set; }</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum29" style="color: rgb(96, 96, 96);">  29:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">double</span> Salary { get; set; }</pre>
<!--CRLF-->
<pre style="margin: 0em; padding: 0px; width: 100%; text-align: left; color: black; line-height: 12pt; overflow: visible; font-family: &quot;Courier New&quot;, courier, monospace; font-size: 8pt; direction: ltr; background-color: rgb(244, 244, 244);"><span id="lnum30" style="color: rgb(96, 96, 96);">  30:</span> }</pre>
<!--CRLF--></div>
</div>
<p>This is clearly just a sample, but demonstrates the simplicity of the library.  </p>
<blockquote>
<p>NOTE: In the snippet above you do want to make sure you are creating your database in a path that is accessible from the AppContainer.  The best place is in the app’s ApplicationData location.  When specifying a path to SQLite in Open() for creation, give an explicit path always to ensure you aren’t relying on a temp file creation.</p>
</blockquote>
<p>Some may ask about System.Data.Sqlite and this cannot be used because of the dependency of ADO.NET which is not a part of the .NET Framework Core profile.</p>
<p>Now this leads us to JavaScript developers.  Currently, there is not easy way for you to access this.  The Developer and Platform Evangelism team are working on some samples that are not quite complete yet.  JavaScript developers will need a WinRT library in order to access/create/query the Engine.  There are some out there (I haven’t played around with any of these) that would be good to see if they meet your needs.  Here are some pointers:</p>
<ul>
    <li><a href="http://sqlwinrt.codeplex.com/">sqlite-winrt</a> </li>
    <li><a href="https://github.com/doo/SQLite3-WinRT">SQLite3-WinRT</a> </li>
</ul>
<p>At the C++ event we talked with the SQLite team about a WinRT client library and will continue to talk with them to see if this is something of interest.  SQLite has a great history of working with the community and have a desire to continue this.  In the meantime, there are options for you to get started.  Also note, that since these are WinRT libraries they could also be used from C++ and .NET in Metro style apps.  At this point though it is my personal opinion that existing .NET libraries for .NET offer more value (i.e. LINQ) than how these WinRT ones exist.</p>
<h2>  </h2>
<h2>Summary</h2>
<p>This was a great announcement that the SQLite team made for Metro style app developers.  WinRT provides some existing local storage mechanisms which you should explore as well, however none that have structured storage with a query processor on top of it.  I’m really glad that the SQLite team was able to make a few diff’s to their code to accommodate a few store compliance areas and continue to offer their great product to this new class of applications.  It is very simple to get started by ensuring you have the <strong>Engine</strong> and picking your <strong>Client</strong> of your choice and write your app using SQLite for some local/structured storage!</p>
<p>Hope this helps and stay tuned for the release preview of Windows 8!</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:3dd6e7c7-b152-4afc-9882-88c5586ed006" style="margin: 0px; padding: 0px; float: none; display: inline;"></div>

