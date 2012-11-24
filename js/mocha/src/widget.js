var MicroEvent = require("microevent");

var widgets = (function (ns, MicroEvent, undefined) {
  ns = ns || {};

  function minus_clicked() {
    this.setValue(this.value - 1);
  }

  function plus_clicked() {
    this.setValue(this.value + 1);
  }

  var CounterWidget = function (counter, initialValue) {
    this.counter = counter;
    this.setValue(initialValue);
  };

  CounterWidget.prototype.setValue = function (newValue) {
    this.value = newValue;
    this.counter.innerHTML = newValue;
    this.onValueChanged();
  };

  CounterWidget.prototype.onValueChanged = function () {
    this.trigger("counter_changed", [this.value]);
  };

  CounterWidget.prototype.attachPlus = function (button) {
    var self = this;
    button.onclick = function () {
      plus_clicked.call(self);
    };
  };

  CounterWidget.prototype.attachMinus = function (button) {
    var self = this;
    button.onclick = function () {
      minus_clicked.call(self);
    };
  };

  CounterWidget.factory = function (dom, initialValue) {
    var widget = new CounterWidget(dom.find('.counter')[0], initialValue || 1);
    widget.attachPlus(dom.find('.plus')[0]);
    widget.attachMinus(dom.find('.minus')[0]);
    return widget;
  };

  MicroEvent.mixin(CounterWidget);

  ns.CounterWidget = CounterWidget;

  if (typeof module !== 'undefined' && 'exports' in module) {
    module.exports = ns;
  }
  return ns;

}(widgets, MicroEvent));
