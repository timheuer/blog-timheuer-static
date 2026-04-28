---
title: "Ensuring your Windows store app knows of a language change"
slug: "howto-refresh-languages-winrt-xaml-windows-store"
pubDate: 2013-03-26T13:05:10.000Z
lastModified: 2019-10-23T04:20:40.000Z
categories:
  - "xaml"
  - "localization"
  - "windows 8"
  - "winrt"
  - "win8appdev"
  - "winappdev"
draft: false
---

<p>In my working with Windows Store apps, I’ve become increasingly fond/aware of the advantages for app localization.  There are a lot of resources out there for you to localize your app using a good-better-best approach as well.  I’ve <a href="http://timheuer.com/blog/archive/2012/04/26/localize-windows-8-application.aspx">previously written about localizing a Windows Store app</a> using some of these methods and what the WinRT platform supports to make this easier in most cases.</p>  <p>Now that you’ve localized your app, you may be faced with the question of how you might want to respond to language choice changes by the user.  Remember that the Windows Store app model is that it honors the user’s language choice preferences matching that with the available languages the app indicates it supports.  This may not always map to the user’s installed OS language.  For instance I can have an English OS install but prefer German in my apps and set my language preference to: de-DE, en-US.  If a Windows Store app was localized in German, then I would see that version instead of English because my preferences say so, regardless of my OS install.</p>  <h2>Language switching problem</h2>  <p>Now, I’m not as proficient in German as I’d like to be, so there may be times where I need to flip back to English to understand certain areas of an app.  I can do this easily by going to the languages panel and switching my order of preference:</p>  <p><img style="float: none; margin-left: auto; display: block; margin-right: auto" src="http://storage2.timheuer.com/langpanelchange.png" /></p>  <p>But when I go back to my app, it is still in German…until I terminate/restart the app.  Let’s say I started the app and it honors my language preference:</p>  <p><img style="float: none; margin-left: auto; display: block; margin-right: auto" src="http://storage2.timheuer.com/german-page1.png" /></p>  <p>Now I go and change back to English and click the button to take me to page 2.  It is still in German even though my language preference list is now: en-US; de-DE.</p>  <p>The XAML framework doesn’t automatically re-evaluate the resource cache in response to these changes.  This is something the developer has to manage and luckily there are some easy steps you can do to make this experience better for your users.</p>  <p>We should point out that this is likely a rare case that a user of your app is constantly switching languages and switching back to your app, but having your app support this is a delighter for your users when it does happen.</p>  <h2 />  <h2>Solution: listening to qualifier updates</h2>  <p>There are APIs to the rescue here!  When you switch your language preferences, the system actually is aware of it, however the context that your app already had at launched has been cached…and thus it will still be delivering the original context-aware resources.  Good for us is that the APIs can let us know when this happens and we can respond.</p>  <p>Since most apps have only a single Window object and since this change is likely rare, we should manage this call and not put it on every Page load, for example, but rather higher up in the App because it will likely be rare that it happens.  In our activation code path we can listen for the resource context to change</p>  <div id="codeSnippetWrapper" style="overflow: auto; cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; border-bottom: silver 1px solid; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; width: 97.5%; background-color: #f4f4f4">   <div id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">     <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">protected</span> <span style="color: #0000ff">override</span> <span style="color: #0000ff">void</span> OnLaunched(LaunchActivatedEventArgs args)</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>     ...</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span>     ResourceManager.Current.DefaultContext.QualifierValues.MapChanged += QualifierValues_MapChanged;</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum5" style="color: #606060">   5:</span>     ...</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum6" style="color: #606060">   6:</span> }</pre>
<!--CRLF--></div>
</div>

<p>In this snippet we are using the default <a href="http://msdn.microsoft.com/en-us/library/windows/apps/windows.applicationmodel.resources.core.resourcecontext.aspx">ResourceContext</a> and listening for when its qualifier map changes.  The qualifier map is the set of context for resources like language, but also scale, phonetics (for Japanese), high contrast, etc.  Once that map changes we can force a refresh of the cache essentially:</p>

<div id="codeSnippetWrapper" style="overflow: auto; cursor: text; font-size: 8pt; border-top: silver 1px solid; font-family: 'Courier New', courier, monospace; border-right: silver 1px solid; border-bottom: silver 1px solid; padding-bottom: 4px; direction: ltr; text-align: left; padding-top: 4px; padding-left: 4px; margin: 20px 0px 10px; border-left: silver 1px solid; line-height: 12pt; padding-right: 4px; width: 97.5%; background-color: #f4f4f4">
  <div id="codeSnippet" style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4">
    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum1" style="color: #606060">   1:</span> <span style="color: #0000ff">void</span> QualifierValues_MapChanged(IObservableMap&lt;<span style="color: #0000ff">string</span>, <span style="color: #0000ff">string</span>&gt; sender, IMapChangedEventArgs&lt;<span style="color: #0000ff">string</span>&gt; @<span style="color: #0000ff">event</span>)</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum2" style="color: #606060">   2:</span> {</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum3" style="color: #606060">   3:</span>     ResourceManager.Current.DefaultContext.Reset();</pre>
<!--CRLF-->

    <pre style="border-top-style: none; overflow: visible; font-size: 8pt; border-left-style: none; font-family: 'Courier New', courier, monospace; border-bottom-style: none; color: black; padding-bottom: 0px; direction: ltr; text-align: left; padding-top: 0px; border-right-style: none; padding-left: 0px; margin: 0em; line-height: 12pt; padding-right: 0px; width: 100%; background-color: #f4f4f4"><span id="lnum4" style="color: #606060">   4:</span> }</pre>
<!--CRLF--></div>
</div>

<p>This simple flow basically says “hey, when a qualifier has changed, reset the context map so that I get the new data” and our app in subsequent calls to the resources will get the updated resources.</p>

<p>Here’s a video demonstrating the completed before/after approach.</p>

<p><iframe width="560" height="315" src="http://www.youtube.com/embed/PAhs3pdsotk" frameborder="0" allowfullscreen=""></iframe></p>

<p>There is a big caveat to this approach.  The change doesn’t automatically affect your current view.  So your page has rendered and is in German.  If I go and change it to English, then go back to my page…it isn’t automatically in English.  <strong>Subsequent</strong> view loads (and even going back to this page) will get the new resources, but already-rendered ones do not.  The developer can, of course, implement way more logic to refresh the view, traverse the tree, etc. to manage this, but that experience is up to the app developer to determine what is most appropriate for the app itself.</p>

<p>This is a little subtle but helpful tip in enabling your localized apps to be flexible to these types of changes by users when that happens.</p>

<p>Hope this helps!</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:9088e39c-d2f2-4676-9e8f-e5882e78291e" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>
