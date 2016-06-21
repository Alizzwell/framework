QUnit.module('unit.test.js');

QUnit.test("create new controllers", function (assert) {
	var data = [1, 2, 3];
	var ctrl = new this_play.Array();
	ctrl.bind(data);
	assert.deepEqual(data, ctrl.val);
});