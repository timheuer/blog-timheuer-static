---
title: "Storing and playing media on Windows Phone 7"
slug: "download-and-store-media-for-playback-in-windows-phone-7-using-mediastreamsource"
pubDate: 2010-08-16T22:32:54.000Z
lastModified: 2019-10-23T04:20:36.000Z
categories:
  - "silverlight"
  - "xaml"
  - "mp3"
  - "media"
  - "mediastreamsource"
  - "wp7dev"
  - "wp7"
  - "windows-phone"
draft: false
---

<p>In talking with a <a href="http://twitter.com/chrisntr">friend</a> about some Windows Phone 7 and <a href="http://www.silverlight.net">Silverlight</a> stuff recently.  He was giving me some great feedback about a few things (all of which I’ve passed along).  One of the things was what I felt was a common task that might exist in the mobile space but admittedly isn’t as clear if you are just coming to WP7 development.  The scenario is that of downloading media files and storing them for later playback.</p>
<p>WP7 does not have a storage mechanism like SQLLite on the device, but since it is Silverlight, you do have Isolated Storage you can use leveraging the same .NET class libraries from the full framework.  Here’s a sample app that demonstrates <strong>downloading an MP3 and storing for later playback on Windows Phone 7</strong>.</p>
<h2>The Scenario</h2>
<p>First, to make the scenario clear, say you are building a specific app for your brand’s media archives (audio and/or video).  You want to enable the user to selectively (or automatically) download the media to their device.  You want the user to be able to playback the downloaded media while offline later.  The media in this scenario is an MP3 file, a common audio format.</p>
<h2>The Pieces</h2>
<p>In order to do this we’ll assume the following:</p>
<ul>
    <li>You have an absolute URI to the MP3 file.</li>
    <li>You have some type of UI to display to the user a list of media for your application</li>
    <li>Some type of UI to control the playback (play/stop/etc.)</li>
