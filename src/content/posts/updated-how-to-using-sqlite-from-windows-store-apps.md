---
title: "UPDATED HOWTO: SQLite with Windows 8 apps"
slug: "updated-how-to-using-sqlite-from-windows-store-apps"
pubDate: 2012-08-07T14:05:09.000Z
lastModified: 2019-10-23T04:20:40.000Z
categories:
  - "sql"
  - "metro"
  - "win8"
  - "windows 8"
  - "sqlite"
  - "sqlite-net"
  - "win8appdev"
draft: false
---

<p>I’ve previously posted a few things about SQLite including a <a href="http://timheuer.com/blog/archive/2012/06/05/howto-video-using-sqlite-in-metro-style-app.aspx">HOWTO on how to build</a> from their source code.  If you still want to build your own DLL from their source code that is totally fine, but not necessary in most every single case I’ve seen in app usage.  One of the challenges I noted is that since SQLite is a native component and if you are a managed (.NET) app you can’t be architecture neutral anymore (AnyCPU).  What this means is that you have to build your app for each architecture you want to support: x86, x64 and ARM.  The flow of this using SQLite3.dll was that you would have to package, change the DLL, re-package.  </p>  <p>Not anymore.</p>  <p>In working with the great folks on the <a href="http://www.sqlite.org"><strong>SQLite</strong></a> team, they’ve packaged the binaries up (for Windows 8 apps) in a nice installer using the Extension SDK format.  What this means is you now add a ‘reference’ to the SQLite binary and based on the architecture being built for your package, it will pull in the right DLL without you having to manage that yourself.  Here’s some step-by-step…</p>  <h2>Installing the SQLite for Windows Runtime package</h2>  <p>The first thing you want to do is install the package.  You can do this from within Visual Studio itself in all editions.  From the Tools menu, choose <em>Extensions and Updates</em> and then choose the Online section (on the left of the dialog) and search for ‘sqlite’ in the search term.  This will show you the <strong>SQLite for Windows Runtime</strong> package:</p>  <p><img title="Visual Studio Extensions dialog" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Visual Studio Extensions dialog" src="http://storage2.timheuer.com/sqliteext.png" width="866" height="446" /></p>  <p>Click install my friends.  You will be prompted to restart Visual Studio which you should do.  Go ahead…I’ll wait.</p>  <h2>Using the new package in your C#/VB app</h2>  <p>Now that you have the SQLite for Windows Runtime package installed in your Visual Studio environment, you want to use it.  In a managed (.NET) app you would do the following steps.</p>  <p>First, create your app (e.g., a Blank XAML app is fine).  Once within your app, use the <em>Add Reference</em> mechanism to get to the next step.  Now you will not be browsing for any DLL directly like you would in a traditional .NET.  What we are adding here is a reference to the Extension SDK…not the library itself, a small but important distinction.  Once in the Add Reference dialog choose the Windows\Extensions view (see on left) and you’ll see SQLite for Windows Runtime. </p>  <p>To correctly use this in a managed app you’ll need to select that <strong>*and*</strong> the C++ runtime as seen below:</p>  <p><img title="Add Reference dialog" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Add Reference dialog" src="http://storage2.timheuer.com/sqliterefadd.png" width="835" height="269" /></p>  <p>The reason for this is to ensure that your app declares the right dependencies that are needed for the app to run.  The likelihood of the C++ runtime not being on a Windows machine where your app will be installed is extremely rare, but you need to declare this anyway.  Failure to do so will fail your app certification tests.</p>  <p>Now with this involved you can grab a managed wrapper to call the SQLite APIs as I’ve previously described in my HOWTO video.  I personally recommend the <a href="http://www.nuget.org/packages/sqlite-net"><strong>sqlite-net</strong></a> library (available via NuGet) to make this easier for you.</p>  <blockquote>   <p><strong>NOTE</strong>: sqlite-net is available as source in C#.  If you are using a VB app, you would first need to compile the sqlite-net source in a separate DLL so you can just add a reference to that in your VB project.</p> </blockquote>  <p>Using the sqlite-net library you can perform tasks using a model similar to LINQ2SQL where you can have types represent database entities:</p>  <div id="codeSnippetWrapper" style="overflow: auto; cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; border-bottom: silver 1px solid; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; width: 97.5%; background-color: #f4f4f4">   <div id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">     <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">public</span> <span style="color: #0000ff">sealed</span> <span style="color: #0000ff">partial</span> <span style="color: #0000ff">class</span> MainPage : Page</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>     <span style="color: #0000ff">public</span> MainPage()</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>     {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>         <span style="color: #0000ff">this</span>.InitializeComponent();</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>         LoadData();</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span>     }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span>  </pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum9" style="color: #606060">   9:</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">void</span> LoadData()</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum10" style="color: #606060">  10:</span>     {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum11" style="color: #606060">  11:</span>         var dbPath = Path.Combine(Windows.Storage.ApplicationData.Current.LocalFolder.Path, <span style="color: #006080">"db.sqlite"</span>);</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum12" style="color: #606060">  12:</span>         <span style="color: #0000ff">using</span> (var db = <span style="color: #0000ff">new</span> SQLite.SQLiteConnection(dbPath))</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum13" style="color: #606060">  13:</span>         {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum14" style="color: #606060">  14:</span>             db.CreateTable&lt;Person&gt;();</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum15" style="color: #606060">  15:</span>  </pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum16" style="color: #606060">  16:</span>             db.RunInTransaction(() =&gt;</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum17" style="color: #606060">  17:</span>                 {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum18" style="color: #606060">  18:</span>                     db.Insert(<span style="color: #0000ff">new</span> Person() { FirstName = <span style="color: #006080">"Tim"</span>, LastName = <span style="color: #006080">"Heuer"</span> });</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum19" style="color: #606060">  19:</span>                 });</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum20" style="color: #606060">  20:</span>         }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum21" style="color: #606060">  21:</span>     }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum22" style="color: #606060">  22:</span> }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum23" style="color: #606060">  23:</span>  </pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum24" style="color: #606060">  24:</span> <span style="color: #0000ff">public</span> <span style="color: #0000ff">class</span> Person</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum25" style="color: #606060">  25:</span> {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum26" style="color: #606060">  26:</span>     [SQLite.AutoIncrement, SQLite.PrimaryKey]</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum27" style="color: #606060">  27:</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> ID { get; set; }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum28" style="color: #606060">  28:</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> FirstName { get; set; }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum29" style="color: #606060">  29:</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> LastName { get; set; }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum30" style="color: #606060">  30:</span> }</pre>
<!--CRLF--></div>
</div>

