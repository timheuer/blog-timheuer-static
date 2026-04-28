---
title: "Implementing a type converter in UWP XAML"
slug: "implement-type-converter-uwp-winrt-windows-10-xaml"
pubDate: 2017-02-15T14:04:24.000Z
lastModified: 2019-10-23T04:20:41.000Z
categories: []
draft: false
---

<p>Verbose XAML, we all love it right?  What?!  You don’t like writing massive amounts of angle brackets to get to define certain properties?  I mean who doesn’t love something like this:</p> <p /><pre class="brush: xml; toolbar: false;">&lt;MapControl&gt;
    &lt;MapControl.Center&gt;
        &lt;Location&gt;
            &lt;Location.Latitude&gt;47.669444&lt;/Location.Latitude&gt;
            &lt;Location.Longitude&gt;-122.123889&lt;/Location.Longitude&gt;
        &lt;/Location&gt;
    &lt;/MapControl.Center&gt;
&lt;/MapControl&gt;
</pre>
<p>What’s not to love there?  Oh I suppose you prefer something like this?</p>
<p /><pre class="brush: xml; toolbar: false;">&lt;MapControl Center="47.669444,-122.123889" /&gt;
</pre>
<p>In the XAML dialect this is what we refer to as a ‘type converter’ or more affectionately at times ‘string to thing’ as the declarative markup is just a string representation of some structure.  In WPF and Silverlight this was implemented through requiring to use the System.ComponentModel.TypeConverter class model where you would attribute your class with a pointer to an implementation of TypeConverter that would override the common things you need, most of the time ConvertFrom capabilities.</p>
<p>In UWP where we currently could not rely on the exact same implementation of System.ComponentModel.TypeConverter as it is not a part of the API exposure to UWP apps at this time as well as being a .NET concept which wouldn’t be available to other WinRT developers.  In looking at ways to achieve the same primary scenario, we can now look at the Creator’s Update to deliver the functionality for us.  In the markup compiler for Creator’s Update we now leverage the metadata <a href="https://docs.microsoft.com/en-us/uwp/api/windows.foundation.metadata.createfromstringattribute">CreateFromString</a> attribute in WinRT to generate the correct metdata to do the conversion.  The responsibility lies in the owner of the class (looking at you ISVs as you update) to add this metadata capabilities.</p>
<blockquote>
<p>NOTE: To enable this capability, the consuming app must currently have minimum target to the Creator’s Update.</p></blockquote>
<p>Let’s use an example following my pseudo map control I used above.  Here is my class definition for my MyMap control</p>
<p /><pre class="brush: xml; toolbar: false;">using Windows.UI.Xaml.Controls;

namespace CustomControlWithType
{
    public class MyMap : Control
    {
        public MyMap()
        {
            this.DefaultStyleKey = typeof(MyMap);
        }

        public string MapTitle { get; set; }
        public Location CenterPoint { get; set; }
    }
}
</pre>
<p>Notice it has a Location type.  Here’s the definition of that type:</p>
<p>using System; namespace CustomControlWithType { public class Location { public double Latitude { get; set; } public double Longitude { get; set; } public double Altitude { get; set; } } }</p>
<p>Now without a type converter I can’t use the ‘string to thing’ concept in markup…I would have to use verbose markup.  Let’s change that and add an attribute to my Location class, and implement the conversion function:</p>
<p /><pre class="brush: xml; toolbar: false; highlight: [5,12];">using System;

namespace CustomControlWithType
{
    [Windows.Foundation.Metadata.CreateFromString(MethodName = "CustomControlWithType.Location.ConvertToLatLong")]
    public class Location
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Altitude { get; set; }

        public static Location ConvertToLatLong(string rawString)
        {
            string[] coords = rawString.Split(',');
            
            var position = new Location();
            position.Latitude = Convert.ToDouble(coords[0]);
            position.Longitude = Convert.ToDouble(coords[1]);

            if (coords.Length &gt; 2)
            {
                position.Altitude = Convert.ToDouble(coords[2]);
            }

            return position;
        }
    }
}
</pre>
<p>As you can see in the highlighted lines, I added two things.  First I added an attribute to my class to let it know that I have a CreateFromString method and then provided the fully qualified name to that method.  The second obvious thing is to implement that method.  It has to be a public static method and you can see my simple example here.</p>
<p>Now when using the MyMap control I can specify the simpler markup:</p>
<p><map:mymap centerpoint="47.669444,-122.123889,13" maptitle="Redmond, Washington, USA" /></p>
<p>And the result would be converted and my control that binds to those values in it’s template are able to see them just fine</p>
<p><img style="float: none; margin-left: auto; display: block; margin-right: auto" src="http://storage2.timheuer.com/mymaplame.png" /></p>
<p>Yes, my control is quite lame but just meant to illustrate the point.  The control binds to the CenterPoint.Latitude|Longitude|Altitude properties of the type.</p>
<p>If you are in this scenario of providing APIs that are used in UI markup for UWP apps, try this out and see if it adds delighters for your customers.  I’ve uploaded the full sample of this code to my GitHub in <a href="https://github.com/timheuer/type-converter-sample">type-converter-sample</a> if you want to see it in full.  Hope this helps!  </p>
