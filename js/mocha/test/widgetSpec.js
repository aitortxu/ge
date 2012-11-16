var $ = require("jquery");
var expect = require("expect.js");
var widgets = require("../src/widget.js");
MicroEvent = require("microevent");

describe("Widget", function(){
	var dom;
	var widget;
	var counter;

	function describeButtonResult(button_selector, data) {
		var button;

		beforeEach(function(){
			button = dom.find(button_selector);
		});

		it("should add one when click plus button", function(){
			widget.value(data.initialValue);
			button.click();

			expect(widget.value()).to.be(data.finalValue);
			expect(counter.html()).to.be(data.finalValue.toString());
		});

		it("trigger counter_changed event with new value", function(done){
			widget.value(data.initialValue);

			widget.bind("counter_changed", function(value) {
				expect(value).to.be(data.finalValue);
				done();
			});

			button.click();
		});
	}

	beforeEach(function(){
		dom = $("<div><a class='minus'>-</a>" + 
						"<span class='counter'></span>" + 
						"<a class='plus'>+</a></div>");
		counter = dom.find(".counter");
		widget = new widgets.CounterWidget(dom);
	}); 

	it("should initialize count in one", function(){
		expect(widget.value()).to.be(1);
		expect(counter.html()).to.be("1");
	});

	it("should set counter value", function() {
		widget.value(5);

		expect(widget.value()).to.be(5);
		expect(counter.html()).to.be("5");
	});

	describe("minus button", function(){
		describeButtonResult(".minus", { initialValue: 5, finalValue: 4 });
	});

	describe("plus button", function() {
		describeButtonResult(".plus", { initialValue: 5, finalValue: 6 });
	});
});