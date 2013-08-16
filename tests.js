/**
 * Some basic tests
 *
 */

var jsDates = [
	new Date(),
	new Date(2012, 9, 15),
	new Date(1899, 11, 30, 0, 0, 0) //day 0
]

var msDates = [
	0, //should be Dec 30 1899
	41197, //Oct 15 2012, this we know
	moment().toOADate() //right now, should be same as new Date()
]

var _getHeader = function(left,right){
	return '<thead><tr><th>'+left+'</th><th>'+right+'</th></tr>';	
}

var loadTests = function() {
	var $tests = $('#tests'), 
	html = [];

	html.push('<table class="table">');

	html.push(_getHeader('JavaScript Date to...','OA Date'));

	$.each(jsDates, function(i, dat){
		html.push('<tr><td>'+dat+'</td><td>'+moment().toOADate(dat)+'</td></tr>');
	});

	html.push(_getHeader('OA Date to...','JavaScript Date'));

	$.each(msDates, function(i, dat){
		html.push('<tr><td>'+dat+'</td><td>'+new Date(moment.fromOADate(dat))+'</td></tr>');
	});

	html.push('</table>');

	$tests.append(html.join(''));

}