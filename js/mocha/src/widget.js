var MicroEvent = require("microevent");

var widgets = (function(ns, MicroEvent, undefined){
	ns = ns || {};

	var CounterWidget = function(dom) {
		var counter = dom.find(".counter");
		var minus_button = dom.find(".minus");
		var plus_button = dom.find(".plus");
		var counter_value;

		function setValue(newValue) {
			counter_value = newValue;
			counter.html(counter_value);
		}

		function minus_clicked(event) {
			event.preventDefault();
			this.value(this.value() - 1);
		}

		function plus_clicked(event) {
			event.preventDefault();
			this.value(this.value() + 1);
		}

		this.value = function(newValue) {
			if (newValue == null) {
				return counter_value;
			} else {
				setValue(newValue);
				this.trigger("counter_changed", newValue);
			}
		};

		setValue(1);
		minus_button.on('click', minus_clicked.bind(this));
		plus_button.on('click', plus_clicked.bind(this));

		MicroEvent.mixin(CounterWidget);
	};

	ns.CounterWidget = CounterWidget;

	if (typeof module !== 'undefined' && 'exports' in module) {
		module.exports = ns; 
  }
	return ns;

}(widgets, MicroEvent));
