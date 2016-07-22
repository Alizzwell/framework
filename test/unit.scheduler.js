const jsonData = {
  "targets": { 
  	"A": { "type": "int", "array": [ 4 ] } ,
  	"B": { "type": "int" }
  },
  "steps": [
  	{ "line": 12, "status": { "A": [ 0, 0, 0, 0 ], "B": 0 } },
    { "line": 19, "status": { "A": [ 4, 3, 2, 1 ], "B": 0 } },
    { "line": 19, "status": { "A": [ 3, 4, 2, 1 ], "B": 1 } },
    { "line": 19, "status": { "A": [ 3, 2, 4, 1 ], "B": 2 } },
    { "line": 19, "status": { "A": [ 3, 2, 1, 4 ], "B": 3 } },
    { "line": 23, "status": { "A": [ 2, 3, 1, 4 ], "B": 4 } }
  ]
};

QUnit.module('unit.scheduler.js', function (hooks) {

	QUnit.test("scheduler initialize test", function (assert) {
		const scheduler = new this_play.Scheduler(jsonData);
		
		assert.equal(scheduler.getStep().current, 1);
		assert.equal(scheduler.getStep().max, 6);

		assert.equal(scheduler.getLine(), 12);

		assert.equal(scheduler.getTarget('A').type, "int");
		assert.deepEqual(scheduler.getTarget('A').array, [ 4 ]);
		assert.deepEqual(scheduler.getTarget('A').data, [0, 0, 0, 0]);

		assert.equal(scheduler.getTarget('B').type, "int");
		assert.notOk(scheduler.getTarget('B').array);
		assert.equal(scheduler.getTarget('B').data, 0);

		assert.deepEqual(scheduler.getTargets(), {
			"A": scheduler.getTarget('A'),
			"B": scheduler.getTarget('B')
		});
	});
	
	QUnit.test("scheduler step test", function (assert) {
		const scheduler = new this_play.Scheduler(jsonData);

		assert.equal(scheduler.getStep().current, 1);

		scheduler.step();
		assert.equal(scheduler.getStep().current, 2);
		assert.equal(scheduler.getLine(), 19);
		assert.deepEqual(scheduler.getTarget('A').data, [4, 3, 2, 1]);
		assert.equal(scheduler.getTarget('B').data, 0);

		scheduler.step();
		assert.equal(scheduler.getStep().current, 3);
		assert.equal(scheduler.getLine(), 19);
		assert.deepEqual(scheduler.getTarget('A').data, [3, 4, 2, 1]);
		assert.equal(scheduler.getTarget('B').data, 1);

		scheduler.step();
		assert.equal(scheduler.getStep().current, 4);
		assert.equal(scheduler.getLine(), 19);
		assert.deepEqual(scheduler.getTarget('A').data, [3, 2, 4, 1]);
		assert.equal(scheduler.getTarget('B').data, 2);

		scheduler.step();
		assert.equal(scheduler.getStep().current, 5);
		assert.equal(scheduler.getLine(), 19);
		assert.deepEqual(scheduler.getTarget('A').data, [3, 2, 1, 4]);
		assert.equal(scheduler.getTarget('B').data, 3);

		scheduler.step();
		assert.equal(scheduler.getStep().current, 6);
		assert.equal(scheduler.getLine(), 23);
		assert.deepEqual(scheduler.getTarget('A').data, [2, 3, 1, 4]);
		assert.equal(scheduler.getTarget('B').data, 4);

		scheduler.step();
		assert.equal(scheduler.getStep().current, 6);
	});

	QUnit.test("scheduler step event listener test", function (assert) {
		const scheduler = new this_play.Scheduler(jsonData);

		assert.expect(10);

		var i = 0;

		scheduler.on('step', function () {
			var targets = scheduler.getTargets();
			assert.deepEqual(targets['A'].data, jsonData.steps[i].status['A']);
			assert.deepEqual(targets['B'].data, jsonData.steps[i].status['B']);
		});

		while (i++ <= 100) {
			scheduler.step();
		}
	});

	QUnit.test("scheduler change event listener test", function (assert) {
		const scheduler = new this_play.Scheduler(jsonData);

		assert.expect(18);

		var i = 0;

		scheduler.on('change', function (info) {
			for (var name in info) {
				assert.deepEqual(
					info[name].before.data, jsonData.steps[i - 1].status[name],
					`name: ${name}, before: ${info[name].before.data}`);
				assert.deepEqual(
					info[name].after.data, jsonData.steps[i].status[name],
					`name: ${name}, after: ${info[name].after.data}`);
			}	
		});

		while (i++ <= 100) {
			scheduler.step();
		}
	});

});



