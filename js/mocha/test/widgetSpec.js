var $ = require("jquery");
var expect = require("expect.js");
var widgets = require("../src/widget.js");

describe("Widget", function(){
	var dom;
	var widget;
	var counter;

	beforeEach(function(){
		dom = $("<div><a class='minus'>-<a><span class='counter'></span></div>");
		counter = dom.find(".counter");
		widget = widgets.GenerateCounter(dom);
	}); 

	it("should initialize count in one", function(){
		expect(widget.value()).to.be(1);
		expect(counter.html()).to.be("1");
	});

	it("shuld set counter value", function() {
		widget.value(5);

		expect(widget.value()).to.be(5);
		expect(counter.html()).to.be("5");
	});

	describe("minus", function(){
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
	});
});