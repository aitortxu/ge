var $ = require("jquery"),
    expect = require("expect.js"),
    widgets = require("../src/widget.js"),
    sinon = require("sinon");

describe("Plus Minus counter widget", function () {
      var dom = $("<div><a class='minus'>-</a>" +
              "<span class='counter'></span>" +
              "<a class='plus'>+</a></div>"),
          widget, counter, plus, minus;

      beforeEach(function () {
        widget = widgets.CounterWidget.factory(dom, 1);
        counter = dom.find('.counter');
        plus = dom.find('.plus');
        minus = dom.find('.minus');
      });

      it("Should initialize count to 1 by default", function () {
        expect(widget.value).to.be(1);
        expect(counter.html()).to.be("1");
      });

      it("We should be able to set an arbitrary initial value", function () {
        widget.setValue(5);
        expect(widget.value).to.be(5);
        expect(counter.html()).to.be("5");
      });

      describe("Should signal value changes to any listener", function () {
        it("It should start a 'value changed' signal whenever its value changes", function () {
          var spy = sinon.spy(widget, 'onValueChanged');
          widget.setValue(42);
          expect(spy.called).to.be(true);
        });
        it("The signal should use MicroEvent and send the value along", function (done) {
          widget.bind("counter_changed", function (args) {
            expect(args[0]).to.be(1);
            done();
          });
          widget.onValueChanged();
        })
      });

      it("Plus button should add 1 to the counter", function () {
        plus.click();
        expect(widget.value).to.be(2);
        expect(counter.html()).to.be("" + 2);
      });
      it("Minus button should subtract 1 from the counter", function () {
        minus.click();
        expect(widget.value).to.be(0);
        expect(counter.html()).to.be("" + 0);
      });
    }
)
;