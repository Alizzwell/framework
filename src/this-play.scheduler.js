;(function (undefined) {
	'use strict';
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}

	var Scheduler = function (jsonData) {
		var that = this;
		var step = {
			current: 1,
			max: jsonData.steps.length
		};

		this.getStep = function () {
			return step;
		};

		this.getLine = function () {
			return jsonData.steps[step.current - 1].line;
		};

		this.getTarget = function (name) {
			var target = jsonData.targets[name];
			target.data = jsonData.steps[step.current - 1].status[name];
			return target;
		};

		this.getTargets = function () {
			var targets = {};
			for (var name in jsonData.targets) {
				targets[name] = that.getTarget(name);
			}
			return targets;
		}
	};

	this_play.Scheduler = Scheduler;

	
}).call(this);