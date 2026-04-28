---
title: "Handling picture orientation in CameraCaptureTask in Windows Phone 7"
slug: "working-with-pictures-in-camera-tasks-in-windows-phone-7-orientation-rotation"
pubDate: 2010-09-23T12:47:38.000Z
lastModified: 2019-10-23T04:20:37.000Z
categories:
  - "silverlight"
  - "xaml"
  - "media"
  - "xna"
  - "wp7dev"
  - "windows-phone"
  - "windows phone 7"
draft: false
---

<p>I was spelunking around playing with <a href="http://www.silverlight.net"><strong>Silverlight</strong></a> in <strong><a href="http://developer.windowsphone.com/">Windows Phone 7</a></strong> and specifically the <strong>CameraCaptureTask</strong>.  The “tasks” are APIs that allow you to interact with phone-specific functionality like the camera, picture picker, phone dialer, etc.  A whole list of the available tasks in the <a href="http://msdn.microsoft.com/en-us/library/microsoft.phone.tasks(v=VS.92).aspx">Microsoft.Phone.Tasks namespace can be found in the developer documentation</a>.</p>  <p>I was basically creating a simple application that would allow you to choose (PhotoChooserTask) or take a picture (CameraCaptureTask) and then display the picture (and later post it online or something).  Here was my basic XAML structure:</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">Grid</span> <span class="attr">x:Name</span><span class="kwrd">="LayoutRoot"</span> <span class="attr">Background</span><span class="kwrd">="Transparent"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>     <span class="kwrd">&lt;</span><span class="html">Grid.RowDefinitions</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>         <span class="kwrd">&lt;</span><span class="html">RowDefinition</span> <span class="attr">Height</span><span class="kwrd">="Auto"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>         <span class="kwrd">&lt;</span><span class="html">RowDefinition</span> <span class="attr">Height</span><span class="kwrd">="*"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     <span class="kwrd">&lt;/</span><span class="html">Grid.RowDefinitions</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>     <span class="rem">&lt;!--TitlePanel contains the name of the application and page title--&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>     <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">x:Name</span><span class="kwrd">="TitlePanel"</span> <span class="attr">Grid</span>.<span class="attr">Row</span><span class="kwrd">="0"</span> <span class="attr">Margin</span><span class="kwrd">="12,17,0,28"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>         <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="ApplicationTitle"</span> <span class="attr">Text</span><span class="kwrd">="PICTURE POSTER"</span> <span class="attr">Style</span><span class="kwrd">="{StaticResource PhoneTextNormalStyle}"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>         <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="PageTitle"</span> <span class="attr">Text</span><span class="kwrd">="take and post"</span> <span class="attr">Margin</span><span class="kwrd">="9,-7,0,0"</span> <span class="attr">Style</span><span class="kwrd">="{StaticResource PhoneTextTitle1Style}"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>     <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span>     <span class="rem">&lt;!--ContentPanel - place additional content here--&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum14" class="lnum">  14:</span>     <span class="kwrd">&lt;</span><span class="html">Grid</span> <span class="attr">x:Name</span><span class="kwrd">="ContentPanel"</span> <span class="attr">Grid</span>.<span class="attr">Row</span><span class="kwrd">="1"</span> <span class="attr">Margin</span><span class="kwrd">="12,0,12,0"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum15" class="lnum">  15:</span>         <span class="kwrd">&lt;</span><span class="html">Image</span> <span class="attr">Margin</span><span class="kwrd">="8,8,8,159"</span> <span class="attr">x:Name</span><span class="kwrd">="ChosenPicture"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum16" class="lnum">  16:</span>         <span class="kwrd">&lt;</span><span class="html">Button</span> <span class="attr">Click</span><span class="kwrd">="OnPostClicked"</span> <span class="attr">x:Name</span><span class="kwrd">="PostPic"</span> <span class="attr">Content</span><span class="kwrd">="POST"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Right"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Bottom"</span> <span class="attr">Margin</span><span class="kwrd">="0,0,8,47"</span> <span class="attr">Width</span><span class="kwrd">="199"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum17" class="lnum">  17:</span>         <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="PostedUri"</span> <span class="attr">TextWrapping</span><span class="kwrd">="Wrap"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Bottom"</span> <span class="attr">Margin</span><span class="kwrd">="8,0,8,20"</span><span class="kwrd">/&gt;&lt;/</span><span class="html">Grid</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum18" class="lnum">  18:</span> <span class="kwrd">&lt;/</span><span class="html">Grid</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum19" class="lnum">  19:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum20" class="lnum">  20:</span> <span class="rem">&lt;!--Sample code showing usage of ApplicationBar--&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum21" class="lnum">  21:</span> <span class="kwrd">&lt;</span><span class="html">phone:PhoneApplicationPage.ApplicationBar</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum22" class="lnum">  22:</span>     <span class="kwrd">&lt;</span><span class="html">shell:ApplicationBar</span> <span class="attr">IsVisible</span><span class="kwrd">="True"</span> <span class="attr">IsMenuEnabled</span><span class="kwrd">="True"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum23" class="lnum">  23:</span>         <span class="kwrd">&lt;</span><span class="html">shell:ApplicationBar.MenuItems</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum24" class="lnum">  24:</span>             <span class="kwrd">&lt;</span><span class="html">shell:ApplicationBarMenuItem</span> <span class="attr">Text</span><span class="kwrd">="take picture"</span> <span class="attr">Click</span><span class="kwrd">="OnMenuTakeClicked"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum25" class="lnum">  25:</span>             <span class="kwrd">&lt;</span><span class="html">shell:ApplicationBarMenuItem</span> <span class="attr">Text</span><span class="kwrd">="choose picture"</span> <span class="attr">Click</span><span class="kwrd">="OnMenuChooseClicked"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum26" class="lnum">  26:</span>             <span class="kwrd">&lt;</span><span class="html">shell:ApplicationBarMenuItem</span> <span class="attr">Text</span><span class="kwrd">="save picture"</span> <span class="attr">Click</span><span class="kwrd">="OnSavePictureClicked"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum27" class="lnum">  27:</span>         <span class="kwrd">&lt;/</span><span class="html">shell:ApplicationBar.MenuItems</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum28" class="lnum">  28:</span>     <span class="kwrd">&lt;/</span><span class="html">shell:ApplicationBar</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum29" class="lnum">  29:</span> <span class="kwrd">&lt;/</span><span class="html">phone:PhoneApplicationPage.ApplicationBar</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>And the initial code to trigger the task from a MenuItem:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> OnMenuTakeClicked(<span class="kwrd">object</span> sender, EventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     CameraCaptureTask cam = <span class="kwrd">new</span> CameraCaptureTask();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     cam.Completed += <span class="kwrd">new</span> EventHandler&lt;PhotoResult&gt;(OnCameraCaptureCompleted);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     cam.Show();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span> }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> OnMenuChooseClicked(<span class="kwrd">object</span> sender, EventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>     PhotoChooserTask pix = <span class="kwrd">new</span> PhotoChooserTask();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>     pix.Completed += <span class="kwrd">new</span> EventHandler&lt;PhotoResult&gt;(OnCameraCaptureCompleted);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>     pix.ShowCamera = <span class="kwrd">true</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span>     pix.Show();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum14" class="lnum">  14:</span> }</pre>
<!--CRLF--></div>
</div>

