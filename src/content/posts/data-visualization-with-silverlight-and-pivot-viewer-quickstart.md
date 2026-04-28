---
title: "Quick Steps to displaying data using PivotViewer and Silverlight"
slug: "data-visualization-with-silverlight-and-pivot-viewer-quickstart"
pubDate: 2010-07-09T11:47:04.000Z
lastModified: 2019-10-23T04:20:36.000Z
categories: []
draft: false
---

<p>Last week or so the <a href="http://silverlight.net/learn/pivotviewer/">PivotViewer</a> control was released, which is from the Microsoft LiveLabs team.  It’s a <a href="http://www.silverlight.net">Silverlight</a> control that enables you to visualize data information in a DeepZoom type experience.  Be sure to check out the <a href="http://silverlight.net/learn/pivotviewer/">PivotViewer learning section</a> for some initial information if you haven’t seen any demonstrations.</p>  <p>I received an email a few days back hoping for a more quick “how to” on using this control.  After all, it is a control for Silverlight and requires some implementation.  Honestly, I hadn’t even used it myself until I got that note.  I thought I’d jot down my notes in creating and consuming <strong><em>the simplest form of data and display</em></strong> using PivotViewer.  I say “simple” because you can get much more complex, but I wanted to simply show the quick steps.</p>  <p>Understand first that Pivot collections are a combinations of imagery and metadata that describe that imagery.  If you’ve ever seen the <a href="http://memorabilia.hardrock.com/">Hard Rock Memorabilia</a> site that was done in early Silverlight days, this is the similar concept.</p>  <h2>Step 1 – Get PivotViewer</h2>  <p>The first thing you need to do is get the bits.  I’m going to assume you <em>already have Visual Studio 2010 and Silverlight 4 Tools installed</em>.  You can get the PivotViewer SDK at the <a href="http://silverlight.net/learn/pivotviewer">PivotViewer learning section</a> of the Silverlight community site.  Once you run the installer, the SDK will be installed to %ProgramFiles%\Microsoft SDKs\Silverlight\v4.0\PivotViewer\&lt;RELEASE&gt;.  There is a sample folder with source for an implementation as well if you want to look at it, but it has custom actions and things that you may not need.  My steps below are the “PivotViewer 101” steps to get a simple collection.  The sample provides more sample code to do other things with PivotViewer.</p>  <h2>Step 2 – Get Pivot collection building tools</h2>  <p>In order to use the control, you must have a Pivot collection source.  This is a specific data format in XML that the PivotViewer (and Pivot full client) use to understand the data.  The XML schema is documented here: <a href="http://www.silverlight.net/learn/pivotviewer/collection-xml-schema/">PivotViewer Collection XML Schema</a>.  As you can see it is fairly simple.  You could certainly build this by hand, but why would you when there are a few tools to help you!</p>  <p>There are 3 primary methods to create collection sources the way I see it: command-line, code library, and Excel.  The first two are most likely what any dynamic collection source will want to use.  These would be code-based approaches to looking at various types of data sources, appending metadata, and creating dynamically created collection sources or JIT-created ones as well.</p>  <p>The latter, using Excel, is the simplest.  The LiveLabs team created an Excel add-in to create the collection data using a familiar interface without having to really wrestle with the collection schema.  Once installed you have a new tab in Excel:</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Excel PivotViewer collection tool" alt="Excel PivotViewer collection tool" src="http://storage2.timheuer.com/pivot-viewer-tab.png" /></p>  <p>When you click the <em>New Collection</em> button on this tab, you’ll get a simple spreadsheet to start building your collection source.</p>  <h2>Step 3 – Begin to build your collection data</h2>  <p>For my sample, I’m going to use Bing’s wallpaper images from their last “Bing’s Best” Windows 7 themes.  Having my Excel sheet opened and already clicking on the <em>New Collection</em> function, I can now use the <em>Import Images</em> function to do this in bulk.  Now I don’t have to do this.  In fact, I can do one-by-one using the <em>Choose Image</em> function and select individual items.</p>  <p>I then wanted to provide a category column to enable my user to filter based on categories.  I used the <em>Insert Column</em> feature and gave it the title of Category.  These columns translate to Facets and if you see the <a href="http://www.silverlight.net/learn/pivotviewer/collection-xml-schema/">schema definition diagram</a> you will see that those visually translate to filters in the control.</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Building collection data" alt="Building collection data" src="http://storage2.timheuer.com/pivot-viewer-tab2.png" /></p>  <p>Add your data until you are satisfied that you have all your data and metadata represented in this spreadsheet.  I only added one column but you could add more.  I am now complete and can choose to <em>Publish</em> my collection.</p>  <p>The result of the Publish function is that it will produce a file (CXML) and a folder of your DeepZoom-sliced images.  Remember this location of your data.</p>  <h2>Step 4 – Build a Silverlight application implementing PivotViewer</h2>  <p>Assuming you have the SDK installed, start a new Silverlight project in Visual Studio.  After that here were my simple steps:</p>  <p><em>Add reference to System.Windows.Pivot</em> – add a reference to this assembly as this is where the PivotViewer control resides.</p>  <p>In my MainPage.xaml I then add an XMLNS declaration for the namespace and implement the control:</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">UserControl</span> <span class="attr">x:Class</span><span class="kwrd">="SilverlightApplication164.MainPage"</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>     <span class="attr">xmlns</span><span class="kwrd">="http://schemas.microsoft.com/winfx/2006/xaml/presentation"</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="attr">xmlns:x</span><span class="kwrd">="http://schemas.microsoft.com/winfx/2006/xaml"</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     <span class="attr">xmlns:d</span><span class="kwrd">="http://schemas.microsoft.com/expression/blend/2008"</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     <span class="attr">xmlns:mc</span><span class="kwrd">="http://schemas.openxmlformats.org/markup-compatibility/2006"</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>              <span class="attr">xmlns:pivot</span><span class="kwrd">="clr-namespace:System.Windows.Pivot;assembly=System.Windows.Pivot"</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>     <span class="attr">mc:Ignorable</span><span class="kwrd">="d"</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>     <span class="attr">d:DesignHeight</span><span class="kwrd">="300"</span> <span class="attr">d:DesignWidth</span><span class="kwrd">="400"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>     <span class="kwrd">&lt;</span><span class="html">Grid</span> <span class="attr">x:Name</span><span class="kwrd">="LayoutRoot"</span> <span class="attr">Background</span><span class="kwrd">="White"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>         <span class="kwrd">&lt;</span><span class="html">pivot:PivotViewer</span> <span class="attr">x:Name</span><span class="kwrd">="MainPivotViewer"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>     <span class="kwrd">&lt;/</span><span class="html">Grid</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span> <span class="kwrd">&lt;/</span><span class="html">UserControl</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>That’s it for my simple scenario on the UI front.  I’m taking the approach that my app *is* the entire PivotViewer experience.</p>

