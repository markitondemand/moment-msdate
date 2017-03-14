'use strict';

const assert = require('assert');
const moment = require('../moment-msdate');

describe('moment-msdate', () => {
	console.log('********************************************************');
	console.log('*** great scott!! it\'s 2015-10-21T16:29:00.000-07:00 ***');
	console.log('********************************************************');

	describe('moment.fromOADate', () => {
		it('should convert 42298.6868055556 to 2015-10-21T16:29:00.000Z', () => {
			assert.equal(moment.fromOADate(42298.6868055556).toISOString(), '2015-10-21T16:29:00.000Z');
		});

		it('should have a timezone of utc', () => {
			const myMoment = moment.fromOADate(42298.6868055556);
			assert.ok(myMoment.isUtc());
		});
	});

	describe('moment.fromOADateOffsetToUtcByMinutes', () => {
		it('should convert 42298.6868055556 to 2015-10-21T16:29:00.000Z', () => {
			assert.equal(moment.fromOADateOffsetToUtcByMinutes(42298.6868055556, 0).toISOString(), '2015-10-21T16:29:00.000Z');
		});

		it('should convert 42298.6868055556 to 2015-10-21T20:29:00.000Z', () => {
			assert.equal(moment.fromOADateOffsetToUtcByMinutes(42298.6868055556, 240).toISOString(), '2015-10-21T20:29:00.000Z');
		});

		it('should convert 42298.6868055556 to 2015-10-21T21:29:00.000Z', () => {
			assert.equal(moment.fromOADateOffsetToUtcByMinutes(42298.6868055556, 300).toISOString(), '2015-10-21T21:29:00.000Z');
		});

		it('should convert 42298.6868055556 to 2015-10-21T22:29:00.000Z', () => {
			assert.equal(moment.fromOADateOffsetToUtcByMinutes(42298.6868055556, 360).toISOString(), '2015-10-21T22:29:00.000Z');
		});

		it('should convert 42298.6868055556 to 2015-10-21T23:29:00.000Z', () => {
			assert.equal(moment.fromOADateOffsetToUtcByMinutes(42298.6868055556, 420).toISOString(), '2015-10-21T23:29:00.000Z');
		});

		it('should have a timezone of utc', () => {
			const myMoment = moment.fromOADateOffsetToUtcByMinutes(42298.6868055556, 240);
			assert.ok(myMoment.isUtc());
		});
	});

	describe('moment.fromOADateOffsetToUtcByTimezone', () => {
		it('should convert 42298.6868055556 to 2015-10-21T20:29:00.000Z', () => {
			assert.equal(moment.fromOADateOffsetToUtcByTimezone(42298.6868055556, 'America/New_York').toISOString(), '2015-10-21T20:29:00.000Z');
		});

		it('should convert 42298.6868055556 to 2015-10-21T21:29:00.000Z', () => {
			assert.equal(moment.fromOADateOffsetToUtcByTimezone(42298.6868055556, 'America/Chicago').toISOString(), '2015-10-21T21:29:00.000Z');
		});

		it('should convert 42298.6868055556 to 2015-10-21T22:29:00.000Z', () => {
			assert.equal(moment.fromOADateOffsetToUtcByTimezone(42298.6868055556, 'America/Denver').toISOString(), '2015-10-21T22:29:00.000Z');
		});

		it('should convert 42298.6868055556 to 2015-10-21T23:29:00.000Z', () => {
			assert.equal(moment.fromOADateOffsetToUtcByTimezone(42298.6868055556, 'America/Los_Angeles').toISOString(), '2015-10-21T23:29:00.000Z');
		});

		it('should have a timezone of utc', () => {
			const myMoment = moment.fromOADateOffsetToUtcByTimezone(42298.6868055556, 'America/New_York');
			assert.ok(myMoment.isUtc());
		});
	});

	describe('moment.toOADateFromIso8601String', () => {

	});

	describe('moment.fn.toOADate', () => {

	});
});

// describe('moment-msdate: moment.fromOADate', () => {
// 	it('should convert an OLE Automation date to a moment with a 0 offset to UTC', () => {
// 		// 1/19/2017 8:02:26 PM
// 		const date = moment.fromOADate(42754.835023148145, 0); // UTC
// 		assert.equal('2017-01-19T20:02:26.000Z', date.toISOString());
// 	});

// 	it('should convert an OLE Automation date to a moment with a 300 minute offset to UTC', () => {
// 		// 1/19/2017 8:02:26 PM
// 		const date = moment.fromOADate(42754.835023148145, 300); // ET
// 		assert.equal('2017-01-20T01:02:26.000Z', date.toISOString());
// 	});

// 	it('should convert an OLE Automation date to a moment with a 360 minute offset to UTC', () => {
// 		// 1/19/2017 8:02:26 PM
// 		const date = moment.fromOADate(42754.835023148145, 360); // CT
// 		assert.equal('2017-01-20T02:02:26.000Z', date.toISOString());
// 	});

