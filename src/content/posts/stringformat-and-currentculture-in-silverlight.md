---
title: "StringFormat and CurrentCulture in Silverlight"
slug: "stringformat-and-currentculture-in-silverlight"
pubDate: 2010-08-11T09:44:19.000Z
lastModified: 2019-10-23T04:20:36.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "ria"
  - "localization"
  - "stringformat"
  - "currentculture"
draft: false
---

<p>I recently got a note about a nagging issue in using StringFormat in XAML binding expressions and how it doesn’t honor the current user’s culture settings.  This is true that there is an issue in that it doesn’t in WPF or <a href="http://www.silverlight.net">Silverlight</a>.  If you don’t know what I’m talking about, Silverlight introduced the ability to use StringFormat in data binding expressions (WPF has had this since 3.5 SP1) so you could do some formatting in-line in your binding.  Like this:</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="{Binding Path=CurrentDate, StringFormat=Current Timestamp is: \{0:G\}}"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>This would result in text that would be formatted directly using your string Formatter without the need for code-behind or any generic ValueConverter.  This is a very helpful feature for formatting UI values as well as in some cases replacing ValueConverters for simple tasks.</p>

<p>The problem is that StringFormat isn’t honoring the user’s culture settings.  Take for example this complete XAML:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">x:Name</span><span class="kwrd">="FooContainer"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="CultureInfo"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="UICultureInfo"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="{Binding Path=CurrentDate, StringFormat=Current Timestamp is: \{0:G\}}"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">x:Name</span><span class="kwrd">="CostField"</span> <span class="attr">Text</span><span class="kwrd">="{Binding Path=Cost, StringFormat=Cost is: \{0:c\}}"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>     <span class="kwrd">&lt;</span><span class="html">toolkit:GlobalCalendar</span>  <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span> <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>This is being bound to a simple object that exposes two properties for the purposes of demonstration: CurrentDate (DateTime) and Cost (double).  Using my standard US-English settings and regional preferences the output would be:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="StringFormat with default culture" alt="StringFormat with default culture" src="http://storage2.timheuer.com/stringformat-culture1.png" /></p>

<p>Now, let me tell my Silverlight app that I have a different culture information.  I can do this without having to force a language pack installation of sorts and completely change my machine.  Adding the culture/uiculture params to the &lt;object&gt; tag does the trick.  I’ll change it to “de-de” for German.  Here is the new output:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="StringFormat with explicit culture" alt="StringFormat with explicit culture" src="http://storage2.timheuer.com/stringformat-culture2.png" /></p>

<p>What?!  Even thought the settings recognize a different culture, StringFormat is not doing what I expect.  I would have expected a different date display for German settings (d.m.yyyy) and a different currency display instead of dollars.</p>

<p>Unfortunately this is an issue in StringFormat right now, but there is a simple workaround that if you are creating a localized app you can add to your code that shouldn’t affect your default language settings either.  In my constructor I add this line of code:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">this</span>.Language = XmlLanguage.GetLanguage(Thread.CurrentThread.CurrentCulture.Name);</pre>
<!--CRLF--></div>
</div>

<p>This tells the markup system to use the current culture settings as the UI language.  XmlLanguage is a part of the System.Windows.Markup namespace, so ensure you call that out explicitly or add a using statement.  Now refreshing my German settings sample I get:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="StringFormat with explicit culture" alt="StringFormat with explicit culture" src="http://storage2.timheuer.com/stringformat-culture3.png" /></p>

<p>as expected.  Changing (or removing the explicit setting of culture in my &lt;object&gt; tag) back to my default culture settings results in my US-English preferences being used and no need for me to change the XAML.</p>

<p>Hope this helps!
  </p><div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:17575c45-0603-46b8-8f21-f9fcf5f9bfac" class="wlWriterEditableSmartContent"></div>

