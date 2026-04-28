---
title: "Make your Silverlight applications Speak to you with Microsoft Translator"
slug: "silverlight-translator-text-to-speech-api"
pubDate: 2010-03-22T10:12:26.000Z
lastModified: 2019-10-23T04:20:34.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "rest"
  - "locale"
  - "riaservices"
  - "localization"
  - "translator"
draft: false
---

<p>One of the announcements that happened during the <a href="http://live.visitmix.com">MIX10</a> conference was the <a href="http://www.microsofttranslator.com/mix2010/">availability of the V2 of the Microsoft Translator API</a>.  This is the engine that powers the translation behind <a href="http://www.bing.com/translate">http://www.bing.com/translate</a> and some other Bing-related properties as well.  A lot of research has gone into the engine from Microsoft Research and others.  Language translation isn’t an easy task especially taking into consideration cultural significance of words, etc.  I have heard that the most challenging in machine translation is to Asian languages.  I will admit to not speaking any of them, so I don’t know how well we are performing here – you’ll have to let that team know if they are doing well.</p>
<p>After reading the announcement and working on my translate plugin for the new <a href="http://platform.seesmic.com">Seesmic Desktop Platform</a>, I noticed that there was a Speak API.  After reading I saw this literally translates text to a WAV file for platback.  Pretty cool I thought.  I wanted to play around with this in <a href="http://silverlight.net">Silverlight</a> so created a simple application to do so:</p>
<p><img style="margin: 0px auto; display: block; float: none;" title="Microsoft Translator in Silverlight" alt="Microsoft Translator in Silverlight" src="http://storage.timheuer.com/translator-sample.jpg" /></p>
<p>The Speak translation isn’t available for all the Translator languages (currently 30 languages for text language translation) but does support seven (7) languages: English, German, Spanish, French, Italian, Portuguese, and Russian.  So how is Silverlight talking back to you?</p>
<p>The Translator API comes in 3 flavors: SOAP, HTTP and Ajax.  Now I could have used the SOAP version and used <em>Add Service Reference</em> but I felt for what I was doing this was overkill.  The SOAP API doesn’t return me back super-strongly typed objects, so I saw little value in doing that over the REST-based HTTP methods which I decided to use.  The code is relatively simple.  I first want to translate the text input into the selected language, then pass the <em>translated</em> text to the Speak API and play the results in a MediaElement.</p>
<p>First, we use the Translate method and a WebClient call to accomplish this:</p>
<div id="codeSnippetWrapper" class="csharpcode-wrapper">
<div id="codeSnippet" class="csharpcode">
<pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> TranslateTextToAudio(<span class="kwrd">object</span> sender, RoutedEventArgs e)</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="kwrd">if</span> (Languages.SelectedIndex &lt; 0)</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     {</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum5" class="lnum">   5:</span>         MessageBox.Show(<span class="str">"Please select a language first..."</span>);</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum6" class="lnum">   6:</span>         <span class="kwrd">return</span>;</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum7" class="lnum">   7:</span>     }</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum8" class="lnum">   8:</span>     WebClient client = <span class="kwrd">new</span> WebClient();</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum9" class="lnum">   9:</span>     client.OpenReadCompleted += ((s, args) =&gt;</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum10" class="lnum">  10:</span>         {</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum11" class="lnum">  11:</span>             <span class="kwrd">if</span> (args.Error == <span class="kwrd">null</span>)</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum12" class="lnum">  12:</span>             {</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum13" class="lnum">  13:</span>                 DataContractSerializer des = <span class="kwrd">new</span> DataContractSerializer(<span class="kwrd">typeof</span>(<span class="kwrd">string</span>));</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum14" class="lnum">  14:</span>                 <span class="kwrd">string</span> responseText = des.ReadObject(args.Result) <span class="kwrd">as</span> <span class="kwrd">string</span>;</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum15" class="lnum">  15:</span>                 SpeakIt(responseText);</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum16" class="lnum">  16:</span>             }</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum17" class="lnum">  17:</span>         });</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum18" class="lnum">  18:</span>     client.OpenReadAsync(<span class="kwrd">new</span> Uri(<span class="kwrd">string</span>.Format(TRANSLATE_URI, _appId, HttpUtility.UrlEncode(TextToTranslate.Text), Languages.SelectedValue.ToString(), _currentLang)));</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum19" class="lnum">  19:</span> }</pre>
<!--CRLF--></div>
</div>
<p>Notice the DataContractSerializer use here.  The HTTP API returns serialized objects, so you’ll want to use this method here to deserialize to make it easier.</p>
<p>After we have the translated text, we pass that to the Speak API (notice the call to SpeakIt above) which returns a Stream that is an audio/wav format.   We know that Silverlight’s MediaElement cannot directly play lossless WAV format.  But luckily there is a MediaStreamSource API that enables us to essentially write our own decoders for audio/video.  One of the Silverlight team members, Gilles, created a <a href="http://code.msdn.microsoft.com/wavmss">WAV MediaStreamSource</a> for us to use.  After having that and not worrying about decoding, I could create a new <em>WaveMediaStreamSource</em> with my result Stream and set that as the Source for the MediaElement – here is the resulting SpeakIt() method (TranslatedPlayback is the name of my MediaElement in the application):</p>
<div id="codeSnippetWrapper" class="csharpcode-wrapper">
<div id="codeSnippet" class="csharpcode">
<pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> SpeakIt(<span class="kwrd">string</span> responseText)</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     WebClient client = <span class="kwrd">new</span> WebClient();</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     client.OpenReadCompleted += ((s, args) =&gt;</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     {</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum6" class="lnum">   6:</span>         <span class="kwrd">if</span> (args.Error == <span class="kwrd">null</span>)</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum7" class="lnum">   7:</span>         {</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum8" class="lnum">   8:</span>             WaveMediaStreamSource mss = <span class="kwrd">new</span> WaveMediaStreamSource(args.Result);</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum9" class="lnum">   9:</span>             TranslatedPlayback.SetSource(mss);</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum10" class="lnum">  10:</span>         }</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum11" class="lnum">  11:</span>     });</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum12" class="lnum">  12:</span>     client.OpenReadAsync(<span class="kwrd">new</span> Uri(<span class="kwrd">string</span>.Format(SPEAK_URI, _appId, responseText, Languages.SelectedValue)));</pre>
<!--CRLF-->
<pre class="alteven"><span id="lnum13" class="lnum">  13:</span> }</pre>
<!--CRLF--></div>
</div>
<p>That’s it!  It’s pretty cool (bonus points to you in identifying the obvious pre-filled text being used in my sample).</p>
<p>I’ve almost completed my Seesmic plugin and using the Translator API has made it easier.  I’ve found that a simple wrapper to the HTTP-based methods is going to make things easier for people to use, so I’ve created a Translator Client for Silverlight that I’ll be releasing once I can complete the plugin (waiting on a few things).  This will make it easier for Silverlight developers to quickly consume the API for text and Speech translation.</p>
<p>The code (C#) for the above sample is here: <a href="http://storage.timheuer.com/MSTranslatorSilverlightSample.zip">MSTranslatorSilverlightSample.zip</a>.  You will need a Translator Application ID key to run it yourself (put it in the App.xaml resources).  If you just want to see it running really quick, you can view it here: <a href="http://timheuer.com/silverlight/translator-sample/">Speak Translator for Silverlight</a>.  You will need Silverlight 4 RC to run the sample.</p>
<blockquote>
<p>NOTE: The Translator API actually doesn’t need Silverlight 4, but I just created the app using that base.</p>
</blockquote>
<p>Hope this helps! </p>
<div style="padding: 0px; margin: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:44686c35-2691-414e-b911-53404365f102" class="wlWriterEditableSmartContent"></div>

