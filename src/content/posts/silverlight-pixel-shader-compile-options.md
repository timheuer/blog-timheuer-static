---
title: "Compiling pixel shaders for Silverlight"
slug: "silverlight-pixel-shader-compile-options"
pubDate: 2009-09-02T15:41:46.000Z
lastModified: 2019-10-23T04:20:31.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "ria"
  - "pixel shader"
  - "shaders"
draft: false
---

<p>I saw a note on <a href="http://twitter.com/timheuer">Twitter</a> come through yesterday about building pixel shaders for <a href="http://silverlight.net">Silverlight</a> in Visual Studio.  The question, from <a href="http://twitter.com/blamborn/status/3692897077">@blamborn</a> was:</p>  <blockquote>   <p><em>Does anyone know if there is a Shader Effects BuildTask like the #WPF one here </em><a href="http://bit.ly/gCkNT"><em>http://bit.ly/gCkNT</em></a><em> only for #Silverlight?</em></p> </blockquote>  <p>I replied that you can use the same build task and thought I had written my work around on how to do that, but apparently I never clicked published somewhere along the line.  I recall doing some work for this for a presentation a while back on VSLive and started to write it up.  Here are hopefully some helpful knowledge around the subject.</p>  <h2>Option 1: Compiling using DirectX Libraries</h2>  <p>One option you can do is to use a pre-build command for your project in combination with the <a href="http://msdn.microsoft.com/en-us/directx/aa937788.aspx">DirectX SDK</a>.  What you really need out of the DirectX SDK is a tool called fxc.exe.  This is a compiler for the HLSL code for the pixel shader code you write.  The download is 500MB.  Yeah, big.  Once you have it installed you can put a pre-build command on your Visual Studio project with something like this:</p>  <div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">   <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">     <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #006080">"C:\Program Files (x86)\Microsoft DirectX SDK (March 2009)\Utilities\bin\x86\fcx.exe"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>     /T ps_2_0 /Fo <span style="color: #006080">"$(ProjectDir)ShaderEffect1.ps"</span> <span style="color: #006080">"$(ProjectDir)ShaderEffect1.fx"</span></pre>
<!--CRLF--></div>
</div>

<p>Now keep in mind your installation directory might be different, but you should get the gist of it.  The result of this command is that you’ll get a &lt;Filename&gt;.ps file that you will include in your project.  The .ps file, in fact, *IS* your pixel shader…that’s really the only thing your Silverlight project cares about!  The build command doesn’t automatically make it a part of your project though, so you’ll have to ensure that after it builds you use the “show all files” feature in Visual Studio and include it in your project.</p>

<h2>Option 2: Using a build task</h2>

<p>Another option is to use a build task in your project.  For Windows Presentation Foundation (WPF) developers, this is what is easiest and doesn’t require the massive 500MB download.  What is cool is that we can use the same build task for Silverlight.  Awesome right?  Well, yes and no.</p>

<p>It’s awesome that it works.  What is not awesome is the setup.  Allow me to walk you through my steps.  It’s a bit of hackery admittedly.  If anyone is a super Visual Studio extensibility wizard and wants to contribute knowledge to me on extending it to my liking, I’ll send you a virual Mt. Dew!  Here’s my steps otherwise.</p>

<p><strong>Install the WPF Build tasks!!!  You can get them </strong><a href="http://wpf.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=14962"><strong>from here</strong></a><strong> (Shader Effects Build Task and Templates).  Run the installer.  </strong>These steps assume you have them already!!!  You don’t need the templates, but if you want you can install them too – they are for WPF.  You’ll install my template as the next step.</p>

<p><u>1. Get the </u><a href="http://timheuer.com/blog/archive/2009/05/19/silverlight-visual-studio-item-templates-helpers.aspx"><u>VS template I created for Silverlight Pixel Shaders</u></a><u>.</u></p>

<p>I created an item template for Silverlight projects so that you can do <em>Add Item…Silverlight Pixel Shader</em> to your project.  Once you have this installed (just double-click on the VSI and follow the steps) you will see that option.</p>

<p>The template provides you with the right files that get added as well as follows the requirement for a pixel shader being a resource in your project.  You’ll notice after you add the item (let’s say you kept the default name) that the code will show:</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">static</span> ShaderEffect1()</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span> {</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>     _pixelShader.UriSource = <span style="color: #0000ff">new</span> Uri(<span style="color: #006080">"/SilverlightApplication29;component/ShaderEffect1.ps"</span>, UriKind.Relative);</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span> }</pre>
<!--CRLF--></div>
</div>

<p>This is the best practice for a pixel shader.  Note that my project name is SilverlightApplication29, but the template will use your projects name, of course.</p>

