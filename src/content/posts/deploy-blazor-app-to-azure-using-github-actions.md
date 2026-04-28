---
title: "Deploy a Blazor WASM site to Azure Storage using GitHub Actions"
slug: "deploy-blazor-app-to-azure-using-github-actions"
pubDate: 2019-12-12T21:39:22.000Z
lastModified: 2019-12-12T21:39:22.000Z
description: "Learn how you can deploy your Blazor WebAssembly app to Azure Storage for static site hosting using a GitHub Actions workflow!"
categories:
  - "dotnet"
  - "asp.net"
  - "github"
  - "devops"
  - "blazor"
draft: false
---

<p>I’ve been spending a lot of time looking at the GitHub Actions experience for .NET developers.&#160; Right now I’m still using Azure Pipelines for my project, <a href="https://github.com/timheuer/alexa-skills-dotnet">Alexa.NET</a>, in building, testing, and deploying to NuGet.&#160; As the tools and process for using DevOps tools for CI/CD have so vastly improved over the years, I’ve become a huge advocate for this being the means for your build/deploy steps…YES, even as a single developer or a smaller team.&#160; It simply really helps you get to a purer sense of preserving the ability for your code to live on, for others to accurately build it, and for you to have peace of mind that your code works as intended.&#160; I’m just such a huge fan now.&#160; That said, I still think there is a place for ‘right-click publish’ activities in inner-loop development.&#160; In fact, I use it regularly for a few internal apps I’ve written.&#160; For simple solutions that method works well, but I certainly don’t think I can right-click-publish a full solution to a Kubernetes environment though.&#160; I’m currently researching new tooling ways to help those ‘publish to CI/CD’ from Visual Studio (would love your opinions here) so I’ve been spending a lot more time in GitHub Actions.&#160; I decided to look at publishing a Blazor app to Azure Storage as a static site…here’s what I did.</p>  <h2>Setting up the Storage endpoint</h2>  <p>The first thing you need is an Azure Storage account.&#160; Don’t have an Azure account, no worries you can get a <a href="https://azure.com/free">Free Azure account</a> easily which includes up to 5GB of Azure Blob Storage free for the first 12 months.&#160; Worried about pricing afterwards?&#160; Well check out the <a href="https://azure.microsoft.com/en-us/pricing/calculator/?service=storage#storage91556251-d72c-4e8e-96b8-19ef29b05273">storage pricing calculator</a> and I’m sure you’ll see that even at 1TB storage it is cost-effective means of storage.&#160; But any rate, you need a storage account and here are the configuration you need.</p>  <p>First, you may already have one.&#160; As a developer do you create your infrastructure resources or are these provisioned for you by infra/devops roles in your company (leave comments)?&#160; Earlier this year at Build we enabled <a href="https://docs.microsoft.com/azure/storage/blobs/storage-blob-static-website">static website hosting in Azure Storage</a>.&#160; You first create a Storage resource (ensuring you choose v2 which is the default, but that is the version that enables this feature).&#160; After you create your resource scroll on the left and you’ll see ‘Static website' section.&#160; Here’s what the configuration looks like and let me explain a few areas here:</p>  <p><img title="Screenshot of the Static website configuration" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of the Static website configuration" src="https://storage2.timheuer.com/staticconfig.png" width="1185" height="792" />    <br />All of this configuration is under the Static website area.&#160; First you obviously need to enable it…that’s just toggling the enabled/disabled capability.&#160; Enabling this now gets you two things: 2 endpoints (basically the URI to the website) and a specific blob contianer named $web where your static content needs to live.&#160; The endpoints default map to this blob container without having to add a container name to the root URI.&#160; Remember the <strong>resource group </strong>you’ve given to your storage instance here, you will need that later.</p>  <blockquote>   <p>NOTE: You can later add CDN/custom domain to these endpoints, but I’m not covering those here.</p> </blockquote>  <p>The second thing you need is to set a default document and error page.&#160; The default document for your SPA is your root entry point, and for most frameworks I’ve seen this is indeed index.html.&#160; For Blazor WebAssembly (WASM) apps, this is also the default if you are using the template.&#160; So you set the default document as ‘index.html’ and move on.&#160; The error document path is another interesting one…you need to set this for SPA apps because right now the static website capability of Azure Storage does not account for custom routing rules.&#160; What this means is that storage will throw an HTTP 404 error message when you go to something like /somepage where it actually doesn’t exist but your SPA framework knows how to handle it.&#160; Until custom routing works on Azure Storage your error document becomes your route entry point.&#160; So for this set the error document path to also be index.html for Blazor WASM.</p>  <blockquote>   <p>NOTE: Yes this isn’t ideal for routing.&#160; On top of that it still does show an HTTP 404 actual network message even though your route is being handled.&#160; Azure Storage team has heard this request…working on advocating for y’all.</p> </blockquote>  <p>That’s it.&#160; Now you have a storage endpoint with a blob container that you can begin putting your content in and browse to using your endpoint URI provided from the portal.&#160; For a simple tool to navigate your storage, I’ve been using <a href="https://azure.microsoft.com/features/storage-explorer/">Azure Storage Explorer</a> and it is intuitive to me and works well to quickly navigate your storage account and containers (and supports multi-account!).&#160; <br /></p>  <h2>Setting up your Azure Service Principal credentials</h2>  <p>The next thing you will need is a service principal credential.&#160; This will be used to authenticate with your Azure account to be able to use DevOps tools to work on your behalf in your account.&#160; It’s a simple process if you have a standard account.&#160; I say this only because I know there might be some configurations for environments where you yourself don’t have access to create service principals and may need someone to create one on your behalf, or also there might be credentials you can already use.&#160; Either way here is the process I used.</p>  <p>I used the <a href="https://docs.microsoft.com/cli/azure/install-azure-cli?view=azure-cli-latest">Azure CLI</a> so if you don’t have that installed go ahead and grab that and install it.&#160; This should now be in your PATH environment and using your favorite terminal you should be able to start executing commands.&#160; To start out, login to the CLI using `az login` – this will launch a browser for you to authenticate via your account and then issue the token in your environment so that for the remainder of your session you’ll be authenticated.&#160; After logging in successfully running `az account show` will emit what subscription you are using and you’ll need the subscription ID later so grab that and put it somewhere on your scratch notepad for later command usage.</p>  <blockquote>   <p>NOTE: If you have more than one subscription and have not set a default subscription you should set that using the `<a href="https://docs.microsoft.com/cli/azure/manage-azure-subscriptions-azure-cli?view=azure-cli-latest">az account set</a>` command.</p> </blockquote>  <p>Now you can use the CLI to create a new service principal.&#160; To do that issue this command:</p>  <pre class="brush: bash; toolbar: false; highlight: [2];">az ad sp create-for-rbac --name &quot;myApp&quot; --role contributor \
                            --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
                            --sdk-auth
