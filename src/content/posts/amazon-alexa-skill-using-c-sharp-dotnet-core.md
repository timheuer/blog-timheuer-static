---
title: "Write your Amazon Alexa Skill using C# on AWS Lambda services"
slug: "amazon-alexa-skill-using-c-sharp-dotnet-core"
pubDate: 2016-12-12T22:55:44.000Z
lastModified: 2019-10-23T04:20:41.000Z
categories: []
draft: false
---

<p>After a sick day a few weeks ago and writing <a href="http://amzn.to/2gFhP6Y">my first Alexa Skill</a> I’ve been pretty engaged with understanding this voice UI world with Amazon Echo, Google Home and others.  It’s pretty fun to use and as ‘new tech’ it is pretty fun to play around with.  Almost immediately after my skill was certified, I saw this come across my <a href="http://twitter.com/timheuer">Twitter</a> stream:</p>
<p>
</p><blockquote class="twitter-tweet" data-lang="en" data-cards="hidden">
<p lang="en" dir="ltr">You can now write your AWS Lambda functions in C#! <a href="https://twitter.com/hashtag/reInvent?src=hash">#reInvent</a> <a href="https://t.co/LDOK0S1VwF">https://t.co/LDOK0S1VwF</a> <a href="https://t.co/FpRUODgucv">pic.twitter.com/FpRUODgucv</a></p>— Amazon Web Services (@awscloud) <a href="https://twitter.com/awscloud/status/804397150616420352">December 1, 2016</a></blockquote><script async="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
<p>I had spent a few days getting up-to-speed on Node and the environment (I’ve been working in client technologies for a long while remember) and using VS Code, which was fun.  But using C# would have been more efficient for me (or so I thought).  <a href="https://aws.amazon.com/about-aws/whats-new/2016/12/aws-lambda-supports-c-sharp/?sc_channel=sm&amp;sc_campaign=launch_Mobile_e5584e2e&amp;sc_publisher=tw_go&amp;sc_content=C&amp;adbsc=social_launches_20161201_68410026&amp;adbid=804397150616420352&amp;adbpl=tw&amp;adbpr=66780587#_support_on_lambda_using_NET_Core&amp;sc_geo=global&amp;sc_outcome=launches">AWS Lambda services just announced they will support C#</a> as the authoring environment for a Lambda service.  As it turns out, the C# Lambda support is pretty general so there is not compatibility in the dev experience for creating a C# Lambda backing a skill as there presently is for Node.JS development…at least right now.  I thought it would be fun to try and was eventually successful, so hopefully this post finds others trying as well.  Here’s what I’ve learned in the &lt; 4 hours (I time-boxed myself for this exercise) spent trying to get it to work.  If there is something obvious I missed to make this simpler, please comment!</p>
<h2>The Tools</h2>
<p>You will first need a set of tools.  Here was my list:</p>
<ul>
<li><a href="https://aws.amazon.com/">AWS Cloud Services account</a>/login 
</li><li><a href="http://www.visualstudio.com">Visual Studio 2015 Community (Update 3)</a> 
</li><li><a href="https://aws.amazon.com/visualstudio/">AWS Toolkit for Visual Studio</a> 
</li><li>Knowledge of C#/JSON 
</li><li>Knowledge of creating an Alexa Skill (<a href="https://github.com/alexa/skill-sample-nodejs-fact">this post has a good walk-through and pictures</a>) 
</li><li>A useful Alexa request/response serializer (more on that in a bit)</li></ul>
<p>With these I was ready to go.  The AWS Toolkit is the key here as it provides a lot of VS integration that will help make this a lot easier.</p>
<blockquote>
<p>NOTE: You can do all of this technically with VS Code (even on a Mac) but I think the AWS Toolkit for VS makes this a lot simpler to initially understand the pieces and WAY simpler in the publishing step to the AWS Lambda service itself.  If there is a VS Code plugin model, that would be great, but I didn’t find one that did the same things here.</p></blockquote>
<p>Armed with these tools, here is what I did…</p>
<h2 />
<h2>Creating the Lambda project</h2>
<p>First, create a new project in VS, using the AWS Lambda template:</p>
<p><img style="float: none; margin-left: auto; display: block; margin-right: auto" src="http://storage2.timheuer.com/aws-new-lambda-project-vs.png" width="800" height="553" /></p>
<p>This project name doesn’t need to map to your service/function names but it is one of the parameters you will set for the Lambda configuration, so while it doesn’t entirely matter, maybe naming it something that makes sense would help.  We’re just going to demonstrate a dumb Alexa skill for addition so I’m calling it NumberFunctions.</p>
<blockquote>
<p>NOTE: This post isn’t covering the concepts of an Alexa skill, merely the ability to use C# to create your logic for the skill if you choose to use AWS Lambda services.  You can, of course, use your own web server, web service, or whatever hosted on whatever server you’d like and an Alexa skill can use that as well.  </p></blockquote>
<p>Once we have that created you may see the VS project complain a bit.  Right click on the project and choose to restore NuGet packages and that should clear it up.</p>
<h2>Create the function handler</h2>
<p>The next step is to write the function handler for your skill.  The namespace and public function name matter as these are also inputs to the configuration so be smart about them.  For me, I’m just using the default namespace, class and function name that the template provided.  The next step is to gather the input from the Alexa skill request.  Now a Lambda service can be a function for anything…it is NOT limited to serve Alexa responses, it can do a lot more.  But this is focused on Alexa skills so that is why I’m referring to this specific input.  Alexa requests will come in the form of a JSON payload with a specific format.  Right now if you accept the default signature of the function handler of string, ILambdaContext it will likely fail due to <a href="https://github.com/aws/aws-lambda-dotnet/issues/7">issues you can read about here on GitHub</a>.  So the best way is to really understand that the request will come in with three main JSON properties: request, version, and session.  Having an object with those properties exposed will help…especially if you have an object that understands how to automatically map the JSON payload to a C# object…after all that’s one of the main benefits of using C# is more strongly-typed development you may be used to.</p>
<p>Rather than create my own, I went on the hunt for some options.  There doesn’t exist yet an Alexa Skills SDK for .NET yet (perhaps that is coming) but there are two options I found.  The first seemed a bit more setup/understanding and I haven’t dug deep into it yet, but might be viable.  For me, I just wanted to basically deserialize/serialize the payload into known Alexa types.  For this I found an Open Source project called <a href="https://github.com/timheuer/Slight.Alexa">Slight.Alexa</a>.  This was build for the full .NET Framework and won’t work with the Lambda service until it was ported to .NET Core, so I forked it and moved code to shared and created a .NET Core version of the library.  </p>
<p>NOTE: The port of the library was fairly straight forward sans for a few project.json things (which will be going away) as well as finding some replacements for things that aren’t in .NET Core like System.ComponentModel.DataAnnotations.  Luckily there were replacements that made this simple.</p>
<p>With my fork in place I made a quick beta NuGet package of my .NET Core version so I could use it in my Lambda service (.NET Core projects can’t reference DLLs so they need to be in NuGet packages).  You can get my beta package of this library by adding a reference to it via your new Lambda project:</p>
<p><img style="float: none; margin-left: auto; display: block; margin-right: auto" src="http://storage2.timheuer.com/aws-nuget-alexa-core.png" width="800" height="257" /></p>
<p>This now gives me a strongly-typed OM against the Alexa request/response payloads.  You’ll also want to add a NuGet reference to the JSON.NET library (isn’t every project using this now…shouldn’t it be the default reference for any .NET project???!!!).  With these both in place now you have what it takes to process.  The requests for Alexa come in as Launch, Intent and Session requests primarily (again I’m over-simplifying here but for our purposes these are the ones we will look at).  The launch request is when someone just launches your skill via the ‘Alexa, open &lt;skill name&gt;’ command.  We’ll handle that and just tell the user what our simple skill does.  Do do this, we change the function handler input from string to SkillRequest from our newly-added Slight.Alexa.Core library we added:</p>
<p /><pre class="brush: csharp; toolbar: false;">public string FunctionHandler(SkillRequest input, ILambdaContext context)
</pre>
<p>Because SkillRequest is an annotated type the library knows how to map the JSON payload to the object model from the library.  We can now work in C# against the object model rather than worry about any JSON path parsing.</p>
<h2 />
<h2>Working with the Alexa request/response</h2>
<p>Now that we have the SkillRequest object, we can examine the data to understand how our skill should respond.  We can do this by looking at the request type.  Alexa skills have a few <a href="https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/handling-requests-sent-by-alexa#types-of-requests-sent-by-alexa">request types</a> that we’ll want to look at.  Specifically for us we want to handle the LaunchRequest and IntentRequest types.  So we can examine the type and let’s first handle the LaunchRequest:</p>
<p /><pre class="brush: csharp; toolbar: false;">Response response;
IOutputSpeech innerResponse = null;
var log = context.Logger;

