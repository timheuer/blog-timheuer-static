---
title: "Silverlight DataGrid quick styling tip: keep selected row focus state"
slug: "changing-datagrid-selected-row-state"
pubDate: 2010-02-04T10:27:29.000Z
lastModified: 2019-10-23T04:20:33.000Z
categories:
  - "silverlight"
  - "blend"
  - "expression blend"
  - "datagrid"
  - "visualstatemanager"
  - "riaservices"
  - "themes"
draft: false
---

<p>A developer asked me this question and while a simple answer, I thought it would be a good quick tip to share for those who may be in similar situations.</p>
<p>The scenario is the classic master-details scenario where perhaps you have a grid of data and when a user selects the row, the details are enabled in a form (or perhaps the child of the element) for editing.  Maybe something like this:</p>
<p><img style="margin: 0px auto; display: block; float: none;" title="" alt="Master-details Typical view" src="http://storage.timheuer.com/dgstyling1.png" /></p>
<p>See you can see the row clearly selected (note: this is using the default DataGrid styling).  But watch what happens when you go to the form to edit:</p>
<p><img style="margin: 0px auto; display: block; float: none;" title="" alt="Focus change on selected row" src="http://storage.timheuer.com/dgstyling2.png" /></p>
<p>Notice the focus now on the TextBox in the form, and the row, while still ‘selected’ is much more subtle in which row is selected.  The uninformed eye might miss which one.  For some scenarios this might be important.  Some might even think the row isn’t selected anymore since the visual state changed.</p>
<p>In fact it still *IS* selected and the only thing that changed *IS* the visual state…literally.  Since <a href="http://silverlight.net">Silverlight</a> has the concept of the VisualStateManager, that is what we are seeing in action here.  So you want to change that to make your desired UI as expected…having the row retain it’s selected look even when the user is editing.  This is simple.</p>
<p>Using <a href="http://microsoft.com/expression">Expression Blend</a>, you can select the DataGrid element and then choose Edit Additional Templates to find the RowStyle template to edit a copy of:</p>
<p><img style="margin: 0px auto; display: block; float: none;" title="" alt="Expression Blend edit template" src="http://storage.timheuer.com/dgstyling3.png" /></p>
<p>Once you have this, click the States tab in the tool and you’ll see the various visual states that a DataGridRow can have.  Notice the NormalSelected and UnfocusedSelected states:</p>
<p><img style="margin: 0px auto; display: block; float: none;" title="" alt="Visual States for DataGridRow" src="http://storage.timheuer.com/dgstyling4.png" /></p>
<p>You would modify the Fill.Color property of the UnfocusedSelected state to accomplish the desired change.  In this example, I just used the same color as the default grid for illustration.  The end result is what the user may be expecting more.  Notice the focus is on the TextBox in the form still, but the row still has a prominent selected color view:</p>
<p><img style="margin: 0px auto; display: block; float: none;" title="" alt="Fixed focus visual UI" src="http://storage.timheuer.com/dgstyling5.png" /></p>
<p>A simple edit, but a helpful UI change to give your users more indication of what they are doing.  Of course I’m just using the default styles of the DataGrid here, but you could use your own styles as well.  Hope this helps!</p>
<p>Here is my style XAML as I completed the task above: <a href="http://storage.timheuer.com/StaySelectedStyle.txt">StaySelectedStyle.txt</a><br />
</p>
<div style="padding: 0px; margin: 0px; display: inline; float: none;" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:e5ee6e29-e872-498c-9442-a917fe2e0e52" class="wlWriterEditableSmartContent"></div>
<br />

