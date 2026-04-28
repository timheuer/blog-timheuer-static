---
title: "Adding environment vars to .NET Aspire services"
slug: "add-environment-variables-to-aspire-services"
pubDate: 2023-11-29T00:49:10.000Z
lastModified: 2023-11-29T00:49:10.000Z
description: "Quick tip to add any environment variable to your .NET Aspire service and make the app model aware of it!"
categories:
  - "dotnet"
  - "aspire"
draft: false
---

<p>Have you heard about <strong><a href="https://aka.ms/dotnet-aspire">.NET Aspire</a></strong> yet? If not, go <a href="https://aka.ms/dotnet-aspire">read</a>, then maybe <a href="https://youtu.be/z1M-7Bms1Jg?si=c-uGxOyRZ7eZ7iG9">watch</a>. It’s okay I’ll wait.</p>  <p>Ok, great now that you have some grounding, I’m going to share some tips time-to-time of things that I find delightful that may not be obvious.&#160; In this example I’m using the default .NET Aspire application template and added an ASP.NET Web API with enlisting into the orchestration. What does that mean exactly? Well the AppHost project (orchestrator) now has a reference to the project like so:</p>  <pre class="brush: csharp; toolbar: false; highlight: [3];">var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject&lt;Projects.WebApplication1&gt;(&quot;webapplication1&quot;);

builder.Build().Run();
</pre>

<p>When I run the AppHost it launches all my services, etc. Yes this is a VERY simple case and only one service…I’m here to make a point, stay with me.</p>

<p>If in my service I add some Aspire components they may come with their own configuration information. Things like connection strings or configuration options for the components. A lot of times these will result in environment variables at deploy time that the components will read. You can see this if you run and inspect the environment variables of the app:</p>

<p><img title="Screenshot of .NET Aspire dashboard environment variables" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of .NET Aspire dashboard environment variables" src="https://storage2.timheuer.com/aspireenv1.png" width="1024" height="671" /></p>

<p>But what if I have a configuration/variable that I need to set that isn’t coming from a component? I want that to be a part of the application model so that the orchestrator puts things in the right places, but also deployment tooling is aware of my whole config needs. No problem, here’s a quick tip if you haven’t discovered it yet!</p>

<p>I want a config value in my app as MY_ENV_CONFIG_VAR…a very important variable. It is a value my API needs as you can see in this super important endpoint:</p>

<pre class="brush: csharp; toolbar: false;">app.MapGet(&quot;/somerandomconfigvar&quot;, () =&gt;
{
    var config = builder.Configuration.GetValue&lt;string&gt;(&quot;MY_ENV_CONFIG_VAR&quot;);
    return config;
});
</pre>

<p>How can I get this in my Aspire environment so the app model is aware, deployment manifests are aware, etc. Easy. In the AppHost change your AddProject line to add a WithEnvironment() call specifying the variable/value to set. Like this:</p>

<pre class="brush: csharp; toolbar: false; highlight: [4];">var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject&lt;Projects.WebApplication1&gt;(&quot;webapplication1&quot;)
    .WithEnvironment(&quot;MY_ENV_CONFIG_VAR&quot;, &quot;Hello world!&quot;);

builder.Build().Run();
</pre>

<p>Now when I launch the orchestrator runs all my services and adds them to the environment variables for that app:</p>

<p><img title="Screenshot of .NET Aspire dashboard environment variables" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of .NET Aspire dashboard environment variables" src="https://storage2.timheuer.com/aspireenv2.png" width="1024" height="643" /></p>

<p>And when I produce a deployment manifest, that information is stamped as well for deployment tools to reason with and set in their configuration way. </p>

<pre class="brush: json; toolbar: false; highlight: [9];">{
  &quot;resources&quot;: {
    &quot;webapplication1&quot;: {
      &quot;type&quot;: &quot;project.v0&quot;,
      &quot;path&quot;: &quot;..\\WebApplication1\\WebApplication1.csproj&quot;,
      &quot;env&quot;: {
        &quot;OTEL_DOTNET_EXPERIMENTAL_OTLP_EMIT_EXCEPTION_LOG_ATTRIBUTES&quot;: &quot;true&quot;,
        &quot;OTEL_DOTNET_EXPERIMENTAL_OTLP_EMIT_EVENT_LOG_ATTRIBUTES&quot;: &quot;true&quot;,
        &quot;MY_ENV_CONFIG_VAR&quot;: &quot;Hello world!&quot;
      },
      &quot;bindings&quot;: {
        &quot;http&quot;: {
          &quot;scheme&quot;: &quot;http&quot;,
          &quot;protocol&quot;: &quot;tcp&quot;,
          &quot;transport&quot;: &quot;http&quot;
        },
        &quot;https&quot;: {
          &quot;scheme&quot;: &quot;https&quot;,
          &quot;protocol&quot;: &quot;tcp&quot;,
          &quot;transport&quot;: &quot;http&quot;
        }
      }
    }
  }
}
</pre>

<p>Pretty cool, eh? Anyhow, just a small tip to help you on your .NET Aspire journey.</p>