if (input.GetRequestType() == typeof(Slight.Alexa.Framework.Models.Requests.RequestTypes.ILaunchRequest))
{
    // default launch request, let's just let them know what you can do
    log.LogLine($"Default LaunchRequest made");

    innerResponse = new PlainTextOutputSpeech();
    (innerResponse as PlainTextOutputSpeech).Text = "Welcome to number functions.  You can ask us to add numbers!";
}
</pre>
<p>You can see that I’m just looking at the type and if a LaunchRequest, then I’m starting to provide my response, which is going to be a simple plain-text speech response (with Alexa you can use SSML for speech synthesis, but we don’t need that right now).  If the request is an IntentRequest, then I first want to get out my parameters from the slots and then execute my intent function (which in this case is adding the parameters):</p>
<p /><pre class="brush: csharp; toolbar: false;">else if (input.GetRequestType() == typeof(Slight.Alexa.Framework.Models.Requests.RequestTypes.IIntentRequest))
{
    // intent request, process the intent
    log.LogLine($"Intent Requested {input.Request.Intent.Name}");

    // AddNumbersIntent
    // get the slots
    var n1 = Convert.ToDouble(input.Request.Intent.Slots["firstnum"].Value);
    var n2 = Convert.ToDouble(input.Request.Intent.Slots["secondnum"].Value);

    double result = n1 + n2;

    innerResponse = new PlainTextOutputSpeech();
    (innerResponse as PlainTextOutputSpeech).Text = $"The result is {result.ToString()}.";

}
</pre>
<p>With these in place I can now create my response object (to provide session management, etc.) and add my actual response payload, using JSON.NET to serialize it into the correct format.  Again, the Slight.Alexa library does this for us via that annotations it has on the object model.  Please note this sample code is not robust, handles zero errors, etc…you know, the standard ‘works on my machine’ warranty applies here.:</p>
<p /><pre class="brush: csharp; toolbar: false;">response = new Response();
response.ShouldEndSession = true;
response.OutputSpeech = innerResponse;
SkillResponse skillResponse = new SkillResponse();
skillResponse.Response = response;
skillResponse.Version = "1.0";