</pre>

<p>Note on line 2 here that you need to replace {subscription-id} with your own actual subscription id (the GUID) and {resource-group} with the resource group name where your storage account is located.&#160; On line 1 the “myApp” can be anything but I recommend making it meaningful as this is basically the account name of the principal.&#160; The output of this command is your service principal.&#160; The full JSON output.&#160; Save this off in a place for now as we’ll need that later to configure GitHub Actions properly.&#160; Great now to move on to the app!</p>

<h2>Create your Blazor WASM app</h2>

<p>I assume since you may be reading this far you aren’t new to Blazor and probably already have the tools.&#160; As of this writing, Blazor WASM is still in preview so you have to install the templates separately to acquire them to show up in `dotnet new` and in Visual Studio File…New Project.&#160; To do that from a terminal run:</p>

<pre class="brush: bash; toolbar: false;">dotnet new -i Microsoft.AspNetCore.Blazor.Templates::3.1.0-preview4.19579.2
</pre>

<p>Then you will be able to create a new project.&#160; I’m showing Visual Studio here and this is the WASM template:</p>

<p><img title="Screenshot of Blazor new project dialog" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of Blazor new project dialog" src="https://storage2.timheuer.com/blazornpd.png" width="1536" height="1056" /></p>

<p>In the dialog here you will see Blazor WebAssembly App and that’s what you will use.&#160; Now you have a choice to have it ASP.NET Core hosted using that checkbox, which if you were going to do other things in ASP.NET maybe that’s what you want.&#160; For the purposes of this article we are talking about just having the WASM app and having a place to host it that isn’t a web server with other content…just hosting static content and using storage to do so…so we aren’t checking that box.&#160; The result will be a Blazor WASM app with no host.&#160; Now let’s add that to GitHub.&#160; If you are using Visual Studio 16.4+ you’ll be able to take advantage of an improved flow for pushing to GitHub.&#160; Once you have your project, in the lower right click ‘Add to Source Control’ choosing Git and then you’ll see the panel to choose GitHub and create/push a repo right away.&#160; You don’t have to go to GitHub site first and clone later…all in one step:</p>

