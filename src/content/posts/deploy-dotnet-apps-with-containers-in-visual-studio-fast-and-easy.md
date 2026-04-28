---
title: "Contain your excitement for ASP.NET on Azure"
slug: "deploy-dotnet-apps-with-containers-in-visual-studio-fast-and-easy"
pubDate: 2023-01-27T23:14:15.000Z
lastModified: 2023-01-27T23:14:15.000Z
description: "Want to quickly deploy .NET apps in containers but don't know how or want to be complex? Learn about it here!"
categories:
  - ".net"
  - "dotnet"
  - "devops"
  - "cloud"
  - "azure"
draft: false
---

<p>Okay, so I won’t quit my day job in favor of trying to come up with a witty title for a blog post.&#160; But this is one thing that I’m proud to see our team deliver: one of the fastest ways to get your ASP.NET app to a container service on Azure (or elsewhere) without having to know what containers are or learn new things.&#160; No really!</p>  <h2>Cloud native</h2>  <p>Well if you operate in the modern web world you’ve heard this term ‘cloud native’ before. And everyone has an opinion on what it means. I’m not here to pick sides and I think it means a lot of different things. One commonality it seems that most can agree on is that one aspect is of deploying a service to the cloud as ‘cloud native’ is to leverage containers.&#160; If you aren’t familiar with containers, go read here: <a href="https://azure.microsoft.com/resources/cloud-computing-dictionary/what-is-a-container/">What is a container?</a> It’s a good primer on what they are technically but also some benefits. Once you educate yourself you’ll be able to declare yourself worthy to nod your head in cloud native conversations and every once in a while throw out comments like <em>“Yeah, containers will help here for us.”</em> or something like that. Instantly you will be seen as smart and an authority and the accolades will start pouring in.&#160; But then you may actually have to do something about it in your job/app. Hey don’t blame me, you brought this on yourself with those arrogant comments! Have no fear, Visual Studio is here to help!</p>  <h2>Creating and deploying a container</h2>  <p>If you haven’t spent time working with containers, you will be likely introduced to new concepts like Docker, Dockerfile, compose, and perhaps even YAML. In creating a container, you typically need to have a definition of what your container is, and generally this will be a Dockerfile.&#160; A typical Docker file for a .NET Web API looks like this:</p>    <pre class="brush: yaml;">#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY [&quot;CommerceApi.csproj&quot;, &quot;.&quot;]
RUN dotnet restore &quot;./CommerceApi.csproj&quot;
COPY . .
WORKDIR &quot;/src/.&quot;
RUN dotnet build &quot;CommerceApi.csproj&quot; -c Release -o /app/build

FROM build AS publish
RUN dotnet publish &quot;CommerceApi.csproj&quot; -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [&quot;dotnet&quot;, &quot;CommerceApi.dll&quot;]
</pre>



<p>You can see a few concepts here that you’d have to understand and that’s not the purpose of this post. You’d then need to use Docker to build this container image and also to ‘push’ it to a container registry like <a href="https://learn.microsoft.com/azure/container-registry/container-registry-intro">Azure Container Registry</a> (ACR). For a developer this would mean you’d likely have Docker Desktop installed that brings these set of tools to you locally to execute within your developer workflow.&#160; As you develop your solution, you’ll have to keep your Dockerfile updated if it involves more projects, version changes, path changes, etc. But what if you just have a simple service, you’ve heard about containers and you just want to get it to a container service as fast as possible and simple.&#160; Well, in Visual Studio we have you covered.</p>

<h3>Publish</h3>

<p>Yeah yeah, ‘friends don’t let friends…’ – c’mon let people be (more on that later). In VS we have a great set of tools to help you rapidly get your code to various deployment endpoints. Since containers are ‘the thing’ lately as of this writing we want to help you remove concepts and get their fast as well…in partnership with Azure.&#160; Azure has a new service launched last year called <strong><a href="https://learn.microsoft.com/azure/container-apps/overview">Azure Container Apps</a></strong> (ACA), a managed container environment that helps you scale your app. It’s a great way to get started in container deployments easily and have manageability and scale.&#160; Let me show you how we help you get to ACA quickly, from your beloved IDE, with no need for a Dockerfile or other tools.&#160; You’ll start with your ASP.NET Web project and start from the Publish flow (yep, right-click publish).&#160; From their choose Azure and notice Azure Container Apps right there for you:</p>