return skillResponse;
</pre>
<p>I’ve now completed my function, let’s upload it to AWS!</p>
<h2>Publishing the Lambda Function</h2>
<p>Using the AWS Toolkit for Visual Studio this process is dead simple.  You’ll first have to make sure the toolkit is configured with your AWS account credentials which are explained <a href="http://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/getting-set-up.html#specifying-credentials">here in the Specifying Credentials information</a>.  Right click on your project and choose Publish to AWS Lambda:</p>
<p><img style="float: none; margin-left: auto; display: block; margin-right: auto" src="http://storage2.timheuer.com/aws-publish-lambda.png" /></p>
<p>You’ll then be met with a dialog that you need to choose some options.  Luckily it should be pretty self-explanatory:</p>
<p><img style="float: none; margin-left: auto; display: block; margin-right: auto" src="http://storage2.timheuer.com/aws-upload-lambda.png" width="800" height="500" /></p>
<p>You’ll want to make sure you choose a region that has the Alexa Skill trigger enabled.  I don’t know how they determine this but the US-Oregon one does NOT have that enabled, so I’ve been using US-Virginia and that enables me just fine.  The next screen will ask you to specify the user role (I am using the basic execution role).  If you don’t know what these are, re-review the Alexa skills SDK documentation with Lambda to get started there.  These are basically IAM roles in AWS that you have to choose.  After that you click Upload and done.  The toolkit takes care of bundling all your stuff up into a zip, creating the function (if you didn’t already have one – as if you did you can choose it from the drop-down to update an existing one) and uploading it for you.  You can do all this manually, but the toolkit really, really makes this simple.</p>
<h2>Testing the function</h2>
<p>After you publish you’ll get popped the test window basically:</p>
<p><img src="http://storage2.timheuer.com/aws-test-function-vs3.png" width="800" height="586" /></p>
<p>This allows you to manually test your lambda.  In the pre-configured requests objects you can see a few Alexa request object specified there.  None of them will be the exact one you need but you can start with one and manually modify it easily to do a quick test.  If you notice my screenshot I modified to specify our payload…you can see the payload I’m sending here:</p>
<p /><pre class="brush: js; toolbar: false; highlight: [17,18,19,20,22];">{
  "session": {
    "new": false,
    "sessionId": "session1234",
    "attributes": {},
    "user": {
      "userId": null
    },
    "application": {
      "applicationId": "amzn1.echo-sdk-ams.app.[unique-value-here]"
    }
  },
  "version": "1.0",
  "request": {
    "intent": {
      "slots": {
        "firstnum": {
          "name": "firstnum",
          "value": "3"
        }, "secondnum" : { "name": "secondnum", "value": "5" }
      },
      "name": "AddIntent"
    },
    "type": "IntentRequest",
    "requestId": "request5678"
  }
}
</pre>
<p>That is sending an IntentRequest with two parameters and you can see the response functioned correctly!  Yay!</p>
<p>Of course the better way is to use Alexa to test it so you’ll need a skill to do that.  Again, this post isn’t about how to do that, but once you have the skill you will have a test console that you can point to your AWS Lambda function.  I’ve got a test skill and will point it to my Lambda instance:</p>
<p><img style="float: none; margin-left: auto; display: block; margin-right: auto" src="http://storage2.timheuer.com/aws-alexa-test-console2.png" /></p>
<p>UPDATE: Previously this wasn’t working but thanks to user @jpkbst in the Alexa Slack channel he pointed out my issue.  All code above updated to reflect working version.</p>
<p><strike>Well I had you reading this far at least.  As you can see the port of the Slight.Alexa library doesn’t seem to quite be working with the response object.  I can’t pinpoint why the Alexa test console feels the response is valid as the </strike><a href="https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interface-reference#response-format"><strike>schema looks correct for the response object</strike></a><strike>.  Can you spot the issue in the code above?  If so, please comment (or better yet, fix it in my sample code).</strike></p>
<h2>Summary (thus far)</h2>
<p>I set out to spend a minimal amount of time getting the C# Lambda service + Alexa skill working.  I’ve uploaded the full solution to a GitHub repository: <a href="https://github.com/timheuer/alexa-csharp-lambda-sample">timheuer/alexa-csharp-lambda-sample</a> for you to take a look at.  I’m hopeful that this is simple and we can start using C# more for Alexa skills.  I think we’ll likely see some Alexa Skills SDK for .NET popping up elsewhere as well.  </p>
<p>Hope this helps!</p>
