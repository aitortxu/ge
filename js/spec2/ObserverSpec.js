  describe("observer pattern", function () {
    var Subject;

    beforeEach(function () {
      Subject = function Subject() {
        this.observerList = [];
      };
      Observer.prototype = {
        subscribe : function(anotherObserver) {
          this.observerList.push(anotherObserver);
        },

        unsubscribe : function(observerToUnsuscribe) {
          this.observerList = this.observerList.filter(
            function(observer) {
              if ( observer !== observerToUnsuscribe ) {
                return observer;
              }
            }
            );
        },

        fire : function(param) {
          this.observerList.forEach(
            function(observer) {
              observer.update(param);
            }
            );
        }
      };
    });
    var firstObserver = {
       update: function(param) { console.log("From the first observer... " + param); }
     };
     var secondObserver = {
       update: function(param) { console.log("From the second observer... " + param); }
     };

     
    it("Using the observer", function() {
     
     spyOn(firstObserver, 'update');
     spyOn(secondObserver, 'update');

     var concreteSubject = new Subject();
     concreteSubject.subscribe(firstObserver);
     console.log("--Fire with one observer...");
     concreteSubject.fire('Firing an event');

     concreteSubject.subscribe(secondObserver);
     console.log("--Fire with two observers...");
     concreteSubject.fire('Firing another event');
     
     expect(firstObserver.update).toHaveBeenCalled();
     expect(firstObserver.update.callCount).toBe(2);
     expect(secondObserver.update.callCount).toBe(1);
     
     concreteSubject.unsubscribe(firstObserver);
     concreteSubject.unsubscribe(secondObserver);
     
   });
  });