<p><img title="Visual Studio Publish dialog" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Visual Studio Publish dialog" src="https://storage2.timheuer.com/publishazablog1.png" width="1024" height="510" /></p>

<p>After selecting that Visual Studio (VS) will help you either select existing resources that your infrastructure team helped setup for you or, if you’d like and have access to create them, create new Azure resources all from within VS easily without having to go to the portal.&#160; You can then select your ACA instance:</p>

<p><img title="Visual Studio Publish dialog with Azure" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Visual Studio Publish dialog with Azure" src="https://storage2.timheuer.com/publishazablog2.png" width="1024" height="494" /></p>

<p>And then the container registry for your image:</p>

<p><img title="Visual Studio Publish dialog with Azure" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Visual Studio Publish dialog with Azure" src="https://storage2.timheuer.com/publishazablog3.png" width="1024" height="479" /></p>

<p>Now you’ll be presented with an option on how to build the container. Notice two options because we’re nice:</p>

<p><img title="Publish with .NET SDK selection" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Publish with .NET SDK selection" src="https://storage2.timheuer.com/publishazablog4.png" width="1024" height="463" /></p>

<p>If you still have a Dockerfile and want to go that route (read below) we enable that for you as well. But the first option is leveraging the .NET SDK that you already have (using the publish targets for the SDK). Selecting this option will be the ‘fast path’ to your publishing adventure.</p>

<p>Then click finish and you’re done, you now have a profile ready to push a container image to a registry (ACR), then to a container app service (ACA) without having to create a Docker file, learn a new concept or have other tools.&#160; Click publish and you’ll see the completed results and you will now be able to strut back into your manager’s office/cube/open space bean bag and say <em>Hey boss, our service is all containerized and in the cloud ready to scale…where’s my promo?</em></p>

<p><img title="Publish summary page" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Publish summary page" src="https://storage2.timheuer.com/publishazablog5.png" width="962" height="768" /></p>

<p>VS has helped with millions of cloud deployments every month whether they be to VMs, PaaS services, Web Deploy to on-metal cloud-hosted machines, and now easily to container services like ACA.&#160; It’s very helpful and fast, especially for those dev/test scenarios as you iterate on your app with others.</p>

<h2>Leveraging continuous integration and deployment (CI/CD)</h2>

<p>But Tim, friends don’t let friends right-click publish! Pfft, again I say, do what makes you happy and productive.&#160; But also, I agree ;-).&#160; Seriously though I’ve become a believer in CI/CD for EVERYTHING I do now, no matter the size of project. It just raises the confidence of repeatable builds and creates an environment of collaboration better for other things. And here’s the good thing, VS is going to help you bootstrap your efforts here easily as well – EVEN WITH CONTAINERS! Remember that step where we selected the SDK to build our container? Well if your VS project is within a GitHub repository (free for most cases these days, you should use it!), we’ll offer to generate an Actions workflow, which is GitHub’s CI/CD system:</p>

<p><img title="Publish using CI/CD" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="Publish using CI/CD" src="https://storage2.timheuer.com/publishazablog6.png" width="1024" height="489" /></p>

<p>In choosing a CI/CD workflow, the CI system (in this case GitHub Actions) needs to know some more information: where to deploy, some credentials to use for deployment, etc. The cool thing is even in CI, Visual Studio will help you do all of this setup including retrieving and setting these values as secrets on your repo! Selecting this option would result in this summary for you:</p>

<p><img title="GitHub Actions summary page" style="margin: 0px auto; border: 0px currentcolor; border-image: none; float: none; display: block; background-image: none;" border="0" alt="GitHub Actions summary page" src="https://storage2.timheuer.com/publishazablog7.png" width="1007" height="768" /></p>

<p>And the resulting workflow in an Actions YAML file in your project:</p>



<pre class="brush: yaml;">name: Build and deploy .NET application to container app commerceapp
on:
  push:
    branches:
    - main
