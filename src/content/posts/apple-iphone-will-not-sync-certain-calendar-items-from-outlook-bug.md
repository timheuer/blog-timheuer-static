---
title: "iphone and itunes only sync a certain type of appointment"
slug: "apple-iphone-will-not-sync-certain-calendar-items-from-outlook-bug"
pubDate: 2007-10-31T21:31:39.000Z
lastModified: 2019-10-23T04:20:11.000Z
categories:
  - "itunes"
  - "apple"
  - "vista"
  - "iphone"
  - "outlook"
  - "itunes sync"
  - "iphone sync"
  - "iphone sync problems"
  - "apple support"
draft: false
---

<p>i'm very frustrated now.  the title says it all.  let me explain my scenario, tell you how i found out the problem and give you the suggested workaround from apple.</p>
<p><strong><u>the setup</u></strong></p>
<p>i have a few phones laying around, and being the gadget geek i am, i do have an iphone that i've been using lately.  my setup consists of syncing my iphone to my pc laptop for contacts/calendering and to my macbook for music/photos/movies/podcasts.  it is a simple setup really, and allows me to keep my work machine for work (i don't have music or anything on my work machine) and my home machine attached to my media storage libraries, etc.  </p>
<p>everything was running smoothly even though it is quite annoying to cable sync -- i wish over-the-air was possible.</p>
<p><strong><u>my situation</u></strong></p>
<p>i missed an appointment the other day.  i was on the road and didn't get an alert.  it wasn't a terribly important appointment (meeting a friend for lunch), but still i was embarrassed.  my memory is not that of an elephant and i rely on technology to keep my sane.  when i returned to my laptop i noticed that my appointment <strong>was</strong> on my calendar, but it wasn't synced to my phone.  weird.  i began investigating.</p>
<p>i did a few tests.  i restored the phone to factory default.  i did a one-way force sync on calendars.  i synced under a new profile.  i re-installed itunes.  i did everything the troubleshooting steps said to do, which by the way included an arrogant statement of basically <a href="http://docs.info.apple.com/article.html?artnum=305845">asking me to uninstall any other add-on</a> that i might have and that the itunes helper should be the only add-on enabledto work.  alas, a few appointments were still not syncing.  and then i looked closer and noticed a trend.</p>
<p><em>the appointments that were not syncing were meeting requests sent from other people.</em></p>
<p>i first thought 'holy crap, no meeting requests from other people at all are being synced' but that was not the case.  i could isolate it to meeting requests from other people but it was so sporadic that it was driving me insane.  so i began to research as best i can and then i resorted to calling support...something i did not want to do, but even us techies must admit we need help...and i exhausted all my knowledge.</p>
<blockquote>
<p>i called support and was told the wait time was 5 minutes.  after a few minutes i was disconnected.  argh.  immediately my phone rang though and it was apple support apologizing for the disconnect and wanting to continue the case.  very good customer service!</p>
</blockquote>
<p>i explained the situation to the agent and he began to search.  he pointed me to a <a href="http://docs.info.apple.com/article.html?artnum=306666">knowledge base article explaining the problem</a> and asked me to read it and if i'd follow the steps while he held on.  after browsing it i immediately saw this was not going to end well for me.</p>
<p><strong><u>the problem (confirmed)</u></strong></p>
<p>turns out that itunes/iphone will only sync calendar items that are explicitly of a certain message class (IPM.Appointment).</p>
<blockquote>
<p>a message class is basically a template.  there are defaults and then developers who create add-ons can inherit from those templates and provide added functionality.</p>
</blockquote>
<p>after following the steps i could see that the two appointments that i was testing with indeed were of type "IPM.Appointment.Location" and that i immediately realized my issue.  </p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/isyncprob1.png" /></p>
<p>the agent explained that i'd have to manually alter the message class type to get them to sync.  </p>
<p>what?!</p>
<p>he further explained that this was a problem in outlook and i should contact microsoft.  um yeah, i really don't think it is a problem with outlook.  the template is the same.  i then discovered that what is happening here had nothing to do with MY add-ins, but rather the add-ins installed on the meeting organizer.  the ".Location" is indicative that someone has installed the Live Maps add-in for outlook.  it adds value to the appointment template.  but what is happening for me is that when THAT PERSON sends me a meeting request, it uses their template.  i as the end user don't see that of course (unless i follow the proposed apple steps) and thus i'm left baffled.  since i cannot control what someone sending me has on their computer, i, the apple end user am screwed.</p>
<p>i was then pointed to a <a href="http://support.microsoft.com/kb/201087">microsoft knowledge base article explaining how to alter the message class</a>.  okay, so let me get this straight...you want me to change my view in outlook to identify these items, then create a VBScript application to change them?  or better yet, <a href="http://support.microsoft.com/kb/201089/EN-US/">USE A WORD DOC TO CHANGE OUTLOOK ITEMS</a> (shame on microsoft for this one, yes that is actually the recommendation and provided template).  clearly none of this is passing the <a href="http://timheuer.com/blog/articles/MotherInLawFactor.aspx">mother-in-law test</a>.  i'm tech savvy and understand all this, but let us put this into layman situations.  </p>
<p>see jane.  see jane have an appointment.  see it on jane's calendar.  see jane sync.  no appointment.  see jane verify appointment exists on her calendar.  see jane confused why it is not syncing and no errors or warnings presented.</p>
<p>see dick.  see dick ignore that an item is on a calendar and not alert the user that there might be items that didn't sync because their developers are too lazy to figure out it is a base template and they can still get the information.  <strong>apple, don't be a dick</strong>.</p>
<p>so my workflow now suggested by apple went from: plug in iphone and sync to plug in iphone; sync; scan calendar to see what didn't sync; see items not syncing and verify their message class; change message class using a word doc; re-sync.  holy flippin poo man.  this is ridiculous.  seriously.  people write bad software (microsoft is not immune to this either), but when you see a problem and hear complaints, rectify it please.</p>
<p><strong><u>the solution</u></strong></p>
<p>sadly, the process in the word doc actually works well.  i just couldn't see myself using a word doc to do this all the time.  i took a <a href="http://www.hanselman.com/blog/HowToEasilyDisableReplyToAllAndForwardInOutlook.aspx">cue from scott hanselman</a> and took the vba code in the word doc and just imported it into an overall outlook macro.  here's what i did.</p>
<p>first:  download the <a href="http://support.microsoft.com/kb/201089/EN-US/">word doc</a> -- as lame as that implementation is, the code is already there for you with a good analyze tool as well.</p>
<p>second:  open the doc and get to the visual basic editor (developer tab...if you don't see this you'll have to change your office settings to show the developer tab).  in the editor expand the forms section and choose export to file:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/isyncprob2.png" /></p>
<p>third:  open outlook and go to the tools menu, then choose macros.  create a macro (type a name and click create):</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/isyncprob3.png" /></p>
<p>forth:  right click on the project and choose import file...point to the form you exported in step 2 above.  it should import no problems (or at least 'worked on my machine'):</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/isyncprob4.png" /></p>
<p>fifth:  in the subroutine for the macro add this code (this assumes you kept the same form name):</p>
<pre class="csharpcode">frmMessageClass.Show</pre>
<p>i implemented the rest by customizing my toolbar and pointing to the macro, so now i have a button on my toolbar that i can run:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/isyncprob5.png" /></p>
<p>and when i run it i get the functionality i need:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/isyncprob6.png" /></p>
<p>note in the picture above there is an 'analyze' button -- i highly recommend you use this first if you are having this problem.  the result of analyze will show you what is in the dialog to the right of it (i already cleaned mine up so it only shows the good stuff) and if you had any non IPM.Appointment items, they would show here...then you could clean them up.  the screenshot above shows the setting you would want (make sure it says "IPM.Appointment" and not the default of this tool "IPM.Appointment." [note trailing dot] -- i fixed this in my macro code after import and you could too).</p>
<p>when you run the tool it will change things appropriately and you can resync.  if you use this tool you will not need to change your views, etc. as recommended by the apple article.  so if you are running into this problem, make your voice heard.  <a href="http://discussions.apple.com/message.jspa?messageID=5711919#5711919">add your comments to this thread</a>, vote this thread useful and see if we can get support people to listen.  you can also submit a bug report (as i did) to the <a href="http://www.apple.com/feedback/iphone.html">iphone feedback area</a>.</p>
<p>i'm sure there will be some that argue this isn't a bug.  i'll vehemently disagree...as those arguing that will be geeks that understand the technical situation.  step back and put yourself in an end user shoe's -- you see it on your calendar and it ain't syncing -- and no errors.  i think even the tech would admit that hey, even if it is by design, you should alert the user to what didn't get synced and why.  the solution should be fairly simple.  instead of:</p>
<pre class="csharpcode"><span class="kwrd">if</span> (messageClass == <span class="str">"IPM.Appointment"</span>)</pre>
<p>do</p>
<pre class="csharpcode"><span class="kwrd">if</span> (messageClass.contains(<span class="str">"IPM.Appointment"</span>) {
  <span class="kwrd">try</span> {
    <span class="rem">// sync and ensure elements are there</span>
  }
  <span class="kwrd">catch</span> {
    <span class="rem">// log to file to alert user after done</span>
  }
}</pre>
<p>c'mon apple, fix this.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:fac449d5-f469-4a71-b44b-80429a153541" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
