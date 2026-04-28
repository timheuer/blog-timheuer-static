---
title: "Silverlight FloatableWindow update: start position and resizable"
slug: "silverlight-floatablewindow-updated-with-resizing-capabilities"
pubDate: 2009-07-08T11:47:32.000Z
lastModified: 2019-10-23T04:20:30.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "silverlight toolkit"
  - "toolkit"
  - "karl shifflet"
  - "childwindow"
  - "floatablewindow"
  - "modal"
  - "mdi"
  - "glimpse"
draft: false
---

<p><strong>UPDATE: FloatableWindow is now on CodePlex for easier community contributions and management of latest source and builds.  <a href="http://floatablewindow.codeplex.com">FloatableWindow CodePlex Project</a>. If you like this idea <a href="http://silverlight.codeplex.com/WorkItem/View.aspx?WorkItemId=3668">VOTE FOR IT in the Silverlight Toolkit</a>!</strong> </p>
<p>A while back I wrote a post where I refactored the <a href="http://silverlight.net/"><strong>Silverlight</strong></a><strong> </strong>ChildWindow to create a non-modal window and I called it <a href="http://timheuer.com/blog/archive/2009/05/10/silverlight-childwindow-non-modal-refactor.aspx"><strong>FloatableWindow</strong></a> (you can see why I’m not a good marketer…hey I could have called it Microsoft Silverlight ChildWindow Refactored Edition Express).  A few folks found it useful, for which I’m appreciative of the comments.</p>
<p>My buddy <a href="http://karlshifflett.wordpress.com/"><strong>Karl Shifflett</strong></a> decided to use it in <strong><a href="http://karlshifflett.wordpress.com/2009/06/08/glimpse-for-silverlight-viewing-exceptions-and-binding-errors/">Glimpse</a></strong> as the diagnostic window – thanks Karl!  Karl even added some code to it to basically provide a start position (HorizontalOffset and VerticalOffset).  Another request Karl had was to add resizing capabilities to the window.</p>
<p>I’m pleased to say that I added both of these features to the source.  I modified Karl’s offset properties a bit to not only include them in the Show() override, but also as public properties that would be used if available.  For resizing, I added a ResizeMode property which matches the System.Window.ResizeMode enumeration.  I chose to use that enumeration for some consistency with WPF APIs, but frankly it really only supports CanResize and NoResize with the default being CanResize.  You can see an example of the resizing capabilities here in this animation:</p>
<p><img alt="" style="display: block; float: none; margin-left: auto; margin-right: auto;" src="http://s3.amazonaws.com:80/storage.timheuer.com/FloatableWindowResize2.gif" /></p>
<p>As you can see (sorry for the horrible animated image but just wanted to make it simple), the resizing handle will appear in the lower right corner of the window.</p>
<p><strong>UPDATE: Based on Laurent/yaip’s feedback I reverted back to my original design, here’s the mouse out (normal) and mouse over states for the handle:</strong></p>
<p><img alt="" src="http://s3.amazonaws.com:80/storage.timheuer.com/float-mouseout.png" /> <img alt="" src="http://s3.amazonaws.com:80/storage.timheuer.com/float-mouseover.png" /></p>
<p> <strike> I chose to make it invisible unless someone moves their mouse into that position.  <em>Is that the wrong UX do you think?</em>  I know it isn’t entirely consistent with something like WinForms, but I wanted to be a little different.</strike>  </p>
<p>Additionally I wanted to use the SizeNWSE Cursor as a normal WPF/WinForm window would use, but unfortunately that’s not a valid Cursor for Silverlight right now.</p>
<p>I did try to make the resizing adorner a template part so you could make it something else (right now it is just a path).  I haven’t really tried messing with it that much though.</p>
<p>I think my math might be a bit off in some scenarios and I’m still frustrated with the Popup and ZIndex issue in Silverlight, but I know there is an open issue for Silverlight to look at this so I’m trying to stay calm about it.  Anyhow, some subtle adds to make it hopefully just a bit more useful for anyone who cares (or cares to learn from it).</p>
<p>You can download the source code here: <a href="http://s3.amazonaws.com:80/storage.timheuer.com/FloatableWindow_1.3.zip">FloatableWindow_1.3.zip</a></p>
<p>Hope this helps and I appreciate any comments regarding the update or if you see issues in your scenarios.  </p>
<div style="margin: 0px; padding: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:a03f88b6-b2d3-48f3-b881-5d7708ecc848" class="wlWriterEditableSmartContent"></div>

