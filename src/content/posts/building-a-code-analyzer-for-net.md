---
title: "Building a Code Analyzer for .NET"
slug: "building-a-code-analyzer-for-net"
pubDate: 2020-12-12T06:31:38.000Z
lastModified: 2020-12-12T06:33:15.000Z
description: "Learn with me as I build my first C# Code Analyzer and Code Fix using Visual Studio and the Roslyn SDK!"
categories:
  - "dotnet"
  - "visual studio"
  - "code analysis"
  - "roslyn"
draft: false
---

<p>What the heck is a code analyzer?&nbsp; Well if you are a Visual Studio user you probably have seen the lightbulbs and wrenches from time to time.&nbsp; Put it simply in my own terms, code analyzers keep an eye on your code and find errors, suggest different ways of doing things, help you know what you aren’t using, etc.&nbsp; Usually coupled with a code fix, an analyzer alerts you to an opportunity and a code fix can be applied to remedy that opportunity.&nbsp; Here’s an example:</p>  <p><img title="Screenshot of a code file with a code fix" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of a code file with a code fix" src="https://storage2.timheuer.com/capost1.png" width="1142" height="623"></p>  <p>These are helpful in your coding workflow (or intended to be!) to be more productive, learn some things along the way, or enforce certain development approaches.&nbsp; This is an area of Visual Studio and .NET that part of my team works on and I wanted to learn more than beyond what they are generally.&nbsp; Admittedly despite being on the team I haven’t had the first-hand experience of creating a code analyzer before so I thought, why not give it a try.&nbsp; I fired up Visual Studio and got started without any help from the team (I’ll note in one step where I was totally stumped and needed a teammates help later).&nbsp; I figured I’d write my experience in that it helps anyone or just serves as a bookmark for me for later when I totally forget all this stuff and have to do it again.&nbsp; I know I’ve made some mistakes and I don’t think it’s fully complete, but it is ‘good enough’ so I’ll carry you on the journey here with me!</p>  <h2>Defining the analyzer</h2>  <p>First off we have to decide what we want to do.&nbsp; There are a lot of analyzers already in the platform and other places, so you may not need one custom.&nbsp; For me I had a specific scenario come up at work where I thought <em>hmm, I wonder if I could build this into the dev workflow</em> and that’s what I’m going to do.&nbsp; The scenario is that we want to make sure that our products don’t contain terms that have been deemed inappropriate for various reasons.&nbsp; These could be overtly recognized profanity, accessible terms, diversity-related, cultural considerations, etc. Either way we are starting from a place that someone has defined a list of these per policy.&nbsp; So here is my requirements:</p>  <ul>   <li>Provide an analyzer that starts from a specific set of known ‘database’ of terms in a structured format</li>    <li>Warn/error on code symbols and comments in the code</li>    <li>One analyzer code base that can provide different results for different severities</li>    <li>Provide a code fix that removes the word and fits within the other VS refactor/renaming mechnisms</li>    <li>Have a predictable build that produces the bits for anyone to easily consume</li> </ul>  <p>Pretty simple I thought, so let’s get started!</p>  <h2>Getting started with Code Analyzer development</h2>  <p>I did what any person would do and searched.&nbsp; I ended up on a blog post from a teammate of mine who is the PM in this area, Mika titled “<a href="https://devblogs.microsoft.com/dotnet/how-to-write-a-roslyn-analyzer/">How to write a Roslyn Analyzer</a>” – sounds like exactly what I was looking for! Yay team! Mika’s post help me understand the basics and get the tools squared away.&nbsp; I knew that I had the VS Extensibility SDK workload installed already but wasn’t seeing the templates, so the post helped me realize that the Roslyn SDK is optional and I needed to go back and install that.&nbsp; Once I did, I was able to start with File…New Project and search for analyzer and choose the C# template:</p>  <p><img title="New project dialog from Visual Studio" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="New project dialog from Visual Studio" src="https://storage2.timheuer.com/capost2.png" width="1024" height="679"></p>  <p>This gave me a great starting point with 5 projects:</p>  <ul>   <li>The analyzer library project</li>    <li>The code fix library project</li>    <li>A NuGet package project</li>    <li>A unit test project</li>    <li>A Visual Studio extension project (VSIX)</li> </ul>  <p>Visual Studio opened up the two key code files I’d be working with: the analyzer and code fix provider.&nbsp; These will be the two things I focus on in this post.&nbsp; First I recommend going to each of the projects and updating any/all NuGet Packages that have an offered update.</p>  <h2>Analyzer library</h2>  <p>Let’s look at the key aspects of the analyzer class we want to implement.&nbsp; Here is the full template initially provided</p>  <pre class="brush: csharp; highlight: [3,9,13,18];">public class SimpleAnalyzerAnalyzer : DiagnosticAnalyzer
{
    public const string DiagnosticId = "SimpleAnalyzer";
    private static readonly LocalizableString Title = new LocalizableResourceString(nameof(Resources.AnalyzerTitle), Resources.ResourceManager, typeof(Resources));
    private static readonly LocalizableString MessageFormat = new LocalizableResourceString(nameof(Resources.AnalyzerMessageFormat), Resources.ResourceManager, typeof(Resources));
    private static readonly LocalizableString Description = new LocalizableResourceString(nameof(Resources.AnalyzerDescription), Resources.ResourceManager, typeof(Resources));
    private const string Category = "Naming";

    private static readonly DiagnosticDescriptor Rule = new DiagnosticDescriptor(DiagnosticId, Title, MessageFormat, Category, DiagnosticSeverity.Warning, isEnabledByDefault: true, description: Description);

    public override ImmutableArray&lt;DiagnosticDescriptor&gt; SupportedDiagnostics { get { return ImmutableArray.Create(Rule); } }

    public override void Initialize(AnalysisContext context)
    {
        context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
        context.EnableConcurrentExecution();

        context.RegisterSymbolAction(AnalyzeSymbol, SymbolKind.NamedType);
    }

    private static void AnalyzeSymbol(SymbolAnalysisContext context)
    {
        var namedTypeSymbol = (INamedTypeSymbol)context.Symbol;

        // Find just those named type symbols with names containing lowercase letters.
        if (namedTypeSymbol.Name.ToCharArray().Any(char.IsLower))
        {
            // For all such symbols, produce a diagnostic.
            var diagnostic = Diagnostic.Create(Rule, namedTypeSymbol.Locations[0], namedTypeSymbol.Name);

            context.ReportDiagnostic(diagnostic);
        }
    }
}
</pre>

