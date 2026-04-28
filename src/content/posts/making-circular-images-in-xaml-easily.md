---
title: "Making circular images in XAML"
slug: "making-circular-images-in-xaml-easily"
pubDate: 2015-05-06T09:25:03.000Z
lastModified: 2019-10-23T04:20:41.000Z
categories:
  - "xaml"
  - "visual studio"
  - "windows"
  - "wpdev"
  - "ellipse"
  - "image"
draft: false
---

<p>A long while back it seemed like the new cool app thing to do was to represent people/avatars in circles instead of the squares (or squares with rounded corners).  I made a snarky comment about this myself almost exactly 2 years ago when I noticed that some apps I was using at the time switched to this:</p>    <blockquote lang="en" class="twitter-tweet">   <p lang="en" dir="ltr">Seeing a trend that the new avatar shape in apps is a circle and no longer square</p> — Tim Heuer (@timheuer) <a href="https://twitter.com/timheuer/status/315600991963717632">March 23, 2013</a></blockquote> <script async="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>    <p>Now since this seems to be a popular trend and people are doing it I’ve thought XAML folks have figured it out.  However I’ve seen enough questions and some people trying to do a few things that make it more complex that I thought I’d drop a quick blog post about it.  I’ve seen people trying to do profile pic upload algorithms that clip the actual bitmap and save on disk before displaying it to people stacking transparent PNG ‘masking’ techniques.  None of this is needed for the simplest display.  Here you go:</p>  <pre class="brush: xml; toolbar: false; highlight: [3];">&lt;Ellipse Width="250" Height="250"&gt;
    &lt;Ellipse.Fill&gt;
        &lt;ImageBrush ImageSource="ms-appx:///highfive.jpg" /&gt;
    &lt;/Ellipse.Fill&gt;
&lt;/Ellipse&gt;</pre>

<p>That’s it.  You’ll see that Line 3 shows us using an ImageBrush as the fill for an Ellipse.  Using an Ellipse helps you get the precise circular drawing clip without having pixelated edges or anything like that.  The above would render to this image as the example in my app:</p>

<p><img title="Circular image" style="float: none; margin-left: auto; display: block; margin-right: auto" alt="Circular image" src="http://storage2.timheuer.com/boratcircle.png" /></p>

<p>Now while this is great, using an ImageBrush doesn’t give you the automatic decode-to-render-size capability that was added in the framework in Windows 8.1.</p>

<blockquote>
  <p><strong>NOTE</strong>: This auto decode-to-render-size feature basically only decodes an Image to the render size even if the image is larger.  So if you had a 2000x2000px image but only displayed it in 100x100px then we would only decode the image to 100x100px size saving a lot of memory.  The standard Image element does this for you.</p>
</blockquote>

<p>For most apps that control your image sources, you probably are already saving images that are only at the size you are displaying them so it may be okay.  However for apps like social apps or where you don’t know where the source is coming from or your app is NOT resizing the image on upload, etc. then you will want to ensure you save memory by specifying the decode size for the ImageBrush’s source specifically.  This is easily done in markup using a slightly more verbose image source syntax.  Using the above example it would be modified to be:</p>

<pre class="brush: xml; toolbar: false; highlight: [5];">&lt;Ellipse Width="250" Height="250"&gt;
    &lt;Ellipse.Fill&gt;
        &lt;ImageBrush&gt;
            &lt;ImageBrush.ImageSource&gt;
                &lt;BitmapImage DecodePixelHeight="250" DecodePixelWidth="250" UriSource="ms-appx:///highfive.jpg" /&gt;
            &lt;/ImageBrush.ImageSource&gt;
        &lt;/ImageBrush&gt;
    &lt;/Ellipse.Fill&gt;
&lt;/Ellipse&gt;</pre>

<p>No real change other than telling the framework what the decode size should be in Line 5 using <a href="https://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.media.imaging.bitmapimage.decodepixelheight.aspx" target="_blank">DecodePixelHeight</a> and <a href="https://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.media.imaging.bitmapimage.decodepixelwidth.aspx" target="_blank">DecodePixelWidth</a>.  The rendering would be the same in my case.  This tip is very helpful to when you are most likely going to be displaying a smaller image than the source and not the other way around.  </p>

<p>So there you go.  Go crazy with your circular people representations!  Hope this helps.</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:1542a46b-a781-43c0-9ce0-a1bb9b8b7c12" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>
