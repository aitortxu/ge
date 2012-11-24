//var MicroEvent = require('microevent');

var app = (function(ns, MicroEvent, undefined) {
	'use strict';
	ns = ns || {};

	var Game = function(dom) {
		var generatedCombinationElement = dom.find(".generatedCombination");
		var start_button = dom.find(".start");
		var guess_button = dom.find(".guess");

		var typedCombination = "";
		var generatedCombination = "";

		function start_clicked(event) {
			console.log("start_button");
		}

		function guess_clicked(event) {
			console.log("guess_button");
		}

		start_button.on('click', start_clicked.bind(this));
		guess_button.on('click', guess_clicked.bind(this));

		MicroEvent.mixin(Game);
	};

	var CombinationCreator = function(){
	};

	CombinationCreator.prototype.newCombination = function(){
		return '12345';
	};

	var GameChecker = function(){
		this.typedCombination = "";
		this.generatedCombination = "";
	};

	GameChecker.prototype.startGame = function(){
		var cc = new CombinationCreator();
		this.generatedCombination = cc.newCombination();
	};

	GameChecker.prototype.correctCombination = function(){
		return (this.typedCombination === this.generatedCombination);
	};

	MicroEvent.mixin(CombinationCreator);

	ns.CombinationCreator = CombinationCreator;
	ns.GameChecker = GameChecker;
	ns.Game = Game;

	if (typeof module !== 'undefined' && 'exports' in module) {
		module.exports = ns; 
	}

	return ns;
}(app, MicroEvent));