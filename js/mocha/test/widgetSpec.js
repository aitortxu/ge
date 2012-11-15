var $ = require("jquery");
var expect = require("expect.js");
var widgets = require("../src/widget.js");
MicroEvent = require("microevent");

describe("Widget", function(){
	var dom;
	var widget;
	var counter;

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
		var minus_button;

		beforeEach(function(){
			minus_button = dom.find(".minus");
		});

		it("should subtract one when click minus button", function(){
			widget.value(5);
			minus_button.click();

			expect(widget.value()).to.be(4);
			expect(counter.html()).to.be("4");
		});

		it("trigger counter_changed event with new value", function(done){
			widget.value(5);

			widget.bind("counter_changed", function(value) {
				expect(value).to.be(4);
				done();
			});

			minus_button.click();
		});
	});

	describe("plus button", function(){
		var plus_button;

		beforeEach(function(){
			plus_button = dom.find(".plus");
		});

		it("should add one when click plus button", function(){
			widget.value(5);
			plus_button.click();

			expect(widget.value()).to.be(6);
			expect(counter.html()).to.be("6");
		});

		it("trigger counter_changed event with new value", function(done){
			widget.value(5);

			widget.bind("counter_changed", function(value) {
				expect(value).to.be(6);
				done();
			});

			plus_button.click();
		});
	});
});