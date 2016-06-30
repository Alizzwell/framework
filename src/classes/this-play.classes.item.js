;(function (undefined) {
	'use strict';
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}
	
	function Item() {
		if (!(this instanceof Item)) {
			return new Item();
		}
	}
	
	Item.prototype.value = undefined;
	Item.prototype.attributes = {};
	
	Item.prototype.getValue = function () {
		return this.value;
	};
	
	Item.prototype.setValue = function (value) {
		this.value = value;
	};
	
	Item.prototype.getAttributes = function () {
		return this.attributes;
	};
	
	Item.prototype.setAttributes = function (attr) {
		for (var name in attr) {
			this.attributes[name] = attr[name];
		}
	};
	
	this_play.classes.Item = Item;
	
}).call(this);