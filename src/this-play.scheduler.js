;(function (undefined) {
	'use strict';
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}

	const Scheduler = function (jsonData) {
		var _that = this;
		var _step = {
			current: 1,
			max: jsonData.steps.length
		};

		this.events = [];

		this.getStep = function () {
			return _step;
		};

		this.getLine = function () {
			return jsonData.steps[_step.current - 1].line;
		};

		this.getTarget = function (name, step) {
			var step = step || _step.current;
			
			if (step < 1 || step > _step.max) {
				return undefiend;
			}

			var target = jsonData.targets[name];
			target.data = jsonData.steps[step - 1].status[name];
			return target;
		};

		this.getTargets = function (step) {
			var targets = {};
			for (var name in jsonData.targets) {
				targets[name] = _that.getTarget(name, step);
			}
			return JSON.parse(JSON.stringify(targets));
		};

		this.step = function () {
			if (_step.current >= _step.max) {
				_step.current = _step.max;
				return;
			}

			_step.current++;

			if (this.events.step) {
				this.events.step();
			}

			if (this.events.change) {
				var before = _that.getTargets(_step.current - 1);
				var after = _that.getTargets(_step.current);
				var info = {};
				for (var name in jsonData.targets) {
					if (before[name].data.toString() != 
						after[name].data.toString()) {
						info[name] = {
							before: before[name],
							after: after[name]
						};
					}
				}
				this.events.change(info);
			}
		};
	};

	Scheduler.prototype.on = function (event, callback) {
		this.events[event] = callback;
	};


	this_play.Scheduler = Scheduler;

	
}).call(this);