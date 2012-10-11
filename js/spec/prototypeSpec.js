describe("Patrón Prototype", function () {
  it("Se puede implementar con Object.create(prototype)", function () {
    var myCar = {
      name:"Ford Escort",
      panic:function () {
        return "Wait. How do you stop this thing?";
      }
    };
    var yourCar = Object.create(myCar);
    expect(yourCar.__proto__).toBe(myCar);
    expect(yourCar.panic()).toBe('Wait. How do you stop this thing?');
  });
  it("Se puede simular con un constructor", function () {
    var prototipoDeCoche = {
      init:function (modelo) {
        this.model = modelo;
      },
      getModel:function () {
        return "The model of this car is: " + this.model;
      }
    };

    function coche(modelo) {
      function ConstructorDeCoches() {
      }

      ConstructorDeCoches.prototype = prototipoDeCoche;
      var f = new ConstructorDeCoches();
      f.init(modelo);
      return f;
    }

    var ford = coche('Ford Escort');
    expect(ford.__proto__).toBe(prototipoDeCoche);
    expect(ford.getModel()).toBe('The model of this car is: Ford Escort');
  });
  it("La herencia prototípica se puede encapsular en una función", function() {
    var nuevoObjetoQueHeredeDe = (function () {
      function F() {}
      return function ( proto ) {
        F.prototype = proto;
        return new F();
      };
    })();
    var coche = {
      name:"Ford Escort",
      panic:function () {
        return "Wait. How do you stop this thing?";
      }
    };
    var nuevoCoche = nuevoObjetoQueHeredeDe(coche);
    expect(nuevoCoche.__proto__).toBe(coche);
  });
});