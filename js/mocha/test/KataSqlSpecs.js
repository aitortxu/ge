/*
	Necesario instalar:
		npm install expect.js
		npm install microevent
*/

var MicroEvent = require('microevent');
var expect = require('expect.js');

var app = (function(ns, undefined) {
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
	return ns;
}(app));

describe('sql generator', function(){
	'use strict';
  it('generates simple selects', function(){
			var generator = new app.SqlGenerator('Table');
			var sql = generator.select();
			expect(sql).to.be.equal('SELECT * FROM Table');
  });

	it('should generate event when finish', function(done) {
		var generator = new app.SqlGenerator('Table');
		generator.bind('finished', function(sql){
			expect(sql).to.be.equal('SELECT * FROM Table');
			done();
		});
		generator.select();
  });
});