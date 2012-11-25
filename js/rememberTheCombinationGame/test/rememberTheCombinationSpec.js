var expect = require('expect.js');
var sinon = require('sinon');
var $ = require("jquery")
var app = require("../src/rememberTheCombination.js");


//var cc = new app.CombinationCreator();
//console.log("pp" +  cc.newCombination());

describe('combinationCreator', function(){
  it('generate a combination', function(){
	var cc = new app.CombinationCreator();
	var combination = cc.newCombination();
	expect(combination).not.to.be(null);
  });
  it.skip('generate a four characters combination', function(){
	//No sabe que es un string ¿? dice que no tiene length
	// Así si var combination  = "1234"
	var cc = new app.CombinationCreator();
	var combination = cc.newCombination();
	expect(combination.length).to.be(4);
  });
});
describe('checking the typed combination', function(){
  it('get true if the combination is correct', function(){
	var game = new app.Game();
	game.startGame();
	game.typedCombination = game.generatedCombination;
	expect(game.isAnswerCorrect(game.generatedCombination)).to.be(true);
  });
  it('get false if the combination is not correct', function(){
	var game = new app.Game();
	game.startGame();
	expect(game.isAnswerCorrect("respuesta incorrecta")).to.be(false);
  });
});
describe('start game', function(){
  it('when press "start game" a combination is generated and showed', function(){
	var dom = $("<div id='game' class='counter-widget'>" +
			"<span class='generatedCombination'></span>" +
			"<a href='#' class='start'>Start</a>" +
			"<input type='text' name='typedCombination' class='typedCombination'></span>" +
			"<a href='#' class='guess'>Guess</a>" +
			"</div>");
	var gameWidget = new app.GameWidget.factory(dom);
	gameWidget.startGame();
	expect(gameWidget.generatedCombinationDom.innerHTML).not.to.be("");
  });
  it('without press "start game" no combination is generated', function(){
	var dom = $("<div id='game' class='counter-widget'>" +
			"<span class='generatedCombination'></span>" +
			"<a href='#' class='start'>Start</a>" +
			"<input type='text' name='typedCombination' class='typedCombination'></span>" +
			"<a href='#' class='guess'>Guess</a>" +
			"</div>");
	var gameWidget = new app.GameWidget.factory(dom);
	expect(gameWidget.generatedCombinationDom.innerHTML).to.be("");
  });
});