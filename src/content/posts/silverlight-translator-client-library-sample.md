---
title: "Microsoft Translator client library for Silverlight"
slug: "silverlight-translator-client-library-sample"
pubDate: 2010-06-01T11:49:17.000Z
lastModified: 2019-10-23T04:20:35.000Z
categories:
  - "silverlight"
  - "bing"
  - "translator"
  - "translate"
  - "speech"
  - "tts text-to-speech"
draft: false
---

<p>A while back immediately after MIX10 I started messing with Microsoft Translator APIs for <a href="http://www.silverlight.net">Silverlight</a> applications.  I also got some people asking about Windows Phone 7 stuff and messed around with that a bit.  Here’s some post for reference:</p>  <ul>   <li><a href="http://timheuer.com/blog/archive/2010/03/22/silverlight-translator-text-to-speech-api.aspx">Make your Silverlight applications speak to you</a> </li>    <li><a href="http://timheuer.com/blog/archive/2010/04/09/use-xna-framework-with-silverlight-on-windows-phone-7.aspx">Using XNA libraries in Silverlight for Windows Phone 7</a> (with Translator as an example) </li> </ul>  <p>In talking with the Translator team following MIX (where they announced they were working on a Silverlight class library for the API.  It was good to interact with their team to understand their direction and provide some feedback on how they were approaching it.  In the meantime, with their direction, I had started working on a simple wrapper for myself while writing the <a href="http://timheuer.com/blog/articles/seesmic-desktop-plugins.aspx#translate">Translator for Seesmic</a> plugin I was writing.  I’ve received a few inquiries on Translator so I thought I’d post my library here for you to see/use.</p>  <blockquote>   <p>NOTE: This comes with a ‘works on my machine’ warranty – which means no warranty.  There are some things that should be done to make this a more proper async API (noted below).  You will also need your own Microsoft Translator application ID (API key) in order to use it.</p> </blockquote>  <p>The API is fairly simple and <a href="http://msdn.microsoft.com/en-us/library/ff512419.aspx">maps to some of the functions of the Translator HTTP-based API</a>.  The following methods are implemented:</p>  <ul>   <li>Detect </li>    <li>GetLanguagesForSpeak </li>    <li>GetLanguagesForTranslate </li>    <li>Speak </li>    <li>Translate </li> </ul>  <p>You’ll notice that not all the API endpoints are implemented.  Honestly I picked what I was using myself but also what I think would be most useful to application developers.  </p>  <p>Because this is a service, the wrapper implements the above functions as asynchronous methods, so you will see:</p>  <ul>   <li>DetectAsync </li>    <li>GetLanguagesForSpeakAsync </li>    <li>GetLanguagesForTranslateAsync </li>    <li>SpeakAsync </li>    <li>TranslateAsync </li> </ul>  <p>Clever naming, huh?  It’s very simple to use and here’s a snippet of a BASIC translation implementation:</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">using</span> System;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> <span class="kwrd">using</span> System.Windows;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span> <span class="kwrd">using</span> System.Windows.Controls;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span> <span class="kwrd">using</span> TimHeuer.Silverlight;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span> <span class="kwrd">namespace</span> SilverlightApplication147</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>     <span class="kwrd">public</span> <span class="kwrd">partial</span> <span class="kwrd">class</span> MainPage : UserControl</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>     {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>         TranslatorClient _translator;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>         <span class="kwrd">public</span> MainPage()</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span>         {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum14" class="lnum">  14:</span>             InitializeComponent();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum15" class="lnum">  15:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum16" class="lnum">  16:</span>             _translator = <span class="kwrd">new</span> TranslatorClient(<span class="str">"YOUR_APP_ID"</span>);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum17" class="lnum">  17:</span>             _translator.TranslateCompleted += <span class="kwrd">new</span> EventHandler&lt;TranslateCompletedEventArgs&gt;(OnTranslateCompleted);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum18" class="lnum">  18:</span>         }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum19" class="lnum">  19:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum20" class="lnum">  20:</span>         <span class="kwrd">void</span> OnTranslateCompleted(<span class="kwrd">object</span> sender, TranslateCompletedEventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum21" class="lnum">  21:</span>         {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum22" class="lnum">  22:</span>             Dispatcher.BeginInvoke(() =&gt;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum23" class="lnum">  23:</span>                 {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum24" class="lnum">  24:</span>                     MessageBox.Show(e.TranslatedText);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum25" class="lnum">  25:</span>                 });</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum26" class="lnum">  26:</span>         }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum27" class="lnum">  27:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum28" class="lnum">  28:</span>         <span class="kwrd">private</span> <span class="kwrd">void</span> TranslateButton_Click(<span class="kwrd">object</span> sender, RoutedEventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum29" class="lnum">  29:</span>         {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum30" class="lnum">  30:</span>             <span class="rem">// if you needed to detect the source language first you would run DetectAsync to get the Source Language</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum31" class="lnum">  31:</span>             <span class="rem">// below is an example of TranslateAsync("Du bist wie eine Blume", "de", "en")</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum32" class="lnum">  32:</span>             _translator.TranslateAsync(TextToTranslateTextBox.Text, SourceLanguageTextBox.Text, TargetLanguageTextBox.Text);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum33" class="lnum">  33:</span>         }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum34" class="lnum">  34:</span>     }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum35" class="lnum">  35:</span> }</pre>
<!--CRLF--></div>
</div>

<p>So that’s it.  What are the plans here?  We have been exploring shipping an official translator extension as a part of the <a href="http://silverlight.codeplex.com">Silverlight Toolkit</a> perhaps if folks find it useful.  As I mentioned there are a few things that should probably be changed in this library here, namely making the event arguments be AsyncEventArgs to better match what they are with the Silverlight networking stacks, etc.</p>

<p>I also was messing around with the InstallShield Limited Edition that comes with Visual Studio 2010 so I wrapped all these into an installer for easier deployment (it also includes the source) that you can get here: <a href="http://drop.io/fag9lih">TimHeuerTranslatorClientSetup.exe</a></p>

<p>Hope this helps and let me know if you have feedback! </p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:c743add1-e25b-4cbb-8bad-ed43db5c7923" class="wlWriterEditableSmartContent"></div>
