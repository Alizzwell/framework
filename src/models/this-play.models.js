;(function (undefined) {
	'use strict';
	
	if (typeof this_play === 'undefined') {
		throw 'this_play is not declared';
	}
	
	var module = (function () {
		
		function toArray(constructor, length) {
			var array = [];
			
			for (var i = 0; i < length; i++) {
				array.push(new constructor());
			}
			
			return {
				array: array,
				type: constructor.type
			};
		}
		
		return {
			toArray: toArray
		};
		
	})();
	
	
	this_play.models = module;
	
}).call(this);