import {useState} from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import {WINNING_COMBINATIONS} from "./winningCombination";
import GameOver from "./components/GameOver";

const gameArea=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

const PLAYER = {
  X:"Player-1",
  O:"Player-2",
}

function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";

  if(gameTurns.length>0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }

  return currPlayer;
}

function getGameBoard(gameTurns) {
  let isGameArea = [...gameArea.map(a => [...a])];
  for(let turn of gameTurns) {
    let {square, player} = turn;
    let {row, col} = square;

    isGameArea[row][col] = player;
  }
  return isGameArea;
}

function getWinner(isGameArea, players) {
  let didWon = null;

  for(let combo of WINNING_COMBINATIONS) {
    let firstSquareEle = isGameArea[combo[0].row][combo[0].column];
    let secondSquareEle = isGameArea[combo[1].row][combo[1].column];
    let thirdSquareEle = isGameArea[combo[2].row][combo[2].column];

    if(firstSquareEle && firstSquareEle === secondSquareEle && firstSquareEle === thirdSquareEle) {
      didWon = players[firstSquareEle];
    }
  }
  return didWon;
}

function App() {
  let [players, setPlayers] = useState(PLAYER);
  let [gameTurns, setGameTurns] = useState([]);

  let currPlayer = deriveActivePlayer(gameTurns);
  let isGameArea = getGameBoard(gameTurns);
  let didWon = getWinner(isGameArea, players);

  let isDraw = gameTurns.length === 9;

  function handlePlayerClick (rowIn, colIn) {
    setGameTurns(prevTurn => {
      let currPlayer = deriveActivePlayer(prevTurn);
  
      let updatedGameBoard = [{
          square :{row:rowIn, col:colIn}, player:currPlayer,
        }, ...prevTurn
      ];

      return updatedGameBoard;
    })
  }

  function restart() {
    setGameTurns([]);
  }

  function handleNameChange(sym, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [sym] : newName,
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYER.X} symbol="X" currPlayer={currPlayer} onNameChange={handleNameChange}/>
          <Player name={PLAYER.O} symbol="O" currPlayer={currPlayer} onNameChange={handleNameChange}/>
        </ol>
        {(didWon || isDraw) && <GameOver winner={didWon} restart={restart} />} 
        <GameBoard playerClick={handlePlayerClick} board={isGameArea}/>
      </div>
    </main>
  );
}

export default App;