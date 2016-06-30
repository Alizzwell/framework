;(function (undefined) {
	'use strict';
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}

	var Scheduler = function () {
		this.targets = [];
	};

	Scheduler.prototype.addTarget = function (target) {
		if (Array.isArray(target)) {
			var that = this;
			target.forEach(function (item) {
				that.addTarget(item);
			});
			return;
		}

		// TODO: To implement polymorphism
		var model;
		if (target.isArray) {
			model = this_play.models.toArray(
				this_play.models.Integer, target.length
			);
		}
		else {
			model = new this_play.models.Integer();
		}

		this.targets[target.name] = this_play.controllers.create(model);
	};

	Scheduler.prototype.step = function (step) {
		for (var name in step) {
			this.targets[name].update(step[name]);
		}
	};

	this_play.Scheduler = Scheduler;

	
}).call(this);