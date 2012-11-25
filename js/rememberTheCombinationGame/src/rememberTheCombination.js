var MicroEvent = require('microevent');

var app = (function(ns, MicroEvent, undefined) {
	'use strict';
	ns = ns || {};

	function start_clicked(event) {
		console.log("start_button");
		console.log(this);
		this.startGame();
		//this.generatedCombinationDom.innerHTML = this.game.generatedCombination;
		//this.typedCombinationDom.value = "";
		setTimeout(function(thisObj){
			thisObj.hideCombination();
		}, 1000, this);

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

	GameWidget.prototype.startGame = function () {
		this.game.startGame();
		this.generatedCombinationDom.innerHTML = this.game.generatedCombination;
	};
	GameWidget.prototype.hideCombination = function () {
		this.generatedCombinationDom.innerHTML = "";
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
		//return '12345';
		return Math.floor(Math.random()*9999);
	};

	var Game = function(){
		this.typedCombination = "";
		this.generatedCombination = "";
	};

	Game.prototype.startGame = function(){
		console.log("StarGame");
		var cc = new CombinationCreator();
		this.generatedCombination = cc.newCombination();
	};

	Game.prototype.isAnswerCorrect = function(typedCombination){
		return (typedCombination == this.generatedCombination);
	};

	//MicroEvent.mixin(CombinationCreator);

	ns.CombinationCreator = CombinationCreator;
	ns.Game = Game;
	ns.GameWidget = GameWidget;

	if (typeof module !== 'undefined' && 'exports' in module) {
		module.exports = ns; 
	}

	return ns;
}(app, MicroEvent));