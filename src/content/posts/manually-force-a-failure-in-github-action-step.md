---
title: "Forcing a failure in GitHub Actions based on a condition"
slug: "manually-force-a-failure-in-github-action-step"
pubDate: 2021-04-30T17:38:58.000Z
lastModified: 2021-04-30T17:38:58.000Z
description: "Do you find the need to manually control a failure in a GitHub Actions step? Read this for quick method using a script to do so on a condition!"
categories:
  - ".net"
  - "dotnet"
  - "github"
  - "devops"
draft: false
---

<p>Last night I got tweeted at asking me how one could halt a CI workflow in GitHub Actions on a condition.&#160; This particular condition was if the code coverage tests failed a certain coverage threshold.&#160; I’m not a regular user of code coverage tools like <a href="https://github.com/coverlet-coverage/coverlet">Coverlet</a> but I went Googling for some answers and oddly did not find the obvious answer that was pointed out to me this morning.&#160; Regardless the journey to discover an alternate means was interesting to me so I’ll share what I did that I feel is super hacky, but works and is a similar method I used for passing some version information in other workflows.</p>  <p>First, the simple solution for if you are using Coverlet and want to fail a build and thus a CI workflow is to use the <a href="https://github.com/coverlet-coverage/coverlet/blob/master/Documentation/MSBuildIntegration.md">MSBuild integration option</a> and then you can simply use:</p>  <pre class="brush: bash;">dotnet test /p:CollectCoverage=true /p:Threshold=80
</pre>

<p>I honestly felt embarrassed that I didn’t find this simple option, but oh well, it is there and is definitely the simplest option if you can use this option.&#160; But there you have it.&#160; When used in an Actions workflow if the threshold isn’t met, this will fail that step and you are done.</p>

<p><img title="Picture of failed GitHub Actions step" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Picture of failed GitHub Actions step" src="https://storage2.timheuer.com/failedtest.png" width="1798" height="1035" /></p>

<h2>Creating your condition to inspect</h2>

<p>But let’s say you need to fail for a different reason or in this example here, you couldn’t use the MSBuild integration and instead are just using the VSTest integration with a collector.&#160; Well, we’ll use this code coverage scenario as an <em>example</em> but the key step here is focusing on how to fail a step.&#160; Your condition may be anything but I suspect it is usually based on some previous step’s output or value.&#160; Well first, if you are relying on previous steps values, be sure you understand the power of using <a href="https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#outputs">outputs</a>.&#160; This is I think the best way to kind of ‘set state’ of certain things in steps.&#160; A step can do some things and either in the Action itself set an Output value, or in the workflow YAML you can do this as well using a shell command and calling the <a href="https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions#setting-an-output-parameter">::set-output method</a>.&#160; Let’s look at an example…first the initial step (again using our code coverage scenario):</p>

<pre class="brush: yaml;">- name: Test
  run: dotnet test XUnit.Coverlet.Collector/XUnit.Coverlet.Collector.csproj --collect:&quot;XPlat Code Coverage&quot;
</pre>

<p>This basically will produce an XML output ‘report’ that contains the values we want to extract.&#160; Namely it’s in this snippet:</p>



<pre class="brush: xml; highlight: [2];">&lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
&lt;coverage line-rate=&quot;0.85999999999&quot; branch-rate=&quot;1&quot; version=&quot;1.9&quot; timestamp=&quot;1619804172&quot; lines-covered=&quot;15&quot; lines-valid=&quot;15&quot; branches-covered=&quot;8&quot; branches-valid=&quot;8&quot;&gt;
  &lt;sources&gt;
    &lt;source&gt;D:\&lt;/source&gt;
  &lt;/sources&gt;
  &lt;packages&gt;
    &lt;package name=&quot;Numbers&quot; line-rate=&quot;1&quot; branch-rate=&quot;1&quot; complexity=&quot;8&quot;&gt;
      &lt;classes&gt;
</pre>



<p>I want the line-rate value (line 2) in this XML to be my condition…so I’m going to create a new Actions step to extract the value by parsing the XML using a PowerShell cmdlet.&#160; Once I have that I will set the value as the <em>output</em> of this step for later use:</p>

<pre class="brush: yaml; highlight: [2,9];">- name: Get Line Rate from output
  id: get_line_rate
  shell: pwsh  
  run: |
    $covreport = get-childitem -Filter coverage.cobertura.xml -Recurse | Sort-Object -Descending -Property LastWriteTime -Top 1
    Write-Output $covreport.FullName
    [xml]$covxml = Get-Content -Path $covreport.FullName
    $lineRate = $covxml.coverage.'line-rate'
    Write-Output &quot;::set-output name=lineRate::$lineRate&quot;
</pre>

<p>As you can see in lines 2 and 9 I have set a specific ID for my step and then used the set-output method to write a value to an output of the step named ‘lineRate’ that can be later used.&#160; So now let’s use it!</p>

<h2>Evaluating your condition and failing the step manually</h2>

<p>Now that we have our condition, we want to fail the run if the condition evaluates a certain way…in our case if the code coverage line rate isn’t meeting our threshold.&#160; To do this we’re going to use a specific GitHub Action called <a href="https://github.com/actions/github-script">actions/github-script</a><strong></strong> which allows you to run some of the GitHub API directly in a script.&#160; This is great as it allows us to use the <a href="https://github.com/actions/core">core library</a> which has a set of methods for success and failure!&#160; Let’s take a look at how we combine the condition with the setting:</p>

<pre class="brush: yaml; highlight: [2,6];">- name: Check coverage tolerance
  if: ${{ steps.get_line_rate.outputs.lineRate &lt; 0.9 }}
  uses: actions/github-script@v3
  with:
    script: |
        core.setFailed('Coverage test below tolerance')
</pre>

<p>Okay, so we did a few things here.&#160; First we are defining this step as executing the core.setFailed() method…that’s specifically what this step will do, that’s it…it will fail the run with a message we put in there.&#160; <strong>*BUT*</strong> we have put a condition on the step itself using the <a href="https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#job-status-check-functions">if condition</a> checking.&#160; In line 6 we are executing the setFailed function with our custom message that will show in the runner log.&#160; On line 2 we have set the condition for if this step even runs at all.&#160; Notice we are using the ID of a previous step (get_line_rate) and the output parameter (lineRate) and then doing a quick math check.&#160; If this condition is met, then this step will run.&#160; If the condition is NOT met, this step will not run, but also doesn’t fail and the run can continue.&#160; Observe that if the condition is met, our step will fail and the run fails:</p>

<p><img title="Failed run based on condition" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Failed run based on condition" src="https://storage2.timheuer.com/failconditionstep.png" width="829" height="340" /></p>

<p>If the condition is NOT met the step is ignored, the run continues:</p>

<p><img title="Condition not met" style="margin: 0px auto; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Condition not met" src="https://storage2.timheuer.com/conditionnotmetstep.png" width="835" height="281" /></p>

<p>Boom, that’s it!&#160; </p>

<h2>Summary</h2>

<p>This was just one scenario but the key here is if you need to manually control a fail condition or otherwise evaluate conditions, using the <strong>actions/github-script</strong> Action is a simple way to do a quick insertion to control your run based on a condition.&#160; It’s quick and effective for some scenarios where your steps may not have natural success/fail exit codes that would otherwise fail your CI run.&#160; What do you think? Is there a better/easier way that I missed when you don’t have clear exit codes?</p>

<p>Hope this helps someone!</p>