// 	it('should convert an OLE Automation date to a moment with a 420 minute offset to UTC', () => {
// 		// 1/19/2017 8:02:26 PM
// 		const date = moment.fromOADate(42754.835023148145, 420); // MT
// 		assert.equal('2017-01-20T03:02:26.000Z', date.toISOString());
// 	});
// });

// describe('moment-msdate', () => {
// 	it('should parse an OLE Automation date int', () => {
// 		const date = moment.fromOADate(41493);
// 		assert.equal(date.toString().search('Wed Aug 07 2013 00:00:00'), 0);
// 	});

// 	it('should parse an OLE Automation date double', () => {
// 		const date = moment.fromOADate(41493.706892280097000);
// 		assert.equal(date.toString().search('Wed Aug 07 2013 16:57:55'), 0);
// 	});

// 	it('should handle rounding quirks', () => {
// 		const date = moment.fromOADate(42681.501388888886);
// 		assert.equal(date.toString().search('Mon Nov 07 2016 12:02:00'), 0);
// 	});
// });

// describe('moment-msdate: moment.toOADate', () => {
// 	it('return an OLE automation date from a jsDate input', () => {

// 	});
// });

// describe('moment-msdate: moment.fn.toOADate', () => {
// 	it('should convert an empty JavaScript date to an OLE Automation date of 0', () => {
// 		const date = new Date(1899, 11, 30, 0, 0, 0);
// 		const oaDate = moment(date).toOADate();
// 		assert.equal(oaDate, 0);
// 	});

// 	it('should convert a JavaScript date to an OLE Automation date int', () => {
// 		const date = new Date(2012, 9, 15);
// 		const oaDate = moment(date).toOADate();
// 		assert.equal(oaDate, 41197);
// 	});
// });

// describe('moment-msdate: moment.fromOADateWithZone', () => {
// 	it('should convert an OLE automation date with an ET timezone to a utc moment', () => {
// 		// 1/19/2017 8:02:26 PM
// 		const date = moment.fromOADateWithZone('42754.835023148145', 'America/New_York');
// 		assert.equal('2017-01-20T01:02:25.999Z', date.toISOString());
// 	});

// 	it('should convert an OLE automation date with a CT timezone to a utc moment', () => {
// 		// 1/19/2017 8:02:26 PM
// 		const date = moment.fromOADateWithZone('42754.835023148145', 'America/Chicago');
// 		assert.equal('2017-01-20T02:02:25.999Z', date.toISOString());
// 	});

// 	it('should convert an OLE automation date with a MT timezone to a utc moment', () => {
// 		// 1/19/2017 8:02:26 PM
// 		const date = moment.fromOADateWithZone('42754.835023148145', 'America/Denver');
// 		assert.equal('2017-01-20T03:02:25.999Z', date.toISOString());
// 	});
// });

// describe('moment-msdate: moment.fn.toOADateWithZone', () => {
// 	it('should convert a moment with a UTC offset to a UTC OLE automation date', () => {
// 		const momentDate = moment.parseZone('2017-01-19T20:02:26.000Z');
// 		const oaDate = momentDate.toOADateWithZone();
// 		// 1/19/2017 8:02:26 PM
// 		assert.equal(42754.835023148145, oaDate);
// 	});

// 	it('should convert a moment with a ET offset to a UTC OLE automation date', () => {
// 		const momentDate = moment.parseZone('2017-01-19T20:02:26-05:00');
// 		const oaDate = momentDate.toOADateWithZone();
// 		assert.equal(42755.04335648148, oaDate);
// 		// 1/20/2017 1:02:26 AM
// 	});

// 	it('should convert a moment with a CT offset to a UTC OLE automation date', () => {
// 		const momentDate = moment.parseZone('2017-01-19T20:02:26-06:00');
// 		const oaDate = momentDate.toOADateWithZone();
// 		assert.equal(42755.085023148145, oaDate);
// 		// 1/20/2017 2:02:26 AM
// 	});

// 	it('should convert a moment with a MT offset to a UTC OLE automation date', () => {
// 		const momentDate = moment.parseZone('2017-01-19T20:02:26-07:00');
// 		const oaDate = momentDate.toOADateWithZone();
// 		assert.equal(42755.12668981482, oaDate);
// 		// 1/20/2017 3:02:26 AM
// 	});

// 	it('should convert a moment to a UTC OLE automation date if timezone (tz) is set', () => {
// 		const momentDate = moment('2017-01-19T20:02:26.000Z');
// 		momentDate.tz('America/New_York');
// 		const oaDate = momentDate.toOADateWithZone();
// 		assert.equal(42754.835023148145, oaDate);
// 		// 1/19/2017 8:02:26 PM
// 	});
// });

