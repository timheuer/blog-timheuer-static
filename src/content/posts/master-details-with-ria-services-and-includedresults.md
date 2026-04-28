---
title: "RIA Services and relational data"
slug: "master-details-with-ria-services-and-includedresults"
pubDate: 2010-01-05T17:02:10.000Z
lastModified: 2019-10-23T04:20:33.000Z
categories:
  - "silverlight"
  - "xaml"
  - "ria"
  - "riaservices"
  - "domainservice"
  - "master details"
  - "relational"
  - "chinook"
draft: false
---

<p>As we’ve all been guilty, when you see demonstrations of technologies most of the time the data samples show single table solutions.  When was the last time you’ve developed a single-table system? :-)  Thought so.</p>  <p>In RIA Services demonstrations, most of them have been single-table samples as well.  So how do you go about retrieving relational data (master/details type) with RIA Services?  Here’s an option.  I’m using VS2010, Silverlight 4 and the <a href="http://silverlight.net/riaservices">WCF RIA Services</a> preview using the below sample.  I’m also using the <a href="http://chinookdatabase.codeplex.com">Chinook</a> sample database which has become one of my favorite simpler relational data samples to use.</p>  <h2>Creating your project and associated RIA Services</h2>  <p>This is easy, create a new <a href="http://silverlight.net">Silverlight</a> project and make sure the ‘Enable .NET RIA Services’ link is checked (yes, we know it doesn’t say WCF in that dialog).  My Silverlight application will be a simple button to retrieve artists then show their associated albums.  Here’s my XAML to start:</p>  <div id="codeSnippetWrapper" class="csharpcode-wrapper">   <div id="codeSnippet" class="csharpcode">     <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">Grid</span> <span class="attr">x:Name</span><span class="kwrd">="LayoutRoot"</span> <span class="attr">Background</span><span class="kwrd">="White"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>     <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Width</span><span class="kwrd">="400"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>         <span class="kwrd">&lt;</span><span class="html">Button</span> <span class="attr">Content</span><span class="kwrd">="Get Artist Information"</span> <span class="attr">x:Name</span><span class="kwrd">="GetArtistButton"</span> <span class="attr">Click</span><span class="kwrd">="GetArtistButton_Click"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>         <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Orientation</span><span class="kwrd">="Horizontal"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>             <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">x:Name</span><span class="kwrd">="ArtistsContext"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>                 <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Orientation</span><span class="kwrd">="Horizontal"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>                     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="Artists: "</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>                     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="{Binding ElementName=ListOfArtists, Path=Items.Count}"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>                 <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>                 <span class="kwrd">&lt;</span><span class="html">ListBox</span> <span class="attr">x:Name</span><span class="kwrd">="ListOfArtists"</span> <span class="attr">Width</span><span class="kwrd">="200"</span> <span class="attr">Height</span><span class="kwrd">="300"</span> <span class="attr">DisplayMemberPath</span><span class="kwrd">="Name"</span> <span class="attr">ItemsSource</span><span class="kwrd">="{Binding}"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>             <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>             <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">x:Name</span><span class="kwrd">="AlbumsContext"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span>                 <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Orientation</span><span class="kwrd">="Horizontal"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum14" class="lnum">  14:</span>                     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="Albums: "</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum15" class="lnum">  15:</span>                     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="{Binding ElementName=ListOfAlbums, Path=Items.Count}"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum16" class="lnum">  16:</span>                 <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum17" class="lnum">  17:</span>                 <span class="kwrd">&lt;</span><span class="html">ListBox</span> <span class="attr">x:Name</span><span class="kwrd">="ListOfAlbums"</span> <span class="attr">DisplayMemberPath</span><span class="kwrd">="Title"</span> <span class="attr">ItemsSource</span><span class="kwrd">="{Binding}"</span> <span class="attr">Width</span><span class="kwrd">="200"</span> <span class="attr">Height</span><span class="kwrd">="300"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum18" class="lnum">  18:</span>             <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum19" class="lnum">  19:</span>         <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum20" class="lnum">  20:</span>     <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum21" class="lnum">  21:</span> <span class="kwrd">&lt;/</span><span class="html">Grid</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Now on the server side I need to create the associated models and domain services to be consumed.  I’m creating my model using Entity Framework and it looks like this:</p>

<p><img style="display: block; float: none; margin-left: auto; margin-right: auto" title="Chinook Entity Model" alt="Chinook Entity Model" src="http://storage.timheuer.com/riasvcsrelational.png" /></p>

