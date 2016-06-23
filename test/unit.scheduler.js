var jsonData = {
	targets: [
		{ name: "A", type: "integer", array: true, length: 3 },
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
	
	QUnit.test("scheduler step simple test", function (assert) {
		 assert.ok(true);
	});
	
});



