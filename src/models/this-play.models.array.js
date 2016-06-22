;(function (undefined) {
	'use strict';
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}
	
	var model_array = function () {
		this.models = [];
	};
	
	model_array.prototype.init = function (rawdata) {
		if (typeof rawdata.constructor === Array) {
			throw 'Not valid type of rawdata';
		}
				
		// TODO: refactoring
		var _this = this;
		rawdata.forEach(function (val) {
			var item = new this_play.classes.item(val);
			item.setColor('#877777');	// TODO: make color util & default setting
			_this.models.push(item);
		});
	};
	
	model_array.prototype.getItem = function (index) {
		return this.models[index];
	}
	
	this_play.models.array = model_array;
	
}).call(this);