---
title: "Silverlight and localizing string data"
slug: "silverlight-string-localization"
pubDate: 2009-08-26T10:09:46.000Z
lastModified: 2019-10-23T04:20:31.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "culture"
  - "locale"
  - "riaservices"
  - "localization"
  - "uiculture"
draft: false
---

<p>While I was at the <a href="http://silverlight.net"><strong>Silverlight</strong></a> Atlanta Firestarter event I had a chance to meet some great people.  One of them was <a href="http://sergeybarskiy.spaces.live.com/default.aspx">Sergey Barskiy</a>.  Sergey was doing a session on deployment and while in the speaker area we were chatting about overall feedback on Silverlight.  One of the things he mentioned was what he thought was a bug in <strong>Visual Studio Tools for Silverlight</strong>.  It was around RESX files and the modifier setting (Internal, Public, etc.).  More on that later.  Sergey was using RESX files for localization.  While investigating the bug for him, I realized how many people might not know how to do some simple string localization/binding in their Silverlight applications.  It’s relatively simple and I thought I’d outline the steps.  I must admit that I’ve never had to develop a full-fledged internationalized application before, and I applaud those who have and have tackled both the obvious of the language localization challenges as well as cultural and display challenges with various technologies.</p>
<h2>The Sample Application</h2>
<p>For this experiement we’ll keep it simple and we’re talking about String localization.  We are going to work with a Silverlight 3 application in simple form which will have a TextBlock and a Button control which will have their respective Text and Content settings.  Here’s the English-US (en-US) version of the app:</p>
<p><img src="http://s3.amazonaws.com:80/storage.timheuer.com/locexample1.png" alt="Sample application image" title="Sample application image" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>If we were like most applications we’d be done…but this post will try not to be so US-centric :-).</p>
<h2>Step 1: Adding default String resources</h2>
<p>As a best practice for String resource localization, in your Silverlight application structure, organize your resource files accordingly.  We’re going to use the RESX file approach and let the framework do most of the work for us.  To that regard in my application I have created a folder called <em>Resources</em> and will be placing my RESX files there.  I’ll first add the default set of data, adding a new RESX file named <em>Strings.resx</em>. </p>
<p>When you add this you’ll notice you get a Strings.resx and a designer (cs or vb) file.  By default the Resource Designer will open and we’ll add two values: <em>WelcomeMessage</em> and <em>ButtonMessage</em>.  Our surface looks like this:</p>
<p><img src="http://storage.timheuer.com/locexample2.png" alt="Visual Studio resource designer" title="Visual Studio resource designer" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>Notice the <em>Access Modifier</em> section in the designer.  We need to set this to Public in order to use it in binding we will do later, so set it now.  We save this and step one is done.  Let’s test it out and use it.</p>
<h2>Step 2: Binding our RESX files to our XAML</h2>
<p>Now that we have a Strings.resx file (which is marked as Embedded Resource by default) in our Resources folder, we can use it as a resource in our XAML.  We need to do a few things to enable this.  First, we need to add an XML namespace to our XAML page.  I’ve chosen <em>local</em> for mine, but choose whatever.  We will have this namespace point to our Resources namespace in our application.  Mine looks something like this:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;">
<div id="codeSnippet" style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> xmlns:local=<span style="color: rgb(0, 96, 128);">"clr-namespace:StringLocalization.Resources"</span></pre>
<!--CRLF--></div>
</div>
<p>Now I can use that assembly classes in my XAML.  I’ll add the Strings class to my UserControl’s Resources section giving it a key of <em>LocStrings</em> like this:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;">
<div id="codeSnippet" style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> &lt;UserControl.Resources&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span>     &lt;local:Strings x:Key=<span style="color: rgb(0, 96, 128);">"LocStrings"</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span> &lt;/UserControl.Resources&gt;</pre>
<!--CRLF--></div>
</div>
<p>And now I have a XAML resource I can bind to.  Let’s do that.</p>
<h2>Step 3: Binding to the resx file data</h2>
<p>My XAML has a TextBlock and a Button I want to bind to the string values.  Because I have a XAML resource this is simple and I just create a binding using the the XAML binding syntax to that resource.  here’s what my TextBlock and Button look like (relevant portions):</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;">
<div id="codeSnippet" style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> &lt;TextBlock Text=<span style="color: rgb(0, 96, 128);">"{Binding Source={StaticResource LocStrings}, Path=WelcomeMessage}"</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> &lt;Button Content=<span style="color: rgb(0, 96, 128);">"{Binding Source={StaticResource LocStrings}, Path=ButtonMessage}"</span> /&gt;</pre>
<!--CRLF--></div>
</div>
<p>Notice that I’m using a Path that points to the String name in the RESX file.  Let’s run the application now and we should see what we’re looking for right?</p>
<p>…</p>
<p>WRONG.  Here’s the bug that Sergey was talking about.  It turns out that there does seem to be a bug in Visual Studio with regard to the modifier, and more specifically the <em>PublicResXFileCodeGenerator</em> custom tool that is used to generate the code.  It turns everything in the resource to public <strong>except the constructor</strong>.  Not having the constructor public (it is still marked internal) is what is causing our problem.  </p>
<blockquote>
<p>NOTE: This is not a bug in Silverlight or in the Silverlight tools, but more widely in Visual Studio.  The same thing reproduces on any VS project type.  It’s been noted and is being tracked to address.  See this topic: <a t="" have="" to="" tweak="" the="" constructor.=""></a></p>
</blockquote>
<p>What we have to do as a workaround is to go into the Strings.designer.cs file manually and change the constructor from <em>internal</em> to <em>public</em>.  I will note that each time you open up the designer for that main resource file that it may get reset to internal, so remember that. </p>
<p>After changing to <em>public</em> you can run the application and get the desired output.  There is actually a way to still use the resources and keep the constructor internal, but it involves using another class you have to create and instantiate…more on that later.</p>
<h2>Step 4: Adding additional localized resources</h2>
<p>Now that we have our base working, we simply need to provide the localized resources for our application.  I’m choosing to localize in Spanish (es-es), French (fr-FR), German (de-DE) and Japanese (ja-JP). </p>
<blockquote>
<p>I solicited some help on <a href="http://twitter.com/timheuer">Twitter</a> to get some “human” translation to double-check my translated text with Windows Live Translator.  To my surprise, Windows Live Translator actually did a great job.  I think with short sentences it is fine, but longer conversational text may lose context. </p>
<p>Thanks to: <a href="http://twitter.com/kenazuma">Ken Azuma</a>, Othmane Rahmouni, <a href="http://twitter.com/talya">Talya</a>, <a href="http://twitter.com/ntmisa">Misael Ntirushwa</a>, Hannes Preishuber, and others who jumped in to offer help for my little sample.</p>
</blockquote>
<p>To do this we simply add more resource files into our project following a specific naming scheme.  Since we have <em>Strings.resx</em> when we add additional languages we’ll add them as <em>Strings.&lt;locale&gt;.resx</em>.  So adding German would be <em>Strings.de-DE.resx</em> and so forth.  It really is best to use the xx-xx locale settings versus just the two character (i.e., de) ones.  Note when you add these files to the project that your modifier section in the resource designer should say <em>No Code Generation</em> automatically.  If it doesn’t, choose that option.  We only need the code for our default language choice.  When I’m done my structure looks like this:</p>
<p><img src="http://storage.timheuer.com/locexample3.png" alt="Project structure with localized string resx files" title="Project structure with localized string resx files" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>Obviously the contents of the file contains the localized string information.  Note that the string parameter names still have to match.  So even though I’m localizing the contents of WelcomeMessage, in the German resource the parameter is WelcomeMessage and not Wilkommen or something like that.</p>
<p><strong>UPDATE: Forgot one critical step – oops.  You have to manually edit your **proj (csproj/vbproj) file for your Silverlight project to add the locales in the SupportedCultures node of the proj file.  This is a manual step (and sucks), but don’t forget it or nothing will work as you suspect.</strong></p>
<h2>Step 5: Testing it out.</h2>
<p>Because we used our declarative binding in Steps 2-3, we don’t have to change our code.  We should test it out to make sure it works though.  There are two good ways I have found to test this out.  First, the Silverlight plugin supports forcing a UICulture and we could do it that way.  Let’s test German.  In our plugin instantiation on our hosting page we’ll add these two parameters to the &lt;object&gt; tag (relevant portions):</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;">
<div id="codeSnippet" style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> &lt;<span style="color: rgb(0, 0, 255);">object</span> ...&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span>     ...</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span>     &lt;param name=<span style="color: rgb(0, 96, 128);">"culture"</span> <span style="color: rgb(0, 0, 255);">value</span>=<span style="color: rgb(0, 96, 128);">"de-de"</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>     &lt;param name=<span style="color: rgb(0, 96, 128);">"uiculture"</span> <span style="color: rgb(0, 0, 255);">value</span>=<span style="color: rgb(0, 96, 128);">"de-de"</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>     ...</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span> &lt;/<span style="color: rgb(0, 0, 255);">object</span>&gt;</pre>
<!--CRLF--></div>
</div>
<p>That tells the plugin to load with those cultures set.  You can change them without recompiling your application and the language will change.</p>
<p>A second option would be to actually change the display language of your Windows environment.  For some this may be a little frightening as your screen suddenly may change to a language you don’t understand natively.  I recommend if you go this route to keep a translation dictionary handy find your way back (you have to logoff/logon to change a display language)!</p>
<p>Either way when you run the application using either of these methods you should get what you expect.  Here’s my German output:</p>
<p><img src="http://storage.timheuer.com/locexample4.png" alt="German localized sample application" title="German localized sample application" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>Obviously it is easier to test using the &lt;param&gt; approach (changing display languages in Windows requires a logoff), but ultimately I recommend doing actual OS display language for verification.  If a user is on a language culture that you have not localized, it will use the default values provided in our initial Strings.resx file.</p>
<p>Another option for testing is that you can actually change the culture and UICulture values using the Thread namespace APIs in Silverlight.  Keep in mind though changing these values on the CurrentThread does *not* reload the default resource, so you’d have to do some additional code to get the resource to load using that new culture setting.</p>
<h2>Caveats and cultural differences</h2>
<p>One thing to note is that while your application may now have an easy ability to display localized string data with simple bindings, it may not always be appropriate.  Take for instance Japanese language translation (I’ll assume it is roughly translated correctly, but for the sake of this discussion this serves a purpose) of “Click here” for the button.  In English it fits fine in our lovely world of fixed width button sizes.  But look at the Japanese translation of the text:</p>
<p>ここをクリックしてください。</p>
<p>And here’s how it looks in the button:</p>
<p><img src="http://storage.timheuer.com/locexample5.png" alt="Japanese localized sample output" title="Japanese localized sample output" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>Notice that we don’t see all of the characters?!  These are things that you’ll have to understand when things seem simple enough.  Sometimes translated strings will be longer/shorter than your intended design.  Designing around a localized approach will have to consider these in advance.  In fact, for some languages you may have an alternate placement of controls even to accommodate the culture.</p>
<p>As I noted that I used machine translation for my sample here, but I do want to stress that I think respecting cultural differences is important in customer facing applications.  Using something like Windows Live Translator seems simple enough and might work in simple instances, but I would recommend hiring true localization resources/people to help you differentiate the subtle differences in languages.</p>
<h2>Public modifier workaround and dynamically setting the culture</h2>
<p>As I mentioned above there is a workaround to the internal/public modifier bug.  It is easy enough to change of course, but you may want to look at this approach as well…and in some implementations this may fit within your model better.  The idea is to provide your own class implementation access to the Strings resource.  Here’s an example of what my custom class implementation might look like:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;">
<div id="codeSnippet" style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">class</span> CustomResources : INotifyPropertyChanged</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span>     <span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">static</span> StringLocalization.Resources.Strings _strings = <span style="color: rgb(0, 0, 255);">new</span> StringLocalization.Resources.Strings();</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>     <span style="color: rgb(0, 0, 255);">public</span> StringLocalization.Resources.Strings LocalizedStrings</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>     {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span>         get { <span style="color: rgb(0, 0, 255);">return</span> _strings; }</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>         set { OnPropertyChanged(<span style="color: rgb(0, 96, 128);">"LocalizedStrings"</span>); }</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span>     }</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum9" style="color: rgb(96, 96, 96);">   9:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum10" style="color: rgb(96, 96, 96);">  10:</span>     <span style="color: rgb(204, 102, 51);">#region</span> INotifyPropertyChanged Members</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum11" style="color: rgb(96, 96, 96);">  11:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum12" style="color: rgb(96, 96, 96);">  12:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">event</span> PropertyChangedEventHandler PropertyChanged;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum13" style="color: rgb(96, 96, 96);">  13:</span>  </pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum14" style="color: rgb(96, 96, 96);">  14:</span>     <span style="color: rgb(0, 0, 255);">private</span> <span style="color: rgb(0, 0, 255);">void</span> OnPropertyChanged(<span style="color: rgb(0, 0, 255);">string</span> propertyName)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum15" style="color: rgb(96, 96, 96);">  15:</span>     {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum16" style="color: rgb(96, 96, 96);">  16:</span>         <span style="color: rgb(0, 0, 255);">if</span> (PropertyChanged != <span style="color: rgb(0, 0, 255);">null</span>)</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum17" style="color: rgb(96, 96, 96);">  17:</span>         {</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum18" style="color: rgb(96, 96, 96);">  18:</span>             PropertyChanged(<span style="color: rgb(0, 0, 255);">this</span>, <span style="color: rgb(0, 0, 255);">new</span> PropertyChangedEventArgs(propertyName));</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum19" style="color: rgb(96, 96, 96);">  19:</span>         }</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum20" style="color: rgb(96, 96, 96);">  20:</span>     }</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum21" style="color: rgb(96, 96, 96);">  21:</span>     <span style="color: rgb(204, 102, 51);">#endregion</span></pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum22" style="color: rgb(96, 96, 96);">  22:</span> }</pre>
<!--CRLF--></div>
</div>
<p>And then my resource section would look like this:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;">
<div id="codeSnippet" style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> &lt;UserControl.Resources&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span>     &lt;localCustom:CustomResources x:Key=<span style="color: rgb(0, 96, 128);">"CustomLocStrings"</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span> &lt;/UserControl.Resources&gt;</pre>
<!--CRLF--></div>
</div>
<p>And my binding would look like:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;">
<div id="codeSnippet" style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> &lt;TextBlock Text=<span style="color: rgb(0, 96, 128);">"{Binding Source={StaticResource CustomLocStrings}, Path=LocalizedStrings.WelcomeMessage}"</span> /&gt;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> &lt;Button Content=<span style="color: rgb(0, 96, 128);">"{Binding Source={StaticResource CustomLocStrings}, Path=LocalizedStrings.ButtonMessage}"</span> /&gt;</pre>
<!--CRLF--></div>
</div>
<p>Now that I have this in place like this I get around the internal modifier issue because I’m actually binding to an instance of my own class (which has a static instance to the Strings resource class).  Using this method I could dynamically change the culture on the fly as well by resetting the culture settings in the thread and resetting the resource.</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; text-align: left; padding: 4px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 20px 0px 10px; width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; overflow: auto; cursor: text;">
<div id="codeSnippet" style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;">
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> ComboBoxItem item = ChangeLog.SelectedItem <span style="color: rgb(0, 0, 255);">as</span> ComboBoxItem;</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> Thread.CurrentThread.CurrentCulture = <span style="color: rgb(0, 0, 255);">new</span> System.Globalization.CultureInfo(item.Content.ToString());</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span> Thread.CurrentThread.CurrentUICulture = <span style="color: rgb(0, 0, 255);">new</span> System.Globalization.CultureInfo(item.Content.ToString());</pre>
<!--CRLF-->
<pre style="border-style: none; text-align: left; padding: 0px; line-height: 12pt; background-color: rgb(244, 244, 244); margin: 0em; width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt; overflow: visible;"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span> ((CustomResources)<span style="color: rgb(0, 0, 255);">this</span>.Resources[<span style="color: rgb(0, 96, 128);">"CustomLocStrings"</span>]).LocalizedStrings = <span style="color: rgb(0, 0, 255);">new</span> StringLocalization.Resources.Strings();</pre>
<!--CRLF--></div>
</div>
<p>A bit of a workaround for most scenarios I think.  I think probably remembering to change the modifier may work best for most cases, but this custom instance class might actually fit better into some model implementations.</p>
<h2>Summary</h2>
<p>Hopefully you can see that for simple string resources the technical implementation is fairly simple.  The real challenge is to you, the developer, to ensure the cultural integrity of the message is being displayed appropriately.  Localization is not an overall easy task and I’m simplifying it to simple strings here.  As I stated above, I applaud those who have successfully implemented fully localized applications.  It can be as simple as a button label or as complex as alternate screen layouts for different cultures!</p>
<p>You can download the code for this post here: <a href="http://storage.timheuer.com/StringLocalization.zip">StringLocalization.zip</a></p>
<p>Hope this helps!</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:cfd2b470-c2d7-4564-8def-d15e7f3cb1e7" style="padding: 0px; margin: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
