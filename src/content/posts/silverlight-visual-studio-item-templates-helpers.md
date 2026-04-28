---
title: "Silverlight Visual Studio helper files"
slug: "silverlight-visual-studio-item-templates-helpers"
pubDate: 2009-05-19T22:43:04.000Z
lastModified: 2019-10-23T04:20:29.000Z
categories:
  - "silverlight"
  - "xaml"
  - "visual studio"
  - "ria"
  - "cross domain"
  - "code snippet"
  - "snippet"
  - "pixel shader"
  - "resourcedictionary"
draft: false
---

<p>For things that aren’t a part of the <strong>Visual Studio</strong> tools (yet) and things that help me move faster in my development, I like to take advantage of the power of Visual Studio’s templates and snippets capabilities.  I’ve created a few and modified a few of others that I use regularly.  I’ve shown them in a few presentations and thought I’d package them up in a single bundle for your convenience if you choose to use them.  I was going to package <a href="http://blog.nerdplusart.com/archives/silverlight-code-snippets">Robby’s snippets</a> up as well, but didn’t think he’d appreciate that…you should get his <a href="http://silverlight.net/"><strong>Silverlight</strong></a> snippets as well (and he’s packaged them in a VS community installer also).</p>
<p>Here’s the ones that I have in my package right now:</p>
<ul>
    <li><strong>FloatableWindow </strong>item template – this is from <a href="http://timheuer.com/blog/archive/2009/05/10/silverlight-childwindow-non-modal-refactor.aspx">my adaptation of ChildWindow</a>.  You’ll of course need the binary for this to make any sense as well.</li>
    <li><strong>Silverlight Pixel Shader </strong>item template – adapted from the WPF template, with making the minor adjustments needed by default to make it work in one shot.</li>
    <li><strong>ResourceDictionary </strong>item template – using Nick Kramer’s base for adding stand alone ResourceDictionary files to your project (to take advantage of the <a href="http://timheuer.com/blog/archive/2009/03/18/silverlight-3-whats-new-a-guide.aspx#merged">merged resource feature</a> in <strong>Silverlight 3</strong>).</li>
    <li><strong>Cross-domain policy file </strong>item template – rapidly add one just like you would web.config.  You still have to set the desired security – I chose not to imply one for you :-)</li>
    <li><strong>Cross-domain policy code snippet </strong>– this actually goes along with the policy file (or replacement) which is a VS code snippet template if you want to just use that instead</li>
</ul>
<p>I’m sure I’ll add more over time and package it in this update but for now this is what I could pull together.  Sorry the package isn’t signed as a verified publisher…if I could figure out how to do that I would have tried :-).  You can download them here: <a href="http://s3.amazonaws.com:80/storage.timheuer.com/SilverlightVSHelpers_1.vsi">SilverlightVSHelpers_1.vsi</a>.  Oh and yes, they are for Visual Basic and C#.</p>
<p>Hope this helps!</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:44f21021-3385-4b44-a960-84e97e53b5d7" style="margin: 0px; padding: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
