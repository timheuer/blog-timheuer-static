---
title: "expression design sp1 improves xaml export"
slug: "expression-design-releases-service-pack-xaml-export"
pubDate: 2007-11-06T23:19:18.000Z
lastModified: 2019-10-23T04:20:12.000Z
categories:
  - "silverlight"
  - "wpf"
  - "expression"
  - "expression design"
  - "xaml"
  - "overview.aspx"
  - "vector"
  - "timheuer"
  - "codetrip"
  - "thecodetrip"
  - "code trip"
draft: false
---

<p>yo, check it.  <strong>expression design</strong> has <a href="http://www.microsoft.com/downloads/details.aspx?FamilyId=937ADF32-0FEA-4BB7-B727-CBFBDF3FE032&amp;displaylang=en">released a service pack</a>.  </p>
<p>what!?  i know how can that be?  a <a href="http://www.microsoft.com/downloads/details.aspx?FamilyId=937ADF32-0FEA-4BB7-B727-CBFBDF3FE032&amp;displaylang=en">service pack</a> &lt; 8 months after its release?  i say awesome.  i've been wanting microsoft teams to continue to become more and more agile especially with regards to very helpful features or great improvements of existing features based on user feedback.</p>
<p>one such point of feedback that is implemented in <strong><a rel="tag" href="http://www.microsoft.com/expression/products/overview.aspx?key=design">expression design</a></strong> is that of <strong>xaml</strong> generation of the layers and/or complete surface.  you didn't know design can generate xaml?  shame on you.  i did a <strong>podcast</strong> (you should really subscribe to the podcast feed on the left of my blog or just use this link) talking about using vector images (svg) and importing into expression design and getting xaml that you could use in your applications.  </p>
<p>there are essentially two ways of doing this in expression design:</p>
<ol>
    <ol>
        <li>if you only want pieces of your design file to be xaml (i.e., you want to xaml-ize a fragment of the design), you can select the layer(s) in your design file and go to the edit menu and choose 'Copy as XAML' and bam, you now have xaml for those selected fragments in your clipboard.  go forth and develop. </li>
        <li>if you want the entire design surface to be a xaml representation, you would use the file menu and choose export.  from there you'll be presented with what looks like a typical 'save as' dialog box.  change the file type to xaml and after choosing location/name click ok.  you'll now be presented with a much improved options window (in service pack 1): </li>
    </ol>
</ol>
<p><img alt="" src="http://s3.amazonaws.com/timheuer-img/xaml-sp1.png" /></p>
<p>in previous versions the options weren't exactly clear.  for instance the xaml type you wanted (either WPF or <a rel="tag" href="http://silverlight.net"><strong>silverlight</strong></a>) was in a different tab).  i really like this improved export user interface.  i especially like the option of converting text to paths.  this really helps when you don't want to (or can't) redistribute any type faces.  upon export, you will get all the xaml plus (if you chose that option) path data for your text areas.  very cool.</p>
<p>so if you have design files or vector files that you would want to use in silverlight, this is the perfect tool and function to create the xaml representation of that data.  so go <strong><a href="http://www.microsoft.com/downloads/details.aspx?FamilyId=937ADF32-0FEA-4BB7-B727-CBFBDF3FE032&amp;displaylang=en">get service pack 1</a></strong> for expression design and you'll be happy.</p>
<div class="wlWriterSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:8dbce03c-a52e-456a-b73e-50e2911c2aa6" style="PADDING-RIGHT: 0px; DISPLAY: inline; PADDING-LEFT: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; PADDING-TOP: 0px"></div>
