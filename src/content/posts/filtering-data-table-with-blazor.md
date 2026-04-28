---
title: "Filtering a Bootstrap table in C# and Blazor"
slug: "filtering-data-table-with-blazor"
pubDate: 2020-10-20T00:35:59.000Z
lastModified: 2020-10-20T00:37:04.000Z
description: "Need to quickly use a Bootstrap table with Blazor and add a global filter? You won't believe your eyes!"
categories:
  - ".net"
  - "blazor"
  - "dotnet"
  - "aspnet"
  - "visual studio"
draft: false
---

<p>I was finally getting around to updating a little internal app I had that showed some various data that some groups use to triage bugs.&#160; As you can imagine it is a classic “table of stuff” type dataset with various titles, numbers, IDs, etc. as visible columns.&#160; I had built it using Blazor server and wanted to update it a bit.&#160; In doing some of the updates I came across a preferred visual I liked for the grid view and applied the CASE methodology to implement that.&#160; Oh you don’t know what CASE methodology is?&#160; <strong>C</strong>opy <strong>A</strong>lways, <strong>S</strong>teal <strong>E</strong>verything.&#160; In this case the culprit was <a href="https://twitter.com/terrajobst">Immo</a> on my team.&#160; I know right? I couldn’t believe it either that he had something I wanted to take from a UI standpoint.&#160; I digress…</p>  <p>In the end I wanted to provide a rendered table UI quickly and provide a global filter:</p>  <p><img title="Picture of a filtered data table" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Picture of a filtered data table" src="https://storage2.timheuer.com/blazorfilterpreview2.png" width="1803" height="798" /></p>  <h2>Styling the table</h2>  <p>I copied what I needed and realized I could be using the <a href="https://getbootsrap.com">Bootstrap</a> styles/tables in my use case.&#160; Immo was using just &lt;divs&gt; but I own this t-shirt, so I went with &lt;table&gt; and plus, I like that Bootsrap had a <a href="https://getbootstrap.com/docs/4.0/content/tables/">nice example</a> for me.&#160; Off I went and changed my iteration loop. to a nice beautiful striped table.&#160; Here’s what it looked like in the styling initially:</p>  <pre class="brush: xml;">&lt;table class=&quot;table table-striped&quot;&gt;
    &lt;thead class=&quot;thead-light&quot;&gt;
        &lt;tr&gt;
            &lt;th scope=&quot;col&quot;&gt;Date&lt;/th&gt;
            &lt;th scope=&quot;col&quot;&gt;Temp. (C)&lt;/th&gt;
            &lt;th scope=&quot;col&quot;&gt;Temp. (F)&lt;/th&gt;
            &lt;th scope=&quot;col&quot;&gt;Summary&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        @foreach (var forecast in forecasts)
        {
            &lt;tr&gt;
                &lt;td&gt;@forecast.Date.ToShortDateString()&lt;/td&gt;
                &lt;td&gt;@forecast.TemperatureC&lt;/td&gt;
                &lt;td&gt;@forecast.TemperatureF&lt;/td&gt;
                &lt;td&gt;@forecast.Summary&lt;/td&gt;
            &lt;/tr&gt;
        }
    &lt;/tbody&gt;
&lt;/table&gt;
</pre>

<h2>Adding a filter</h2>

<p>Now I wanted to add some filtering capabilities more globally.&#160; Awesome “boostrap filtering” searching I went and landed on <a href="https://www.w3schools.com/Bootstrap/bootstrap_filters.asp">this simple tutorial</a>.&#160; Wow! a few lines of JavaScript, sweet, done.&#160; Or so I thought.&#160; As someone who hasn’t done a lot of SPA web app development I was quickly hit with the reality that once you choose a SPA framework (like Angular, React, Vue, Blazor) that you are essentially buying in to the whole philosophy and that for the most part jQuery-style DOM manipulations will no longer be at your fingertips as easily.&#160; Sigh, off to some teammates I went to complain and look for their sympathy.&#160; Narrator: they had no sympathy.</p>

<p>After another quick chat with Immo who had implementing the same thing he smacked me around and said in the most polite German accent “Why don’t you just use C# idiot?”&#160; Okay, I added the idiot part, but I felt like he was typing it and then deleted that part before hitting send.&#160; Knowing that Blazor renders everything and then re-renders when things change I just had to implement some checking logic in the foreach loop.&#160; First I needed to add the filter input field:</p>

<pre class="brush: xml; highlight: [3,4];">&lt;div class=&quot;form-group&quot;&gt;
    &lt;input class=&quot;form-control&quot; type=&quot;text&quot; placeholder=&quot;Filter...&quot; 
           @bind=&quot;Filter&quot; 
           @bind:event=&quot;oninput&quot;&gt;
&lt;/div&gt;
&lt;table class=&quot;table table-striped&quot;&gt;
...
&lt;/table&gt;
</pre>

<p>Observe that I added an @bind and @bind:event attributes that enable me to wire these up to properties and client-side events.&#160; So I’m telling it to bind the input to my ‘Field’ property and do this on ‘oninput’ (basically when the keys are typed in the input box).&#160; Now off to implement the property.&#160; I’m doing this simply in the @code block of the page itself:</p>

