import {useState} from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  let [gameTurns, setGameTurns] = useState([]);
  let [activePlayer, setActivePlayer] = useState("X");

  function handlePlayerClick (rowIn, colIn) {
    // if(activePlayer === "X") setActivePlayer("O");
    // else setActivePlayer("X");

    setActivePlayer((currSym) => currSym === "X" ? "O" : "X");

    setGameTurns(prevTurn => {
      let currPlayer = "X";

      if(prevTurn.length>0 && prevTurn[0].player === "X") {
        currPlayer = "O";
      }

      let updatedGameBoard = [{
          square :{row:rowIn, col:colIn}, player:currPlayer,
        }, ...prevTurn
      ];

      return updatedGameBoard;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player-1" symbol="X" currPlayer={activePlayer}/>
          <Player name="Player-2" symbol="O" currPlayer={activePlayer}/>
        </ol>
        <GameBoard playerClick={handlePlayerClick} turns={gameTurns}/>
      </div>
    </main>
  );
}

export default App;