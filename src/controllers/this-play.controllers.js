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
		var before = this.model.getValue();
		this.model.setValue(data);
		var after = this.model.getValue();
		if (this.events["update"]) this.events["update"](before, after);
	};
	
	Controller.prototype.on = function (event, callback) {
		this.events[event] = callback;
	};
	
	var module = (function () {
				
		var create = function (model) {
			return new Controller(model);
		}
		
		return {
			create: create
		}
		
	})();
	
	this_play.controllers = module;
	
}).call(this);