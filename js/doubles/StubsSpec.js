/*
	Es necesario instalarse jquery en node:
	npm install jquery
*/
var $ = require('jquery');

describe("Stubs manuales", function() {

	var objetoOriginal;

	beforeEach(function() {
		objetoOriginal = {
			cocotero: function() {
				throw "oops!";
			}
		};
	});

	it("Cuando llamamos a la función devuelve un valor fijo", function(){
		var cocoteroStub = function() {
			return "foo";
		};
		objetoOriginal.cocotero = cocoteroStub;

		expect(objetoOriginal.cocotero()).toEqual("foo");
	});

	it("Cuando llamamos a la función devuelve un valor fijo, pero diferente la primera vez", function(){
		var cocoteroStub = (function() {
			var callNumber = 0;

			return function() {
				callNumber++;
				return (callNumber == 1) ? "foo" : "bar";
			};
		}());

		objetoOriginal.cocotero = cocoteroStub;

		expect(objetoOriginal.cocotero()).toEqual("foo");
		expect(objetoOriginal.cocotero()).toEqual("bar");
		expect(objetoOriginal.cocotero()).toEqual("bar");
	});

	it("Stub de librería de terceros", function() {
		$.getJSON = function(url, callback) {
			var response = { name: "foo", email: "bar" };
			callback(response);
		};
		$.getJSON("http://www.users.com/get/5", function(user){
			expect(user.name).toEqual("foo");
			expect(user.email).toEqual("bar");
		});
	});

	it("Stub a una función prototipo", function() {
		var ObjetoPrototipo = function(){};
		ObjetoPrototipo.prototype.cocotero = function() { throw "oops"; };

		var cocoteroStub = function() {
			return "foo";
		};

		objeto1 = new ObjetoPrototipo();
		objeto2 = new ObjetoPrototipo();

		ObjetoPrototipo.prototype.cocotero = cocoteroStub;

		expect(objeto1.cocotero()).toEqual("foo");
		expect(objeto2.cocotero()).toEqual("foo");

	});
});