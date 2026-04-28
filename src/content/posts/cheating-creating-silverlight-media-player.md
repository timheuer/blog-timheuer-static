---
title: "cheating at creating a silverlight media player"
slug: "cheating-creating-silverlight-media-player"
pubDate: 2007-08-31T07:47:31.000Z
lastModified: 2019-10-23T04:20:09.000Z
categories:
  - "silverlight"
  - "expression"
  - "expression blend"
  - "xaml"
  - "expression media encoder"
  - "wmv"
  - "media"
  - "vc-1"
draft: false
---

<p>i just put up another podcast video of how to "cheat" at creating a media player for silverlight.  have you been looking at some of these media experiences with all their fancy buttons and dvd player-type overlays, etc. but didn't want to take the time to code your own?  well, you don't have to :-) (man that sounds like an infomercial)</p>
<p><a href="http://channel9.msdn.com/ShowPost.aspx?PostID=338690"><img style="MARGIN: 0px 10px 0px 0px" align="left" border="0" alt="" src="http://s3.amazonaws.com/timheuer-img/cheating-small.png" /></a>in this podcast i demonstrate using expression media encoder as a tool that will essentially generate stub code for you.  now keep in mind that expression media encoder itself generates some pretty kick arse templates that may perfectly suit you.  but perhaps you want a player that has more branding or a mix of certain elements, etc.  well, still use expression media encoder for this.  let it output the template and then just change the xaml!  </p>
<p>after you watch the podcast (subscribe links on the left panel of <a href="http://timheuer.com/blog/">my web site</a> if you are reading this in a reader), you'll hear me reference certain named elements for key function points of the player code that is generated.  i said i'd call them out here and that is what i'm doing :-).  these refer to the named elements in the xaml.  they could be canvas elements/groups or objects themselves like a rectangle.  as long as they are named specifically the code should work.  here's a list of the most popular that i've used and the heirarchy of any children objects they should have.  the names themselves are in bold, everything else is just description:</p>
<ul>
    <ul>
        <li><strong>VideoWindow</strong> - this is the key element to display the media and must be a MediaElement node.  you can add clipping masks, etc. (as i show in the video), but you must have at least one MediaElement with this name </li>
        <li><strong>PlayPauseButton</strong> - the grouped canvas of your play and pause buttons.  named this way, the logic is already there to handle certain functions if you don't provide additional animations/timelines (like hide/show).
        <ul>
            <li><strong>PlaySymbol</strong> - the symbol for the actual play button </li>
            <li><strong>PauseSymbol</strong> - the symbol for the actual pause button </li>
            <li><strong>PlayPauseButton_MouseEnter/MouseLeave/MouseDown</strong> - i'm only going to put this here once, but it applies to most of the other elements like StopButton and MuteButton, etc.  if you have a timeline named these, it will fire, if you don't some default actions will occur. </li>
        </ul>
        </li>
        <li><strong>StopButton</strong> - the symbol for the actual stop button </li>
        <li><strong>Timeline</strong> - for displaying the playing progress of the media
        <ul>
            <li><strong>TimeSliderDecoration</strong> - the element that shows the full progress </li>
            <li><strong>TimeSlider</strong> - the progress growing metere </li>
            <li><strong>TimeThumb</strong> - the arrow/object, etc. that shows the point in the progress and the user would drag to adjust the position </li>
        </ul>
        </li>
        <li><strong>VolumeSlider</strong> - the elements making up the volume function </li>
        <li><strong>VolumeThumb</strong> - the arrow/object that shows the position of the current volume and the user would drag to adjust </li>
        <li><strong>VolumeUpButton/VolumeDownButton</strong> - if you were to use buttons for volume instead of a slider </li>
        <li><strong>MuteButton</strong> - self explanatory </li>
        <li><strong>CurrentTimeText</strong> - displays the time progress of the media element </li>
        <li><strong>ChapterArea</strong> - the area that would display the markers in the media file (dvd-style playback) </li>
        <li><strong>FullScreenArea</strong> - the full screen experience root node </li>
    </ul>
</ul>
<p>there are, of course, more elements to mess with and i'd encourage you to look at one of the more advanced template outputs and start sniffing around to see what you find.  the cool thing is that you don't have to have all of them.  you'll notice in the podcast that i only put 3 elements on there and there are no errors.  the output code handles if an element is there or not for you.</p>
<p>i hope this helps get you started on creating great media experiences with silverlight and expression sooner!  if you want the sample player xaml that i used in the podcast, you can download that <a href="http://s3.amazonaws.com/timheuer-img/nicer-player.zip">here</a>.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:42c27042-fe63-4827-88f3-c74965b02c95" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