<p>The next thing I wanted to do was make my simple viewer dynamic.  I wanted this same XAP to be used for any collection.  In my MainPage.xaml.cs code in the Loaded event I use the PivotViewer API and call the LoadCollection function:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">public</span> MainPage()</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     InitializeComponent();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     Loaded += <span class="kwrd">new</span> RoutedEventHandler(MainPage_Loaded);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span> }</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span> <span class="kwrd">void</span> MainPage_Loaded(<span class="kwrd">object</span> sender, RoutedEventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>     <span class="kwrd">string</span> collection = App.Current.Host.InitParams[<span class="str">"collection"</span>].ToString();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>     MainPivotViewer.LoadCollection(collection, <span class="kwrd">string</span>.Empty);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span> }</pre>
<!--CRLF--></div>
</div>

<p>You’ll notice that I’m getting a value from Silverlight’s InitParams model.  This enables me to send in the URL of the collection dynamically in my HTML hosting page:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">object</span> <span class="attr">data</span><span class="kwrd">="data:application/x-silverlight-2,"</span> <span class="attr">type</span><span class="kwrd">="application/x-silverlight-2"</span> <span class="attr">width</span><span class="kwrd">="100%"</span> <span class="attr">height</span><span class="kwrd">="100%"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="source"</span> <span class="attr">value</span><span class="kwrd">="ClientBin/SilverlightApplication164.xap"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="onError"</span> <span class="attr">value</span><span class="kwrd">="onSilverlightError"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="background"</span> <span class="attr">value</span><span class="kwrd">="white"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="minRuntimeVersion"</span> <span class="attr">value</span><span class="kwrd">="4.0.50424.0"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="autoUpgrade"</span> <span class="attr">value</span><span class="kwrd">="true"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>   <span class="kwrd">&lt;</span><span class="html">param</span> <span class="attr">name</span><span class="kwrd">="initParams"</span> <span class="attr">value</span><span class="kwrd">="collection=URL_TO_CXML"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>   <span class="kwrd">&lt;</span><span class="html">a</span> <span class="attr">href</span><span class="kwrd">="http://go.microsoft.com/fwlink/?LinkID=149156&amp;v=4.0.50424.0"</span> <span class="attr">style</span><span class="kwrd">="text-decoration:none"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>        <span class="kwrd">&lt;</span><span class="html">img</span> <span class="attr">src</span><span class="kwrd">="http://go.microsoft.com/fwlink/?LinkId=161376"</span> <span class="attr">alt</span><span class="kwrd">="Get Microsoft Silverlight"</span> <span class="attr">style</span><span class="kwrd">="border-style:none"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>   <span class="kwrd">&lt;/</span><span class="html">a</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span> <span class="kwrd">&lt;/</span><span class="html">object</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>So I can re-use this XAP in many places and just change the initParams value in the &lt;object&gt; tag.  I build the XAP and now I can place it anywhere.</p>

