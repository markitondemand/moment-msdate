(function() {

	var moment = (typeof require !== "undefined" && require !== null) && !require.amd ? require("moment") : this.moment;

	/**
	 * To JavaScript date from OLE Automation date
	 *
	 * @param msDate An OLE Automation date. Required.
	 * @returns moment
	 */
	moment.fromOADate = function(msDate) {
		var jO = new Date( ((msDate - 25569) * 86400000) );
		var tz = jO.getTimezoneOffset();
		var jO = new Date( ( (msDate-25569 + (tz / (60*24) ) ) * 86400000) );
		return moment(jO);
	};

	/**
	 * To OLE Automation date from JavaScript date
	 *
	 * @param jsDate A JavaScript date object to convert to OA Date. Defaults to existing moment instance or new Date
	 * @returns Floating-point number, e.g., 41502.558798240745
	 */
	moment.fn.toOADate = function(jsDate){
		var jsDate = jsDate || this._d || new Date(); 
		var timezoneOffset = jsDate.getTimezoneOffset() / (60 * 24);
		var msDateObj = ( jsDate.getTime() / 86400000 ) + (25569 - timezoneOffset);
		return msDateObj;
	}

	if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
		module.exports = moment;
	}

}).call(this);