<p>Now you just need to specify your architecture for your app (x86, x64, ARM) and when you build, the appropriate sqlite3.dll will be packaged in your app automatically.  This also happens during the packaging step for the store so the right item is included for each architecture-specific package.</p>

<blockquote>
  <p><strong>WARNING</strong>: Do not package in DEBUG mode as you will fail certification.  Ensure that you build/package in RELEASE mode prior to submitting to the store or running the app certification toolkit (also referred to as WACK in some places).  You will get false positives if you are compiled in DEBUG mode.</p>
</blockquote>

<p>This should make your development much easier without having to  swap out DLL files each time.</p>



<h2>Using the new package in your C++ app</h2>

<p>If you are a C++ developer you will do the same steps for installing and adding as a reference to your app.  In the C++ project system there is no 'Add Reference’ menu on the project context menu, but you will choose References and then the Add Reference button shows up.</p>

<p>Once you have the reference to the SQLite SDK then as a C++ developer you can just #include the header and go to work:</p>

<div id="codeSnippetWrapper" style="overflow: auto; cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; border-bottom: silver 1px solid; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; max-height: 200px; width: 97.5%; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">
    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #cc6633">#include</span> &lt;sqlite3.h&gt;</pre>
<!--CRLF--></div>
</div>

<p>Since C++ projects are already architecture-specific you don’t have to worry about the AnyCPU situation because there isn’t one!  You’ll get IntelliSense on the API by just including the header.  The Extension SDK mechanism already includes the C++ props file to help the project system know where to get the header for development and the lib for linking when building.  Most C++ developers will interact with SQLite using the native APIs and not need any additional wrapper library.</p>