<h2>Step 5- Publish the result</h2>

<p>The final step is to publish everything.  Remember the CXML file and the folder of images?  They need to reside somewhere.  Here are two critical things to note:</p>

<ul>
  <li>If they (collection CXML file and images) are <strong>not</strong> residing in the same location as the XAP implementing the PivotViewer control, it must have cross-domain policies (clientaccesspolicy.xml) in place persuant to the rules of Silverlight and cross-domain.  Otherwise it won’t work.  PivotViewer makes network requests and this policy is required by Silverlight in cross-domain situations.</li>

  <li>You <em>may</em> need to add a MIME type mapping on your server in order to serve the CXML file.  I did (on Windows 2003).  I simply added a MIME type mapping for .cxml and gave it the content type of <em>text/xml</em> and it worked.</li>
</ul>

<p>Once I have all that published, I can deploy my HTML page hosting the XAP and pointing to my collection source.  As an example, here is my final result for this: <a href="http://timheuer.com/silverlight/bingbest">Bing’s Best Pivot Collection</a>.  Notice how the Category column now shows as a filter source on the left.  Had I made more columns, there would be more filter options.  I also could have made more metadata and populated the HREF attribute of the data to actually link to something.</p>

<p>The cool thing as well is that any collection that works with the Pivot schema works.  You can find some samples at the <a href="http://www.getpivot.com/developer-info/#Kinds_of_Collections">GetPivot Developer site</a>:</p>

<ul>
  <li><a title="http://content.getpivot.com/Collections/dogbreeds/dogbreeds.cxml" href="http://content.getpivot.com/Collections/dogbreeds/dogbreeds.cxml">http://content.getpivot.com/Collections/dogbreeds/dogbreeds.cxml</a></li>

  <li><a title="http://content.getpivot.com/Collections/sportsillustrated/sportsillustrated.cxml" href="http://content.getpivot.com/Collections/sportsillustrated/sportsillustrated.cxml">http://content.getpivot.com/Collections/sportsillustrated/sportsillustrated.cxml</a></li>

  <li><a title="http://content.getpivot.com/Collections/2009nflteams/2009nflteams.cxml" href="http://content.getpivot.com/Collections/2009nflteams/2009nflteams.cxml">http://content.getpivot.com/Collections/2009nflteams/2009nflteams.cxml</a></li>
</ul>

<p>Using the project the way I created it, I can just input these URLs in my initParams to change the collection I want it to view.  I was also able to use the <a href="http://www.liveside.net/main/archive/2009/11/29/creating-the-microsoft-executive-pivot-we-play-and-you-can-too.aspx">Microsoft Organization Pivot Collection that LiveSide created</a> directly in this without modification as well: <a href="http://timheuer.com/silverlight/msorgpivot/">MSFT Organization Pivot in Silverlight</a>.</p>

<h2>Summary</h2>

<p>After spending a few minutes with the control, the simplest display scenario is very simple.  In fact, <em>creating</em> the collection source I think will be the most challenging…to determine what is the appropriate metadata that you need and want to display to your users to interact with in your application.</p>

<p>You can download my sample project here: <a href="http://storage2.timheuer.com/PivotViewerSimpleSample.zip">PivotViewerSimpleSample.zip</a></p>

<p>Hope this helps!</p>
