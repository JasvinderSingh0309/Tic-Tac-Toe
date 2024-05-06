import { useState } from "react";

const gameArea=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
]

function GameBoard(props) {
  let [isGameArea, setIsGameArea] = useState(gameArea);

  function handlePlayerClick(rowi,coli) { //here also we are updating the board on its previous value.

    setIsGameArea( (board) => {
      //let updateBoard = [...board.map(innerArr => [...innerArr])]; // array is pbr so, update its copy.

      let updateBoard = [...board]; //this also works as any ways we just need a new array with copied elements so that we can update properly.
      
      updateBoard[rowi][coli] = props.sym;
      return updateBoard;
    });

    props.playerClick();
  }

  return (
    <ol id="game-board">
      {isGameArea.map( (row,rin) => 
        <li key={rin}>
          <ol>
            {row.map((col,colin) => 
              <li key={colin}>
                <button onClick={() => handlePlayerClick(rin,colin)}>{col}</button>
              </li>
            )}
          </ol>
        </li>
      )}
    </ol>
  );
}

export default GameBoard;