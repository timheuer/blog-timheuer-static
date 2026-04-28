---
title: "Creating a GitHub Action to aid Issue notifications"
slug: "creating-a-github-action-for-monitoring-issues"
pubDate: 2019-11-19T17:29:41.000Z
lastModified: 2019-11-19T17:29:41.000Z
description: "I created a new GitHub Action that enabled a bit more granular notifications around Issues logged on repos."
categories:
  - "github"
  - "devops"
draft: false
---

<p>I’ve been doing a lot of playing around with <a href="https://github.com/features/actions">GitHub Actions</a> lately.&#160; GitHub has had access to repo activity via webhook capabilities for a while.&#160; Actions basically gives similar capabilities in a DevOps flow on the repo itself, where the code for your ‘hook’ is an asset in the repo…using YAML configuration.&#160; Recently an idea came up in one of our teams to provide better pro-active notification of certain types of Issues on our repos.&#160; In GitHub, you can monitor activity in a few ways as a consumer: watching the repo and subscribing to a conversation.&#160; In watching a repo you get a lot of noise of lots of notifications.&#160; In subscribing to an Issue you can only do so after the issue is created and not notification when it is initially created.&#160; What I wanted was simple: <em>Notify me when an Issue is added to a repo that has been labeled as a breaking change.</em>&#160; So with that goal I set off to create this.</p>  <h2>Creating the Action</h2>  <p>Creating the action was simple.&#160; I followed the great <a href="https://github.com/actions/javascript-action">javascript-action template</a>.&#160; I recommend following the instructions in the template rather than the actual documentation as it is simpler to follow and more concise.&#160; The cool thing about the template is you can click ‘Use this template’ and get a new repo for your action quickly:</p>  <p><img title="actionstemplate1" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="actionstemplate1" src="https://storage2.timheuer.com/actionstemplate1.png" width="1240" height="258" /></p>  <p>I was able to configure my action quickly.&#160; My goal was to accomplish the following things:</p>  <ul>   <li>Look at an Issue </li>    <li>If the issue had a specific (or multiple) labels grab the content of the issue</li>    <li>Convert the contents from markdown to HTML and send an email to a set of folks</li> </ul>  <p>Actions are JavaScript apps and I was able to use two libraries to help me achieve this quickly: <a href="https://github.com/jonschlinkert/remarkable">remarkable</a> (to convert Markdown) and SendGrid (to email).&#160; Aside from those you are able to use GitHub core SDKs to get access to the ‘context’ of what that Action is…well, acting upon.&#160; In having this context, I can examine the payload and the specific Issue within that payload.&#160; It looks something like this (relevant lines highlighted):</p>  <pre class="brush: js; toolbar: false; highlight: [23,24];">var core = require('@actions/core');
var github = require('@actions/github');
var sendgrid = require('@sendgrid/mail');
var moment = require('moment');
var Remarkable = require('remarkable').Remarkable;
var shouldNotify = false;

// most @actions toolkit packages have async methods
async function run() {
  try { 
    // set SendGrid API Key
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

    // get all the input variables
    var fromEmail = core.getInput('fromMailAddress');
    var toEmail = core.getInput('toMailAddress');
    var subject = core.getInput('subject');
    var verbose = core.getInput('verbose');
    var labelsToMonitor = core.getInput('labelsToMonitor').split(&quot;,&quot;);
    var subjectPrefix = core.getInput('subjectPrefix');

    // check to make sure we match any of the labels first
    var context = github.context;
    var issue = context.payload.issue;
</pre>

<p>This context gives me all I need to inspect the Issue contents, labels, etc.&#160; From that then I can decide that I need to perform the notification, convert, and send the email.&#160; Simple and done.</p>

<h2>Consuming the Action</h2>

<p>Since the Action is now defined, something needs to consume it.&#160; This is in the form of a <a href="https://help.github.com/en/actions/automating-your-workflow-with-github-actions/configuring-workflows">GitHub Workflow</a>.&#160; This is a YAML file that decides when to operate and what to do.&#160; Specifically you define a <a href="https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows">Trigger</a>.&#160; These can be things like when a push happens, a PR is issued, or, in my case, when an Issue happens.&#160; So now on my repo I can <strong>consume</strong> the action and decide when it should operate.&#160; As an example here is how I’m consuming it by putting a yaml file in .github/workflows folder in my repo.</p>



<pre class="brush: plain; toolbar: false; highlight: [3,4,11];">name: &quot;bc-notification&quot;
on: 
  issues:
    types: [edited, labeled]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: timheuer/issue-notifier@v1.0.2
      env:
        SENDGRID_API_KEY: ${{ secrets.SENDGRID_API }}
      with:
        fromMailAddress: '${{ secrets.BC_NOTIFY }}'
        toMailAddress: '${{ secrets.BC_NOTIFY }}'
        subject: 'BC:'
        subjectPrefix: 'BC:'
        labelsToMonitor: &quot;Breaking change&quot;
</pre>



<p>Looking at this workflow you can see in the highlighted areas that I’m triggering on Issues, and then secondarily only when they are edited or labeled.&#160; Then later on this workflow defines using my new action I created (and now published as a tagged version) called issue-notifier.&#160; Done.&#160; Now whenever an Issue is labeled as a breaking change in this repo and email is sent to a set of partners via email proactively without them having knowledge that there may be something they want to subscribe to in the repo.&#160; Here is an example of seeing it triggered:</p>

<p><img title="issuesampleanim" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="issuesampleanim" src="https://storage2.timheuer.com/issuesampleanim.gif" width="1920" height="970" /></p>

<p>and the result notification in my inbox:</p>

<p><img title="samplemail" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="samplemail" src="https://storage2.timheuer.com/samplemail.png" width="1135" height="906" /></p>

<h2>Dev experience for Actions</h2>

<p>I’ve had a good experience working with GitHub Actions and learning the various ways of automating a few things beyond just build in my repos.&#160; My #1 wish for the ‘inner loop’ experience in creating Actions is the debugging experience.&#160; You have to actually push the workflow and trigger it so ‘test’ it.&#160; This leads to a slow inner-loop development flow.&#160; It would be nice to have some more local runner capability to streamline this process and not muddy the repo with a bunch of check-ins fixing dumb things as you are iterating.</p>

<p>Anyhow, if you want to use this action I created, feel free: <a href="https://github.com/marketplace/actions/github-issue-notifier">https://github.com/marketplace/actions/github-issue-notifier</a></p>
