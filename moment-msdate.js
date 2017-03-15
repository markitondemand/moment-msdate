'use strict';

(function(root, factory) {
	/*global define*/
	if (typeof define === 'function' && define.amd) {
		define(['moment', 'moment-timezone'], factory);                          // AMD
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('moment'), require('moment-timezone')); // Node
	} else {
		// correct way to load moment-timezone?
		factory(root.moment, root.moment.tz);                                    // Browser
	}
}(this, (moment, momentTimezone) => {
	const DAY_MILLISECONDS = 86400000;
	const MINUTE_MILLISECONDS = 60000;
	const MS_DAY_OFFSET = 25569;

	const momentVersion = moment.version.split('.');
	const major = +momentVersion[0];
	const minor = +momentVersion[1];

	if (major < 2 || (major === 2 && minor < 6)) {
		throw new Error(`moment-msdate requires Moment.js >= 2.6.0. You are using Moment.js ${moment.version}. See momentjs.com`);
	}

	if (!momentTimezone || !moment.tz) {
		throw new Error('moment-msdate requires moment-timezone.js. see momentjs.com/timezone');
	}

	const oaDateToTicks = function(oaDate) {
		return ((oaDate - MS_DAY_OFFSET) * DAY_MILLISECONDS) + (oaDate >= 0.0 ? 0.5 : -0.5);
	};

	const ticksToOADate = function(milliseconds) {
		return (milliseconds / DAY_MILLISECONDS) + MS_DAY_OFFSET;
	};

	/**
	 * @description takes an oaDate that is in utc and converts it to a utc moment
	 *
	 * @param {double} oaDate
	 * @returns moment
	 */
	moment.fromOADate = function(oaDate) {
		return moment(oaDateToTicks(oaDate)).utc();
	};

	/**
	 * @description takes an oaDate that is not in utc and converts it to a utc moment offset by a number of minutes
	 *
	 * @param {double} oaDate
	 * @param {string} offsetToUtcInMinutes
	 * @returns moment
	 */
	moment.fromOADateOffsetToUtcByMinutes = function(oaDate, offsetToUtcInMinutes) {
		const offsetInTicks = offsetToUtcInMinutes * MINUTE_MILLISECONDS;
		const ticks = oaDateToTicks(oaDate);
		return moment(ticks + offsetInTicks).utc();
	};

	/**
	 * @description takes an oaDate that is not in utc and converts it to a utc moment offset by the specified timezone
	 *
	 * @param {double} oaDate
	 * @param {string} timezone
	 * @returns moment
	 */
	moment.fromOADateOffsetToUtcByTimezone = function(oaDate, timezone) {
		const ticks = oaDateToTicks(oaDate);
		const offset = moment.tz(timezone).utcOffset() * MINUTE_MILLISECONDS;
		return moment.tz(ticks - offset, timezone).utc();
	};

	/**
	 * @description converts an ISO 8601 date time string to a UTC OLE automation date represented as a double
	 *
	 * @param {string} iso8601String
	 * @returns {double}
	 */
	moment.toOADateFromIso8601String = function(iso8601String) {
		const myMoment = moment(iso8601String).utc();
		const milliseconds = myMoment.valueOf();
		return ticksToOADate(milliseconds);
	};

	/**
	 * @description converts a moment to a UTC OLE automation date represented as a double
	 *
	 * @returns {double}
	 */
	moment.fn.toOADate = function() {
		const milliseconds = this.valueOf();
		return ticksToOADate(milliseconds);
	};

	return moment;
}));
