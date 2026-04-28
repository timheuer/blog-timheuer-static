---
title: "Writing an OpenAI plugin for ChatGPT using ASP.NET Core"
slug: "write-an-open-ai-plugin-for-chatgpt-using-aspnet"
pubDate: 2023-06-17T16:50:17.000Z
lastModified: 2023-06-17T16:50:17.000Z
description: "Unleash the power of your APIs into ChatGPT using ASP.NET Core and Visual Studio to quickly expose and develop an OpenAI ChatGPT plugin. You won't believe how easy it is!"
categories:
  - "dotnet"
  - "aspnet"
  - "ai"
draft: false
---

<p>Well it was all about AI at Microsoft Build this year for sure…lots of great discussions and demos around GitHub Copilot, OpenAI, Intelligent Apps, etc.&#160; I’ve been heavily relying on GitHub Copilot recently as I’ve been spending more time in writing VS Code extensions and I’m not as familiar with TypeScript.&#160; Having that AI assistant with me *in the editor* has been amazing.</p>  <p>One of the sessions at Build was the keynote from <strong>Scott Guthrie</strong> where VP of Product, <strong>Amanda Silver</strong>, demonstrated building an OpenAI plugin for <strong><a href="https://chat.openai.com">ChatGPT</a></strong>.&#160; You can watch that demo starting at this timestamp as it was a part of the “<a href="https://youtu.be/KMOV1Zy8YeM?t=531">Next generation AI for developers with the Microsoft Cloud</a>” overall keynote.&#160; It takes a simple API about products from the very famous Contoso outlet and exposes an API about products.&#160; Amanda then created a plugin using Python and showed the workflow of getting this to work in ChatGPT.&#160; So after a little prompting on Twitter and some change of weekend plans, I wanted to see what it would take to do this using ASP.NET Core API development.&#160; Turns out it is pretty simple, so let’s dig in!</p>  <h1>Working with ChatGPT plugins</h1>  <p>A plugin in this case help connect the famous ChatGPT experience to third-party applications (APIs).&#160; From the documentation:</p>  <blockquote>   <p>These plugins enable ChatGPT to interact with APIs defined by developers, enhancing ChatGPT's capabilities and allowing it to perform a wide range of actions. For example, here is the <a href="https://savvytrader.com/">Savvy Trader</a> ChatGPT plugin in action where I can ask it investment questions and it becomes the responsible source for providing the data/answers to my natural language inquiry:</p>    <p><img title="Screenshot of the Savvy Trader ChatGPT plugin" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of the Savvy Trader ChatGPT plugin" src="https://storage2.timheuer.com/savvytrader.png" width="1252" height="767" /></p> </blockquote>  <p>A basic plugin is a definition of a manifest that describe how ChatGPT should interact with the third-party API.&#160; It’s a contract between ChatGPT, the plugin, and the API specification, using OpenAPI.&#160; That’s it simply.&#160; Could your existing APIs ‘just work’ as a plugin API? That’s something you’d have to consider before just randomly exposing your whole API surface area to ChatGPT. It makes more sense to be intentional about it and deliver a set of APIs that are meaningful to the AI model to look and receive a response.&#160; With that said, we’ll keep on the demo/simple path for now.</p>  <p>For now the ChatGPT plugins require two sides: a ChatGPT Plus subscription to use them (plugins now available to all Plus subscribers) and to develop you need to be on the approved list, for which you must <a href="https://openai.com/waitlist/plugins">join the waitlist to develop/deploy a plugin</a> (as of the date of this writing).</p>  <h1>Writing the API</h1>  <p>Now the cool thing for .NET developers, namely ASP.NET Core developers is writing your API doesn’t require anything new for you to learn…it’s just your code.&#160; Can it be enhanced with more? Absolutely, but as you’ll see here, we are literally keeping it simple.&#160; For ours we’ll start with the simple ASP.NET Core Web API template in Visual Studio (or `dotnet new webapi –use-minimal-apis`).&#160; This gives us the simple starting point for our API.&#160; We’re going to follow the same sample as Amanda’s so you can delete all the weather forecast sample information in Program.cs.&#160; We’re going to add in some sample fake data (products.json) which we’ll load as our ‘data source’ for the API for now.&#160; We’ll load that up first:</p>  <pre class="brush: csharp;">// get some fake data
List&lt;Product&gt; products = JsonSerializer.Deserialize&lt;List&lt;Product&gt;&gt;(File.ReadAllText(&quot;./Data/products.json&quot;));
</pre>

<p>Observe that I have a Product class to deserialize into, which is pretty simple class that maps to the sample data…not terribly important for this reading.</p>

<p>Now we want to have our OpenAPI definition crafted a little, so we’re going to modify the Swagger definition a bit.&#160; The template already includes Swashbuckle package to help us generate the OpenAPI specification needed…we just need to provide it with a bit of information.&#160; I’m going to modify this to provide the title/description a bit better (otherwise by default it uses a set of project names you probably don’t want).</p>

