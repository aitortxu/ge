// SEGUNDA OPCIÓN

var Ajax = function(){
	var self = this,
		tpl = 'Cocotero: ',
	    itemsUrl = 'http://www.google.com'

	this.items = function() {
		$.getJSON(itemsUrl, this.render.bind(this));// no me hace falta self porque este this se va a evaluar "ahora" y estamos en el constructor, con lo que this es la instancia que se está creando.
		/*
		Si hiciera:  $.getJSON(itemsUrl, self.render); entonces no tendría contexto y petaría. Bindeo el contexto con bind()
		*/
	};

	this.render = function(items) {
		console.log(cocotero + items);
	};
};


describe("cuando hago getJson", function() {
	it("quiero comprobar el callback al que se llama", function() {
		var a = new Ajax();
        a.items();

        // De nuevo, nos pasa lo mismo. No podemos hacer lo que nos gustaría:
        expect($.getJSON).hasBeenCalledWith('http://hdkshklds', a.render);
        // Porque .bind(self) genera una nueva función.
        expect($.getJSON).hasBeenCalledWith('http://hdkshklds', any(Function));
	})
})