<p>Now I need to create my Domain Service class for that model (remember to build the solution after you create your model so it will show up in the tools).  When we create the Domain Service class be sure to enable the checkbox to generate associated classes for metadata.  Once we finish we have some stub services created for us.  </p>

<h2>Using the Domain Service functions</h2>

<p>We have GetArtists and GetAlbums functions we can work with.  As an example we can wire up the button click to retrieve a list of artists using the default functions we got:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> ChinookContext ctx = <span class="kwrd">new</span> ChinookContext();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>  </pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> GetArtistButton_Click(<span class="kwrd">object</span> sender, RoutedEventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     ArtistsContext.DataContext = ctx.Artists;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>     ctx.Load(ctx.GetArtistsQuery());</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span> }</pre>
<!--CRLF--></div>
</div>

<p>But what about when a user clicks on an Artist, we want to show the albums for <em>that artist</em> and not the others.  We need to modify our Domain Service to add a function:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">public</span> IQueryable&lt;Album&gt; GetAlbumsForArtist(<span class="kwrd">int</span> ArtistId)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="kwrd">return</span> <span class="kwrd">this</span>.ObjectContext.Albums.Where(a =&gt; a.ArtistId == ArtistId);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span> }</pre>
<!--CRLF--></div>
</div>

<p>Now we can use that function when a user clicks on an associated artist to populate the album information:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">private</span> <span class="kwrd">void</span> ListOfArtists_SelectionChanged(<span class="kwrd">object</span> sender, SelectionChangedEventArgs e)</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     ListBox theList = sender <span class="kwrd">as</span> ListBox;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>     Artist a = theList.SelectedItem <span class="kwrd">as</span> Artist;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>     ctx.Albums.Clear();</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>     AlbumsContext.DataContext = ctx.Albums;</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>     ctx.Load(ctx.GetAlbumsForArtistQuery(a.ArtistId));</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span> }</pre>
<!--CRLF--></div>
</div>

<p>Cool.</p>

<p>However, the second event handling for our master-details section for this particular data set seems unnecessary.  After all, why not just include the children data with our initial request if we *know* that we’re doing an explicit master-details view (and our set is not that large relatively speaking).</p>

<h2>Modify the metadata classes</h2>

<p>Remember the generated metadata classes?  Go back to it now.  You’ll see a definition of the ArtistMetadata that includes this:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">public</span> EntityCollection&lt;Album&gt; Albums;</pre>
<!--CRLF--></div>
</div>

<p>Notice it has an Albums collection property.  Great, so we could just modify our XAML binding to use some element binding and get the Albums property of the SelectedItem right?  Well, not yet.  If we do that, we’ll have no data.  Why is that?  Because we haven’t told RIA Services to perform the necessary additional query to get the data.  Simple add [Include] at the top of the Albums collection:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> [Include]</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> <span class="kwrd">public</span> EntityCollection&lt;Album&gt; Albums;</pre>
<!--CRLF--></div>
</div>

<p>And that’s what we need.  Now we can add a function to our Domain Service class to get the additional data:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">public</span> IQueryable&lt;Artist&gt; GetArtistsWithAlbums()</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span> {</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>     <span class="kwrd">return</span> <span class="kwrd">this</span>.ObjectContext.Artists.Include(<span class="str">"Albums"</span>);</pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span> }</pre>
<!--CRLF--></div>
</div>

<p>Now we just need to do some clean up.  We need to change our button click code to get the GetArtistsWithAlbums query now instead of the other one first.</p>

<p />

<p />

<p />

<p />

<p />

<p />

<h2>Remove unnecessary code and use binding to help us</h2>

<p>Now we can remove the SelectionChanged event handler for our Artists ListBox as well as add some binding commands to our XAML like this:</p>

