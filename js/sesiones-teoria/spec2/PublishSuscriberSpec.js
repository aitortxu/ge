  describe("publish suscriber pattern", function () {
    var publisher = {};

    var publisersubscriber;

    beforeEach(function () {

      publisersubscriber = {

        topics : {},
        subUid : -1,

      // Publish or broadcast events of interest
      // with a specific topic name and arguments
      // such as the data to pass along
      publish : function( topic, args ) {

        if ( !this.topics[topic] ) {
          return false;
        }

        var subscribers = this.topics[topic],
        len = subscribers ? subscribers.length : 0;

        while (len--) {
          subscribers[len].func( topic, args );
        }

        return this;
      },

      // Subscribe to events of interest
      // with a specific topic name and a
      // callback function, to be executed
      // when the topic/event is observed
      subscribe : function( topic, func ) {

        if (!this.topics[topic]) {
          this.topics[topic] = [];
        }

        var token = ( ++this.subUid ).toString();
        this.topics[topic].push({
          token: token,
          func: func
        });
        return token;
      },

      // Unsubscribe from a specific topic, based on a tokenized reference
      // to the subscription
      unsubscribe : function( token ) {
        for ( var m in this.topics ) {
          if ( this.topics[m] ) {
            for ( var i = 0, j = this.topics[m].length; i < j; i++ ) {
              if ( this.topics[m][i].token === token) {
                this.topics[m].splice( i, 1 );
                return token;
              }
            }
          }
        }
        return this;
      }
    };
  });

  it("Using the publish suscriber", function() {
     // Another simple message handler

    // A simple message logger that logs any topics and data received through our subscriber
    var messageLogger = function ( topics, data ) {
      console.log( "--Logging: " + topics + ": " + data );
      if (data.sender) console.log( "----SendBy: " + ": " + data.sender );
      if (data.body) console.log( "----Body: " + ": " + data.body );
    };

    // Subscribers listen for topics they have subscribed to and
    // invoke a callback function (e.g messageLogger) once a new
    // notification is broadcast on that topic

    var publisher = Object.create(publisersubscriber);

    var subscription = publisher.subscribe( "inbox/newMessage", messageLogger );


    // Publishers are in charge of publishing topics or notifications of
    // interest to the application. e.g:

    publisher.publish( "inbox/newMessage", "hello world!" );

    // or
    publisher.publish( "inbox/newMessage", ["test", "a", "b", "c"] );

    // or
    publisher.publish( "inbox/newMessage", {
      sender: "hello@google.com",
      body: "Hey again!"
    });

    // We cab also unsubscribe if we no longer wish for our subscribers
    // to be notified
    // publisher.unsubscribe( subscription );

    // Once unsubscribed, this for example won't result in our
    // messageLogger being executed as the subscriber is
    // no longer listening

    publisher.publish( "inbox/newMessage", "Hello! are you still there?" );
    publisher.publish( "unrelatedEvent", "wat????" );

    publisher.unsubscribe( subscription );

  });

});