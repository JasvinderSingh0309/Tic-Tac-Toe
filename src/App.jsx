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

function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";

  if(gameTurns.length>0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }

  return currPlayer;
}

function App() {
  let [gameTurns, setGameTurns] = useState([]);
  // let [activePlayer, setActivePlayer] = useState("X");

  let currPlayer = deriveActivePlayer(gameTurns);

  let isGameArea = [...gameArea.map(a => [...a])];
  for(let turn of gameTurns) {
    let {square, player} = turn;
    let {row, col} = square;

    isGameArea[row][col] = player;
  }

  let didWon = null;

  for(let combo of WINNING_COMBINATIONS) {
    let firstSquareEle = isGameArea[combo[0].row][combo[0].column];
    let secondSquareEle = isGameArea[combo[1].row][combo[1].column];
    let thirdSquareEle = isGameArea[combo[2].row][combo[2].column];

    if(firstSquareEle && firstSquareEle === secondSquareEle && firstSquareEle === thirdSquareEle) {
      didWon = firstSquareEle;
    }
  }

  let isDraw = gameTurns.length === 9;

  function handlePlayerClick (rowIn, colIn) {
    // if(activePlayer === "X") setActivePlayer("O");
    // else setActivePlayer("X");

    // setActivePlayer((currSym) => currSym === "X" ? "O" : "X");

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player-1" symbol="X" currPlayer={currPlayer}/>
          <Player name="Player-2" symbol="O" currPlayer={currPlayer}/>
        </ol>
        {(didWon || isDraw) && <GameOver winner={didWon} restart={restart} />} 
        <GameBoard playerClick={handlePlayerClick} board={isGameArea}/>
      </div>
    </main>
  );
}

export default App;