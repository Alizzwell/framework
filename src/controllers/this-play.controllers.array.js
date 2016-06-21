;(function (undefined) {
	'use strict';
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}
	
	
	this_play.Array = function () {
		this.val;
	};
	
	this_play.Array.prototype.bind = function (data) {
		this.val = data;
	}
	
}).call(this);