env:
  CONTAINER_APP_CONTAINER_NAME: commerceapi
  CONTAINER_APP_NAME: commerceapp
  CONTAINER_APP_RESOURCE_GROUP_NAME: container-apps
  CONTAINER_REGISTRY_LOGIN_SERVER: XXXXXXXXXXXX.azurecr.io
  DOTNET_CORE_VERSION: 7.0.x
  PROJECT_NAME_FOR_DOCKER: commerceapi
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout to the branch
      uses: actions/checkout@v3
    - name: Setup .NET SDK
      uses: actions/setup-dotnet@v1.8.0
      with:
        include-prerelease: True
        dotnet-version: ${{ env.DOTNET_CORE_VERSION }}
    - name: Log in to container registry
      uses: azure/docker-login@v1
      with:
        login-server: ${{ env.CONTAINER_REGISTRY_LOGIN_SERVER }}
        username: ${{ secrets.timacregistry_USERNAME_F84D }}
        password: ${{ secrets.timacregistry_PASSWORD_F84D }}
    - name: Build and push container image to registry
      run: dotnet publish -c Release -r linux-x64 -p:PublishProfile=DefaultContainer -p:ContainerImageTag=${{ github.sha }} --no-self-contained -p:ContainerRegistry=${{ env.CONTAINER_REGISTRY_LOGIN_SERVER }} -bl
    - name: Upload binlog for investigation
      uses: actions/upload-artifact@v3
      with:
        if-no-files-found: error
        name: binlog
        path: msbuild.binlog
  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
    - name: Azure Login
      uses: azure/login@v1
      with:
        creds: ${{ secrets.commerceapp_SPN }}
    - name: Deploy to containerapp
      uses: azure/CLI@v1
      with:
        inlineScript: &gt;
          az config set extension.use_dynamic_install=yes_without_prompt

          az containerapp registry set --name ${{ env.CONTAINER_APP_NAME }} --resource-group ${{ env.CONTAINER_APP_RESOURCE_GROUP_NAME }} --server ${{ env.CONTAINER_REGISTRY_LOGIN_SERVER }} --username ${{ secrets.timacregistry_USERNAME_F84D }} --password ${{ secrets.timacregistry_PASSWORD_F84D }}

          az containerapp update --name ${{ env.CONTAINER_APP_NAME }} --container-name ${{ env.CONTAINER_APP_CONTAINER_NAME }} --resource-group ${{ env.CONTAINER_APP_RESOURCE_GROUP_NAME }} --image ${{ env.CONTAINER_REGISTRY_LOGIN_SERVER }}/${{ env.PROJECT_NAME_FOR_DOCKER }}:${{ github.sha }}
    - name: logout
      run: &gt;
        az logout

</pre>



<p>Boom! So now you CAN use right-click publish and still get started with CI/CD deploying to the cloud!&#160; Strut right back into that office: <em>Hey boss, I took the extra step and setup our initial CI/CD workflow for the container service so the team can just focus on coding and checking it in…gonna take the rest of the week off.</em></p>

<h2>Cool, but I have advanced needs…</h2>

<p>Now, now I know there will be always cases where your needs are different, this is too simple, etc. and YOU ARE RIGHT! There are limitations to this approach which we outlined in our <a href="https://devblogs.microsoft.com/dotnet/announcing-builtin-container-support-for-the-dotnet-sdk/">initial support for the SDK container build capabilities</a>.&#160; Things like customizing your base container image, tag names, ports, etc. are all easily customizable in your project file as they feed into the build pipeline, so we have you covered on this type of customization. As your solution grows and your particular full microservices needs get more complex, you may outgrow this simplicity…we hope that means your app is hugely successful and profits are rolling in for your app! You’ll likely grow into the Dockerfile scenarios and that’s okay…you’ll have identified your needs and have already setup your starting CI/CD workflow that you can progressively also grow as needed. We will continue to listen and see about ways we can improve this capability as developers like you give us feedback!</p>

<h2>Summary</h2>

<p>Our goal in Visual Studio is to help you be productive with a range of tasks. Moving to ‘cloud native’ can be another thing that your team has to worry about and as you start your journey (or perhaps looking to simplify a bit) VS aims to be your partner there and continue to help you be productive in getting your code to the cloud quickly with as much friction removed from your normal workflow. Here’s a few links to read more in more corporate speak about these capabilities:</p>

<ul>
  <li><a href="https://devblogs.microsoft.com/dotnet/announcing-builtin-container-support-for-the-dotnet-sdk/">Announcing built-in container support for the .NET SDK</a></li>

  <li><a href="https://learn.microsoft.com/en-us/azure/container-apps/deploy-visual-studio">Tutorial: Deploy to Azure Container Apps using Visual Studio</a></li>

  <li><a href="https://docs.docker.com/engine/reference/builder/">Dockerfile reference</a></li>

  <li><a href="https://learn.microsoft.com/en-us/azure/container-apps/overview">Azure Container Apps</a></li>

  <li><a href="https://twitter.com/VisualStudio">@VisualStudio team on Twitter</a></li>
</ul>

<p>Thanks for reading!</p>
