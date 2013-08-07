# moment-msdate

A [Moment.js](http://momentjs.com/) plugin for parsing OLE Automation dates.

## About OLE Automation Dates

An OLE Automation date, or "MSDate" as we call it, is implemented as a floating-point number whose integral component is the number of days before or after midnight, 30 December 1899, and whose fractional component represents the time on that day divided by 24. For example, midnight, 31 December 1899 is represented by 1.0; 6 A.M., 1 January 1900 is represented by 2.25; midnight, 29 December 1899 is represented by -1.0; and 6 A.M., 29 December 1899 is represented by -1.25.

[More on the `DateTime.FromOADate` method on MSDN](http://msdn.microsoft.com/en-us/library/system.datetime.fromoadate.aspx)

## Usage

For date:

`moment().fromOADate(41493)` returns `Wed Aug 07 2013 00:00:00 GMT-0600 (MDT)`

For exact date _and_ time:

`moment().fromOADate(41493.706892280097000)` returns `Wed Aug 07 2013 16:57:55 GMT-0600 (MDT)`

For Moment formatting:

```
//convert OADate into JavaScript date
var jsDate = moment().fromOADate(41493.706892280097000);

//use Moment's awesomeness
var formattedDate = moment(jsDate).format('MMM Do YY);

//formattedDate === "Aug 7th 13"
```

This could easily be chained together as:

`moment().fromOADate(41493.706892280097000).format('MMM Do YY); //Aug 7th 13`

## License

Copyright &copy; 2013 Markit On Demand, Inc.

The "moment-msdate" Moment.js plugin is licensed under the Apache License, Version 2.0.