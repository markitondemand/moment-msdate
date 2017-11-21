'use strict';

var assert = require('assert');
var moment = require('../moment-msdate');

describe('moment-msdate: moment.fromOADate', function() {
	it('should convert an OLE Automation date to a moment with a 0 offset to UTC', function() {
		// 1/19/2017 8:02:26 PM
		var date = moment.fromOADate(42754.835023148145, 0); // UTC
		assert.equal('2017-01-19T20:02:26.000Z', date.toISOString());
	});

	it('should convert an OLE Automation date to a moment with a 300 minute offset to UTC', function() {
		// 1/19/2017 8:02:26 PM
		var date = moment.fromOADate(42754.835023148145, 300); // ET
		assert.equal('2017-01-20T01:02:26.000Z', date.toISOString());
	});

	it('should convert an OLE Automation date to a moment with a 360 minute offset to UTC', function() {
		// 1/19/2017 8:02:26 PM
		var date = moment.fromOADate(42754.835023148145, 360); // CT
		assert.equal('2017-01-20T02:02:26.000Z', date.toISOString());
	});

	it('should convert an OLE Automation date to a moment with a 420 minute offset to UTC', function() {
		// 1/19/2017 8:02:26 PM
		var date = moment.fromOADate(42754.835023148145, 420); // MT
		assert.equal('2017-01-20T03:02:26.000Z', date.toISOString());
	});
});

describe('moment-msdate', function() {
	it('should parse an OLE Automation date int', function() {
		var date = moment.fromOADate(41493);
		assert.equal(date.toString().search('Wed Aug 07 2013 00:00:00'), 0);
	});

	it('should parse an OLE Automation date double', function() {
		var date = moment.fromOADate(41493.706892280097000);
		assert.equal(date.toString().search('Wed Aug 07 2013 16:57:55'), 0);
	});

	it('should handle rounding quirks', function() {
		var date = moment.fromOADate(42681.501388888886);
		assert.equal(date.toString().search('Mon Nov 07 2016 12:02:00'), 0);
	});
});

describe('moment-msdate: moment.toOADate', function() {
	it('return an OLE automation date from a jsDate input', function() {

	});
});

describe('moment-msdate: moment.fn.toOADate', function() {
	it('should convert an empty JavaScript date to an OLE Automation date of 0', function() {
		var date = new Date(1899, 11, 30, 0, 0, 0);
		var oaDate = moment(date).toOADate();
		assert.equal(oaDate, 0);
	});

	it('should convert a JavaScript date to an OLE Automation date int', function() {
		var date = new Date(2012, 9, 15);
		var oaDate = moment(date).toOADate();
		assert.equal(oaDate, 41197);
	});
});

describe('moment-msdate: moment.fromOADateWithZone', function() {
	it('should convert an OLE automation date with an ET timezone to a utc moment', function() {
		// 1/19/2017 8:02:26 PM
		var date = moment.fromOADateWithZone('42754.835023148145', 'America/New_York');
		assert.equal('01/19/2017 08:02', date.format('MM/DD/YYYY hh:mm'));
		assert.equal('EST', date.format('zz'));
	});

	it('should convert an OLE automation date with a CT timezone to a utc moment', function() {
		// 1/19/2017 8:02:26 PM
		var date = moment.fromOADateWithZone('42754.835023148145', 'America/Chicago');
		assert.equal('01/19/2017 07:02', date.format('MM/DD/YYYY hh:mm'));
		assert.equal('CST', date.format('zz'));
	});

	it('should convert an OLE automation date with a MT timezone to a utc moment', function() {
		// 1/19/2017 8:02:26 PM
		var date = moment.fromOADateWithZone('42754.835023148145', 'America/Denver');

		assert.equal('01/19/2017 06:02', date.format('MM/DD/YYYY hh:mm'));
		assert.equal('MST', date.format('zz'));
	});

	it('should convert an OLE automation date with a MT timezone in DST to a utc moment', function() {
		// 7/7/2010 10:36 AM - actually occurs during DST (the UTC conversion takes DST back off)
		var jsDateConverted = moment(new Date('7/7/2010 9:36 AM'), 'America/Denver');
		var date = moment.fromOADateWithZone('40366.4', 'America/Denver');
		assert.equal(jsDateConverted.toISOString(), date.toISOString());
	});
});

describe('moment-msdate: moment.fn.toOADateWithZone', function() {
	it('should convert a moment with a UTC offset to a UTC OLE automation date', function() {
		var momentDate = moment.parseZone('2017-01-19T20:02:26.000Z');
		var oaDate = momentDate.toOADateWithZone();
		// 1/19/2017 8:02:26 PM
		assert.equal(42754.835023148145, oaDate);
	});

	it('should convert a moment with a ET offset to a UTC OLE automation date', function() {
		var momentDate = moment.parseZone('2017-01-19T20:02:26-05:00');
		var oaDate = momentDate.toOADateWithZone();
		assert.equal(42755.04335648148, oaDate);
		// 1/20/2017 1:02:26 AM
	});

	it('should convert a moment with a CT offset to a UTC OLE automation date', function() {
		var momentDate = moment.parseZone('2017-01-19T20:02:26-06:00');
		var oaDate = momentDate.toOADateWithZone();
		assert.equal(42755.085023148145, oaDate);
		// 1/20/2017 2:02:26 AM
	});

	it('should convert a moment with a MT offset to a UTC OLE automation date', function() {
		var momentDate = moment.parseZone('2017-01-19T20:02:26-07:00');
		var oaDate = momentDate.toOADateWithZone();
		assert.equal(42755.12668981482, oaDate);
		// 1/20/2017 3:02:26 AM
	});

	it('should convert a moment to a UTC OLE automation date if timezone (tz) is set', function() {
		var momentDate = moment('2017-01-19T20:02:26.000Z');
		momentDate.tz('America/New_York');
		var oaDate = momentDate.toOADateWithZone();
		assert.equal(42754.835023148145, oaDate);
		// 1/19/2017 8:02:26 PM
	});
});

