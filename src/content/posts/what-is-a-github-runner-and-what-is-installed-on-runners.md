---
title: "What’s a GitHub Action runner?"
slug: "what-is-a-github-runner-and-what-is-installed-on-runners"
pubDate: 2019-12-19T18:35:09.000Z
lastModified: 2019-12-19T18:35:09.000Z
description: "Find out what is on the GitHub Action runners that you can use."
categories:
  - "github"
  - "devops"
draft: false
---

<p>So what exactly is a runner and how do I know what’s in it?&#160; When you use GitHub Actions and specify:</p>  <pre class="brush: yaml; toolbar: false; highlight: [4];">jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
</pre>

<p>What exactly does that mean ‘ubuntu-latest’?&#160; Well a runner is defined as ‘a virtual machine hosted by GitHub with the GitHub Actions runner application installed.’&#160; Clear? LOL, basically it is a machine that has a target operating system (OS) as well as a set of software and/or tools you may desire for completing your job.&#160;&#160; GitHub provides a set of these pre-configured runners that you are using when you use the runs-on label and use any one of the combination of: windows-latest, ubuntu-latest (or ubuntu-18.04 or ubuntu-16.04), macosx-latest.&#160; As of this writing the matrix is documented here with also the specs of the virtual environment: <a href="https://help.github.com/en/actions/automating-your-workflow-with-github-actions/virtual-environments-for-github-hosted-runners#supported-runners-and-hardware-resources">Supported runners and hardware resources</a>.</p>

<h2>What is on a GitHub-hosted runner?</h2>

<p>I personally think it is good practice to never assume the tool you want is on the environment you didn’t create and you should always acquire the SDK, tools, etc. you need.&#160; That’s just me and possibly being overly cautious especially when a definition of a hosted runner provides the tools you need.&#160; But it makes your workflow very explicit, perhaps portable to other runners, etc.&#160; Again, I just think it is good practice.&#160; </p>

<p><img title="Runner log" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Runner log" src="https://storage2.timheuer.com/runnerlog.png" width="1464" height="635" /></p>

<p>But you may want to know what exactly you <em>can</em> use on a GitHub-hosted runner when you specify it.&#160; Luckily GitHub publishes this in the documentation <a href="https://help.github.com/en/actions/automating-your-workflow-with-github-actions/software-installed-on-github-hosted-runners">Software installed on GitHub-hosted runners</a>.&#160; For example as a .NET developer you might be interested to know that the windows-latest runner has:</p>

<ul>
  <li>Chocolatey</li>

  <li>Powershell Core</li>

  <li>Visual Studio 2019 Enterprise (as of this writing 16.4)</li>

  <li>WinAppDriver</li>

  <li>.NET Core SDK 3.1.100 (and others)</li>
</ul>

<p>This would be helpful to know that you could use choco install commands to get a new tool for your desired workflow you are trying to accomplish.&#160; What if you don’t see a tool/SDK that you think should be a part of the base image?&#160; You can <a href="https://github.com/actions/virtual-environments/issues/new?assignees=&amp;labels=t%3AEnhancement&amp;template=tool-request.md&amp;title=Update%2FAdd+%5Btool+name%5D">request to add/update a tool on a virtual environment</a> on their repo!&#160; Better yet, submit a repo if you can.</p>

<h2>How much will it cost me to use GitHub-hosted runners?</h2>

<p>Well, if you are a public repository, it’s free.&#160; If you are not a public repository your account gets a certain number of minutes per month for free before billing as well.&#160; It’s pretty generous and you can read all the details here: <a href="https://help.github.com/en/github/setting-up-and-managing-billing-and-payments-on-github/about-billing-for-github-actions#about-billing-for-github-actions">About billing for GitHub Actions</a>.&#160; In your account settings under the Billing section you can see your usage.&#160; They don’t even bother to show your usage for public repositories because it’s free.&#160; I have one private repo that I’ve used 7 minutes on this month.&#160; My bill is $0 so far.&#160; The cool thing is you can setup spending limits there as well.</p>

<h2>Can I run my own runner?</h2>

<p>Yes! Similar to Azure Pipelines you can create and host your own self-hosted runner.&#160; The GitHub team did an amazing job with the steps here and it seriously couldn’t be simpler.&#160; Details about self-hosted runners (either on your local machine, your own cloud environment, etc.) can be found in <a href="https://help.github.com/en/actions/automating-your-workflow-with-github-actions/about-self-hosted-runners">About self-hosted runners</a> documentation.&#160; Keep in mind that now the billing is on you and you should understand the security here as well because PRs and such may end up using these agents and the documentation talks all about this.&#160; But if you are needing to do this, the steps are dead simple and the page in your repo pretty much makes it fool proof for most cases:</p>

<p><img title="Screenshot of self-hosted runner config" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of self-hosted runner config" src="https://storage2.timheuer.com/selfhostedrunner.png" width="1202" height="1021" /></p>

<p>It’s good to know what is on the environment you are using for your CI/CD and also cool to know you can bring your own and still use the same workflow.&#160; I’ve experimented with both and frankly like the GitHub-hosted model the best for my projects.&#160; They don’t have unique requirements and since they are all public repositories, no cost to me.&#160; Best of all that I don’t have to now manage an environment!</p>
