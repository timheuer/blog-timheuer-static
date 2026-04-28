---
title: "Using XNA libraries in your Silverlight Windows Phone 7 applications"
slug: "use-xna-framework-with-silverlight-on-windows-phone-7"
pubDate: 2010-04-09T14:10:04.000Z
lastModified: 2019-10-23T04:20:34.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "xna"
  - "wp7dev"
  - "wp7"
  - "windows phone"
  - "translator"
  - "windows phone 7"
draft: false
---

<p>I recently got an inquiry to <a href="http://timheuer.com/blog/archive/2010/03/22/silverlight-translator-text-to-speech-api.aspx">my Microsoft Translator sample</a> on if this would work with the <a href="http://www.silverlight.net">Silverlight</a> in the Windows Phone 7 SDK.  I hadn’t tried it before, so I created a sample Windows Phone 7 application and copied the code over.  I used a basic UI to mock up the similarities:</p>  <p><img style="margin: 0px auto; display: block; float: none" title="Translator phone sample screenshot" alt="Translator phone sample screenshot" src="http://storage.timheuer.com/wp7translator1.png" width="144" height="240" /></p>  <p>And then clicked the button.  The text translated fine, but no audio.  I didn’t get any warnings that the WaveMSS code sample I was using wouldn’t work.  Then I remembered about XNA.</p>  <blockquote>   <p>NOTE: I actually think this is a bug in PCM audio and MediaStreamSource and have been having a dialog with the team about it.</p> </blockquote>  <p>In Windows Phone 7 your Silverlight applications can use some XNA Game Framework APIs.  A big component of games is audio!  Enter SoundEffect.  I added a reference to Microsoft.Xna.Frameowkr and changed my OnSpeakCompleted from:</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">void</span> OnSpeakCompleted(<span class="kwrd">object</span> sender, TimHeuer.Silverlight.SpeakCompletedEventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     WaveMSS.WaveMediaStreamSource mss = <span class="kwrd">new</span> WaveMSS.WaveMediaStreamSource(e.AudioTranslation);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     PlayMe.SetSource(mss);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span> }</pre>
<!--CRLF--></div>
</div>

<p>to:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">void</span> OnSpeakCompleted(<span class="kwrd">object</span> sender, TimHeuer.Silverlight.SpeakCompletedEventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     SoundEffect se = SoundEffect.FromStream(e.AudioTranslation);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     se.Play();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span> }</pre>
<!--CRLF--></div>
</div>

<p>Notice it is still 2 lines of code :-).  I don’t need a MediaElement for the audio palyback because I can use the same libraries that XNA uses for audio (and in some instances this will be better for you for looping audio, etc.).</p>

<p>Very cool that Silverlight and XNA can share some libraries in a single application!
  </p><div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:b7e3fa8f-3439-42d8-b2ac-f9f9c2898e86" class="wlWriterEditableSmartContent"></div>

