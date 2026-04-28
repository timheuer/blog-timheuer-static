---
title: "Adding approval workflow to your GitHub Action"
slug: "add-approval-workflow-to-github-actions"
pubDate: 2020-12-16T22:37:24.000Z
lastModified: 2020-12-16T22:37:24.000Z
description: "Want to add an approval workflow to your GitHub Action deployment easily?  With new capabilities now you can!"
categories:
  - "github"
  - "azure"
  - "devops"
  - "dotnet"
draft: false
---

<p>One of the biggest things that I’ve wanted (and have heard others) when adopting GitHub Actions is the use of some type of approval flow.&#160; Until now (roughly the time of this writing) that wasn’t possible easily in Actions.&#160; The concept of how Azure Pipelines does it is so nice and simple to understand in my opinion and a lot of the attempts by others using various Actions stitched together made it tough to adopt.&#160; Well, announced at <a href="https://githubuniverse.com/">GitHub Universe</a>, reviewers is now in Beta for Actions customers!!!&#160; Yes!!!&#160; I spent some time setting up a flow with an ASP.NET 5 web app and Azure as my deployment to check it out.&#160; I wanted to share my write-up in hopes it might help others get started quickly as well.&#160; First I’ll acknowledge that this is the simplest getting started you can have and your workflows may be more complex, etc.&#160; If you’d like to have a primer and see some other updates on Actions, be sure to check out Chris Patterson’s session from Universe: <a href="https://githubuniverse.com/Continuous-delivery-with-GitHub-Actions/">Continuous delivery with GitHub Actions</a>.&#160; With that let’s get started!</p>  <h2></h2>  <h2>Setting things up</h2>  <p>First we’ll need a few things to get started.&#160; These are things I’m not going to walk through here but will explain <em>briefly</em> what/why it is needed for my example.</p>  <ul>   <li>An Azure account – I’m using this sample with Azure as my deployment because that’s where I do most of my work.&#160; You can <strong><a href="https://azure.com/free">get a free Azure account</a></strong> as well and do exactly this without any obligation.</li>    <li>Set up an <a href="https://docs.microsoft.com/azure/app-service/">Azure App Service</a> resource – I’m using App Service Linux and just created it using basically all the defaults.&#160; This is just a sample so those are fine for me.&#160; I also created these using the portal to have everything setup in advance.</li>    <li>I added one <a href="https://docs.microsoft.com/azure/app-service/configure-common">Application Setting</a> to my App Service called APPSERVICE_ENVIRONMENT so I could just extract a string noting which environment I was in and display it on the home page.</li>    <li>In your App Service create a <a href="https://docs.microsoft.com/azure/app-service/deploy-staging-slots">Deployment Slot</a> and name it “staging” and choose to clone the main service settings (to get the previous app setting I noted).&#160; I then changed the app setting value for this deployment slot.</li>    <li><a href="https://docs.microsoft.com/visualstudio/deployment/tutorial-import-publish-settings-azure?view=vs-2019#create-the-publish-settings-file-in-azure-app-service">Download the publish profile</a> for each your production and staging instances individually and save those somewhere for now as we’ll refer back to them in the next step.</li>    <li>I created an ASP.NET 5 Web App using the default template from Visual Studio 2019.&#160; I made some code changes in the Index.cshtml to pull from app settings, but otherwise it is unchanged.</li>    <li>I used the new Git features in Visual Studio to quickly get my app to a repository in my GitHub account and enabled Actions on that repo.</li> </ul>  <p>That’s it!&#160; With those basics set up I can get started with the next steps of building out the workflow.&#160; I should note that the steps I’m outlining here are free for GitHub public repositories.&#160; For private repositories you need to be a GitHub Enterprise Server customer.&#160; Since my sample is public I’m ready to go!</p>  <h2>Environments</h2>  <p>The first concept is <a href="https://docs.github.com/en/free-pro-team@latest/actions/reference/environments">Environments</a>.&#160; These are basically a separate segmented definition of your repo that you can associate secrets and protection rules with.&#160; This is the key to the approval workflow as one of the protection rules is reviewers required (aka approvers).&#160; The first thing we’ll do is set up two environments: staging and production.&#160; Go to your repository settings and you’ll see a new section called Environments in the navigation.&#160; </p>  <p><img title="Screenshot of environment config" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of environment config" src="https://storage2.timheuer.com/approvalpost1.png" width="1913" height="964" /></p>  <p>To create an environment, click the New Environment button and give it a name.&#160; I created one called <strong>production</strong> and one called <strong>staging</strong>.&#160; In each of these you can do things independently like secrets and reviewers.&#160; Because I’m a team of one person my reviewer will be me, but you could set up others like maybe a build engineer for staging approval deployment and a QA team for production deployment.&#160; Either way&#160; click the Required reviewers checkbox and add yourself at least and save protection rule.</p>  <blockquote>   <p><strong>NOTE</strong>: This area may expand more to further protection rules but for now it is reviewers or a wait delay.&#160; GitHub indicates others may be in the future.</p> </blockquote>  <p>Now we’ll add some secrets.&#160; With Environments, you can have independent secrets for each environment.&#160; Maybe you want to have different deployment variables, etc. for each environment, this is where you could do it.&#160; For us, this is specifically what we’ll use the different publish profiles for.&#160; Remember those profiles you downloaded earlier, now you’ll need them.&#160; In the staging environment create a new secret named AZURE_PUBLISH_PROFILE and paste in the contents of your staging publish profile.&#160; Then go to your production environment settings and do the same <strong>using the same secret name</strong> and use the production publish profile you downloaded earlier.&#160; This allows our workflow to use environment-specific secret settings when they are called, but still use the same secret name…meaning we don’t need AZURE_PUBLISH_PROFILE_STAGING naming as we’ll be marking the environment in the workflow and it will pick up secrets from that environment only (or the repo if not found there – you can have a hierarchy of secrets effectively).</p>  <p>Okay we’re done setting up the Environment in the repo…off to set up the workflow!</p>  <h2>Setting up the workflow</h2>  <p>To get me quickly started I used my own template so I could `<a href="https://timheuer.com/blog/generate-github-actions-workflow-from-cli">dotnet new workflow</a>` in my repo root using the CLI.&#160; This gives me a strawman to work with.&#160; Let’s build out the basics, we’re going to have 3 jobs: build, deploy to staging, deploy to prod.&#160; Let’s get started.&#160; The full workflow is in my repo for this post, but I’ll be extracting snippets to focus on and show relevant pieces here.</p>  <h3>Build</h3>  <p>For build I’m using my standard implementation of restore/build/publish/upload artifacts which looks like this (with some environment-specific keys):</p>  <pre class="brush: yaml;">jobs:
  build:
    name: Build
    if: github.event_name == 'push' &amp;&amp; contains(toJson(github.event.commits), '***NO_CI***') == false &amp;&amp; contains(toJson(github.event.commits), '[ci skip]') == false &amp;&amp; contains(toJson(github.event.commits), '[skip ci]') == false
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup .NET Core SDK ${{ env.DOTNET_CORE_VERSION }}
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: ${{ env.DOTNET_CORE_VERSION }}
    - name: Restore packages
      run: dotnet restore &quot;${{ env.PROJECT_PATH }}&quot;
    - name: Build app
      run: dotnet build &quot;${{ env.PROJECT_PATH }}&quot; --configuration ${{ env.CONFIGURATION }} --no-restore
    - name: Test app
      run: dotnet test &quot;${{ env.PROJECT_PATH }}&quot; --no-build
    - name: Publish app for deploy
      run: dotnet publish &quot;${{ env.PROJECT_PATH }}&quot; --configuration ${{ env.CONFIGURATION }} --no-build --output &quot;${{ env.AZURE_WEBAPP_PACKAGE_PATH }}&quot;
    - name: Publish Artifacts
      uses: actions/upload-artifact@v1.0.0
      with:
        name: webapp
        path: ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}
