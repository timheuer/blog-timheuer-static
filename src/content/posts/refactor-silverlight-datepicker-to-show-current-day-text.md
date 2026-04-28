---
title: "Changing DatePicker in Silverlight to show current date"
slug: "refactor-silverlight-datepicker-to-show-current-day-text"
pubDate: 2009-10-05T10:51:58.000Z
lastModified: 2019-10-23T04:20:31.000Z
categories:
  - "silverlight"
  - "expression"
  - "blend"
  - "expression blend"
  - "xaml"
  - "ria"
  - "silverlight toolkit"
  - "datepicker"
draft: false
---

<p>This past weekend during a conversation about <a href="http://silverlight.net"><strong>Silverlight</strong></a> controls at the San Diego Silverlight Education Day, someone asked about the DatePicker control and why the “15” is there and how come they can’t change it.  Here’s the control that was being referred to:</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Silverlight DatePicker default" alt="Silverlight DatePicker default" src="http://storage.timheuer.com/defaultdatepicker.png" /></p>  <p>The calendar displays an icon to the right of the text box area which, when clicked, displays a drop-down calendar picker.  The icon always says “15” and is intended to look like a little calendar date sheet (you know, like those desk calendars).</p>  <p>The question was how to change that icon.  Well, easily.  You can easily edit the template using Blend and drill into the UI parts and change it.  I opened Blend, chose to edit the template, then edit the Button template and you’ll see that the “15” is actually a Path:</p>  <p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="DatePicker custom template in Blend" alt="DatePicker custom template in Blend" src="http://storage.timheuer.com/datpicker-custombuttontemplate.png" /></p>  <p>Now that I know where that template is, I can put anything i want there to replace the Path data to anything I want.  But the question was raised as to why it doesn’t show the current date text instead.  So on the plane ride back I did a quick refactor to see how easy that could be done.</p>  <p>After getting the <a href="http://opensource.org/licenses/ms-pl.html"><strong>Ms-PL</strong></a> licensed source code for the DatePicker control from the <a href="http://silverlight.codeplex.com"><strong>Silverlight Toolkit</strong></a>, I had access to the full source of the control to get the inner guts.  Here’s what I did.  </p>  <p>First, I changed generic.xaml (located in Themes folder) definition of DatePicker style/template.  I changed the Path to a ContentPresenter (about line 437 in the generic.xaml file).  I removed the Path and replaced it with this:</p>  <div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">   <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">     <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #0000ff">&lt;</span><span style="color: #800000">ContentPresenter</span> <span style="color: #ff0000">x:Name</span><span style="color: #0000ff">="DropDownDateText"</span> <span style="color: #ff0000">HorizontalAlignment</span><span style="color: #0000ff">="Center"</span> <span style="color: #ff0000">Margin</span><span style="color: #0000ff">="0,0,0,0"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span>     <span style="color: #ff0000">VerticalAlignment</span><span style="color: #0000ff">="Center"</span> <span style="color: #ff0000">RenderTransformOrigin</span><span style="color: #0000ff">="0.5,0.5"</span> <span style="color: #ff0000">Grid</span>.<span style="color: #ff0000">Column</span><span style="color: #0000ff">="0"</span> <span style="color: #ff0000">Grid</span>.<span style="color: #ff0000">Row</span><span style="color: #0000ff">="1"</span> </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>     <span style="color: #ff0000">Grid</span>.<span style="color: #ff0000">ColumnSpan</span><span style="color: #0000ff">="4"</span> <span style="color: #ff0000">Grid</span>.<span style="color: #ff0000">RowSpan</span><span style="color: #0000ff">="3"</span><span style="color: #0000ff">/&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Once I had that in place I just went into OnApplyTemplate in DatePicker.cs and after the call to <em>base.OnApplyTemplate()</em> (line 851) I added some additional code:</p>

<div style="border-bottom: silver 1px solid; text-align: left; border-left: silver 1px solid; padding-bottom: 4px; line-height: 12pt; background-color: #f4f4f4; margin: 20px 0px 10px; padding-left: 4px; width: 97.5%; padding-right: 4px; font-family: 'Courier New', courier, monospace; direction: ltr; font-size: 8pt; overflow: auto; border-top: silver 1px solid; cursor: text; border-right: silver 1px solid; padding-top: 4px" id="codeSnippetWrapper">
  <div style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px" id="codeSnippet">
    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum1">   1:</span> <span style="color: #008000">// change the date to the current date</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum2">   2:</span> <span style="color: #0000ff">string</span> DateDay = DateTime.Now.Day.ToString(CultureInfo.CurrentUICulture);</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum3">   3:</span>  </pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum4">   4:</span> <span style="color: #008000">// get the Button template and insert the content as current date text</span></pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum5">   5:</span> Button b = <span style="color: #0000ff">this</span>.GetTemplateChild(DatePicker.ElementButton) <span style="color: #0000ff">as</span> Button;</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum6">   6:</span> TextBlock tb = <span style="color: #0000ff">new</span> TextBlock();</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum7">   7:</span> tb.FontFamily = <span style="color: #0000ff">new</span> FontFamily(<span style="color: #006080">"Arial Bold"</span>);</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum8">   8:</span> tb.FontSize = 9.5;</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum9">   9:</span> tb.FontStretch = FontStretches.Expanded;</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum10">  10:</span> tb.UseLayoutRounding = <span style="color: #0000ff">true</span>;</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum11">  11:</span> tb.Text = DateDay;</pre>
<!--CRLF-->

    <pre style="border-bottom-style: none; text-align: left; padding-bottom: 0px; line-height: 12pt; border-right-style: none; background-color: #f4f4f4; margin: 0em; padding-left: 0px; width: 100%; padding-right: 0px; font-family: 'Courier New', courier, monospace; direction: ltr; border-top-style: none; color: black; font-size: 8pt; border-left-style: none; overflow: visible; padding-top: 0px"><span style="color: #606060" id="lnum12">  12:</span> b.Content = tb;</pre>
<!--CRLF--></div>
</div>

<p>What this does is basically use the local time information to get the current Day text and put that TextBlock as the Content for the button…the result is that the DatePicker now will display the number for the current Date (I took this screenshot on 05 OCT 2009):</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Custom DatePicker with current date text" alt="Custom DatePicker with current date text" src="http://storage.timheuer.com/datpicker-currentdatedaytext.png" /></p>

<p>So if I wanted this then I could recompile the source and use my custom DatePicker in my application.  The key difference in this modification is that I’m not using a Path, but a TextBlock.</p>

<p>I’m not sure if this is useful, but since the question was posed and I had time to kill, I thought I’d post my findings.  Having access to the source control for all the Silverlight controls is a great way to customize/extend exactly what you need as well as serving as a great learning resource for you in your control development.</p>

<p>Hope this helps!</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:d2854ba8-48c5-4617-870d-d50a44045003" class="wlWriterEditableSmartContent"></div>
