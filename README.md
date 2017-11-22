# moment-msdate [![Build Status](https://travis-ci.org/markitondemand/moment-msdate.svg?branch=master)](https://travis-ci.org/markitondemand/moment-msdate) [![npm version](https://badge.fury.io/js/moment-msdate.svg)](https://badge.fury.io/js/moment-msdate)

A [moment.js](http://momentjs.com/) and [moment-timezone.js](http://momentjs.com/timezone) plugin for parsing OLE Automation dates.

Visit [http://markitondemand.github.io/moment-msdate/](http://markitondemand.github.io/moment-msdate/) for more information and examples.

## About OLE Automation Dates

An OLE Automation date, or "MSDate" as we call it, is implemented as a floating-point number whose integral component is the number of days before or after midnight, 30 December 1899, and whose fractional component represents the time on that day divided by 24. For example, midnight, 31 December 1899 is represented by 1.0; 6 A.M., 1 January 1900 is represented by 2.25; midnight, 29 December 1899 is represented by -1.0; and 6 A.M., 29 December 1899 is represented by -1.25.

Read more [about OLE Automation on MSDN](http://msdn.microsoft.com/en-us/library/dt80be78(v=vs.71).aspx) (including [`DateTime.ToOADate`](http://msdn.microsoft.com/en-us/library/system.datetime.tooadate.aspx) and [`DateTime.FromOADate`](http://msdn.microsoft.com/en-us/library/system.datetime.fromoadate.aspx)).

**Note**: OLE Automation dates are unspecified and they’re based on the local timezone by default. The moment library normalizes all time to UTC and as a result this library will return all values based on UTC time.

## Usage

### fromOADate(oaDate, [offset])

Convert an OA date to a `moment`:

`moment.fromOADate(42298.6868055556)` returns `2015-10-21T16:29:00.000Z`

Convert an OA date with a known offset to UTC to a `moment` in UTC time
```
moment.fromOADate(42298.6868055556, 240) returns 2015-10-21T20:29:00.000Z
moment.fromOADate(42298.6868055556, 'America/New_York') returns `2015-10-21T20:29:00.000Z
```

### toOADate()

Convert a `moment` to a floating point OA date in UTC:
```
const momentDate = moment('2015-10-21T16:29:00.000-07:00')
momentDate.toOADate() returns 42298.978472222225
```

### Example Moment Formatting:

Convert OA date into Moment (OA Date is assumed to be in UTC)
```
const momentDate = moment.fromOADate(42298.6868055556);
```

If OA date is not in UTC and the offset to UTC is known it can be specified during the moment creation in minutes
```
const momentDate = moment.fromOADate(42298.6868055556, 240)
momentDate.toISOString() returns '2015-10-21T20:29:00.000Z' (UTC)
momentDate.format('LLLL') returns 'Wednesday, October 21, 2015 8:29 PM' (UTC)
```

If OA date is not in UTC and the offset to UTC is known it can be specified during the moment creation as a timezone
```
const momentDate = moment.fromOADate(42298.6868055556, 'America/New_York')
momentDate.toISOString() returns '2015-10-21T20:29:00.000Z' (UTC)
momentDate.format('LLLL') returns 'Wednesday, October 21, 2015 8:29 PM' (UTC)
```

Once the date is in UTC it can than easily be converted to any other timezone using moment-timezone.js
```
const momentDate = moment.fromOADate(42298.6868055556, 240)
momentDate.tz('America/New_York')
momentDate.toISOString() returns '2015-10-21T20:29:00.000Z' (UTC)
momentDate.format('LLLL') returns 'Wednesday, October 21, 2015 4:29 PM' (ET)
```

## License

Copyright &copy; 2014 Markit On Demand, Inc.

The "moment-msdate" Moment.js plugin is licensed under the Apache License, Version 2.0.
