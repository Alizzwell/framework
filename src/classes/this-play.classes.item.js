;(function (undefined) {
	'use strict';
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}
	
	var item = function () {
		this.val = arguments[0];
		this.color = arguments[1];
		this.backgroundColor = arguments[2];
	};
	
	item.prototype.setValue = function (val) {
		this.val = val;
	};
	
	item.prototype.getValue = function () {
		return this.val;
	};
	
	item.prototype.setColor = function (color) {
		this.color = color;
	};
	
	item.prototype.getColor = function () {
		return this.color;
	};
	
	item.prototype.setBackgroundColor = function (color) {
		this.backgroundColor = color;
	};
	
	item.prototype.getBackgroundColor = function () {
		return this.backgroundColor;
	};
	
	this_play.classes.item = item;
	
}).call(this);