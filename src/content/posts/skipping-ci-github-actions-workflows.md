---
title: "Skipping CI in GitHub Actions Workflows"
slug: "skipping-ci-github-actions-workflows"
pubDate: 2020-01-29T20:28:11.000Z
lastModified: 2020-01-29T20:28:11.000Z
description: "Add a snippet to your workflow to enable skipping CI easily from commits."
categories:
  - "github"
  - "devops"
draft: false
---

<p>One of the things that I like about Azure DevOps Pipelines is the ability to make minor changes to your code/branch but not have full CI builds happening.&#160; This is helpful when you are updating docs or README or things like that which don’t materially change the build output.&#160; In Pipelines you have the built-in functionality to put some comments in the commit message that trigger (or don’t trigger rather) the CI build to stop.&#160; The various ones that are supported are identified in ‘<a href="https://docs.microsoft.com/azure/devops/pipelines/build/triggers?view=azure-devops&amp;tabs=yaml#skipping-ci-for-individual-commits">Skipping CI for individual commits</a>’ documentation.</p>  <p>Today that functionality isn’t built-in to GitHub Actions, but you can add it as a base part of your workflows with the help of being able to get to the context of the commit before a workflow starts!&#160; Here is an example of my workflow where I look for it:</p>    <pre class="brush: yaml; toolbar: false; highlight: [10];">name: .NET Core Build and Deploy

on:
  push:
    branches:
      - master

jobs:
  build:
    if: github.event_name == 'push' &amp;&amp; contains(toJson(github.event.commits), '***NO_CI***') == false &amp;&amp; contains(toJson(github.event.commits), '[ci skip]') == false &amp;&amp; contains(toJson(github.event.commits), '[skip ci]') == false
    name: Build Package 
    runs-on: ubuntu-latest
</pre>



<p>You can see at Line 10 that I’m looking at the commit message text for: ***NO_CI***, [ci skip], or [skip ci].&#160; If any of these are present then the job there does not run.&#160; It’s as simple as that!&#160; Here is an example of my last commit where I just was updating the repo to include the build badge:</p>

<p><img title="Screenshot of a commit message on GitHub" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of a commit message on GitHub" src="https://storage2.timheuer.com/SNAG_Program-0001.png" width="826" height="428" /></p>

<p>And you can see in the workflows that it was not run:</p>

<p><img title="Screenshot of workflow status on GitHub" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of workflow status on GitHub" src="https://storage2.timheuer.com/SNAG_Program-0002.png" width="1270" height="462" /></p>

<p>A helpful little tip to add to your workflows to give you that flexibility!&#160; Hope this helps!</p>
