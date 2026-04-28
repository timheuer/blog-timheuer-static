---
title: "Generate a GitHub Actions workflow file from dotnet CLI"
slug: "generate-github-actions-workflow-from-cli"
pubDate: 2020-11-03T18:54:33.000Z
lastModified: 2020-11-03T18:54:33.000Z
description: "Generate a GitHub Actions workflow file quickly from the dotnet CLI using this new helper tool."
categories:
  - "dotnet"
  - "github"
  - "devops"
  - "workflow"
draft: false
---

<p>I’ve become a huge fan of DevOps and spending more time ensuring my own projects have a good CI/CD automation using GitHub Actions.&#160; The team I work on in Visual Studio for .NET develops the “right click publish” feature that has become a tag line for DevOps folks (okay, maybe not in the post flattering way!).&#160; We know that a LOT of developers use the Publish workflow in Visual Studio for their .NET applications for various reasons.&#160; In reaching out to a sampling and discussing CI/CD we heard a lot of folks talking about they didn’t have the time to figure it out, it was too confusing, there was no simple way to get started, etc.&#160; In this past release we aimed to improve that experience for those users of Publish to help them very quickly get started with CI/CD for their apps deploying to Azure.&#160; Our new feature enables you to <a href="https://devblogs.microsoft.com/visualstudio/using-github-actions-in-visual-studio-is-as-easy-as-right-click-and-publish/" target="_blank">generate a GitHub Actions workflow file using the Publish wizard</a> to walk you through it.&#160; In the end you have a good getting started workflow.&#160; I did a quick video on it to demonstrate how easy it is:</p>  <blockquote class="twitter-tweet">   <p lang="en" dir="ltr">One of my favorite features we've been working on in <a href="https://twitter.com/VisualStudio?ref_src=twsrc%5Etfw">@VisualStudio</a>. Yes, Right Click Publish!!!! <a href="https://twitter.com/hashtag/devops?src=hash&amp;ref_src=twsrc%5Etfw">#devops</a> <a href="https://twitter.com/hashtag/dotnet?src=hash&amp;ref_src=twsrc%5Etfw">#dotnet</a> <a href="https://t.co/Jy2jSWplam">pic.twitter.com/Jy2jSWplam</a></p> — Tim Heuer (@timheuer) <a href="https://twitter.com/timheuer/status/1323678182403313664?ref_src=twsrc%5Etfw">November 3, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>  <p>It really is that simple!&#160; </p>  <h2>Making it simple from the start</h2>  <p>I have to admit though, as much as I have been doing this the YAML still is not sticking in my memory enough to type from scratch (dang you IntelliSense for making me lazy!).&#160; There are also times where I’m not using Azure as my deployment but still want CI/CD to something like NuGet for my packages.&#160; I still want that flexibility to get started quickly and ensure as my project grows I’m not waiting to the last minute to add more to my workflow.&#160; I just saw <a href="https://twitter.com/damovisa" target="_blank">Damian</a> comment on this recently as well:</p>  <blockquote class="twitter-tweet">   <p lang="en" dir="ltr">100% this.      <br />Create a pipeline to deploy Hello World, then build on that. You'll only have to tweak the pipeline as you go instead of trying to figure out how to deploy this big complex thing at the end. <a href="https://t.co/DV8J1IXtQW">https://t.co/DV8J1IXtQW</a></p> — Damian Brady  #BLM (@damovisa) <a href="https://twitter.com/damovisa/status/1323242702457073664?ref_src=twsrc%5Etfw">November 2, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>  <p>I totally agree!&#160; Recently I found myself continuing to go to older repos to copy/paste from existing workflows I had.&#160; Sure, I can do that because I’m good at copying/pasting, but it was just frustrating to switch context for even that little bit.&#160; My searching may suck but I also didn’t see a quick solution to this either (please point out in my comments below if I missed a better solution!!!).&#160; So I created a quick `dotnet new` way of doing this for my projects from the CLI.</p>  <p><img title="Screenshot of terminal window with commands" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of terminal window with commands" src="https://storage2.timheuer.com/dotnetnewworkflow.png" width="1466" height="780" /></p>  <p>I created a simple item template that can be called using the `dotnet new` command from the CLI.&#160; Calling this in simplest form:</p>  <pre class="brush: ps;">dotnet new workflow
</pre>

