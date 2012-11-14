// PRIMERA OPCIÓN

var Ajax = function(){
	var self = this,
	    itemsUrl = 'http://www.google.com'

	this.items = function() {
		$.getJSON(itemsUrl, function(json) {
			self.render(json);
		});
	};

	this.render = function(items) {
		console.log(items);
	};
};


describe("cuando hacemos una llamda json", function() {
	it("saber qué callback ha sido llamado", function() {
		var a = new Ajax();
        a.items();
        //en java, haríamos un matcher para cada parametro de getJson
        // En JS no podemos hilar tan fino, porque el callback es una función anónima
        // Como mucho podemos hacer:
        expect($.getJSON).hasBeenCalledWith('http://hdkshklds', any(Function));
	})
})

