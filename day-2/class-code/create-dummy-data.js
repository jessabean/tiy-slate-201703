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

mkdir('./sandwich')
  .then(() => makeNewGame()) // returns a new TicTacToeGame()
  .then(game => game.toJson()) // takes the game and returns json stringified
  .then(json => { fileName: `${new Date().valueOf()}.json`, data: json }) 
  // returns object with fileName key & data key
  // equivalent to:
  //
  // .then((json) => {
  //   return {
  //     fileName: `${new Date().valueOf()}.json`,
  //     data.json
  //   };
  // })
  .then(({ fileName, data }) => writeFile(fileName, data)) // writes the file
