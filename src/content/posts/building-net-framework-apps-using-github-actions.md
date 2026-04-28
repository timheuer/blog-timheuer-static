---
title: "Using GitHub Actions for .NET Framework apps"
slug: "building-net-framework-apps-using-github-actions"
pubDate: 2020-01-15T01:00:32.000Z
lastModified: 2020-01-15T01:00:32.000Z
description: "Can you use GitHub Actions to build .NET Framework apps?  Yes! Read this to help get you started."
categories:
  - "github"
  - "devops"
  - "dotnet"
draft: false
---

<p>I’ve continuing been doing research on GitHub Actions for .NET developers and came across a comment that someone said (paraphrasing): <em>I wish I could use it for .NET Framework apps but it is just .NET Core.</em></p>  <p>NOT TRUE! And I want to help fix that perception.&#160; There are some bumps in the road, but allow me to explain some simple (yes I realize they are simple) steps to get it working.</p>  <blockquote>   <p><strong>NOTE</strong>: I’ve been on this research because I’m looking to better get ‘publish’ experiences in Visual Studio for your apps, but I want to help you get into best practices for CI/CD and DevOps practices.&#160; Basically I’m on a mission for right-click, publish to CI to improve for you :-)</p> </blockquote>  <p>So in this post I’ll walk through an ASP.NET Framework (MVC) app and have it build/publish artifacts using GitHub Actions.&#160; Let’s get started…</p>  <h2>The simple app</h2>  <p>I am starting from File…New Project and selecting the ASP.NET Web Application (.NET Framework):</p>  <p><img title="Screenshot of template selection" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of template selection" src="https://storage2.timheuer.com/filenewfxwebapp.png" width="855" height="192" /></p>  <p>So it’s basic vanilla and I’m not changing anything.&#160; The content of the app is not important for this post, just that we have a full .NET Framework (I chose v4.8) app to use.&#160; From here in Visual Studio you can build the app, run, debug, etc.&#160; Everything you need here is in Visual Studio of course.&#160; If you wanted to use a terminal to build this app, you’d be likely (recommended) using MSBuild to build this and not the dotnet CLI.&#160; The command might look something like this:</p>  <p>code</p>  <p>I’m specifying to build the solution and use a release profile.&#160; We’ll come back to this, now let’s move on.</p>  <h2>Publish profile</h2>  <p>Now for our example, I want to publish this app using some pre-compiled options.&#160; In the end of the publish task I’ll have a folder that I’d be able to deploy to a web server.&#160; To make this simple, I’m using the Publish capabilities in Visual Studio to create a publish profile.&#160; You get there from right-click Publish (don’t worry, we’re not publishing to production but just creating a folder profile).</p>  <p><img title="Publish profile screenshot" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Publish profile screenshot" src="https://storage2.timheuer.com/fullfxpublishprofile.png" width="1251" height="932" /></p>  <p>The end result is that it will create a pubxml file in the Properties folder in your solution</p>  <p><img title="Publish profile in solution explorer" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Publish profile in solution explorer" src="https://storage2.timheuer.com/fxpublish2.png" width="460" height="310" /></p>  <p>So we have our app and our publish (to a folder) profile.&#160; Moving on to the next step!</p>  <h2>Publish to the repo and create initial GitHub Actions workflow</h2>  <p>From Visual Studio we can add this to GitHub directly.&#160; In the lower right of visual Studio you’ll see the ability to ‘Add to Source Control’ and select Git:</p>  <p><img title="Add to source control tray button" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Add to source control tray button" src="https://storage2.timheuer.com/addtosourcecontrol1.png" width="411" height="121" /></p>  <p>which will bring up the UI to create/push a new repository to GitHub directly from Visual Studio:</p>  <p><img title="Publish to GitHub from VS" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Publish to GitHub from VS" src="https://storage2.timheuer.com/addtosourcecontrol2.png" width="532" height="558" /></p>  <p>Now we have our project in GitHub and we can go to our repository and create the initial workflow.</p>  <blockquote>   <p><strong>NOTE</strong>: This is the area if you have comments about please do so below.&#160; In the workflow (pun intended) right now you leave Visual Studio and go to GitHub to create a new workflow file then have to pull/sync, etc.&#160; You don’t *have* to do this but usually this is the typical workflow to find templates of workflow files for your app.&#160; Got feedback on what Visual Studio might do here, share below!</p> </blockquote>  <p>Now that you have the publish profile created and your solution in GitHub you’ll need to manually add the pubxml file to the source control (as by default it is a part of the .gitignore file).&#160; So right click that file in solution explorer and add to your source control.&#160; Now on your repository in GitHub go to the Actions tab and setup a new workflow:</p>  <p><img title="Setting up new workflow" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Setting up new workflow" src="https://storage2.timheuer.com/setupworkflowgh.png" width="1690" height="634" /></p>  <p>The reason for this (in choosing new) is that you won’t see a template that is detected for .NET Framework.&#160; And due to whatever reason GitHub thinks this is a JavaScript repository.&#160; Anyhow, we’re effectively starting with blank.&#160; Create the workflow and you’ll get a very blank default:</p>  <pre class="brush: yaml; toolbar: false;">name: CI

on: [push]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: Run a one-line script
      run: echo Hello, world!
    - name: Run a multi-line script
      run: |
        echo Add other actions to build,
        echo test, and deploy your project.