</pre>

<p>Notice this job is ‘build’ and ends with uploading some artifacts to the job.&#160; That’s it, the core functionality is to build/test this and store the final artifacts.</p>

<h3>Deploy to staging</h3>

<p>Next job we want is to deploy those bits to staging environment, which will be our staging slot in our Azure App Service we set up before.&#160; Here’s the workflow job definition snippet:</p>

<pre class="brush: yaml; highlight: [2,4,5,6,21,22];">  staging:
    needs: build
    name: Deploy to staging
    environment:
        name: staging
        url: ${{ steps.deploy_staging.outputs.webapp-url }}
    runs-on: ubuntu-latest
    steps:
    # Download artifacts
    - name: Download artifacts
      uses: actions/download-artifact@v2
      with:
        name: webapp

    # Deploy to App Service Linux
    - name: Deploy to Azure WebApp
      uses: azure/webapps-deploy@v2
      id: deploy_staging
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME }}
        publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
        slot-name: staging
</pre>

<p>In this job we download the previously published artifacts to be used as our app to deploy.&#160; Observe a few other things here:</p>

<ul>
  <li>I’ve declared that this job ‘needs’ the ‘build’ job to start.&#160; This ensures a sequence workflow.&#160; If build job fails, this doesn’t start.</li>

  <li>I’ve declared this job an ‘environment’ and marked it using staging which maps to the Environment name we set up on the repo settings.</li>

  <li>In the publish phase I specified the slot-name value mapping to the Azure App Service slot name we created on our resource in the portal.</li>

  <li>Specify getting the AZURE_PUBLISH_PROFILE secret from the repo</li>
</ul>

