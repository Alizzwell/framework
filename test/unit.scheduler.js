const jsonData = {
  "targets": { 
  	"A": { "type": "int", "array": [ 4 ] } ,
  	"B": { "type": "int" }
  },
  "steps": [
  	{ "line": 12, "status": { "A": [ 0, 0, 0, 0 ], "B": 0 } },
    { "line": 19, "status": { "A": [ 4, 3, 2, 1 ], "B": 0 } },
    { "line": 19, "status": { "A": [ 3, 4, 2, 1 ], "B": 1 } },
    { "line": 19, "status": { "A": [ 2, 4, 3, 1 ], "B": 2 } },
    { "line": 19, "status": { "A": [ 4, 2, 3, 1 ], "B": 3 } },
    { "line": 23, "status": { "A": [ 4, 3, 2, 1 ], "B": 4 } }
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
	

});



