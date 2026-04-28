---
title: "Different ways to host Blazor WebAssembly (Wasm)"
slug: "deploy-blazor-webassembly-applications-on-azure-using-github-actions-wasm"
pubDate: 2020-05-12T00:01:36.000Z
lastModified: 2020-05-12T00:01:36.000Z
description: "Read this to look at different ways to host/deploy your Blazor WebAssembly client apps on Azure."
categories:
  - "blazor"
  - "aspnet"
  - "dotnet"
  - "github"
  - "devops"
draft: false
---

<p>Everyone!&#160; As a part of my responsibilities on the Visual Studio team for .NET tools I try to spend the time using our products in various different ways, learning what pitfalls customers may face and ways to solve them.&#160; I work a lot with Azure services and how to deploy apps and I’m a fan of GitHub Actions so I thought I’d share some of my latest experiments.&#160; This post will outline the various ways as of this writing you can host Blazor WebAssembly (Wasm) applications.&#160; We actually have some great documentation on this topic in the <a href="https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/webassembly?view=aspnetcore-3.1#standalone-deployment">Standalone Deployment</a> section of our docs but I wanted to take it a bit further and demonstrate the GitHub Actions deployment of those options to Azure using the <a href="https://github.com/Azure/actions">Azure GitHub Actions</a>.</p>  <p>Let’s get started!</p>  <p>If you don’t know what Blazor Wasm is then you should read a bit about <a href="https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor">What is Blazor</a> on our docs.&#160; Blazor Wasm enables you to write your web application front-end using C# with .NET running in the browser.&#160; This is different than previous models that enabled you to write C# in the browser like Silverlight where a separate plug-in was required to enable this.&#160; With modern web standards and browser, <a href="https://webassembly.org/">WebAssembly</a> has emerged as a standard to enable compilation of high-level languages for web deployment via browsers.&#160; Blazor enables you to use C# and create your web app from front-end to back-end using a single language and .NET.&#160; It’s great.&#160; When you create a Blazor Wasm project and publish the output you are essentially creating a static site with assets that can be deployed to various places as there is no hard server requirement (other than to be able to serve the content and mime types).&#160; Let’s explore these options…</p>  <h2>ASP.NET Core-hosted</h2>  <p>For sure the simplest way to host Blazor Wasm would be to also use ASP.NET Core web app to serve it.&#160; ASP.NET Core is cross-platform and can run pretty much anywhere.&#160; If you are likely using C# for all your development, this is likely the scenario you’d be using anyway and you can deploy your web app, which would container your Blazor Wasm assets as well to the same location (Linux, Windows, containers).&#160; When creating a Blazor Wasm site you can choose this option in Visual Studio by selecting these options:</p>  <p><img title="Blazor Wasm creation in Visual Studio" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Blazor Wasm creation in Visual Studio" src="https://storage2.timheuer.com/bwasm-hosting-vs1.png" width="1458" height="775" /></p>  <p>or using the dotnet CLI using this method:</p>  <pre class="brush: bash;">dotnet new blazorwasm --hosted -o YourProjectName
</pre>

<p>Both of these create a solution with a Blazor Wasm client app, ASP.NET Core Server app, and a shared (optional) library project for sharing code between the two (like models or things like that).&#160; This is an awesome option and your deployment method would follow the same method of deploying the ASP.NET Core app you’d already be using.&#160; I won’t focus on that here as it isn’t particularly unique.&#160; One advantage of using this method is ASP.NET Core already has middleware to properly serve the pre-compressed Brotli/gzip formats of your Blazor Wasm assets from the server, reducing the payload across the wire.&#160; You’ll see more of this in below options, but using ASP.NET Core does this automatically for you.&#160; You can deploy your app to Azure App Service or really anywhere else easily. </p>

<p>Benefits:</p>

<ul>
  <li>You’re deploying a ‘solution’ of your full app in one place, using the same tech to host the front/back end code</li>

  <li>ASP.NET Core enables a set of middleware for you for Blazor routing and compression</li>
</ul>

<p>Be Aware:</p>

<ul>
  <li>Basically billing.&#160; Know that you would most likely host in an App Service or non-serverless (consumption) model.&#160; It’s not a negative, just an awareness.</li>
</ul>

<h2>Azure Storage</h2>

<p><img src="https://github.com/timheuer/blazor-deploy-sample/workflows/.NET%20Core%20Build%20and%20Deploy%20(Storage)/badge.svg" /></p>

<p>If you just have the Blazor Wasm site and are calling in to a set of web APIs, serverless functions, or whatever and you just want to host the Wasm app only then using Storage is an option.&#160; I actually already wrote about this previously in this blog post <a href="https://timheuer.com/blog/deploy-blazor-app-to-azure-using-github-actions">Deploy a Blazor Wasm Site to Azure Storage Using GitHub Actions</a> so I won’t repeat it here…go over there and read that detail.</p>

