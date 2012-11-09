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
});