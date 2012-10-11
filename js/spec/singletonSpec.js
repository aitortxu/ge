describe("Patrón Singleton", function () {
  it("crea y almacena una única instancia de un objeto y la devuelve", function () {
    var singleton = (function () {
      var instance;
      // init() implementa el patrón Módulo para devolver un objeto
      function init() {
        function privateMethod() {
          console.log("I am private");
        }
        var privateVariable = "Im also private";
        return {
          publicMethod:function () {
            console.log("The public can see me!");
          },
          publicProperty:"I am also public"
        };
      }
      // Lógica del singleton
      return {
        instance:function () {
          if (!instance)
            instance = init();
          return instance;
        }
      };
    })();
    expect(typeof singleton.instance()).toBe('object');
    expect(singleton.instance()).toBe(singleton.instance());
  });
});