<p>As you can see it is pretty simple and brings up the OS-standard camera and/or photo chooser.  </p>

<p>NOTE: if you use the PhotoChooserTask you can also initiate taking a new picture from that task as well.</p>

<p>After the picture is chosen (from a new pic or from a picker) I put the item in the Image control in my XAML:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">void</span> OnCameraCaptureCompleted(<span class="kwrd">object</span> sender, PhotoResult e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     capturedImage = e.ChosenPhoto; <span class="rem">// this is a member variable to store the last chosen pic</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     BitmapImage bmp = <span class="kwrd">new</span> BitmapImage();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>     bmp.SetSource(e.ChosenPhoto);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>     ChosenPicture.Source = bmp;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span> }</pre>
<!--CRLF--></div>
</div>

<p>During this, however, I found that no matter how I held the phone when I took the picture (portrait or landscape), the API always assumed landscape.  I tried looking at some of the device orientation data, but it wasn’t providing the right information at the time I needed it.  It turns out after some internal discussions that others were seeing this as well.  On the device I have (Samsung) the picture snapshot button is in a natural place if you were to hold it landscape.  However, in my current experience with my mobile devices (Android and iPhone) I actually take more pictures in portrait mode.</p>

<p>After some discussion with folks internally, one of our test leads for WP7 reminded everyone that the phone does provide the <a href="http://en.wikipedia.org/wiki/EXIF">EXIF</a> information for each picture taken.  One of the attributes of EXIF is orientation (or rotation).  Now all we needed was a method to read the EXIF data in .NET…enter <a href="http://www.codeproject.com/KB/silverlight/Exif_Data.aspx">ExifLib</a>.  This is a cool Code Project article and source code download that does a great job providing a simple EXIF reading experience.</p>

