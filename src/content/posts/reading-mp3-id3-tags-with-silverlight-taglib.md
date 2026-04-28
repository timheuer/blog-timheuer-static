---
title: "Reading MP3 metadata with Silverlight and drag-drop"
slug: "reading-mp3-id3-tags-with-silverlight-taglib"
pubDate: 2010-01-30T15:38:00.000Z
lastModified: 2019-10-23T04:20:33.000Z
categories:
  - "silverlight"
  - "xaml"
  - "mp3"
  - "ria"
  - "media"
  - "riaservices"
  - "id3"
  - "id3v2"
  - "wma"
draft: false
---

<p>I’m working on a little sample application for music management in <a href="http://silverlight.net">Silverlight</a> using <a href="http://silverlight.net/riaservices">WCF RIA Services</a> and some other new Silverlight 4 features.  One thing that I wanted to add to the application was the ability to drag an audio file and either lookup the data and/or add a new album/artist/song to the library automatically.</p>  <p>Audio formats have a ‘tag’ format known as <a href="http://id3.org/">ID3</a>.  It’s a format used for audio file metadata that is used in Windows Media Player, iTunes, and various hardware devices as well.  Over the years there has been an evolution of this format, with the older ID3v1 format basically taking up a header space with fixed character spaces for various things like Album, Artist, Title, Year, Track.  Over time though the ID3v2 format has been adapted more as it is more flexible for things like album art, and longer titles, etc.  There are various <a href="http://id3.org/Implementations">implementations of ID3 libraries for .NET</a> that developers can choose from.  All of these implementations don’t take into account Silverlight unfortunately.</p>  <p>Silverlight can only reference Silverlight-compatible libraries.  Most of these libraries were targeted for the full .NET Framework and thus I can’t binary reference them.  Luckily most of them (except one) are Open Source so I could tinker.  I took the step of simply copying the files to a Silverlight project and recompiling.  This did not work 100% in a single task.  Most of the libraries had some form of Serialization attributes/constructors and almost all used some form of ASCII encoding for various string manipulation of byte arrays.</p>  <p>I settled on <a href="http://developer.novell.com/wiki/index.php/TagLib_Sharp">TagLib#</a> as the library that was the easiest to modify for me.  I had to make the same changes I mentioned above to this library as well.  I created a new Silverlight 4 class library and compiled it as such.  One thing that TagLib# didn’t have was a stream input implementation.  Most of the libraries, in fact, assumed a local file path.  Luckily the library was written using a generic ‘File’ interface, so I just had to create my own StreamFileAbstraction.  I chose to do this within my project rather than the base library.  It was easy since the LocalFileAbstraction actually perfomed an Open on the file as it’s first task and set some public variables.  My abstraction basically just hands the stream already and ready to go.</p>  <p>Now, using the <a href="http://timheuer.com/blog/archive/2009/11/18/whats-new-in-silverlight-4-complete-guide-new-features.aspx#droptarget">Silverlight 4 drop target feature</a>, I created just a simple test harness to test my theory.  My XAML basically is this (pretty rudimentary just to test my theory):</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">Grid</span> <span class="attr">x:Name</span><span class="kwrd">="LayoutRoot"</span> <span class="attr">Background</span><span class="kwrd">="White"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>         <span class="kwrd">&lt;</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>             <span class="kwrd">&lt;</span><span class="html">Border</span> <span class="attr">x:Name</span><span class="kwrd">="DropZone"</span> <span class="attr">Width</span><span class="kwrd">="700"</span> <span class="attr">Height</span><span class="kwrd">="300"</span> <span class="attr">Background</span><span class="kwrd">="Silver"</span> <span class="attr">CornerRadius</span><span class="kwrd">="8"</span> <span class="attr">AllowDrop</span><span class="kwrd">="True"</span> <span class="attr">Drop</span><span class="kwrd">="DropZone_Drop"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>                 <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">TextWrapping</span><span class="kwrd">="Wrap"</span> <span class="attr">Text</span><span class="kwrd">="drop here"</span> <span class="attr">FontSize</span><span class="kwrd">="64"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Center"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Center"</span> <span class="attr">Foreground</span><span class="kwrd">="Gray"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>             <span class="kwrd">&lt;/</span><span class="html">Border</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>             <span class="kwrd">&lt;</span><span class="html">Grid</span> <span class="attr">Height</span><span class="kwrd">="255"</span> <span class="attr">Width</span><span class="kwrd">="700"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>                 <span class="kwrd">&lt;</span><span class="html">Grid.ColumnDefinitions</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>                     <span class="kwrd">&lt;</span><span class="html">ColumnDefinition</span> <span class="attr">Width</span><span class="kwrd">="111"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>                     <span class="kwrd">&lt;</span><span class="html">ColumnDefinition</span> <span class="attr">Width</span><span class="kwrd">="*"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>                 <span class="kwrd">&lt;/</span><span class="html">Grid.ColumnDefinitions</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>                 <span class="kwrd">&lt;</span><span class="html">Grid.RowDefinitions</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>                     <span class="kwrd">&lt;</span><span class="html">RowDefinition</span> <span class="attr">Height</span><span class="kwrd">="Auto"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span>                     <span class="kwrd">&lt;</span><span class="html">RowDefinition</span> <span class="attr">Height</span><span class="kwrd">="Auto"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum14" class="lnum">  14:</span>                     <span class="kwrd">&lt;</span><span class="html">RowDefinition</span> <span class="attr">Height</span><span class="kwrd">="Auto"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum15" class="lnum">  15:</span>                     <span class="kwrd">&lt;</span><span class="html">RowDefinition</span> <span class="attr">Height</span><span class="kwrd">="Auto"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum16" class="lnum">  16:</span>                     <span class="kwrd">&lt;</span><span class="html">RowDefinition</span> <span class="attr">Height</span><span class="kwrd">="50*"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum17" class="lnum">  17:</span>                 <span class="kwrd">&lt;/</span><span class="html">Grid.RowDefinitions</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum18" class="lnum">  18:</span>                 <span class="kwrd">&lt;</span><span class="html">dataInput:Label</span> <span class="attr">Content</span><span class="kwrd">="Artist"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Right"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">FontWeight</span><span class="kwrd">="Bold"</span> <span class="attr">Margin</span><span class="kwrd">="4"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum19" class="lnum">  19:</span>                 <span class="kwrd">&lt;</span><span class="html">dataInput:Label</span> <span class="attr">Content</span><span class="kwrd">="Album"</span> <span class="attr">Grid</span>.<span class="attr">Row</span><span class="kwrd">="1"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Right"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">FontWeight</span><span class="kwrd">="Bold"</span> <span class="attr">Margin</span><span class="kwrd">="4"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum20" class="lnum">  20:</span>                 <span class="kwrd">&lt;</span><span class="html">dataInput:Label</span> <span class="attr">Content</span><span class="kwrd">="Title"</span> <span class="attr">Grid</span>.<span class="attr">Row</span><span class="kwrd">="2"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Right"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">FontWeight</span><span class="kwrd">="Bold"</span> <span class="attr">Margin</span><span class="kwrd">="4"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum21" class="lnum">  21:</span>                 <span class="kwrd">&lt;</span><span class="html">dataInput:Label</span> <span class="attr">Grid</span>.<span class="attr">Column</span><span class="kwrd">="1"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">Name</span><span class="kwrd">="Artist"</span> <span class="attr">Margin</span><span class="kwrd">="4"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum22" class="lnum">  22:</span>                 <span class="kwrd">&lt;</span><span class="html">dataInput:Label</span> <span class="attr">Grid</span>.<span class="attr">Column</span><span class="kwrd">="1"</span> <span class="attr">Grid</span>.<span class="attr">Row</span><span class="kwrd">="1"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">Name</span><span class="kwrd">="Album"</span> <span class="attr">Margin</span><span class="kwrd">="4"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum23" class="lnum">  23:</span>                 <span class="kwrd">&lt;</span><span class="html">dataInput:Label</span> <span class="attr">Grid</span>.<span class="attr">Column</span><span class="kwrd">="1"</span> <span class="attr">Grid</span>.<span class="attr">Row</span><span class="kwrd">="2"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">Name</span><span class="kwrd">="Title"</span> <span class="attr">Margin</span><span class="kwrd">="4"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum24" class="lnum">  24:</span>                 <span class="kwrd">&lt;</span><span class="html">Image</span> <span class="attr">Grid</span>.<span class="attr">Column</span><span class="kwrd">="1"</span> <span class="attr">Grid</span>.<span class="attr">Row</span><span class="kwrd">="4"</span> <span class="attr">Height</span><span class="kwrd">="118"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Left"</span> <span class="attr">Margin</span><span class="kwrd">="4,2,0,0"</span> <span class="attr">Name</span><span class="kwrd">="AlbumArt"</span> <span class="attr">Stretch</span><span class="kwrd">="Fill"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> <span class="attr">Width</span><span class="kwrd">="118"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum25" class="lnum">  25:</span>             <span class="kwrd">&lt;/</span><span class="html">Grid</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum26" class="lnum">  26:</span>         <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum27" class="lnum">  27:</span>     <span class="kwrd">&lt;/</span><span class="html">Grid</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Notice on the Border the <em>AllowDrop=”True”</em> attribute.  This tells Silverlight that the element can be used as a drop target (for a file from the file system).  The rendered UI looks like this:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" alt="Sample MP3 test UI" src="http://storage.timheuer.com/mpsdrop1.png" width="600" height="498" /></p>

