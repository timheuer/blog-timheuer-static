---
title: "Anatomy of a .NET devcontainer"
slug: "anatomy-of-a-dotnet-devcontainer"
pubDate: 2023-10-25T17:40:56.000Z
lastModified: 2023-10-25T17:47:10.000Z
description: "Wondering how the new .NET Codespaces environment is configured? Check out the devcontainer definition to learn more and how you can do this too!"
categories:
  - "dotnet"
  - "codespaces"
  - "github"
draft: false
---

<div>Recently, the .NET team released a starter Codespaces definition for .NET.&#160; There is a great narrated overview of this and the benefit, uses, etc. by the great <a href="https://twitter.com/JamesMontemagno">James Montemagno</a> you can watch here: </div>  <p><a href="https://www.youtube.com/watch?v=bJ8vfsqr4h0">Unbelievable Instant .NET Development Setup</a>. It is available when you visit <a href="https://github.com/codespaces">https://github.com/codespaces</a> and you can start using it immediately.</p>  <div></div>  <p><img title="Screenshot of Codespaces Quickstarts" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of Codespaces Quickstarts" src="https://storage2.timheuer.com/cshomepage.png" width="1026" height="661" /></p>  <div></div>  <p>Codespaces are built off of the devcontainer mechanism, which allows you to define the environment in a bunch of different ways using container images or just a devcontainer image.&#160; I won’t go through all the options you can do with devcontainers, but will share the anatomy of this and what I like about it.</p>  <div></div>  <blockquote>   <p>NOTE: If you don’t know what Development Containers are, you can read about them here <a title="https://containers.dev/" href="https://containers.dev/">https://containers.dev/</a></p> </blockquote>  <div></div>  <p>Throughout this post I’ll be referring to snippets of the definition but you can find the FULL definition here: <a href="https://github.com/github/dotnet-codespaces/blob/main/.devcontainer/devcontainer.json">github/dotnet-codespaces</a>.</p>  <div></div>  <h2>Base Image</h2>  <div></div>  <p>Let’s start with the base image. This is the starting point of the devcontainer, the OS, and pre-configurations built-in, etc. You can use a Dockerfile definition or a pre-defined container image. I think if you have everything bundled nicely in an existing container image in a registry, start there. Just so happens, .NET does this and has nice images with the SDK already in them, so let’s use that!</p>  <div></div>  <div>   <pre class="brush: json; toolbar: false; highlight: [3];">{
    &quot;name&quot;: &quot;.NET in Codespaces&quot;,
    &quot;image&quot;: &quot;mcr.microsoft.com/dotnet/sdk:8.0&quot;,
    ...
}
  </pre>
</div>

<div></div>

<p>This uses the definition from our own container images defined here: <a title="https://hub.docker.com/_/microsoft-dotnet-sdk/" href="https://hub.docker.com/_/microsoft-dotnet-sdk/">https://hub.docker.com/_/microsoft-dotnet-sdk/</a>. Again this allows us a great/simple starting point.</p>

<div></div>

<h2>Features</h2>

<div></div>

<p>In the devcontainer world you can define ‘features’ which are like little extensions someone else has done to make it easy to add/inject into the base image. One aspect of adding things can be done through pre/post scripts, but if someone has created a ‘feature’ in the devcontainer world, this makes it super easy as you delegate that setup to this feature owner. For this image we’ve added a few features:</p>

<pre class="brush: json; toolbar: false; highlight: [4];">{
    &quot;name&quot;: &quot;.NET in Codespaces&quot;,
    &quot;image&quot;: &quot;mcr.microsoft.com/dotnet/sdk:8.0&quot;,
    &quot;features&quot;: {
        &quot;ghcr.io/devcontainers/features/docker-in-docker:2&quot;: {},
        &quot;ghcr.io/devcontainers/features/github-cli:1&quot;: {
            &quot;version&quot;: &quot;2&quot;
        },
        &quot;ghcr.io/devcontainers/features/powershell:1&quot;: {
            &quot;version&quot;: &quot;latest&quot;
        },
        &quot;ghcr.io/azure/azure-dev/azd:0&quot;: {
            &quot;version&quot;: &quot;latest&quot;
        },
        &quot;ghcr.io/devcontainers/features/common-utils:2&quot;: {},
        &quot;ghcr.io/devcontainers/features/dotnet:2&quot;: {
            &quot;version&quot;: &quot;none&quot;,
            &quot;dotnetRuntimeVersions&quot;: &quot;7.0&quot;,
            &quot;aspNetCoreRuntimeVersions&quot;: &quot;7.0&quot;
        }
    },
    ...
}
</pre>

