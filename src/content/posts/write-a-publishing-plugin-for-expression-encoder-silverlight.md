---
title: "write a plugin for expression encoder"
slug: "write-a-publishing-plugin-for-expression-encoder-silverlight"
pubDate: 2007-12-11T13:40:45.000Z
lastModified: 2019-10-23T04:20:13.000Z
categories:
  - "silverlight streaming"
  - "silverlight"
  - "wpf"
  - "expression"
  - "xaml"
  - "plugin"
  - "expression encoder"
  - "encoder"
  - "encoder plugin"
  - "publishing plugin"
draft: false
---

<p>remember <a href="http://timheuer.com/blog/archive/2007/10/31/silverlight-streaming-made-simple-with-expression-encoder-plugin.aspx">that feature i was mentioning</a> that is a plugin for expression encoder?  you know the one that enables you to <a href="http://timheuer.com/blog/archive/2007/10/31/silverlight-streaming-made-simple-with-expression-encoder-plugin.aspx">publish the output immediately</a> and directly to the <strong><a href="http://silverlight.net">silverlight</a> streaming</strong> service?</p>
<p>well, how would you like to write your own encoder publishing plugin.  perhaps you have a process with a content delivery network?  or have some custom process you want to implement in your own workflow (save as an encoder job file, etc.) for ongoing media encodings?  james clarke just announced a quickstart guide on developing publisher plug-ins for encoder.</p>
<p>the code looks relatively simple to implement:</p>
<pre class="csharpcode">[EncoderPlugin(<span class="str">"Zip Plugin from scratch"</span>,<span class="str">"Enables output to be zipped"</span>)] 
    <span class="kwrd">public</span> <span class="kwrd">class</span> ZipPublishPlugin : PublishPlugin 
    { 
 
        <span class="kwrd">public</span> <span class="kwrd">override</span> <span class="kwrd">object</span> CreateAdvancedSettingsEditor() 
        { 
            <span class="kwrd">throw</span> <span class="kwrd">new</span> NotImplementedException(); 
        } 
 
        <span class="kwrd">public</span> <span class="kwrd">override</span> <span class="kwrd">object</span> CreateStandardSettingsEditor() 
        { 
            <span class="kwrd">throw</span> <span class="kwrd">new</span> NotImplementedException(); 
        } 
 
        <span class="kwrd">public</span> <span class="kwrd">override</span> <span class="kwrd">void</span> PerformPublish(<span class="kwrd">string</span> rootPath, <span class="kwrd">string</span>[] filesToPublish) 
        { 
            <span class="kwrd">throw</span> <span class="kwrd">new</span> NotImplementedException(); 
        } 
    }</pre>
<p>need to implement settings as a part of your plugin?  no problem.  the settings user interface is implemented using some XAML that you mark up so something like this:</p>
<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">TextBox</span> <span class="attr">Height</span><span class="kwrd">="23"</span> <span class="attr">Margin</span><span class="kwrd">="0,14,2,0"</span> <span class="attr">Name</span><span class="kwrd">="textBox1"</span>  
         <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> 
         <span class="attr">HorizontalAlignment</span><span class="kwrd">="Right"</span> 
         <span class="attr">Width</span><span class="kwrd">="200"</span><span class="kwrd">&gt;</span> 
  <span class="kwrd">&lt;/</span><span class="html">TextBox</span><span class="kwrd">&gt;</span> 
     
  <span class="kwrd">&lt;</span><span class="html">Label</span> <span class="attr">Height</span><span class="kwrd">="23"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Right"</span>  
      <span class="attr">Margin</span><span class="kwrd">="0,14,200,0"</span> 
         <span class="attr">VerticalAlignment</span><span class="kwrd">="Top"</span> 
         <span class="attr">Width</span><span class="kwrd">="61"</span><span class="kwrd">&gt;</span>Folder:<span class="kwrd">&lt;/</span><span class="html">Label</span><span class="kwrd">&gt;</span> 
     
  <span class="kwrd">&lt;</span><span class="html">Button</span> <span class="attr">Height</span><span class="kwrd">="21"</span> <span class="attr">Margin</span><span class="kwrd">="0,0,100,11"</span>  
      <span class="attr">Name</span><span class="kwrd">="reset"</span> <span class="attr">VerticalAlignment</span><span class="kwrd">="Bottom"</span>  
      <span class="attr">Click</span><span class="kwrd">="reset_Click"</span> 
      <span class="attr">HorizontalAlignment</span><span class="kwrd">="Right"</span> 
      <span class="attr">Width</span><span class="kwrd">="66"</span><span class="kwrd">&gt;</span>Reset<span class="kwrd">&lt;/</span><span class="html">Button</span><span class="kwrd">&gt;</span> 
     
  <span class="kwrd">&lt;</span><span class="html">Button</span> <span class="attr">Height</span><span class="kwrd">="21"</span> <span class="attr">HorizontalAlignment</span><span class="kwrd">="Right"</span>  
      <span class="attr">Margin</span><span class="kwrd">="0,0,13,11"</span> <span class="attr">Name</span><span class="kwrd">="browse"</span>  
      <span class="attr">VerticalAlignment</span><span class="kwrd">="Bottom"</span> 
      <span class="attr">Width</span><span class="kwrd">="66"</span> 
      <span class="attr">Click</span><span class="kwrd">="browse_Click"</span><span class="kwrd">&gt;</span>Browse<span class="kwrd">&lt;/</span><span class="html">Button</span><span class="kwrd">&gt;</span></pre>
<p>turns into something like this in the user interface:</p>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/enplugin-settings.png" /></p>
<p>very cool.  what would you use this for?  perhaps FTP, some blog API, or like i previously mentioned, some process with a CDN already.  i use amazon s3 for a lot of my storage and i'm thinking of hacking up something from encoder to amazon s3 to play around.  of course i've got a few things on my mind at the moment and this is all i needed was another toy to play around with!</p>
<p>at any rate, there's a 10-page doc walking you through the process of writing a plugin.  you can <a href="http://www.clarkezone.net/getattachment.jhci?id=c24aad57-b791-40a3-8637-46f7d2018ee9">get that doc here</a>.  it's an easy read and i think you'd be able to whip something simple up quickly just to get the feel for it.</p>
<p>have fun!</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:2f8654d7-991f-4bcf-b005-173abf18f54d" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