<p>The ExifLib as it stood wouldn’t work with the Stream that is provided as a result of the CameraCaptureTask, so a slight modification (or in my case I just created an override) to the function was needed for the library.  Here’s the additional override I added:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">public</span> <span class="kwrd">static</span> JpegInfo ReadJpeg(Stream FileStream, <span class="kwrd">string</span> FileName)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     DateTime now = DateTime.Now;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     ExifReader reader = <span class="kwrd">new</span> ExifReader(FileStream);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     reader.info.FileSize = (<span class="kwrd">int</span>)FileStream.Length;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>     reader.info.FileName = <span class="kwrd">string</span>.Format(<span class="str">"{0}.jpg"</span>, FileName);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>     reader.info.LoadTime = (TimeSpan)(DateTime.Now - now);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>     <span class="kwrd">return</span> reader.info;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span> }</pre>
<!--CRLF--></div>
</div>

<p>Now with that in place, I could accomplish taking my picture and read the EXIF data and apply the appropriate transform based on the orientation data.  The first thing I had to do was to create a RotateTransform on my Image element as well as set the RenderTransformOrigin on the Image element:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">Image</span> <span class="attr">Margin</span><span class="kwrd">="8,8,8,159"</span> <span class="attr">x:Name</span><span class="kwrd">="ChosenPicture"</span> <span class="attr">RenderTransformOrigin</span><span class="kwrd">="0.5,0.5"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>     <span class="kwrd">&lt;</span><span class="html">Image.RenderTransform</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>         <span class="kwrd">&lt;</span><span class="html">RotateTransform</span> <span class="attr">x:Name</span><span class="kwrd">="ImageRotate"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     <span class="kwrd">&lt;/</span><span class="html">Image.RenderTransform</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span> <span class="kwrd">&lt;/</span><span class="html">Image</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Now in code in my completed handler for the task I modified it to look at the EXIF orientation data and apply the correct rotation to show the image:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">void</span> OnCameraCaptureCompleted(<span class="kwrd">object</span> sender, PhotoResult e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     capturedImage = e.ChosenPhoto;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     BitmapImage bmp = <span class="kwrd">new</span> BitmapImage();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>     bmp.SetSource(e.ChosenPhoto);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>     ChosenPicture.Source = bmp;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>     <span class="rem">// figure out the orientation from EXIF data</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>     e.ChosenPhoto.Position = 0;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>     JpegInfo info = ExifReader.ReadJpeg(e.ChosenPhoto, e.OriginalFileName);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span>     PostedUri.Text = info.Orientation.ToString();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum14" class="lnum">  14:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum15" class="lnum">  15:</span>     <span class="kwrd">switch</span> (info.Orientation)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum16" class="lnum">  16:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum17" class="lnum">  17:</span>         <span class="kwrd">case</span> ExifOrientation.TopLeft:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum18" class="lnum">  18:</span>         <span class="kwrd">case</span> ExifOrientation.Undefined:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum19" class="lnum">  19:</span>             ImageRotate.Angle = 0d;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum20" class="lnum">  20:</span>             <span class="kwrd">break</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum21" class="lnum">  21:</span>         <span class="kwrd">case</span> ExifOrientation.TopRight:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum22" class="lnum">  22:</span>             ImageRotate.Angle = 90d;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum23" class="lnum">  23:</span>             <span class="kwrd">break</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum24" class="lnum">  24:</span>         <span class="kwrd">case</span> ExifOrientation.BottomRight:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum25" class="lnum">  25:</span>             ImageRotate.Angle = 180d;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum26" class="lnum">  26:</span>             <span class="kwrd">break</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum27" class="lnum">  27:</span>         <span class="kwrd">case</span> ExifOrientation.BottomLeft:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum28" class="lnum">  28:</span>             ImageRotate.Angle = 270d;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum29" class="lnum">  29:</span>             <span class="kwrd">break</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum30" class="lnum">  30:</span>     }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum31" class="lnum">  31:</span> }</pre>
<!--CRLF--></div>
</div>

<p>Now I’ve got my flexibility in my application and don’t have to worry about the orientation.  </p>

<p>Now of course this only helps for the display of the information.  If you were to use the libraries to save the image you’d still have the issue of an incorrect orientation on the picture.  Again, iterating with our test team internally (thanks Stefan!!!) here’s a modified view of the world.</p>

<p>First, instead of rotating the Image element, let’s just rotate the actual Pixels themselves:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">void</span> OnCameraCaptureCompleted(<span class="kwrd">object</span> sender, PhotoResult e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="rem">// figure out the orientation from EXIF data</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     e.ChosenPhoto.Position = 0;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     JpegInfo info = ExifReader.ReadJpeg(e.ChosenPhoto, e.OriginalFileName);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>     _width = info.Width;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>     _height = info.Height;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>     _orientation = info.Orientation;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>     PostedUri.Text = info.Orientation.ToString();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span>     <span class="kwrd">switch</span> (info.Orientation)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum14" class="lnum">  14:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum15" class="lnum">  15:</span>         <span class="kwrd">case</span> ExifOrientation.TopLeft:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum16" class="lnum">  16:</span>         <span class="kwrd">case</span> ExifOrientation.Undefined:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum17" class="lnum">  17:</span>             _angle = 0;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum18" class="lnum">  18:</span>             <span class="kwrd">break</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum19" class="lnum">  19:</span>         <span class="kwrd">case</span> ExifOrientation.TopRight:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum20" class="lnum">  20:</span>             _angle = 90;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum21" class="lnum">  21:</span>             <span class="kwrd">break</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum22" class="lnum">  22:</span>         <span class="kwrd">case</span> ExifOrientation.BottomRight:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum23" class="lnum">  23:</span>             _angle = 180;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum24" class="lnum">  24:</span>             <span class="kwrd">break</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum25" class="lnum">  25:</span>         <span class="kwrd">case</span> ExifOrientation.BottomLeft:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum26" class="lnum">  26:</span>             _angle = 270;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum27" class="lnum">  27:</span>             <span class="kwrd">break</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum28" class="lnum">  28:</span>     }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum29" class="lnum">  29:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum30" class="lnum">  30:</span>     <span class="kwrd">if</span> (_angle &gt; 0d)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum31" class="lnum">  31:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum32" class="lnum">  32:</span>         capturedImage = RotateStream(e.ChosenPhoto, _angle);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum33" class="lnum">  33:</span>     }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum34" class="lnum">  34:</span>     <span class="kwrd">else</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum35" class="lnum">  35:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum36" class="lnum">  36:</span>         capturedImage = e.ChosenPhoto;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum37" class="lnum">  37:</span>     }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum38" class="lnum">  38:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum39" class="lnum">  39:</span>     BitmapImage bmp = <span class="kwrd">new</span> BitmapImage();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum40" class="lnum">  40:</span>     bmp.SetSource(capturedImage);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum41" class="lnum">  41:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum42" class="lnum">  42:</span>     ChosenPicture.Source = bmp;           </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum43" class="lnum">  43:</span> }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum44" class="lnum">  44:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum45" class="lnum">  45:</span> <span class="kwrd">private</span> Stream RotateStream(Stream stream, <span class="kwrd">int</span> angle)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum46" class="lnum">  46:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum47" class="lnum">  47:</span>     stream.Position = 0;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum48" class="lnum">  48:</span>     <span class="kwrd">if</span> (angle % 90 != 0 || angle &lt; 0) <span class="kwrd">throw</span> <span class="kwrd">new</span> ArgumentException();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum49" class="lnum">  49:</span>     <span class="kwrd">if</span> (angle % 360 == 0) <span class="kwrd">return</span> stream;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum50" class="lnum">  50:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum51" class="lnum">  51:</span>     BitmapImage bitmap = <span class="kwrd">new</span> BitmapImage();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum52" class="lnum">  52:</span>     bitmap.SetSource(stream);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum53" class="lnum">  53:</span>     WriteableBitmap wbSource = <span class="kwrd">new</span> WriteableBitmap(bitmap);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum54" class="lnum">  54:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum55" class="lnum">  55:</span>     WriteableBitmap wbTarget = <span class="kwrd">null</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum56" class="lnum">  56:</span>     <span class="kwrd">if</span> (angle % 180 == 0)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum57" class="lnum">  57:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum58" class="lnum">  58:</span>         wbTarget = <span class="kwrd">new</span> WriteableBitmap(wbSource.PixelWidth, wbSource.PixelHeight);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum59" class="lnum">  59:</span>     }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum60" class="lnum">  60:</span>     <span class="kwrd">else</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum61" class="lnum">  61:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum62" class="lnum">  62:</span>         wbTarget = <span class="kwrd">new</span> WriteableBitmap(wbSource.PixelHeight, wbSource.PixelWidth);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum63" class="lnum">  63:</span>     }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum64" class="lnum">  64:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum65" class="lnum">  65:</span>     <span class="kwrd">for</span> (<span class="kwrd">int</span> x = 0; x &lt; wbSource.PixelWidth; x++)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum66" class="lnum">  66:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum67" class="lnum">  67:</span>         <span class="kwrd">for</span> (<span class="kwrd">int</span> y = 0; y &lt; wbSource.PixelHeight; y++)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum68" class="lnum">  68:</span>         {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum69" class="lnum">  69:</span>             <span class="kwrd">switch</span> (angle % 360)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum70" class="lnum">  70:</span>             {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum71" class="lnum">  71:</span>                 <span class="kwrd">case</span> 90:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum72" class="lnum">  72:</span>                     wbTarget.Pixels[(wbSource.PixelHeight - y - 1) + x * wbTarget.PixelWidth] = wbSource.Pixels[x + y * wbSource.PixelWidth];</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum73" class="lnum">  73:</span>                     <span class="kwrd">break</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum74" class="lnum">  74:</span>                 <span class="kwrd">case</span> 180:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum75" class="lnum">  75:</span>                     wbTarget.Pixels[(wbSource.PixelWidth - x - 1) + (wbSource.PixelHeight - y - 1) * wbSource.PixelWidth] = wbSource.Pixels[x + y * wbSource.PixelWidth];</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum76" class="lnum">  76:</span>                     <span class="kwrd">break</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum77" class="lnum">  77:</span>                 <span class="kwrd">case</span> 270:</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum78" class="lnum">  78:</span>                     wbTarget.Pixels[y + (wbSource.PixelWidth - x - 1) * wbTarget.PixelWidth] = wbSource.Pixels[x + y * wbSource.PixelWidth];</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum79" class="lnum">  79:</span>                     <span class="kwrd">break</span>;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum80" class="lnum">  80:</span>             }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum81" class="lnum">  81:</span>         }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum82" class="lnum">  82:</span>     }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum83" class="lnum">  83:</span>     MemoryStream targetStream = <span class="kwrd">new</span> MemoryStream();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum84" class="lnum">  84:</span>     wbTarget.SaveJpeg(targetStream, wbTarget.PixelWidth, wbTarget.PixelHeight, 0, 100);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum85" class="lnum">  85:</span>     <span class="kwrd">return</span> targetStream;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum86" class="lnum">  86:</span> }</pre>
<!--CRLF--></div>
</div>

