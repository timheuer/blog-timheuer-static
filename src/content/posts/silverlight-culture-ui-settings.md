---
title: "Honoring your user&rsquo;s culture settings with Silverlight"
slug: "silverlight-culture-ui-settings"
pubDate: 2008-10-15T13:50:55.000Z
lastModified: 2019-10-23T04:20:24.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "datagrid"
  - "valueconverter"
  - "data binding"
  - "culture"
  - "locale"
  - "fr-fr"
draft: false
---

<p>One thing that I’m just as guilty as probably most of some of my peers is creating US-centric applications.  Forgetting to think globally for your users is something that I think happens too often.  We operate in our US-centric worlds and forget that sometimes even the simplest things can make a difference.</p>  <p>Take for instance, honoring your user’s culture settings (region/locale/whatever you want to call it).  Even if you have a US-based application for a US-company, how do you know that a user might not be of French origin and still perhaps like to view their operating system information in French settings, so they change their culture. </p>  <p>Luckily in some areas this is simple to do, and for <a href="http://silverlight.net">Silverlight</a> applications you can let the platform do some of the work for you.  I’ll take a simple example of currency settings.  A colleague of mine was asking about currency formatting in his Silverlight application with regard to data binding.  He sent me a note asking why his <a href="http://timheuer.com/blog/archive/2008/07/30/format-data-in-silverlight-databinding-valueconverter.aspx">formatter</a> didn’t work.  He asked me why:</p>  <div style="border-bottom: gray 1px solid; border-left: gray 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: consolas, 'Courier New', courier, monospace; max-height: 200px; font-size: 8pt; overflow: auto; border-top: gray 1px solid; cursor: text; border-right: gray 1px solid; padding-top: 4px">   <div style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px">     <pre style="border-bottom-style: none; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: consolas, 'Courier New', courier, monospace; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060">   1:</span> ConverterParameter={0:$##.00}</pre>
  </div>
</div>

<p>As it turns out, it was just something missing in his implementing of a custom converter in his application.  But I let him know that he should really use {0:c} and let the platform do the work.  Let’s look at a simple example of an employee and their salary.  If we data bind this information to a DataGrid using the above formatter here is what we might get:</p>

<p><img src="http://s3.amazonaws.com:80/timheuer-img/salarygrid1.png" /></p>

<p>Makes sense right, looks fine.  Now let’s change the regional settings on my machine to French (France):</p>

<p><img src="http://s3.amazonaws.com:80/timheuer-img/salarygrid1.png" /></p>

<p>Hmm…what happened here.  Well the problem is we forced the format.  Let’s change the format parameter to {0:c} and keep French as our settings and see:</p>

<p><img src="http://s3.amazonaws.com:80/timheuer-img/salarygrid2.png" /></p>

<p>Ah, now that makes sense.  You see we can let our platform do the work and Silverlight is aware of how to use culture settings to honor currency, dates, etc. – here’s the default Calendar with French settings:</p>

<p><img src="http://s3.amazonaws.com:80/timheuer-img/calfrfr.png" /></p>

<p>Now ideally in our sample with salaries above a literal <strong>visual</strong> translation probably isn’t accurate (by that I mean USD $1 is not the same as 1 Euro right now in translation.  We could add some custom logic though and get this output based on culture settings:</p>

<p><img src="http://s3.amazonaws.com:80/timheuer-img/salarygrid3.png" /></p>

<p>So be mindful of your applications and look for ways you can reliably and meaningfully add value to your global end users.  Don’t force a format unless you absolutely have to.</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:a22f5f27-6c1a-475c-bc66-6668ff2b44e9" class="wlWriterEditableSmartContent"></div>
