var expect = require('expect.js');
var app = require("../src/SqlGenerator.js");

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