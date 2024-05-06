import {useState} from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  let [activePlayer, setActivePlayer] = useState("X");

  function handlePlayerClick () {
    // if(activePlayer === "X") setActivePlayer("O");
    // else setActivePlayer("X");

    setActivePlayer((currSym) => currSym === "X" ? "O" : "X");
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player-1" symbol="X" currPlayer={activePlayer}/>
          <Player name="Player-2" symbol="O" currPlayer={activePlayer}/>
        </ol>
        <GameBoard playerClick={handlePlayerClick} sym={activePlayer}/>
      </div>
      log
    </main>
  );
}

export default App;