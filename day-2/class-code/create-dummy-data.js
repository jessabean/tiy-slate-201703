let TicTacToeGame = require('./src/tic-tac-toe-game');
let fs = require('fs');

fs.mkdir('./sandwich', err => {
  let game = new TicTacToeGame();
  game.play(2, 0);
  let json = game.toJson();

  let fileName = Math.floor(Math.random() * 10000);

  fs.writeFile(`./sandwich/${fileName}.json`, json, err => {
    let game = new TicTacToeGame();
    game.play(0, 0);
    let json = game.toJson();

    let fileName = Math.floor(Math.random() * 10000);

    fs.writeFile(`./sandwich/${fileName}.json`, json, err => {
      console.log('Thanks');
    });
  });
});
