describe("Patrón Module", function () {
  var counter;
  beforeEach(function () {
    counter = (function () {
      // Variable privada
      var value = 0;
      // Función (global) privada
      function addOne() {
        return ++value;
      }

      // API del objeto al que se asigne este módulo
      return {
        increment:function () {
          return addOne();
        },
        isGreaterThanZero:function () {
          return 0 < value;
        }
      };
    })();
  });
  it("Devuelve objetos", function () {
    expect(typeof counter).toBe('object');
  });
  it("Permite definir variables y funciones pseudo-privadas", function () {
    expect(counter.isGreaterThanZero()).toBeFalsy();
    expect(counter.increment()).toBe(1);
    expect(counter.isGreaterThanZero()).toBeTruthy();
  });
  describe("Variaciones", function () {
    describe("Import Mixin", function () {
      it("Permite pasarle al Module colaboradores", function () {
        var button = (function (interactionsCounter) {
          return {
            click:function () {
              return "button has been clicked " + interactionsCounter.increment() + " times";
            }
          }
        }(counter));
        expect(button.click()).toBe('button has been clicked 1 times');
        expect(counter.isGreaterThanZero()).toBeTruthy();
      });
    });
    describe("Revealing Module", function () {
      it("Devuelve un objeto anónimo que mapea propiedades privadas definidas en el módulo", function () {
        var myRevealingModule = function () {
          var privateName = "Ben Cherry",
              publicVar = "Hey there!";
          function privateFunction() {
            return "Name: " + privateName;
          }
          function publicSetName(name) {
            privateName = name;
          }
          function publicGetName() {
            return privateFunction();
          }
          return {
            setName:publicSetName,
            greeting:publicVar,
            getName:publicGetName
          };
        }();

        myRevealingModule.setName("Chanquete");
        expect(myRevealingModule.getName()).toBe('Name: Chanquete');
      });
    })
  });
});