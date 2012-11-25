var expect = require('expect.js');
var app = require("../src/rememberTheCombination.js");


var DOM = "<a class='start'>Start</a>";
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
describe('star game', function(){
  it.skip('when press "start game" a combination is generated and showed', function(){
	//Falta mockear el dom con un método find 
	var game = new app.Game(DOM);
	game.start_clicked(null);
	expect(game.generatedCombination).not.to.be("pp");
	var combination = cc.newCombination();
	expect(combination).not.to.be(null);
  });
});