---
title: "GitHub Composite Actions are fast way to templatize workflows"
slug: "use-github-composite-actions-for-templates-in-workflows"
pubDate: 2021-12-17T18:49:16.000Z
lastModified: 2021-12-17T18:49:16.000Z
description: "Want to templatize some steps in your workflows? Check out GitHub composite Action run steps!"
categories:
  - "dotnet"
  - "github"
  - "devops"
draft: false
---

<p>I’ve had a love/hate relationship with CI/CD for a long while ever since I remember it being a thing. In those early days the ‘tools’ were basically everyone’s homegrown scripts, batch files, random daemon hosts, etc. Calling something a workflow was a stretch. It was for that reason I just wasn’t a believer, it was just too ‘hard’ for the average dev. I, like many, would build from my machine and direct deploy or copy over to file shares (NOTE: LOTS of people still do this). Well the tools have gotten WAY better across the board from many different vendors and your options for great tools exist. I’ve been privileged to work with <a href="https://twitter.com/damovisa">Damian Brady</a> and Abel Wang to educate me on the ways of CI/CD a bit. I know Damian has a mantra about right-click publish, but that only made me want to make it simpler for devs.</p>  <blockquote>   <p><strong>NOTE</strong>: Did you know that for most projects in .NET working in VS you can use <a href="https://devblogs.microsoft.com/visualstudio/using-github-actions-in-visual-studio-is-as-easy-as-right-click-and-publish/">right-click Publish to generate a CI/CD workflow</a> for you, further reducing the complexity?</p> </blockquote>  <p>Well, I’m a believer now and I make it part of my mission to improve the tool experience for .NET devs and also look to convince/advocate for .NET developers to use CI/CD even in the smallest of projects. I’ve honed my own workflows to now I truly just worry about development…releases just take care of themselves. It’s glorious and frees so much time. I go out of my way now when I see friend’s projects who are on GitHub but not using Actions, for example. Recently I was working with <a href="https://twitter.com/mkristensen/">Mads Kristensen</a> on some things and asked him if he’d consider using Actions. And in a few minutes I submitted a first PR to one of his projects showing how simple it was. I started from using my own `<a href="https://timheuer.com/blog/generate-github-actions-workflow-from-cli/">dotnet new workflow</a>` tool as not all project types support the right-click Publish—&gt;Actions work Visual Studio has done yet. This helps get started with the basics.</p>  <p>In a few back/forth with Mads he wanted to encapsulate more…the files were too busy for him LOL. Enter <a href="https://github.blog/changelog/2020-08-07-github-actions-composite-run-steps/">composite Actions</a> (or technically composite <em>run steps</em>). This was my chance to look into these as I hadn’t really had a need yet. You should read the docs, but my lay explanation is that composite run steps enable you to basically templatize some of your steps into a single encapsulation…and VERY simply.&#160; </p>  <p><img title="Screenshot of GitHub Action YAML file" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of GitHub Action YAML file" src="https://storage2.timheuer.com/steptemplates.png" width="1324" height="525" /></p>  <p>Let’s look at one example with Mads’ desires. Mads’ projects are usually <a href="https://github.com/VsixCommunity/">Visual Studio extensibility</a> projects and require a few things to build more than just the .NET SDK. In this particular instance Mads needed .NET SDK, NuGet, and MSBuild to be setup.&#160; No problem, I started out with this, because duh, why not:</p>  <pre class="brush: yaml;">  # prior portion of jobs removed for brevity
  steps:
    - name: Setup dotnet
      uses: actions/setup-dotnet@v1.9.0
      with:
        dotnet-version: 6.0.x

    - name: Setup MSBuild
      uses: microsoft/setup-msbuild@v1.1

    - name: Setup NuGet
      uses: NuGet/setup-nuget@v1.0.5
</pre>