<p>You may also notice the <em>Drop</em> attribute on the Border element that maps to the event handler <em>DropZone_Drop</em>.  This event handler basically gives us an event argument that represents the dropped objects on the surface (yes you can drop more than one).  The initial stub of this function looks like this:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> DropZone_Drop(<span class="kwrd">object</span> sender, DragEventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     IDataObject drop = e.Data <span class="kwrd">as</span> IDataObject;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     <span class="kwrd">object</span> data = drop.GetData(DataFormats.FileDrop);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>     FileInfo[] files = data <span class="kwrd">as</span> FileInfo[];</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>     FileInfo file = files[0];</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span> }</pre>
<!--CRLF--></div>
</div>

<p>I’m being a little verbose in the code to show each of the steps.  As you can see you get a FileInfo array and can pull items out of that.  For my sample I’m just assuming one item was dropped.  In the next steps I just need to get the Stream from the file and use my library.  Here is the full function (with a quick check to make sure it is a supported audio file):</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> DropZone_Drop(<span class="kwrd">object</span> sender, DragEventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     IDataObject drop = e.Data <span class="kwrd">as</span> IDataObject;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     <span class="kwrd">object</span> data = drop.GetData(DataFormats.FileDrop);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>     FileInfo[] files = data <span class="kwrd">as</span> FileInfo[];</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>     FileInfo file = files[0];</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>     <span class="kwrd">if</span> (file.Extension.ToLower() != <span class="str">".mp3"</span> &amp;&amp; file.Extension.ToLower() != <span class="str">".wma"</span>)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span>         MessageBox.Show(<span class="str">"Must be an MP3 file"</span>);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum14" class="lnum">  14:</span>     }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum15" class="lnum">  15:</span>     <span class="kwrd">else</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum16" class="lnum">  16:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum17" class="lnum">  17:</span>         Stream fileStream = file.OpenRead();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum18" class="lnum">  18:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum19" class="lnum">  19:</span>         TagLib.File.IFileAbstraction fileAbstraction = <span class="kwrd">new</span> StreamFileAbstraction(fileStream, file.Name);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum20" class="lnum">  20:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum21" class="lnum">  21:</span>         TagLib.File tagFile = TagLib.File.Create(fileAbstraction);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum22" class="lnum">  22:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum23" class="lnum">  23:</span>         <span class="kwrd">if</span> (tagFile.Tag.TagTypes.HasFlag(TagLib.TagTypes.Id3v2))</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum24" class="lnum">  24:</span>         {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum25" class="lnum">  25:</span>             Artist.Content = tagFile.Tag.FirstAlbumArtist;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum26" class="lnum">  26:</span>             Album.Content = <span class="kwrd">string</span>.IsNullOrEmpty(tagFile.Tag.Album) ? <span class="str">"NO ALBUM NAME"</span> : tagFile.Tag.Album;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum27" class="lnum">  27:</span>             Title.Content = tagFile.Tag.Title;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum28" class="lnum">  28:</span>             <span class="kwrd">if</span> (tagFile.Tag.Pictures.Length &gt; 0)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum29" class="lnum">  29:</span>             {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum30" class="lnum">  30:</span>                 IPicture pic = tagFile.Tag.Pictures[0];</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum31" class="lnum">  31:</span>                 MemoryStream img = <span class="kwrd">new</span> MemoryStream(pic.Data.Data);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum32" class="lnum">  32:</span>                 BitmapImage bmp = <span class="kwrd">new</span> BitmapImage();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum33" class="lnum">  33:</span>                 bmp.SetSource(img);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum34" class="lnum">  34:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum35" class="lnum">  35:</span>                 AlbumArt.Source = bmp;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum36" class="lnum">  36:</span>             }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum37" class="lnum">  37:</span>         }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum38" class="lnum">  38:</span>         <span class="kwrd">else</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum39" class="lnum">  39:</span>         {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum40" class="lnum">  40:</span>             MessageBox.Show(<span class="str">"no id3v2 tag"</span>);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum41" class="lnum">  41:</span>         }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum42" class="lnum">  42:</span>     }</pre>
<!--CRLF--></div>
</div>

<p>Once all the pieces are together you drag an audio file on the drop surface and the items will populate.  Here’s a quick video showing how it all works together.</p>

<p align="center"><object data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="640" height="480">
		  <param name="source" value="http://video.timheuer.com/players/smf1/SmfSimplePlayer.xap" />
		  <param name="background" value="white" />
			<param name="enableHtmlAccess" value="true" />
		  <param name="minRuntimeVersion" value="3.0.40818.0" />
          	<param name="initParams" value="media=http://video.timheuer.com/mp3drop/dropmp3.wmv" />
		  <param name="autoUpgrade" value="true" />
		  <a href="http://go.microsoft.com/fwlink/?LinkID=149156&amp;v=3.0.40818.0" style="text-decoration:none">
 			  <img src="http://go.microsoft.com/fwlink/?LinkId=161376" alt="Get Microsoft Silverlight" style="border-style:none" />
		  </a>
	    </object></p>

<p>So this is just a start – and I’ve got only the tag reading working…didn’t bother looking at the other parts of the library so I <em>know</em> it isn’t fully ported for Silverlight.</p>

<p>What do you think?  Found a better implementation of ID3 tag reading?</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:01d17dc9-da66-4af7-ae5f-2402b0526a83" class="wlWriterEditableSmartContent"></div>

<br />



<br />
