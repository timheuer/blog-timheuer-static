---
title: "Using NuGet with GitHub Actions"
slug: "use-nuget-with-github-actions-github-packages"
pubDate: 2019-12-17T02:08:36.000Z
lastModified: 2019-12-17T02:08:36.000Z
description: "Learn how to use NuGet with GitHub Actions to sign and push your packages to various repositories."
categories:
  - "dotnet"
  - "devops"
  - "github"
draft: false
---

<p>Continuing on my research and playing around with <a href="https://github.com/features/actions">GitHub Actions</a>, I was looking to migrate my <a href="https://github.com/timheuer/alexa-skills-dotnet">Alexa.NET</a> project off of Pipelines and in to one place for my open source project.&#160; Pipelines still has an advantage for me right now as I prefer the approval flow that I have right now.&#160; In this post I’ll cover how I modified my build definition to now also include producing the NuGet package, signing it with my code signing certificate, and pushing it to multiple repositories.</p>  <p>Quick tip: if you haven’t follow Ed Thomson before he’s doing a series on GitHub Actions for the month of December.&#160; Check out his <a href="https://www.edwardthomson.com/blog/github_actions_advent_calendar.html">GitHub Actions Advent Calendar</a>!</p>  <h2>Pre-requisites</h2>  <p>We need to first make sure we have the tools needed in the build step, so let’s be sure to get the .NET SDK so we can use the dotnet CLI commands.&#160; This is the start of my build-and-deploy.yaml file and each other snippet builds on this.</p>  <pre class="brush: yaml; toolbar: false; highlight: [16,17,18,19];">name: &quot;Build and Deploy&quot;

on:
  push:
    branches:
      - master

jobs:
  build:
    if: github.event_name == 'push' &amp;&amp; contains(toJson(github.event.commits), '***NO_CI***') == false &amp;&amp; contains(toJson(github.event.commits), '[ci skip]') == false &amp;&amp; contains(toJson(github.event.commits), '[skip ci]') == false
    name: Build Package
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: Setup .NET Core SDK
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 3.1.100
</pre>

<p>Starting at line 16 I write the steps to get the .NET SDK that I want to use, in this case the .NET 3.1 (which is the long-term support version now) SDK.&#160; Now we are all set…the tools I need are on the runner.</p>

<h2>Building the Package</h2>

<p>The first thing we obviously need to do is ensure we have an actual NuGet package.&#160; I perform this step during my ‘build’ job when I know things have been successfully built and tested.&#160; After getting the SDK we can how issue our pack command.&#160; This assumes we’ve already run dotnet build, which I didn’t show here.</p>

<pre class="yaml: plain; toolbar: false; highlight: [2,5];">    - name: Pack
      run: dotnet pack TestLib --configuration Release -o finalpackage --no-build

    - name: Publish artifact
      uses: actions/upload-artifact@master
      with:
        name: nupkg
        path: finalpackage
</pre>

<p>You can see in line 2 where we use the <a href="https://docs.microsoft.com/dotnet/core/tools/dotnet-pack">dotnet CLI to pack</a> into a NuGet package.&#160; Note I’m using an output argument there to put the final nupkg file in a specific location.&#160; In line 5 I am setting up the action to upload the artifact so that I can use it later in other steps in the job.&#160; The upload-artifact agent will use the path ‘finalpackage’ and upload it into the location ‘nupkg’ for me.&#160; It will available for me later as you’ll see. </p>

<h2>Signing the Package</h2>

<p>Now I want to be a good trusted provider of a library package so I’ve chosen to sign my package using a code-signing certificate.&#160; I got mine through DigiCert.&#160; One of the main differences between Actions and Pipelines is that Actions only has secure storage for ‘secrets’ as strings.&#160; Pipelines has a library where you can also have secure file storage.&#160; To sign a NuGet package, the command requires a path to a certificate file so we have to somehow get the file available for the CLI command.&#160; Based on all the recommendations from people also doing similar activities (needing files in their actions) it seemed to be the approach was to base64-encode the file and put that as a secret…so that’s the approach I took.&#160; I base64-encoded the contents of my PFX and set it as a secret variable named SIGNING_CERT.&#160; </p>

<p>Now the next thing I need to do is not only retrieve that string, but put that into a temporary file.&#160; Searching as best I could on forums I didn’t see an existing script or anything that people used, so I created a new action for myself to use (and you can to) called <a href="https://github.com/timheuer/base64-to-file">timheuer/base64-to-file</a>.&#160; This action takes your encoded string, decodes it to a temporary file and sets the path to that temporary file as an output for the action.&#160; Simple enough.&#160; Now with the pieces in place we can set up the steps:</p>

