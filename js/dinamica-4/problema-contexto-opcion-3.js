// OPCIÓN 3
// No se puede: ya está. Hay que cambiar la manera de testear:

var Ajax = function(){
	var self = this,
	    itemsUrl = 'http://www.google.com'

	this.items = function() {
		$.getJSON(itemsUrl, this.render.bind(this));
	};

	this.render = function(items) {
		console.log(items);
	};
};


describe("cuando hago getJson", function() {
	it("uso los efectos laterales para saber si algo ha sucedido", function() {
		var a = new Ajax(),
			bomba = false;

		a.render = function() {
			bomba = true;
		}
        a.items();
       expect($.getJSON).hasBeenCalledWith(url, any(Function));
       expect(bomba).is(true);
	})
});