<p>You’ll also notice the ‘url’ setting on the environment.&#160; This is a cool little delighter that you should use.&#160; One of the outputs of the Azure web app deploy action is the URL to where it was deployed.&#160; I can extract that from the step and put it in this variable.&#160; GitHub Actions summary will now show this final URL in the visual map of the workflow.&#160; It is a small delighter, but you’ll see useful a bit later.&#160; Notice I don’t put any approver information in here.&#160; By declaring this in the ‘staging’ environment it will follow the protection rules we previously set up.&#160; So in fact, this job won’t run unless (1) build completes successfully and (2) the protection rules for the environment are stratified.&#160; </p>

<h3>Deploy to production</h3>

<p>Similarly to staging we have a final step to deploy to production.&#160; Here’s the definition snippet:</p>



<pre class="brush: yaml; highlight: [3,4,5,21];">  deploy:
    needs: staging
    environment:
      name: production
      url: ${{ steps.deploy_production.outputs.webapp-url }}
    name: Deploy to production
    runs-on: ubuntu-latest
    steps:
    # Download artifacts
    - name: Download artifacts
      uses: actions/download-artifact@v2
      with:
        name: webapp

    # Deploy to App Service Linux
    - name: Deploy to Azure WebApp
      id: deploy_production
      uses: azure/webapps-deploy@v2
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME }}
        publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
</pre>



<p>This is almost identical to staging except we changed:</p>

<ul>
  <li>Needs ‘staging’ to complete before this runs</li>

  <li>Changed the environment to production to follow those protection rules</li>

  <li>Removed the slot-name for deployment (default is production)</li>

  <li>Changed the URL output value to the value from this job</li>
</ul>

<p>Notice that we have the same AZURE_PUBLISH_PROFILE secret used here.&#160; Because we are declaring environments we will get the environment-specific secret in these job scopes.&#160; Helpful to have a common name and just map to different environments rather than many little ones – at least my opinion it does.</p>

<p>That’s it, we now have our full workflow to build –&gt; deploy to staging with approval –&gt; deploy to production with approval.&#160; Let’s see it in action!</p>

<h2>Trigger the workflow</h2>

<p>Once we have this workflow in fact we can commit/push this workflow file and it should trigger a run itself.&#160; Otherwise you can do a different code change/commit/push to trigger as well.&#160; We get a few things here when the run happens.</p>

<p>First we get a nicer visualization of the summary of the job:</p>

<p><img title="Screenshot of summary view" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Screenshot of summary view" src="https://storage2.timheuer.com/approvalpost4.png" width="1439" height="578" /></p>

<p>When the protection rules are hit, a few things happen.&#160; Namely the run stops and waits, but the reviewers are notified.&#160; The notification happens in standard GitHub notification means. I have email notifications and so I got an email like this:</p>

<p><img title="Picture of email notification" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Picture of email notification" src="https://storage2.timheuer.com/approvalpost2.png" width="1098" height="695" /></p>

<p>I can then click through and approve the workflow step and add comments:</p>

<p><img title="Screenshot of approval step" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Screenshot of approval step" src="https://storage2.timheuer.com/approvalpost5.png" width="1440" height="644" /></p>

<p>Once that step is approved, the job runs.&#160; On the environment job it provides a nice little progress indicator of the steps:</p>

<p><img title="Picture of progress indicator" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Picture of progress indicator" src="https://storage2.timheuer.com/approvalpost6.png" width="519" height="247" /></p>

<p>Remember that URL setting we had?&#160; Once that job finished, you’ll see it surface in that nice summary view to quickly click through and test your staging environment:</p>

<p><img title="Picture of the URL shown in summary view in step" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Picture of the URL shown in summary view in step" src="https://storage2.timheuer.com/approvalpost7.png" width="1416" height="262" /></p>

<p>Once we are satisfied with the staging environment we can then approve the next workflow and the same steps happen and we are deployed to production!</p>

<p><img title="Screenshot of final approval flow" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of final approval flow" src="https://storage2.timheuer.com/approvalpost3.png" width="1440" height="737" /></p>

<p>And we’re done!</p>

<h2>Summary</h2>

<p>The concept of approvals in Actions workflows has been a top request I’ve heard and I’m glad it is finally there!&#160; I’m in the process of adding it as an extra protection to all my public repo projects, whether it be for a web app deployment or a NuGet package publish, it is a helpful protection to put in place in your Actions.&#160; It’s rather simple to set up and if you have a relatively simple workflow it is equally simple to config and modify already to incorporate.&#160; More complex workflows might require a bit more thought but still simple to augment.&#160; I’ve posted my full sample here and the workflow file in the repo <strong><a href="https://github.com/timheuer/actions-approval-sample">timheuer/actions-approval-sample</a></strong> where you can see the <a href="https://github.com/timheuer/actions-approval-sample/blob/main/.github/workflows/build-deploy.yaml">full workflow file here</a>.&#160; This was fun to walk through and I hope this write-up helps you get started as well!</p>