<p>Example GitHub Action Deployment to Azure Storage: <a href="https://github.com/timheuer/blazor-deploy-sample/blob/master/.github/workflows/azure-storage-deploy.yml">azure-deploy-storage.yml</a></p>

<p>Benefits:</p>

<ul>
  <li>Consumption-based billing for storage.&#160; You aren’t paying for ‘on all the time’ compute</li>

  <li>Blob-storage managed (many different tools to see the content)</li>
</ul>

<p>Be Aware:</p>

<ul>
  <li>Routing: errors will need to be routed to index.html as well and even though they will be ‘successful’ routes, it will still be an HTTP 404 response code.&#160; This could be mitigated by adding Azure CDN in front of your storage and using more granular rewrite rules (but this is also an additional service)</li>

  <li>Pre-compressed assets won’t be served as there is no middleware/server to automatically detect and serve these files.&#160; Your app will be larger than it could be if serving the compressed brotli/gzip assets.</li>
</ul>

<h2>Azure App Service (Windows)</h2>

<p><img src="https://github.com/timheuer/blazor-deploy-sample/workflows/.NET%20Core%20Build%20and%20Deploy%20(AppSvc%20Win)/badge.svg" /></p>

<p>You can directly publish your Blazor Wasm client app to Azure App Service for Windows.&#160; When you publish a Blazor Wasm app, we provide a little web.config in the published output (unless you supply your own) and this contains some rewrite information for routing to index.html.&#160; Since App Service for Windows uses IIS when you publish this output this web.config is used and will help your app routing.&#160; You can also publish from Visual Studio using this method as well:</p>

<p><a href="https://storage2.timheuer.com/bwasm-hosting-vs2.png"><img title="Visual Studio publish dialog" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Visual Studio publish dialog" src="https://storage2.timheuer.com/bwasm-hosting-vs2_thumb.png" width="1537" height="656" /></a></p>

<p>or using GitHub Actions easily using the Azure Actions.&#160; Without the ASP.NET Core host you will want to provide IIS with better hinting on the pre-compressed files as well.&#160; This is documented in our <a href="https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/webassembly?view=aspnetcore-3.1#brotli-and-gzip-compression">Brotli and Gzip documentation</a> section and a sample web.config is also provided in this sample repo.&#160; This web.config in the root of your project (not in the wwwroot) will be used during publish instead of the pre-configured one we would provide if there was none.</p>

<p>Example GitHub Action Deployment to Azure App Service for Windows: <a href="https://github.com/timheuer/blazor-deploy-sample/blob/master/.github/workflows/azure-app-svc-windows-deploy.yml">azure-app-svc-windows-deploy.yml</a></p>

<p>Benefits:</p>

<ul>
  <li>Easy deployment and default routing configuration provided in published output</li>

  <li>Managed PaaS</li>

  <li>Publish easily from Actions or Visual Studio</li>
</ul>

<p>Be Aware:</p>

<ul>
  <li>Really just understanding your billing choices for the App Service</li>
</ul>

<h2>Azure App Service (Linux w/Containers)</h2>

<p><img src="https://github.com/timheuer/blazor-deploy-sample/workflows/.NET%20Core%20Build%20and%20Deploy%20(Container)/badge.svg" /></p>

<p>If you like containers, you can put your Blazor Wasm app in a container and deploy that where supported, including Azure App Service Containers!&#160; This enables you to encapsulate a little bit more in your own container image and also control the configuration of the server a bit more.&#160; For Linux, you’d be able to specify a specific OS image you want to host your app and even supply the configuration of that server.&#160; This is nice because we need to do a bit of that for some routing rules for the Wasm app.&#160; Here is an example of a Docker file that can be used to host a Blazor Wasm app:</p>

<pre class="brush: bash; highlight: [8-19,23-24];">FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

COPY . ./
WORKDIR /app/
RUN dotnet publish -c Release

FROM nginx:1.18.0 AS build
WORKDIR /src
RUN apt-get update &amp;&amp; apt-get install -y git wget build-essential libssl-dev libpcre3-dev zlib1g-dev
RUN CONFARGS=$(nginx -V 2&gt;&amp;1 | sed -n -e 's/^.*arguments: //p') \
    git clone https://github.com/google/ngx_brotli.git &amp;&amp; \
    cd ngx_brotli &amp;&amp; git submodule update --init &amp;&amp; cd .. &amp;&amp; \
    wget -nv http://nginx.org/download/nginx-1.18.0.tar.gz -O - | tar -xz &amp;&amp; \
    cd nginx-1.18.0 &amp;&amp; \ 
    ./configure --with-compat $CONFARGS --add-dynamic-module=../ngx_brotli

WORKDIR nginx-1.18.0
RUN    make modules

FROM nginx:1.18.0 as final

COPY --from=build /src/nginx-1.18.0/objs/ngx_http_brotli_filter_module.so /usr/lib/nginx/modules/
COPY --from=build /src/nginx-1.18.0/objs/ngx_http_brotli_static_module.so /usr/lib/nginx/modules/

