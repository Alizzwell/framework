;(function (undefined) {
	'use strict';
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}
	
	this_play.Array = function () {
		this.val;
		this.model = new this_play.models.array();
	};
	
	this_play.Array.prototype.bind = function (data) {
		this.val = data;
		this.model.init(this.val);
	};
	
	this_play.Array.prototype.getItem = function (index) {
			return this.model.getItem(index);
	};
	
	this_play.Array.prototype.setColor = function (index, color) {
		this.model.getItem(index).setColor(color);
	};
	
	this_play.Array.prototype.setBackgroundColor = function (index, color) {
		this.model.getItem(index).setBackgroundColor(color);
	};
	
}).call(this);