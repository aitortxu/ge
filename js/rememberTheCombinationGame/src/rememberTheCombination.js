//var MicroEvent = require('microevent');

var app = (function(ns, MicroEvent, undefined) {
	'use strict';
	ns = ns || {};

	function start_clicked(event) {
		console.log("start_button");
		console.log(this);
		this.generatedCombinationDom.innerHTML = this.game.startGame();

	}

	function guess_clicked(event) {
		console.log("guess_button");
		console.log(this.typedCombinationDom.value);
		if (this.game.isAnswerCorrect(this.typedCombinationDom.value)){
			alert("YOU WIN!!");
		}
		else {
			alert("UOUOUOUOUOU!!!!!!TRY AGAIN!!");
		}
	}

	var GameWidget = function(generatedCombinationDom, typedCombinationDom) {
		this.generatedCombinationDom  = generatedCombinationDom;
		this.typedCombinationDom = typedCombinationDom;
		this.game = new Game();

		MicroEvent.mixin(GameWidget);
	};

	GameWidget.prototype.attachStart = function (button) {
		var self = this;
		button.onclick = function () {
			start_clicked.call(self);
		};
	};
	GameWidget.prototype.attachGuess = function (button) {
		var self = this;
		button.onclick = function () {
			guess_clicked.call(self);
		};
	};

	GameWidget.factory = function (dom) {
		var widget = new GameWidget(dom.find(".generatedCombination")[0], dom.find(".typedCombination")[0]);
		widget.attachStart(dom.find('.start')[0]);
		widget.attachGuess(dom.find('.guess')[0]);
		return widget;
	};

	var CombinationCreator = function(){
	};

	CombinationCreator.prototype.newCombination = function(){
		return '12345';
	};

	var Game = function(){
		this.typedCombination = "";
		this.generatedCombination = "";
	};

	Game.prototype.startGame = function(){
		console.log("StarGame");
		var cc = new CombinationCreator();
		this.generatedCombination = cc.newCombination();
		console.log(this);
		return this.generatedCombination;
	};

	Game.prototype.isAnswerCorrect = function(typedCombination){
		console.log("Typed is " + typedCombination);
		console.log("Generated is " + this.generatedCombination);
		return (typedCombination === this.generatedCombination);
	};

	MicroEvent.mixin(CombinationCreator);

	ns.CombinationCreator = CombinationCreator;
	ns.Game = Game;
	ns.GameWidget = GameWidget;

	if (typeof module !== 'undefined' && 'exports' in module) {
		module.exports = ns; 
	}

	return ns;
}(app, MicroEvent));