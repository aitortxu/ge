var widgets = (function(ns, undefined){
	ns = ns || {};

	var CounterWidget = function(dom) {
		var counter = dom.find(".counter");
		var minus_button = dom.find(".minus");
		var counter_value;

		function setValue(newValue) {
			counter_value = newValue;
			counter.html(counter_value);
		}

		function minus_clicked() {
			value(value() - 1);
		}

		function initialize() {
			setValue(1);
			minus_button.on('click', minus_clicked);
		}

		function value(newValue) {
			if (newValue == null) {
				return counter_value;
			} else {
				setValue(newValue);
			}
		}

		initialize();

		return {
			value: value
		};
	};

	ns.GenerateCounter = GenerateCounter;

	if (typeof module !== 'undefined' && 'exports' in module) {
		module.exports = ns; 
  }
	return ns;

}(widgets));