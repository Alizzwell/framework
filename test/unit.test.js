QUnit.module('unit.test.js');


QUnit.test("integer model get&set test", function (assert) {
	var model = new this_play.models.Integer();
	assert.ok(model.getValue() === 0);
	
	model.setValue(2);
	assert.ok(model.getValue() === 2);
	
	assert.throws(function () {
		model.setValue("string data");
	}, function (err) {
		// TODO: make custom error.
		return err.message === "type error";
	});
	assert.ok(model.getValue() === 2);
});


QUnit.test("bind integer model to controller test", function (assert) {
	var model = new this_play.models.Integer();
	assert.ok(model.getValue() === 0);
	
	var controller = this_play.controllers.create(model);
	
	controller.update(4);
	assert.ok(model.getValue() === 4);	
	
	assert.throws(function () {
		controller.update("string data");
	}, function (err) {
		// TODO: make custom error.
		return err.message === "type error";
	});
	assert.ok(model.getValue() === 4);
});


QUnit.test("update event handling by controller", function (assert) {
	assert.expect(7);
	
	var model = new this_play.models.Integer();
	assert.ok(model.getValue() === 0);

	var controller = this_play.controllers.create(model);
	var lb, la;
	controller.on('update', function (before, after) {
		assert.equal(lb, before, "before: " + before);
		assert.equal(la, after, "after: " + after);
	});
	
	lb = 0; la = 4;
	controller.update(4);
	lb = 4; la = 5;
	controller.update(5);
	lb = 5; la = 5;
	controller.update(5);
});


QUnit.test("model attributes get&set test", function (assert) {
	var model = new this_play.models.Integer();
	assert.deepEqual(model.getAttributes(), { 
		color: 'black', 
		background: 'white' 
	});
	
	model.setAttributes({ 
		color: 'red', 
		background: 'green' 
	});
	
	assert.deepEqual(model.getAttributes(), { 
		color: 'red', 
		background: 'green' 
	});
	
	model.setAttributes({
		otherAttr: 'temp'
	});
	
	assert.deepEqual(model.getAttributes(), { 
		color: 'red', 
		background: 'green',
		otherAttr: 'temp'
	});
});










