---
title: "Using GitHub Actions for Bulk Resolving"
slug: "use-github-actions-for-bulk-resolve-issues"
pubDate: 2020-12-16T06:27:06.000Z
lastModified: 2020-12-16T06:27:38.000Z
description: "Want a quick way to bulk resolve some issues in your repo? Use GitHub Actions and save time!"
categories:
  - "github"
  - "devops"
draft: false
---

<p>Today I was working on one of our internal GitHub repositories that apparently used to be used for our tooling issue tracking.&#160; I have no idea the history but a quick look at the 68 issues with the latest dating back to 2017 told me that yeah, nobody is looking at these anymore.&#160; After a quick email ack from my dev lead that I could bulk clear these out I immediately went to the repo issues list, and was about to do this:</p>  <p><img title="Screenshot of mark all as closed" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of mark all as closed" src="https://storage2.timheuer.com/bulkpost1.png" width="928" height="334" /></p>  <p>Then I realized that all that was going to do was close them without any reasoning at all.&#160; I know that closing sends a notification to people on the issue and that wasn’t the right thing to do.&#160; I quickly looked around, did some googling and didn’t find anything in the GitHub docs that would allow me to “bulk resolve and add a message” outside of adding a commit and a bunch of “close #XXX” statements.&#160; That was unrealistic.&#160; I threw it out on Twitter in hopes maybe someone had a tool already.&#160; The other debate in my head was writing some code to iterate through them and close with a message.&#160; This felt heavy for my needs, I’d need to get tokens, blah blah.&#160; I’m lazy.</p>  <p>Then I thought to myself, <em>Self, I’m pretty sure you should be able to use the ‘labeled’ trigger in GitHub Actions to automate this!</em> Thinking this way made me think that I could use a trigger to still bulk close them but the action would be able to add a message to each one.&#160; Again, a quick thinking here led me to be writing more code than I thought…but I was on the right track.&#160; Some more searching for different terms (adding actions) and I discovered the action <a href="https://github.com/actions/stale">actions/stale</a><strong></strong> to the rescue!&#160; This is a workflow designed to run on a schedule, look at ‘stale’ (to be defined by you) and label them and/or close them after certain intervals.&#160; The design looks to be something like “run every day and look for things that are X days old, label them stale, then warn that if action isn’t taken in Y days that they would be closed” – perfect for my need except I wanted to close NOW!&#160; No problem.&#160; Looking at the sample it used a schedule trigger and a CRON format for the schedule.&#160; Off to crontab.guru to help me figure out the thing I can never remember.&#160; What’s worse, regex or cron?&#160; Who knows?</p>  <p>And then it dawned on me!&#160; My favorite GitHub Actions tip is to add <strong>workflow_dispatch</strong> as one of the triggers to workflows.&#160; This allows you to manually trigger a workflow from your repo:</p>  <p><img title="Screenshot of manual workflow trigger" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of manual workflow trigger" src="https://storage2.timheuer.com/bullkpost2.png" width="884" height="406" /></p>  <p>I use this ALL the time to make sure I can not have to fake a commit or something on certain projects.&#160; This was the perfect thing I needed.&#160; The combination of workflow_dispatch and this stale action would enable me to complete this quickly.&#160; I added the following workflow to our repo:</p>    <pre class="brush: yaml; highlight: [3,15,16,17];">name: &quot;Close stale issues&quot;
on:
  workflow_dispatch:
    branches:
    - master
    
jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/stale@v3
      with:
        repo-token: ${{ secrets.GITHUB_TOKEN }}
        days-before-stale: 30
        days-before-close: 0
        stale-issue-message: 'This issue is being closed as stale'
        close-issue-message: 'This repo has been made internal and no longer tracking product issues. Closing all open stale issues.'
</pre>



<p>I just had to set a few parameters for a stale message (required) and I set the warning day basically to 0 so it would happen NOW.&#160; Then I trigger the workflow manually.&#160; Boom!&#160; The workflow ran and 2 minutes later all 68 issues were marked closed with a message that serves as the reason and the user won’t be too alarmed for some random bulk closure.</p>

<p><img title="Screenshot of GitHub message" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of GitHub message" src="https://storage2.timheuer.com/bulkpost4.png" width="1540" height="290" /></p>

<p>I’m glad I remembered that GitHub Actions aren’t just for CI/CD uses and can be used to quickly automate much more.&#160; In fact I’m writing this blog post maybe to help others, but certainly to serve as a bookmark to myself when I forget about this again.</p>

<p>Hope this helps!</p>
