(function() {

	var moment = (typeof require !== "undefined" && require !== null) && !require.amd ? require("moment") : this.moment;

	moment.fn.fromOADate = function(msDate) {
		var jO = new Date( ((msDate -25569) * 86400000) );
		var tz = jO.getTimezoneOffset();
		var jO = new Date( ( (msDate-25569 + (tz / (60*24) ) ) *86400000) );
		return moment(jO);
	};

	if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
		module.exports = moment;
	}

}).call(this);