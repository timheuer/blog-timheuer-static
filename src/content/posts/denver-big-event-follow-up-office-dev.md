---
title: "denver big event follow-up"
slug: "denver-big-event-follow-up-office-dev"
pubDate: 2008-02-01T23:07:48.000Z
lastModified: 2019-10-23T04:20:15.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "orcas"
  - "vs2008"
  - "office"
  - "xml"
  - "vsto"
  - "vb9"
  - "ribbon"
  - "ribbonxml"
  - "task pane"
  - "action pane"
draft: false
---

<p>thanks to all who came out to the denver <strike>devdays</strike> big event this week.  this was the first time i've traveled in a while since various family ailments and situations.  i had a <a href="http://timheuer.com/blog/archive/2008/02/01/stay-classy-denver.aspx">good few days</a> in denver with some good peeps.  thanks to beth massi for joining our developer crowd in denver.  she was awesome and had a crowd wherever she was.</p>
<p>i attempted to do justice to office development in one of the sessions.  one of the challenges on that topic is that 'office' now encompasses a lot of things...here's my known short list:</p>
<ul>
    <ul>
        <li>word, excel, access, outlook, onenote, infopath, powerpoint </li>
        <li>smart tags </li>
        <li>sharepoint </li>
        <li>communicator </li>
        <li>excel server </li>
        <li>workflow </li>
        <li>groove</li>
    </ul>
</ul>
<p>so when you have an hour for a developer session, which do you pick.  i chose to pick the office client applications and demonstrate how visual studio 2008 enables writing office client applications easier than ever.  i chose this because doing office client development in the past (even with 2005) wasn't really a no-brainer.  there were still a lot of configurations as well as still some things you couldn't do.  with office 2007 and vs2008, it is a no-brainer now.  vs2008 (professional+) now comes with the office tools built-in...no more needing to download a separate client (or pay for a separate tool).</p>
<p>in my session i attempted to cover four key areas (only three of which we got to).  i wanted to demonstrate the UI customization features, outlook form regions, word content controls and task/action pane development.  the slides for my presentation are at the end of this post (PPT 2007 and PDF) and as promised there is an appendix in there with some information we didn't get to.  the two most important links in the slides are the ones to the <a href="http://tinyurl.com/24zd8u">Office MsoId sheet</a> and the <a href="http://tinyurl.com/29dljb">OfficeImageId worksheet</a> (which you need the developer options to be enabled in Excel to see the gallery options).  get these files.  download.  save.  you'll need them.  and when you can't find them you'll need a mt. dew (or scotch or whatever your calming choice is).  don't ask me why the MsoId's are not enabled in the designers of the office components...i've asked and don't know.</p>
<p>the first thing we covered was the office ui customization.  vs2008 provides a new visual designer for the ribbon.  you can still do the <strong>RibbonXML</strong> if <strike>you're insane</strike> you want to.  as we demonstrated, almost everything can be accomplished in the ribbon designer.  intercepting commands (such as FileSave) is something you'd need to much with the RibbonXML for and the designer provides an 'export to ribbon xml' feature so you can do most of it visually.  vs2008 provides a great design-time experience as it provides <strong>a ribbon</strong> as the design-time experience.  most everything after that is choosing which tab (custom or built-in using one of the idMso values from the worksheet), and adding controls.</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/officedev3.png" /></p>
<p>this capability enables a rapid development timeline of creating customized ui features that are familiar to your users and integrate with your own application.  i demonstrated my flickr add-in which i install on the TabInsert area of office applications:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/officedev4.png" /></p>
<p>in outlook development, vs2008 has made this easier now.  we can now extend the default outlook message class UI implementations (i.e., IPM.Contact, IPM.Appointment, etc.) through designers in visual studio.  the tool enables us to choose how we want our customizations to be as well (replacements, adjoining, etc.).  the image below is the adjoining one we created with integrating virtual earth into the contact form to pinpoint in the contact form the address of the selected contact:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/officedev2b.png" /></p>
<p>when writing outlook form regions (and as we saw in all other areas as well), the development isn't 'office-ish' at all.  once you've decided where/how the form region is going to interact, now you are just writing managed code.  you can integrate with wcf services, use linq, whatever...it is the same .net framework you know and love.  the office api's are now exposed to you to interact with as well.  as an example, anything in the contact item is easily and readily accessible to the developer to use and/or alter.  the same goes for word, excel, etc.</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/officedev5.png" /></p>
<p>the last area was the task/action panes.  to clarify the terms:</p>
<ul>
    <ul>
        <li><strong>task pane</strong>: an implementation of a pane that is application-wide -- every document will be able to use the pane </li>
        <li><strong>actions pane</strong>: document-specific panes that are a part of a document/template but not installed as add-in to the global</li>
    </ul>