<p>So here we see that the following are added:</p>

<ul>
  <li>Docker in docker – helps us use other docker-based features</li>

  <li><a href="https://cli.github.com">GitHub CLI</a> – why not, you’re using GitHub so this adds some quick CLI-based commands</li>

  <li>PowerShell – an alternate shell that .NET developers love</li>

  <li><a href="https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/overview">AZD</a> – the Azure Developer CLI which helps with quick configuration and deployment to Azure</li>

  <li>Common Utilities – check out the definition for more info here</li>

  <li>.NET features – even though we are using a base image, in this case .NET 8, there may be additional runtimes we need so we can use this to bring in more. In this case this is needed for one of our extensions customizations that need the .NET 7 runtime.</li>
</ul>

<p>This enables the base image to append additional functionality when this devcontainer is used. </p>

<div></div>

<h2>Extras</h2>

<div></div>

<p>You can configure more extras through a few more properties like customizations (for environments) and pre/post commands.</p>

<h3></h3>

<div></div>

<h3>Customizations</h3>

<p>The most common used configuration of this section is to bring in extensions for VS Code. Since Codespaces default uses VS Code, this is helpful and also carries forward if you use VS Code locally with devcontainers (which you can do!). </p>

<pre class="brush: json; toolbar: false; highlight: [5,6];">{
    &quot;name&quot;: &quot;.NET in Codespaces&quot;,
    ...
    &quot;customizations&quot;: {
        &quot;vscode&quot;: {
            &quot;extensions&quot;: [
                &quot;ms-vscode.vscode-node-azure-pack&quot;,
                &quot;github.vscode-github-actions&quot;,
                &quot;GitHub.copilot&quot;,
                &quot;GitHub.vscode-github-actions&quot;,
                &quot;ms-dotnettools.vscode-dotnet-runtime&quot;,
                &quot;ms-dotnettools.csdevkit&quot;,
                &quot;ms-dotnetools.csharp&quot;
            ]
        }
    },
    ...
}
</pre>

<p>In this snippet we see that some VS Code definitions will be installed for us to get started quickly:</p>

<ul>
  <li>Azure Extensions – a set of Azure extensions to help you quickly work with Azure when ready</li>

  <li>GitHub Actions – view your repo’s CI/CD activity</li>

  <li>Copilot – AI-assisted code development</li>

  <li>.NET Runtime – this helps with any runtime acquisitions needed by activity or other extensions</li>

  <li>C#/C# Dev Kit – extensions for C# development to make you more productive in the editor</li>
</ul>

<p>It’s a great way to configure your dev environment to be ready to start when you use devcontainers without spending time hunting down extensions again.</p>

<ul></ul>

<h3>Commands</h3>

<p>Additionally you can do some post-create commands that may be used to warm-up environments, etc. An example here:</p>

<pre class="brush: json; toolbar: false; highlight: [8];">{
    &quot;name&quot;: &quot;.NET in Codespaces&quot;,
    ...
    &quot;forwardPorts&quot;: [
        8080,
        8081
    ],
    &quot;postCreateCommand&quot;: &quot;cd ./SampleApp &amp;&amp; dotnet restore&quot;,
    ...
}
</pre>

<p>This is used to get the sample source ready to use immediately by restoring dependencies or other commands, in this case running the restore command on the sample app.</p>

<h2>Summary</h2>

<div></div>

<p>I am loving devcontainers. Every time I work on a new repository or anything I’m now looking first for a devcontainer to help me quickly get started. For example, I recently explored a Go app/repo and don’t have any of the Go dev tools on my local machine and it didn’t matter. The presence of a devcontainer allowed me to immediately get started with the repo with the dependencies and tools and let me get comfortable. And portable as I can navigate from machine-to-machine with Codespaces and have the same setup needed by using devcontainers!</p>

<p>Hope this little insight helps.&#160; Check out devcontainers and if you are a repo owner, please add one to your Open Source project if possible!</p>

<div></div>