</ul>
<p>For demonstration purposes my UI will not be very ‘user friendly’ as it is meant to be diagnostic in explaining the task.  I will have a ListBox that I’ll use to bind to the list of downloaded items, a TextBox to give an option to download an MP3 file, and three (3) buttons: Download (to fetch the file and store for later), Play and Stop.  Here is the XAML I’ve used starting with the blank Windows Phone Application using the <strong><a href="http://www.silverlight.net/getstarted/devices/windows-phone/">Windows Phone Developer Tools</a></strong> available to developers.</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="rem">&lt;!--LayoutRoot is the root grid where all page content is placed--&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span> <span class="kwrd">&lt;</span><span class="html">Grid</span> <span class="attr">x:Name</span><span class="kwrd">="LayoutRoot"</span> <span class="attr">Background</span><span class="kwrd">="Transparent"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     <span class="kwrd">&lt;</span><span class="html">Grid.RowDefinitions</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>         <span class="kwrd">&lt;</span><span class="html">RowDefinition</span> <span class="attr">Height</span><span class="kwrd">="Auto"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>         <span class="kwrd">&lt;</span><span class="html">RowDefinition</span> <span class="attr">Height</span><span class="kwrd">="*"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span>     <span class="kwrd">&lt;/</span><span class="html">Grid.RowDefinitions</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum8">   8:</span>     <span class="rem">&lt;!--TitlePanel contains the name of the application and page title--&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum9">   9:</span>     <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">x:Name</span><span class="kwrd">="TitlePanel"</span> <span class="attr">Grid</span>.<span class="attr">Row</span><span class="kwrd">="0"</span> <span class="attr">Margin</span><span class="kwrd">="12,9,0,40"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum10">  10:</span>         <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="ApplicationTitle"</span> <span class="attr">Text</span><span class="kwrd">="AUDIO SAMPLES"</span> <span class="attr">Style</span><span class="kwrd">="{StaticResource PhoneTextNormalStyle}"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum11">  11:</span>         <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="PageTitle"</span> <span class="attr">Text</span><span class="kwrd">="MP3"</span> <span class="attr">Margin</span><span class="kwrd">="9,-8,0,0"</span> <span class="attr">Style</span><span class="kwrd">="{StaticResource PhoneTextTitle1Style}"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum12">  12:</span>     <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum13">  13:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum14">  14:</span>     <span class="rem">&lt;!--ContentPanel - place additional content here--&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum15">  15:</span>     <span class="kwrd">&lt;</span><span class="html">Grid</span> <span class="attr">x:Name</span><span class="kwrd">="ContentPanel"</span> <span class="attr">Grid</span>.<span class="attr">Row</span><span class="kwrd">="1"</span> <span class="attr">Margin</span><span class="kwrd">="12,0,12,0"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum16">  16:</span>         <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Height</span><span class="kwrd">="67"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">Margin</span><span class="kwrd">="6,6,0,0"</span> <span class="attr">Name</span><span class="kwrd">="textBlock1"</span> <span class="attr">Text</span><span class="kwrd">="Showing how to store and playback MP3 files on the device."</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">TextWrapping</span><span class="kwrd">="Wrap"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum17">  17:</span>         <span class="kwrd">&lt;</span><span class="html">ListBox</span> <span class="attr">Height</span><span class="kwrd">="150"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">Margin</span><span class="kwrd">="6,79,0,0"</span> <span class="attr">Name</span><span class="kwrd">="listBox1"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">Width</span><span class="kwrd">="444"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum18">  18:</span>         <span class="kwrd">&lt;</span><span class="html">ProgressBar</span> <span class="attr">x:Name</span><span class="kwrd">="DownloadProgress"</span> <span class="attr">IsIndeterminate</span><span class="kwrd">="False"</span> <span class="attr">Style</span><span class="kwrd">="{StaticResource PerformanceProgressBar}"</span> <span class="attr">Margin</span><span class="kwrd">="6,-60,0,0"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum19">  19:</span>         <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Height</span><span class="kwrd">="30"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">Margin</span><span class="kwrd">="12,298,0,0"</span> <span class="attr">Name</span><span class="kwrd">="textBlock2"</span> <span class="attr">Text</span><span class="kwrd">="URL to download"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">Width</span><span class="kwrd">="175"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum20">  20:</span>         <span class="kwrd">&lt;</span><span class="html">TextBox</span> <span class="attr">Height</span><span class="kwrd">="72"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">Margin</span><span class="kwrd">="0,334,0,0"</span> <span class="attr">Name</span><span class="kwrd">="mpsUri"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">Width</span><span class="kwrd">="460"</span> <span class="attr">Text</span><span class="kwrd">="http://files.sparklingclient.com/099_2010.07.09_WP7_Phones_In_The_Wild.mp3"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum21">  21:</span>         <span class="kwrd">&lt;</span><span class="html">Button</span> <span class="attr">Content</span><span class="kwrd">="DOWNLOAD"</span> <span class="attr">Height</span><span class="kwrd">="72"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">Margin</span><span class="kwrd">="12,399,0,0"</span> <span class="attr">Name</span><span class="kwrd">="button1"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">Width</span><span class="kwrd">="438"</span> <span class="attr">Click</span><span class="kwrd">="button1_Click"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum22">  22:</span>         <span class="kwrd">&lt;</span><span class="html">Button</span> <span class="attr">Content</span><span class="kwrd">="PLAY"</span> <span class="attr">Height</span><span class="kwrd">="72"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">Margin</span><span class="kwrd">="12,477,0,0"</span> <span class="attr">Name</span><span class="kwrd">="button2"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">Width</span><span class="kwrd">="220"</span> <span class="attr">Click</span><span class="kwrd">="button2_Click"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum23">  23:</span>         <span class="kwrd">&lt;</span><span class="html">MediaElement</span> <span class="attr">Height</span><span class="kwrd">="43"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">Margin</span><span class="kwrd">="6,555,0,0"</span> <span class="attr">Name</span><span class="kwrd">="mediaPlayback"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">Width</span><span class="kwrd">="438"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum24">  24:</span>         <span class="kwrd">&lt;</span><span class="html">Button</span> <span class="attr">Content</span><span class="kwrd">="STOP"</span> <span class="attr">Height</span><span class="kwrd">="72"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">Margin</span><span class="kwrd">="230,477,0,0"</span> <span class="attr">Name</span><span class="kwrd">="button3"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">Width</span><span class="kwrd">="220"</span> <span class="attr">Click</span><span class="kwrd">="button3_Click"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum25">  25:</span>     <span class="kwrd">&lt;/</span><span class="html">Grid</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum26">  26:</span> <span class="kwrd">&lt;/</span><span class="html">Grid</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>You can see that I’m not using any advanced pattern development here for two reasons: 1) it doesn’t need it and 2) I want to focus on specific tasks to isolate this learning.  Therefore if you don’t like Click handlers in your Button XAML, then you can flog me later :-).</p>
<h2>Downloading the media</h2>
<p>The first step in my sample is to download some media.  I’ve chosen a favorite podcast, the <a href="http://www.sparklingclient.com/">Sparkling Client</a> as my sample file.  I hope they don’t mind.  In fact you may want to pick a small MP3 file to test on one of your servers so you don’t have to wait a while for the download to complete.</p>
<blockquote>
<p>SIDE NOTE: I like how Sparkling Client has become more of short review of the times with regard to Silverlight.  Good to see some perspectives (and rumors).  It’s like a live version of <a href="http://www.silverlightcream.com">Dave Campbell’s Silverlight Cream</a>.</p>
</blockquote>
<p>Because typing long things in the emulator is, well, annoying, I’ve prepopulated the URI TextBox (mpsUrl) with a specific URL.  Feel free to change this or enter a new MP3 URI in the emulator.  The next step is to execute the download.  I’m choosing to use WebClient.OpenReadAsync in this regard.  It’s simple and gets the job done.  Admittedly I wish that there was an OpenReadDownloadProgress argument available (as there is for DownloadStringAsync) but there is not.  </p>
<p>Because there is no actual progress value provided for me, I do want to provide the user <em>some</em> feedback that something is happening.  To do this in my sample I am using <strong><a href="http://www.jeff.wilcox.name/2010/08/performanceprogressbar/">Jeff Wilcox’s “High Performance ProgressBar” for Windows Phone 7</a></strong>.  I’m not going to go into the details of why and how to hook it up – read his post.  I followed the exact same instructions.  </p>
<blockquote>
<p>NOTE: When using the progress bar, don’t (only) set Visibility to collapsed if that is one of your mechanisms for displaying/hiding it, <strong>but be sure to set IsIndeterminate to false </strong>when not using it.</p>
</blockquote>
<p>When I start the download, I start the ProgressBar to show the user <em>some</em> type of feedback that something is happening.  Here’s the code for the function:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> button1_Click(<span class="kwrd">object</span> sender, RoutedEventArgs e)</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     <span class="kwrd">string</span> fileName = System.IO.Path.GetFileName(mpsUri.Text);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>     <span class="rem">// start the download of the MP3</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span>     WebClient wc = <span class="kwrd">new</span> WebClient();</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum8">   8:</span>     wc.OpenReadCompleted += ((s, args) =&gt;</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum9">   9:</span>         {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum10">  10:</span>             DownloadProgress.IsIndeterminate = <span class="kwrd">false</span>;</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum11">  11:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum12">  12:</span>             <span class="rem">// once get the streams, put in isolated storage</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum13">  13:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum14">  14:</span>         });</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum15">  15:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum16">  16:</span>     wc.OpenReadAsync(<span class="kwrd">new</span> System.Uri(mpsUri.Text, System.UriKind.RelativeOrAbsolute));</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum17">  17:</span>     DownloadProgress.IsIndeterminate = <span class="kwrd">true</span>;</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum18">  18:</span> }</pre>
<!--CRLF--></div>
</div>
<p>And here’s a quick screenshot of what it looks like running:</p>
<p><img src="http://storage2.timheuer.com/wp7-media-progress.png" alt="Windows Phone 7 progress bar" title="Windows Phone 7 progress bar" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>Simple enough…let’s store the downloaded bits now.</p>
<h2>Storing the media to IsolatedStorage</h2>
<p>The result of OpenReadAsync is a Stream.  Using IsolatedStorage and specifically IsolatedStorageFileStream, I can write out those bits to a file that is stored in my device’s storage location.  Normally in the browser Silverlight world I would have to calculate the amount of storage needed, see if it is available and, if not, request a quota increase to the user.  I don’t have to do that in the phone world.  I can just begin to write out the data.  Ideally, however, I should check for available space since it is entirely possible the user has used all their storage.  This sample does not accommodate that logic.</p>
<p>In my OpenReadCompleted event I add the following logic:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="rem">// snipped</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span> wc.OpenReadCompleted += ((s, args) =&gt;</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span> {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>     DownloadProgress.IsIndeterminate = <span class="kwrd">false</span>;</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span>     <span class="rem">// once get the streams, put in isolated storage</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span>     <span class="kwrd">using</span> (var store = IsolatedStorageFile.GetUserStoreForApplication())</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum8">   8:</span>     {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum9">   9:</span>         <span class="kwrd">if</span> (store.FileExists(fileName))</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum10">  10:</span>         {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum11">  11:</span>             store.DeleteFile(fileName);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum12">  12:</span>         }</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum13">  13:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum14">  14:</span>         <span class="kwrd">using</span> (var fs = <span class="kwrd">new</span> IsolatedStorageFileStream(fileName, FileMode.Create, store))</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum15">  15:</span>         {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum16">  16:</span>             <span class="kwrd">byte</span>[] bytesInStream = <span class="kwrd">new</span> <span class="kwrd">byte</span>[args.Result.Length];</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum17">  17:</span>             args.Result.Read(bytesInStream, 0, (<span class="kwrd">int</span>)bytesInStream.Length);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum18">  18:</span>             fs.Write(bytesInStream, 0, bytesInStream.Length);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum19">  19:</span>             fs.Flush();</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum20">  20:</span>         }</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum21">  21:</span>     }</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum22">  22:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum23">  23:</span>     RefreshIsoFiles();</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum24">  24:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum25">  25:</span> });</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum26">  26:</span> // snipped</pre>
<!--CRLF--></div>
</div>
<p>You can see that I’m writing out the file stream to a file using the same name as the MP3 file literally (which may not make sense to the user, so again this is one of those ‘polish’ areas you’d want to make better and perhaps organize the files in IsolatedStorage better).</p>
<p>The last step you see is a call to RefreshIsoFiles.  This is a function that I also call when the first user interface page is loaded.  It traverses the IsolatedStorage for the app to display the already stored media in the ListBox in our XAML:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> RefreshIsoFiles()</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     <span class="kwrd">string</span>[] fileList;</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>  </pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>     <span class="kwrd">using</span> (var store = IsolatedStorageFile.GetUserStoreForApplication())</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span>     {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span>         fileList = store.GetFileNames();</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum8">   8:</span>     }</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum9">   9:</span>     listBox1.ItemsSource = fileList;</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum10">  10:</span> }</pre>
<!--CRLF--></div>
</div>
<p>Now we have our data downloaded and ready for playback.</p>
<h2>Playing back the stored media</h2>
<p>So great, now you have a stored MP3 file and you want to play it back.  Remember the XAML above and that I have a MediaElement there.  MediaElement is so simple at playing back media files from a URI.  Simply set the source of MediaElement and you can then call Play() and other functions.  <br />
</p>
<p><span style="font-weight: bold;">UPDATE: Well, you learn something new always.  Corrado pointed out below in comments that in WP7 you can SetSource directly to an IsolatedStorageFileStream...so while the following is interesting, it doesn't appear to be required in WP7 :-).</span><br />
</p>
<p>The challenge is that we now have our media in IsolatedStorage and there isn’t a URI scheme for IsolatedStorage that is predictable to the developer.  What we are left with is opening the media as a Stream and feeding that to the MediaElement.  This introduces MediaStreamSource.  If you aren’t familiar with this API, you’re probably not alone.  This is the API that enables a few scenarios, namely Smooth Streaming playback for Silverlight.  It is an extensible API so that you could wrap your own decode logic, etc. as needed.  Now given that MP3 is a common format you’d think it would be simple to do this…but there isn’t one built-in method for these various different codecs.</p>
<p>When MediaStreamSource was introduced, the program manager on that feature had written some helper files as code samples for developers to use.  One of them was an MP3 MediaStreamSource helper.  I wrote about them and where you can get them: <strong><a href="http://timheuer.com/blog/archive/2008/10/01/mediastreamsource-sample-with-source-code.aspx">MediaStreamSource for Silverlight</a></strong>.  Here’s where some awesome code re-use comes in to play.</p>
<p>I downloaded the ManagedMediaHelpers project and built the Mp3MediaStreamSource project (which also builds MediaHelpers).  In my WP7 project I simply added a reference to these in my project.  I was able to use these Silverlight binaries directly in my WP7 project! (I’ve included the compiled binaries in this sample for convenience but you can also see the source link in the article above.)</p>
<p>Now I need to read the media from IsolatedStorage as a stream, feed that Stream into my MediaStreamSource, and set that as the source for my MediaElement.  Here’s the relevant code on the Play button on my sample:</p>
<div class="csharpcode-wrapper" id="codeSnippetWrapper">
<div class="csharpcode" id="codeSnippet">
<pre class="alteven"><span class="lnum" id="lnum1">   1:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> button2_Click(<span class="kwrd">object</span> sender, RoutedEventArgs e)</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum2">   2:</span> {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum3">   3:</span>     <span class="kwrd">if</span> (listBox1.SelectedItem == <span class="kwrd">null</span>)</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum4">   4:</span>     {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum5">   5:</span>         MessageBox.Show(<span class="str">"choose an item to play back!"</span>);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum6">   6:</span>     }</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum7">   7:</span>     <span class="kwrd">else</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum8">   8:</span>     {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum9">   9:</span>         <span class="kwrd">using</span> (var store = IsolatedStorageFile.GetUserStoreForApplication())</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum10">  10:</span>         {</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum11">  11:</span>             audio = store.OpenFile(listBox1.SelectedItem.ToString(), FileMode.Open);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum12">  12:</span>             <span class="rem">// play it back as a MSS</span></pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum13">  13:</span>             mss = <span class="kwrd">new</span> Media.Mp3MediaStreamSource(audio);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum14">  14:</span>             mediaPlayback.SetSource(mss);</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum15">  15:</span>         }</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum16">  16:</span>     }</pre>
<!--CRLF-->
<pre class="alteven"><span class="lnum" id="lnum17">  17:</span> }</pre>
<!--CRLF--></div>
</div>
<p>The media now plays back on the phone.  My Stop button basically closes the stream (audio and mss are member variables of the project) and nulls out references.</p>
<h2>Summary</h2>
<p>This is I think what might be a common application scenario for WP7 (downloading media for playback later).  Hopefully over time our platform will improve to make some of this better (i.e., progress indication), but for now this should help those get started on this task.  The meat of the solution is in the MediaStreamSource implementation.  If you are working with MP3 format, then the sample code will help you greatly as it’s mostly done!  There are other implementations floating around for <a href="http://code.msdn.microsoft.com/wavmss">WAV</a> and other things as well if you need them.</p>
<p>Hopefully this might nudge <a href="http://twitter.com/chrisntr">Chris</a> along the right path and be a helpful tip to others as well.  If you have any feedback on the implementation or a better way of doing this, please share!  Here’s the solution bits to my sample in full: <a href="http://storage2.timheuer.com/Mp3StoreandPlayback.zip">Mp3StoreandPlayback.zip</a>.</p>
<p>Hope this helps!   </p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:e20477ba-1dc5-4f80-9edd-26826819aa33" style="padding: 0px; margin: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
