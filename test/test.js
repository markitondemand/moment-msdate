'use strict';

const assert = require('assert');
const moment = require('../moment-msdate');

describe('moment-msdate: moment.fromOADate', () => {
	it('should convert an OLE Automation date to a moment with a 0 offset to UTC', () => {
		// 1/19/2017 8:02:26 PM
		const date = moment.fromOADate(42754.835023148145, 0); // UTC
		assert.equal('2017-01-19T20:02:25.999Z', date.toISOString());
	});

	it('should convert an OLE Automation date to a moment with a 300 minute offset to UTC', () => {
		// 1/19/2017 8:02:26 PM
		const date = moment.fromOADate(42754.835023148145, 300); // ET
		assert.equal('2017-01-20T01:02:25.999Z', date.toISOString());
	});

	it('should convert an OLE Automation date to a moment with a 360 minute offset to UTC', () => {
		// 1/19/2017 8:02:26 PM
		const date = moment.fromOADate(42754.835023148145, 360); // CT
		assert.equal('2017-01-20T02:02:25.999Z', date.toISOString());
	});

	it('should convert an OLE Automation date to a moment with a 420 minute offset to UTC', () => {
		// 1/19/2017 8:02:26 PM
		const date = moment.fromOADate(42754.835023148145, 420); // MT
		assert.equal('2017-01-20T03:02:25.999Z', date.toISOString());
	});

	it('should parse an OLE Automation date int', () => {
		const date = moment.fromOADate(41493);
		assert.equal(date.toString(), 'Wed Aug 07 2013 00:00:00 GMT-0600');
	});

	it('should parse an OLE Automation date double', () => {
		const date = moment.fromOADate(41493.706892280097000);
		assert.equal(date.toString(), 'Wed Aug 07 2013 16:57:55 GMT-0600');
	});
});

describe('moment-msdate: moment.toOADate', () => {});

describe('moment-msdate: moment.fn.toOADate', () => {
	it('should convert an empty JavaScript date to an OLE Automation date of 0', () => {
		const date = new Date(1899, 11, 30, 0, 0, 0);
		const oaDate = moment(date).toOADate();
		assert.equal(oaDate, 0);
	});

	it('should convert a JavaScript date to an OLE Automation date int', () => {
		const date = new Date(2012, 9, 15);
		const oaDate = moment(date).toOADate();
		assert.equal(oaDate, 41197);
	});
});

describe('moment-msdate: moment.fromOADateWithZone', () => {});
describe('moment-msdate: moment.toOADateWithZone', () => {});
describe('moment-msdate: moment.fn.toOADateWithZone', () => {});
