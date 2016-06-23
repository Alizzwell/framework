;(function (undefined) {
	'use strict';
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}
	
	var Integer = function () {
		this.item = new this_play.classes.Item();
		this.item.setValue(0);
		this.item.setAttributes({
			color: 'black',
			background: 'white'
		});
	}
	
	Integer.prototype.item = undefined;
	
	Integer.prototype.getValue = function () {
		return this.item.getValue();
	}
	
	Integer.prototype.setValue = function (val) {
		if (typeof val !== 'number') {
			throw new Error('type error');
		}
		this.item.setValue(val);
	}
	
	Integer.prototype.getAttributes = function () {
		return this.item.getAttributes();
	}
	
	Integer.prototype.setAttributes = function (attr) {
		this.item.setAttributes(attr);
	}
	
	this_play.models.Integer = Integer;
	
}).call(this);