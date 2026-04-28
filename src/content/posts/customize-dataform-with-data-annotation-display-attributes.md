---
title: "Silverlight DataForm helpers"
slug: "customize-dataform-with-data-annotation-display-attributes"
pubDate: 2009-05-25T09:19:19.000Z
lastModified: 2019-10-23T04:20:29.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "riaservices"
  - "dataform"
  - "data annotations"
  - "annotations"
  - "model"
draft: false
---

<p>If you looked at the <a href="http://timheuer.com/blog/archive/2009/05/19/silverlight-net-ria-services-updated.aspx">updated RIA Services Business Application</a> template which had the authentication built-in, you may have seen the login screen with a little icon next to the password field:</p>
  
<p><img src="http://s3.amazonaws.com:80/storage.timheuer.com/bizapptemplate-register.png" alt="Biz App Login Template" title="Biz App Login Template" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
  
<p>When you hover over this some helpful information displays in tool tip form:</p>
  
<p><img src="http://s3.amazonaws.com:80/storage.timheuer.com/bizapptemplate-passwordhelper.png" alt="Tooltip Helper" title="Tooltip Helper" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
  
<p>So how did that get there?  The power of the data annotations.  If you look at your model definition, you can add a DisplayAttribute and provide some additional information.  Let’s take a look at a simple example.  Here’s the simple model:</p>
  
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">   
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">     
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">class</span> PersonModel</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> {</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">string</span> FirstName { get; set; }</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">string</span> LastName { get; set; }</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">string</span> EmailAddress { get; set; }</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">string</span> Gender { get; set; }</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">int</span> Age { get; set; }</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span> }</pre>
<!--CRLF--></div>
</div>
<p>and the DataForm generated:</p>
<p><img src="http://s3.amazonaws.com:80/storage.timheuer.com/dataform-simplemodel1.png" alt="DataForm with no Attributes" title="DataForm with no Attributes" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>Not too helpful.  Now, let’s modify our model with some attributes:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">   
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">     
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">class</span> PersonModel</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> {</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span>     [Required()]</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>     [Display(Name=<span style="color: rgb(0, 96, 128);">"First Name:"</span>)]</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">string</span> FirstName { get; set; }</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span>     </pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>     [Required()]</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span>     [Display(Name = <span style="color: rgb(0, 96, 128);">"Last Name:"</span>)]</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum9" style="color: rgb(96, 96, 96);">   9:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">string</span> LastName { get; set; }</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum10" style="color: rgb(96, 96, 96);">  10:</span>  </pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum11" style="color: rgb(96, 96, 96);">  11:</span>     [Display(Name = <span style="color: rgb(0, 96, 128);">"Email Address:"</span>, </pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum12" style="color: rgb(96, 96, 96);">  12:</span>         Description=<span style="color: rgb(0, 96, 128);">"We do not sell your information!"</span>)]</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum13" style="color: rgb(96, 96, 96);">  13:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">string</span> EmailAddress { get; set; }</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum14" style="color: rgb(96, 96, 96);">  14:</span>  </pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum15" style="color: rgb(96, 96, 96);">  15:</span>     [Display(Description=<span style="color: rgb(0, 96, 128);">"Used for demographics"</span>)]</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum16" style="color: rgb(96, 96, 96);">  16:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">string</span> Gender { get; set; }</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum17" style="color: rgb(96, 96, 96);">  17:</span>  </pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum18" style="color: rgb(96, 96, 96);">  18:</span>     <span style="color: rgb(0, 0, 255);">public</span> <span style="color: rgb(0, 0, 255);">int</span> Age { get; set; }</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum19" style="color: rgb(96, 96, 96);">  19:</span> }</pre>
<!--CRLF--></div>
</div>
<p>And here is the new auto generated DataForm:</p>
<p><img src="http://s3.amazonaws.com:80/storage.timheuer.com/dataform-simplemode2.png" alt="DataForm with Display Attributes" title="DataForm with Display Attributes" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>Much more friendly to the user, and from a code perspective, we wouldn’t have to change how we work with our model.  We get some free visuals and functionality with some simple attribute properties.</p>
<p>Also, did you know that you could bind multiple items to the DataForm and get automatic paging and add new functionality?  Given this code:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">   
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">     
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> ObservableCollection&lt;PersonModel&gt; people = <span style="color: rgb(0, 0, 255);">new</span> ObservableCollection&lt;PersonModel&gt;();</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span> <span style="color: rgb(0, 0, 255);">for</span> (<span style="color: rgb(0, 0, 255);">int</span> i = 0; i &lt; 10; i++)</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span> {</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>     PersonModel p = <span style="color: rgb(0, 0, 255);">new</span> PersonModel() { FirstName = <span style="color: rgb(0, 96, 128);">"First"</span> + i.ToString(), LastName = <span style="color: rgb(0, 96, 128);">"Last "</span> + i.ToString(), Age = i };</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>     people.Add(p);</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span> }</pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>  </pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span> DataBrowser.ItemsSource = people;</pre>
<!--CRLF--></div>
</div>
<p>Check out what is generated:</p>
<p><img src="http://s3.amazonaws.com:80/storage.timheuer.com/dataform-simplemodel3.png" alt="DataForm multiple data binding" title="DataForm multiple data binding" style="display: block; float: none; margin-left: auto; margin-right: auto;" /></p>
<p>Notice the pager and add new buttons.  Nice.  If you’re wondering how to get more granular control over the field displays, it is similar to DataGrid in that you can turn off auto generation of fields and provide your own implementation through custom DataFields:</p>
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 97.5%; font-family: 'Courier New',courier,monospace; direction: ltr; font-size: 8pt; cursor: text;">   
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;">     
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: rgb(96, 96, 96);">   1:</span> <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">datacontrols:DataForm</span> <span style="color: rgb(255, 0, 0);">x:Name</span><span style="color: rgb(0, 0, 255);">="DataBrowser"</span> <span style="color: rgb(255, 0, 0);">Width</span><span style="color: rgb(0, 0, 255);">="400"</span> <span style="color: rgb(255, 0, 0);">AutoGenerateFields</span><span style="color: rgb(0, 0, 255);">="False"</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum2" style="color: rgb(96, 96, 96);">   2:</span>     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">datacontrols:DataForm.Fields</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum3" style="color: rgb(96, 96, 96);">   3:</span>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">datacontrols:DataFormTextField</span> <span style="color: rgb(255, 0, 0);">Binding</span><span style="color: rgb(0, 0, 255);">="{Binding FirstName}"</span> </pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum4" style="color: rgb(96, 96, 96);">   4:</span>                 <span style="color: rgb(255, 0, 0);">FieldLabelContent</span><span style="color: rgb(0, 0, 255);">="First Name: "</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum5" style="color: rgb(96, 96, 96);">   5:</span>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">datacontrols:DataFormTextField</span> <span style="color: rgb(255, 0, 0);">Binding</span><span style="color: rgb(0, 0, 255);">="{Binding LastName}"</span> </pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum6" style="color: rgb(96, 96, 96);">   6:</span>                 <span style="color: rgb(255, 0, 0);">FieldLabelContent</span><span style="color: rgb(0, 0, 255);">="Last Name: "</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum7" style="color: rgb(96, 96, 96);">   7:</span>         <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">datacontrols:DataFormTemplateField</span> <span style="color: rgb(255, 0, 0);">FieldLabelContent</span><span style="color: rgb(0, 0, 255);">="Age"</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum8" style="color: rgb(96, 96, 96);">   8:</span>             <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">datacontrols:DataFormTemplateField.DisplayTemplate</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum9" style="color: rgb(96, 96, 96);">   9:</span>                 <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">DataTemplate</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum10" style="color: rgb(96, 96, 96);">  10:</span>                     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">TextBlock</span> <span style="color: rgb(255, 0, 0);">Text</span><span style="color: rgb(0, 0, 255);">="{Binding Age}"</span> <span style="color: rgb(255, 0, 0);">FontSize</span><span style="color: rgb(0, 0, 255);">="24"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum11" style="color: rgb(96, 96, 96);">  11:</span>                 <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">DataTemplate</span><span style="color: rgb(0, 0, 255);">&gt;</span>       </pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum12" style="color: rgb(96, 96, 96);">  12:</span>             <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">datacontrols:DataFormTemplateField.DisplayTemplate</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum13" style="color: rgb(96, 96, 96);">  13:</span>             <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">datacontrols:DataFormTemplateField.EditTemplate</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum14" style="color: rgb(96, 96, 96);">  14:</span>                 <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">DataTemplate</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum15" style="color: rgb(96, 96, 96);">  15:</span>                     <span style="color: rgb(0, 0, 255);">&lt;</span><span style="color: rgb(128, 0, 0);">TextBox</span> <span style="color: rgb(255, 0, 0);">Text</span><span style="color: rgb(0, 0, 255);">="{Binding Age}"</span> <span style="color: rgb(0, 0, 255);">/&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum16" style="color: rgb(96, 96, 96);">  16:</span>                 <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">DataTemplate</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum17" style="color: rgb(96, 96, 96);">  17:</span>             <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">datacontrols:DataFormTemplateField.EditTemplate</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum18" style="color: rgb(96, 96, 96);">  18:</span>         <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">datacontrols:DataFormTemplateField</span><span style="color: rgb(0, 0, 255);">&gt;</span>       </pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum19" style="color: rgb(96, 96, 96);">  19:</span>     <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">datacontrols:DataForm.Fields</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF-->      
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: rgb(244, 244, 244); width: 100%; font-family: 'Courier New',courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum20" style="color: rgb(96, 96, 96);">  20:</span> <span style="color: rgb(0, 0, 255);">&lt;/</span><span style="color: rgb(128, 0, 0);">datacontrols:DataForm</span><span style="color: rgb(0, 0, 255);">&gt;</span></pre>
<!--CRLF--></div>
</div>
<p>Hope this helps!</p>
<div class="wlWriterEditableSmartContent" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:eda0ca04-5e83-4ca9-85fd-0e4157dfbbf1" style="margin: 0px; padding: 0px; display: inline; float: none;"></div>
<div style="margin: 0px; padding: 0px;" class="wlWriterHeaderFooter"><hr />
<div class="cc-license">This work is licensed under a <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution By license.</a></div>
</div>
