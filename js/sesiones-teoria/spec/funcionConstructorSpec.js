describe("Función Constructor", function () {
  var Arbol;

  beforeEach(function () {
    Arbol = function () {
      this.corteza = 'Blanda';
      this.sayHello = function () {
        return 'Hola, soy un árbol.';
      };
    };
  });
  it("Es una función, pero devuelve objetos si usamos el operador new", function() {
    expect(typeof Arbol).toBe('function');
    expect(typeof new Arbol()).toBe('object');
    // Nunca ejecutar la función constructora!!
    // Si se nos olvida el operador new la vamos a liar... puede haber efectos colaterales!!
    expect(typeof Arbol()).toBe('undefined');
  });
  it("Devuelve instancias con propiedades definidas en ella gracias al operador new", function () {
    var arbol = new Arbol();
    expect(arbol.corteza).toBe('Blanda');
    expect(arbol.sayHello()).toBe('Hola, soy un árbol.');
  });
  it("Las propiedades se copian en la instancia que se construye cada vez que se llama new", function () {
    var cocotero = new Arbol();
    var abedul = new Arbol();
    expect(cocotero.sayHello).not.toBe(abedul.sayHello);
  });
  it("Podemos compartir la misma instancia de una propiedad si la definimos en su prototipo", function () {
    Arbol = function () {
      this.corteza = 'Blanda';
    };
    Arbol.prototype.sayHello = function () {
      return 'Hola, soy un árbol y mi corteza es ' + this.corteza;
    };
    var cocotero = new Arbol();
    var abedul = new Arbol();
    expect(cocotero.sayHello).toBe(abedul.sayHello);
  });
});