<p>A few key things to note here.&nbsp; The DiagnosticId is what is reported to the errors and output.&nbsp; You’ve probable seen a few of these that are like “CSC001” or stuff like that.&nbsp; This is basically your identifier.&nbsp; The other key area is the Rule here.&nbsp; Each analyzer basically creates a DiagnosticDescriptor that it will produce and report to the diagnostic engine.&nbsp; As you can see here and the lines below it you define it with a certain set of values and then indicate to the analyzer what SupportedDiagnostics this analyzer supports.&nbsp; By the nature of this combination you can ascertain that you can have multiple rules each with some unique characteristics.&nbsp; </p>

<h3>Custom rules</h3>

<p>Remember we said we wanted different severities and that is one of the differences in the descriptor so we’ll need to change that.&nbsp; I wanted basically 3 types that would have different diagnostic IDs and severities.&nbsp; I’ve modified my code as follows (and removing the static DiagnosticId):</p>

<pre class="brush: csharp;">private const string HtmlHelpUri = "https://github.com/timheuer/SimpleAnalyzer";

private static readonly DiagnosticDescriptor WarningRule = new DiagnosticDescriptor("TERM001", Title, MessageFormat, Category, DiagnosticSeverity.Warning, isEnabledByDefault: true, description: Description, helpLinkUri: HtmlHelpUri);
private static readonly DiagnosticDescriptor ErrorRule = new DiagnosticDescriptor("TERM002", Title, MessageFormat, Category, DiagnosticSeverity.Error, isEnabledByDefault: true, description: Description, helpLinkUri: HtmlHelpUri);
private static readonly DiagnosticDescriptor InfoRule = new DiagnosticDescriptor("TERM003", Title, MessageFormat, Category, DiagnosticSeverity.Info, isEnabledByDefault: true, description: Description, helpLinkUri: HtmlHelpUri);