<pre class="brush: yaml; toolbar: false; highlight: [6,9,22,30];">  deploy:
    needs: build
    name: Deploy Packages
    runs-on: windows-latest # using windows agent due to nuget can't sign on linux yet
    steps:
      - name: Download Package artifact
        uses: actions/download-artifact@master
        with:
          name: nupkg
      
      - name: Setup NuGet
        uses: NuGet/setup-nuget@v1.0.2
        with:
          nuget-api-key: ${{ secrets.NUGET_API_KEY }}
          nuget-version: latest

      - name: Setup .NET Core SDK
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: 3.1.100

      - name: Get certificate
        id: cert_file
        uses: timheuer/base64-to-file@master
        with:
          fileName: 'certfile.pfx'
          encodedString: ${{ secrets.SIGNING_CERT }}
      
      # Sign the package
      - name: Sign NuGet Package
        run: nuget sign nupkg\*.nupkg -CertificatePath ${{ steps.cert_file.outputs.filePath }} -CertificatePassword ${{ secrets.CERT_PWD }}  -Timestamper http://timestamp.digicert.com –NonInteractive
</pre>

<p>The above is my ‘deploy’ job that does the tasks.&#160; On line 6 is where we are retrieving the nupkg file from the artifact drop in the previous job.&#160; After that I’m using the new nuget/setup-nuget action to acquire the NuGet CLI tools for subsequent actions.&#160; At present, you cannot use dotnet CLI to sign a NuGet package so we have to use the NuGet tools directly.&#160; We’ll need this later as well so it’s good we have it now.&#160; On line 22 starts the process mentioned above to use my new action to retrieve the encoded string and put it as a temp file.&#160; One line 31 we execute the <a href="https://docs.microsoft.com/nuget/reference/cli-reference/cli-ref-sign">NuGet sign CLI command</a> to sign the package.&#160; I have a few arguments here but pay attention to the steps.cert_file.outputs.filePath one.&#160; That is the OUTPUT from the base64-to-file action.&#160; The format of steps.{ID}.outputs.{VARIABLE} is what you see here…and you can see in that step I gave it an id of ‘cert_file’ to easily pull out the variable later.</p>

<p>Now, you may have noticed that this agent job runs on windows-latest as the OS and not ubuntu.&#160; This is because presently package signing for NuGet can only be done on Windows machines.&#160; Now that we have a signed package (in the same location, we just signed it and didn’t move it) we can deploy it to package registries.</p>

<h2>Publishing the Package to NuGet</h2>

<p>Of course for a public library I want this to be available on NuGet so I’m going to publish it there.&#160; NuGet uses an API key authentication scheme which is supported in the dotnet CLI so we can use <a href="https://docs.microsoft.com/dotnet/core/tools/dotnet-nuget-push">dotnet CLI push</a> to publish:</p>

<pre class="brush: yaml; toolbar: false;">      - name: Push to NuGet
        run: dotnet nuget push nupkg\*.nupkg -k ${{ secrets.NUGET_API_KEY }} -s https://nuget.org
</pre>

<p>Could I have used the NuGet CLI?&#160; Sure, but I already was using this pattern previously so I’m sticking with this from a previous Pipeline definition.&#160; Choice is yours now that we have both CLI tools on the runner machine.&#160; Done, now on to another registry.</p>

<h2>Publishing the Package to GitHub Package Registry</h2>

<p>Publishing to the new <a href="https://github.com/features/packages">GitHub Packages Registry</a> takes one extra step.&#160; Since this is not the default location for NuGet, we have to instruct NuGet to let it know where to publish this package.&#160; In your repository you will be provided with a URL from the Packages tab of your repo:</p>

<p><img title="Screenshot of GitHub Packages tab" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of GitHub Packages tab" src="https://storage2.timheuer.com/nugegpr.png" width="1403" height="740" /></p>

<p>This is the publishing endpoint for the NuGet CLI.&#160; In our Action we will need two steps: set up the source and publish to it:</p>

<pre class="brush: yaml; toolbar: false; highlight: [2,5];">      - name: Add GPR Source
        run: nuget sources Add -Name &quot;GPR&quot; -Source ${{ secrets. GPR_URI }} -UserName ${{ GPR_USERNAME }} -Password ${{ secrets.GITHUB_TOKEN }}

      - name: Push to GitHub Packages
        run: nuget push nupkg\*.nupkg -Source &quot;GPR&quot;
</pre>

<p>In line 2 is where we set up the source we are going to later use.&#160; We can give it any name you want here.&#160; I made the other variables Secrets for my config.&#160; This also requires you to use the UserName/Password scheme as GitHub Packages doesn’t support NuGet API keys right now.&#160; Another reason we need to use the NuGet CLI here.&#160; The password you can use is provided as a default token in any GitHub Action called secrets.GITHUB_TOKEN and your repo’s actions have access to it.&#160; In line 5 then we see us using that source and pushing our package to the GitHub Packages Registry.</p>

<h2>Summary</h2>

<p>So there you have it!&#160; A GitHub Actions flow packages, signs, and publishes to two package repositories.&#160; It would be nice to standardize on one tooling CLI and I know the teams are looking for feedback here, but it is good to know that you have 2 official supported GitHub Actions in setup-dotnet and setup-nuget to use to get the tools you need.&#160; I hope this helps someone!</p>