<p>will create a .github\workflows\foo.yaml file where you call it from (where ‘foo’ is the name of your folder) with the default content of a workflow for .NET Core that restores/builds/tests your project (using a default SDK version and ‘main’ as the branch).&#160; You can customize the output a bit more with a command like:</p>

<pre class="brush: ps;">dotnet new workflow --sdk-version 3.1.403 -n build -b your_branch_name
</pre>

<p>This will enable you to specify a specific SDK version, a specific name for the .yaml file, and the branch to monitor to trigger the workflow.&#160; An example of the output is here:</p>

<pre class="brush: ps; highlight: [6,13,38];">name: &quot;Build&quot;

on:
  push:
    branches:
      - main
    paths-ignore:
      - '**/*.md'
      - '**/*.gitignore'
      - '**/*.gitattributes'
  workflow_dispatch:
    branches:
      - main
    paths-ignore:
      - '**/*.md'
      - '**/*.gitignore'
      - '**/*.gitattributes'
      
jobs:
  build:
    if: github.event_name == 'push' &amp;&amp; contains(toJson(github.event.commits), '***NO_CI***') == false &amp;&amp; contains(toJson(github.event.commits), '[ci skip]') == false &amp;&amp; contains(toJson(github.event.commits), '[skip ci]') == false
    name: Build 
    runs-on: ubuntu-latest
    env:
      DOTNET_CLI_TELEMETRY_OPTOUT: 1
      DOTNET_SKIP_FIRST_TIME_EXPERIENCE: 1
      DOTNET_NOLOGO: true
      DOTNET_GENERATE_ASPNET_CERTIFICATE: false
      DOTNET_ADD_GLOBAL_TOOLS_TO_PATH: false
      DOTNET_MULTILEVEL_LOOKUP: 0

    steps:
    - uses: actions/checkout@v2
      
    - name: Setup .NET Core SDK
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 3.1.x

    - name: Restore
      run: dotnet restore

    - name: Build
      run: dotnet build --configuration Release --no-restore

    - name: Test
      run: dotnet test
</pre>

<p>You can see the areas that would be replaced by some input parameters on lines 6,13,38 here in this example (these are the defaults).&#160; This isn’t meant to be your final workflow, but as Damian suggests, this is a good practice to start immediately from your “File…New Project” aspect and build up the workflow as you go along, rather than wait until the end to cobble everything together.&#160; For me, now I just need to add my specific NuGet deployment steps when I’m ready to do so.</p>

<h2>Installing and feature wishes</h2>

<p>If you find this helpful feel free to install this template from NuGet using:</p>



<pre class="brush: ps;">dotnet new --install TimHeuer.GitHubActions.Templates
</pre>



<p>You can find the package at <a href="https://www.nuget.org/packages/TimHeuer.GitHubActions.Templates/" target="_blank">TimHeuer.GitHubActions.Templates</a> which also has the link to the repo if you see awesome changes or horrible bugs.&#160; This is a simple item template so there are some limitations that I wish it would do automatically.&#160; Honestly I started out making a global tool that would solve some of these but it felt a bit overkill.&#160; For example:</p>

<ul>
  <li>It adds the template from where you are executing.&#160; Actions need to be in the root of your repo, so you need to execute this in the root of your repo locally.&#160; Otherwise it is just going to add some folders in random places that won’t work.&#160; </li>

  <li>It won’t auto-detect the SDK you are using.&#160; Not horrible, but would be&#160; nice to say “oh, you are a .NET 5 app, then this is the SDK you need”</li>
</ul>

<p>Both of these could be solved with more access to the project system and in a global tool, but again, they are minor in my eyes.&#160; Maybe I’ll get around to solving them, but selfishly I’m good for now!</p>

<p>I just wanted to share this little tool that has become helpful for me, hope it helps you a bit!</p>
