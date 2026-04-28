---
title: "Silverlight cross domain policy file helpers"
slug: "silverlight-cross-domain-policy-file-snippet-intellisense"
pubDate: 2008-04-06T23:23:08.000Z
lastModified: 2019-10-23T04:20:17.000Z
categories:
  - "silverlight"
  - "orcas"
  - "visual studio 2008"
  - "xml"
  - "intellisense"
  - "crossdomainxml"
  - "cross domain"
  - "clientaccesspolicy"
  - "code snippets"
  - "snippets"
draft: false
---

<p>If you are starting to get into integrating web services with <strong><a href="http://silverlight.net/" target="_blank">Silverlight</a></strong>, you'll notice that you have to have a cross domain policy file in place on the <strong>target</strong> server, that is to say, the server hosting the service you want to implement.  There are some public web services (Flickr, YouTube, Digg, etc.) that already have these files in place for Flash, but implement in a slightly different way.</p>
<p>When calling a cross-domain service, Silverlight will check for the existence of <strong>clientaccesspolicy.xml</strong> first.  This is the format defined by Silverlight and provides a pretty flexible way to define who can access what services.  If not found, it will then default to look for <strong><a href="http://crossdomainxml.org/" target="_blank">crossdomain.xml</a></strong>, which is the file format implemented for Adobe Flash.  It is important to note that this file will also still work for most public web services.</p>
<p>But now perhaps you are the author of the service that your application is going to consume and/or the public will consume.  There are a few things you want to consider.  First, it would be a best practice to put your service layer on a separate domain other than your site (i.e., api.mysite.com).  In fact, this is how most are doing it these days.  These helps separate more distinctly the services from the web site and also separates the cross-domain security concerns away from the content site versus API access.  Once you have done that you'll want to implement your specific clientaccesspolicy.xml file.</p>
<p>When Silverlight 2 was released to beta, I created some quick helper files to assist me with creating this simple policy file (it is simple, but can get complex depending on how granular you want to define your access).  I figured it might be helpful to some who are implementing services as well.  Sure, they aren't going to save the world, but might save you some quick typing.</p>
<p><strong><u>Visual Studio Code Snippet</u></strong></p>
<p>The <a href="http://s3.amazonaws.com:80/timheuer-img/slcap.vsi">slcap.vsi</a> file is a Visual Studio Community Installer package which contains "slcap.snippet," which is a Visual Studio code snippet format.  This is an XML snippet, so would be used only in the context of an XML file.  Just double-click on the .vsi file to install and it will walk you through the steps.  I recommend just keeping the defaults.  After it is complete, you now have an Intellisense snippet.  To use it and create a new clientaccesspolicy.xml add a new XML file to your web service site/project named clientaccesspolicy.xml.  It will open a blank XML file by default.  Select all text (CTRL+A).  Then hit the keyboard shortcut for launching XML snippets, CTRL+K,X.</p>
<blockquote>
<p><strong>NOTE</strong>: For some reason XML snippets don't operate like C#/VB ones do where you type the shortcut, then TAB, TAB.  If anyone knows why, let me know :-)</p>
</blockquote>
<p>This will bring up the navigator, then simply navigate to the My XML Snippets, then locate the one you just installed:</p>
<p><img src="http://s3.amazonaws.com:80/timheuer-img/slcap1.png" alt="" /></p>
<p>Once you select it, there are three literal areas to override the defaults if you wanted.  </p>
<p><img src="http://s3.amazonaws.com:80/timheuer-img/slcap2.png" alt="" /></p>
<p><span style="font-weight: bold;">UPDATE</span>: As Sean probably ran into below (in comments), the above screenshot does not show the required <span style="font-style: italic;">http-request-headers</span> attribute required on the allow-from node of the policy file.  This is, however, updated in the Intellisense files and the code snippet template.  Thanks Sean for pointing out the screenshot is wrong here.<br />
</p>
<p>If you are implementing a completely public web service (open to anyone for cross-domain access), then the defaults will suffice.  When done changing the values, hit enter and you are done.  For those who are not keyboard shortcut masters and would be using a mouse to do all this, it might not be terribly faster to be honest (if the TAB,TAB implementation was there for XML snippets, it would eliminate the arrow up/down to navigate to the snippet).</p>
<p><a href="http://s3.amazonaws.com:80/timheuer-img/slcap.vsi">Get the slcap.snippet here.</a></p>
<p><strong><u>Visual Studio Intellisense Files</u></strong></p>
<p>This next step is a super hack that I originally did and decided it might not be a good idea, but I'll include it here anyway :-).  This involves adding Intellisense files to your VS2008 installation and if you aren't comfortable with that, then move along.</p>
<p>First, you'll want to get the XSD I created, which is <strong>very</strong> simple and I'm sure doesn't fully conform to the final spec, but lacking that spec, it maps to the format well enough.  Copy the clientaccess.xsd file to the C:\Program Files\Microsoft Visual Studio 9.0\Xml\Schemas location (or wherever VS2008 is installed for you).  Once you've done that you have to add an entry into the catalog.xml file to add the mapping.  Again, not this is my little hack so I created some namespace because there wasn't one defined yet.</p>
<p>Once you have those two files you have Intellisense for your clientaccesspolicy.xml file if you want it.  Following similar steps as above, create the new file.  This time, however, type the root node of &lt;access-policy&gt; but adding the 'xmlns' attribute pointing to the new namespace you just added to the catalog file (note: Intellisense should give you a list to choose from:</p>
<p><img src="http://s3.amazonaws.com:80/timheuer-img/slcap3b.png" alt="" /></p>
<p>Once you have that, then you'll get the rest of the Intellisense for the basic format of the client access policy format.  If you have multiple allow-from/grant-to needs, this Intellisense will support it.</p>
<p><img src="http://s3.amazonaws.com:80/timheuer-img/slcap4.png" alt="" /></p>
<p>The only lame thing is you have my namespace in there :-).  That is what drives the Intellisense.  Right now you'll want to remove that before deploying the actual file.  Yeah, I know.  But I said this was an early hack of mine didn't I?</p>
<p><a href="http://timheuer-img.s3.amazonaws.com/SLCAPIntellisense.zip">Get the Intellisense files here.</a></p>
<p><strong><u>What do to with the completed policy file?</u></strong></p>
<p>Either way, when you are done with the file, it needs to go in the <strong>ROOT</strong> of the domain.  This is important as it is not the <em>application</em> root, but the root web.  Even if your app is at foo.com/myapp, the policy file needs to be at foo.com/clientaccesspolicy.xml.</p>
<p>Anyhow, maybe these files will help you.  Ideally you won't be using/messing with an access policy file much, but this might save you some clicks and having the docs open next to you :-).</p>
<div style="margin: 0px; padding: 0px; display: inline;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:34c9bfe9-4d9f-4cff-a302-a4c3482a639b" class="wlWriterSmartContent"></div>