<p><img title="Animation of Visual Studio GitHub flow" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Animation of Visual Studio GitHub flow" src="https://storage2.timheuer.com/newgitflow.gif" width="1048" height="1074" /></p>

<p>Great!&#160; Now we have our WASM project and we’ve created and pushed the current bits to a new GitHub repository.&#160; Now to create the workflow.</p>

<h2>Setup the GitHub Action Workflow</h2>

<p>Now we’ve got an Azure Storage blob container, a service principal, a Blazor WASM project, and a GitHub repository…all set to configure the CI/CD flow now.&#160; First let’s put that service principal as a secret in our repository.&#160; In the settings of your repository navigate to the Secrets section and add a secret named AZURE_CREDENTIALS.&#160; The content of this is the full content of your service principal (the JSON blob) that we generated earlier:</p>

<p><img title="Screenshot of GitHub Secrets configuration" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of GitHub Secrets configuration" src="https://storage2.timheuer.com/githubsecretconfig.png" width="1133" height="1017" /></p>

<p>This saves the secret for us to use in the workflow and reference as a variable.&#160; You can add more secrets here if you’d like if you wanted to add your resource storage account name as well (probably a good idea).&#160; Secrets are isolated to the original repository so no forks get the secrets at all.&#160; Now that we have these let’s create the workflow file.</p>

<p>Today, Visual Studio isn’t too helpful in authoring the YAML files (would love your feedback here too!) but a GitHub Action is just a YAML file in a specific location in your repository: .github/workflows/azure-storage-deploy.yaml.&#160; The file name can be anything but putting it in this folder structure is what is required.&#160; You can start in the GitHub repo itself using the Actions tab and through the online editor get <em>some</em> level of completion assistance to help you navigate the YAML editing.&#160; Go to the Actions tab in your repository and create a new workflow.&#160; You’ll be offered a starter workflow based on what GitHub thinks your project is like.&#160; As of this writing it thinks Blazor apps are Jekyll workflows so you’ll need to expand and either find the .NET Core one or just start from a blank workflow yourself.</p>

<p><img title="Screenshot of GitHub Actions config" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of GitHub Actions config" src="https://storage2.timheuer.com/workflowstarter.png" width="1910" height="751" /></p>

<p>Four my workflow I want to build, publish and deploy my app.&#160; I’ve separated it into a build and deploy jobs.&#160; You can read all about the various aspects of <a href="https://github.com/features/actions">GitHub Actions in their docs</a> with regard to jobs and other syntax as I won’t try to expound upon that in this article.&#160; Here is my full YAML for the entire workflow with some key areas highlighted:</p>



<pre class="brush: yaml; toolbar: false; highlight: [5,6,7,26,27,28,29,30,39,40,41,42,45,48,51,61];">name: .NET Core Build and Deploy

on: [push]

