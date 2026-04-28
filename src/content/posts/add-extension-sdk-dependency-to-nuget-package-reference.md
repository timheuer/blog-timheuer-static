---
title: "Adding an Extension SDK dependency to your NuGet package"
slug: "add-extension-sdk-dependency-to-nuget-package-reference"
pubDate: 2013-11-25T17:08:47.000Z
lastModified: 2019-10-23T04:20:41.000Z
categories:
  - "sdk"
  - "visual studio"
  - "nuget"
  - "callisto"
  - "extension sdk"
draft: false
---

<p>Recently I’ve been writing a few XAML Behaviors for <strong><a href="http://winrtxamltoolkit.com/">Callisto</a></strong> and looking to take some contributions on this front as well.  One thing that I realized is that this will bring in a new dependency for my toolkit.  I’m still trying to figure out if I want to do that or not, but that’s not what this post is about.  My #1 consumers of Callisto are using the <a href="https://www.nuget.org/packages/Callisto/">NuGet package</a>.  I also distribute Callisto through the Visual Studio gallery as an Extension SDK.  </p>  <p>What’s the difference you ask?</p>  <h2>Extension SDK vs. NuGet package</h2>  <p>While not an official answer, this is my basic definition I always describe to people.  It is not complete comparing all features but defines what I see as the core difference between the two.</p>  <p>An <strong><a href="http://msdn.microsoft.com/en-us/library/vstudio/hh768146.aspx#ExtensionSDKs">Extension SDK</a></strong> is installed <strong>per-machine</strong> and allows you to install it once and use for multiple projects.  It is deployed through the Visual Studio extensions mechanism (VSIX) which has a feature that allows for you to be notified if a version is updated in the IDE.  This is a proactive update that even if you just have VS open you get a little toast if any of your extensions are updated…very handy.  Extension SDKs also have some cool features about enabling you to supply design-time assets that don’t ship with your application and also provide some nice per-architecture deployment capabilities rather easily.  Extensions SDKs have great support for native projects as well.</p>  <blockquote>   <p><strong>NOTE</strong>: People sometimes confuse VSIX == Extension SDK.  VSIX is a packaging and installer mechanism, not an SDK only.  You can have a VSIX that deploys a tool, templates or an SDK.  </p> </blockquote>  <p>A <strong>NuGet package</strong> is installed <strong>per-project </strong>when added as a reference to your project in Visual Studio.  You can add them similarly through the “Add Reference” type dialogs (although in VS it is called Manage NuGet References) and once you select your package it is installed (per the package’s manifest instructions) into your project.  If you want to use the package for multiple projects, you must repeat this step for each project.  One benefit of the NuGet route is that it does become a part of your project, you can check it in to source control, etc.  One disadvantage currently is it doesn’t do the design-time aspects and the per-architecture deployment aspects well.</p>  <p>You might look at these differences and wonder why you would want to take a dependency on a per-machine item in a per-project package.  And you’d be right to ask that question.  Again, I’m still wondering myself.  However one thing to note is some Microsoft-delivered SDKs are delivered shipped with Visual Studio as Extension SDKs, as is the case with the Behaviors SDK.  So you can’t have VS installed without it, but NuGet also can be used in non-VS scenarios as well.  This can be complex <em>depending on your package/needs</em>.  For mine, this might be acceptable.</p>  <h2>Telling your NuGet package to include an Extension SDK</h2>  <p>I admit that this title is a bit misleading, but allow me to explain first.  NuGet allows for you to extend the package install a bit by including a<strong> </strong><a href="http://docs.nuget.org/docs/creating-packages/creating-and-publishing-a-package#powershell"><strong>PowerShell</strong> script</a> to run during install (and uninstall) of the package.  This script can give you context of 4 things in your project/tools environment: install path (where the package is being installed), tools path (the folder where the script will actually reside), package (the NuGet package object) and project (a reference to the IDE Project instance).  It is this last piece that helps you manipulate the project structure.</p>  <p>In Visual Studio 2012 a new interface was added to the VS project extensibility to accommodate automating adding Extension SDKs.  This new interface, <strong><a href="http://msdn.microsoft.com/en-us/library/vstudio/vslangproj110.references2.aspx">References2</a></strong>, includes a new method <strong><a href="http://msdn.microsoft.com/en-us/library/vstudio/vslangproj110.references2.addsdk.aspx">AddSDK</a></strong>.  This is the hook where you can add Extension SDKs.</p>  <blockquote>   <p><strong>NOTE</strong>: The other methods of Add() are still supported and would allow you to add references to files, GAC assemblies, etc.</p> </blockquote>  <p>The AddSDK has 2 parameters but only one is required, the identifier of the <a href="http://msdn.microsoft.com/en-us/library/vstudio/hh768146.aspx#ExtensionSDKs"><strong>Extension SDK</strong></a> (it is weird to me that the first param is optional but oh well).  The ID of the Extension SDK is the name of the SDK (as defined by the deployed folder or the ProductFamilyName in the SDKManifest.xml) combined with the version number.  A final string to pass in the second parameter of AddSDK is then something like:</p>  <pre class="brush: plain;">BehaviorsXamlSDKManaged, version=12.0</pre>

<p>Now that we know this format we can add this to our NuGet install PowerShell script.  Here’s an example of what one might look like:</p>

<pre class="brush: ps; highlight: [1,8];">param($installPath, $toolsPath, $package, $project)
$moniker = $project.Properties.Item("TargetFrameworkMoniker").Value
$frameworkName = New-Object System.Runtime.Versioning.FrameworkName($moniker)
Write-Host "TargetFrameworkMoniker: " $moniker
if ($frameworkName.Version.Build -ge 1)
{
    Write-Host "Adding Behaviors SDK (XAML)"
    $project.Object.References.AddSDK("Behaviors SDK (XAML)", "BehaviorsXamlSDKManaged, version=12.0")
}</pre>

<p>Notice the first line with the param() function.  Per the NuGet documentation this is required to get the environment objects like $project.  Now in line 8 we have a reference to the VSProject, then can get at its object model, get to the references and add one to an Extension SDK, in this case the Behaviors SDK installed with Visual Studio 2013.</p>

<p>The tricky thing with this approach is that when someone were to remove a package you may be tempted to remove the SDK reference as well.  Since there is not really good tracking whether someone may be using the reference, it is advised against that approach.  Your app developer may be using that Extension SDK now outside of your package and you have no reliable way of knowing that.  What you can do is alert the developer during uninstall:</p>

<pre class="brush: ps;">param($installPath, $toolsPath, $package, $project)
Write-Host "Callisto was removed, however Blend SDK (XAML) was not
 as it may be a dependent reference on other things in your project.
  If you do not need it, manually remove it."</pre>

<p>Not awesome, but helpful at least to output some data to the developer.</p>

<h2>Summary</h2>

<p>Again, while this may be unconventional and some NuGet purists will scoff at the mere suggestion of doing something like this, it is good to know this is easily available.  My goal is to help developers (including myself) and if there are ways to merge these two worlds of Extension SDKs and NuGet packages until (if?) they unify then by all means I love helping make my productivity better.</p>

<p>Hope this helps anyone!</p>

<div id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:c474f560-5058-45af-b31c-8201f9fa83b8" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px"></div>
