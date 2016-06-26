var jsonData = {
	targets: [
		{ name: "A", type: "integer", isArray: true, length: 3 },
		{ name: "B", type: "integer" }
	],
	steps: [
		{ "A": [ 1, 0, 0 ], "B": 0 },
		{ "A": [ 1, 2, 0 ], "B": 0 },
		{ "A": [ 1, 2, 3 ], "B": 1 },
		{ "A": [ 3, 2, 3 ], "B": 0 },
		{ "A": [ 3, 2, 1 ], "B": 1 }
	]
};


QUnit.module('unit.scheduler.js', function (hooks) {

	QUnit.test("scheduler simple test", function (assert) {
		var scheduler = new this_play.Scheduler();
		scheduler.addTarget(jsonData.targets);

		assert.ok(scheduler.targets['A']);
		assert.ok(scheduler.targets['B']);

		jsonData.steps.forEach(function (step) {
			scheduler.step(step);
			assert.deepEqual(scheduler.targets['A'].getValue(), step['A']);
			assert.deepEqual(scheduler.targets['B'].getValue(), step['B']);
		});
	});
	
});



