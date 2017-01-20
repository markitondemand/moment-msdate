'use strict';

(function() {

	/**
	* Constants
	*/
	var DAY_MILLISECONDS = 86400000,
		MINUTE_MILLISECONDS = 60000,
		MS_DAY_OFFSET = 25569;

	var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment-timezone') : this.moment;

	/**
	 * @description To JavaScript date from OLE Automation date
	 *
	 * @param msDate An OLE Automation date. Required.
	 * @param offsetToUtcInMinutes An offset from the msDate to UTC. If not supplied the offset from the system timezone will be used.
	 * @returns moment
	 */
	moment.fromOADate = function(msDate, offsetToUtcInMinutes) {
		let jO = new Date( ((msDate - MS_DAY_OFFSET) * DAY_MILLISECONDS) );
		let tz = isNaN(parseInt(offsetToUtcInMinutes)) ? jO.getTimezoneOffset() : offsetToUtcInMinutes;
		jO = new Date( ( (msDate-MS_DAY_OFFSET + (tz / (60*24) ) ) * DAY_MILLISECONDS) );
		return moment(jO);
	};

	/**
	 * To OLE Automation date from JavaScript date
	 *
	 * @param jsDate A JavaScript date object to convert to OA Date. Defaults to existing moment instance or new Date
	 * @returns Floating-point number, e.g., 41502.558798240745
	 */
	moment.fn.toOADate = function(jsDateInput){
		let jsDate = jsDateInput || this._d || new Date();
		let timezoneOffset = jsDate.getTimezoneOffset() / (60 * 24);
		let msDateObj = ( jsDate.getTime() / DAY_MILLISECONDS ) + (MS_DAY_OFFSET - timezoneOffset);
		return msDateObj;
	}

	moment.updateLocale('en', {
		'invalidDate': undefined
	});

	/**
	* Converts an OLE Automation date to a moment (baking in a timezone if one is supplied)
	* Returns a UTC Moment object instance
	*/
	moment.fromOADateWithZone = function(msDate, timeZone) {
		let jsTicks = (msDate - MS_DAY_OFFSET) * DAY_MILLISECONDS,
			offset = moment.tz(timeZone).utcOffset() * MINUTE_MILLISECONDS;
		if(timeZone) {
			return moment.tz(jsTicks - offset, timeZone).utc();
		}
		return moment.utc(jsTicks);
	};

	/**
	* Converts a moment (with timezone) to an OLE Automation date
	* Returns an OLE Automation date in the form of a double
	*/
	moment.fn.toOADateWithZone = function() {
		let nMsDate = ( this.valueOf() / DAY_MILLISECONDS ) + MS_DAY_OFFSET;
		return nMsDate;
	};

	if ((typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null) {
		module.exports = moment;
	}

}).call(this);