<pre class="brush: csharp;">builder.Services.AddSwaggerGen(c =&gt;
{
    c.SwaggerDoc(&quot;v1&quot;, new Microsoft.OpenApi.Models.OpenApiInfo() { Title = &quot;Contoso Product Search&quot;, Version = &quot;v1&quot;, Description = &quot;Search through Contoso's wide range of outdoor and recreational products.&quot; });
});
</pre>

<p>Now we’ll add an API for products to query our data and expose that to OpenAPI definition:</p>

<pre class="brush: csharp; highlight: [11-13];">app.MapGet(&quot;/products&quot;, (string? query = null) =&gt;
{
    if (query != null) { 
        return products?.Where(p =&gt; p.Name.Contains(query, StringComparison.OrdinalIgnoreCase) || 
        p.Description.Contains(query, StringComparison.OrdinalIgnoreCase) || 
        p.Category.Contains(query, StringComparison.OrdinalIgnoreCase) ); 
    }

    return products;
})
.WithName(&quot;GetProducts&quot;)
.WithDescription(&quot;Get a list of products&quot;)
.WithOpenApi();
</pre>

<p>That’s it.&#160; You can see the highlighted lines where we further annotate the endpoint for the OpenAPI specification. Now we have our API working and it will produce an OpenAPI spec by default at {host}/swagger/v1/swagger.yaml for us.&#160; Note that you can further modify this location if you want providing a different route template in the Swagger config.</p>

<p>Now let’s move on to exposing this for ChatGPT plugins!</p>

<h1>Exposing the API to ChatGPT</h1>

<p>Plugins are enabled in ChatGPT by first providing a manifest that informs ChatGPT about what the plugin is, where the API definitions are, etc.&#160; This is requested at a manifest located at {yourdomain}/.well-known/ai-plugin.json.&#160; This is a well-known location and it is looking for a response that conforms to the schema.&#160; Here are some advanced scenarios for authentication for a plugin, but we’ll keep it simple and expose this for all with no auth needed.&#160; Details about the plugin manifest can be found here: <a href="https://platform.openai.com/docs/plugins/getting-started/plugin-manifest">ai-plugin.json manifest definition</a>.&#160; It’s a pretty simple file.&#160; You probably will need a logo for your plugin of course – maybe use AI to generate that for you ;-).</p>

<p>There are a few ways you can expose this.&#160; You can simply add a wwwroot folder, enable static files and drop the file in wwwroot\.well-known\ai-plugin.json.&#160; To do that in your API project create the wwwroot folder, then create the .well-known folder (with the ‘.’) and put your ai-plugin.json file in that location.&#160; If you go this approach you’ll want to ensure in your Program.cs you enable static files:</p>

<pre class="brush: csharp;">app.UseStaticFiles();
</pre>

<p>After you have all this in place you’ll need to enable CORS policy so that the ChatGPT can access your API correctly.&#160; First you will need to enable CORS (line 1 in your builder) and then configure a policy for the ChatGPT domain (line 6 in the app):</p>

<pre class="brush: csharp; highlight: [1,6];">builder.Services.AddCors();

...


app.UseCors(policy =&gt; policy
    .WithOrigins(&quot;https://chat.openai.com&quot;)
    .AllowAnyMethod()
    .AllowAnyHeader());
</pre>

<p>Now our API will be callable form the ChatGPT app.</p>

<h2>Using Middleware to configure the manifest</h2>

<p>As mentioned the static files approach for exposing the manifest is the simplest…but that’s no fun right?&#160; We are developers!!! As I was looking at this myself, I put together a piece of ASP.NET middleware to help me configure it.&#160; You can use the static files approach (in fact you’ll have to do that with your logo if hosting at the same place as your API) for sure, but just in case here’s a middleware approach that I put together.&#160; First you’ll install the package <a href="https://www.nuget.org/packages/TimHeuer.OpenAIPluginMiddleware">TimHeuer.OpenAIPluginMiddleware</a> from NuGet.&#160; Once you’ve done that now you’ll add the service and tell the pipeline to use it.&#160; First add it to the services of the builder (line 1) and then tell the app to use the middleware (line 15):</p>

<pre class="brush: csharp; highlight: [1,15];">builder.Services.AddAiPluginGen(options =&gt;
{
    options.NameForHuman = &quot;Contoso Product Search&quot;;
    options.NameForModel = &quot;contosoproducts&quot;;
    options.LegalInfoUrl = &quot;https://www.microsoft.com/en-us/legal/&quot;;
    options.ContactEmail = &quot;noreply@microsoft.com&quot;;
    options.LogoUrl = &quot;/logo.png&quot;;
    options.DescriptionForHuman = &quot;Search through Contoso's wide range of outdoor and recreational products.&quot;;
    options.DescriptionForModel = &quot;Plugin for searching through Contoso's outdoor and recreational products. Use it whenever a user asks about products or activities related to camping, hiking, climbing or camping.&quot;;
    options.ApiDefinition = new Api() { RelativeUrl = &quot;/swagger/v1/swagger.yaml&quot; };
});

...

app.UseAiPluginGen();
</pre>

<p>This might be overkill, but now your API will respond to /.well-known/ai-plugin.json automatically without having to use the static files manifest approach.&#160; This comes in handy for any dynamic configuration of your manifest (and was the reason I created it).</p>

<h1>Putting it together</h1>

<p>With all this in place, now we go to ChatGPT (remember, need a Plus subscription) and add our plugin.&#160; Since ChatGPT is a public site and we haven’t deployed our app yet to anywhere, we need to be able to have ChatGPT call it.&#160; <strong><a href="https://learn.microsoft.com/en-us/aspnet/core/test/dev-tunnels?view=aspnetcore-7.0">Visual Studio Dev Tunnels</a></strong> to the rescue!&#160; If you haven’t heard about these yet, it is the fastest and most convenient way to get a public tunnel to your dev machine right from within Visual Studio!&#160; In fact, this scenario is exactly what Dev Tunnels are for!&#160; In our project we’ll create a tunnel first, and make it available to everyone (ChatGPT needs public access).&#160; In VS first create a tunnel, you can do that easily from the ‘start’ button of your API in the toolbar:</p>

<p><img title="Create a Dev Tunnel in Visual Studio" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Create a Dev Tunnel in Visual Studio" src="https://storage2.timheuer.com/devtunnelcreate1.png" width="821" height="600" /></p>

<p>and then configure the options:</p>

<p><img title="Dev Tunnel configuration screen" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Dev Tunnel configuration screen" src="https://storage2.timheuer.com/devtunnelcreate2.png" width="1127" height="833" /></p>

<p>More details on these options are available at the documentation for Dev Tunnels, but these are the options I’m choosing.&#160; Now once I have that the tunnel will be activated and when I run the project from within Visual Studio, it will launch under the Dev Tunnel proxy:</p>

<p><img title="Screenshot of app running behind a public Dev Tunnel" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of app running behind a public Dev Tunnel" src="https://storage2.timheuer.com/devtunnelcreate5.png" width="1812" height="564" /></p>

<p>You can see my app running, responding to the /.well-known/ai-plugin.json request and serving it from a public URL.&#160; Now let’s make it known to ChatGPT…</p>

<p>First navigate to <a href="https://chat.openai.com">https://chat.openai.com</a> and ensure you choose the GPT-4 approach then plugins:</p>

<p><img title="Screenshot of the GPT-4 option on ChatGPT" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of the GPT-4 option on ChatGPT" src="https://storage2.timheuer.com/gpt4tab.png" width="697" height="559" /></p>

<p>Once there you will see the option to specify plugins in the drop-down and then navigate to the plugin store:</p>

<p><img title="Plugin Store link" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Plugin Store link" src="https://storage2.timheuer.com/plugin-store.png" width="712" height="597" /></p>

<p>Click that and choose ‘Develop your own plugin’ where you will be asked to put in a URL.&#160; This is where your manifest will respond to (just need the root URL).&#160; Again, because this needs to be public, Visual Studio Dev Tunnels will help you! I put in the URL to my dev tunnel and click next through the process (because this is development you’ll see a few things about warnings etc):</p>

<p><img title="Develop your own plugin" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Develop your own plugin" src="https://storage2.timheuer.com/develop-plugin.png" width="859" height="241" /></p>

<p>After that your plugin will be enabled and now I can issue a query to it and watch it work!&#160; Because I’m using Visual Studio Dev Tunnels I can also set a breakpoint in my C# code and see it happening live, inspect, etc:</p>

<p><img title="Breakpoint during debugging hit" style="margin: 0px auto; float: none; display: block; background-image: none;" border="0" alt="Breakpoint during debugging hit" src="https://storage2.timheuer.com/debug-breakpoint.png" width="2353" height="442" /></p>

<p>A very fast way to debug my plugin before I’m fully ready for deployment!</p>

<h1>Sample code</h1>

<p>And now you have it.&#160; Now you could actually deploy your plugin to Azure Container Apps for scale and you are ready to let everyone get recommendations on backpacks and hiking shoes from Contoso!&#160; I’ve put all of this together (including some Azure deployment infrastructure scripts) in this sample repo: <a href="https://github.com/timheuer/openai-plugin-aspnetcore">timheuer/openai-plugin-aspnetcore</a>.&#160; This uses the middleware that I created for the manifest.&#160; That repo is located at <a href="https://github.com/timheuer/openai-plugin-middleware">timheuer/openai-plugin-middleware</a> and I’d love to hear comments on the usefulness here. There is some added code in that repo that dynamically changes some of the routes to handle the Dev Tunnel proxy URL for development.</p>

<p>Hope this helps see the end to end of a very simple plugin using ASP.NET Core, Visual Studio, and ChatGPT with plugins!</p>