<div id="codeSnippetWrapper" class="csharpcode-wrapper">
  <div id="codeSnippet" class="csharpcode">
    <pre class="alteven"><span id="lnum1" class="lnum">   1:</span> <span class="kwrd">&lt;</span><span class="html">Grid</span> <span class="attr">x:Name</span><span class="kwrd">="LayoutRoot"</span> <span class="attr">Background</span><span class="kwrd">="White"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum2" class="lnum">   2:</span>     <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Width</span><span class="kwrd">="400"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum3" class="lnum">   3:</span>         <span class="kwrd">&lt;</span><span class="html">Button</span> <span class="attr">Content</span><span class="kwrd">="Get Artist Information"</span> <span class="attr">x:Name</span><span class="kwrd">="GetArtistButton"</span> <span class="attr">Click</span><span class="kwrd">="GetArtistButton_Click"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum4" class="lnum">   4:</span>         <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Orientation</span><span class="kwrd">="Horizontal"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum5" class="lnum">   5:</span>             <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">x:Name</span><span class="kwrd">="ArtistsContext"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum6" class="lnum">   6:</span>                 <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Orientation</span><span class="kwrd">="Horizontal"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum7" class="lnum">   7:</span>                     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="Artists: "</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum8" class="lnum">   8:</span>                     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="{Binding ElementName=ListOfArtists, Path=Items.Count}"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum9" class="lnum">   9:</span>                 <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum10" class="lnum">  10:</span>                 <span class="kwrd">&lt;</span><span class="html">ListBox</span> <span class="attr">x:Name</span><span class="kwrd">="ListOfArtists"</span> <span class="attr">Width</span><span class="kwrd">="200"</span> <span class="attr">Height</span><span class="kwrd">="300"</span> <span class="attr">DisplayMemberPath</span><span class="kwrd">="Name"</span> <span class="attr">ItemsSource</span><span class="kwrd">="{Binding}"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum11" class="lnum">  11:</span>             <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum12" class="lnum">  12:</span>             <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">x:Name</span><span class="kwrd">="AlbumsContext"</span> <span class="attr">DataContext</span><span class="kwrd">="{Binding ElementName=ListOfArtists, Path=SelectedItem}"</span> <span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum13" class="lnum">  13:</span>                 <span class="kwrd">&lt;</span><span class="html">StackPanel</span> <span class="attr">Orientation</span><span class="kwrd">="Horizontal"</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum14" class="lnum">  14:</span>                     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="Albums: "</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum15" class="lnum">  15:</span>                     <span class="kwrd">&lt;</span><span class="html">TextBlock</span> <span class="attr">Text</span><span class="kwrd">="{Binding ElementName=ListOfAlbums, Path=Items.Count}"</span> <span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum16" class="lnum">  16:</span>                 <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum17" class="lnum">  17:</span>                 <span class="kwrd">&lt;</span><span class="html">ListBox</span> <span class="attr">x:Name</span><span class="kwrd">="ListOfAlbums"</span> <span class="attr">DisplayMemberPath</span><span class="kwrd">="Title"</span> <span class="attr">ItemsSource</span><span class="kwrd">="{Binding Albums}"</span> <span class="attr">Width</span><span class="kwrd">="200"</span> <span class="attr">Height</span><span class="kwrd">="300"</span><span class="kwrd">/&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum18" class="lnum">  18:</span>             <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum19" class="lnum">  19:</span>         <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum20" class="lnum">  20:</span>     <span class="kwrd">&lt;/</span><span class="html">StackPanel</span><span class="kwrd">&gt;</span></pre>
<!--CRLF-->

    <pre class="alteven"><span id="lnum21" class="lnum">  21:</span> <span class="kwrd">&lt;/</span><span class="html">Grid</span><span class="kwrd">&gt;</span></pre>
<!--CRLF--></div>
</div>

<p>Notice how the DataContext of my Albums ListBox is now set using element binding to the SelectedItem of the Artists ListBox.  Then the ItemsSource of the ListBox for Albums has a {Binding Albums} command.  This is because our Artists query now <em>includes</em> the associated Album data and we can just reference the property.</p>

<h2>Use with caution</h2>

<p>While this example shows how easy it can be to have included results in your Domain Service query result, be mindful of when you are using.  For instance if you have a customer database of 1000 customers and you want all orders to be retrieved…it might not be wise to use this particular type of method.  </p>

<p>This presents merely another choice for areas where you may want/need it (i.e., country/state/city) for your application.</p>

<p>You can download the sample solution for the above code snippets here: <a href="http://storage.timheuer.com/SilverlightApplication41.zip">SilverlightApplication41.zip</a>.  Reminder that you will need to have the Chinook database installed already – it is NOT included with this sample download.</p>

<p>Hope this helps!</p>

<div style="padding-bottom: 0px; margin: 0px; padding-left: 0px; padding-right: 0px; display: inline; float: none; padding-top: 0px" id="scid:0767317B-992E-4b12-91E0-4F059A8CECA8:ca7d8e8c-ced3-405e-84dd-d6e3eeb10926" class="wlWriterEditableSmartContent"></div>
