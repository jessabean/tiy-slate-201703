let TicTacToeGame = require('./src/tic-tac-toe-game');
let fs = require('fs');
let Promise = require('bluebird');
let writeFile = Promise.promisify(fs.writeFile);
let mkdir = Promise.promisify(fs.mkdir);

function makeNewGame() {
  let game = new TicTacToeGame();
  game.play(2, 0);
  return game;  
}
// game is argument that is passed to second `then` below

let promise = mkdir('./sandwich');

for (let i of [1, 2]) { // add chain of file creation twice
  promise = promise
    .then(() => makeNewGame()) // returns a new TicTacToeGame()
    .then(game => game.toJson()) // takes the game and returns json stringified
    .then((json) => {
       return {
         fileName: `${new Date().valueOf()}.json`,
         data: json
       };
     })
     .then(({ fileName, data }) => writeFile(fileName, data)) // writes the file
}
promise.catch(err => console.error(err));
