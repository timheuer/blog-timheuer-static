---
title: "Deploying .NET Core 3 apps as self-contained"
slug: "deploy-aspnet-core-applications-using-self-contained-dotnet-core"
pubDate: 2019-10-03T15:47:12.000Z
lastModified: 2019-10-25T19:27:10.000Z
description: "Don't wait, you can deploy your .NET Core app as self-contained today!"
categories:
  - "asp.net"
  - "dotnet"
draft: false
---


    <p>Yay! .<a href="https://devblogs.microsoft.com/dotnet/announcing-net-core-3-0/">NET Core 3.0 is now available</a>!&#160; You now are migrating your apps and want to get it to your favorite cloud hosting solution.&#160; But they may not have it quite ready yet and you are still eager to deploy to production.&#160; No worries, we have a solution for you.</p>  <p>As <a href="https://docs.microsoft.com/dotnet/core/deploying/?WT.mc_id=blog-blog-timheuer">our documentation explains</a> on different deployment models we have for .NET Core apps (simplified);</p>  <ul>   <li>Framework-dependent (FDD): you are expecting the required framework to be where you are deploying…you are just deploying your code.</li>    <li>Self-contained (SCD) : you are packaging the required libraries and runtimes needed for your code to run, not expecting any shared runtime on your endpoint.</li>    <li>Framework-dependent executable (FDE): similar to FDD, but packaged as an executable, but expects a shared runtime to exist where you are deploying</li> </ul>  <p>Ideally your favorite cloud host provider will have your desired runtime available to you in their PaaS offerings.&#160; But we’ve already established you are eager and want to get your new app there sooner.&#160; No worries, then SCD is for you.&#160; So how do you do that?&#160; Here’s some helpful hints to get you going.</p>  <p>Producing the bits for SCD deployment is a part of the ‘publish’ pipeline to get the fully functional bits in all the right formats/places for you.&#160; Here’s how you get it going in a few different environments.&#160; First, though all of these require the understanding of runtime identifier values, or RID as we affectionately call it.&#160; RIDs identify the target platform where the app will run.&#160; You can see a list of all possible values in the <a href="https://docs.microsoft.com/dotnet/core/rid-catalog?WT.mc_id=blog-blog-timheuer">RID catalog</a>.&#160; Understanding your value is key first.&#160; For this, I’m going to deploy to Azure App Service for Linux and going to use linux-64 as my RID in all samples below.&#160; This would vary based on what/where you are deploying.&#160; I am also assuming in my samples that I’m executing these commands where they know the context of where my csproj file exists.&#160; You can, of course, specify the path to your project files explicitly.</p>  <h2>dotnet CLI</h2>  <p>From the dotnet CLI you would first want to build and then publish using the RID.&#160; Why build?&#160; Well, it’s valuable to ensure your building against the RID that you will publish.&#160; Catch any build errors in advance, ya know?&#160; So from the CLI:</p>    <pre class="brush: ps; toolbar: false;">dotnet build -r linux-x64
    dontet publish --self-contained -r linux-x64
    </pre>

    <p>The key here is the ‘-r’ and ‘--self-contained’ arguments.&#160; I’m using ‘-r’ but you can also use ‘--runtime’ for the long form.&#160; What this will produce (unless you specified a different output argument) is a folder with your RID and then the publish folder within that.&#160; So for me above in my project directory it would be in \bin\release\netcoreapp3.0\linux-x64\publish and everything in that \publish is what is needed for SCD.&#160; </p>

    <p>Using the CLI is the basic you can do.&#160; Now it’s on your own to push the bits where they need to be, specify startup commands, etc.&#160; But better, you can use some tools that build on top of this CLI goodness.</p>

    <h2>Azure DevOps&#160; </h2>

    <p>Let’s first talk about DevOps.&#160; You should be using this.&#160; <strong>No let’s be real clear – USE CI/CD!!!</strong> “But I’m only myself as a developer!” So what, you should still use this.&#160; I’m a believer now and it is so simple to set up and you then just worry about committing your code and your DevOps flow/pipelines take care of build/test/publish/release for you…it’s awesome.&#160; With that out of the way, let’s show you how to do it in Azure DevOps.&#160; </p>

    <blockquote>
    <p>Honestly, if you haven’t gotten the hang of CI/CD you really should spend the time in one day and get your project configured.&#160; Whether it is Azure DevOps, GitHub Actions, AppVeyor, Jenkins, whatever, you will be better off.&#160; Azure DevOps is basically free and you’ll be happier once you’ve got it done.&#160; You owe it to yourself.&#160; But don’t worry, I explain the other ways below too.</p>
    </blockquote>

    <p>In your pipeline you would add the .NET Core task and configure it for publish (assuming you also have the build/test).&#160; This task basically calls the CLI so you put the same arguments as we just went through.&#160; Here is my task in part one:</p>

    <p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Screenshot of Azure DevOps pipeline showing publish arguments" src="https://storage2.timheuer.com/scd-devops-publish.png" /></p>

    <p>Observe the ‘Zip Published Projects’ – I enabled this because this is what will be used for Azure App Service deploy next.</p>

    <blockquote>
    <p><strong>SPECIAL NOTE</strong>: When using the ‘Use .NET Core’ task in Azure DevOps, I recommend using the major.minor.x pattern to specify the version, so in this case 3.0.x.&#160; This will ensure you get the latest patch updates for your specified major.minor version.&#160; For self-contained this is smart since you are bringing the platform runtime with you and not getting auto-updates from the platform.</p>
    </blockquote>

    <p>Then you want to deploy it, and for me to Azure App Service, I add the Azure App Service Deploy task and configure it using my published bits from the previous step.&#160; Notice I’m still specifying the Runtime Stack value (even though at the time of this writing I need to use SCD) and specifying the startup command as the folder path to my app.</p>

    <p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Screenshot of Azure DevOps pipeline showing deployment" src="https://storage2.timheuer.com/scd-devops-deploy.png" /></p>

    <p>And that’s it…now when I commit a change, these pipelines run and build/publish/deploy my app to my cloud provider without me having to worry if they have the runtime available yet or not.&#160; You should be able to do this with Azure, AWS, wherever, and still use Azure DevOps to manage your workflow (or GitHub Actions).</p>

    <p>Oh you’re a YAML person?&#160; Sorry about that…here’s basically what it looks like using Azure DevOps tasks:</p>



    <pre class="brush: plain; toolbar: false;">steps:
    # task for publish CLI command
    - task: DotNetCoreCLI@2
    displayName: Publish
    inputs:
    command: publish
    publishWebProjects: True
    arguments: '--configuration $(BuildConfiguration) --output $(build.artifactstagingdirectory) --self-contained -r linux-x64'
    zipAfterPublish: True

    #task for deploy to Azure App Service
    - task: AzureRmWebAppDeployment@4
    displayName: 'Azure App Service Deploy: tacticview'
    inputs:
    azureSubscription: 'Azure-Microsoft'
    appType: webAppLinux
    WebAppName: tacticview
    deployToSlotOrASE: true
    ResourceGroupName: 'timheuer-linuxappsvc'
    SlotName: staging
    RuntimeStack: 'DOTNETCORE|3.0'
    StartupCommand: /home/site/wwwroot/TacticView
    </pre>

    <p>So there you have it for Azure DevOps!</p>

    <h2>GitHub Actions</h2>

    <p>For GitHub Actions, it is very similar to Azure DevOps using the CLI.&#160; Here’s the relevant snippet for those steps (minus the deploy part):</p>



    <pre class="brush: plain; toolbar: false;">name: ASP.NET Core CI

    on: [push]

    jobs:
    build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: Setup .NET Core
    uses: actions/setup-dotnet@v1
    with:
    dotnet-version: 2.2.108
    - name: Build with dotnet
    run: dotnet build --configuration Release
    - name: Publish with dotnet
    run: dotnet build --configuration Release -r linux-x64 --self-contained

    </pre>

    <p>You would them want to add the deploy pieces in GitHub Actions and you can follow along with that from <a href="https://abelsquidhead.com/index.php/2019/08/30/github-actions-2-0-is-here/">Abel’s blog post</a>.</p>

    <h2>Visual Studio</h2>

    <p>I STRONGLY recommend you adopt a full CI/CD workflow for all your projects.&#160; This has gotten so simple for most cases that it would be a shame not to do that.&#160; But we do also provide means in Visual Studio tools to publish as well.&#160; In your ASP.NET Core application if you right-click and choose Publish, you’ll see the options.&#160; You first create a publish profile which walks you through <strong>where</strong> you want to publish.&#160; I won’t show that part because it can be different depending on your selection.&#160; But once complete you’ll be presented with this view:</p>

    <p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Screenshot of Visual Studio showing deployment mode option" src="https://storage2.timheuer.com/scd-vs-profile1.png" /></p>

    <p>In that view you click on the area highlighted that is labeled Deployment Mode and will be presented with the dialog to change:</p>

    <p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Screenshot of Visual Studio showing deployment mode and target runtime options" src="https://storage2.timheuer.com/scd-vs-profile2.png" /></p>

    <p>Once those two things are changed, then when you click Publish it will use the self-contained version of your app and push to whichever endpoint you chose.&#160; And you are done for Visual Studio.</p>

    <h2>VS Code</h2>

    <p>What about if you use Visual Studio Code, VS Code?&#160; With the latest release of the <a href="https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice&amp;WT.mc_id=blog-blog-timheuer">Azure App Service extension</a>, .NET projects got better support for deploying to Azure App Service.&#160; The default flow for this is simpler and doesn’t assume you want to deploy using SCD, so you have to do a bit more setup.&#160; When you have a C# project in VS Code you should get prompted (and you should accept) the option to add assets to your project.</p>

    <p><img title="" style="margin-right: auto; margin-left: auto; float: none; display: block;" alt="Screenshot of Visual Studio Code dialog requesting to add assets" src="https://storage2.timheuer.com/scd-vscode-1.png" /></p>

    <p>This adds a .vscode foler with a tasks.json file in it that looks like this:</p>



    <pre class="brush: js; toolbar: false; highlight: [17,18,19,20,21,22,23,24];">{
    &quot;version&quot;: &quot;2.0.0&quot;,
    &quot;tasks&quot;: [
    {
    &quot;label&quot;: &quot;build&quot;,
    &quot;command&quot;: &quot;dotnet&quot;,
    &quot;type&quot;: &quot;process&quot;,
    &quot;args&quot;: [
    &quot;build&quot;,
    &quot;${workspaceFolder}/testwebdeploy.csproj&quot;,
    &quot;/property:GenerateFullPaths=true&quot;,
    &quot;/consoleloggerparameters:NoSummary&quot;
    ],
    &quot;problemMatcher&quot;: &quot;$msCompile&quot;
    },
    {
    &quot;label&quot;: &quot;publish&quot;,
    &quot;command&quot;: &quot;dotnet&quot;,
    &quot;type&quot;: &quot;process&quot;,
    &quot;args&quot;: [
    &quot;publish&quot;,
    &quot;${workspaceFolder}/testwebdeploy.csproj&quot;,
    &quot;/property:GenerateFullPaths=true&quot;,
    &quot;/consoleloggerparameters:NoSummary&quot;
    ],
    &quot;problemMatcher&quot;: &quot;$msCompile&quot;
    },
    {
    &quot;label&quot;: &quot;watch&quot;,
    &quot;command&quot;: &quot;dotnet&quot;,
    &quot;type&quot;: &quot;process&quot;,
    &quot;args&quot;: [
    &quot;watch&quot;,
    &quot;run&quot;,
    &quot;${workspaceFolder}/testwebdeploy.csproj&quot;,
    &quot;/property:GenerateFullPaths=true&quot;,
    &quot;/consoleloggerparameters:NoSummary&quot;
    ],
    &quot;problemMatcher&quot;: &quot;$msCompile&quot;
    }
    ]
    }
    </pre>

    <p>Note lines 17-24 which show the CLI commands we’ve already been talking about here.&#160; So these you’d have to change to add arguments.&#160; For brevity I’m only showing the modified publish lines here to what you would need:</p>



    <pre class="brush: js; toolbar: false; highlight: [12,13,14,15,16];">{
    &quot;label&quot;: &quot;publish&quot;,
    &quot;command&quot;: &quot;dotnet&quot;,
    &quot;type&quot;: &quot;process&quot;,
    &quot;args&quot;: [
    &quot;publish&quot;,
    &quot;${workspaceFolder}&quot;,
    &quot;--configuration&quot;,
    &quot;Release&quot;,
    &quot;/property:GenerateFullPaths=true&quot;,
    &quot;/consoleloggerparameters:NoSummary&quot;,
    &quot;--runtime&quot;,
    &quot;linux-x64&quot;,
    &quot;--output&quot;,
    &quot;bin/release/netcoreapp3.0/publish&quot;,
    &quot;--self-contained&quot;,
    ],
    &quot;problemMatcher&quot;: &quot;$msCompile&quot;,
    &quot;dependsOn&quot;: &quot;clean&quot;
    }
    </pre>

    <p>But that’s not it.&#160; Remember when we talked about how the CLI publishes to a /netcoreapp3.0/&lt;RID&gt;/publish folder?&#160; You’ll need to know that for the Azure App Service deploy.&#160; Notice I added an explicit output argument here.&#160; Why?&#160; Well laziness for one.&#160; The App Service Extension when you deploy will also add a settings.json file in your .vscode folder that looks like this:</p>



    <pre class="brush: js; toolbar: false;">{
    &quot;appService.preDeployTask&quot;: &quot;publish&quot;,
    &quot;appService.deploySubpath&quot;: &quot;bin/Release/netcoreapp3.0/publish&quot;
    }
    </pre>

    <p>Notice the appService.deploySubpath argument?&#160; Well I just didn’t want to change that to /linuxx64/publish.&#160; Either way, you could have changed the argument here or in tasks.json but the bottom line is they need to match paths so the extension knows what you want to publish!&#160; With these two complete, when you choose to publish using the extension you’ll be publishing a self-contained app to your provisioned Azure App Service instance.</p>

    <p>I hope this helps get an idea of the different ways you can publish and how to use the SCD option.&#160; Realistically you don’t need to use this in cloud environments which support your framework version.&#160; In fact, as soon as they do support your version, go back in to your DevOps flow and remove the SCD argument and kick off a new release…no need to change code in your project or use your dev tools…another benefit of using DevOps – you can even do it from your phone!</p>

    <p>Thanks for reading this far!</p>
  