<p>But wanting less text, we discussed and I encapsulated these three in one single step using a new composite action. <a href="https://docs.github.com/en/actions/creating-actions/creating-a-composite-action">Creating a composite action</a> is simple and enables you to deploy it in a few ways. First you can just keep these in your own repo itself without having to release anything, etc. This is helpful when yours are very repo-specific and nobody is sharing them across org/repos. Let’s look at the above and how we might encapsulate this. I still want to enable SDK version input to start so need an input parameter for that. So in the repo I’ll create two new folders in the .github/workflows folder, creating a new path called ./github/workflows/composite/bootstrap-dotnet and then place a new action.yaml file in that directory. My action.yaml file looks like this:</p>

<pre class="brush: yaml; highlight: [6,27,30];"># yaml-language-server: $schema=https://json.schemastore.org/github-action.json
name: 'Setup .NET build dependencies'
description: 'Sets up the .NET dependencies of MSBuild, SDK, NuGet'
branding:
  icon: download
  color: purple
inputs:
  dotnet-version:
    description: 'What .NET SDK version to use'
    required: true
    default: 6.0.x
  sdk:
    description: 'Setup .NET SDK'
    required: false
    default: 'true'
  msbuild:
    description: 'Setup MSBuild'
    required: false
    default: 'true'
  nuget:
    description: 'Setup NuGet'
    required: false
    default: 'true'
runs:
  using: &quot;composite&quot;
  steps:
    - name: Setup dotnet
      if: inputs.sdk == 'true'
      uses: actions/setup-dotnet@v1.9.0
      with:
        dotnet-version: ${{ inputs.dotnet-version }}

    - name: Setup MSBuild
      if: inputs.msbuild == 'true' &amp;&amp; runner.os == 'Windows'
      uses: microsoft/setup-msbuild@v1.1

    - name: Setup NuGet
      if: inputs.nuget == 'true'
      uses: NuGet/setup-nuget@v1.0.5
</pre>

<p>Let’s break it down. Composite actions still have the same setup as other custom actions enabling you to have branding/name/description/etc. as well as inputs as I’ve defined starting at line 6. I can then use these inputs in later steps (line 27/30). As you can see this action basically is a template for other steps that use other actions…simple!!! Now in the primary workflow for the project it looks like this:</p>

<pre class="brush: yaml; highlight: [14];"># yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json
name: &quot;PR Build&quot;

on: [pull_request]
      
jobs:
  build:
    name: Build 
    runs-on: windows-2022
      
    steps:
    - uses: actions/checkout@v2

    - name: Setup .NET build dependencies
      uses: ./.github/workflows/composite/bootstrap-dotnet
      with:
        nuget: 'false'
</pre>

<p>Notice the path to the workflow itself using the new folder structure (line 14). Now when this workflow runs it will bring this composite action in and also run it’s steps…beautiful. If the action is more generic and you want to move it out of the repo you can do that. In fact in this one we did just that and you can see it at <a href="https://github.com/timheuer/bootstrap-dotnet">timheuer/bootstrap-dotnet</a> and be able to use it just like any other action in your setup. An example of changed like the above is as simple as:</p>

<pre class="brush: yaml; highlight: [14];"># yaml-language-server: $schema=https://json.schemastore.org/github-workflow.json
name: &quot;PR Build&quot;

on: [pull_request]

jobs:
  build:
    name: Build 
    runs-on: windows-2022
      
    steps:
    - uses: actions/checkout@v2

    - name: Setup .NET build dependencies
      uses: timheuer/bootstrap-dotnet@v1
      with:
        nuget: 'false'
</pre>

<p>Done! What’s also great is because this still is a legit GitHub Action you can publish it on the marketplace for others to discover and use (hence the branding). <a href="https://github.com/marketplace/actions/setup-net-build-dependencies">Here is this one we just demonstrated above in the marketplace</a>: </p>

<p><img title="Screenshot of GitHub Action marketplace listing" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of GitHub Action marketplace listing" src="https://storage2.timheuer.com/setupmarketplace.png" width="1674" height="967" /></p>