</ul>
<p>the distinction between these two is pretty much at that level above.  there are some subtle differences, but for the most part that is the major difference you need to know.  the panes are implemented as user controls for your app/doc add-in now.  so as a developer you now have a <strong>user control</strong> surface where you can add controls, interact with the document to get values, etc.  to add your custom pane you would write code like this (using excel as an example and a task pane):</p>
<pre class="code"><span style="COLOR: blue">private void </span>ThisAddIn_Startup(<span style="COLOR: blue">object </span>sender, System.<span style="COLOR: #2b91af">EventArgs </span>e)
{
      <span style="COLOR: #2b91af">CustomTaskPane </span>ctp = <span style="COLOR: blue">this</span>.CustomTaskPanes.Add(<span style="COLOR: blue">new </span><span style="COLOR: #2b91af">UserControl1</span>(), <span style="COLOR: #a31515">"Pane Title"</span>);
      ctp.Visible = <span style="COLOR: blue">true</span>;
      ctp.Width = 250;
}</pre>
<a href="http://11011.net/software/vspaste"></a><a href="http://11011.net/software/vspaste"></a>
<p>the UserControl1 would be whatever your user control representing the task pane you want to display.  remember, that each add-in has that "ThisAddIn" stub generated for you.  there can be multiple task panes for an app/document.  so if you need more you can go nuts.  but i'd be sure you take into account the user experience and ensure that you aren't crowding the main focus of the functionality (the document) for the user.  panes are dockable through the DockPosition property.  if i wanted my pane to be docked on the bottom i could use:</p>
<pre class="code">ctp.DockPosition = Microsoft.Office.Core.<span style="COLOR: #2b91af">MsoCTPDockPosition</span>.msoCTPDockPositionBottom;</pre>
<p>but one thing to keep in mind is other properties.  for example, if i added the line above to my initial code and had the width property, i'd get an exception.  i'm trying to set a width when a bottom-docked item fills the user's width -- no can do.  of course i should probably implement better checking and simply handle that scenario.</p>
<p>the action panes are no different (other than how they are added is via a different class instead of CustomTaskPane) and simply are scoped to the document.  both are implemented as user controls and you can put windows controls on there and interact in code however you want.  in fact we demonstrated how we could implement XAML into a task pane.  here's a screen shot of the task pane with a XAML rectangle (which animates, but hey, it's a screenshot) and an embedded media element of a video.  you could think of documents that might be handbooks/trainings and include video with it so as the reader (or form-filler-outer) is looking at the document they might get live help via video:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/officedev6.png" /></p>
<p>i didn't get to the word content controls in my session, apologies.  we also didn't talk about <strong>sharepoint</strong> development, etc.  i think you could spend a whole time on that.  you tell me, what concerns you about sharepoint development?</p>
<p>i mentioned a few developer tips as well that i'll emit here:</p>
<ul>
    <ul>
        <li>remember 'Globals' </li>
        <li>create a stub mail profile (control panel -- Mail) so when writing outlook applications you aren't constantly trying to connect with a real mail system. </li>
        <li>click the 'office circle' and go to application options, add-ins, manage com add-ins to remove/clean up your developer litter</li>
    </ul>
</ul>
<p>here are the slide decks: <a href="http://s3.amazonaws.com/timheuer-img/office-dev-denver.pptx">PPT 2007</a> and <a href="http://s3.amazonaws.com/timheuer-img/office-dev-denver.pdf">PDF</a></p>
<p>i hope that those who attended learned at least one thing new.  some of my demos weren't cooperating despite me staying up until 3am doing them three times.  such is life.  thanks again to those who came.  be sure to check out <a href="http://blogs.msdn.com/bethmassi/archive/2008/02/01/what-s-new-in-visual-basic-9.aspx">beth's post</a> as she used VB XML literals to leverage Office Open XML to write a mail merge in XML code which generate word documents...it was pretty slick.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:6acbe522-c865-45b2-8213-ae2570c70c59" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
