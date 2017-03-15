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

		it('should convert 42298.978472222225 to America/Los_Angeles timezone', () => {
			const myMoment = moment.fromOADate(42298.978472222225);
			myMoment.tz('America/Los_Angeles');
			assert.equal(myMoment.format('LLLL'), 'Wednesday, October 21, 2015 4:29 PM');
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
			assert.equal(moment.fromOADateOffsetToUtcByMinutes(42298.6868055556, 240).format('LLLL'), 'Wednesday, October 21, 2015 8:29 PM');
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

		it('should convert 42298.6868055556 to 2015-10-21T23:29:00.000Z', () => {
			assert.equal(moment.fromOADateOffsetToUtcByMinutes(42298.6868055556, 420).toISOString(), '2015-10-21T23:29:00.000Z');
		});

		it('should have a timezone of utc', () => {
			const myMoment = moment.fromOADateOffsetToUtcByMinutes(42298.6868055556, 240);
			assert.ok(myMoment.isUtc());
		});

		it('should not interfere with moment-timezone', () => {
			const myMoment = moment.fromOADateOffsetToUtcByMinutes(42298.6868055556, 240);
			myMoment.tz('America/New_York');
			assert.equal(myMoment.toISOString(), '2015-10-21T20:29:00.000Z');
			assert.equal(myMoment.format('LLLL'), 'Wednesday, October 21, 2015 4:29 PM');
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

		it('should not interfere with moment-timezone', () => {
			const myMoment = moment.fromOADateOffsetToUtcByTimezone(42298.6868055556, 'America/New_York');
			myMoment.tz('America/New_York');
			assert.equal(myMoment.toISOString(), '2015-10-21T20:29:00.000Z');
			assert.equal(myMoment.format('LLLL'), 'Wednesday, October 21, 2015 4:29 PM');
		});
	});

	describe('moment.toOADateFromIso8601String', () => {
		it('should convert 2015-10-21T16:29:00.000Z to 42298.6868055556', () => {
			assert.equal(moment.toOADateFromIso8601String('2015-10-21T16:29:00.000Z'), 42298.68680555555);
		});

		it('should convert 2015-10-21T16:29:00.000-04:00 to 42298.6868055556', () => {
			assert.equal(moment.toOADateFromIso8601String('2015-10-21T16:29:00.000-04:00'), 42298.853472222225);
		});

		it('should convert 2015-10-21T16:29:00.000-04:00 to 42298.6868055556', () => {
			assert.equal(moment.toOADateFromIso8601String('2015-10-21T16:29:00.000-05:00'), 42298.89513888889);
		});

		it('should convert 2015-10-21T16:29:00.000-04:00 to 42298.6868055556', () => {
			assert.equal(moment.toOADateFromIso8601String('2015-10-21T16:29:00.000-06:00'), 42298.93680555555);
		});

		it('should convert 2015-10-21T16:29:00.000-04:00 to 42298.6868055556', () => {
			assert.equal(moment.toOADateFromIso8601String('2015-10-21T16:29:00.000-07:00'), 42298.978472222225);
		});
	});

	describe('moment.fn.toOADate', () => {
		it('should convert 2015-10-21T16:29:00.000Z to 42298.6868055556', () => {
			const myMoment = moment('2015-10-21T16:29:00.000Z').utc();
			assert.equal(myMoment.toOADate(), 42298.68680555555);
		});

		it('should convert 2015-10-21T16:29:00.000-04:00 to 42298.6868055556', () => {
			const myMoment = moment('2015-10-21T16:29:00.000-04:00').utc();
			assert.equal(myMoment.toOADate(), 42298.853472222225);
		});

		it('should convert 2015-10-21T16:29:00.000-04:00 to 42298.6868055556', () => {
			const myMoment = moment('2015-10-21T16:29:00.000-05:00').utc();
			assert.equal(myMoment.toOADate(), 42298.89513888889);
		});

		it('should convert 2015-10-21T16:29:00.000-04:00 to 42298.6868055556', () => {
			const myMoment = moment('2015-10-21T16:29:00.000-06:00');
			assert.equal(myMoment.toOADate(), 42298.93680555555);
		});

		it('should convert 2015-10-21T16:29:00.000-04:00 to 42298.6868055556', () => {
			const myMoment = moment('2015-10-21T16:29:00.000-07:00');
			assert.equal(myMoment.toOADate(), 42298.978472222225);
		});
	});
});