public override ImmutableArray&lt;DiagnosticDescriptor&gt; SupportedDiagnostics { get { return ImmutableArray.Create(WarningRule, ErrorRule, InfoRule); } }
</pre>

<p>I’ve created 3 specific DiagnosticDescriptors and ‘registered’ them as supported for my analyzer.&nbsp; I also added the help link which will show up in the UI in Visual Studio and if you don’t supply one you’ll get a URL that won’t be terribly helpful to your consumers.&nbsp; Notice each rule has a unique diagnostic ID and severity.&nbsp; Now we’ve got these sorted it’s time to move on to some of our logic.</p>

<h3>Initialize and register</h3>

<p>We have to decide when we want the analyzer to run and what it is analyzing.&nbsp; I learned that once you have the Roslyn SDK installed you have available to you this awesome new tool called the <a href="https://docs.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/syntax-visualizer?tabs=csharp#syntax-visualizer">Syntax Visualizer</a> (View…Other Windows…Syntax Visualizer).&nbsp; It let’s you see the view that Roslyn sees or what some of the old schoolers might consider the CodeDOM.&nbsp; </p>

<p><img title="Syntax Visualizer screenshot" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Syntax Visualizer screenshot" src="https://storage2.timheuer.com/capost3.png" width="1024" height="507"></p>

<p>You can see here that with it on and you click anywhere in your code the tree updates and tells you what you are looking at.&nbsp; In this case my cursor was on Initialize() and I can see this is considered a MethodDeclarationSyntax type and kind.&nbsp; I can navigate the tree on the left and it helps me discover what other code symbols I may be looking for to consider what I need my analyzer to care about.&nbsp; This was very helpful to understand the code tree that Roslyn understands.&nbsp; From this I was able to determine what I needed to care about.&nbsp; Now I needed to start putting things together.</p>

<p>The first part I wanted to do is to register the compilation start action (remember I have intentions of loading the data from somewhere so I want this available sooner).&nbsp; Within that I then have context to the analyzer and can ‘register’ actions that I want to participate in.&nbsp; For this sample purposes I’m going to use RegisterSymbolAction because I just want specific symbols (as opposed to comments or full body method declarations).&nbsp; I have to specify a callback to use when the symbol is analyzed and what symbols I care about.&nbsp; In simplest form here is what the contents of my Initialize() method now looks like:</p>

<pre class="brush: csharp; highlight: [6,10,13,14];">public override void Initialize(AnalysisContext context)
{
    context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
    context.EnableConcurrentExecution();

    context.RegisterCompilationStartAction((ctx) =&gt;
    {
        // TODO: load the terms dictionary

        ctx.RegisterSymbolAction((symbolContext) =&gt;
        {
            // do the work
        }, SymbolKind.NamedType, SymbolKind.Method, SymbolKind.Property, SymbolKind.Field,
                SymbolKind.Event, SymbolKind.Namespace, SymbolKind.Parameter);
    });
}
</pre>

<p>You can see that I’ve called RegisterCompilationStartAction from the full AnalysisContext and then called RegisterSymbolAction from within that, providing a set of specific symbols I care about.</p>

<blockquote>
  <p>NOTE: Not all symbols are available to analyzers.&nbsp; I found that SymbolKind.Local is one that is not…and there was an analyzer warning that told me so!</p>
</blockquote>

<p>Note that since I’m using a lambda approach here I removed the template code AnalyzeSymbol function from the class.&nbsp; Okay, let’s move on to actually looking at the next step and load our dictionary.</p>

<h3>Seeding the analyzer with data</h3>

<p>I mentioned that we’ll have a dictionary of terms already.&nbsp; This is a JSON file with a specific format that looks like this:</p>

<pre class="brush: json;">[
  {
    "TermID": "1",
    "Severity": "1",
    "Term": "verybad",
    "TermClass": "Profanity",
    "Context": "When used pejoratively",
    "ActionRecommendation": "Remove",
    "Why": "No profanity is tolerated in code"
  }
]
</pre>

<p>So the first thing I want to do is create a class that makes my life easier to work with this so I created Term.cs in my analyzer project.&nbsp; The class basically is there to deserialize the file into strong types and looks like this:</p>

