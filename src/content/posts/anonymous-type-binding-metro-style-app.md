---
title: "Metro app development hidden gem: anonymous type binding"
slug: "anonymous-type-binding-metro-style-app"
pubDate: 2012-04-10T08:38:12.000Z
lastModified: 2019-10-23T04:20:39.000Z
categories:
  - "xaml"
  - "linq"
  - "databinding"
  - "metro"
  - "win8"
  - "windows 8"
  - "anonymous"
draft: false
---

<p>Just a little post to point out a hidden gem if you are a .NET developer creating a Metro style app: you can bind to anonymous types.  This came up in a discussion with a customer today that I was having and, frankly, I never tried it until then because my mind was back in Silverlight where this isn’t possible.  There may not be a tone of cases where this is valuable for you, but knowing it is there may help.</p>  <p>Let’s assume I have a basic class Person:</p>  <div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">   <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">     <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">public</span> <span style="color: #0000ff">class</span> Person</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">int</span> Age { get; set; }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> FirstName { get; set; }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>     <span style="color: #0000ff">public</span> <span style="color: #0000ff">string</span> Gender { get; set; }</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span> }</pre>
<!--CRLF--></div>
</div>

<p>And in my application I have a list of that Person type that I somehow received.  In this example, I’m just hard-coding it right now. </p>

<div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">
    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> List&lt;Person&gt; people = <span style="color: #0000ff">new</span> List&lt;Person&gt;();</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> people.Add(<span style="color: #0000ff">new</span> Person() { Age = 38, FirstName = <span style="color: #006080">"Tim"</span>, Gender = <span style="color: #006080">"Male"</span> });</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span> people.Add(<span style="color: #0000ff">new</span> Person() { Age = 9, FirstName = <span style="color: #006080">"Zoe"</span>, Gender = <span style="color: #006080">"Female"</span> });</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span> people.Add(<span style="color: #0000ff">new</span> Person() { Age = 5, FirstName = <span style="color: #006080">"Zane"</span>, Gender = <span style="color: #006080">"Male"</span> });</pre>
<!--CRLF--></div>
</div>

<p>I can then decide I want to bind to a ListView control which has a particular template:</p>

<div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">
    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">ListView</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="PeopleList"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="500"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="300"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">ListView.ItemTemplate</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">DataTemplate</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>             <span style="color: #0000ff">&lt;</span><span style="color: #800000">StackPanel</span> <span style="color: #ff0000">Orientation</span><span style="color: #0000ff">="Horizontal"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>                 <span style="color: #0000ff">&lt;</span><span style="color: #800000">TextBlock</span> <span style="color: #ff0000">Text</span><span style="color: #0000ff">="{Binding TheName}"</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="0,0,10,0"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>                 <span style="color: #0000ff">&lt;</span><span style="color: #800000">TextBlock</span> <span style="color: #ff0000">Text</span><span style="color: #0000ff">="{Binding GuysAge}"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span>             <span style="color: #0000ff">&lt;/</span><span style="color: #800000">StackPanel</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span>         <span style="color: #0000ff">&lt;/</span><span style="color: #800000">DataTemplate</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum9" style="color: #606060">   9:</span>     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">ListView.ItemTemplate</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum10" style="color: #606060">  10:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">ListView</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Notice that I’m binding to properties (TheName and GuysAge) that don’t exist on my Person class?  In my code, I can then create a LINQ query to filter out only the “dudes” from my list and bind that result:</p>