<h2>Using the new package in your JavaScript app</h2>

<p>If you are using JavaScript/HTML to developer your app, you will follow the same flow as the C#/VB flow.  Add a reference to both the SQLite SDK as well as the C++ runtime (to declare the dependency).  As to accessing SQLite in your app, you’ll need a WinRT wrapper library to do that.  The one that seems to be gaining favor is the <strong><a href="https://github.com/doo/SQLite3-WinRT">SQLite3-WinRT</a></strong> library on GitHub.  I have not personally used this, but seen a lot of people using this.  It allows you to use the JavaScript programming model in a familiar way:</p>

<div id="codeSnippetWrapper" style="overflow: auto; cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; border-bottom: silver 1px solid; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; width: 97.5%; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">
    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">var</span> dbPath = Windows.Storage.ApplicationData.current.localFolder.path + <span style="color: #006080">'\\db.sqlite'</span>;</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> SQLite3JS.openAsync(dbPath)</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>   .then(<span style="color: #0000ff">function</span> (db) {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>     <span style="color: #0000ff">return</span> db.runAsync(<span style="color: #006080">'CREATE TABLE Item (name TEXT, price REAL, id INT PRIMARY KEY)'</span>);</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>   })</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>   .then(<span style="color: #0000ff">function</span> (db) {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span>     <span style="color: #0000ff">return</span> db.runAsync(<span style="color: #006080">'INSERT INTO Item (name, price, id) VALUES (?, ?, ?)'</span>, [<span style="color: #006080">'Mango'</span>, 4.6, 123]);</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span>   })</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum9" style="color: #606060">   9:</span>   .then(<span style="color: #0000ff">function</span> (db) {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum10" style="color: #606060">  10:</span>     <span style="color: #0000ff">return</span> db.eachAsync(<span style="color: #006080">'SELECT * FROM Item'</span>, <span style="color: #0000ff">function</span> (row) {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum11" style="color: #606060">  11:</span>       console.log(<span style="color: #006080">'Get a '</span> + row.name + <span style="color: #006080">' for $'</span> + row.price);</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum12" style="color: #606060">  12:</span>     });</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum13" style="color: #606060">  13:</span>   })</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum14" style="color: #606060">  14:</span>   .then(<span style="color: #0000ff">function</span> (db) {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum15" style="color: #606060">  15:</span>     db.close();</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum16" style="color: #606060">  16:</span>   });</pre>
<!--CRLF--></div>
</div>

<p>If using JavaScript this might be the way to go for your app.</p>

<h2>Summary</h2>

<p>I’m very glad the SQLite team worked to get this deployment package out there.  I think for some Microsoft developers, using SQLite is fairly new and this SDK package will make it easier to ensure you have the right bits at the right time.  Of course you are free to do it your own way, but I think this will ease the process a little bit.</p>

<blockquote>
  <p>Why no NuGet? Well, the NuGet infrastructure right now doesn’t support some of these semantics around native components to deal with headers, linking and architecture-specific deployments.  We’ll continue to work with them to see if we can drive these changes into that platform.</p>
</blockquote>

<p>So please feel free to download via the Visual Studio ‘Extensions and Updates’ option from within VS, download directly from the <a href="http://visualstudiogallery.msdn.microsoft.com/23f6c55a-4909-4b1f-80b1-25792b11639e">Visual Studio Gallery</a>, or download from the <a href="http://sqlite.org/download.html">SQLite site</a> themselves.  Once installed, once an update is available, VS will notify you that an update is available and you can install it.</p>

<p>Hope this helps!</p>

<p>
  </p><div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:5fdb5a3d-4631-497a-8ebb-2f3fdeaf5500" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>
