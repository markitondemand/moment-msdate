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

	// Moment.js version check
	if (major < 2 || (major === 2 && minor < 6)) {
		throw new Error(`moment-msdate requires Moment.js >= 2.6.0. You are using Moment.js ${moment.version}. See momentjs.com`);
	}

	if (!momentTimezone || !moment.tz) {
		throw new Error('moment-msdate requires moment-timezone.js. see momentjs.com/timezone');
	}

	// moment.updateLocale('en', { invalidDate: undefined }); // needs to move to the users config for moment

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


// (function() {

	/**
	* Constants
	*/
	// const DAY_MILLISECONDS = 86400000;
	// const MINUTE_MILLISECONDS = 60000;
	// const MS_DAY_OFFSET = 25569;

	// const moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment-timezone') : this.moment;

	/**
	 * @description To JavaScript date from OLE Automation date
	 *
	 * @param msDate An OLE Automation date. Required.
	 * @param offsetToUtcInMinutes An offset from the msDate to UTC. If not supplied the offset from the system timezone will be used.
	 * @returns moment
	 */
	// moment.fromOADate = function(msDate, offsetToUtcInMinutes) {
	// 	let jO = new Date(((msDate - MS_DAY_OFFSET) * DAY_MILLISECONDS) + (msDate >= 0.0 ? 0.5 : -0.5));
	// 	const tz = isNaN(parseInt(offsetToUtcInMinutes, 10)) ? jO.getTimezoneOffset() : offsetToUtcInMinutes;
		// jO = new Date((((msDate - MS_DAY_OFFSET) + (tz / (60 * 24))) * DAY_MILLISECONDS) + (msDate >= 0.0 ? 0.5 : -0.5));
	// 	return moment(jO);
	// };

	// fromOADate returns a UTC moment
	// moment.fromOADate = function(oaDate) {
	// 	return moment(((oaDate - MS_DAY_OFFSET) * DAY_MILLISECONDS) + (oaDate >= 0.0 ? 0.5 : -0.5)).utc();
	// };

	/**
	 * To OLE Automation date from JavaScript date
	 *
	 * @param jsDate A JavaScript date object to convert to OA Date. Defaults to existing moment instance or new Date
	 * @returns Floating-point number, e.g., 41502.558798240745
	 */
	// moment.fn.toOADate = function(jsDateInput) {
	// 	const jsDate = jsDateInput || this._d || new Date();
	// 	const timezoneOffset = jsDate.getTimezoneOffset() / (60 * 24);
	// 	const msDateObj = (jsDate.getTime() / DAY_MILLISECONDS) + (MS_DAY_OFFSET - timezoneOffset);
	// 	return msDateObj;
	// };

	// moment.updateLocale('en', {
	// 	invalidDate: undefined
	// });

	/**
	* Converts an OLE Automation date to a moment (baking in a timezone if one is supplied)
	* Returns a UTC Moment object instance
	*/
	// moment.fromOADateWithZone = function(msDate, timeZone) {
	// 	const jsTicks = (msDate - MS_DAY_OFFSET) * DAY_MILLISECONDS;
	// 	const offset = moment.tz(timeZone).utcOffset() * MINUTE_MILLISECONDS;
	// 	if (timeZone) {
	// 		return moment.tz(jsTicks - offset, timeZone).utc();
	// 	}
	// 	return moment.utc(jsTicks);
	// };

	/**
	* Converts a moment (with timezone) to an OLE Automation date in UTC
	* Returns an OLE Automation date in the form of a double
	*/
// 	moment.fn.toOADateWithZone = function() {
// 		const nMsDate = (this.valueOf() / DAY_MILLISECONDS) + MS_DAY_OFFSET;
// 		return nMsDate;
// 	};

// 	if ((typeof module !== 'undefined' && module !== null ? module.exports : undefined) !== null) {
// 		module.exports = moment;
// 	}

// }).call(this);