<pre class="brush: csharp;">using System.Text.Json.Serialization;

namespace SimpleAnalyzer
{
    class Term
    {
        [JsonPropertyName("TermID")]
        public string Id { get; set; }

        [JsonPropertyName("Term")]
        public string Name { get; set; }

        [JsonPropertyName("Severity")]
        public string Severity { get; set; }

        [JsonPropertyName("TermClass")]
        public string Class { get; set; }

        [JsonPropertyName("Context")]
        public string Context { get; set; }

        [JsonPropertyName("ActionRecommendation")]
        public string Recommendation { get; set; }

        [JsonPropertyName("Why")]
        public string Why { get; set; }
    }
}

</pre>

<p>So you’ll notice that I’m using JSON and System.Text.Json so I’ve had to add that to my analyzer project.&nbsp; More on the mechanics of that much later.&nbsp; I wanted to use this to make my life easier working with the terms database I needed to.</p>

<blockquote>
  <p>NOTE: Using 3rd party libraries (in this case System.Text.Json is considered one to the analyzer) requires more work and there could be issues depending on what you are doing.&nbsp; Remember that analyzers run in the context of Visual Studio (or other tools) and there may be conflicts with other libraries.&nbsp; It’s nuanced, so tred lightly.</p>
</blockquote>

<p>Now that we have our class, let’s go back and load the dictionary file into our analyzer.&nbsp;</p>

<blockquote>
  <p>NOTE:&nbsp; Typically Analyzers and Source Generators use the concept called AdditionalFiles to load information.&nbsp; This relies on the <strong>consuming</strong> project to have the file though and different than my scenario.&nbsp; Working at the lower level in the stack with Roslyn, the compilers need to manage a bit more of the lifetime of files and such and so there is this different method of working with them.&nbsp; You can read more about AdditionalFiles on the Roslyn repo: <a href="https://github.com/dotnet/roslyn/blob/master/docs/analyzers/Using%20Additional%20Files.md">Using Additional Files (dotnet/roslyn)</a>.&nbsp; This is generally the recommended way to work with files.</p>
</blockquote>

<p>For us we are going to add the dictionary of terms *with* our analyzer so we need to do a few things.&nbsp; First we need to make sure the JSON file is in the analyzer and also in the package output.&nbsp; This requires us to mark the terms.json file in the Analyzer project as Content and to copy to output.&nbsp; Second in the Package project we need to add the following to the csproj file in the _AddAnalyzersToOutput target:</p>

<pre class="brush: xml;">&lt;TfmSpecificPackageFile Include="$(OutputPath)\terms.json" PackagePath="analyzers/dotnet/cs" /&gt;
</pre>

<p>And then in the VSIX project we need to do something similar where we specify the NuGet packages to include:</p>

<pre class="brush: xml;">&lt;Content Include="$(OutputPath)\terms.json"&gt;
    &lt;IncludeInVSIX&gt;true&lt;/IncludeInVSIX&gt;
&lt;/Content&gt;
</pre>

<p>With both of these in place now we can get access to our term file in our Initialize method and we’ll add a helper function to ensure we get the right location.&nbsp; The resulting modified Initialize portion looks like this:</p>

