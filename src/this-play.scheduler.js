;(function (undefined) {
	'use strict';
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}

	var Scheduler = function (jsonData) {
		var _that = this;
		var _jsonData;
		var _step = { current: 0, max: 0 };

		if (jsonData) {
			bind(jsonData);
		}

		this.events = [];	// event callback methods

		// public method
		this.bind = bind;
		this.unbind = unbind;
		this.getStep = getStep;
		this.getLine = getLine;
		this.getTarget = getTarget;
		this.getTargets = getTargets;
		this.step = step;

		function bind(jsonData) {
			_jsonData = jsonData;
			_step.current = 1;
			_step.max = _jsonData.steps.length;
		}

		function unbind() {
			_jsonData = undefined;
			_step.current = 0;
			_step.max = 0;
		}

		function getStep() {
			return _step;
		}

		function getLine() {
			return _jsonData.steps[_step.current - 1].line;
		}

		function getTarget(name, s) {
			s = s || _step.current;
			
			if (s < 1 || s > _step.max) {
				return undefiend;
			}

			var target = _jsonData.targets[name];
			target.data = _jsonData.steps[s - 1].status[name];
			return JSON.parse(JSON.stringify(target));
		}

		function getTargets(s) {
			var targets = {};
			for (var name in _jsonData.targets) {
				targets[name] = _that.getTarget(name, s);
			}
			return targets;
		}

		function step() {
			if (_step.current >= _step.max) {
				_step.current = _step.max;

				if (_that.events.end) {
					_that.events.end();
				}

				return;
			}

			_step.current++;

			if (_that.events.step) {
				_that.events.step();
			}

			if (_that.events.change) {
				var info = {};
				var isChange = false;
				for (var name in _jsonData.targets) {
					var before = _that.getTarget(name, _step.current - 1);
					var after = _that.getTarget(name);
					if (before.data.toString() != after.data.toString()) {
						isChange = true;
						info[name] = after;
						info[name].before = before.data;
					}
				}

				if (isChange) {
					_that.events.change(info);
				}
			}
		}
	};

	Scheduler.prototype.on = function (event, callback) {
		this.events[event] = callback;
	};


	this_play.Scheduler = Scheduler;

	
}).call(this);