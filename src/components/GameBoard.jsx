function GameBoard(props) {
  return (
    <ol id="game-board">
      {props.board.map( (row,rin) => 
        <li key={rin}>
          <ol>
            {row.map((playerSym,colin) => 
              <li key={colin}>
                <button 
                  onClick={() => props.playerClick(rin,colin)}
                  disabled={playerSym !== null}
                >{playerSym}</button>
              </li>
            )}
          </ol>
        </li>
      )}
    </ol>
  );
}

export default GameBoard;