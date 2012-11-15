describe("Spies manuales", function() {

	var objetoOriginal;

	beforeEach(function() {
		objetoOriginal = {
			cocotero: function() {
				throw "oops!";
			}
		};
	});

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
		}());

		objetoOriginal.cocotero = cocoteroSpy;
		objetoOriginal.cocotero();

		expect(objetoOriginal.cocotero.called()).toBe(true);
	});

	it("Método 3.1: función independiente con expect incluido", function() {
		var cocoteroSpy = (function() {
			var called = false;
			var spy = function() {
				called = true;
			};
			spy.toBeCalled = function() {
				if (!called) {
					throw "Expected call to cocotero";
				}
			};
			return spy;
		}());

		objetoOriginal.cocotero = cocoteroSpy;
		objetoOriginal.cocotero();

		objetoOriginal.cocotero.toBeCalled();
	});

	it("Método 3.2: función independiente con expect incluido", function() {
		var cocoteroSpy = (function() {
			var called = false;
			var lastArguments;
			var spy = function() {
				called = true;
				lastArguments = arguments;
			};

			function areArgumentsIdentical(arguments1, arguments2) {
				if (arguments1.length != arguments2.length) {
					return false;
				}
				for(x = 0; x < arguments1.length; x++) {
					if (arguments1[x] !== arguments2[x]) {
						return false;
					}
				}
				return true;
			}

			spy.toBeCalledWith = function() {
				if (!called || !areArgumentsIdentical(arguments, lastArguments)) {
					throw "Expected call to cocotero with correct params";
				}
			};
			return spy;
		}());

		objetoOriginal.cocotero = cocoteroSpy;
		objetoOriginal.cocotero('foo', 'bar');

		objetoOriginal.cocotero.toBeCalledWith('foo', 'bar');
	});

	it("Prueba sustitución de parámetro con variable", function(){
			var cocotero = function(parametro){
				var parametro = "chipiclander";
				return parametro;
			}
			expect(cocotero("chupachus")).toBe("chupachus");
	});
});