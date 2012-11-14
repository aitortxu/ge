var SqlGenerator = function(table){
    this.table = table;
};

SqlGenerator.prototype.select = function(){
    return "SELECT * FROM " + this.table;
};

describe("sql generator", function(){

    it("generates simple selects", function(){

        var generator = new SqlGenerator("Table");
        var sql = generator.select();
        expect(sql).to.be.equal("SELECT * FROM Table");

    });

});