</pre>

<p>And it will not be helpful, so we’ll be wiping it out.&#160; I’ve named my workflow build.yml as I’m only focusing on build right now.&#160; </p>

<h2>Defining the .NET Framework build steps</h2>

<p>For this post I’m going to put all the steps here rather than build-up and explain each one so you can see the entirety.&#160; Here’s the final script for me:</p>



<pre class="brush: yaml; toolbar: false; highlight: [8,14,15,20,21,24,26];">name: Build Web App

on: [push]

jobs:
  build:

    runs-on: windows-latest

    steps:
    - uses: actions/checkout@v1
      name: Checkout Code
    
    - name: Setup MSBuild Path
      uses: warrenbuckley/Setup-MSBuild@v1
      
    - name: Setup NuGet
      uses: NuGet/setup-nuget@v1.0.2
    
    - name: Restore NuGet Packages
      run: nuget restore SimpleFrameworkApp.sln

    - name: Build and Publish Web App
      run: msbuild SimpleFrameworkApp.sln /p:Configuration=Release /p:DeployOnBuild=true /p:PublishProfile=FolderProfile

    - name: Upload Artifact
      uses: actions/upload-artifact@v1.0.0
      with:
        name: published_webapp
        path: bin\Release\Publish
</pre>



<p>Let’s start explaining them.</p>

<h3>Ensuring the right runner</h3>

<p>In a previous post I described what a ‘runner’ is: <a href="https://timheuer.com/blog/what-is-a-github-runner-and-what-is-installed-on-runners/">What is a GitHub Action Runner</a>?&#160; In that post I pointed to the documentation of runners including what is installed on them.&#160; Now for .NET Framework apps we need to use Windows because .NET Framework only works on Windows :-).&#160; Our action needs to specify using Windows and we are using the windows-latest runner image as we are on Line 8.&#160; I won’t spend time talking about self-hosted runners here, but regardless even your self-hosted runner needs to support .NET Framework.&#160; As a part of the windows-latest runner image, you can see what is already provided on the image.&#160; Currently windows-latest is defined as Windows Server 2019 and the <a href="https://help.github.com/en/actions/automating-your-workflow-with-github-actions/software-installed-on-github-hosted-runners#windows-server-2019">documentation shows what is provided on the hardware resource</a>.&#160; This includes already having a version of Visual Studio 2019 installed…which means MSBuild is already there!</p>

<h3>Setting up MSBuild</h3>

<p>Even though Visual Studio is on the runner, MSBuild is not presently in the default PATH environment (as of the date of this writing)…so you have options.&#160; The documentation provides the path to where Visual Studio is installed and you can determine the right location to MSBuild from there and specify the path fully.&#160; However, I think there should be easier ways to do this and the community agrees!&#160; In the marketplace there is an Action you can use to setup the PATH to have the MSBuild toolset in your path and you can see this being used on Line 14/15.&#160; The action here basically does a ‘vswhere’ and sets up the ability to later just call MSBuild directly.&#160; This only does MSBuild and not other VS tools that are added to PATH as a part of the ‘Visual Studio Command Prompt’ that most people use.&#160; But using this one we have here, we can now build our Framework app with less path ugliness.</p>

<h3>Building and publishing the app</h3>

<p>With our MSBuild setup in place, we can start building.&#160; The first thing we need to do is restore any NuGet packages.&#160; In Line 20,21 is where we use the NuGet CLI to restore the solution’s packages that are needed.</p>

<p><strong>NOTE</strong>: For some reason using msbuild –t:Restore was not working at the time of this writing that I expected to work…</p>

<p>Once we have the packages restored, we can proceed to build.&#160; In Line 24 is our full command to build the solution.&#160; We are specifying some parameters:</p>

<ul>
  <li>Configuration – simple, we are building release bits</li>

  <li>DeployOnBuild – this helps us trigger the publish step</li>

  <li>PublishProfile – this uses the publish profile we specify to execute that step and all the other options we have set in that configuration.&#160; We just have to specify the name, not the path</li>
</ul>

<p>After the completion of this step (we didn’t set any different output folders) we will have a bunch of files in the default publish folder (which would be bin\&lt;config&gt;\Publish).</p>

<h3>Publish the artifacts</h3>

<p>Once we have the final published bits, we can upload them as the artifact for this build pipeline.&#160; As we see starting at Line 26 we are using another action to upload our content (binaries, files) to this completed workflow as an artifact named ‘published_webapp’ and this will be associated with this run and zipped up all these assets you can download or later use these artifacts to publish to your servers, cloud infrastructure, etc.</p>

<h2>Summary</h2>

<p>So if you thought you couldn’t use GitHub Actions for your .NET Framework now you know you can with some extra steps that may not have been obvious…because they aren’t.&#160; In the end you have a final build:</p>

<p><img title="Picture of a final build log" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Picture of a final build log" src="https://storage2.timheuer.com/fullfxfinalbuildlog.png" width="1734" height="639" /></p>

<p>What I’ve shared here I put in a sample repro: <a href="https://github.com/timheuer/SimpleFrameworkApp"><strong>timheuer/SimpleFrameworkApp</strong></a> where you can see the workflow (in .github/workflows/build.yml) and the logs.&#160; I hope this helps, please share your experiences you’d like to see in Visual Studio to help you better for GitHub Actions.</p>
