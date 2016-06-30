;(function (undefined) {
	'use strict';
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}
	
	var Controller = function (model) {
		this.model = model;
		this.events = {};
	};
	
	Controller.prototype.update = function (data) {
		var before = this.getValue();
		this.model.setValue(data);
		var after = this.getValue();
		
		if (this.events.update) {
			this.events.update(before, after);
		}
		
		if (this.events.change && before !== after) {
			this.events.change(before, after);
		}
	};
	
	Controller.prototype.on = function (event, callback) {
		this.events[event] = callback;
	};

	Controller.prototype.getValue = function () {
		return this.model.getValue();
	};
	
	var ArrayController = function (model) {
		Controller.apply(this, arguments);
	};
	
	ArrayController.prototype = new Controller();
	
	ArrayController.prototype.update = function (data) {
		if (!Array.isArray(data)) {
			throw TypeError("data is not array");
		}
		
		if (data.length != this.model.array.length) {
			throw RangeError("data range error");
		}
		
		var that = this;
		data.forEach(function (d) {
			if (typeof d !== that.model.type) {
				throw TypeError("type error");
			}
		});
		
		var before = this.getValue();
		data.forEach(function (d, i) {
			that.model.array[i].setValue(d);
		});

		var after = this.getValue();
		
		if (this.events.update) {
			this.events.update(before, after);
		}
		
		if (this.events.change && before !== after) {
			this.events.change(before, after);
		}
	};
	
	ArrayController.prototype.getValue = function () {
		var retArray = [];
		this.model.array.forEach(function (item) {
			retArray.push(item.getValue());
		});
		return retArray;
	};

	var module = (function () {
				
		var create = function (model) {
			if (model.array) {
				return new ArrayController(model);
			}
			
			return new Controller(model);
		};
		
		return {
			create: create
		};
		
	})();
	
	this_play.controllers = module;
	
}).call(this);