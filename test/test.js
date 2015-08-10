'use strict';

var assert = require('assert'),
	lint = require('mocha-eslint'),
	moment = require('../moment-msdate');

lint(['./*.js', './test/*.js']);

describe('moment-msdate', function() {
	it('should parse an OLE Automation date int', function(done) {
		var date = moment.fromOADate(41493);
		assert.equal(date.toString(), 'Wed Aug 07 2013 00:00:00 GMT-0600');
		done();
	});

	it('should parse an OLE Automation date double', function(done) {
		var date = moment.fromOADate(41493.706892280097000);
		assert.equal(date.toString(), 'Wed Aug 07 2013 16:57:55 GMT-0600');
		done();
	});

	it('should convert an empty JavaScript date to an OLE Automation date of 0', function(done) {
		var date = new Date(1899, 11, 30, 0, 0, 0);
		var oaDate = moment(date).toOADate();
		assert.equal(oaDate, 0);
		done();
	});

	it('should convert a JavaScript date to an OLE Automation date int', function(done) {
		var date = new Date(2012, 9, 15);
		var oaDate = moment(date).toOADate();
		assert.equal(oaDate, 41197);
		done();
	});

	// not a real reliable way to do this because of js number precision:
	// it('should convert a JavaScript date to an OLE Automation date double', function(done) {
	// 	var date = new Date(2015, 7, 10, 8, 10, 10, 0);
	// 	var oaDate = moment(date).toOADate();
	// 	assert.equal(oaDate, 42226.3403935185);
	// 	done();
	// });
});