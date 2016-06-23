;(function (undefined) {
	'use strict';
	
	
	var scheduler = function () {
		var status = {};
		
		
	};
		
	scheduler.prototype.status = function () {
		return { step: { } };
	}
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}
	
	this_play.scheduler = {
		
		parse: function (jsonData) {
			return new scheduler();
		}
		
	};
	
}).call(this);