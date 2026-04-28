---
title: "MSDN Radio follow-up answers: Prism for Silverlight, DomainServices and relationships"
slug: "msdn-radio-follow-up-answers-riaservices-prism"
pubDate: 2010-03-29T10:24:15.000Z
lastModified: 2019-10-23T04:20:34.000Z
categories:
  - "silverlight"
  - "wpf"
  - "xaml"
  - "msdn"
  - "ria"
  - "prism"
  - "mvvm"
  - "riaservices"
  - "mef"
  - "domainservice"
  - "msdnradio"
draft: false
---

<p><a href="http://www.msdnradio.com"><img border="0" align="left" src="http://storage.timheuer.com/msdnradio.png" alt="MSDN Radio image" title="MSDN Radio" style="border-width: 0px; margin: 0px 20px; display: inline;" /></a>This morning I was on a weekly (new) radio show from MSDN, hosted by <a href="http://blogs.msdn.com/benko/">Mike Benkovich</a>.  The show, <a href="http://www.msdnradio.com"><strong>MSDN Radio</strong></a>, features live call-in questions that you can ask.  It was a better format than the typical live meeting text-based QA I thought.  I think hearing questions gives you a better chance of articulating your inquiry more.  Thanks to all those who listened and asked questions.  I know it seemed short and there were a few more questions in the queue – feel free to send me questions you may have.</p>
<p><strong>UPDATE</strong>: The audio from the show was just posted <a href="http://channel9.msdn.com/posts/egibson/MSDN-Radio-What-you-need-to-know-about-Silverlight/">here</a>.<br />
</p>
<p>There were a few that I wanted to follow-up on and get some more answers from other team members.  Here are 3 items I wanted to provide a bit more follow-up to (I’m paraphrasing the questions).</p>
<p>Vince asked a question around <strong>Prism</strong> and part of that was <em>what are the plans for Prism moving forward?</em>  I didn’t know a concrete answer, so I quickly asked around.  Take a look at the team’s post on <em><a href="http://blogs.msdn.com/simplifying_patterns_and_practices/archive/2010/03/15/prism-a-look-ahead.aspx">Prism, A Look Ahead</a></em>.  The team talks about the next release (v4) to be around the September 2010 timeframe.  They also comment on using Prism today with <a href="http://silverlight.net"><strong>Silverlight</strong></a><strong> 4</strong>.  As to what will be in Prism 4?  They offer some insight:</p>
<ul>
    <li><strong>Managed Extensibility Framework (MEF)</strong> – <em>“In particular, we’ll be looking at leveraging MEF for Component Composition (for hooking up Views and ViewModels, and other types of components), for Modularity (for the discovery, download, and instantiation of functionality packaged in a module), and for UI Composition (for mapping Views to Regions).”</em> </li>
    <li><strong>Model-View-ViewModel (MVVM) </strong>Pattern – <em>“…we’re looking to expand our current guidance and to include more re-usable code assets to support various <strong>MVVM</strong> scenarios. In particular, we’re looking to support common patterns for View/ViewModel interaction, hierarchical ViewModel composition, and ViewModel-based navigation. In addition, we’re also looking to provide more support for application-level structural patterns, layout management, the use of Ribbon/Popup/Dialog controls, and user state management.”</em> </li>
    <li><strong>Data Access and Application Services</strong> (i.e., <a href="http://silverlight.net/riaservices"><strong>WCF RIA Services</strong></a>) – <em>“…we are looking to provide guidance on using these technologies in the context of MVVM, and on patterns for data validation and caching. This area also includes the use of other services for user preferences, authentication and authorization. This latter aspect brings in the possibility of providing guidance for role-driven (or claims-driven) applications and user experience.”</em> </li>
</ul>
<p>I’d encourage you to subscribe to their blog and be a part of their conversation over there as well.</p>
<p>Scott asked a question about how to best define <strong>DomainServices</strong> (contexts) in your application – is it better to have 1:1 for entity:DomainService or other methods.  I asked the RIA Services team for some additional input to my answer.  </p>
<p><em>DomainService should be based on a set of related tasks that you expect the end-user to perform in [your application]. Typically such tasks involve a small group of closely related entities; e.g. in an Expense reporting app, Expense Report, Line Items and Details would be a good set of entities to cover in a single DomainService while covering accounts and payments in a separate DomainService type.</em></p>
<p>Additionally Jane asked about many-to-many relationships with regard to RIA Services.</p>
<p><em>Currently RIA Services require the “class in the middle” containing FK values in a many-to-many. In  a POCO model, you can add it yourself while in an EF-generated model, you would have to change the model (edmx) to add such a class in the middle.</em></p>
<p>Hopefully these provide some additional clarity on top of my opinions.  There sure seems to be a lot of interest in the RIA Services space!</p>
<p>Hope this helps! </p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:0a5d0983-fe6a-44d2-b09c-b7e2f5462590" style="padding: 0px; margin: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