<p><u>2. Hackery 1: Open the **proj file for your Silverlight application in a text editor like notepad.</u></p>

<p>Yes, I know.  You are cursing me now.  I agree, if the tool (VS) is awesome why do I have to do this step?  I’ve been trying to understand myself how an item template can actually do all these things for you…again, if you are an extensibility expert, let me know!  But for now, bear with me.</p>

<p>In the **proj file (csproj or vbproj) add the following information right after the Import node in the file:</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">ItemGroup</span> <span style="color: #ff0000">Condition</span><span style="color: #0000ff">="'$(BuildingInsideVisualStudio)'=='true'"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">AvailableItemName</span> <span style="color: #ff0000">Include</span><span style="color: #0000ff">="Effect"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>   <span style="color: #0000ff">&lt;/</span><span style="color: #800000">ItemGroup</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span>   <span style="color: #0000ff">&lt;</span><span style="color: #800000">UsingTask</span> <span style="color: #ff0000">TaskName</span><span style="color: #0000ff">="ShaderBuildTask.PixelShaderCompile"</span> <span style="color: #ff0000">AssemblyName</span><span style="color: #0000ff">="ShaderBuildTask, Version=1.0.3072.18169, Culture=neutral, PublicKeyToken=44e467d1687af125"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span>   <span style="color: #0000ff">&lt;</span><span style="color: #800000">Target</span> <span style="color: #ff0000">Name</span><span style="color: #0000ff">="EffectCompile"</span> <span style="color: #ff0000">Condition</span><span style="color: #0000ff">="'@(Effect)' != '' "</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum6">   6:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">PixelShaderCompile</span> <span style="color: #ff0000">Sources</span><span style="color: #0000ff">="@(Effect)"</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum7">   7:</span>       <span style="color: #0000ff">&lt;</span><span style="color: #800000">Output</span> <span style="color: #ff0000">TaskParameter</span><span style="color: #0000ff">="Outputs"</span> <span style="color: #ff0000">ItemName</span><span style="color: #0000ff">="Resource"</span> <span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum8">   8:</span>     <span style="color: #0000ff">&lt;/</span><span style="color: #800000">PixelShaderCompile</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum9">   9:</span>   <span style="color: #0000ff">&lt;/</span><span style="color: #800000">Target</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum10">  10:</span>   <span style="color: #0000ff">&lt;</span><span style="color: #800000">PropertyGroup</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum11">  11:</span>     <span style="color: #008000">&lt;!-- Add effect compilation to the PrepareResourcesDependsOn so that the effect fx  get compiled before resources are collected --&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum12">  12:</span>     <span style="color: #0000ff">&lt;</span><span style="color: #800000">PrepareResourcesDependsOn</span><span style="color: #0000ff">&gt;</span>EffectCompile;$(PrepareResourcesDependsOn)<span style="color: #0000ff">&lt;/</span><span style="color: #800000">PrepareResourcesDependsOn</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum13">  13:</span>   <span style="color: #0000ff">&lt;/</span><span style="color: #800000">PropertyGroup</span><span style="color: #0000ff">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>These properties enable you to see the “Effect” build task in the properties for your .fx files in the project.  Save the proj file and go back to Visual Studio.  You should be prompted to reload – go for it.  You may see a file named Effect with a warning icon on it.  For now, ignore it.  It’s admittedly an artifact of this hackery.  It will look like this:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Project solution explorer" alt="Project solution explorer" src="http://storage.timheuer.com/pstut1.png" /></p>

<p>Now that you have both of these steps you can add a new pixel shader (using my template of course).</p>

<p><u>3. Change the .fx file’s properties to Build Action: Effect.</u></p>

<p>Once you have added a shader library (using my template) to the project, select the .fx file (which is your HLSL code) and look at the properties dialog for the file.  Change the build action to the new item <em>Effect</em>.</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Build action property" alt="Build action property" src="http://storage.timheuer.com/pstut2.png" /></p>

<p>Build your project.</p>

<p><u>4. Hackery 2: Refresh the view all files and add to project</u></p>

<p>After the build, refresh the view all files feature and you should see your .ps file.  Right click on that and say <em>Include in Project</em>.  It should be included as a Resource build action automatically, but if it isn’t, make sure it is.</p>

<p>That’s it (as I say with a snarky smile).  I know it seems like some hacking….and it is.  But if you don’t want to download the DirectX SDK, you can still re-use the WPF build taks with a little project file modification.</p>

<p>If you don’t have a clue what a pixel shader is, check out <a href="http://silverlight.net/learn/learnvideo.aspx?video=187303">this video</a>.</p>

<p>Hope this helps!</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:d19e395e-16c1-42bb-be20-c0e5fbb9a992" class="wlWriterEditableSmartContent"></div>