<div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">
    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> var onlyGuys = from g <span style="color: #0000ff">in</span> people</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span>                <span style="color: #0000ff">where</span> g.Gender == <span style="color: #006080">"Male"</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>                orderby g.FirstName descending</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>                select <span style="color: #0000ff">new</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>                {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>                    GuysAge = g.Age,</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span>                    TheName = g.FirstName,</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span>                    Gender = <span style="color: #006080">"Dude"</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum9" style="color: #606060">   9:</span>                };</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum10" style="color: #606060">  10:</span>  </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum11" style="color: #606060">  11:</span> PeopleList.ItemsSource = onlyGuys;</pre>
<!--CRLF--></div>
</div>

<p>The result is that my ListView now shows 2 people in the list.  Nice.</p>

<h2>Get in the real world</h2>

<p>Now I would probably agree that since you already have a strongly-typed class this is probably not the use case here.  It certainly might be helpful, but you already have a class (and in this example, one that you completely control so you could shape it to be what you really need).  What about those times you don’t have a class or you don’t own the type coming back?  JSON ring a bell?  Using the sample JSON response (I’m not focusing on how to retrieve data here just how to bind to it) from Twitter APIs, we can demonstrate how this might be more helpful.  Here’s the Twitter JSON data I’m referring to in this example: <a href="https://dev.twitter.com/docs/api/1/get/statuses/mentions">Twitter Mentions API</a>.</p>

<p>My app wants to retrieve and bind to Twitter data but I don’t really want to have a “TwitterResponse” data type that I have to serialize in/out in my code.  The mention data is an array of mentions.  For the sake of simplicity I’ve basically put my JSON string in a file rather than confuse this sample in how to work with Twitter.  My code looks like this (assume that ‘data’ is the resulting Twitter mentions JSON string:</p>

<div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">
    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #008000">// parse the data into a JsonArray object</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> var mentions = JsonArray.Parse(data);</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>  </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span> <span style="color: #008000">// build the query out of the mentions</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span> var qry = from m <span style="color: #0000ff">in</span> mentions</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>           select <span style="color: #0000ff">new</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span>           {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span>               MentionText = m.GetObject()[<span style="color: #006080">"text"</span>].GetString(),</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum9" style="color: #606060">   9:</span>               FromUser = m.GetObject()[<span style="color: #006080">"user"</span>].GetObject()[<span style="color: #006080">"screen_name"</span>].GetString(),</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum10" style="color: #606060">  10:</span>               ProfilePic = m.GetObject()[<span style="color: #006080">"user"</span>].GetObject()[<span style="color: #006080">"profile_image_url"</span>].GetString()</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum11" style="color: #606060">  11:</span>           };</pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum12" style="color: #606060">  12:</span>  </pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum13" style="color: #606060">  13:</span> MentionData.ItemsSource = qry;</pre>
<!--CRLF--></div>
</div>

<p>Notice the LINQ query for creating a “new” type that I will bind to my ListView.  In my XAML I have a simple DataTemplate to demonstrate:</p>

<div id="codeSnippetWrapper" style="cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; width: 97.5%; border-bottom: silver 1px solid; overflow: auto; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4">
    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">ListView</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="MentionData"</span> <span style="color: #ff0000">Width</span><span style="color: #0000ff">="500"</span> <span style="color: #ff0000">Height</span><span style="color: #0000ff">="300"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">ListView.ItemTemplate</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>         <span style="color: #0000ff">&lt;</span><span style="color: #800000">DataTemplate</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>             <span style="color: #0000ff">&lt;</span><span style="color: #800000">StackPanel</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>                 <span style="color: #0000ff">&lt;</span><span style="color: #800000">TextBlock</span> <span style="color: #ff0000">Text</span><span style="color: #0000ff">="{Binding FromUser}"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span>                 <span style="color: #0000ff">&lt;</span><span style="color: #800000">TextBlock</span> <span style="color: #ff0000">Text</span><span style="color: #0000ff">="{Binding MentionText}"</span> <span style="color: #ff0000">TextWrapping</span><span style="color: #0000ff">="Wrap"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum7" style="color: #606060">   7:</span>             <span style="color: #0000ff">&lt;/</span><span style="color: #800000">StackPanel</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum8" style="color: #606060">   8:</span>         <span style="color: #0000ff">&lt;/</span><span style="color: #800000">DataTemplate</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum9" style="color: #606060">   9:</span>     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">ListView.ItemTemplate</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-top-style: none; font-size: 8pt; font-family: 'Courier New', courier, monospace; width: 100%; border-bottom-style: none; color: black; overflow: visible; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; border-left-style: none; line-height: 12pt; padding-right: 0px; background-color: #f4f4f4"><span id="lnum10" style="color: #606060">  10:</span> <span style="color: #0000ff">&lt;/</span><span style="color: #800000">ListView</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>The result is me being able to create a LINQ query and create a new anonymous type and directly bind to it.</p>

<p>Voila!  Perhaps you already discovered this little gem and are using it.  It is a welcome addition to the data binding story for Metro style app development with XAML and .NET!  Of course the same benefit can be had for XML data using XLINQ queries, so while this example is for JSON data, really any source data applies…it is all about that new anonymous type you create!</p>

<p>Hope this helps!</p>



<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:86164c5e-72f1-4846-afc7-26051fe8cdfc" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>