<p>So that’s a simple example of truly a template/merge of other existing actions. But can you use this method to create a custom action that just uses script for example, like PowerShell? YES! Let’s take another one of these examples that uploads the VSIX from our project to the <a href="https://www.vsixgallery.com">Open VSIX gallery</a>. Mads was using a PowerShell script that does his upload for him, so I’m copying that into a new composite action and making some inputs and then he can use it.&#160; Here’s the full composite action:</p>

<pre class="brush: yaml; highlight: [6];"># yaml-language-server: $schema=https://json.schemastore.org/github-action.json
name: 'Publish to OpenVSIX Gallery'
description: 'Publishes a Visual Studio extension (VSIX) to the OpenVSIX Gallery'
branding:
  icon: upload-cloud
  color: purple
inputs:
  readme:
    description: 'Path to readme file'
    required: false
    default: ''
  vsix-file:
    description: 'Path to VSIX file'
    requried: true
runs:
  using: &quot;composite&quot;
  steps:
    - name: Publish to Gallery
      id: publish_gallery
      shell: pwsh
      run: |
        $repo = &quot;&quot;
        $issueTracker = &quot;&quot;

        # If no readme URL was specified, default to &quot;&lt;branch_name&gt;/README.md&quot;
        if (-not &quot;${{ inputs.readme }}&quot;) {
          $readmeUrl = &quot;$Env:GITHUB_REF_NAME/README.md&quot;
        } else {
          $readmeUrl = &quot;${{ inputs.readme }}&quot;
        }

        $repoUrl = &quot;$Env:GITHUB_SERVER_URL/$Env:GITHUB_REPOSITORY/&quot;

        [Reflection.Assembly]::LoadWithPartialName(&quot;System.Web&quot;) | Out-Null
        $repo = [System.Web.HttpUtility]::UrlEncode($repoUrl)
        $issueTracker = [System.Web.HttpUtility]::UrlEncode(($repoUrl + &quot;issues/&quot;))
        $readmeUrl = [System.Web.HttpUtility]::UrlEncode($readmeUrl)

        # $fileNames = (Get-ChildItem $filePath -Recurse -File)
        $vsixFile = &quot;${{ inputs.vsix-file }}&quot;
        $vsixUploadEndpoint = &quot;https://www.vsixgallery.com/api/upload&quot;

        [string]$url = ($vsixUploadEndpoint + &quot;?repo=&quot; + $repo + &quot;&amp;issuetracker=&quot; + $issueTracker + &quot;&amp;readmeUrl=&quot; + $readmeUrl)
        [byte[]]$bytes = [System.IO.File]::ReadAllBytes($vsixFile)
             
        try {
            $webclient = New-Object System.Net.WebClient
            $webclient.UploadFile($url, $vsixFile) | Out-Null
            'OK' | Write-Host -ForegroundColor Green
        }
        catch{
            'FAIL' | Write-Error
            $_.Exception.Response.Headers[&quot;x-error&quot;] | Write-Error
        }

</pre>

<p>You can see it is mostly a PowerShell script and has the inputs (line 6). And here it is in use in a project:</p>



<pre class="brush: yaml;"># other steps removed for brevity in snippet
  publish:
    runs-on: ubuntu-latest
    steps:

      - uses: actions/checkout@v2

      - name: Download Package artifact
        uses: actions/download-artifact@v2
        with:
          name: RestClientVS.vsix

      - name: Upload to Open VSIX
        uses: timheuer/openvsixpublish@v1
        with:
          vsix-file: RestClientVS.vsix
</pre>



<p>Pretty cool when your custom action is a script like this and you don’t need to do any funky containers, or have a node app that just launches pwsh.exe or stuff like that. LOVE IT! Here’s the repo for this one to see more: <a href="https://github.com/timheuer/openvsixpublish">timheuer/openvsixpublish</a>. </p>

<p>This will definitely be the first approach I consider when needing other simple actions for my projects or others. The simplicity and flexibility in ‘templatizing’ some steps is really great!</p>

<p>Hope this helps!</p>