<pre class="brush: csharp; highlight: [9];">@code {
    private WeatherForecast[] forecasts;

    protected override async Task OnInitializedAsync()
    {
        forecasts = await ForecastService.GetForecastAsync(DateTime.Now);
    }

    public string Filter { get; set; }
}
</pre>

<p>And then I needed to implement the logic for filtering.&#160; I’m doing a global filter so that I can control whatever fields I want searched/filtered.&#160; I basically have the IsVisible function called each iteration and deciding if it should be rendered.&#160; For this sample I’m looking at if the summary contains the filter text or if the celsius or farenheit temperatures start with the digits being entered.&#160; I actually have access to the item model so I could even filter off of something not visible if I wanted (which would be weird for your users, so you probably shouldn’t do that).&#160; Here’s what I implemented:</p>

<pre class="brush: csharp; highlight: [6,9];">public bool IsVisible(WeatherForecast forecast)
{
    if (string.IsNullOrEmpty(Filter))
        return true;

    if (forecast.Summary.Contains(Filter, StringComparison.OrdinalIgnoreCase))
        return true;

    if (forecast.TemperatureC.ToString().StartsWith(Filter) || forecast.TemperatureF.ToString().StartsWith(Filter))
        return true;

    return false;
}
</pre>

<h2>Implementing the filter</h2>

<p>Once I had the parameter, input event, and the logic, now I just needed to implement that in my loop.&#160; A simple change to the foreach loop does the trick:</p>

<pre class="brush: xml; highlight: [13,14];">&lt;table class=&quot;table table-striped&quot;&gt;
    &lt;thead class=&quot;thead-light&quot;&gt;
        &lt;tr&gt;
            &lt;th scope=&quot;col&quot;&gt;Date&lt;/th&gt;
            &lt;th scope=&quot;col&quot;&gt;Temp. (C)&lt;/th&gt;
            &lt;th scope=&quot;col&quot;&gt;Temp. (F)&lt;/th&gt;
            &lt;th scope=&quot;col&quot;&gt;Summary&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        @foreach (var forecast in forecasts)
        {
            if (!IsVisible(forecast))
                continue;
            &lt;tr&gt;
                &lt;td&gt;@forecast.Date.ToShortDateString()&lt;/td&gt;
                &lt;td&gt;@forecast.TemperatureC&lt;/td&gt;
                &lt;td&gt;@forecast.TemperatureF&lt;/td&gt;
                &lt;td&gt;@forecast.Summary&lt;/td&gt;
            &lt;/tr&gt;
        }
    &lt;/tbody&gt;
&lt;/table&gt;
</pre>

<p>Now when I type it automatically filters the view based on input.&#160; Like a thing of beauty.&#160; Here it is in action:</p>

<p><img title="Animation of table being filtered" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Animation of table being filtered" src="https://storage2.timheuer.com/blazorfilteringtable.gif" width="1280" height="720" /></p>

<p>Pretty awesome.&#160; While I’ve used the default template here to show this example, this technique can of course be applied to your logic.&#160; I’ve put this in a repo to look at more detailed (this is running .NET 5-rc2 bits) at <a href="https://github.com/timheuer/BlazorFilteringWithBootstrap" target="_blank">timheuer/BlazorFilteringWithBootstrap</a>.</p>

<h2>More advanced filtering</h2>

<p>This was a simple use case and worked fine for me.&#160; But there are more advanced use-cases, better user experiences to provide more logic to the filter (i.e., define your own contains versus equals, etc.) and that’s where 3rd party components come in.&#160; There are a lot that provide built-in grids that have this capability.&#160; Here are just a few:</p>

<ul>
  <li><a href="https://www.telerik.com/blazor-ui/grid" target="_blank">Telerik UI for Blazor – Grid</a></li>

  <li><a href="https://www.devexpress.com/blazor/data-grid/" target="_blank">DevExpress Blazor DataGrid</a></li>

  <li><a href="https://www.infragistics.com/products/ignite-ui-blazor" target="_blank">Infragistics Ignite UI Blazor Data Grid</a></li>

  <li><a href="https://blazor.radzen.com/datagrid" target="_blank">Radzen DataGrid</a></li>

  <li><a href="https://www.syncfusion.com/blazor-components/blazor-datagrid" target="_blank">Syncfusion Blazor DataGrid</a></li>
</ul>

<p>Just to name a few popular ones.&#160; These are all great components authored by proven vendors in the .NET component space.&#160; These are way richer than simple filtering and provide a plethora of capabilities on top of grid-based rendering of large sets of data.&#160; I recommend if you have those needs you check them out.</p>

<p>I’m enjoying my own journey writing Blazor apps and hope you found this dumb little sample useful.&#160; If not, that’s cool.&#160; I mainly am bookmarking here for my own use later when I forget and need to search…maybe I’ll find it back on my own site.</p>

<p>Hope this helps!</p>
