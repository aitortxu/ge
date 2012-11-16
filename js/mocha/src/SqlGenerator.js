var MicroEvent = require('microevent');

var app = (function(ns, MicroEvent, undefined) {
	'use strict';
	ns = ns || {};

	var SqlGenerator = function(table){
		this.table = table;
	};

	SqlGenerator.prototype.select = function(){
		var result = 'SELECT * FROM ' + this.table;
		this.trigger('finished', result);
		return result;
	};

	MicroEvent.mixin(SqlGenerator);

	ns.SqlGenerator = SqlGenerator;

	if (typeof module !== 'undefined' && 'exports' in module) {
		module.exports = ns; 
  }
	return ns;
}(app, MicroEvent));