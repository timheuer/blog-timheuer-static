---
title: "Using machine learning to tune your SQL database in Azure"
slug: "using-machine-learning-to-tune-your-sql-database-in-azure"
pubDate: 2017-11-02T21:34:45.000Z
lastModified: 2019-10-23T04:20:41.000Z
categories: []
draft: false
---

<p>I’m presently working on posting my insight in moving a recent app of mine from an on-premise (colocated server) server to the Azure cloud.  My app is a pretty typical (and OLD) ASP.NET app with a SQL Server database backend.  There was some interesting things I learned in moving the web app portion to Azure App Service, but I’ll save that for a later post…this one is about Azure SQL Server.</p>
<p>My database was actually a SQLExpress database that has been humming along for a while.  It’s also an older schema and a typical relational database system.  The first step for me was to ensure I could move my data before I moved the site…I wanted a full move to a cloud platform.  There are a few ways of migrating databases to Azure as noted in this blog post <a href="https://blogs.msdn.microsoft.com/datamigration/2017/10/13/differentiating-microsofts-database-migration-tools-and-services/">Differentiating Microsoft’s Database Migration Tools and Services</a>.  Recently one of our <a href="http://developeradvocates.microsoft.com">Cloud Developer Advocates</a>, <a href="https://twitter.com/scottcate">Scott Cate</a>, demonstrated the newest full migration strategy, <a href="https://channel9.msdn.com/Events/Microsoft-Azure/Azure-Red-Shirt-Dev-Tour-NYC-2017/Part-2-Azure-Red-Shirt-Dev-Tour-NYC-2017?t=19m53s">Data Migration Service (DMS)</a>, at the <a href="https://channel9.msdn.com/Events/Microsoft-Azure/Azure-Red-Shirt-Dev-Tour-NYC-2017/">Azure Red Shirt Dev Tour</a>.  Because this isn’t generally available I didn’t want to use it and as well my database didn’t warrant the need for managed instance features.  So I went with the <a href="https://docs.microsoft.com/en-us/sql/dma/dma-overview?WC.mc_id=docs-blog-timheuer">Data Migration Assistant</a> tool.</p>
<p>First was to get the tool and install it on my <strong>source</strong> server.  Because this is an on-prem server I just logged in remotely (RDP) as an admin.  You can choose to first run an assessment, but for me I went crazy and just wanted to migrate (don’t worry, that actually runs an assessment first as well):</p>
<p><img style="display: block; margin-left: auto; margin-right: auto;" title="" src="http://storage2.timheuer.com/dbmigrate1.png" alt="" width="" height="" border="0" /></p>
<p>After connecting to my SQL db instance I select the database I want to migrate.</p>
<blockquote>
<p>NOTE: Use the “trust server certificate” checkbox when doing this migration from local db or you will see some failures in trying to connect to Azure.</p>
</blockquote>
<p>After this I need to choose the <strong>destination</strong> and I can either select an already-created Azure SQL database or create one within my Azure subscription.  This link will launch instructions on <a href="https://docs.microsoft.com/en-us/azure/sql-database/sql-database-get-started-portal?WC.mc_id=docs-blog-timheuer">how to create a new Azure SQL database</a> on your subscription using the <a href="https://portal.azure.com">Azure Portal</a>.  You will want to select your server size, etc. based on your needs.  There is some pricing guidance on the selections to help you understand your cost.  After this, return to the tool, enter the server you just created (or already had) and authenticate using your credentials for the server.  Then choose which database is the target for the migration:</p>
<p><img style="display: block; margin-left: auto; margin-right: auto;" title="" src="http://storage2.timheuer.com/dbmigrate3.png" alt="" width="" height="" border="0" /></p>
<p>Then the next step will show you the assessment and flag things that may need attention.  You need to examine these to assess whether they will be impactful to your app and either accept the script or not.  Once done you have 2 more steps: Deploy Schema and then (assuming that was successful) Migrate Data.  For me, this was rather quick and it was done.  I verified the data and was good to go!</p>
<h2>Post-migration Tuning</h2>
<p>After deploying the database and site I made sure that on the database I turned on the Automatic Tuning feature provided to me as a service for hosting in Azure:</p>
<p><img style="display: block; margin-left: auto; margin-right: auto;" title="" src="http://storage2.timheuer.com/dbmigrate4.png" alt="" width="" height="" border="0" /></p>
<p>And then I went away.  Immediately after a few days I returned to see some <strong>automatic</strong> tuning being done and analyzed.  Azure had analyzed my database under real conditions and made recommendations to actually alter the database to improve performance.  This is then automatically applied if Azure determines it will benefit my performance.  Here were the recommendations:</p>
<p><img style="display: block; margin-left: auto; margin-right: auto;" title="" src="http://storage2.timheuer.com/dbmigrate5.png" alt="" width="800" height="" border="0" /></p>
<p>And notice the determination of impact for one of them:</p>
<p><img style="display: block; margin-left: auto; margin-right: auto;" title="" src="http://storage2.timheuer.com/dbmigrate7.png" alt="" width="800" height="" border="0" /></p>
<p>You’ll see that Azure’s machine learning was smart enough to realize that one of the recommendations wasn’t going to improve (in fact it assessed it would actually regress a query) and decided not to apply the initial tuning recommendation.  Pretty awesome.  Taking a look at my performance profile of the database you can tell very quickly when these recommendations were applied:</p>
<p><img style="display: block; margin-left: auto; margin-right: auto;" title="" src="http://storage2.timheuer.com/dbmigrate6.png" alt="" width="800" height="" border="0" /></p>
<p>This is awesome.  I’ve got some tuning still to go, but thankfully Azure did all the hard work of helping me identify the performance bottlenecks of my database, suggest and analyze some automatic tuning it could do, but also still give me all the data I need to further analyze troublesome queries.</p>
<p>You can learn more about this feature in a recent Channel 9 video talking about this:</p>
<p><iframe src="https://channel9.msdn.com/Shows/Azure-Friday/Improve-Azure-SQL-Database-Performance-with-Automatic-Tuning/player" width="960" height="540" allowfullscreen="" frameborder="0"></iframe></p>
<p>It really is an amazing feature and combined with the easy migration, I’m really excited about moving this app to Azure App Service + Azure SQL!</p>
<p>Hope this helps! </p>
