describe("Dobles de pruebas manuales", function() {
	var objetoOriginal;

	beforeEach(function() {
		objetoOriginal = {
			cocotero: function() {
				throw "oops!";
			}
		};
	});

	describe("Stubs manuales", function() {

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

	describe("Spies manuales", function() {

		it("Método 1: función que modifica una variable local", function() {
			var cocoteroCalled = false;
			var cocoteroSpy = function() {
				cocoteroCalled = true;
			};

			objetoOriginal.cocotero = cocoteroSpy;
			objetoOriginal.cocotero();

			expect(cocoteroCalled).toBe(true);
		});

		it("Método 2: función independiente ", function() {
			var cocoteroSpy = (function() {
				var called = false;
				var spy = function() {
					called = true;
				};
				spy.called = function() {
					return called;
				};
				return spy;
			})();

			objetoOriginal.cocotero = cocoteroSpy;
			objetoOriginal.cocotero();

			expect(objetoOriginal.cocotero.called()).toBe(true);
		});
	});
});