WORKDIR /var/www/web
COPY --from=build-env /app/bin/Release/netstandard2.1/publish/wwwroot .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
</pre>

<p>In this configuration we’re using an image to first build/publish our Blazor Wasm app, then using the nginx:1.18.0 image as our base and building the nginx_brotli compression modules we want to use (lines 8-19,23-24).&#160; We want to supply some configuration information to the nginx server and we supply an nginx.conf file that looks like this:</p>

<pre class="brush: bash;">load_module modules/ngx_http_brotli_filter_module.so;
load_module modules/ngx_http_brotli_static_module.so;
events { }
http {
    include mime.types;
    types {
        application/wasm wasm;
    }
    server {
        listen 80;
        index index.html;

        location / {
            root /var/www/web;
            try_files $uri $uri/ /index.html =404;
        }

        brotli_static on;
        brotli_types text/plain text/css application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript image/x-icon image/vnd.microsoft.icon image/bmp image/svg+xml application/octet-stream application/wasm;
        gzip on;
        gzip_types      text/plain application/xml application/x-msdownload application/json application/wasm application/octet-stream;
        gzip_proxied    no-cache no-store private expired auth;
        gzip_min_length 1000;
        
    }
}
</pre>

<p>Now when we deploy the Docker image is composed, provided to Azure Container Registry and then deployed to App Service for us.&#160; In the above example, the first two lines are loading the modules we build in the Docker image previously.</p>

<p>Example GitHub Action Deployment to Azure App Service using Linux Container: <a href="https://github.com/timheuer/blazor-deploy-sample/blob/master/.github/workflows/azure-app-svc-linux-container.yml">azure-app-svc-linux-container.yml</a></p>

<p>Benefits:</p>

<ul>
  <li>Containers are highly customizable, allowing you some portability and flexibility</li>

  <li>Easy deployment from Actions and Visual Studio (you can use the same publish mechanism in VS)</li>
</ul>

<p>Be Aware</p>

<ul>
  <li>Additional service here of using Azure Container Registry (or another registry to pull from)</li>

  <li>Understanding your billing plan for App Service</li>

  <li>Might need more configuration awareness to take advantage of pre-compressed assets (by default nginx requires an additional module for brotli and you’d have to rebuild it into nginx)</li>

  <ul>
    <li>NOTE: The example repo has a sample configuration which adds brotli compression support for nginx</li>
  </ul>
</ul>

<h2>Azure App Service (Linux)</h2>

<p><img src="https://github.com/timheuer/blazor-deploy-sample/workflows/.NET%20Core%20Build%20and%20Deploy%20(AppSvc%20Linux)/badge.svg" /></p>

<p>Similarly to App Service for Windows you could also just use App Service for Linux to deploy your Wasm app.&#160; However there is a big known workaround you have to achieve right now in order to enable this method.&#160; Primarily this is because there is no default configuration or ability to use the web.config like you can for Windows.&#160; Because of this if you use the Visual Studio publish mechanism it will appear as if the publish fails.&#160; Once completed and you navigate to your app you’d get a screen that looks like the default “Welcome to App Service” page if no content is there.&#160; This is a bit of a false positive :-).&#160; Your content/app DOES get published using this mechanism, but since we pus the publish folder the App Service Linux configuration doesn’t have the right rewrite defaults to navigate to index.html.&#160; Because of this I’d recommend if Linux is your desired host, that you use containers to achieve this.&#160; However you CAN do this using GitHub Actions as you manipulate the content to push.</p>

<p>Example GitHub Action Deployment to Azure App Service Linux: <a href="https://github.com/timheuer/blazor-deploy-sample/blob/master/.github/workflows/azure-app-svc-linux-deploy.yml">azure-app-svc-linux-deploy.yml</a></p>

<p>Benefits:</p>

<ul>
  <li>Managed PaaS</li>
</ul>

<p>Be Aware:</p>

<ul>
  <li>Cannot publish ideally from Visual Studio </li>

  <li>No pre-compressed assets will be served</li>

  <li>Understand your billing plan for App Service</li>
</ul>

<h2>Summary</h2>

<p>Just like you have options with SPA frameworks or other static sites, for a Blazor Wasm client you have similar options as well.&#160; The unique aspects of pre-compressed assets provide some additional config you should be aware of if you aren’t using ASP.NET Core hosted solutions, but with a small bit of effort you can get it working fine.&#160; </p>

<p>All of the samples I have listed here are provided in this repository: <a href="https://github.com/timheuer/blazor-deploy-sample">timheuer/blazor-deploy-samples</a> and would love to see any issues you may find.&#160; I hope this helps summarize the documentation we have on configuring options in Azure to support Blazor Wasm.&#160; What other tips might you have?</p>

<p>Stay tuned for more!</p>