<pre class="brush: csharp;">context.RegisterCompilationStartAction((ctx) =&gt;
{
    if (terms is null)
    {
        var currentDirecory = GetFolderTypeWasLoadedFrom&lt;SimpleAnalyzerAnalyzer&gt;();
        terms = JsonSerializer.Deserialize&lt;List&lt;Term&gt;&gt;(File.ReadAllBytes(Path.Combine(currentDirecory, "terms.json")));
    }
// other code removed for brevity in blog post
}
</pre>

<p>The helper function here is a simple one liner:</p>

<pre class="brush: csharp;">private static string GetFolderTypeWasLoadedFrom&lt;T&gt;() =&gt; new FileInfo(new Uri(typeof(T).Assembly.CodeBase).LocalPath).Directory.FullName;
</pre>

<p>This now gives us a List&lt;Term&gt; to work with.&nbsp; These lines of code required us to add some using statements in the class that luckily an analyzer/code fix helped us do! You can see how helpful analyzers/code fixes are in your everyday usage and we take for granted!&nbsp; Now we have our data, we have our action we registered for, let’s do some analyzing.&nbsp; </p>

<h3>Analyze the code</h3>

<p>We basically want each symbol to do a search to see if it contains a word in our dictionary and if there is a match, then register a diagnostic rule to the user.&nbsp; So given that we are using RegisterSymbolAction the context provides us with the Symbol and name we can examine.&nbsp; We will look at that against our dictionary of terms, seeing if there is a match and then create a DiagnosticDescriptor for that in line with the severity of that match.&nbsp; Here’s how we start:</p>

<pre class="brush: csharp; highlight: [7,9];">ctx.RegisterSymbolAction((symbolContext) =&gt;
{
    var symbol = symbolContext.Symbol;

    foreach (var term in terms)
    {
        if (ContainsUnsafeWords(symbol.Name, term.Name))
        {
            var diag = Diagnostic.Create(GetRule(term, symbol.Name), symbol.Locations[0], term.Name, symbol.Name, term.Severity, term.Class);
            symbolContext.ReportDiagnostic(diag);
            break;
        }
    }
}, SymbolKind.NamedType, SymbolKind.Method, SymbolKind.Property, SymbolKind.Field,
    SymbolKind.Event, SymbolKind.Namespace, SymbolKind.Parameter);
</pre>

<p>In this we are looking in our terms dictionary and doing a comparison.&nbsp; We created a simple function for the comparison that looks like this:</p>

<pre class="brush: csharp;">private bool ContainsUnsafeWords(string symbol, string term)
{
    return term.Length &lt; 4 ?
        symbol.Equals(term, StringComparison.InvariantCultureIgnoreCase) :
        symbol.IndexOf(term, StringComparison.InvariantCultureIgnoreCase) &gt;= 0;
}
</pre>

<p>And then we have a function called GetRule that ensures we have the right DiagnosticDescriptor for this violation (based on severity).&nbsp; That function looks like this:</p>

<pre class="brush: csharp;">private DiagnosticDescriptor GetRule(Term term, string identifier)
{
    var warningLevel = DiagnosticSeverity.Info;
    var diagId = "TERM001";
    var description = $"Recommendation: {term.Recommendation}{System.Environment.NewLine}Context: {term.Context}{System.Environment.NewLine}Reason: {term.Why}{System.Environment.NewLine}Term ID: {term.Id}";
    switch (term.Severity)
    {
        case "1":
        case "2":
            warningLevel = DiagnosticSeverity.Error;
            diagId = "TERM002";
            break;
        case "3":
            warningLevel = DiagnosticSeverity.Warning;
            break;
        default:
            warningLevel = DiagnosticSeverity.Info;
            diagId = "TERM003";
            break;
    }

    return new DiagnosticDescriptor(diagId, Title, MessageFormat, term.Class, warningLevel, isEnabledByDefault: true, description: description, helpLinkUri: HtmlHelpUri, term.Name);
}
</pre>

<p>In this GetRule function you’ll notice a few things.&nbsp; First, we are doing this because we want to set the diagnostic ID and the severity differently based on the term dictionary data.&nbsp; Remember earlier we created different rule definitions (DiagnosticDescriptors) and we need to ensure what we return here matches one of them.&nbsp; This allows us to have one analyzer that tries to be a bit more dynamic.&nbsp; We are also passing in a final parameter (term.Name) in the ctor for the DiagnosticDescriptor.&nbsp; This is passed in the CustomTags parameter of the ctor.&nbsp; We’ll be using this later in the code fix so we used this as a means to pass some context from the analyzer to the code fix (the term to replace).&nbsp; The other part you’ll notice is that in the Diagnositc.Create method earlier we’re passing in some additional parameters as optional.&nbsp; These get passed to the MessageFormat string that you’ve defined in your analyzer.&nbsp; We didn’t mention it detail earlier but it comes in to play now.&nbsp; The template gave us a Resources.resx file with three values:</p>

<p><img title="Resource file contents" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Resource file contents" src="https://storage2.timheuer.com/CAPOST4.png" width="1024" height="286"></p>

<p>These are resources that are displayed in the outputs and Visual Studio user interface.&nbsp; MessageFormat is one that enables you to provide some content into the formatter and that’s what we are passing here.&nbsp; The result will be a more user-friendly message with the right context.&nbsp; Great I think we have all our analyzer stuff working, let’s move on to the code fix!</p>

<h2>Code fix library</h2>

<p>With just the analyzer – which we are totally okay to only have – we have warnings/squiggles that will present to the user (or log in output).&nbsp; We can optionally provide a code fix to remedy the situation.&nbsp; In our simple sample here we’re going to do that and simply suggest to remove the word.&nbsp; Code fixes also provide the user the means to suppress certain rules.&nbsp; This is why we wanted different diagnostic IDs earlier as you may want to suppress the SEV3 terms but not the others.&nbsp; Without that distinction/difference in DiagnosticDescriptors you cannot do that.&nbsp; Moving over to the SimpleAnalyzer.CodeFixes project we’ll open the code fix provider and make some changes.&nbsp; The default template provides a code fix to make the symbol all uppercase…we don’t want that but it provides a good framework for us to learn and make simple changes.&nbsp; The first thing we need to do is tell the code fix provider what diagnostic IDs are fixable by this provider.&nbsp; We make a change in the override provided by the template to provide our diagnostic IDs:</p>

<pre class="brush: csharp;">public sealed override ImmutableArray&lt;string&gt; FixableDiagnosticIds
{
    get { return ImmutableArray.Create("TERM001","TERM002","TERM003"); }
}
</pre>

<p>Now look in the template for MakeUppercaseAsync and let’s make a few changes.&nbsp; First rename to RemoveTermAsync.&nbsp; Then in the signature of that change it to include IEnumerable&lt;string&gt; so we can pass in those CustomTags we provided earlier from the analyzer.&nbsp; You’ll also need to pass in those custom tags to the call to RemoveTermAsync.&nbsp; Combined those look like these changes now in the template:</p>

<pre class="brush: csharp; highlight: [16,21,25];">public sealed override async Task RegisterCodeFixesAsync(CodeFixContext context)
{
    var root = await context.Document.GetSyntaxRootAsync(context.CancellationToken).ConfigureAwait(false);

    // TODO: Replace the following code with your own analysis, generating a CodeAction for each fix to suggest
    var diagnostic = context.Diagnostics.First();
    var diagnosticSpan = diagnostic.Location.SourceSpan;

    // Find the type declaration identified by the diagnostic.
    var declaration = root.FindToken(diagnosticSpan.Start).Parent.AncestorsAndSelf().OfType&lt;TypeDeclarationSyntax&gt;().First();

    // Register a code action that will invoke the fix.
    context.RegisterCodeFix(
        CodeAction.Create(
            title: CodeFixResources.CodeFixTitle,
            createChangedSolution: c =&gt; RemoveTermAsync(context.Document, declaration, diagnostic.Descriptor.CustomTags, c),
            equivalenceKey: nameof(CodeFixResources.CodeFixTitle)),
        diagnostic);
}

private async Task&lt;Solution&gt; RemoveTermAsync(Document document, TypeDeclarationSyntax typeDecl, IEnumerable&lt;string&gt; tags, CancellationToken cancellationToken)
{
    // Compute new uppercase name.
    var identifierToken = typeDecl.Identifier;
    var newName = identifierToken.Text.Replace(tags.First(), string.Empty);

    // Get the symbol representing the type to be renamed.
    var semanticModel = await document.GetSemanticModelAsync(cancellationToken);
    var typeSymbol = semanticModel.GetDeclaredSymbol(typeDecl, cancellationToken);

    // Produce a new solution that has all references to that type renamed, including the declaration.
    var originalSolution = document.Project.Solution;
    var optionSet = originalSolution.Workspace.Options;
    var newSolution = await Renamer.RenameSymbolAsync(document.Project.Solution, typeSymbol, newName, optionSet, cancellationToken).ConfigureAwait(false);

    // Return the new solution with the now-uppercase type name.
    return newSolution;
}
</pre>

<p>With all these in place we now should be ready to try some things out.&nbsp; Let’s debug.</p>

<h2>Debugging</h2>

<p>Before we debug remember we are using some extra libraries?&nbsp; In order to make this work, your analyzer needs to ship those alongside.&nbsp; This isn’t easy to figure out and you need to specify this in your csproj files to add additional outputs to your Package and Vsix projects.&nbsp; I’m not going to emit them here, but you can look at this sample to see what I did.&nbsp; Without this, the analyzer won’t start.&nbsp; Please note if you are not using any 3rd party libraries then this isn’t required.&nbsp; In my case I added System.Text.Json and so this is required.</p>

<p>I found the easiest way to debug was to set the VSIX project as the startup and just F5 that project.&nbsp; This launches another instance of Visual Studio and installs your analyzer as an extension.&nbsp; When running analyzers as extensions these do NOT affect the build.&nbsp; So even though you may have analyzer errors, they don’t prevent the build from happening.&nbsp; Installing analyzers as NuGet packages into the project would affect the build and generate build errors during CI, for example.&nbsp; For now we’ll use the VSIX project to debug.&nbsp; When it launches create a new project or something to test with…I just use a console application.&nbsp; Remember when earlier I mentioned that the <strong>consumer</strong> project has to provide the terms dictionary?&nbsp; It’s in this project that you’ll want to drop a terms.json file into the project in the format mentioned earlier.&nbsp; This file also must be given the build action of “C# analyzer additional file” in the file properties.&nbsp; Then let’s start writing code that includes method names that violate our rules.&nbsp; When doing that we should now see the analyzer kick in and show the issues:</p>

<p><img title="Screenshot of analyzer errors and warnings" style="border: 0px currentcolor; border-image: none; margin-right: auto; margin-left: auto; float: none; display: block; background-image: none;" border="0" alt="Screenshot of analyzer errors and warnings" src="https://storage2.timheuer.com/capost5.png" width="1259" height="1077"></p>

<p>Nice!&nbsp; It worked.&nbsp; One of the nuances of the template and the code fix is that I need to register a code action for each of the type of declaration that we had previously wanted the analyzer to work against (I think…still learning).&nbsp; Without that the proper fix will not actually show/work if it isn’t the right type.&nbsp; The template defaults are for NamedType, so my sample using method name won’t work on the fix, because it’s not the right declaration (again, I think…comment if you know).&nbsp; I’ll have to enhance this later more, but the general workflow is working and if the type is named bad you can see the full end-to-end working:</p>

<h2>Building it all in CI</h2>

<p>Now let’s make sure we can have reproduceable builds of our NuGet and VSIX packages.&nbsp; I’m using my quick template that I created for <a href="https://timheuer.com/blog/generate-github-actions-workflow-from-cli/">creating a simple workflow for GitHub Actions</a> from the CLI and modifying a bit.&nbsp; Because analyzers use VSIX, we need to use a Windows build agent that has Visual Studio on it and thankfully GitHub Actions provides one.&nbsp; Here’s my resulting final CI build definition:</p>

<pre class="brush: yaml;">name: "Build"

on:
  push:
    branches:
      - main
    paths-ignore:
      - '**/*.md'
      - '**/*.gitignore'
      - '**/*.gitattributes'
  workflow_dispatch:
    branches:
      - main
    paths-ignore:
      - '**/*.md'
      - '**/*.gitignore'
      - '**/*.gitattributes'
      
jobs:
  build:
    if: github.event_name == 'push' &amp;&amp; contains(toJson(github.event.commits), '***NO_CI***') == false &amp;&amp; contains(toJson(github.event.commits), '[ci skip]') == false &amp;&amp; contains(toJson(github.event.commits), '[skip ci]') == false
    name: Build 
    runs-on: windows-latest
    env:
      DOTNET_CLI_TELEMETRY_OPTOUT: 1
      DOTNET_SKIP_FIRST_TIME_EXPERIENCE: 1
      DOTNET_NOLOGO: true
      DOTNET_GENERATE_ASPNET_CERTIFICATE: false
      DOTNET_ADD_GLOBAL_TOOLS_TO_PATH: false
      DOTNET_MULTILEVEL_LOOKUP: 0
      PACKAGE_PROJECT: src\SimpleAnalyzer\SimpleAnalyzer.Package\
      VSIX_PROJECT: src\SimpleAnalyzer\SimpleAnalyzer.Vsix\

    steps:
    - uses: actions/checkout@v2
      
    - name: Setup .NET Core SDK
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: 5.0.x

    - name: Setup MSBuild
      uses: microsoft/setup-msbuild@v1

    - name: Setup NuGet
      uses: NuGet/setup-nuget@v1.0.5

    - name: Add GPR Source
      run: nuget sources Add -Name "GPR" -Source ${{ secrets.GPR_URI }} -UserName ${{ secrets.GPR_USERNAME }} -Password ${{ secrets.GITHUB_TOKEN }}

    - name: Build NuGet Package
      run: |
        msbuild /restore ${{ env.PACKAGE_PROJECT }} /p:Configuration=Release /p:PackageOutputPath=${{ github.workspace }}\artifacts

    - name: Build VSIX Package
      run: |
        msbuild /restore ${{ env.VSIX_PROJECT }} /p:Configuration=Release /p:OutDir=${{ github.workspace }}\artifacts

    - name: Push to GitHub Packages
      run: nuget push ${{ github.workspace }}\artifacts\*.nupkg -Source "GPR"

    # upload artifacts
    - name: Upload artifacts
      uses: actions/upload-artifact@v2
      with:
        name: release-pacakges
        path: |
            ${{ github.workspace }}\artifacts\**\*.vsix
            ${{ github.workspace }}\artifacts\**\*.nupkg
</pre>

<p>I’ve done some extra work to publish this in the GitHub Package Repository but that’s just optional step and can be removed (ideally you’d publish this in the NuGet repository and you can learn about that by reading my blog post on that topic).&nbsp; I’ve not got my CI set up and every commit builds the packages that can be consumed!&nbsp; You might be asking what’s the difference between the NuGet and VSIX package.&nbsp; The simple explanation is that you’d want people using your analyzer on the NuGet package because that is per-project and carries with the project, so everyone using the project gets the benefit of the analyzer.&nbsp; The VSIX is per-machine and doesn’t affect builds, etc.&nbsp; That may ideally be your scenario but it wouldn’t be consistent with everyone consuming the project that actually wants the analyzer.</p>

<h2>Summary and resources</h2>

<p>For me this was a fun exercise and distraction.&nbsp; With some very much needed special assist from <a href="https://twitter.com/JonathanMarolf">Jonathan Marolf</a> on the team I learned a bunch and needed help on the 3rd party library thing mentioned earlier.&nbsp; I’ve got a few TODO items to accomplish as I didn’t fully realize my goals.&nbsp; The code fix isn’t working exactly how I want and would have thought, so I’m still working my way through this.&nbsp; This whole sample by the way is on GItHub at <a href="https://github.com/timheuer/SimpleAnalyzer">timheuer/SimpleAnalyzer</a> for you to use and point out my numerous mistakes of everything analyzer and probably C# even…please do!&nbsp; In fact in my starting this and conversing with a few on Twitter, a group in Australia created something very similar that is already published on NuGet.&nbsp; Check out <strong><a href="https://github.com/merill/InclusivenessAnalyzer/">merill/InclusivenessAnalyzer</a></strong> which aims to improve inclusivity in code.&nbsp; The source like mine is up on GitHub and they have it published in the NuGet Gallery you can add to your project today!</p>

<p>There are a few resources you should look at if you want this journey yourself:</p>

<ul>
  <li><a href="https://devblogs.microsoft.com/dotnet/how-to-write-a-roslyn-analyzer/">How to write a Roslyn analyzer</a></li>

  <li>Learn Roslyn Now from Josh Varty (<a href="https://joshvarty.com/learn-roslyn-now/">blog</a>, <a href="https://www.youtube.com/watch?v=wXXHd8gYqVg&amp;list=PLxk7xaZWBdUT23QfaQTCJDG6Q1xx6uHdG">videos</a>)</li>

  <li><a href="https://github.com/dotnet/roslyn/blob/master/docs/analyzers/Analyzer%20Samples.md">Analyzer samples in the Roslyn repo</a></li>

  <li><a href="https://docs.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/">Roslyn SDK</a></li>

  <li><a href="https://docs.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/tutorials/how-to-write-csharp-analyzer-code-fix">Tutorial: Write your first analyzer</a></li>
</ul>