env:
  AZURE_RESOURCE_GROUP: blazor-deployment-samples
  BLOB_STORAGE_ACCOUNT_NAME: timheuerblazorwasm

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: Setup .NET Core
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 3.1.100

    - name: Build with dotnet
      run: dotnet build --configuration Release
    
    - name: Publish with dotnet
      run: dotnet publish --configuration Release 
    
    - name: Publish artifacts
      uses: actions/upload-artifact@master
      with:
        name: webapp
        path: bin/Release/netstandard2.1/publish/BlazorApp27/dist

  deploy:
    needs: build
    name: Deploy
    runs-on: ubuntu-latest
    steps:

    # Download artifacts
    - name: Download artifacts
      uses: actions/download-artifact@master
      with:
        name: webapp

    # Authentication
    - name: Authenticate with Azure
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS  }}

    # Deploy to storage using CLI
    - name: Deploy to storage using CLI
      uses: azure/CLI@v1
      with:
        azcliversion: latest
        inlineScript: | 
          # show azure account being used
          az account show
          # az storage account upload
          az storage blob upload-batch --account-name ${{ env.BLOB_STORAGE_ACCOUNT_NAME }} -s webapp -d \$web
          # az set content type of wasm file until this is fixed by default from Azure Storage
          az storage blob update --account-name ${{ env.BLOB_STORAGE_ACCOUNT_NAME }} -c \$web -n _framework/wasm/mono.wasm --content-type application/wasm

</pre>



<p>So a few things going on here, let’s talk about them.</p>

<ul>
  <li>Lines 5-7: these are ‘local’ environment variables I set up.&#160; The storage account name is NOT the blob container name but the actual storage account name.&#160; This ideally probably should be a Secret as mentioned above.&#160; Environment variables can be set here and then placeholders reference them later.</li>

  <li>Starting at line 9 is where the ‘build’ portion is here.&#160; We checkout the code, acquire the SDK and run the build and publish commands.&#160; On line 26-30 is a step where we put the publish output to a specific artifact location for later retrieval of steps.&#160; This is good practice.</li>

  <li>Lines 40-42 is where we are now in the ‘deploy’ step of our CD and we retrieve those artifacts we previously pushed and we set them as a name ‘webapp’ that the later will use in deployment</li>

  <li>Line 45 is where we are going to first authenticate to Azure using our service principal retrieved from the Secrets.&#160; The ‘secrets’ object is not something you have to define and is part of the workflow so you just add the property you want to retrieve</li>

  <li>Line 51 is where we start the deployment to Azure using the CLI commands and our param ‘webapp’ as the source.&#160; This is the CLI command for uploading batch to storage as described in the docs for `<a href="https://docs.microsoft.com/cli/azure/storage/blob?view=azure-cli-latest#az-storage-blob-upload-batch">az storage blob upload-batch</a>`</li>

  <li>Line 61 is an additional step that we need for .wasm files.&#160; I believe this to be a bug because there is logic in the CLI to correctly map the content-type but for some reason it is not working…so for now you need to set the content-type for .wasm to `application/wasm` or the Blazor app will not work</li>
</ul>

<p>This is made possible through a series of actions: checkout, dotnetcore, azure…all brining their functionality we can draw on and configure.&#160; There are a <a href="https://azure.microsoft.com/blog/github-actions-for-azure-is-now-generally-available/">bunch of Azure GitHub Actions</a> we just released for specific tasks like deploying to App Service and such.&#160; These don’t require CLI commands but rather just provide parameters to configure.&#160; Because there is no Storage specific Action as of now, we can use the default CLI action to script what we want.&#160; It is an enabler in lieu of a more strongly-typed action.&#160; Now that we have this workflow YAML file complete we can commit and push to the repository.&#160; In doing that we now have a CI/CD action that will trigger on any push (because that’s how we configured it).&#160; We can see this action happening in my sample repo and you can see since we separate it in two jobs it will show them separately:</p>

<p><img title="Screenshot of action deployment log" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of action deployment log" src="https://storage2.timheuer.com/deploylogs.png" width="1564" height="1063" /></p>

<h2>Summary</h2>

<p>So now we have it complete end-to-end.&#160; And subsequent check-in will trigger the workflow and deploy the bits to my storage account and I can now use my Azure Storage account as a host for my static website built on Blazor WASM.&#160; This full YAML sample flow is available on my repo for this and you can examine it in more detail.</p>

<p>I would love to know how y’all are coming along using GitHub Actions with your .NET projects.&#160; Please comment below!&#160; </p>
