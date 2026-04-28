---
title: "TabStudio add-in for Visual Studio"
slug: "tabs-studio-visual-studio-add-in-xaml-styling"
pubDate: 2009-08-06T15:27:52.000Z
lastModified: 2019-10-23T04:20:30.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "visual studio"
  - "tabs studio"
draft: false
---

<p>I came across this add-in for Visual Studio the other day that is subtle but added some productivity features to Visual Studio for me.  It’s called <a href="http://www.tabsstudio.com/"><strong>Tabs Studio</strong></a>.</p>  <blockquote>   <p>NOTE: I’m not getting a complimentary license for this add-in and have already purchased my own license with my own money.  This is an unsolicited opinion.</p> </blockquote>  <p>For me Tabs Studio does two things: organize my open content better and enables me to more quickly close/manage the open tabs.  Take a look at the before after of the same content open in VS:</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Visual Studio 2008 tabs normal" alt="Visual Studio 2008 tabs normal" src="http://s3.amazonaws.com:80/storage.timheuer.com/tabstudio2.png" /></p>  <p>In the before I have all the tabs open and can only close them one at a time (i.e., can’t selectively close a tab without first activating it).  Additionally, It is shown in order of opening.  I may have MainPage.xaml somewhere along the project, but not right next to the MainPage.xaml.cs file that I also need.  On a recent project I had about 15 files open at once and hunting to find the related ones was a nuisance when you needed to be fast.  Now look at the after:</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Visual Studio 2008 tabs with Tabs Studio" alt="Visual Studio 2008 tabs with Tabs Studio" src="http://s3.amazonaws.com:80/storage.timheuer.com/tabstudio1.png" /></p>  <p>Same amount of tabs open, but the “related” ones are automatically grouped for me, and the bold shows which one is open.  Additionally I can selectively close the code file without first activating the tab (each tab in Tabs Studio has a close button like Firefox tabs implementation).  This is great.</p>  <p>What’s the best part?  It’s all XAML!  The Tabs Studio is a WPF control that you can customize to your liking by putting your own styles in the settings pane using BasedOn styling:</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Tabs Studio Settings dialog" alt="Tabs Studio Settings dialog" src="http://s3.amazonaws.com:80/storage.timheuer.com/tabstudio3.png" /></p>  <p>Very cool  So far this little add-in is helping me just a tad more productive and it stays out of my way!</p>  <div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:113b5510-900b-4f06-949d-f8a8806e28e5" class="wlWriterEditableSmartContent"></div>
