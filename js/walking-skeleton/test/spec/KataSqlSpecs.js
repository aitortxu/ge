var app = (function(ns, undefined) {
	'use strict';
	ns = ns || {};

	var SqlGenerator = function(table){
	    this.table = table;
	};

	SqlGenerator.prototype.select = function(){
	    return 'SELECT * FROM ' + this.table;
	};

	ns.SqlGenerator = SqlGenerator;
	return ns;
}(app));

describe('sql generator', function(){
	'use strict';
  it('generates simple selects', function(){

      var generator = new app.SqlGenerator("Table");
      var sql = generator.select();
      expect(sql).to.be.equal("SELECT * FROM Table");
  });
});