<p>Notice here that OnCameraCaptureCompleted is different in that we first check the orientation and if needed rotate the pixels using the newly introduced RotateStream method.  The resulting stream is what we actually set on our Image element and no need for RotateTransform at this point.  I can then even have a menu item save the picture to the media library on the device:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> OnSavePictureClicked(<span class="kwrd">object</span> sender, EventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="kwrd">if</span> (capturedImage != <span class="kwrd">null</span>)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>         capturedImage.Seek(0, 0); <span class="rem">// necessary to initiate the stream correctly before save</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>         MediaLibrary ml = <span class="kwrd">new</span> MediaLibrary();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>         <span class="kwrd">try</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>         {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>             Picture p = ml.SavePicture(Guid.NewGuid().ToString(), capturedImage);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>             PostedUri.Text += <span class="str">":"</span> + p.Name;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>         }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span>         <span class="kwrd">catch</span> (Exception ex)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum14" class="lnum">  14:</span>         {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum15" class="lnum">  15:</span>             PostedUri.Text = ex.Message;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum16" class="lnum">  16:</span>         }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum17" class="lnum">  17:</span>     }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum18" class="lnum">  18:</span> }</pre>
<!--CRLF--></div>
</div>

<p>The MediaLibrary is a part of Microsoft.Xna.Framework.Media and provides the easy functionality of saving to the device.  And upon sync (or sharing) my image is what I expected when I took the picture using the CameraCaptureTask.</p>

<p>Here is my final project sample (lots of debug code in there, but you should get the point): <a href="http://storage2.timheuer.com/WindowsPhoneApplication63.zip">WindowsPhoneApplication63.zip</a> (requires the <a href="http://developer.windowsphone.com/">Windows Phone Developer Tools</a>)</p>

<p>Hope this helps! </p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:fbb0e7a5-3773-416b-b4a9-67c1812fb2f6" class="wlWriterEditableSmartContent"></div>
