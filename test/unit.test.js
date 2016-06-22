QUnit.module('unit.test.js');


QUnit.test("create new controllers", function (assert) {
	var data = [1, 2, 3];
	var ctrl = new this_play.Array();
	ctrl.bind(data);
	assert.deepEqual(data, ctrl.val);
});

QUnit.test("model controller test", function (assert) {
	var data = [1, 2, 3];
	var ctrl = new this_play.Array();
	ctrl.bind(data);
	ctrl.setColor(0, '#ff0000');
	ctrl.setColor(1, '#00ff00');
	ctrl.setBackgroundColor(2, '#0000ff');
	assert.equal(ctrl.getItem(0).getColor(), '#ff0000');
	assert.equal(ctrl.getItem(1).getColor(), '#00ff00');
	assert.equal(ctrl.getItem(2).getBackgroundColor(), '#0000ff');
});